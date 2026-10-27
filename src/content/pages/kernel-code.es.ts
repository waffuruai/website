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
      label: 'Secundario',
      note: 'En producción en RTX y DGX Spark. CUDA → PTX.',
    },
    {
      name: 'AMD ROCm · Vulkan',
      level: 'runs',
      label: 'Funciona',
      note: 'Avanzando rápido en AMD. HIP → AMDGPU, Vulkan → SPIR-V.',
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
    pending: 'GPU de centros de datos empresariales · próximas',
  },
};

export default copy;
