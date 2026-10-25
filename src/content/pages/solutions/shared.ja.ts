import type { solutionsShared } from './shared';

const solutionsSharedJa: (typeof solutionsShared)['en'] = {
  breadcrumb: {
    label: 'パンくずリスト',
    home: 'ホーム',
    solutions: 'ソリューション',
  },
  sections: {
    problem: '課題',
    useCases: 'ユースケース',
    stackFit: 'スタック',
    whereWeAre: '早期アクセス',
  },
  tags: {
    cost: 'コスト',
    inference: '推論',
    control: 'コントロール',
  },
  products: {
    iron: {
      index: '01',
      role: 'カーネル',
      name: 'Iron',
      linkLabel: 'Iron を見る',
      href: '/products/iron',
    },
    butter: {
      index: '02',
      role: 'サービング',
      name: 'Butter',
      linkLabel: 'Butter を見る',
      href: '/products/butter',
    },
    waffle: {
      index: '03',
      role: 'コントロールプレーン',
      name: 'Waffle',
      linkLabel: 'Waffle を見る',
      href: '/products/waffle',
    },
    syrup: {
      index: '04',
      role: '記憶',
      name: 'Syrup',
      linkLabel: 'Syrup を見る',
      href: '/products/syrup',
    },
  },
  hardware: {
    notesLabel: 'あなたにとっての意味',
    tiersLabel: 'チューニングの状況',
    runsOnLabel: '動作環境',
    tiers: [
      {
        name: 'Apple · Metal',
        status: 'primary',
        statusLabel: 'プライマリ',
        note: 'すべてのカーネルを、まずここで書き、チューニングします。MSL → .metallib。',
      },
      {
        name: 'NVIDIA · CUDA',
        status: 'secondary',
        statusLabel: 'セカンダリ',
        note: 'RTX と DGX Spark では本番稼働中。データセンター GPU は対応中です。CUDA → PTX。',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: '動作',
        note: '現時点で動作しますが、チューニングはこれからです。HIP → AMDGPU、Vulkan → SPIR-V。',
      },
    ],
    runsOn: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX ワークステーション' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'ネオクラウドのフリート' },
      {
        label: 'エンタープライズ向けデータセンター GPU · 対応中',
        inProgress: true,
      },
    ],
  },
};

export default solutionsSharedJa;
