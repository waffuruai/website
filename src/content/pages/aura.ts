import type { Localized } from '@/content/types';
import es from './aura.es';
import fr from './aura.fr';
import ja from './aura.ja';
import ko from './aura.ko';
import zh from './aura.zh';

/**
 * Public, frozen numbers behind the AURA section. Every value here comes from
 * the TurboQuant+ README (our open research) as measured on our llama.cpp
 * fork, llama-cpp-turboquant. None of them is a Butter or Iron result; the
 * section labels them that way and the footnote says so again.
 *
 * Sources:
 * - https://github.com/TheTom/turboquant_plus (README, "Quality at a Glance"
 *   table: turbo4 3.8x at +0.23% PPL vs q8_0; turbo3 4.6x at +1.06%;
 *   wikitext-2, 512 context, M5 Max 128 GB)
 * - Same README, intro: 104B at 128K context on a MacBook, turbo3,
 *   PPL 4.024, 74 GB peak memory.
 * - https://github.com/vllm-project/vllm/pull/38479 (merged)
 * - https://github.com/ml-explore/mlx-swift-lm/pull/232 (merged)
 *
 * Numbers live here, not in the localized copy, so a translation cannot
 * change them and the locale parity test keeps the links identical.
 *
 * TODO(founder): AURA's Butter-native capacity number goes here once it is
 * qualified, for example "sessions at 32K context that fit in 128 GB, raw vs
 * AURA" on Qwen3.8-27B. Until then the section shows no Butter number.
 */
export const auraEvidence = {
  /** Where the public numbers were measured. */
  hardware: 'M5 Max · 128 GB · Metal',
  fork: 'llama-cpp-turboquant',
  /** GitHub star counts, rounded down, read on 26 October 2026. */
  tiles: {
    turbo4: { compression: 3.8, ppl: 0.23, source: 'turbo4 · wikitext-2' },
    turbo3: { compression: 4.6, ppl: 1.06, source: 'turbo3 · wikitext-2' },
    large: {
      params: '104B',
      context: '128K',
      peakGb: 74,
      ppl: 4.024,
      source: 'turbo3 · 128K',
    },
  },
  /** The ribbon draws raw blocks this many times wider than compressed ones. */
  ribbonRatio: 3.8,
  /** The TurboQuant paper, linked inline where a step body brackets its name. */
  paperHref: 'https://arxiv.org/abs/2504.19874',
  links: {
    research: [
      {
        label: 'TurboQuant+',
        href: 'https://github.com/TheTom/turboquant_plus',
        stars: '7,000+',
      },
      {
        label: 'llama-cpp-turboquant',
        href: 'https://github.com/TheTom/llama-cpp-turboquant',
        stars: '2,400+',
      },
    ],
    upstream: [
      {
        label: 'vLLM #38479',
        href: 'https://github.com/vllm-project/vllm/pull/38479',
      },
      {
        label: 'Apple mlx-swift-lm #232',
        href: 'https://github.com/ml-explore/mlx-swift-lm/pull/232',
      },
    ],
  },
} as const;

export type AuraCopy = {
  eyebrow: string;
  /** Screen-reader suffix after a star count, e.g. "7,000+ GitHub stars". */
  starsLabel: string;
  /** Serif title; `*word*` is the gold accent. */
  title: string;
  intro: string;
  lineage: {
    heading: string;
    /** Three steps, in order: open research, upstream adoption, AURA. */
    steps: { kicker: string; title: string; body: string }[];
  };
  tiles: {
    heading: string;
    /** "Results from our llama.cpp fork, not Butter" style disclosure. */
    scope: string;
    turbo4: { label: string; detail: string };
    turbo3: { label: string; detail: string };
    large: { label: string; detail: string };
    /** Word before the source conditions, e.g. "Source". */
    source: string;
  };
  ribbon: {
    label: string;
    older: string;
    recent: string;
    /** Says the drawing is a schematic at the public turbo4 ratio. */
    note: string;
  };
  changed: {
    heading: string;
    items: string[];
    /** One sentence on the hybrid mode. No numbers. */
    hybrid: string;
  };
  footnote: string;
};

export const aura: Localized<AuraCopy> = {
  en: {
    eyebrow: 'KV cache compression · from our open research',
    starsLabel: 'GitHub stars',
    title: 'More context per *gigabyte*.',
    intro:
      'AURA is our compression for the KV cache, embeddings and model weights. Here it compresses the KV cache, so longer contexts and more concurrent sessions fit in the same memory. It began as our open TurboQuant+ research and now runs natively in Iron and Butter.',
    lineage: {
      heading: 'Where it comes from',
      steps: [
        {
          kicker: '01 · Open research',
          title: 'TurboQuant+',
          body: 'The leading open-source implementation of the [TurboQuant paper] (Google Research, ICLR 2026) with follow-on findings: value compression is nearly free, quality loss comes from keys, and the first and last layers need protecting. Shipped in our llama.cpp fork, llama-cpp-turboquant.',
        },
        {
          kicker: '02 · Adopted upstream',
          title: 'vLLM and Apple MLX',
          body: 'The same research landed in vLLM as a KV cache dtype and in Apple mlx-swift-lm as a KV cache scheme, both merged in 2026.',
        },
        {
          kicker: '03 · In our stack',
          title: 'AURA in Iron and Butter',
          body: 'Rewritten for our own kernels and server. It now differs enough from the paper to carry its own name.',
        },
      ],
    },
    tiles: {
      heading: 'Public results from our open research',
      scope:
        'Measured with TurboQuant+ on our llama.cpp fork, llama-cpp-turboquant. These are not Butter numbers.',
      turbo4: {
        label: 'KV compression at the best quality setting',
        detail: 'perplexity vs q8_0',
      },
      turbo3: {
        label: 'KV compression at a tighter setting',
        detail: 'perplexity vs q8_0',
      },
      large: {
        label: 'parameters at 128K context on one MacBook',
        detail: 'peak memory',
      },
      source: 'Source',
    },
    ribbon: {
      label: 'How the cache is laid out',
      older: 'Older context · compressed',
      recent: 'Recent window · raw',
      note: 'Schematic. Block widths are drawn at the public turbo4 ratio of 3.8 to 1, not at a measured AURA ratio.',
    },
    changed: {
      heading: 'What changed in AURA',
      items: [
        'One compressed KV copy is shared across the heads of a grouped-query group.',
        'Compressed flash attention runs on Metal for every codec width.',
        'Compression is scheduled around speculative decoding, so drafted tokens never overwrite accepted history.',
        'Long-context prefill is windowed and sink-aware, so the first tokens stay in reach as the context grows.',
      ],
      hybrid:
        'Hybrid mode: recent history stays at full precision while older context compresses, so long sessions keep their sharpest memory where it counts.',
    },
    footnote:
      'Compression ratios, perplexity deltas and the 104B result come from our open TurboQuant+ research, measured on llama-cpp-turboquant. AURA takes that work further inside Iron and Butter.',
  },
  es,
  fr,
  ja,
  ko,
  zh,
};
