import type { KernelCodeCopy } from './kernel-code';

const copy: KernelCodeCopy = {
  title: '你写这些。\n*其余交给 Iron。*',
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
  tuned: { title: '调优在哪里', note: '脉冲 = 调优进展' },
  tiers: [
    {
      name: 'Apple · Metal',
      level: 'primary',
      label: '首要',
      note: '每个内核都先在这里编写并调优。MSL → .metallib。',
    },
    {
      name: 'NVIDIA · CUDA',
      level: 'secondary',
      label: '其次',
      note: '已在 RTX 和 DGX Spark 上投入生产。CUDA → PTX。',
    },
    {
      name: 'AMD ROCm · Vulkan',
      level: 'runs',
      label: '可运行',
      note: 'AMD 上进展迅速。HIP → AMDGPU，Vulkan → SPIR-V。',
    },
  ],
  runsOn: {
    label: '运行于',
    items: [
      'MacBook & Mac Studio',
      'RTX 工作站',
      'DGX Spark',
      'Strix Halo',
      '新型云服务商集群',
    ],
    pending: '企业级数据中心 GPU · 下一步',
  },
};

export default copy;
