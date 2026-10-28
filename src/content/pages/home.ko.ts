import type { home } from './home';

const homeKo: (typeof home)['en'] = {
  seo: {
    keywords: [
      '프라이빗 AI',
      '로컬 AI',
      '온디바이스 AI',
      '내 하드웨어에서 돌리는 AI',
      '로컬 LLM 추론',
      '추론 엔진',
      'GPU 커널',
      'Apple silicon',
      '취약점 스캐너',
      'Pantry',
    ],
  },

  hero: {
    eyebrow: '내 하드웨어 · 내 데이터 · 내 AI',
    title: '이미 *가진* 하드웨어에서 더 많은 지능을.',
    lede: 'Waffuru는 노트북부터 데이터센터의 GPU 플릿까지, 소유하거나 임대한 하드웨어에서 돌아가는 AI 스택을 만듭니다. 모든 GPU에서 더 많은 것을 얻고, 토큰당 비용은 줄이며, 데이터는 내 곁에 머뭅니다.',
    launch: {
      label: '신규',
      text: 'macOS와 Linux를 위한 무료 취약점 스캐너, Pantry',
    },
    secondary: { label: '작동 방식 보기', href: '#stack' },
  },

  pantry: {
    label: '무료 · 오픈소스 · 오늘 출시',
    title: '무엇이 *노출*됐는지 알고, 빠르게 패치하세요.',
    body: 'AI가 내 컴퓨터에서 돌아가려면 먼저 그 컴퓨터들이 안전해야 합니다. Pantry는 설치된 모든 것과 모든 저장소를 공개 취약점 데이터와 대조해, 실제로 해당하는 것만 알려 주고 안전하게 고칠 수 있는 것은 고칩니다.',
    points: [
      '내 버전에 정확히 해당하는 것만',
      '안전한 수정은 대신 실행하고, sudo 단계는 출력',
      '텔레메트리 없음, AI 없음, Rust로 작성',
    ],
    primary: '시스템 보호하기',
    secondary: 'Pantry 작동 방식',
    caption: '한 컴퓨터의 출력 예시입니다.',
  },

  stack: {
    title: '실리콘에서 *답*까지.',
    intro:
      '따로도, 함께도 작동하는 여섯 개의 제품. 요청은 아래로 내려가고 답은 다시 올라오며, 그 어느 것도 내가 통제하는 하드웨어를 떠날 필요가 없습니다.',
    note: 'Pantry는 오늘부터 무료 오픈소스로 쓸 수 있습니다. 스택의 나머지는 비공개 얼리 액세스 중이며, Waffle은 곧 나옵니다. Metal이 우선이고, CUDA는 튜닝 중이며, ROCm과 Vulkan은 곧 지원합니다.',
    flow: {
      you: '나, 내 팀, 내 에이전트',
      boundary: '소유하거나 임대한 하드웨어',
      layers: [
        {
          role: '보안',
          name: 'Pantry',
          icon: 'pantry',
          line: '모든 컴퓨터에서 노출된 것을 찾아 패치합니다.',
        },
        {
          role: '에이전트',
          name: 'Waffle',
          icon: 'waffle',
          line: '에이전트 하네스. 내 어시스턴트 W가 그 안에 있습니다.',
        },
        {
          role: '메모리',
          name: 'Whisk',
          icon: 'whisk',
          line: '알맞은 문서와 컨텍스트를 모든 요청에 섞어 넣습니다.',
        },
        {
          role: '컨트롤',
          name: 'Syrup',
          icon: 'syrup',
          line: '모든 GPU의 모니터링, 텔레메트리, 접근 제어, 비용.',
        },
        {
          role: '엔진',
          name: 'Butter',
          icon: 'butter',
          line: '텍스트, 비전, 오디오를 위한 멀티모달 추론을 스트리밍으로.',
        },
        {
          role: '커널',
          name: 'Iron',
          icon: 'iron',
          line: 'Rust로 한 번 작성하면, 어디서나 최적화된 커널로.',
        },
      ],
      hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
      outside: {
        title: '남의 API',
        note: '필요 없습니다. 내가 동의하지 않는 한 데이터는 내 하드웨어에 머뭅니다.',
      },
      outcomes: [
        '토큰당 비용을 낮추도록 설계',
        '기본값은 프라이빗',
        '패치 완료, 모두 한눈에',
      ],
      caption:
        '나, 내 팀, 내 에이전트의 요청은 Pantry(보안), Waffle(에이전트), Whisk(메모리), Syrup(컨트롤), Butter(엔진), Iron(커널)을 거쳐 소유하거나 임대한 하드웨어에 닿고, 답은 같은 길로 돌아옵니다. 토큰당 비용을 낮추도록 설계되었고, 기본값은 프라이빗이며, 패치를 마치고 모든 것을 한눈에 봅니다.',
    },
  },

  audiences: {
    title: '모두를 위한 *자리*.',
    intro: '누구든 같은 스택을 쓸 수 있습니다.',
    items: [
      {
        title: '개인을 위해',
        body: '내 노트북에서 돌아가는 프라이빗 어시스턴트. 노트, 코드, 질문이 모두 내 컴퓨터에 머뭅니다.',
      },
      {
        title: '기업을 위해',
        body: '소유하거나 임대한 GPU로 AI를 사내에 들이세요. 민감한 데이터는 있어야 할 곳에 두고, 토큰당 비용은 줄이세요.',
        href: '/solutions/enterprise',
      },
      {
        title: 'GPU 클라우드를 위해',
        body: '임대하는 모든 GPU에서 더 많이 서빙하고, 플릿 전체를 한곳에서 보세요.',
        href: '/solutions/neoclouds',
      },
      {
        title: 'AI 개발자를 위해',
        body: '커널을 한 번 작성해 Metal, CUDA, ROCm, Vulkan에 배포하세요.',
        href: '/solutions/ai-companies',
      },
    ],
    linkLabel: '자세히 보기',
  },

  beliefs: {
    title: '우리가 *요리하는* 이유.',
    intro: '우리가 만드는 모든 것의 바탕에 있는 세 가지 믿음.',
    items: [
      {
        title: '모두를 위한 지능',
        body: 'AI에 대한 접근이 사는 곳, 버는 돈, 가진 자격에 좌우되어서는 안 됩니다.',
      },
      {
        title: '와트마다 더 많이',
        body: '지능에 대한 수요는 끝이 없지만, 전력과 칩은 그렇지 않습니다. 핵심은 컴퓨트 한 단위에서 더 쓸모 있는 일을 뽑아내는 것입니다.',
      },
      {
        title: '내 하드웨어에서, 충분히 좋게',
        body: '약 2년 안에, 사람들이 이미 가진 컴퓨터에서 돌아가는 모델로도 의미 있는 일을 할 수 있게 될 것입니다. 우리는 그때를 위해 만들고 있습니다.',
      },
    ],
    links: [
      { label: '발표 읽기', href: '/blog/introducing-waffuru' },
      { label: '우리가 믿는 것', href: '/about#beliefs' },
    ],
  },

  team: {
    title: '*주방*에 있는 사람들.',
    intro:
      '사이버보안, 군, 소비자, 엔터프라이즈 분야를 두루 거쳤습니다. 스타트업을 세우고 키워 왔으며, 중소기업부터 대기업까지 폭넓게 함께 일해 왔습니다.',
    portraitAlt: '{name}의 사진',
    link: { label: '팀 소개', href: '/about/team' },
  },

  cta: {
    title: '자리에 앉으세요.',
    body: '오늘 Pantry를 무료로 써 보세요. 스택의 나머지는 얼리 액세스 중입니다. 자리를 신청하시거나 이메일을 남겨 주시면 소식이 있을 때 연락드리겠습니다.',
  },
};

export default homeKo;
