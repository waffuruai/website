import type { KernelCodeCopy } from './kernel-code';

const copy: KernelCodeCopy = {
  title: '이것만 쓰세요.\n*나머지는 Iron이 씁니다.*',
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
  tuned: { title: '튜닝 현황', note: '펄스 = 튜닝 진행 정도' },
  tiers: [
    {
      name: 'Apple · Metal',
      level: 'primary',
      label: '주력',
      note: '모든 커널을 이곳에서 가장 먼저 작성하고 튜닝합니다. MSL → .metallib.',
    },
    {
      name: 'NVIDIA · CUDA',
      level: 'secondary',
      label: '보조',
      note: 'RTX와 DGX Spark에서 프로덕션으로 운영 중입니다. CUDA → PTX.',
    },
    {
      name: 'AMD ROCm · Vulkan',
      level: 'runs',
      label: '구동',
      note: 'AMD에서 빠르게 나아가고 있습니다. HIP → AMDGPU, Vulkan → SPIR-V.',
    },
  ],
  runsOn: {
    label: '구동 환경',
    items: [
      'MacBook & Mac Studio',
      'RTX 워크스테이션',
      'DGX Spark',
      'Strix Halo',
      '네오클라우드 플릿',
    ],
    pending: '엔터프라이즈 데이터센터 GPU · 다음 차례',
  },
};

export default copy;
