# Homepage tool-reliability result

Audience: developers building tool-using agents who need correct arguments and
predictable execution. The homepage section after the product stack connects
that job to Juke's evidence-driven engineering and a concrete native Butter
result. It uses measured counts, a proportional chart and three stages of the
method, with a native disclosure for scope, costs, limits and source access.
This is a result section in the existing six-language After Hours site, not a
new product launch or a claim of universal reliability.

## Frozen source

- Butter research PR: https://github.com/waffuruai/butter/pull/1508
- Reviewed head: `5156441ccbbff6e4948cc94852448b9a5baebefc`.
- Engine code: `64680763eeba6fc170acc81927e684dd3084d863`.
- Package: `research/tool-json-continuation/README.md` at that head.
- Status at review (2026-10-26): open draft research, DO NOT MERGE. This website
  change does not merge, modify, run or promote the Butter research PR.
- Native breadth: 36/144 → 56/144 exact typed responses; all 36 baseline
  successes retained. These are 72 prompts in buffered and SSE modes.
- Separate development: 17/29 → 21/29 with all baseline successes retained.
- Gains are scalar-union cases; nested arrays and literal strings remain gaps.
- Additional cost: 8,304 input and 536 generated tokens across the breadth suite.
- Scope: Qwen3.5-0.8B Q4_K_M, M5 Max 128 GiB, Metal, Swift Chat API. No external
  tools executed. One bounded continuation; schema syntax but no expected values.

`src/content/pages/tool-research.ts` holds shared evidence facts and the pinned
source URL; six translated copies preserve the claim and its limits. The
homepage is static/server-rendered, with no new JavaScript or dependency.

## Claim boundary

Accurate arguments are a practical step toward reliable actions. Fewer accidental
calls, lower total workflow tokens, fewer repair turns, task completion, latency
and cost per successful task remain separate measurements. Do not describe the
observed extra inference work as token savings. This native serving-policy result
does not establish a tensor-steering improvement or cross-model transfer.

No new benchmark or model run was performed for the website. The source package's
**Reproduce with Butter** section retains actual measured configuration, commands,
binary/source fingerprints, separate Butter/Iron pins, sampling and budgets.
No current HEAD is substituted for the measured binaries. The website links the
pinned package and notes that GitHub access may be required.

## Review and measurement

Goal: help visitors understand how a captured failure becomes a tested inference
change. Keep the existing consent-managed analytics; no additional tracking or
unconsented events are added. Review the rendered section, localized copy and
research disclosure before production publication. Validation covers numerical
counts/denominators, keyboard disclosure, locale parity and full site checks/build.
