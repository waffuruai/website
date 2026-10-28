import type { productsShared } from './shared';

const productsSharedKo: (typeof productsShared)['en'] = {
  statusLabel: '비공개 · 얼리 액세스',
  storyProblemLabel: '문제',
  storyOutcomeLabel: '이제 할 수 있는 일',
  tierLabels: { primary: '주력', secondary: '튜닝 중', runs: '곧 지원' },
  tierLegend: '막대가 많을수록 더 많이 튜닝되어 있습니다.',
  runsOn: {
    label: '구동 환경',
    items: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX 워크스테이션' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: '네오클라우드 플릿' },
      { label: 'H100 · H200 · B100 · B200 · 첫 실행' },
      { label: 'MI300 · 첫 실행' },
    ],
  },
};

export default productsSharedKo;
