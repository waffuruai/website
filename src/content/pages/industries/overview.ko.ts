import type { industriesOverview } from './overview';

const industriesOverviewKo: (typeof industriesOverview)['en'] = {
  seo: {
    title: '산업별 AI 추론',
    description:
      'GPU 클라우드, 금융 서비스, 생명과학, 공공·정부, 국방을 위한 Waffuru. 직접 통제하는 하드웨어에서 워크로드마다 비용을 확인하세요. 얼리 액세스.',
    keywords: [
      '산업별 AI 추론',
      '프라이빗 AI 인프라',
      '소버린 AI',
      '워크로드당 GPU 비용',
    ],
  },
  hero: {
    label: '산업',
    title: '당신의 *규칙*에 맞춘 하나의 스택.',
    lede: '모든 산업은 저마다의 제약 아래에서 AI를 운영합니다. 어떤 데이터가 이동할 수 있는지, 지출은 누가 승인하는지, 어떤 하드웨어가 허용되는지. Waffuru는 커널부터 메모리까지 이어지는 하나의 스택으로, 직접 통제하는 하드웨어에서 모델을 돌립니다. 해당하는 산업을 골라 보세요.',
  },
  cards: {
    label: '산업별',
    title: '당신의 *산업*을 찾으세요.',
    intro:
      '다섯 개 산업, 하나의 스택. 각 페이지에서 마주한 압박, 할 수 있는 일, 지금 되는 것을 다룹니다.',
  },
  values: {
    label: '어디서나 통하는 것',
    title: '모든 *산업*을 위한 세 가지 답.',
    intro: '규칙은 산업마다 다르지만, 이 세 가지 질문은 어디서나 나옵니다.',
    items: [
      {
        tag: 'cost',
        title: '*중요한* 숫자.',
        body: '재무팀이 요구하는 것은 워크로드당 비용이지만, 이를 볼 수 있는 곳은 거의 없습니다. Syrup은 모든 GPU와 그 위의 모든 엔진을 보여 주므로, 지출을 그것이 해낸 일과 연결할 수 있습니다.',
        points: [
          '어느 GPU가 바쁜지, 놀고 있는지, 맞지 않게 배치됐는지 확인',
          '이미 가진 하드웨어에서 더 많은 산출',
          '양자화된 모델로 가진 메모리에 더 많이 적재',
        ],
      },
      {
        tag: 'inference',
        title: '*구성 요소*는 더 적게.',
        body: 'Butter는 백엔드별로 튜닝한 커널 위에서, 서빙 경로에 Python 없이 모델을 서빙합니다. 패치할 것도, 고장 날 것도, 설명할 것도 줄어듭니다.',
        points: [
          'Metal이 먼저, 그다음 CUDA, ROCm과 Vulkan은 구동 중',
          'OpenAI 호환 서빙이라 기존 앱이 그대로 동작',
          '변환 없이 Hugging Face 모델 로드',
        ],
      },
      {
        tag: 'control',
        title: '직접 *고르는* 하드웨어.',
        body: '하나의 Iron 커널 정의가 Metal, CUDA, HIP, Vulkan으로 변환되며, 직접 동의하지 않는 한 데이터는 있는 곳에 그대로 있습니다. 벤더를 바꾸는 일은 재작성이 아니라 결정입니다.',
        points: [
          '온프레미스든 자체 클라우드든 워크스테이션 한 대든',
          'Syrup은 vLLM, SGLang, llama.cpp와도 동작',
          '특정 엔진이나 GPU 벤더에 묶이지 않음',
        ],
      },
    ],
  },
  cta: {
    title: '*제약 조건*을 알려 주세요.',
    body: '얼리 액세스, 당분간 비공개 소스. 산업과 하드웨어, 그리고 건물 밖으로 나갈 수 없는 것을 알려 주시면, 지금 무엇이 맞는지 솔직하게 말씀드리겠습니다.',
  },
};

export default industriesOverviewKo;
