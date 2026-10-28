import type { productsOverview } from './overview';

const productsOverviewKo: (typeof productsOverview)['en'] = {
  seo: {
    title: 'Waffuru 스택: 커널, 서빙, 제어, 메모리, 에이전트',
    description:
      'Iron은 커널을 컴파일하고 Butter는 모델을 실행합니다. Syrup은 GPU를 제어하고 Whisk는 메모리와 컨텍스트를 더합니다. Waffle은 에이전트를 실행합니다. 하나만 써도, 다섯을 함께 써도 됩니다.',
    keywords: [
      'AI 추론 스택',
      'GPU 커널부터 서빙까지',
      '보유하거나 임대한 하드웨어 위의 AI 인프라',
    ],
  },
  hero: {
    label: '제품 5종',
    title: 'Waffuru *스택*.',
    lede: 'Iron이 커널을 컴파일하고, Butter가 그 위에서 모델을 실행합니다. Syrup은 GPU를 제어하고, Whisk는 메모리와 컨텍스트를 더합니다. Waffle은 W를 품고 에이전트를 실행합니다. 다섯 모두 보유하거나 임대한 하드웨어에서 돌아갑니다.',
  },
  layers: {
    heading: '다섯 계층이 *맞물리는* 방식.',
    intro:
      '하드웨어에서부터 위로 번호를 붙였습니다. 맨 위가 Waffle, 하드웨어에 닿는 맨 아래가 Iron이며, 계층마다 전용 페이지가 있습니다.',
    metal: {
      label: '하드웨어',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: '스택의 다섯 계층',
  },
  together: {
    heading: '하나만 써도, *다섯을 모두* 써도.',
    intro:
      '오늘의 문제를 푸는 계층부터 시작하세요. 필요해지면 다음 계층을 더하면 됩니다.',
    aloneLabel: '단독으로 쓸 때',
    alone: {
      iron: 'GPU 커널을 한 번만 작성해 Metal, CUDA, ROCm, Vulkan에서 실행합니다.',
      butter: 'Python 없이 OpenAI 호환 API 뒤에서 모델을 서빙합니다.',
      syrup:
        '어떤 엔진이든, 모든 GPU와 그 위에서 돌아가는 모든 엔진을 한눈에 봅니다.',
      whisk: 'AI에 노트와 코드에 대한 로컬 메모리를 출처와 함께 제공합니다.',
      waffle:
        '하나의 하네스에서 에이전트를 실행합니다. 그 안에 어시스턴트 W가 있습니다.',
    },
    allLabel: '함께 쓸 때',
    all: 'Butter는 Iron이 컴파일한 커널 위에서 모델을 실행하고, Syrup은 그 아래의 GPU와 엔진을 제어하며, Whisk는 메모리와 컨텍스트를 더하고, Waffle은 맨 위에서 에이전트를 실행합니다. 계층을 더할수록 아래 계층 위에 차곡차곡 쌓입니다.',
  },
  audience: {
    heading: '누구를 *위한* 것인가.',
    intro: '나에게 맞는 페이지를 골라 보세요.',
    items: {
      smallBusiness: '이미 가진 Mac과 워크스테이션에서 프라이빗 AI를 돌립니다.',
      enterprise:
        '온프레미스든 자체 클라우드든, 직접 통제하는 추론을 돌립니다.',
      neoclouds:
        '플릿의 모든 GPU와 그 위에서 돌아가는 모든 엔진을 한눈에 봅니다.',
      aiCompanies:
        '커널을 한 번만 쓰고 Metal, CUDA, ROCm, Vulkan 전반에서 모델을 서빙합니다.',
    },
  },
  cta: {
    title: '필요한 *계층*부터 시작하세요.',
    body: '스택 전체가 얼리 액세스 중이며 당분간 비공개 소스입니다. 접근을 신청하시고, 어느 계층이 먼저 필요한지 알려 주세요.',
  },
};

export default productsOverviewKo;
