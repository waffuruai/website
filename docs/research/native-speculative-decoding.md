# Qwen3.8-27B speculative decoding: PR audit for the website

Reviewed 2026-10-26. Read-only inspection of merged PR descriptions and actual patches for Butter #1095, #1121, #1149 and Iron #663. No benchmarks, builds, captures or replays launched. Results below are historical reported observations, not new measurements. The implementation spans native arithmetic, sampling, state management and concurrency.

## What the implementation does

1. **Make verification agree with this engine's serial arithmetic.** Butter #939 localized divergence per operation with teacher-forced row captures. Iron #631 defined one affine-int4 reduction order for serial and tiled verification; the later Iron #654 / Butter #998 stack establishes a packed-U4 tensor-op arithmetic contract shared across row counts. This new contract is not bit-identical to the legacy scalar GEMV. Iron #663 reconstructs the measured tensor-op dot order in a specialized one-row kernel using explicit rounding-sensitive additions. Its PR records subnormal limitations; do not advertise unrestricted equality for every possible input. Its tests include cancellation-sensitive probes and deliberately wrong reduction order/split controls.
2. **Verify branches with the correct ancestry.** Iron #654 adds tree-aware attention and GDN convolution/recurrent-state kernels. Each node uses its own parent's state. Deferred state commit and accepted-path replay prevent rejected branches from contaminating the live target state. Butter #998 verifies up to 15 proposed tree nodes in a target pass, with chain fallbacks. This is especially relevant to a hybrid recurrent/attention architecture.
3. **Preserve real target sampling above temperature zero.** Butter #1084 owns the RNG per request, samples the target conditional distribution along the accepted prefix, stops drawing at rejection and hands the RNG back on fallback. Butter #1095 builds a spine with alternate leaves: draw from the target, follow the child only if it carries that draw, otherwise commit the correction. This is not argmax acceptance at temperature 0.7. Exact toy enumeration, empirical distribution tests and known-bad argmax/history controls support the rule; those do not imply broad downstream task-quality qualification.
4. **Keep speculation useful in conversations.** Butter #1085 starts draft context from available suffix features after prefix-cache reuse instead of silently falling back to plain decode. Its before/after live-session speeds are different windows, not controlled causal speedups. Later cache/session fixes preserve boundaries and reuse.
5. **Share GPU work while preserving request ownership.** Butter #1046 establishes request-local draft/controller/KV/recurrent state plus shared projection/verify cohorts. #1100 admits concurrent sampled requests. #1102 batches their verification but keeps each lane's logits, history and sampler separate. Tests deliberately swap lanes and RNG ownership to ensure corruption is detected.
6. **Schedule the cohort by expected useful work per millisecond.** Butter #1121 replaces accidental meeting in a coalescing window with one lockstep scheduler item: bid/allocate, prepare, shared verify, settle. At most eight lanes participate per round (rotating more active requests), up to sixteen rows per lane and sixty-four total rows. A greedy widening plus pairwise refit uses measured cost and per-depth acceptance estimates. A one-row lane performs a target step inside the batch; it does not need a draft pass every round. This is adaptive verification work allocation, not a fixed-width policy for every request.
7. **Remove draft work that the current row budget does not need.** Butter #1149 retains consecutive one-row feature taps in the existing bounded request buffer. It flushes them when drafting/wider verification resumes, on inline handoff, or when the buffer fills. The patch explicitly offsets captures after retained rows, checks capacity, flushes before tree compaction and preserves pending positions. No extra persistent allocation or skipped target verification. Tests cover window/capacity transitions, slot compaction, wider drafts, inline handoff and a deliberate overwrite control.

## Which results deserve a website headline

All-active N16 optimization, Butter #1149, M5 Max 128 GiB, Qwen3.8-27B affine 4-bit/group64, DFlash2, raw BF16 KV, 882–999 input tokens, 600-token output cap:

| Sampling        | Control tokens/s | Candidate tokens/s | Improvement |
| --------------- | ---------------: | -----------------: | ----------: |
| Temperature 0   |           215.40 |             226.61 |       5.20% |
| Temperature 0.7 |           217.62 |             236.80 |       8.81% |

Three greedy pairs, eight sampled pairs, alternating arm order. All-active means committed tokens divided by the interval from the last request's first-round start to the first request's end, pooled across repetitions. It excludes the cohort's prefill and drain. Do not label 236.80 as whole-burst throughput or per-user speed. One sampled pair was effectively tied/slightly negative (-0.042%). Sampled p50 TTFT rose from 9.030 to 9.397 seconds; there is no uniform latency gain. Agentic regression qualification preserved 111/111 response texts and token counts but mean replay wall was 42.697 → 42.910 seconds, so it is not an agentic latency win or a tool-accuracy result. This change removes preparation overhead, not a measured increase in DFlash acceptance.

Separate three-burst best-run receipts report whole-burst N16 throughput of 157.3169 tokens/s at T0 and 149.4107 at T0.7, per-lane medians 12.9069 / 12.2761 tokens/s and pooled p50 TTFT 8.7577 / 8.4423 seconds. Their aggregate clock includes prefill and drain. They are absolute performance observations from a different run set, not the control/candidate pair above. Single-stream 75.4246 / 70.5244 tokens/s comes from yet another 2052-input/128-output-cap workload. Never splice these into one synthetic run or universal speed claim.

## Website treatment

Suggested headline: **Native kernels. Shared work. Verified tokens.**

Show private request lanes proposing a small tree, a shared verification batch, and only the accepted path advancing. Include a T0 / T0.7 toggle. Let the concurrency visual show more active requests than the eight-lane per-round capacity by visibly rotating cohorts; do not depict sixteen simultaneous independent GPU verifiers. Add separate labels for whole-burst throughput and all-active decode, with their own workload receipts. Explain that the target remains the authority and request state remains private. An engineering drawer can explain arithmetic parity, parent-state replay, target sampling, adaptive row budgets and deferred draft preparation.

Do not claim invention of speculative decoding, universal losslessness versus the old scalar engine, world-first novelty, faster performance on every workload, fewer model tokens, or improved tool accuracy from these decoding speed measurements. The strongest supported claim is measured throughput from less redundant work while retaining the stated verification/ownership contracts.

## Source PRs

- https://github.com/waffuruai/butter/pull/939
- https://github.com/waffuruai/iron/pull/631
- https://github.com/waffuruai/iron/pull/654
- https://github.com/waffuruai/iron/pull/663
- https://github.com/waffuruai/butter/pull/998
- https://github.com/waffuruai/butter/pull/1046
- https://github.com/waffuruai/butter/pull/1084
- https://github.com/waffuruai/butter/pull/1085
- https://github.com/waffuruai/butter/pull/1095
- https://github.com/waffuruai/butter/pull/1100
- https://github.com/waffuruai/butter/pull/1102
- https://github.com/waffuruai/butter/pull/1121
- https://github.com/waffuruai/butter/pull/1149

## Reproduction provenance

The following section is preserved from merged Butter #1149's PR description, including its distinction between executed launchers and reconstructed shell spelling, unknown historical build details, exact measured sources and Iron pin. It is historical evidence, not a command executed by this website review. Preserve old output directories if reproducing; launchers reject reused trial labels. The original local draft download provenance remains unknown. A similar named Hugging Face draft is not proof of its identity.

## Reproduce with Butter

Measured control Butter `485cc9ced922fe171303876e7ba81ae1743f07bc`, candidate `b34adcd7cda131991b5713d25a0783c47466d6eb`; Swift Iron pin `2da92f6d00c6901beb097ca442ab39474c153c83` in both. Control binary SHA256 `8fa1c76cc596bffaa5bf47cca6ac0d813f2c6fe30fa2d6bae5e562d623515c1f`; candidate `a0f00089eccc70a829126c9286fb3eff04e578ea7148013c73a8ce0a0b4df867`. Current PR source `371ad1da1242cfc4c76ba652ae6be783d575e2e3` includes the stronger test; production Swift, packages and Iron pin are byte-identical to the measured candidate; test sources match the completed local gate. Do not substitute that later SHA for the measured build.

Hardware: Apple M5 Max, 128 GiB unified memory, Metal Apple family 10, macOS 27.2 (26B5086k), bundled driver. Target: [mlx-community/Qwen3.8-27B-4bit](https://huggingface.co/mlx-community/Qwen3.8-27B-4bit), revision `10c35caafbb80f7dc6a7a432cdd11af10a6d4818`, affine 4-bit/group64 weights, separate local froggeric template. Download metadata ETags match the captured weights and configuration. Raw BF16 KV is derived from the measured source and checkpoint header. Draft `/Users/tom/dev/models/qwen38-27b-dflash2`: BF16 files, projections quantized at load to affine 4-bit/group64, other tensors BF16, checkpoint block 8/runtime block 16. Draft repository/download revision remain unknown; its file hashes are preserved rather than guessing a download link.

The candidate build ran in the existing checkout with generated resources already matching the Iron pin:

```sh
cd /Users/tom/dev/wt/butter-reused-slot-drift
python3 /Users/tom/Documents/Codex/2026-10-18/you-w/work/guarded_exec.py /Users/tom/Documents/Codex/2026-10-18/you-w/work/one-row-release-mem.jsonl swift build -c release --product butter
```

The historical control build invocation is unknown; its preserved binary and source identity are verified. The actual Juke launcher installs this effective candidate command (the direct shell spelling was not separately executed):

```sh
cd /Users/tom/dev/wt/butter-reused-slot-drift
env BUTTER_QWEN_DFLASH2=/Users/tom/dev/models/qwen38-27b-dflash2 \
  BUTTER_MAX_COMMAND_BUFFERS=256 \
  BUTTER_SPEC_TELEMETRY=/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/juke-runs/cttft-one-row-t0_7-defercand-rqualab1/spec.jsonl \
  DYLD_INSERT_LIBRARIES=/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/deploy/juke/mtlprof.dylib \
  MTLPROF_OUT=/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/juke-runs/cttft-one-row-t0_7-defercand-rqualab1/juke MTLPROF_TIMING=0 \
  /Users/tom/dev/wt/butter-reused-slot-drift/.build/one-row-candidate/butter serve \
  --model /Users/tom/dev/models/Qwen3.8-27B-4bit-froggeric \
  --host 127.0.0.1 --port 18431 --max-context 131072 --parallel 16
```

Control uses `.build/one-row-baseline/butter` with identical settings and its own trace paths. Actual combined launcher/client commands were:

```sh
python3 /Users/tom/Documents/Codex/2026-10-18/you-w/work/one_row_pairs.py
python3 /Users/tom/Documents/Codex/2026-10-18/you-w/work/one_row_sampled_pairs.py
```

The scripts alternate B/C,C/B, with three greedy and eight sampled pairs. They reject existing repetition labels; a repeat needs fresh labels. Each trial uses a fresh server, the two default server startup warmups plus one unrelated 32-token hello client warmup, and 16 barrier-started streaming `/v1/messages` requests. Prompt fixture SHA256 `e6a7b18edf1f1b83e0f1848838dfaa2fea3952c50bef9c20d0903319abdb8e99`; output cap 600, T0 or T0.7, source-verified defaults top_p 0.95, top_k 20, min_p 0, repetition 1, presence 0, no seed. Request-cache reads are zero; Metal pipeline/disk caches were not cleared. All-active throughput is committed tokens divided by seconds from the last first-round start to the first request end, pooled across repetitions. Burst wall includes prefill and drain; percentiles pool individual observations.

### Agentic regression qualification

Three serial pairs (B/C, C/B, B/C) preserved all 111 candidate response texts and output token counts. Parsed tool-JSON key order is canonicalized; plain-text whitespace is not. Known-bad changed-value and whitespace controls passed. Pooled TTFT p50 was 1.511 / 1.551 s and p90 was 2.602 / 2.663 s (control / candidate); mean replay wall was 42.697 / 42.910 s; aggregate throughput was 95.018 / 94.547 tok/s. These are observed costs, not an agentic latency win. Pair median-TTFT differences changed sign; all three candidate replay walls were slightly longer. Three pairs do not establish the cause or exclude a small latency regression. This PR is justified by the repeated N16 throughput benefit and exact-output gates, with these limits retained.

All runs had no compiler overlap, guard stop, swap growth or change in live-server request count. Peak footprint was 34.342 / 34.318 GiB. Per-run warnings and their source/configuration investigations are preserved in Waffuru. Stopping reason: the planned full correctness gate, repeated N16 qualification and three-pair agentic investigation are complete; no broader latency improvement is claimed.

### Reproduce with Butter: agentic replay

Use the same measured Butter sources, pinned Iron, binaries, model files, build/setup and environment recorded above. The effective serve command differs only in `--parallel 12`, evidence paths and arm binary. Actual launch arguments and environment are retained in each run's `juke.plist`; the direct spelling below is reconstructed from that executed launcher:

```sh
cd /Users/tom/dev/wt/butter-reused-slot-drift
env BUTTER_MAX_COMMAND_BUFFERS=256 \
  BUTTER_QWEN_DFLASH2=/Users/tom/dev/models/qwen38-27b-dflash2 \
  BUTTER_SPEC_TELEMETRY=/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/juke-runs/cttft-agentic-defercand-rone-row-qual3/spec.jsonl \
  DYLD_INSERT_LIBRARIES=/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/deploy/juke/mtlprof.dylib \
  MTLPROF_OUT=/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/juke-runs/cttft-agentic-defercand-rone-row-qual3/juke MTLPROF_TIMING=0 \
  /Users/tom/dev/wt/butter-reused-slot-drift/.build/one-row-candidate/butter serve \
  --model /Users/tom/dev/models/Qwen3.8-27B-4bit-froggeric \
  --host 127.0.0.1 --port 18431 --max-context 131072 --parallel 12
```

Control uses `.build/one-row-baseline/butter` and its own evidence paths with identical settings. Executed client/launcher commands:

```sh
python3 /Users/tom/Documents/Codex/2026-10-18/you-w/work/one_row_agentic_pair.py
python3 /Users/tom/Documents/Codex/2026-10-18/you-w/work/one_row_agentic_pair.py one-row-qual2
python3 /Users/tom/Documents/Codex/2026-10-18/you-w/work/one_row_agentic_pair.py one-row-qual3
```

Existing repetition labels are rejected; reruns require fresh labels. The first invocation is preserved in `one-row-agentic-pair-first-snapshot.py`. Fixture `quality/tasks.jsonl` SHA256 `2f611e6c82c856834371cf2d8648d72f47e88a0fdebf67d0c98e07db6c0e825f`; inherited `cohort-ttft/ttft.py` SHA256 `ac2a8bdc952fcc3ce1ea3e524330c1abef5f6924dbcf8278bf29568ac5e314ec`. Ten fixed-history conversations start at 1 + 2.5*j seconds; subsequent turns start 0.5 seconds after the previous response ends. Each turn has a 256-token cap, plus two background streams capped at 1200. There are 37 timed requests per run, T0 with the source-verified sampling defaults above and no seed. Full prompts range from 57 to 7475 tokens; actual per-request cached/uncached input and output counts are in the receipts. Full prompt length includes cached input.

Each process uses two default startup warmups (19/142 prompt tokens, 16/2 output caps), then hello32 and shared-system8 client warmups. Request prefix caches are reused within the replay; Metal pipeline/disk caches are not cleared. TTFT spans client dispatch to first content; pooled percentiles use all 111 observations per arm with linear interpolation. Replay wall includes prefill, drain and the fixed turn delays. Aggregate throughput is total output tokens divided by summed replay wall.

## Reproduce with Butter: separate absolute-performance receipts

The single-stream and whole-burst homepage cards use these separate Oct 19
receipts from Bench PR #6, not the paired all-active trials above:

| Scope           | T0 receipt                           | T0.7 receipt                         |
| --------------- | ------------------------------------ | ------------------------------------ |
| C1              | 837cdc53-0dd9-5c9a-941a-9ae388275382 | f5bb1a52-10b0-55de-ba44-0175841c6823 |
| N16 whole burst | 2fc9151b-a47a-5ce7-9e0b-42cb4a934062 | b6f4238c-e112-523f-b825-4ebd85383328 |

Same preserved candidate binary/source, Iron pin, hardware, target, draft and
KV precision as the paired candidate above. The receipts have no distinct
absolute-run build command: do not invent a rebuild or replace the binary with
today's HEAD. The engine's configured parallelism remains 16 even when the
client sends a single request. The launcher working directory is
`/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/deploy/juke`.
Actual effective server command from all four receipts:

```sh
cd /Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/deploy/juke
/Users/tom/dev/wt/butter-reused-slot-drift/.build/one-row-candidate/butter serve --model /Users/tom/dev/models/Qwen3.8-27B-4bit-froggeric --host 127.0.0.1 --port 18431 --max-context 131072 --parallel 16
```

The launcher supplies `BUTTER_MAX_COMMAND_BUFFERS=256`,
`BUTTER_QWEN_DFLASH2=/Users/tom/dev/models/qwen38-27b-dflash2`,
`BUTTER_SPEC_TELEMETRY=<run dir>/spec.jsonl`,
`DYLD_INSERT_LIBRARIES=/Users/tom/dev/.ib-notes/qwen-sampled-speculation-20261014/deploy/juke/mtlprof.dylib`,
`MTLPROF_TIMING=0`, and per-run evidence destinations. Read the captured
`juke.plist` for a specific run's exact destinations. The shim was loaded;
per-encoder timing was disabled. Do not describe these as shim-free runs.

Executed orchestration and analysis (historical evidence, not executed for this
website change):

```sh
cd /Users/tom/Documents/Codex/2026-10-18/you-w/work
bash queue_best_runs.sh
python3 best_runs_summary.py
```

The queue invokes `python3 c1_best_run.py <rep-tag> 0` / `0.7`, then
`python3 one_row_run.py defercand <rep-tag> 0` / `0.7`, three successful
repetitions per cell, retaining interrupted/contaminated attempts. Existing
labels are deliberately rejected; reruns need new labels. The scripts own the
server and GPU lease; do not also launch the standalone command. C1 adds an
excluded nonce-prefixed prompt warmup after the default startup/hello warmups.
N16 starts the 16 streamed `/v1/messages` requests on a barrier after the
startup/hello warmups. Prefix reuse is zero on timed requests; pipeline/disk
caches are not cleared. Temperature is the client payload's 0 or 0.7; top-p
0.95, top-k 20, min-p 0, repetition 1, presence 0 use the measured source's
defaults. No seed is set. No model startup is included in TTFT.

C1 uses 2,052 actual input tokens and a 128-token output cap. Prefill is the
server's last-request prefill rate, decode is `(output_tokens - 1) /
(last_content - first_content)` and TTFT is client send to first content.
The three-run medians are T0 75.4246 tok/s decode / 1033 tok/s prefill /
1966.4328 ms TTFT; T0.7 70.5244 / 1039.9 / 1939.6231. These short capped
outputs do not establish completed task quality. Greedy texts match across
repetitions and the separate speculation-disabled check in the source summary.

N16 uses roughly 937 input tokens per request and a 600-token output cap.
Whole-burst throughput is total output tokens divided by summed burst wall,
from first send to last completion (including prefill and drain). T0 157.3169
tok/s, T0.7 149.4107. Per-request decode is the median across 48 lanes: T0
12.9069 tok/s, T0.7 12.2761. TTFT is pooled p50 across those lanes: 8757.7189
ms and 8442.3455 ms. It is not the median of the three per-burst p50s.

Frozen script hashes, fixture hashes and receipt notes:

```json
{
  "id": "837cdc53-0dd9-5c9a-941a-9ae388275382",
  "dataset_sha256": "99ec277c8a9e4b59d568776211b2c8cc5aa80d65e295101754f16f7aa0fdd73c",
  "script_sha256": {
    "best_runs_summary.py": "bbda29c29758f3d77312f2e3c7db2176dabf7757da6414e607d947ac52cc1f66",
    "c1_best_run.py": "d1492f3614e9280c8e3697d21677a774c57c7d7ce4c80408e8a1780d391856b2",
    "c1_plain_run.py": "3ea5a36bdc3ed90a9535e4fd0e710274fe6279c1e3a8821140d40df925e11f5c",
    "cohort-ttft/ttft.py": "ac2a8bdc952fcc3ce1ea3e524330c1abef5f6924dbcf8278bf29568ac5e314ec",
    "one_row_rates.py": "55677f7863b8f242fbf30c2291e943893b3b2c29867bdbc397e678ac08f7b671",
    "one_row_run.py": "2ff62ec19e2d8acdb5f988a4358f6b5b9e666095b7c695bcbf58751da2f94c42",
    "queue_best_runs.sh": "b601621e4f11407c275efe0fd609a083ff4cff669120121273759bcf924ec67d"
  },
  "notes": "Best-runs rerun of the Oct 18 reference config on the clean b34adcd7 binary (a0f00089). Per rep (ttft ms, decode tok/s, server prefill tok/s): 2005, 72.3, 1009.9; 1966, 78.0, 1033.1; 1952, 75.4, 1033.0. All runs passed the harness memory guard (min free 56%, no swap rise) and the external-compiler overlap check; attempts that overlapped an external compiler were kept in juke-runs and excluded. Juke shim loaded with MTLPROF_TIMING=0 (no per-encoder timing), same as the Oct 18 receipts. b34adcd7 is not an ancestor of origin/dev or origin/main (its work landed via a different commit); the measured binary is the b34adcd7 build."
}
```

```json
{
  "id": "f5bb1a52-10b0-55de-ba44-0175841c6823",
  "dataset_sha256": "99ec277c8a9e4b59d568776211b2c8cc5aa80d65e295101754f16f7aa0fdd73c",
  "script_sha256": {
    "best_runs_summary.py": "bbda29c29758f3d77312f2e3c7db2176dabf7757da6414e607d947ac52cc1f66",
    "c1_best_run.py": "d1492f3614e9280c8e3697d21677a774c57c7d7ce4c80408e8a1780d391856b2",
    "c1_plain_run.py": "3ea5a36bdc3ed90a9535e4fd0e710274fe6279c1e3a8821140d40df925e11f5c",
    "cohort-ttft/ttft.py": "ac2a8bdc952fcc3ce1ea3e524330c1abef5f6924dbcf8278bf29568ac5e314ec",
    "one_row_rates.py": "55677f7863b8f242fbf30c2291e943893b3b2c29867bdbc397e678ac08f7b671",
    "one_row_run.py": "2ff62ec19e2d8acdb5f988a4358f6b5b9e666095b7c695bcbf58751da2f94c42",
    "queue_best_runs.sh": "b601621e4f11407c275efe0fd609a083ff4cff669120121273759bcf924ec67d"
  },
  "notes": "Best-runs rerun of the Oct 18 reference config on the clean b34adcd7 binary (a0f00089). Per rep (ttft ms, decode tok/s, server prefill tok/s): 1958, 79.8, 1028.4; 1940, 70.3, 1041.8; 1933, 70.5, 1039.9. All runs passed the harness memory guard (min free 56%, no swap rise) and the external-compiler overlap check; attempts that overlapped an external compiler were kept in juke-runs and excluded. Juke shim loaded with MTLPROF_TIMING=0 (no per-encoder timing), same as the Oct 18 receipts. b34adcd7 is not an ancestor of origin/dev or origin/main (its work landed via a different commit); the measured binary is the b34adcd7 build."
}
```

```json
{
  "id": "2fc9151b-a47a-5ce7-9e0b-42cb4a934062",
  "dataset_sha256": "e6a7b18edf1f1b83e0f1848838dfaa2fea3952c50bef9c20d0903319abdb8e99",
  "script_sha256": {
    "best_runs_summary.py": "17abc8fdbb902e863b87d6e1df8f9567d5a663e91b75eb3f18a29c5946b4496f",
    "c1_best_run.py": "d1492f3614e9280c8e3697d21677a774c57c7d7ce4c80408e8a1780d391856b2",
    "c1_plain_run.py": "3ea5a36bdc3ed90a9535e4fd0e710274fe6279c1e3a8821140d40df925e11f5c",
    "cohort-ttft/ttft.py": "ac2a8bdc952fcc3ce1ea3e524330c1abef5f6924dbcf8278bf29568ac5e314ec",
    "one_row_rates.py": "55677f7863b8f242fbf30c2291e943893b3b2c29867bdbc397e678ac08f7b671",
    "one_row_run.py": "2ff62ec19e2d8acdb5f988a4358f6b5b9e666095b7c695bcbf58751da2f94c42",
    "queue_best_runs.sh": "b601621e4f11407c275efe0fd609a083ff4cff669120121273759bcf924ec67d"
  },
  "notes": "Best-runs rerun of the Oct 18 reference config on the clean b34adcd7 binary (a0f00089). Correction of e3b89fc0-4346-5d59-b912-fb82002e20a1: adds the server-timed cohort prefill_tps measured in the same 3 runs (first version recorded it as not measured); all other measurements unchanged. Cohort prefill per rep 891, 865, 799 tok/s. TTFT p90 16037 ms. Lane decode min/max 9.59/19.90. Per rep (burst tok/s, p50 s, p90 s): 163.3, 8.90, 15.48; 159.9, 9.12, 16.01; 149.5, 9.76, 17.32. All runs passed the harness memory guard (min free 56%, no swap rise) and the external-compiler overlap check; attempts that overlapped an external compiler were kept in juke-runs and excluded. Juke shim loaded with MTLPROF_TIMING=0 (no per-encoder timing), same as the Oct 18 receipts. b34adcd7 is not an ancestor of origin/dev or origin/main (its work landed via a different commit); the measured binary is the b34adcd7 build."
}
```

```json
{
  "id": "b6f4238c-e112-523f-b825-4ebd85383328",
  "dataset_sha256": "e6a7b18edf1f1b83e0f1848838dfaa2fea3952c50bef9c20d0903319abdb8e99",
  "script_sha256": {
    "best_runs_summary.py": "17abc8fdbb902e863b87d6e1df8f9567d5a663e91b75eb3f18a29c5946b4496f",
    "c1_best_run.py": "d1492f3614e9280c8e3697d21677a774c57c7d7ce4c80408e8a1780d391856b2",
    "c1_plain_run.py": "3ea5a36bdc3ed90a9535e4fd0e710274fe6279c1e3a8821140d40df925e11f5c",
    "cohort-ttft/ttft.py": "ac2a8bdc952fcc3ce1ea3e524330c1abef5f6924dbcf8278bf29568ac5e314ec",
    "one_row_rates.py": "55677f7863b8f242fbf30c2291e943893b3b2c29867bdbc397e678ac08f7b671",
    "one_row_run.py": "2ff62ec19e2d8acdb5f988a4358f6b5b9e666095b7c695bcbf58751da2f94c42",
    "queue_best_runs.sh": "b601621e4f11407c275efe0fd609a083ff4cff669120121273759bcf924ec67d"
  },
  "notes": "Best-runs rerun of the Oct 18 reference config on the clean b34adcd7 binary (a0f00089). Correction of 111a1883-7304-5dd2-9462-20b14d911eb7: adds the server-timed cohort prefill_tps measured in the same 3 runs (first version recorded it as not measured); all other measurements unchanged. Cohort prefill per rep 894, 878, 886 tok/s. TTFT p90 15426 ms. Lane decode min/max 6.26/20.74. Per rep (burst tok/s, p50 s, p90 s): 144.4, 8.86, 15.39; 149.4, 9.04, 15.61; 154.5, 8.87, 15.43. All runs passed the harness memory guard (min free 56%, no swap rise) and the external-compiler overlap check; attempts that overlapped an external compiler were kept in juke-runs and excluded. Juke shim loaded with MTLPROF_TIMING=0 (no per-encoder timing), same as the Oct 18 receipts. b34adcd7 is not an ancestor of origin/dev or origin/main (its work landed via a different commit); the measured binary is the b34adcd7 build."
}
```

## Public disclosure boundary

The marketing page retains measured results, workload definitions and limitations. Private PR links, detailed scheduling and verification mechanics, and reproduction recipes remain internal to this research record rather than shipped website content. The animation is a conceptual view of concurrent processing.
