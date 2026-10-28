import type { solutionsShared } from './shared';

const solutionsSharedKo: (typeof solutionsShared)['en'] = {
  breadcrumb: {
    label: '이동 경로',
    home: '홈',
    solutions: '솔루션',
  },
  sections: {
    problem: '문제',
    useCases: '활용 사례',
    stackFit: '스택',
    whereWeAre: '얼리 액세스',
  },
  tags: {
    cost: '비용',
    inference: '추론',
    control: '통제',
  },
  products: {
    iron: {
      index: '01',
      role: '커널',
      name: 'Iron',
      linkLabel: 'Iron 살펴보기',
      href: '/products/iron',
    },
    butter: {
      index: '02',
      role: '서빙',
      name: 'Butter',
      linkLabel: 'Butter 살펴보기',
      href: '/products/butter',
    },
    syrup: {
      index: '03',
      role: '컨트롤 플레인',
      name: 'Syrup',
      linkLabel: 'Syrup 살펴보기',
      href: '/products/syrup',
    },
    whisk: {
      index: '04',
      role: '메모리',
      name: 'Whisk',
      linkLabel: 'Whisk 살펴보기',
      href: '/products/whisk',
    },
  },
  hardware: {
    notesLabel: '이것이 의미하는 바',
    tiersLabel: '튜닝 현황',
    runsOnLabel: '구동 환경',
    tiers: [
      {
        name: 'Apple · Metal',
        status: 'primary',
        statusLabel: '주력',
        note: '모든 커널을 이곳에서 가장 먼저 작성하고 튜닝합니다. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        status: 'secondary',
        statusLabel: '보조',
        note: 'RTX와 DGX Spark에서 프로덕션으로 운영 중입니다. 데이터센터 GPU는 진행 중입니다. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: '구동',
        note: '지금도 동작하지만 아직 튜닝하지 않았습니다. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX 워크스테이션' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: '네오클라우드 플릿' },
      { label: '엔터프라이즈 데이터센터 GPU · 진행 중', inProgress: true },
    ],
  },
};

export default solutionsSharedKo;
