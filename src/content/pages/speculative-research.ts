import type { Localized } from '@/content/types';
import es from './speculative-research.es';
import fr from './speculative-research.fr';
import ja from './speculative-research.ja';
import ko from './speculative-research.ko';
import zh from './speculative-research.zh';

/**
 * One measured concurrency level: `requests` concurrent requests released
 * together. `burst` is total output tokens over burst wall time (prefill and
 * drain included); `lane` is the median per-request decode rate; `ttft` /
 * `ttftP90` are p50 / p90 across requests; `prefill` is the prefill rate.
 */
export type ConcurrencyLevel = {
  requests: number;
  burst: number;
  lane: number;
  ttft: number;
  ttftP90: number;
  prefill: number;
};

/**
 * Frozen observations. The concurrency ladder (`levels`, 1 / 2 / 4 / 8
 * concurrent requests) comes from the 26 October 2026 runs (journal receipt
 * RECEIPT-p3-concurrency-20261026): three runs per level, roughly 937 input
 * tokens per request and a 600-token output cap, a fresh server per cell,
 * barrier-released bursts. The first level feeds the single-request card,
 * the last level feeds the highlight card, every level feeds the scaling
 * strip. The paired optimization gain (`before` / `after` / `gain`) comes
 * from the 18 October 2026 paired all-active runs (journal receipts 2fc9151b
 * and b6f4238c) and is a separate trial and clock.
 */
export const speculativeEvidence = {
  model: 'Qwen3.8-27B · 4-bit · DFlash2',
  hardware: 'M5 Max · 128 GiB · Metal',
  concurrency: 8,
  greedy: {
    levels: [
      {
        requests: 1,
        burst: 103.0,
        lane: 129.1,
        ttft: 0.96,
        ttftP90: 1.58,
        prefill: 1011,
      },
      {
        requests: 2,
        burst: 107.1,
        lane: 74.7,
        ttft: 1.39,
        ttftP90: 1.85,
        prefill: 1034,
      },
      {
        requests: 4,
        burst: 129.4,
        lane: 48.0,
        ttft: 2.56,
        ttftP90: 4.04,
        prefill: 907,
      },
      {
        requests: 8,
        burst: 145.6,
        lane: 26.3,
        ttft: 4.47,
        ttftP90: 8.2,
        prefill: 898,
      },
    ] satisfies readonly ConcurrencyLevel[],
    before: 215.4,
    after: 226.61,
    gain: 5.2,
  },
  sampled: {
    // T0.7 (top-p 0.95, top-k 20, min-p 0) ladder, same harness and build:
    // receipt RECEIPT-p3-concurrency-t07-20261026.
    levels: [
      {
        requests: 1,
        burst: 72.6,
        lane: 91.5,
        ttft: 1.0,
        ttftP90: 1.02,
        prefill: 979,
      },
      {
        requests: 2,
        burst: 75.9,
        lane: 48.6,
        ttft: 1.92,
        ttftP90: 3.07,
        prefill: 974,
      },
      {
        requests: 4,
        burst: 112.2,
        lane: 48.7,
        ttft: 2.6,
        ttftP90: 4.29,
        prefill: 855,
      },
      {
        requests: 8,
        burst: 125.2,
        lane: 23.9,
        ttft: 4.81,
        ttftP90: 8.79,
        prefill: 837,
      },
    ] satisfies readonly ConcurrencyLevel[],
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
    /** Column heading of the per-concurrency table and the strip's axis. */
    requests: string;
    burst: string;
    lane: string;
    concurrentTtft: string;
    concurrentTtftP90: string;
    prefill: string;
  };
  /** How each table row was aggregated, stated next to the value. */
  aggregation: {
    burst: string;
    perRequest: string;
    ttft: string;
    prefill: string;
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
  /** Heading and scope line of the concurrency scaling strip. */
  scalingTitle: string;
  scalingScope: string;
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
      comparison: 'Recorded concurrency results',
      aggregation: 'Aggregation',
      requests: 'Concurrent requests',
      burst: 'Whole-burst throughput',
      lane: 'Decode per request',
      concurrentTtft: 'Time to first token p50',
      concurrentTtftP90: 'Time to first token p90',
      prefill: 'Prefill',
    },
    aggregation: {
      burst: 'Total output tokens over burst wall time, three runs per level',
      perRequest: 'Median per request across three runs',
      ttft: 'Across every request in three runs',
      prefill: 'Across three runs per level',
    },
    eyebrow: 'Measured on Apple silicon · 18 to 26 October 2026',
    title: '27B.\n*8 requests. One Mac.*',
    intro:
      'Keep local agents moving, even when requests overlap. Butter and Iron combine native Metal kernels, speculative decoding and shared verification. Here is what we measured on one M5 Max.',
    greedy: 'Greedy · T0',
    sampled: 'Sampled · T0.7',
    unit: 'tok/s',
    singleTitle: 'One active request',
    singleScope: 'About 937 input tokens · 600-token output cap',
    burstTitle: '8 concurrent requests',
    burstScope: 'Whole-burst throughput · includes prefill and drain',
    scalingTitle: 'Whole-burst throughput as requests overlap',
    scalingScope: 'Three runs per level · same prompts, fresh server per level',
    perRequest: 'Per request',
    ttft: 'Time to first token',
    p50: 'p50',
    p90: 'p90',
    gainHeading: 'Optimization gain, paired runs',
    gainTitle: 'Faster all-active decoding',
    gainScope: 'All-active decode gain · paired concurrent trials',
    before: 'Before',
    after: 'After',
    activeTitle: 'Same model. Less repeated work.',
    activeScope:
      'All-active throughput counts only the interval when every request is decoding. It uses separate trials from the whole-burst results above.',
    replay: 'Replay the flow',
    illustration: 'How it works · schematic',
    privateLanes: 'Private request lanes',
    sharedVerify: 'Shared target verification',
    committed: 'Verified tokens advance',
    diagramNote:
      'Concurrent requests share one local inference system. This conceptual animation illustrates concurrent processing, not internal scheduling, timing or acceptance.',
    details: 'See test conditions and limitations',
    method:
      'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, raw BF16 KV. Concurrency runs, 26 October 2026: three runs at each of 1, 2, 4 and 8 concurrent requests, roughly 937 input tokens per request and a 600-token output cap, a fresh server for every level and no timed prefix-cache reuse. Whole-burst throughput divides total output tokens by burst wall time, prefill and drain included. The paired optimization trials from 18 October 2026 run greedy and T0.7; T0.7 uses top-p 0.95, top-k 20 and min-p 0.',
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
