import type { Localized } from '@/content/types';
import es from './kernel-code.es';
import fr from './kernel-code.fr';
import ja from './kernel-code.ja';
import ko from './kernel-code.ko';
import zh from './kernel-code.zh';

/*
 * "You write this. Iron writes the rest.": a real Iron kernel, the backends
 * it lowers to with how far each is tuned, and the hardware it runs on. The
 * kernel's tokens are code, so they stay identical in every locale.
 */

export type CodeToken = {
  text: string;
  kind?: 'comment' | 'keyword' | 'function';
};

/** How well a backend is tuned today; drives the bars and the pulse speed. */
export type TuneLevel = 'primary' | 'secondary' | 'runs';

export type KernelCodeCopy = {
  title: string;
  code: { file: string; label: string; tokens: CodeToken[] };
  tuned: { title: string; note: string };
  tiers: { name: string; level: TuneLevel; label: string; note: string }[];
  runsOn: { label: string; items: string[]; pending: string };
};

export const kernelCode: Localized<KernelCodeCopy> = {
  en: {
    title: 'You write this.\n*Iron writes the rest.*',
    code: {
      file: 'unary.rs',
      label: 'iron · rust dsl',
      tokens: [
        {
          text: '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
          kind: 'comment',
        },
        { text: '\n' },
        { text: 'pub fn', kind: 'keyword' },
        { text: ' ' },
        { text: 'iron_exp', kind: 'function' },
        { text: '<T>(a: Tensor<T>, out: Tensor<T>) {\n    ' },
        { text: 'let', kind: 'keyword' },
        {
          text: ' idx = program_id(0);\n    store(out[idx], exp(load(a[idx])));\n}',
        },
      ],
    },
    tuned: {
      title: 'Where it’s tuned',
      note: 'Pulse = how far tuning has gone',
    },
    tiers: [
      {
        name: 'Apple · Metal',
        level: 'primary',
        label: 'Primary',
        note: 'Every kernel is written and tuned here first. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        level: 'secondary',
        label: 'Tuning',
        note: 'In production on RTX and DGX Spark. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        level: 'runs',
        label: 'Coming soon',
        note: 'Moving fast on AMD, with first runs on MI300. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: {
      label: 'Runs on',
      items: [
        'MacBook & Mac Studio',
        'RTX workstations',
        'DGX Spark',
        'Strix Halo',
        'Neocloud fleets',
      ],
      pending: 'H100 · H200 · B100 · B200 · first runs',
    },
  },
  es,
  fr,
  zh,
  ja,
  ko,
};
