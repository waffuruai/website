import type { Localized } from '@/content/types';
import es from './quantized-models.es';
import fr from './quantized-models.fr';
import ja from './quantized-models.ja';
import ko from './quantized-models.ko';
import zh from './quantized-models.zh';

/**
 * Public, frozen numbers behind the quantized-models teaser. Every value
 * comes from the TurboQuant+ weight-compression paper (our open research)
 * as measured on our llama.cpp fork, llama-cpp-turboquant. None of them is
 * a Butter, Iron or released-model result; the section labels them that way.
 *
 * Source (one paper, one model, one machine):
 * - https://github.com/TheTom/turboquant_plus/blob/main/docs/papers/weight-compression-tq4.md
 *   Section 4.2, "Cross-Model Validation": Qwen3.5-35B-A3B (MoE, 40 layers),
 *   q8_0 34.4G to Config I 21.6G, -37%, +1.4% PPL, 102% decode.
 *   Section 4.3, "Stacking with TurboQuant KV Compression": same model,
 *   M5 Max, 32K context, Config I + turbo3 KV = 23.4G vs 39.4G for
 *   q8_0 + f16 KV (59% of baseline, so 41% less), +1.4% PPL, 77 vs 79 t/s.
 *   Config I itself (Section 4.1): TQ4_1S for attention and FFN gate/up,
 *   native Q4_K for ffn_down, first 2 + last 2 layers kept at q8_0.
 *
 * Numbers live here, not in the localized copy, so a translation cannot
 * change them and the locale parity test keeps the links identical.
 *
 * TODO(founder): replace with the first released model's own numbers
 * (model, format, size vs baseline, quality delta, how it was measured)
 * once something has shipped. Until then the section shows research
 * numbers only.
 */
export const quantizedModelsEvidence = {
  /** Where the public numbers were measured. */
  hardware: 'M5 Max · 128 GB · Metal',
  fork: 'llama-cpp-turboquant',
  model: 'Qwen3.5-35B-A3B',
  tiles: {
    /** Weights alone: Config I vs the q8_0 source file. */
    weights: {
      reduction: 37,
      ppl: 1.4,
      source: 'Config I vs q8_0 · Qwen3.5-35B-A3B',
    },
    /** Weights and KV together at 32K context, vs q8_0 weights + f16 KV. */
    stacked: {
      reduction: 41,
      ppl: 1.4,
      context: '32K',
      source: 'Config I + turbo3 KV vs q8_0 + f16 KV · 32K context',
    },
  },
  /** Boundary layers kept at higher precision in Config I: first 2, last 2. */
  boundary: 2,
  /** The weight-compression paper, the one public source for this section. */
  paperHref:
    'https://github.com/TheTom/turboquant_plus/blob/main/docs/papers/weight-compression-tq4.md',
  links: [
    {
      label: 'TurboQuant+',
      href: 'https://github.com/TheTom/turboquant_plus',
    },
    {
      label: 'llama-cpp-turboquant',
      href: 'https://github.com/TheTom/llama-cpp-turboquant',
    },
  ],
} as const;

export type QuantizedModelsCopy = {
  eyebrow: string;
  /** Serif title; `*word*` is the gold accent. */
  title: string;
  /** Two sentences. */
  intro: string;
  method: {
    heading: string;
    /** Four points, in order: layer-aware, boundary, tensor role, KV + weights budget, checked. */
    items: { title: string; body: string }[];
  };
  tiles: {
    heading: string;
    /** Where the numbers were measured. */
    scope: string;
    weights: { label: string; detail: string };
    stacked: { label: string; detail: string };
    /** Word before the source conditions, e.g. "Source". */
    source: string;
    /** Link text for the paper. */
    paper: string;
  };
  strip: {
    label: string;
    /** Says the drawing is a schematic, not a real layer map. */
    note: string;
    legend: {
      boundary: string;
      attention: string;
      ffnRead: string;
      ffnDown: string;
    };
    first: string;
    last: string;
  };
  soon: {
    heading: string;
    /** What ships and how each build is published. */
    body: string;
    /**
     * The one sentence that mentions our tooling. Two variants are drafted;
     * pick one. Variant A (in the data) names Juke; variant B (in the
     * comment beside it) does not.
     */
    tooling: string;
    cta: string;
  };
};

export const quantizedModels: Localized<QuantizedModelsCopy> = {
  en: {
    eyebrow: 'Quantized models · coming soon',
    title: 'Models, quantized *with care*.',
    intro:
      'We are preparing quantized builds of the models Butter serves, made with the same method as our open TurboQuant+ weight research. Smaller files, quality that holds, and the headroom to run more of them at once.',
    method: {
      heading: 'How we quantize',
      items: [
        {
          title: 'Layer-aware',
          body: 'Each layer gets its own precision instead of one setting for the whole model.',
        },
        {
          title: 'Boundary layers protected',
          body: 'The first and last layers stay at higher precision. They are the most sensitive, in weights and in the KV cache alike.',
        },
        {
          title: 'Precision follows tensor role',
          body: 'Attention and FFN read projections compress well. Write-back projections like ffn_down keep a native format.',
        },
        {
          title: 'Weights and KV budgeted together',
          body: 'Weight precision and KV cache precision are chosen as one memory budget, then checked against the unquantized baseline before anything ships.',
        },
      ],
    },
    tiles: {
      heading: 'What the method did in our open research',
      scope:
        'Measured with TurboQuant+ on our llama.cpp fork, llama-cpp-turboquant.',
      weights: {
        label: 'smaller weights with the Config I policy',
        detail: 'perplexity vs q8_0',
      },
      stacked: {
        label: 'less total memory with weights and KV compressed together',
        detail: 'perplexity vs q8_0 weights and f16 KV',
      },
      source: 'Source',
      paper: 'Read the weight-compression paper',
    },
    strip: {
      label: 'How precision is laid out',
      note: 'Schematic. The first and last layers keep full precision; the rest are coloured by tensor role. Real layer counts and policies differ per model.',
      legend: {
        boundary: 'Boundary layer · higher precision',
        attention: 'Attention · compressed',
        ffnRead: 'FFN gate and up · compressed',
        ffnDown: 'FFN down · native 4-bit',
      },
      first: 'First layers',
      last: 'Last layers',
    },
    soon: {
      heading: 'Coming soon',
      body: 'The first builds land soon. Each one ships with its base model, its format, its size against the baseline and the quality checks it passed.',
      // Variant B, without the name:
      // 'They will get better over time, measured with our own profiling and evaluation tooling.'
      tooling:
        'They will get better over time, measured with Juke, our profiling and evaluation harness.',
      cta: 'Get notified',
    },
  },
  es,
  fr,
  ja,
  ko,
  zh,
};
