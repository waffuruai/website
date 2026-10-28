import type { whisk } from './whisk';

const whiskKo: (typeof whisk)['en'] = {
  layer: '메모리',
  tagline: '하던 일을 기억하는 AI.',
  summary:
    '노트, 코드, 문서, 이미지를 로컬에서 검색합니다. 임베딩은 자체 개발한 압축 알고리즘인 AURA로 압축하고, 검색은 어휘 검색과 벡터 검색을 함께 사용하며, 결과는 MCP를 통해 출처와 함께 돌려줍니다.',
  seo: {
    title: 'Whisk: AI를 위한 로컬 메모리와 검색',
    description:
      'Whisk는 노트, 코드, 문서, 이미지를 AI 세션에 섞어 넣습니다. AURA로 압축한 임베딩 위에서 어휘·벡터 검색을 하고, 결과를 MCP로 출처와 함께 돌려줍니다.',
    keywords: ['로컬 RAG', 'AI 메모리', 'MCP 검색', '프라이빗 시맨틱 검색'],
  },
  hero: {
    title: '하던 일을 *기억하는* AI.',
    lede: 'Whisk는 내 컴퓨터에 있는 관련 노트, 코드, 문서, 이미지를 찾아 섞어 넣고, AI 세션에 매끄럽게 녹여 냅니다.',
    highlights: [
      { value: '로컬', label: '노트, 코드, 문서, 이미지를 대상으로 한 검색' },
      {
        value: '어휘 + 벡터',
        label: '우리 AURA 알고리즘으로 압축한 임베딩 위에서 하는 검색',
      },
      { value: '출처 표기', label: 'MCP로 전달되는 결과' },
    ],
  },
  story: {
    heading: '같은 설명을 *반복*하지 마세요.',
    problem:
      '새 대화는 매번 아무것도 없는 상태에서 시작합니다. 같은 노트와 파일을 다시 붙여 넣어야 하고, 답이 돌아와도 어느 자료에서 나온 것인지 알 수 없습니다.',
    outcome:
      'Whisk는 내 컴퓨터에서 노트, 코드, 문서, 이미지를 색인합니다. AI가 요청하면 중요한 대목이 돌아오고, 각 대목에는 확인할 수 있는 원본 출처가 붙어 있습니다.',
    outcomes: [
      '노트와 코드는 내 컴퓨터에 둔 채로 쓰세요. 검색은 로컬에서 이루어집니다.',
      '쓴 그대로의 단어로도, 의미로도 찾으세요. 검색은 어휘 검색과 벡터 검색을 함께 사용합니다.',
      '결과에 출처가 붙어 돌아오므로, 어떤 답이든 원문과 대조해 볼 수 있습니다.',
    ],
  },
  capabilities: {
    heading: 'Whisk가 *하는* 일.',
    intro: '이미 가진 작업을 위해, 직접 운영하는 메모리 계층.',
    items: [
      {
        title: '로컬 검색',
        body: 'Whisk는 내 컴퓨터에서 노트, 코드, 문서, 이미지를 검색하며, 추론 제공업체의 호스팅 모델을 쓰기로 직접 선택하지 않는 한 데이터는 그곳을 떠나지 않습니다.',
      },
      {
        title: '압축된 임베딩',
        body: '임베딩을 자체 개발한 압축 알고리즘인 AURA로 압축해 데이터가 차지하는 공간을 줄입니다.',
      },
      {
        title: '어휘 검색과 벡터 검색',
        body: '정확한 단어 일치와 의미 기반 검색이 함께 동작합니다.',
      },
      {
        title: 'MCP를 통한 출처 표기',
        body: '결과가 MCP로 출처와 함께 돌아오므로, 어떤 MCP 클라이언트든 결과를 쓰고 각 결과가 어디서 왔는지 보여 줄 수 있습니다.',
      },
    ],
  },
  specs: {
    heading: '기술 *세부 사항*.',
    rows: [
      { term: '색인 대상', detail: '노트, 코드, 문서, 이미지.' },
      { term: '실행 위치', detail: '내 컴퓨터에서 로컬로.' },
      { term: '임베딩', detail: '자체 개발한 압축 알고리즘인 AURA로 압축.' },
      { term: '검색', detail: '어휘 검색 + 벡터 검색.' },
      { term: '결과', detail: '출처와 함께 반환.' },
      { term: '인터페이스', detail: 'MCP.' },
      {
        term: '제공 현황',
        detail: '얼리 액세스 기간 동안 비공개 소스.',
      },
    ],
  },
  stack: {
    heading: '나머지 *스택*과 함께 쓰기.',
    intro:
      'Whisk는 어떤 MCP 클라이언트와도 단독으로 동작합니다. 그 아래에서 Butter가 모델을 실행하고, Syrup이 GPU를 지켜보며, Iron이 커널을 컴파일합니다.',
  },
  faq: [
    {
      question: 'Whisk는 오픈 소스인가요?',
      answer:
        '아직은 아닙니다. Whisk는 얼리 액세스 기간 동안 비공개 소스입니다. 얼리 액세스를 신청해 주시면 공유할 소식이 생길 때 연락드리겠습니다.',
    },
    {
      question: '내 데이터가 컴퓨터 밖으로 나가나요?',
      answer:
        '검색은 로컬에서 이루어집니다. Whisk는 내 컴퓨터에서 색인하고 검색합니다. 우리는 단순한 원칙을 스스로에게 적용합니다. 추론 제공업체의 호스팅 모델을 쓰기로 직접 선택하지 않는 한 데이터는 내 컴퓨터를 떠나지 않는다는 것입니다.',
    },
    {
      question: '무엇을 색인하나요?',
      answer: '노트, 코드, 문서, 이미지를 색인합니다.',
    },
    {
      question: 'AURA는 무엇인가요?',
      answer:
        'KV 캐시, 임베딩, 모델 가중치에 쓰는 자체 개발 압축 알고리즘입니다. Whisk에서는 임베딩을 압축해 데이터가 차지하는 공간을 줄여 줍니다. Google의 [TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/)를 Tom Turney가 개선한 TurboQuant+에서 영감을 받았고, 우리만의 새로운 기법으로 한층 더 발전시켰습니다. AURA는 Eric Kryski와 Tom Turney의 협업에서 나왔습니다.',
    },
    {
      question: 'Whisk는 무엇과 함께 쓸 수 있나요?',
      answer:
        'MCP를 지원하는 것이라면 무엇이든 Whisk에 결과를 요청할 수 있으며, 각 결과에는 출처가 붙어 돌아옵니다.',
    },
    {
      question: '나머지 스택도 필요한가요?',
      answer:
        '아니요. Waffuru의 제품은 각각 단독으로 동작하며, Whisk도 예외가 아닙니다.',
    },
  ],
  cta: {
    title: 'AI에 *기억*을 주세요.',
    body: 'Whisk는 얼리 액세스 중이며 당분간 비공개 소스입니다. 접근을 신청하시거나, 무엇을 기억하게 하고 싶은지 알려 주세요.',
  },
};

export default whiskKo;
