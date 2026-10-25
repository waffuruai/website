import type { productsShared } from './shared';

const productsSharedKo: (typeof productsShared)['en'] = {
  statusLabel: '비공개 · 얼리 액세스',
  storyProblemLabel: '문제',
  storyOutcomeLabel: '이제 할 수 있는 일',
  tierLabels: { primary: '주력', secondary: '보조', runs: '구동' },
  tierLegend: '막대가 많을수록 더 많이 튜닝되어 있습니다.',
  runsOn: {
    label: '구동 환경',
    items: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX 워크스테이션' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: '네오클라우드 플릿' },
      { label: '엔터프라이즈 데이터센터 GPU', inProgress: true },
    ],
  },
};

export default productsSharedKo;
