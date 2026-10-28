import type { productsShared } from './shared';

const productsSharedJa: (typeof productsShared)['en'] = {
  statusLabel: '非公開 · 早期アクセス',
  storyProblemLabel: '課題',
  storyOutcomeLabel: 'できるようになること',
  tierLabels: {
    primary: 'プライマリ',
    secondary: 'チューニング中',
    runs: '近日対応',
  },
  tierLegend: 'バーが多いほど、チューニングが進んでいます。',
  runsOn: {
    label: '動作環境',
    items: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX ワークステーション' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'ネオクラウドのフリート' },
      { label: 'H100 · H200 · B100 · B200 · 初回実行' },
      { label: 'MI300 · 初回実行' },
    ],
  },
};

export default productsSharedJa;
