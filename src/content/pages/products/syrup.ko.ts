import type { syrup } from './syrup';

const syrupKo: (typeof syrup)['en'] = {
  layer: '컨트롤 플레인',
  tagline: '모든 GPU와 그 위에서 돌아가는 모든 엔진을 한눈에.',
  summary:
    'GPU 위에서 도는 LLM을 위한 컨트롤 플레인입니다. 책상 아래 서버 한 대부터 플릿을 임대하는 네오클라우드까지 다룹니다. 각 호스트에서 작은 Rust 사이드카가 서명된 텔레메트리를 보고합니다. Butter, vLLM, SGLang, llama.cpp 등 OpenAI 호환 서버와 함께 동작합니다.',
  seo: {
    title: 'Syrup: GPU 위 LLM을 위한 컨트롤 플레인',
    description:
      '책상 아래 서버 한 대부터 네오클라우드 플릿까지, 모든 GPU와 그 위의 모든 추론 엔진을 한눈에. Rust 사이드카가 서명된 텔레메트리를 보고합니다.',
    keywords: [
      'GPU 플릿 관리',
      'LLM 컨트롤 플레인',
      'GPU 관측성',
      'vLLM SGLang llama.cpp 모니터링',
    ],
  },
  hero: {
    title: '모든 GPU와 그 위에서 돌아가는 모든 *엔진*을 한눈에.',
    lede: 'Syrup은 GPU 위에서 도는 LLM을 위한 컨트롤 플레인입니다. 책상 아래 서버 한 대부터 플릿을 임대하는 네오클라우드까지 다룹니다. 각 호스트에서 작은 Rust 사이드카가 서명된 텔레메트리를 보고합니다.',
    highlights: [
      {
        value: '서버 한 대',
        label: '책상 아래 한 대부터 네오클라우드 플릿까지',
      },
      {
        value: '서명됨',
        label: '호스트마다 작은 Rust 사이드카가 보내는 텔레메트리',
      },
      {
        value: '락인 없음',
        label: 'Butter, vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버',
      },
    ],
  },
  story: {
    heading: '모든 *GPU*에서 무엇이 도는지 파악하세요.',
    problem:
      'GPU 서버에서는 누군가 띄워 둔 엔진이 돌아갑니다. 한 대에는 llama.cpp, 다음 대에는 vLLM, 새 서버에는 SGLang이 있는 식입니다. 무엇이 어디서 돌고 있는지 알아내려면 호스트마다 로그인해야 합니다.',
    outcome:
      '호스트마다 작은 Rust 사이드카를 두세요. 사이드카가 서명된 텔레메트리를 보고하면, Syrup이 서버 한 대든 플릿 전체든 모든 GPU와 그 위의 모든 엔진을 보여 줍니다.',
    outcomes: [
      '책상 아래 서버 한 대든, 임대하는 플릿이든 같은 도구로 지켜보세요.',
      '지금 쓰는 엔진은 그대로 두세요. Syrup은 Butter, vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버와 함께 동작합니다.',
      '눈에 보이는 값을 믿으세요. 모든 호스트가 서명된 텔레메트리를 보고합니다.',
    ],
  },
  capabilities: {
    heading: 'Syrup이 *하는* 일.',
    intro: '엔진을 대체하는 대신 엔진 곁에 놓이는 컨트롤 플레인.',
    items: [
      {
        title: '모든 GPU',
        body: '모든 호스트의 모든 GPU를 한곳에서 봅니다.',
      },
      {
        title: '모든 엔진',
        body: 'GPU 위에서 어떤 엔진이 도는지 봅니다. Butter, vLLM, SGLang, llama.cpp, 또는 다른 OpenAI 호환 서버입니다.',
      },
      {
        title: '작은 Rust 사이드카',
        body: '호스트마다 Rust로 작성한 작은 사이드카가 돌기 때문에, 머신을 추가한다는 것은 곧 사이드카를 추가한다는 뜻입니다.',
      },
      {
        title: '서명된 텔레메트리',
        body: '각 사이드카가 보고하는 텔레메트리에 서명합니다.',
      },
      {
        title: '서버 한 대에서 플릿까지',
        body: '책상 아래 머신 한 대로 시작하세요. 같은 구성이 플릿을 임대하는 네오클라우드까지 이어집니다.',
      },
      {
        title: '락인 없음',
        body: 'Syrup에 Butter가 꼭 필요한 것은 아닙니다. vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버와도 동작합니다.',
      },
    ],
  },
  specs: {
    heading: '기술 *세부 사항*.',
    intro: '꼼꼼히 읽어 보실 분들을 위한 상세 정보.',
    rows: [
      { term: '역할', detail: 'GPU 위에서 도는 LLM을 위한 컨트롤 플레인.' },
      {
        term: '각 호스트에서',
        detail: 'Rust로 작성한 작은 사이드카.',
      },
      {
        term: '텔레메트리',
        detail: '보고하는 사이드카가 서명합니다.',
      },
      {
        term: '엔진',
        chips: [
          { label: 'Butter' },
          { label: 'vLLM' },
          { label: 'SGLang' },
          { label: 'llama.cpp' },
          { label: '그 밖의 OpenAI 호환 서버' },
        ],
      },
      {
        term: '규모',
        detail: '책상 아래 서버 한 대부터 네오클라우드 플릿까지.',
      },
      {
        term: '락인',
        detail: '없음. Syrup은 Butter 외의 엔진과도 동작합니다.',
      },
      {
        term: '제공 현황',
        detail: '얼리 액세스 기간 동안 비공개 소스.',
      },
    ],
  },
  stack: {
    heading: '나머지 *스택*과 함께 쓰기.',
    intro:
      'Syrup은 Butter가 있든 없든 GPU를 지켜봅니다. Butter는 Iron이 컴파일한 커널 위에서 모델을 실행하고, Whisk는 하던 일을 기억합니다.',
  },
  faq: [
    {
      question: 'Syrup은 오픈 소스인가요?',
      answer:
        '아직은 아닙니다. Syrup은 얼리 액세스 기간 동안 비공개 소스입니다. 얼리 액세스를 신청해 주시면 공유할 소식이 생길 때 연락드리겠습니다.',
    },
    {
      question: 'Butter를 꼭 써야 하나요?',
      answer:
        '아니요. Syrup은 Butter, vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버와 함께 동작하므로 지금 쓰는 엔진을 그대로 유지할 수 있습니다.',
    },
    {
      question: '누구를 위한 제품인가요?',
      answer:
        'GPU에서 LLM을 돌리며 그 현황을 한눈에 보고 싶은 모든 분을 위한 제품입니다. 책상 아래 서버 한 대부터 플릿을 임대하는 네오클라우드까지 해당됩니다.',
    },
    {
      question: '사이드카는 무슨 일을 하나요?',
      answer:
        '호스트마다 Rust로 작성한 작은 사이드카가 돌며, 해당 호스트의 GPU와 그 위에서 돌아가는 엔진에 대한 서명된 텔레메트리를 보고합니다.',
    },
    {
      question: '어떤 GPU를 지원하나요?',
      answer:
        '아직 Syrup의 하드웨어 지원 매트릭스를 공개하지 않았습니다. 어떤 환경을 쓰시는지 알려 주시면 맞는지 솔직하게 말씀드리겠습니다.',
    },
  ],
  cta: {
    title: '내 *플릿*을 확인하세요.',
    body: 'Syrup은 얼리 액세스 중이며 당분간 비공개 소스입니다. 접근을 신청하시거나, 어떤 환경을 쓰시는지 알려 주세요.',
  },
};

export default syrupKo;
