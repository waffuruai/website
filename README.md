# waffuru.ai

Placeholder site for [Waffuru](https://waffuru.ai) — Iron and Butter — and the
release receiver that publishes every product's install script.

Static, no build step of its own. `index.html` is the whole marketing site; edit
and push. `CNAME` holds the custom domain.

## Core features

| Feature | What you get |
| --- | --- |
| One-command installs | `curl -fsSL https://waffuru.ai/ops/bootstrap.sh \| sh` fetches without any GitHub auth; the script signs you in for the private clones |
| Verified provenance | Every served installer is checked against its `.sha256` and its build-provenance attestation before it is published |
| Pinned versions | Every recent release stays reachable at `/<product>/<tag>/<asset>` |
| Stateless deploys | Nothing is committed by a bot; `main` stays protected and a failed verification simply leaves the live site untouched |

## Installer URLs

| URL | Source |
| --- | --- |
| `https://waffuru.ai/ops/bootstrap.sh` | latest release of `waffuruai/ops` |
| `https://waffuru.ai/wrunner/install.sh` | latest release of `waffuruai/wrunner` |
| `https://waffuru.ai/iron/install.sh` | latest release of `waffuruai/iron` |
| `https://waffuru.ai/butter/install.sh` | latest release of `waffuruai/butter` |

Alongside each one:

- `<url>.sha256` — the checksum **as published on the release**.
- `/<product>/<tag>/<asset>` and `/<product>/<tag>/<asset>.sha256` — a pinned copy
  per recent release, so an installer can offer `--version`.
- `/<product>/releases.json` — the published tags, their checksums and which one
  is latest.

The served file differs from the release asset by exactly one added line, a
header inserted after the shebang:

```bash
#!/usr/bin/env bash
# waffuru release: waffuruai/ops v0.2.0 — verified sha256 <hash>, attestation verified, published by waffuruai/website
```

So `<asset>.sha256` describes the **release asset**, not the served file. To check
the served copy by hand, drop that header line first — or fetch the asset from the
release and compare it to the release's own checksum.

GitHub Pages serves `.sh` with its own content type and about a ten minute cache;
`curl -fsSL … | sh` works regardless of either.

## How a release reaches the site

1. A product cuts a release from its `main`, attaching `<asset>`, `<asset>.sha256`
   (sha256sum format) and an `actions/attest-build-provenance` attestation.
2. That release workflow dispatches this repo:

   ```bash
   gh workflow run release.yml --repo waffuruai/website --ref main \
     -f product=<name> -f tag=<vX.Y.Z>
   ```

   The `product` and `tag` inputs are informational — every run republishes every
   product's current latest release, so a dispatch never has to be re-run in order.
3. [`.github/workflows/release.yml`](.github/workflows/release.yml) — the receiver
   *and* the site deploy, one workflow — assembles `_site/` from the static files
   in this repo, runs [`scripts/fetch-releases.sh`](scripts/fetch-releases.sh) to
   fetch and verify the installers into it, and deploys with
   `actions/upload-pages-artifact` + `actions/deploy-pages`.
4. Nothing is committed. A verification failure for any product fails the deploy
   and the previously published site stays live. A product with no release yet is
   skipped with a notice.

The same workflow runs on every push to `main`, so an edit to `index.html` deploys
the current installers too.

## The manifest

[`releases/products.json`](releases/products.json) is the list of products:

```json
[{ "product": "ops", "repo": "waffuruai/ops", "asset": "bootstrap.sh" }]
```

| Key | Meaning |
| --- | --- |
| `product` | URL segment: the installer is served at `/<product>/<asset>` |
| `repo` | `owner/name` the release is read from |
| `asset` | release asset name; `<asset>.sha256` must be attached too |
| `tags` | optional, how many recent releases get a pinned copy (default 10) |

Adding a product is one entry here plus a dispatch from its release workflow.

## The verification chain

For every tag, `scripts/fetch-releases.sh`:

1. Lists releases with `gh release list --exclude-drafts --exclude-pre-releases`.
2. Downloads `<asset>` and `<asset>.sha256` into a temp dir.
3. Checks the asset with `sha256sum -c` (`shasum -a 256 -c` where `sha256sum` is
   absent, so the script runs on macOS too).
4. Checks the build provenance with `gh attestation verify <asset> --repo <repo>`.
   `--repo` is deliberately stricter than `--owner`: the attestation must come
   from that product repo, not merely from the org.
5. Stages the whole product and only then moves it into `_site/`, so a failure
   publishes nothing partial for that product.

Any failure exits non-zero naming the product and tag.

### Running the checks locally

```bash
shellcheck scripts/*.sh
scripts/test-fetch-releases.sh   # stubs gh; no network, no token
actionlint
```

`scripts/test-fetch-releases.sh` puts a fake `gh` on `PATH` and covers the happy
path, a tampered asset, a failing attestation, a skipped attestation and a product
with no release. The workflow runs it in a `test` job before the build.

## Repository settings the owner must create

### Pages source

This repo must serve Pages from the workflow, not from a branch. Either:

- **Settings → Pages → Build and deployment → Source → GitHub Actions**, or
- ```bash
  gh api -X PUT repos/waffuruai/website/pages -f build_type=workflow
  ```

Until that is switched, the legacy "deploy from branch" build keeps serving the
old site and `actions/deploy-pages` fails.

### Secret: `RELEASE_READ_TOKEN`

Needed while the product repos are private. A fine-grained PAT:

- Resource owner: `waffuruai`
- Repository access: `ops`, `wrunner`, `iron`, `butter`
- Permissions: **Contents: read**, **Metadata: read**

Stored as an Actions secret on this repo. Without it the workflow falls back to
`github.token`, which cannot read another repo's releases — fine once the product
repos are public, not before.

### Variable: `RELEASE_VERIFY_ATTESTATION`

Optional Actions variable, default `auto`. GitHub stores build-provenance
attestations for private repositories only on a higher plan ("Feature not
available for the waffuruai organization"), so `auto` verifies provenance for
public product repos and publishes private ones on their checksum alone, with a
warning in the log and `attestation skipped` in the served file's header. `true`
forces verification for every repo (a private one then fails the deploy); `false`
skips it for every repo. A repo that goes public is verified from its next deploy
with no change here.

### Token the product repos need

Each product repo needs a secret (`WEBSITE_DISPATCH_TOKEN`) to dispatch this
workflow. A fine-grained PAT:

- Resource owner: `waffuruai`
- Repository access: `website` only
- Permissions: **Actions: read and write**, **Contents: read**, **Metadata: read**
