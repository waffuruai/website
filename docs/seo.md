# SEO and agent readiness

How waffuru.ai is found by people, search engines and AI agents, what each page should rank for, and how to check that all of it still works. Facts about the products come from the content brief; nothing here is a claim about traffic or rankings.

- [How it works](#how-it-works)
- [Keyword map](#keyword-map)
- [Localised keywords](#localised-keywords)
- [Agent-readiness checklist](#agent-readiness-checklist)
- [Keeping it healthy](#keeping-it-healthy)

## How it works

| Piece                    | Where it lives                                                                    |
| ------------------------ | --------------------------------------------------------------------------------- |
| Title, description, OG   | `createMetadata()` in `src/lib/seo.ts`, called by every page's `generateMetadata` |
| Canonical and hreflang   | Same function; English is unprefixed, `x-default` is English                      |
| Sitemap                  | `src/app/sitemap.ts` (pages from `navigation.ts`, posts from `src/content/blog`)  |
| robots.txt               | `src/app/robots.txt/route.ts`                                                     |
| Markdown twins, llms.txt | `scripts/postbuild/markdown-mirrors.mjs`, `llms-txt.mjs`                          |
| Share cards              | `scripts/postbuild/og-images.mjs` → `out/og/<locale>/<slug>.png`                  |
| Discovery files          | `public/.well-known/**` plus `scripts/postbuild/well-known.mjs`                   |
| Cache and content types  | `public/_headers` (only for paths the Worker bypasses)                            |
| Headers on pages         | `worker/headers.ts` (CSP, `Link`, `Vary: Accept`)                                 |

Rules every page follows (`mise run site-check` enforces the measurable ones):

- One `h1`. The `title` is the page name plus the layout's " · Waffuru" suffix, at most 70 characters, never the brand twice.
- A meta description of 50–160 characters (20–110 for zh, ja, ko) that opens with the outcome for the reader and names the product. No two pages in a locale share one.
- A self-referencing canonical; translated pages list every version (and themselves) as hreflang, and each lists the others back. English-only pages (legal, untranslated posts) advertise only `x-default`.
- Real text in the initial HTML. The site is a static export, so nothing a reader or an agent needs depends on JavaScript.
- JSON-LD only for what the page visibly shows (`src/lib/json-ld.ts`).

## Keyword map

**Read this first.** No search-volume data was used. These are hypotheses taken from what Waffuru does and how people who need it describe the problem. Confirm them in Search Console after launch and move the weight to the phrases that earn impressions. Phrases below stay inside the content brief: no benchmark numbers, no claim that CUDA or ROCm beats another engine, and none of the internal names (W, wOS, Morpheus, wrunner, wci, Juke).

Product names never translate and are never the only keyword: "Iron" alone means nothing to a stranger, "GPU kernels in Rust" does.

How to read an entry: **Primary** is the one phrase the page should win. **Secondary** phrases appear naturally in the copy. **Intent** is what the searcher is doing. **Where** says which heading or tag carries the phrase, so the copy can stay in Tom's voice (short headings, one accent word) while the page still says what it is.

### Home `/`

- **Primary:** waffuru (brand); local AI inference.
- **Secondary:** run AI models on your own hardware; GPU kernels; model serving without Python; LLM inference on Apple silicon; local-first AI.
- **Intent:** navigational for the brand, commercial investigation for everyone else ("what is this and is it for me").
- **Where:** the `h1` is the brand line ("Raw math, _pressed_ into silicon."), so the first paragraph must say what Waffuru is in plain words ("GPU kernels, inference, fleet control and memory for the hardware you already own"). Title tag: a keyworded line such as "Waffuru: local AI inference on the hardware you own" instead of the bare brand. `h2`s name the four products with their jobs: "GPU kernels", "Model serving without Python", "See every GPU", "Memory for your AI".

### Products overview `/products`

- **Primary:** local AI inference stack.
- **Secondary:** GPU kernels, inference engine, GPU fleet monitoring and AI memory in one stack; Metal, CUDA, ROCm and Vulkan; open model serving.
- **Intent:** commercial investigation.
- **Where:** `h1` "The stack" style line; the intro sentence carries the primary phrase. `h2`s are the four products numbered 01 to 04 with their taglines. The stack line ("Iron compiles the kernels. Butter runs models on them. Waffle watches the GPUs. Syrup remembers what you were working on.") belongs in the first screen.

### Iron `/products/iron`

- **Primary:** GPU kernels in Rust.
- **Secondary:** write a GPU kernel once and run it on Metal, CUDA, ROCm and Vulkan; portable GPU kernels; kernel DSL; SPIR-V and PTX output; C and Rust ABI for GPU kernels.
- **Intent:** informational and evaluation by developers.
- **Where:** `h1` "One kernel definition, four backends." (already the tagline). First paragraph: Rust-embedded DSL lowering to a shared IR, then Metal, CUDA, HIP/ROCm or Vulkan SPIR-V. `h2`s: "Backends" (hardware tiers: Metal primary, CUDA secondary, ROCm and Vulkan run but are not tuned yet), "Call it from your code" (versioned ABI), the code sample under a heading that names the language. Use the exact public facts (about 1,139 kernel declarations; 4,164 of 4,164 bit-accurate on the HIP and Vulkan test corpus) or none.

### Butter `/products/butter`

- **Primary:** LLM inference engine for Apple silicon.
- **Secondary:** model serving without Python; OpenAI-compatible local server; run Hugging Face models locally (safetensors, MLX, GGUF); quantized KV cache; speculative decoding; MoE and hybrid models; local speech-to-text and text-to-speech.
- **Intent:** commercial investigation by developers and teams choosing a serving engine.
- **Where:** `h1` "Model serving without Python." `h2`s: "Load straight from Hugging Face", "OpenAI-compatible `butter serve`", "Models on the menu" (the supported-model list). Never rank Butter against vLLM, SGLang or llama.cpp by name in headings; Waffle's copy already says they work together.

### Waffle `/products/waffle`

- **Primary:** GPU fleet monitoring.
- **Secondary:** GPU control plane; see every GPU and every engine running on it; signed GPU telemetry; works with vLLM, SGLang, llama.cpp and Butter; manage a GPU cloud.
- **Intent:** commercial investigation by operators of GPU fleets.
- **Where:** `h1` "See every GPU and every engine running on it." `h2`s: "From one box under a desk to a fleet", "Signed telemetry from a small Rust sidecar", "No lock-in" (any OpenAI-compatible server).

### Syrup `/products/syrup`

- **Primary:** local memory for AI assistants.
- **Secondary:** search your notes and code locally; hybrid lexical and vector search; MCP server for retrieval with citations; compressed embeddings (TurboQuant+).
- **Intent:** informational and evaluation; developers who use AI coding assistants.
- **Where:** `h1` "Your AI remembers what you were working on." `h2`s: "Retrieval over your notes and code, on your machine", "Results come back with citations over MCP". Privacy ("stays on your machine") is the conversion argument; say it in the first paragraph.

### Solutions overview `/solutions`

- **Primary:** AI inference solutions by customer type.
- **Secondary:** private AI for business; GPU infrastructure software; own your AI stack.
- **Intent:** navigational hub; it exists to route readers to the four pages below.
- **Where:** `h1` names the reader's problem, not the products. Four `h2`s, one per audience, each linking to its page. Low expectations for ranking; it passes weight down.

### Small business `/solutions/small-business`

- **Primary:** private AI for small business.
- **Secondary:** run AI on the computers you already have; AI without sending your data to the cloud; lower AI costs; local AI assistant for a team.
- **Intent:** commercial; the pain is cost and customer data leaving the building.
- **Where:** `h1` states the outcome (keep control of your data and your bill). `h2`s: what it saves, what stays private, what hardware it runs on (MacBook, Mac Studio, RTX workstation, DGX Spark, Strix Halo).

### Enterprise `/solutions/enterprise`

- **Primary:** on-premises LLM inference.
- **Secondary:** private LLM deployment; keep data inside your network; one stack across Apple, NVIDIA and AMD hardware; signed GPU telemetry; datacenter GPUs (say "in progress", never "supported").
- **Intent:** commercial investigation by platform, security and infrastructure leads.
- **Where:** `h1` leads with control and privacy. `h2`s: data stays where you put it, one engine across vendors, see every GPU. A contact CTA (`mailto('Sales')`) rather than a form.

### Neoclouds `/solutions/neoclouds`

- **Primary:** software for GPU clouds (neoclouds).
- **Secondary:** GPU fleet management; rent out GPUs with visibility into every engine; inference serving for GPU cloud customers; tokens per watt.
- **Intent:** commercial investigation by operators who rent out GPU capacity.
- **Where:** `h1` is the operator's outcome (fill and watch a fleet). `h2`s: fleet visibility (Waffle), serving (Butter), efficiency (tokens per watt and dollars per workload, as the thesis states, without numbers).

### AI model and inference companies `/solutions/ai-companies`

- **Primary:** inference engine for AI companies.
- **Secondary:** reduce inference cost; more useful work per watt; cross-vendor GPU kernels; serve open models fast.
- **Intent:** commercial investigation by model builders and inference providers.
- **Where:** `h1` is the outcome (more intelligence out of every unit of compute and energy). `h2`s: kernels you write once (Iron), serving without Python (Butter), measure what you run (Waffle). Efficiency language only; no benchmark claims.

### About `/about`

- **Primary:** about Waffuru.
- **Secondary:** democratize access to intelligence; what waffuru means (ワッフル, waffles in Japanese); local-first AI company; Waffuru careers (`/about#hiring`).
- **Intent:** navigational and trust; people checking who is behind the product.
- **Where:** `h1` carries the mission, verbatim: "Democratize access to intelligence." `h2`s: the theses, the values, the name, "Hiring". Careers has no page of its own, so the hiring `h2` should say "Work at Waffuru" to catch that search.

### Team `/about/team`

- **Primary:** Waffuru team.
- **Secondary:** the five people by name (Kyle Croll, Eric Gonzalez, Eric Kryski, Tom Turney, Cory Smith); Waffuru leadership team; TurboQuant+ researcher.
- **Intent:** navigational; people search for the founders by name.
- **Where:** `h1` "Who's in the kitchen." One `h2` or `h3` per person, formatted "Name, Role", with the `Person` JSON-LD the page already emits. Bios stay within the brief.

### Brand `/brand`

- **Primary:** Waffuru logo.
- **Secondary:** Waffuru brand assets; waffle mark; press kit; colours and type.
- **Intent:** navigational by press and partners who want the right files.
- **Where:** `h1` "Brand"; `h2`s: logo, colour, type, usage. Downloads need descriptive `alt` text and file names.

### Blog index `/blog`

- **Primary:** Waffuru blog.
- **Secondary:** local AI inference news; research notes; release notes.
- **Intent:** navigational and subscription.
- **Where:** `h1` "Blog" (or the site's food-pun equivalent plus the word blog). Each post card is a link with the post title as its text. The RSS feed is advertised from every page.

### Launch post `/blog/introducing-waffuru`

- **Primary:** introducing Waffuru.
- **Secondary:** what is Waffuru; democratize access to intelligence; Iron, Butter, Waffle and Syrup; local-first AI stack; why we are building it.
- **Intent:** informational; the first thing a new reader or a journalist reads, and the page most likely to be cited by AI search.
- **Where:** `h1` "Introducing Waffuru" (the slug and the title tag match it). `h2`s follow the story: the thesis (efficiency is the variable), the four products, what happens next (early access). Lead with a two-sentence answer to "what is Waffuru" so an agent can quote it. Code blocks carry a language so the markdown twin keeps it.

### Contact `/contact`

- **Primary:** contact Waffuru.
- **Secondary:** talk to sales; partnerships; press; request early access.
- **Intent:** transactional.
- **Where:** `h1` "Contact" plus the outcome ("Tell us what you want to run"). One `h2` per topic with its `mailto(...)` link. Early access points at the form.

### Support `/support`

- **Primary:** Waffuru support.
- **Secondary:** report a security issue; installer help; documentation.
- **Intent:** navigational for existing users; also the `Policy` URL in `security.txt`.
- **Where:** `h1` "Support"; `h2`s: contact support, report a security issue.

Legal pages (`/legal`, `/legal/terms`, `/legal/privacy`, `/legal/cookies`) target no keywords. Plain titles, English only.

## Localised keywords

Do not translate the keyword table word for word. Write each locale's title, description and `h1` around the phrase people in that language search for, and keep product and platform names in Latin script (Waffuru, Iron, Butter, Waffle, Syrup, Metal, CUDA, ROCm, Vulkan). Examples of the shape of the work (draft; have a native speaker confirm before shipping):

| Locale | Home primary (draft)   |
| ------ | ---------------------- |
| es     | inferencia de IA local |
| fr     | inférence IA locale    |
| zh     | 本地 AI 推理           |
| ja     | ローカル AI 推論       |
| ko     | 로컬 AI 추론           |

Share cards render their own text for en, es and fr; zh, ja and ko reuse the English card because the card renderer only has Latin fonts.

## Agent-readiness checklist

The checks are the ones Cloudflare's [Agent Readiness score](https://blog.cloudflare.com/agent-readiness/) and [isitagentready.com](https://isitagentready.com) run, plus the advice in Vercel's [guide to making a site readable by AI agents](https://vercel.com/kb/guide/make-your-site-readable-by-ai-agents). "Verify" commands assume production; swap in `http://127.0.0.1:8787` for a local `mise run preview` (preview hosts answer `noindex` and a disallow-all `robots.txt` by design).

### Discoverability

| Check                            | How this site implements it                                                                                                                                          | Verify                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| robots.txt (RFC 9309)            | `src/app/robots.txt/route.ts` writes `out/robots.txt`; the Worker serves it in production and a disallow-all elsewhere                                               | `curl -s https://waffuru.ai/robots.txt`                  |
| Sitemap                          | `src/app/sitemap.ts` → `/sitemap.xml`: every page in every locale it exists in, hreflang alternates, `lastmod` for posts; linked from robots.txt and a `Link` header | `curl -s https://waffuru.ai/sitemap.xml \| head`         |
| Link response headers (RFC 8288) | `worker/headers.ts` adds `rel="alternate"` (markdown), `describedby` (llms.txt), `api-catalog` and `sitemap` to every page                                           | `curl -sI https://waffuru.ai/ \| grep -i '^link:'`       |
| Reachable by agent user agents   | Pages are static HTML. Keep Cloudflare WAF rules and Bot Fight Mode from blocking the agents robots.txt allows                                                       | `curl -iL -A 'Claude-User/1.0' https://waffuru.ai/about` |

### Content

| Check                        | How this site implements it                                                                                                                                                                                                                             | Verify                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Markdown content negotiation | `postbuild` writes a `.md` twin next to every page (blog posts convert from their MDX, everything else from the rendered `<main>`). The Worker answers `Accept: text/markdown` with it, `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept` | `curl -sI -H 'Accept: text/markdown' https://waffuru.ai/about`        |
| Markdown twin advertised     | `<link rel="alternate" type="text/markdown" href="/about.md">` in every `<head>` (`createMetadata`) and in the `Link` header; `/about.md` works without a header (`/index.md` for home)                                                                 | `curl -s https://waffuru.ai/about.md \| head`                         |
| llms.txt and llms-full.txt   | Generated from the built pages and `releases/products.json`: H1, summary, H2 sections (Products, Solutions, Company, Blog, Help, Legal, Docs, Installers), absolute links to the English `.md` twins with each page's description                       | `curl -s https://waffuru.ai/llms.txt`                                 |
| Answers in the first HTML    | Static export; no client-only content. Headings, links and copy are in the prerendered document                                                                                                                                                         | `curl -s https://waffuru.ai/ \| grep -c '<h1'`                        |
| Fenced, language-tagged code | rehype-pretty-code sets `data-language`; both converters keep it as the fence info string                                                                                                                                                               | `curl -s https://waffuru.ai/products/iron.md \| grep '^```'`          |
| Correct status codes         | Unknown URLs get a real 404 (the locale's 404 page); moves are 308 (`worker/routing.ts`); no soft 404s                                                                                                                                                  | `curl -sI https://waffuru.ai/nope \| head -1`                         |
| Structured data              | JSON-LD from `src/lib/json-ld.ts`, only for what the page shows (Organization, WebSite, BreadcrumbList, FAQPage, SoftwareApplication, Person)                                                                                                           | `mise run site-check` (parses every block)                            |
| Share images                 | `postbuild` renders 1200×630 PNGs for en, es and fr (zh, ja, ko use the English card); referenced by `og:image` and `twitter:image`                                                                                                                     | `curl -sI https://waffuru.ai/og/en/index.png \| grep -i content-type` |

### Bot access control

| Check                   | How this site implements it                                                                                                                                                                                                                                                                                                                                                        | Verify                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Content Signals         | robots.txt opens with Cloudflare's Content Signals Policy text and sets `Content-Signal: search=yes, ai-input=yes, ai-train=no` for everyone                                                                                                                                                                                                                                       | `curl -s https://waffuru.ai/robots.txt \| grep Content-Signal` |
| AI bot rules            | Search crawlers and user-triggered agents are named and allowed (Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, DuckAssistBot, Applebot). Training-only crawlers are disallowed (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot, Meta-ExternalAgent, Bytespider), each with its source in a comment | `mise run site-check` (against production) or read the file    |
| No indexing of previews | The Worker sends a disallow-all `robots.txt` and `X-Robots-Tag: noindex, nofollow` on every host but `waffuru.ai`                                                                                                                                                                                                                                                                  | `curl -sI https://waffuru-site.<account>.workers.dev/`         |
| Web Bot Auth            | Not applicable: it is for sites that run a bot and sign its requests. We run none                                                                                                                                                                                                                                                                                                  | n/a                                                            |

### Protocol discovery

| Check                            | How this site implements it                                                                                                                                                                                                                                                | Verify                                                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| API catalog (RFC 9727)           | `/.well-known/api-catalog`, a linkset generated from `releases/products.json`: a bookmark entry listing each product's `releases.json`, then one entry per API with `service-desc` (`/.well-known/releases.schema.json`). Served as `application/linkset+json`             | `curl -sI https://waffuru.ai/.well-known/api-catalog`            |
| Agent Skills index               | `/.well-known/agent-skills/index.json` (discovery schema 0.2.0), generated from every `agent-skills/<name>/SKILL.md` with its `sha256:` digest. One skill, `install-waffuru`, covers installing Iron or Butter from the verified installer URLs and checking the `.sha256` | `curl -s https://waffuru.ai/.well-known/agent-skills/index.json` |
| security.txt (RFC 9116)          | `public/.well-known/security.txt`: Contact (`mailto:hello@waffuru.ai?subject=Security`), Expires, Preferred-Languages, Canonical, Policy (`/support`). A test fails a month before it expires                                                                              | `curl -s https://waffuru.ai/.well-known/security.txt`            |
| MCP server card                  | Not applicable: the site hosts no MCP server (Syrup's MCP server runs on the user's machine)                                                                                                                                                                               | n/a                                                              |
| OAuth and protected resources    | Not applicable: the site has no authenticated API. Add RFC 9728 and RFC 8414 metadata if one ever ships                                                                                                                                                                    | n/a                                                              |
| A2A card, WebMCP, x402, UCP, ACP | Not applicable: nothing to transact or expose to agents beyond reading and installing                                                                                                                                                                                      | n/a                                                              |

### Run all of it

```sh
mise run preview                  # builds and serves the real Worker on :8787
mise run site-check               # crawls it: pages, links, markdown, OG, discovery files, 404s
mise run site-check --base https://waffuru.ai   # the same against production
curl -s -X POST https://isitagentready.com/api/scan \
  -H 'Content-Type: application/json' -d '{"url":"https://waffuru.ai"}'
```

## Keeping it healthy

- **New page.** Nothing to register. If it is in the navigation it is in the sitemap; if it is built, it gets a markdown twin, an entry in `llms.txt` and share cards. Add it to the keyword map above and give it a title, description and one `h1`.
- **New product installer.** Add it to `releases/products.json`. The API catalog and llms.txt follow on the next build. `public/_headers` needs a block for it (copy an existing product's); `scripts/postbuild/static-files.test.mjs` fails until it has one, and `wrangler.jsonc` needs its `!/<product>/*` bypass entry (the worker tests check that).
- **security.txt.** Renew `Expires` in `public/.well-known/security.txt` every year; a test fails a month before it lapses.
- **New crawler.** Add it to `src/app/robots.txt/route.ts` with the source that says what it does. Allow search and user-triggered agents; disallow only crawlers that exist to collect training data.
- **Cards.** The share-card renderer cannot load our web fonts, so it sets type in system stacks (Georgia and Helvetica Neue on a Mac; whatever serif and sans the build machine has elsewhere). If a build machine has no fonts at all the cards come out textless, and `og-images.test.mjs` fails.
- **Caching.** `/img`, `/logos` and `/og` keep their names between builds, so they cache for days, not a year. Fingerprinted `/_next/static` caches for a year.
