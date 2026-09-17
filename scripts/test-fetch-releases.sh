#!/usr/bin/env bash
#
# Local test for scripts/fetch-releases.sh. Puts a fake `gh` earlier on PATH that
# answers `release list`, `release download` and `attestation verify` from fixture
# files, then checks the happy path and each way verification is meant to fail.
#
#   usage: scripts/test-fetch-releases.sh
#
# No network, no GitHub token, no side effects outside a temp dir.

set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
readonly SCRIPT_DIR
readonly FETCH="$SCRIPT_DIR/fetch-releases.sh"

# Temp root holding the stub, the fixtures and every case's output.
ROOT=""
PASSED=0
FAILED=0

pass() {
  PASSED=$((PASSED + 1))
  printf 'ok   %s\n' "$*"
}

fail() {
  FAILED=$((FAILED + 1))
  printf 'FAIL %s\n' "$*"
}

check() {
  local description=$1
  shift
  if "$@"; then pass "$description"; else fail "$description"; fi
}

# Assert that <haystack-file> contains <needle> as a literal substring.
check_contains() {
  local description=$1 file=$2 needle=$3
  if [ -f "$file" ] && grep -qF -- "$needle" "$file"; then
    pass "$description"
  else
    fail "$description (expected '$needle' in $file)"
  fi
}

sha256_of() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | cut -d' ' -f1
  else
    shasum -a 256 "$1" | cut -d' ' -f1
  fi
}

# Write a `gh` that reads the fixture tree at $GH_STUB_FIXTURES, keyed by the
# --repo it is given with the slash replaced by a double underscore.
make_gh_stub() {
  mkdir -p "$ROOT/bin"
  cat >"$ROOT/bin/gh" <<'STUB'
#!/usr/bin/env bash
set -euo pipefail

cmd=${1:-}; sub=${2:-}; shift 2 || true
repo=""; dir="."; patterns=""; tag=""
while [ $# -gt 0 ]; do
  case "$1" in
    --repo) repo=$2; shift 2 ;;
    --dir) dir=$2; shift 2 ;;
    --pattern) patterns="$patterns$2"$'\n'; shift 2 ;;
    --limit | --json) shift 2 ;;
    --exclude-drafts | --exclude-pre-releases | --clobber) shift ;;
    -*) shift ;;
    *) tag=$1; shift ;;
  esac
done

[ -n "$repo" ] || { echo "gh stub: no --repo given" >&2; exit 2; }
fixtures="$GH_STUB_FIXTURES/${repo//\//__}"

case "$cmd/$sub" in
  release/list)
    cat "$fixtures/releases.json"
    ;;
  release/download)
    [ -d "$fixtures/$tag" ] || { echo "gh stub: no release $tag" >&2; exit 1; }
    mkdir -p "$dir"
    while IFS= read -r pattern; do
      [ -n "$pattern" ] || continue
      if [ -f "$fixtures/$tag/$pattern" ]; then
        cp "$fixtures/$tag/$pattern" "$dir/$pattern"
      fi
    done <<<"$patterns"
    ;;
  attestation/verify)
    if [ -f "$fixtures/attestation-fail" ]; then
      echo "gh stub: no matching attestation for $repo" >&2
      exit 1
    fi
    echo "gh stub: attestation verified for $repo"
    ;;
  *)
    echo "gh stub: unsupported command: $cmd $sub" >&2
    exit 2
    ;;
esac
STUB
  chmod +x "$ROOT/bin/gh"
}

# Create one fixture release: the asset plus a matching .sha256, sha256sum format.
make_release() {
  local fixtures=$1 repo=$2 tag=$3 asset=$4 body=$5
  local dir="$fixtures/${repo//\//__}/$tag"
  mkdir -p "$dir"
  printf '#!/usr/bin/env bash\n%s\n' "$body" >"$dir/$asset"
  printf '%s  %s\n' "$(sha256_of "$dir/$asset")" "$asset" >"$dir/$asset.sha256"
}

# Record the `gh release list` answer for a repo: tags newest first, one latest.
make_release_list() {
  local fixtures=$1 repo=$2 latest=$3
  shift 3
  local dir="$fixtures/${repo//\//__}" tag entries='[]'
  mkdir -p "$dir"
  for tag in "$@"; do
    local is_latest=false
    if [ "$tag" = "$latest" ]; then is_latest=true; fi
    entries=$(printf '%s' "$entries" | jq --arg tag "$tag" --argjson latest "$is_latest" \
      '. + [{tagName: $tag, isLatest: $latest}]')
  done
  printf '%s\n' "$entries" >"$dir/releases.json"
}

# Write a one-product manifest and return nothing; the caller knows the path.
make_manifest() {
  local path=$1 product=$2 repo=$3 asset=$4
  mkdir -p "$(dirname "$path")"
  jq -n --arg product "$product" --arg repo "$repo" --arg asset "$asset" \
    '[{product: $product, repo: $repo, asset: $asset}]' >"$path"
}

# Set up an isolated case directory and echo it: <case>/fixtures, <case>/out.
new_case() {
  local name=$1
  local dir="$ROOT/cases/$name"
  mkdir -p "$dir/fixtures" "$dir/out"
  printf '%s' "$dir"
}

# (a) a good product publishes the latest copy, the pinned copies and releases.json
test_good_product() {
  local dir out log
  dir=$(new_case good)
  out="$dir/out"
  log="$dir/run.log"
  make_release "$dir/fixtures" waffuruai/ops v0.1.0 bootstrap.sh 'echo old'
  make_release "$dir/fixtures" waffuruai/ops v0.2.0 bootstrap.sh 'echo new'
  make_release_list "$dir/fixtures" waffuruai/ops v0.2.0 v0.2.0 v0.1.0
  make_manifest "$dir/products.json" ops waffuruai/ops bootstrap.sh

  if GH_STUB_FIXTURES="$dir/fixtures" "$FETCH" "$dir/products.json" "$out" >"$log" 2>&1; then
    pass "good product: exits zero"
  else
    fail "good product: exits zero"
    cat "$log"
    return
  fi

  check "good product: serves the latest installer" test -f "$out/ops/bootstrap.sh"
  check "good product: serves the latest checksum" test -f "$out/ops/bootstrap.sh.sha256"
  check "good product: pins v0.2.0" test -f "$out/ops/v0.2.0/bootstrap.sh"
  check "good product: pins v0.1.0" test -f "$out/ops/v0.1.0/bootstrap.sh"
  check "good product: pins the v0.1.0 checksum" test -f "$out/ops/v0.1.0/bootstrap.sh.sha256"

  check "good product: keeps the shebang first" \
    test "$(head -n 1 "$out/ops/bootstrap.sh")" = '#!/usr/bin/env bash'
  check_contains "good product: header names repo, tag and verified attestation" \
    "$out/ops/bootstrap.sh" \
    "# waffuru release: waffuruai/ops v0.2.0 — verified sha256 "
  check_contains "good product: header records the attestation state" \
    "$out/ops/bootstrap.sh" "attestation verified, published by waffuruai/website"
  check "good product: header is a single line" \
    test "$(grep -c '^# waffuru release:' "$out/ops/bootstrap.sh")" = 1
  check_contains "good product: pinned copy names its own tag" \
    "$out/ops/v0.1.0/bootstrap.sh" "waffuruai/ops v0.1.0"
  check_contains "good product: latest copy carries the latest body" \
    "$out/ops/bootstrap.sh" "echo new"

  check "good product: latest checksum is the published one, unmodified" \
    cmp -s "$dir/fixtures/waffuruai__ops/v0.2.0/bootstrap.sh.sha256" "$out/ops/bootstrap.sh.sha256"

  check "good product: releases.json marks the latest tag" \
    test "$(jq -r '.latest' "$out/ops/releases.json")" = v0.2.0
  check "good product: releases.json lists both tags" \
    test "$(jq -r '.releases | length' "$out/ops/releases.json")" = 2
  check "good product: releases.json records the release asset hash" \
    test "$(jq -r '.releases[] | select(.tag == "v0.2.0") | .sha256' "$out/ops/releases.json")" \
    = "$(sha256_of "$dir/fixtures/waffuruai__ops/v0.2.0/bootstrap.sh")"
}

# (e) RELEASE_VERIFY_ATTESTATION=false skips only the attestation, loudly
test_attestation_skipped() {
  local dir out log
  dir=$(new_case skip-attestation)
  out="$dir/out"
  log="$dir/run.log"
  make_release "$dir/fixtures" waffuruai/iron v1.0.0 install.sh 'echo iron'
  make_release_list "$dir/fixtures" waffuruai/iron v1.0.0 v1.0.0
  make_manifest "$dir/products.json" iron waffuruai/iron install.sh
  touch "$dir/fixtures/waffuruai__iron/attestation-fail"

  if GH_STUB_FIXTURES="$dir/fixtures" RELEASE_VERIFY_ATTESTATION=false \
    "$FETCH" "$dir/products.json" "$out" >"$log" 2>&1; then
    pass "skipped attestation: exits zero even when verification would fail"
  else
    fail "skipped attestation: exits zero even when verification would fail"
    cat "$log"
    return
  fi
  check_contains "skipped attestation: header says skipped" \
    "$out/iron/install.sh" "attestation skipped"
  check_contains "skipped attestation: warns loudly" "$log" "build provenance is NOT"
}

# (b) a tampered asset fails the checksum and nothing is published for it
test_tampered_asset() {
  local dir out log
  dir=$(new_case tampered)
  out="$dir/out"
  log="$dir/run.log"
  make_release "$dir/fixtures" waffuruai/wrunner v2.0.0 install.sh 'echo trusted'
  make_release_list "$dir/fixtures" waffuruai/wrunner v2.0.0 v2.0.0
  make_manifest "$dir/products.json" wrunner waffuruai/wrunner install.sh
  # Rewrite the asset after its checksum was recorded.
  printf '#!/usr/bin/env bash\necho pwned\n' \
    >"$dir/fixtures/waffuruai__wrunner/v2.0.0/install.sh"

  if GH_STUB_FIXTURES="$dir/fixtures" "$FETCH" "$dir/products.json" "$out" >"$log" 2>&1; then
    fail "tampered asset: exits non-zero"
  else
    pass "tampered asset: exits non-zero"
  fi
  check_contains "tampered asset: names the product and tag" "$log" "wrunner v2.0.0: sha256 mismatch"
  check "tampered asset: publishes nothing for the product" test ! -e "$out/wrunner"
}

# (c) a failing attestation fails the run
test_failed_attestation() {
  local dir out log
  dir=$(new_case bad-attestation)
  out="$dir/out"
  log="$dir/run.log"
  make_release "$dir/fixtures" waffuruai/butter v3.1.0 install.sh 'echo butter'
  make_release_list "$dir/fixtures" waffuruai/butter v3.1.0 v3.1.0
  make_manifest "$dir/products.json" butter waffuruai/butter install.sh
  touch "$dir/fixtures/waffuruai__butter/attestation-fail"

  if GH_STUB_FIXTURES="$dir/fixtures" "$FETCH" "$dir/products.json" "$out" >"$log" 2>&1; then
    fail "failed attestation: exits non-zero"
  else
    pass "failed attestation: exits non-zero"
  fi
  check_contains "failed attestation: names the product and tag" \
    "$log" "butter v3.1.0: attestation verification failed"
  check "failed attestation: publishes nothing for the product" test ! -e "$out/butter"
}

# (d) a product with no release yet is skipped, not fatal
test_no_releases() {
  local dir out log
  dir=$(new_case no-releases)
  out="$dir/out"
  log="$dir/run.log"
  mkdir -p "$dir/fixtures/waffuruai__iron"
  printf '[]\n' >"$dir/fixtures/waffuruai__iron/releases.json"
  make_manifest "$dir/products.json" iron waffuruai/iron install.sh

  if GH_STUB_FIXTURES="$dir/fixtures" "$FETCH" "$dir/products.json" "$out" >"$log" 2>&1; then
    pass "no releases: exits zero"
  else
    fail "no releases: exits zero"
    cat "$log"
    return
  fi
  check_contains "no releases: says it skipped the product" "$log" "no published release yet"
  check "no releases: publishes nothing for the product" test ! -e "$out/iron"
}

main() {
  command -v jq >/dev/null 2>&1 || { echo "jq is required" >&2; exit 1; }
  [ -x "$FETCH" ] || { echo "not executable: $FETCH" >&2; exit 1; }

  ROOT=$(mktemp -d)
  trap 'rm -rf "$ROOT"' EXIT
  make_gh_stub
  export PATH="$ROOT/bin:$PATH"
  export GH_TOKEN=stub-token
  unset RELEASE_VERIFY_ATTESTATION GITHUB_STEP_SUMMARY || true

  test_good_product
  test_attestation_skipped
  test_tampered_asset
  test_failed_attestation
  test_no_releases

  printf '\n%s passed, %s failed\n' "$PASSED" "$FAILED"
  [ "$FAILED" -eq 0 ]
}

main "$@"
