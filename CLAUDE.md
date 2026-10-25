# CLAUDE.md

Guide for agents working in this repo. Human-facing setup is in [README.md](README.md); global git and workflow rules are in your user-level `CLAUDE.md` and `~/Development/waffuru/.agents/*.md` (MARKETING.md governs voice).

## What this is

waffuru.ai: Next.js 16 (App Router, **static export**), React 19, Tailwind 4, shadcn/ui, six locales (en, es, fr, zh, ja, ko), served by a Cloudflare Worker (`worker/`) in front of Workers static assets. The same deploy publishes product installers (`/ops/bootstrap.sh`, `/<product>/install.sh`) via the release receiver (`scripts/fetch-releases.sh`, `.github/workflows/release.yml`).

The design is Tom's "After Hours" page (`design/after-hours.html` is the reference): dark roast, Instrument Serif display type with a gold italic accent word, Geist body, Geist Mono caps labels, CSS-only motifs (waffle tiles, stamps, melting butter, LEDs, syrup drip).

## Before you finish

- `pnpm check` (typecheck site + worker, lint, test, format check). Fix everything it reports.
- `pnpm build` if you touched routes, config, MDX or content. It must finish, including the postbuild steps.
- Format with `pnpm exec prettier --write <files>`.
- `pnpm dev` serves http://localhost:3000 (dev rewrites stand in for the Worker). `pnpm preview` builds and runs the real Worker at http://127.0.0.1:8787 (use `--port` if taken).

## Hard rules

- **Static export only.** No `headers()`, `cookies()`, `searchParams`, server actions, middleware/proxy, or non-static route handlers (`export const dynamic = 'force-static'`). Every dynamic segment needs `generateStaticParams` and `dynamicParams = false`. Request-time behaviour belongs in `worker/`.
- **Never claim a reserved path.** Top-level `/ops`, `/wrunner`, `/wci`, `/iron`, `/butter` (any product in `releases/products.json`) belong to installers. Product pages live under `/products/<name>`. The postbuild guard fails the build otherwise.
- **No inline scripts you write yourself** (`<script>{…}</script>`, `<Script>` with children, `dangerouslySetInnerHTML` JS). The Worker stamps a per-request nonce on the scripts in the built HTML (`'strict-dynamic'` CSP); behaviour belongs in bundled client components. JSON-LD via `<JsonLd>` is fine (data, not code).
- **No fabricated proof.** No invented metrics, benchmarks, testimonials, customer logos or case-study counts. Only facts in `src/content` or provided by a human. Mark anything unverified `TODO(founder)` and keep it out of rendered copy.
- **Never commit secrets** or `.env*.local`. `.env.example` lists every `process.env.*` the code reads.

## Conventions

- **Semantic tokens only** (`src/styles/tailwind.css`): `bg-background`, `bg-card`, `text-foreground`, `text-soft` (secondary copy), `text-muted-foreground`, `text-faint` (decorative only), `bg-off` (inactive), `bg-brand` / `text-brand-ink` (gold fill / gold text; brand-ink is darker in light mode for contrast), hairlines as `border-foreground/10` etc. Never `text-gray-*`, `bg-white`, hex literals in JSX. Dark is the default (no class); `.light` switches. Use `light:` for light-only overrides; `dark:` means "not light".
- **Type:** `heading-hero`, `heading-page`, `heading-section` utilities for serif display; `label-mono` for mono caps labels; `<em>` inside a serif heading renders as the gold italic accent automatically. One `h1` per page.
- **Layout:** `mx-auto max-w-site px-site` for the 1360px container with Tom's gutters. Sections use generous vertical padding (Tom: 120–160px desktop, 72–88px phone).
- **Motifs:** `src/styles/motifs.css` (`wf-cell`, `wf-stamp`, `wf-pat`, `wf-led`, `wf-drip`/`wf-drop`, `wf-pulse`, `wf-blink`, `wf-rise`, `wf-marquee`, `wf-lane`, `wf-logo`, `wf-grain`, `wf-portrait`). CSS only; reduced motion turns them off globally.
- **Content-driven pages.** Copy lives in `src/content/**` as typed data, not in JSX. Each page owns `src/content/pages/<page>.ts` exporting `Localized<T>` (`{ en, es, fr, zh, ja }`), with locale siblings `<page>.<locale>.ts` typed against the same `T`. Read it with `localize(content, locale)` from `src/lib/content.ts`. UI chrome strings (nav, footer, buttons) live in `src/i18n/dictionaries/*`; page copy does not.
- **i18n.** English is the source of truth. Use `LocalizedLink` / `localizePath` for internal links. Product and platform names never translate (Waffuru, Iron, Butter, Waffle, Syrup, Metal, CUDA, ROCm, Vulkan, …). `usePathname()` returns `/en/...` at build but `/...` in the browser: always pass it through `splitLocale()`.
- **Pages:** every page under `src/app/[locale]/(marketing)/` exports `generateMetadata` using `createMetadata({ title, description, path, locale, keywords })` from `src/lib/seo.ts`, and emits JSON-LD for what it visibly shows (`src/lib/json-ld.ts` + `<JsonLd>`). Server components by default; client components only for interaction.
- **Images:** originals in `assets/`, built to `public/img/` by `scripts/build-images.mjs`; render with `<Picture name="team/kyle-croll" sizes="…" alt="…" />`.
- **Formless CTAs** link to `mailto(subject)` from `src/content/site.ts` (`mailto:hello@waffuru.ai?subject=…`). Early access is `site.urls.earlyAccess`.
- **Tests** are colocated (`foo.test.ts(x)`), Vitest + Testing Library. Wrap components with `withDictionary` from `src/i18n/test-utils.tsx`. Test behaviour, not implementation.
- **Dependencies:** fewer is better. Do not add a package that ~50 lines of our own code can replace. pnpm only.

## Voice (from MARKETING.md)

The reader is the protagonist; Waffuru is the means. Lead with the job to be done and the outcome (money and time saved, control, privacy), not feature lists. Minimal, confident, concrete; food puns welcome in moderation ("Who's in the kitchen."). Honest: products are private / early access; say so. Metal is primary, CUDA secondary, ROCm/Vulkan "runs, not tuned yet". Never claim CUDA or ROCm beats other engines.
