import type { productsShared } from './shared';

const productsSharedJa: (typeof productsShared)['en'] = {
  statusLabel: '非公開 · 早期アクセス',
  storyProblemLabel: '課題',
  storyOutcomeLabel: 'できるようになること',
  tierLabels: { primary: 'プライマリ', secondary: 'セカンダリ', runs: '動作' },
  tierLegend: 'バーが多いほど、チューニングが進んでいます。',
  runsOn: {
    label: '動作環境',
    items: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX ワークステーション' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'ネオクラウドのフリート' },
      { label: 'エンタープライズ向けデータセンター GPU', inProgress: true },
    ],
  },
};

export default productsSharedJa;
