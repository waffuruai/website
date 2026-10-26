import type { Localized } from '@/content/types';
import es from './speculative-research.es';
import fr from './speculative-research.fr';
import ja from './speculative-research.ja';
import ko from './speculative-research.ko';
import zh from './speculative-research.zh';

/** Frozen Oct 19 observations. Burst, all-active and single-stream are separate trials/clocks. */
export const speculativeEvidence = {
  model: 'Qwen3.8-27B · 4-bit · DFlash2',
  hardware: 'M5 Max · 128 GiB · Metal',
  greedy: {
    single: 75.4,
    prefill: 1033,
    ttft: 1.97,
    burst: 157.3,
    lane: 12.9,
    concurrentTtft: 8.76,
    before: 215.4,
    after: 226.61,
    gain: 5.2,
  },
  sampled: {
    single: 70.5,
    prefill: 1040,
    ttft: 1.94,
    burst: 149.4,
    lane: 12.3,
    concurrentTtft: 8.44,
    before: 217.62,
    after: 236.8,
    gain: 8.81,
  },
  sources: [
    {
      label: 'Butter #1149',
      href: 'https://github.com/waffuruai/butter/pull/1149',
    },
    {
      label: 'Butter #1121',
      href: 'https://github.com/waffuruai/butter/pull/1121',
    },
    {
      label: 'Butter #1095',
      href: 'https://github.com/waffuruai/butter/pull/1095',
    },
    { label: 'Iron #654', href: 'https://github.com/waffuruai/iron/pull/654' },
    { label: 'Iron #663', href: 'https://github.com/waffuruai/iron/pull/663' },
    { label: 'Bench #6', href: 'https://github.com/waffuruai/bench/pull/6' },
  ],
} as const;

export type SpeculativeResearchCopy = {
  metrics: {
    sampling: string;
    metric: string;
    comparison: string;
    prefill: string;
    singleTtft: string;
    lane: string;
    concurrentTtft: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  greedy: string;
  sampled: string;
  unit: string;
  singleTitle: string;
  singleScope: string;
  burstTitle: string;
  burstScope: string;
  gainTitle: string;
  gainScope: string;
  before: string;
  after: string;
  activeTitle: string;
  activeScope: string;
  replay: string;
  illustration: string;
  privateLanes: string;
  sharedVerify: string;
  committed: string;
  diagramNote: string;
  details: string;
  method: string;
  cost: string;
  qualification: string;
  sources: string;
  steps: { title: string; body: string }[];
};

export const speculativeResearch: Localized<SpeculativeResearchCopy> = {
  en: {
    metrics: {
      sampling: 'Sampling mode',
      metric: 'Metric',
      comparison: 'Separate workload medians',
      prefill: 'Single-stream prefill',
      singleTtft: 'Single-stream TTFT',
      lane: 'Median decode per concurrent request',
      concurrentTtft: 'Median concurrent TTFT',
    },
    eyebrow: 'Measured on Apple silicon · 19 October 2026',
    title: '27B.\n*16 requests. One Mac.*',
    intro:
      'Keep local agents moving, even when requests overlap. Butter and Iron combine native Metal kernels, speculative decoding and shared verification. Here is what we measured on one M5 Max.',
    greedy: 'Greedy · T0',
    sampled: 'Sampled · T0.7',
    unit: 'tok/s',
    singleTitle: 'One active request',
    singleScope: '2,052 input tokens · 128-token output cap',
    burstTitle: '16 concurrent requests',
    burstScope: 'Whole-burst throughput · includes prefill and drain',
    gainTitle: 'Faster all-active decoding',
    gainScope: 'All-active decode gain · paired 16-request trials',
    before: 'Before',
    after: 'After',
    activeTitle: 'Same model. Less repeated work.',
    activeScope:
      'All-active throughput counts only the interval when every request is decoding. It uses separate trials from the whole-burst result above.',
    replay: 'Replay the flow',
    illustration: 'How it works · schematic',
    privateLanes: 'Private request lanes',
    sharedVerify: 'Shared target verification',
    committed: 'Verified tokens advance',
    diagramNote:
      '16 active requests rotate through cohorts of up to 8 lanes. The target checks proposals; each request keeps its own cache, recurrent state and sampler. This animation illustrates the architecture, not timing or acceptance.',
    details: 'Open the engineering, conditions and evidence',
    method:
      'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, raw BF16 KV. Single-stream: three runs, 2,052 input tokens and a 128-token output cap. Whole-burst: three runs of 16 requests, roughly 937 input tokens per request and a 600-token output cap. Fresh servers with excluded warmups; no timed prefix-cache reuse. T0.7 uses top-p 0.95, top-k 20 and min-p 0.',
    cost: 'The paired optimization trials use 882–999 input tokens and a 600-token output cap: three greedy pairs and eight sampled pairs. Sampled p50 time to first token increased from 9.030 to 9.397 seconds. This is a throughput result, not a uniform latency improvement.',
    qualification:
      'Greedy paired trials retained all 48 candidate response texts and token counts. A separate agentic regression replay retained 111/111 responses and counts, but did not improve replay latency. These throughput workloads do not establish broad task quality, tool accuracy or lower token usage.',
    sources: 'Source PRs and Reproduce with Butter',
    steps: [
      {
        title: 'Native arithmetic, matched row by row',
        body: 'Serial and batched verification use matched reduction orders. Tree attention and recurrent state follow each proposal’s ancestry; only the accepted path is committed.',
      },
      {
        title: 'Target sampling stays in charge',
        body: 'At T0 the target uses greedy verification. At T0.7 it draws from its own distribution and follows a proposed branch only when it matches the draw. Each request owns its randomness.',
      },
      {
        title: 'Share work, keep state private',
        body: 'Measured cost and observed acceptance allocate verification rows across requests. The cohort prepares, verifies and settles together while caches, histories and samplers remain request-local.',
      },
      {
        title: 'Prepare the draft when it is needed',
        body: 'A one-row lane still runs the target. Draft features stay in an existing bounded buffer until drafting resumes or it fills, removing repeated preparation without skipping verification.',
      },
    ],
  },
  es,
  fr,
  ja,
  ko,
  zh,
};
