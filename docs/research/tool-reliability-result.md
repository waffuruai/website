# Homepage tool-reliability result

Audience: developers building tool-using agents who need correct arguments and
predictable execution. The homepage section after the native performance result connects
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
homepage remains statically exported. A small bundled client component adds a
replayable CSS bar animation and a measured accuracy/token comparison, with no new
dependency. Reduced-motion preferences disable transitions and animation.

The measured animation pairs 36/144 → 56/144 accuracy with 50,382 → 59,222
total inference tokens (input plus generated). It states the tradeoff directly:
20 additional exact responses and 8,840 additional inference tokens (+17.5%).
Only the accuracy improvement uses the gold emphasis; the increased token work
uses neutral styling. Workflow token savings and cost per completed task have
not been demonstrated. The hypothetical savings calculator has been removed.

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

## Homepage refresh for VCs and engineers

Audience: investors assessing concrete differentiation and engineers evaluating
local inference for teams and agents. Venue: the existing homepage, in its
After Hours design. Lead with a customer outcome, then evidence, then the stack.
The order is hero → native performance/concurrency → tool correctness → products
→ model coverage → kernel portability → team → early access. Both result sections
expose method and limits through native disclosures rather than requiring every
reader to follow the implementation. No new analytics or tracking is introduced.
Success is comprehension and qualified early-access interest, not an invented
conversion forecast. Review the existing consent-managed analytics after an
authorized production release.

The native section preserves three different trial sets: short single stream,
whole-burst N16, and paired all-active N16 optimization. T0/T0.7 switching changes
all associated numbers together. The schematic is explicitly not a timing or
acceptance visualization; 16 active lanes rotate through cohorts of up to eight.
Animation is finite, replayable, and respects reduced motion.

See [native speculative decoding](native-speculative-decoding.md) for the PR
audit, actual Butter/Iron pins, fingerprints, model/draft identity and the
**Reproduce with Butter** launch/client commands. No new performance workload
was run to build this website. Human review precedes production publication.

## Neural research motif

The research-method panel uses an original isometric, layered neural weave
derived from Waffuru’s waffle grid. Warm gold paths connect three curved mesh
layers; choosing inspect, change or verify highlights a different layer and
explains that step. TensorFold’s folded lattice at https://tensorfold.dev/ was
reviewed as visual inspiration; no assets, geometry, code or copy were reused.
The local design keeps Waffuru’s semantic palette, serif/mono typography and
quiet evidence-first layout.

The diagram is visibly labeled conceptual. It is not a neuron activation
capture, causal steering map, actual tensor topology or new research finding.
Existing measured counts, denominators, model scope and token accounting are
unchanged. Native buttons support keyboard selection, explanations are
announced on selection, and decorative SVG is hidden from assistive technology.
Motion runs finitely on entry, selection or replay; no ongoing timer, WebGL
context, network source, dependency or capture/replay workload is added.
Reduced-motion preferences leave the full static weave readable.

## Public disclosure boundary

The marketing page publishes measured outcomes, test conditions, token overhead and limitations. It does not link to private research repositories or publish the continuation recipe, internal failure taxonomy, source revisions or reproduction commands. This document retains internal evidence for review; it is not website copy.
