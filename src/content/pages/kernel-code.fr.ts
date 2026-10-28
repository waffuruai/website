import type { KernelCodeCopy } from './kernel-code';

const copy: KernelCodeCopy = {
  title: 'Vous écrivez ceci.\n*Iron écrit le reste.*',
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
    title: 'Où c’est optimisé',
    note: 'Pulsation = avancement de l’optimisation',
  },
  tiers: [
    {
      name: 'Apple · Metal',
      level: 'primary',
      label: 'Principal',
      note: 'Chaque kernel est d’abord écrit et optimisé ici. MSL → .metallib.',
    },
    {
      name: 'NVIDIA · CUDA',
      level: 'secondary',
      label: 'En optimisation',
      note: 'En production sur RTX et DGX Spark. CUDA → PTX.',
    },
    {
      name: 'AMD ROCm · Vulkan',
      level: 'runs',
      label: 'Bientôt',
      note: 'Avance vite sur AMD, premières exécutions sur MI300. HIP → AMDGPU, Vulkan → SPIR-V.',
    },
  ],
  runsOn: {
    label: 'Fonctionne sur',
    items: [
      'MacBook & Mac Studio',
      'Stations RTX',
      'DGX Spark',
      'Strix Halo',
      'Flottes de neoclouds',
    ],
    pending: 'H100 · H200 · B100 · B200 · premières exécutions',
  },
};

export default copy;
