import type { Localized } from '@/content/types';
import es from './speculative-research.es';
import fr from './speculative-research.fr';
import ja from './speculative-research.ja';
import ko from './speculative-research.ko';
import zh from './speculative-research.zh';

/**
 * Frozen observations from 18 and 19 October 2026 (journal receipts 2fc9151b
 * and b6f4238c). Burst, all-active and single-stream are separate trials and
 * clocks. Single-stream values are medians of three runs; the whole-burst
 * throughput pools three runs of 16 requests; the per-request decode is the
 * median across those concurrent requests and the TTFT values are p50 / p90
 * across them. The paired optimization gain (`before` / `after` / `gain`)
 * comes from the 18 October paired runs.
 */
export const speculativeEvidence = {
  model: 'Qwen3.8-27B · 4-bit · DFlash2',
  hardware: 'M5 Max · 128 GiB · Metal',
  concurrency: 16,
  greedy: {
    single: 75.4,
    prefill: 1033,
    ttft: 1.97,
    burst: 157.3,
    lane: 12.9,
    concurrentTtft: 8.76,
    concurrentTtftP90: 16.0,
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
    concurrentTtftP90: 15.4,
    before: 217.62,
    after: 236.8,
    gain: 8.81,
  },
} as const;

export type SpeculativeResearchCopy = {
  metrics: {
    sampling: string;
    metric: string;
    comparison: string;
    aggregation: string;
    prefill: string;
    singleTtft: string;
    lane: string;
    concurrentTtft: string;
    concurrentTtftP90: string;
  };
  /** How each table row was aggregated, stated next to the value. */
  aggregation: { single: string; burst: string; perRequest: string };
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
  /** Per-user experience on the burst card: label, then "p50 / p90". */
  perRequest: string;
  ttft: string;
  p50: string;
  p90: string;
  gainHeading: string;
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
};

export const speculativeResearch: Localized<SpeculativeResearchCopy> = {
  en: {
    metrics: {
      sampling: 'Sampling mode',
      metric: 'Metric',
      comparison: 'Recorded workload results',
      aggregation: 'Aggregation',
      prefill: 'Single-stream prefill',
      singleTtft: 'Single-stream TTFT',
      lane: 'Decode per concurrent request',
      concurrentTtft: 'Concurrent TTFT p50',
      concurrentTtftP90: 'Concurrent TTFT p90',
    },
    aggregation: {
      single: 'Median of three runs',
      burst: 'Pooled whole-burst throughput across three runs of 16 requests',
      perRequest: 'Per request across the three 16-request runs',
    },
    eyebrow: 'Measured on Apple silicon · 18 and 19 October 2026',
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
    perRequest: 'Per request',
    ttft: 'Time to first token',
    p50: 'p50',
    p90: 'p90',
    gainHeading: 'Optimization gain, paired runs',
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
      '16 requests share one local inference system. This conceptual animation illustrates concurrent processing, not internal scheduling, timing or acceptance.',
    details: 'See test conditions and limitations',
    method:
      'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, raw BF16 KV. Single-stream: three runs, 2,052 input tokens and a 128-token output cap. Whole-burst: three runs of 16 requests, roughly 937 input tokens per request and a 600-token output cap. Fresh servers with excluded warmups; no timed prefix-cache reuse. T0.7 uses top-p 0.95, top-k 20 and min-p 0.',
    cost: 'The paired optimization trials use 882 to 999 input tokens and a 600-token output cap: three greedy pairs and eight sampled pairs. Sampled p50 time to first token increased from 9.030 to 9.397 seconds. This is a throughput result, not a uniform latency improvement.',
    qualification:
      'Greedy paired trials retained all 48 candidate response texts and token counts. A separate agentic regression replay retained 111/111 responses and counts, but did not improve replay latency. These throughput workloads do not establish broad task quality, tool accuracy or lower token usage.',
  },
  es,
  fr,
  ja,
  ko,
  zh,
};
