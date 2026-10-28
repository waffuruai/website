import type { productsShared } from './shared';

const productsSharedZh: (typeof productsShared)['en'] = {
  statusLabel: '未公开 · 抢先体验',
  storyProblemLabel: '问题所在',
  storyOutcomeLabel: '现在你能做到',
  tierLabels: { primary: '首要', secondary: '调优中', runs: '即将推出' },
  tierLegend: '色条越多，调优越充分。',
  runsOn: {
    label: '运行于',
    items: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX 工作站' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: '新型云服务商集群' },
      { label: 'H100 · H200 · B100 · B200 · 首次运行' },
      { label: 'MI300 · 首次运行' },
    ],
  },
};

export default productsSharedZh;
