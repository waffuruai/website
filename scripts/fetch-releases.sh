#!/usr/bin/env bash
#
# Fetch every product's installer from its GitHub releases, verify it, and lay it
# out under <out-dir> so the Pages build can serve it from waffuru.ai.
#
#   usage: scripts/fetch-releases.sh <manifest> <out-dir>
#
# For each product in the manifest this writes, on success:
#
#   <out-dir>/<product>/<asset>                 the latest release's installer
#   <out-dir>/<product>/<asset>.sha256          its checksum, exactly as published
#   <out-dir>/<product>/<tag>/<asset>           a pinned copy per recent release
#   <out-dir>/<product>/<tag>/<asset>.sha256
#   <out-dir>/<product>/releases.json           tags, checksums and which is latest
#
# The served installer differs from the release asset by one added header line
# (see HEADER_PREFIX below), so the published .sha256 describes the release asset,
# not the served file. Consumers that want to check the served file against the
# hash should drop the header line.
#
# A product with no published release, or whose releases carry no <asset> yet,
# is skipped with a notice; a release without the asset is skipped and the newest
# release that has one is served. Any failure — download, checksum mismatch,
# attestation failure — exits non-zero so the deploy fails and the previously
# published site stays live.
#
# Environment:
#   GH_TOKEN                    required; needs Contents: read on every product repo
#   RELEASE_VERIFY_ATTESTATION  set to false to skip the attestation check only
#   GITHUB_STEP_SUMMARY         optional; the report is appended there when set

set -euo pipefail

# Pinned copies published per product when the manifest does not override it.
readonly DEFAULT_TAG_LIMIT=10
# Marker opening the provenance header inserted into every served installer.
readonly HEADER_PREFIX="# waffuru release:"
# Who publishes the served copy, named in that header.
readonly PUBLISHER="waffuruai/website"

# Scratch space for downloads and staging; replaced by main().
TMPROOT=""
# Markdown report accumulated across products; replaced by main().
REPORT=""
# Set by publish_release() — bash functions cannot return strings, and a command
# substitution would swallow the exits that must fail the whole run.
PUBLISHED_HASH=""

log() { printf '%s\n' "$*" >&2; }
warn() { printf 'warning: %s\n' "$*" >&2; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }

# Append one markdown row to the report rendered at the end of the run.
report() { printf '%s\n' "$*" >>"$REPORT"; }

# Print the sha256 of a file. macOS has no sha256sum; shasum ships with both.
sha256_of() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$1" | cut -d' ' -f1
  else
    shasum -a 256 "$1" | cut -d' ' -f1
  fi
}

# Verify <dir>/<asset> against the published <asset>.sha256 sitting beside it.
# The published file is sha256sum format but may name the asset by its build
# path, so the line is normalized to the bare asset name before it is checked.
verify_checksum() {
  local dir=$1 asset=$2 expected
  local -a checker
  expected=$(awk 'NR==1 {print $1}' "$dir/$asset.sha256")
  [ -n "$expected" ] || return 1
  printf '%s  %s\n' "$expected" "$asset" >"$dir/.expected.sha256"
  if command -v sha256sum >/dev/null 2>&1; then
    checker=(sha256sum -c --status)
  else
    checker=(shasum -a 256 -c --status)
  fi
  (cd "$dir" && "${checker[@]}" .expected.sha256)
}

# Check the release asset's build-provenance attestation. --repo is stricter than
# --owner: it pins the attestation to the product repo, not just the org.
verify_attestation() {
  local dir=$1 asset=$2 repo=$3
  (cd "$dir" && gh attestation verify "$asset" --repo "$repo" >/dev/null)
}

# Copy <src> to <dest>, inserting the provenance header right after the shebang
# so the file stays executable by `curl ... | bash`.
write_with_header() {
  local src=$1 dest=$2 header=$3 first
  first=$(head -n 1 "$src")
  if [ "${first#\#!}" != "$first" ]; then
    { printf '%s\n' "$first" "$header"; tail -n +2 "$src"; } >"$dest"
  else
    { printf '%s\n' "$header"; cat "$src"; } >"$dest"
  fi
}

# Exit status publish_release() uses for a release that carries no <asset>: a
# release cut before the installer pipeline existed is not an error, just
# nothing to serve.
readonly SKIP_NO_ASSET=10

# Does release <tag> of <repo> carry an asset named <asset>?
release_has_asset() {
  local repo=$1 tag=$2 asset=$3
  gh release view "$tag" --repo "$repo" --json assets --jq '.assets[].name' |
    grep -qxF -- "$asset"
}

# Download, verify and stage one release under <stage>/<tag>/.
# Sets PUBLISHED_HASH to the verified sha256 of the release asset. Returns
# SKIP_NO_ASSET, having written nothing, when the release has no <asset>.
publish_release() {
  local product=$1 repo=$2 asset=$3 tag=$4 stage=$5 attest=$6
  local dir hash state header

  if ! release_has_asset "$repo" "$tag" "$asset"; then
    log "notice: $product $tag: $repo published no $asset (predates the installer?) — skipping"
    report "| \`$product\` | \`$tag\` | \`$asset\` | — | skipped, no asset |"
    return "$SKIP_NO_ASSET"
  fi
  dir=$(mktemp -d "$TMPROOT/download.XXXXXX")

  gh release download "$tag" --repo "$repo" --dir "$dir" --clobber \
    --pattern "$asset" --pattern "$asset.sha256" ||
    die "$product $tag: could not download $asset from $repo"
  [ -f "$dir/$asset" ] || die "$product $tag: $repo published no asset $asset"
  [ -f "$dir/$asset.sha256" ] || die "$product $tag: $repo published no $asset.sha256"

  verify_checksum "$dir" "$asset" ||
    die "$product $tag: sha256 mismatch for $asset from $repo"
  hash=$(sha256_of "$dir/$asset")

  state=skipped
  if [ "$attest" = true ]; then
    verify_attestation "$dir" "$asset" "$repo" ||
      die "$product $tag: attestation verification failed for $asset from $repo"
    state=verified
  fi

  header="$HEADER_PREFIX $repo $tag — verified sha256 $hash, attestation $state, published by $PUBLISHER"
  mkdir -p "$stage/$tag"
  write_with_header "$dir/$asset" "$stage/$tag/$asset" "$header"
  cp "$dir/$asset.sha256" "$stage/$tag/$asset.sha256"
  rm -rf "$dir"

  report "| \`$product\` | \`$tag\` | \`$asset\` | \`${hash:0:16}…\` | $state |"
  PUBLISHED_HASH=$hash
}

# Resolve, verify and stage every published release of one product, then move the
# whole product into <out> at once so a failure leaves nothing half-written.
process_product() {
  local product=$1 repo=$2 asset=$3 limit=$4 out=$5 attest=$6
  local releases latest stage entries tag newest rc

  releases=$(gh release list --repo "$repo" --exclude-drafts --exclude-pre-releases \
    --limit "$limit" --json tagName,isLatest) ||
    die "$product: could not list releases of $repo"

  if [ "$(printf '%s' "$releases" | jq 'length')" -eq 0 ]; then
    log "notice: $product: $repo has no published release yet — skipping"
    report "| \`$product\` | — | — | — | skipped, no release |"
    return 0
  fi

  latest=$(printf '%s' "$releases" | jq -r '(map(select(.isLatest)) | first | .tagName) // ""')
  if [ -z "$latest" ]; then
    # GitHub marks exactly one release latest, and it may be one this listing
    # excluded (a draft or pre-release). Fall back to the newest listed release.
    latest=$(printf '%s' "$releases" | jq -r '.[0].tagName')
    warn "$product: no release of $repo is marked latest; serving $latest"
  fi

  stage=$(mktemp -d "$TMPROOT/stage.XXXXXX")
  entries='[]'
  newest=""
  while IFS= read -r tag; do
    [ -n "$tag" ] || continue
    rc=0
    publish_release "$product" "$repo" "$asset" "$tag" "$stage" "$attest" || rc=$?
    if [ "$rc" -eq "$SKIP_NO_ASSET" ]; then continue; fi
    [ "$rc" -eq 0 ] || exit "$rc"
    # Releases are listed newest first, so the first one published is the newest.
    [ -n "$newest" ] || newest=$tag
    entries=$(printf '%s' "$entries" | jq \
      --arg tag "$tag" --arg sha "$PUBLISHED_HASH" --arg path "/$product/$tag/$asset" \
      '. + [{tag: $tag, latest: false, sha256: $sha, path: $path}]')
  done < <(printf '%s' "$releases" | jq -r '.[].tagName')

  if [ -z "$newest" ]; then
    log "notice: $product: no release of $repo carries $asset yet — skipping"
    rm -rf "$stage"
    return 0
  fi
  # Serve the release GitHub marks latest, unless it predates the installer; then
  # the newest release that has one.
  if ! printf '%s' "$entries" | jq -e --arg t "$latest" 'any(.tag == $t)' >/dev/null; then
    warn "$product: latest release $latest of $repo has no $asset; serving $newest"
    latest=$newest
  fi
  entries=$(printf '%s' "$entries" | jq --arg t "$latest" 'map(.latest = (.tag == $t))')

  # The latest release is served unversioned too — the same headered copy, beside
  # the checksum of the release asset it was made from.
  cp "$stage/$latest/$asset" "$stage/$asset"
  cp "$stage/$latest/$asset.sha256" "$stage/$asset.sha256"

  jq -n --arg product "$product" --arg repo "$repo" --arg asset "$asset" \
    --arg latest "$latest" --arg path "/$product/$asset" --argjson releases "$entries" \
    '{product: $product, repo: $repo, asset: $asset, latest: $latest, path: $path, releases: $releases}' \
    >"$stage/releases.json"

  mkdir -p "$out/$product"
  cp -R "$stage/." "$out/$product/"
  rm -rf "$stage"
}

main() {
  [ $# -eq 2 ] || die "usage: $0 <manifest> <out-dir>"
  local manifest=$1 out=$2 attest=true entry product repo asset limit summary

  command -v gh >/dev/null 2>&1 || die "gh is required"
  command -v jq >/dev/null 2>&1 || die "jq is required"
  [ -f "$manifest" ] || die "no such manifest: $manifest"
  [ -n "${GH_TOKEN:-}" ] || die "GH_TOKEN is not set"
  mkdir -p "$out"

  case "${RELEASE_VERIFY_ATTESTATION:-true}" in
    false | 0 | no) attest=false ;;
  esac
  if [ "$attest" = false ]; then
    warn "############################################################"
    warn "RELEASE_VERIFY_ATTESTATION=false — build provenance is NOT"
    warn "being checked. Installers are published on checksum alone."
    warn "############################################################"
  fi

  TMPROOT=$(mktemp -d)
  trap 'rm -rf "$TMPROOT"' EXIT
  REPORT="$TMPROOT/report.md"
  : >"$REPORT"

  while IFS= read -r entry; do
    product=$(printf '%s' "$entry" | jq -r '.product')
    repo=$(printf '%s' "$entry" | jq -r '.repo')
    asset=$(printf '%s' "$entry" | jq -r '.asset')
    limit=$(printf '%s' "$entry" | jq -r --arg d "$DEFAULT_TAG_LIMIT" '.tags // $d')
    if [ -z "$product" ] || [ "$product" = null ]; then die "manifest entry has no product: $entry"; fi
    if [ -z "$repo" ] || [ "$repo" = null ]; then die "$product: manifest entry has no repo"; fi
    if [ -z "$asset" ] || [ "$asset" = null ]; then die "$product: manifest entry has no asset"; fi
    process_product "$product" "$repo" "$asset" "$limit" "$out" "$attest"
  done < <(jq -c '.[]' "$manifest")

  summary="$TMPROOT/summary.md"
  {
    printf '## Installers published\n\n'
    printf '| product | tag | asset | sha256 | attestation |\n'
    printf '| --- | --- | --- | --- | --- |\n'
    cat "$REPORT"
  } >"$summary"
  cat "$summary" >&2
  if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
    cat "$summary" >>"$GITHUB_STEP_SUMMARY"
  fi
}

main "$@"
