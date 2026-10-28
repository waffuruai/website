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
    syrup: {
      index: '03',
      role: 'コントロールプレーン',
      name: 'Syrup',
      linkLabel: 'Syrup を見る',
      href: '/products/syrup',
    },
    whisk: {
      index: '04',
      role: '記憶',
      name: 'Whisk',
      linkLabel: 'Whisk を見る',
      href: '/products/whisk',
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
        statusLabel: 'チューニング中',
        note: 'RTX と DGX Spark では本番稼働中。H100、H200、B100、B200 では初回の実行を終えています。CUDA → PTX。',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: '近日対応',
        note: '現時点で動作しますが、チューニングはこれからです。MI300 では初回の実行を終えています。HIP → AMDGPU、Vulkan → SPIR-V。',
      },
    ],
    runsOn: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX ワークステーション' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'ネオクラウドのフリート' },
      {
        label: 'H100 · H200 · B100 · B200 · 初回実行',
        inProgress: true,
      },
      { label: 'MI300 · 初回実行', inProgress: true },
    ],
  },
};

export default solutionsSharedJa;
