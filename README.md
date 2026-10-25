# waffuru.ai

The marketing site for [Waffuru](https://waffuru.ai), and the release receiver
that publishes every product's install script.

Next.js 16 (static export) + React 19 + Tailwind 4 + shadcn/ui, in six
languages, served from Cloudflare Workers. The design is the "After Hours"
look: dark roast, Instrument Serif with a gold italic accent, CSS-only motifs.

## Core features

| Feature              | What you get                                                                                                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Six languages        | English at `/`, Spanish, French, Chinese, Japanese and Korean under `/es`, `/fr`, `/zh`, `/ja`, `/ko`; a first visit goes to the browser's language once, an explicit pick always wins |
| Light and dark       | Dark roast by default, light and system on the toggle, no flash on load                                                                                                                |
| Markdown blog        | MDX posts with build-time code highlighting, table of contents, RSS and per-locale translations                                                                                        |
| Readable by agents   | `llms.txt`, a markdown twin of every page (`.md` or `Accept: text/markdown`), discovery `Link` headers, API catalog, content signals                                                   |
| Search-ready         | Canonicals, `hreflang`, JSON-LD, sitemap, a share card per page                                                                                                                        |
| Locked down          | No server, a per-request nonce CSP, HSTS, `frame-ancestors 'none'`; analytics only with consent                                                                                        |
| One-command installs | `curl -fsSL https://waffuru.ai/<product>/install.sh \| sh` fetches without any GitHub auth                                                                                             |
| Verified provenance  | Every served installer is checked against its `.sha256` and its build-provenance attestation before it is published                                                                    |
| Pinned versions      | Every recent release stays reachable at `/<product>/<tag>/<asset>`                                                                                                                     |
| Stateless deploys    | Nothing is committed by a bot; a failed verification leaves the live site untouched                                                                                                    |

## Development

Node 24 and pnpm (see `.nvmrc` and `packageManager`).

```bash
pnpm install
pnpm dev          # http://localhost:3000, dev rewrites stand in for the Worker
pnpm check        # typecheck (site + worker), lint, tests, format
pnpm build        # images → static export (out/) → postbuild (404, markdown, llms.txt, OG cards, CSP hashes)
pnpm preview      # build, assemble _site/, run the real Worker with wrangler at http://127.0.0.1:8787
```

Agent and contributor conventions (tokens, content model, i18n, hard rules)
are in [CLAUDE.md](CLAUDE.md).

| Path                      | What lives there                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/app/[locale]/`       | Routes, one root layout per locale                                                              |
| `src/content/`            | Page copy as typed data (`Localized<T>`), navigation, team, site facts, blog and legal MDX      |
| `src/i18n/`               | Locale registry and UI dictionaries                                                             |
| `src/components/`         | Sections, chrome and page components; `ui/` is shadcn                                           |
| `src/styles/`             | Design tokens (`tailwind.css`) and the CSS motifs                                               |
| `worker/`                 | The Cloudflare Worker: locale routing, markdown negotiation, CSP and security headers, `/api/*` |
| `scripts/`                | Image build, postbuild steps, site assembly, the release fetcher                                |
| `design/after-hours.html` | Tom's original single-file design, the visual reference                                         |

## Hosting

`wrangler.jsonc` deploys `_site/` (the static export plus the installers) as
Workers static assets behind `worker/index.ts`. Build assets, images and
installers bypass the Worker; pages, RSC payloads and `/api/*` run through it.

- **Production**: every push to `main` and every release dispatch runs
  [`release.yml`](.github/workflows/release.yml): test, build with the GA ID,
  fetch and verify installers, `wrangler deploy`.
- **Previews**: each same-repo pull request deploys its own Worker,
  `waffuru-pr-<number>` on workers.dev, and comments the URL. Previews are
  `noindex` and never load analytics. The Worker is deleted when the pull
  request closes.

## Installer URLs

| URL                                     | Source                                |
| --------------------------------------- | ------------------------------------- |
| `https://waffuru.ai/wrunner/install.sh` | latest release of `waffuruai/wrunner` |
| `https://waffuru.ai/iron/install.sh`    | latest release of `waffuruai/iron`    |
| `https://waffuru.ai/butter/install.sh`  | latest release of `waffuruai/butter`  |

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
# waffuru release: waffuruai/iron v0.2.0 — verified sha256 <hash>, attestation verified, published by waffuruai/website
```

So `<asset>.sha256` describes the **release asset**, not the served file. To check
the served copy by hand, drop that header line first — or fetch the asset from the
release and compare it to the release's own checksum.

Installers are served as `text/plain` with a five-minute cache (`public/_headers`),
so a new release is live within minutes; `curl -fsSL … | sh` works regardless.

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
   _and_ the site deploy, one workflow — builds the site into `_site/`, runs
   [`scripts/fetch-releases.sh`](scripts/fetch-releases.sh) to fetch and verify
   the installers into it, and deploys both with `wrangler deploy`.
4. Nothing is committed. A verification failure for any product fails the deploy
   and the previously published site stays live. A product with no release yet is
   skipped with a notice.

The same workflow runs on every push to `main`, so a site change deploys the
current installers too. Site pages can never take an installer path: the
postbuild guard fails the build if one would.

## The manifest

[`releases/products.json`](releases/products.json) is the list of products:

```json
[{ "product": "iron", "repo": "waffuruai/iron", "asset": "install.sh" }]
```

| Key       | Meaning                                                           |
| --------- | ----------------------------------------------------------------- |
| `product` | URL segment: the installer is served at `/<product>/<asset>`      |
| `repo`    | `owner/name` the release is read from                             |
| `asset`   | release asset name; `<asset>.sha256` must be attached too         |
| `tags`    | optional, how many recent releases get a pinned copy (default 10) |

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

### Cloudflare

- Organization secret `CLOUDFLARE_API_TOKEN` (an account-owned token with the
  "Edit Cloudflare Workers" policy, scoped to the Waffuru account) and
  organization variable `CLOUDFLARE_ACCOUNT_ID`, both shared with this repo.
- The `waffuru.ai` custom domain is attached to the `waffuru-site` Worker in
  the Cloudflare dashboard (Workers → waffuru-site → Domains), not in
  `wrangler.jsonc`.
- Zone settings that inject scripts break the CSP and must stay off: Rocket
  Loader, Email Address Obfuscation, automatic Web Analytics. Bot Fight Mode
  must stay off too: it challenges `curl` installer fetches and AI agents.

### Variable: `NEXT_PUBLIC_GA_ID`

Repository variable with the GA4 measurement ID. Only the production build
reads it; the deploy fails if it is missing. Locally, put it in `.env.local`
and run `pnpm preview` to see analytics after accepting cookies.

### Secret: `RELEASE_READ_TOKEN`

Needed while the product repos are private. A fine-grained PAT:

- Resource owner: `waffuruai`
- Repository access: `wrunner`, `iron`, `butter`
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
