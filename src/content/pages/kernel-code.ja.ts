import type { KernelCodeCopy } from './kernel-code';

const copy: KernelCodeCopy = {
  title: 'あなたが書くのは、ここまで。\n*残りは Iron が書く。*',
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
    title: 'チューニングの状況',
    note: 'パルスの速さ = チューニングの進み具合',
  },
  tiers: [
    {
      name: 'Apple · Metal',
      level: 'primary',
      label: 'プライマリ',
      note: 'すべてのカーネルを、まずここで書き、チューニングします。MSL → .metallib。',
    },
    {
      name: 'NVIDIA · CUDA',
      level: 'secondary',
      label: 'チューニング中',
      note: 'RTX と DGX Spark では本番稼働中。CUDA → PTX。',
    },
    {
      name: 'AMD ROCm · Vulkan',
      level: 'runs',
      label: '近日対応',
      note: 'AMD では急速に前進中で、MI300 では初回の実行を終えています。HIP → AMDGPU、Vulkan → SPIR-V。',
    },
  ],
  runsOn: {
    label: '動作環境',
    items: [
      'MacBook & Mac Studio',
      'RTX ワークステーション',
      'DGX Spark',
      'Strix Halo',
      'ネオクラウドのフリート',
    ],
    pending: 'H100 · H200 · B100 · B200 · 初回実行',
  },
};

export default copy;
