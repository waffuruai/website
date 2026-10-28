import type { KernelCodeCopy } from './kernel-code';

const copy: KernelCodeCopy = {
  title: 'Tú escribes esto.\n*Iron escribe el resto.*',
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
    title: 'Dónde está afinado',
    note: 'Pulso = hasta dónde llega el ajuste',
  },
  tiers: [
    {
      name: 'Apple · Metal',
      level: 'primary',
      label: 'Principal',
      note: 'Cada kernel se escribe y se afina aquí primero. MSL → .metallib.',
    },
    {
      name: 'NVIDIA · CUDA',
      level: 'secondary',
      label: 'Afinando',
      note: 'En producción en RTX y DGX Spark. CUDA → PTX.',
    },
    {
      name: 'AMD ROCm · Vulkan',
      level: 'runs',
      label: 'Próximamente',
      note: 'Avanzando rápido en AMD, con primeras ejecuciones en MI300. HIP → AMDGPU, Vulkan → SPIR-V.',
    },
  ],
  runsOn: {
    label: 'Funciona en',
    items: [
      'MacBook y Mac Studio',
      'Estaciones de trabajo RTX',
      'DGX Spark',
      'Strix Halo',
      'Flotas de neoclouds',
    ],
    pending: 'H100 · H200 · B100 · B200 · primeras ejecuciones',
  },
};

export default copy;
