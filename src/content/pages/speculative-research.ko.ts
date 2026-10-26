import type { SpeculativeResearchCopy } from './speculative-research';
const copy: SpeculativeResearchCopy = {
  metrics: {
    sampling: '샘플링 모드',
    metric: '지표',
    comparison: '별도 부하 중앙값',
    prefill: '단일 스트림 프리필',
    singleTtft: '단일 스트림 TTFT',
    lane: '동시 요청당 디코딩 중앙값',
    concurrentTtft: '동시 TTFT 중앙값',
  },
  eyebrow: 'Apple silicon 실측 · 2026년 10월 19일',
  title: '27B.\n*요청 16개. Mac 한 대.*',
  intro:
    '요청이 겹쳐도 로컬 에이전트를 계속 움직이세요. Butter와 Iron은 네이티브 Metal 커널, 추측 디코딩, 공유 검증을 결합합니다. M5 Max 한 대의 실측 결과입니다.',
  greedy: '그리디 · T0',
  sampled: '샘플링 · T0.7',
  unit: 'tok/s',
  singleTitle: '활성 요청 한 개',
  singleScope: '입력 2,052토큰 · 출력 상한 128토큰',
  burstTitle: '동시 요청 16개',
  burstScope: '전체 버스트 · 프리필과 마무리 포함',
  gainTitle: '전체 활성 디코딩 가속',
  gainScope: '전체 활성 디코딩 개선 · 요청 16개 쌍 비교',
  before: '변경 전',
  after: '변경 후',
  activeTitle: '같은 모델. 줄어든 반복 작업.',
  activeScope:
    '모든 요청이 디코딩 중인 공통 구간만 측정합니다. 위의 전체 버스트와는 별도 시험입니다.',
  replay: '흐름 다시 재생',
  illustration: '작동 방식 · 개념도',
  privateLanes: '요청별 독립 상태',
  sharedVerify: '공유 타깃 검증',
  committed: '검증된 토큰 진행',
  diagramNote:
    '활성 요청 16개를 최대 8레인 코호트로 순환 처리합니다. 타깃이 제안을 확인하며 요청마다 자체 캐시, 순환 상태, 샘플러를 유지합니다. 구조 설명이며 시간이나 수락률 실측이 아닙니다.',
  details: '구현, 조건, 근거 열기',
  method:
    'Qwen3.8-27B affine 4-bit/group64 + DFlash2, M5 Max 128 GiB, Metal, raw BF16 KV. 단일 스트림: 3회, 입력 2,052, 출력 상한 128. 전체 버스트: 요청 16개를 3회, 요청당 입력 약 937, 출력 상한 600. 새 서버에서 워밍업 제외, 측정 프리픽스 재사용 없음. T0.7은 top-p 0.95, top-k 20, min-p 0입니다.',
  cost: '쌍 비교는 입력 882–999, 출력 상한 600, 그리디 3쌍과 샘플링 8쌍입니다. 샘플링 첫 토큰 시간 p50은 9.030초에서 9.397초로 늘었습니다. 처리량 개선이며 일률적 지연 감소가 아닙니다.',
  qualification:
    '그리디 비교에서 후보 응답 48개 모두의 텍스트와 수를 유지했습니다. 별도 에이전트 재생도 111/111개를 유지했으나 지연은 개선되지 않았습니다. 일반 품질, 도구 정확도, 토큰 절감의 입증은 아닙니다.',
  sources: '근거 PR 및 Reproduce with Butter',
  steps: [
    {
      title: '행마다 일치하는 네이티브 연산',
      body: '단일 디코딩과 배치 검증의 리덕션 순서를 맞춥니다. 어텐션과 순환 상태는 제안의 조상을 따르며 수락 경로만 확정합니다.',
    },
    {
      title: '결정은 타깃이',
      body: 'T0은 그리디 검증입니다. T0.7은 타깃 분포에서 뽑고 일치하는 분기만 따릅니다. 난수 상태는 요청별로 유지합니다.',
    },
    {
      title: '작업은 공유, 상태는 독립',
      body: '실측 비용과 수락률로 검증 행을 배분합니다. 함께 준비, 검증, 확정하지만 캐시, 이력, 샘플러는 요청별로 독립적입니다.',
    },
    {
      title: '필요할 때 드래프트 준비',
      body: '한 행도 타깃은 실행합니다. 특징은 제한된 버퍼에 보관했다가 다시 필요하거나 가득 차면 반영하며 검증을 건너뛰지 않습니다.',
    },
  ],
};
export default copy;
