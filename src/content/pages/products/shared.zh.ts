import type { productsShared } from './shared';

const productsSharedZh: (typeof productsShared)['en'] = {
  statusLabel: '未公开 · 抢先体验',
  storyProblemLabel: '问题所在',
  storyOutcomeLabel: '现在你能做到',
  tierLabels: { primary: '首要', secondary: '其次', runs: '可运行' },
  tierLegend: '色条越多，调优越充分。',
  runsOn: {
    label: '运行于',
    items: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX 工作站' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: '新型云服务商集群' },
      { label: '企业级数据中心 GPU', inProgress: true },
    ],
  },
};

export default productsSharedZh;
