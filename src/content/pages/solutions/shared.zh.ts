import type { solutionsShared } from './shared';

const solutionsSharedZh: (typeof solutionsShared)['en'] = {
  breadcrumb: {
    label: '面包屑导航',
    home: '首页',
    solutions: '解决方案',
  },
  sections: {
    problem: '问题所在',
    useCases: '使用场景',
    stackFit: '技术栈',
    whereWeAre: '抢先体验',
  },
  tags: {
    cost: '成本',
    inference: '推理',
    control: '掌控',
  },
  products: {
    iron: {
      index: '01',
      role: '内核',
      name: 'Iron',
      linkLabel: '了解 Iron',
      href: '/products/iron',
    },
    butter: {
      index: '02',
      role: '模型服务',
      name: 'Butter',
      linkLabel: '了解 Butter',
      href: '/products/butter',
    },
    waffle: {
      index: '03',
      role: '控制平面',
      name: 'Waffle',
      linkLabel: '了解 Waffle',
      href: '/products/waffle',
    },
    syrup: {
      index: '04',
      role: '记忆',
      name: 'Syrup',
      linkLabel: '了解 Syrup',
      href: '/products/syrup',
    },
  },
  hardware: {
    notesLabel: '这对你意味着什么',
    tiersLabel: '调优在哪里',
    runsOnLabel: '运行于',
    tiers: [
      {
        name: 'Apple · Metal',
        status: 'primary',
        statusLabel: '首要',
        note: '每个内核都先在这里编写并调优。MSL → .metallib。',
      },
      {
        name: 'NVIDIA · CUDA',
        status: 'secondary',
        statusLabel: '其次',
        note: '已在 RTX 和 DGX Spark 上投入生产。数据中心 GPU 正在进行中。CUDA → PTX。',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: '可运行',
        note: '目前可以运行，尚未调优。HIP → AMDGPU，Vulkan → SPIR-V。',
      },
    ],
    runsOn: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX 工作站' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: '新型云服务商集群' },
      { label: '企业级数据中心 GPU · 进行中', inProgress: true },
    ],
  },
};

export default solutionsSharedZh;
