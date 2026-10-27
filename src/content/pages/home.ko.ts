import type { home } from './home';

const homeKo: (typeof home)['en'] = {
  seo: {
    keywords: [
      '로컬 LLM 추론',
      'GPU 커널',
      '추론 엔진',
      'Apple 실리콘',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'GPU 플릿 관리',
      '네오클라우드',
      '온디바이스 AI',
      '프라이빗 AI',
    ],
  },

  hero: {
    eyebrow: '제품 4종 · 당분간 비공개 소스',
    title: '날것의 수학을 실리콘에 *눌러 담다*.',
    lede: '우리는 GPU 커널, 추론 엔진, 컨트롤 플레인, 검색 레이어를 만들어 팀이 자체 하드웨어에서 모델을 실행할 수 있게 합니다. 노트북, 홈 랩, neocloud 플릿 어디서든 돌아가며, 측정한 결과는 공개합니다.',
    secondary: { label: '스택 보기', href: '#stack' },
    emits: {
      label: '출력',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: '스택.',
    intro:
      'Iron이 커널을 컴파일하고, Butter가 그 위에서 모델을 실행합니다. Waffle은 GPU를 지켜보고, Syrup은 하던 일을 기억합니다.',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: '메모리',
        name: 'Syrup',
        tagline: '당신의 AI가 하던 일을 기억합니다.',
        body: '노트와 코드를 로컬에서 검색합니다. 임베딩은 TurboQuant+로 압축하고, 검색은 어휘 검색과 벡터 검색을 함께 사용하며, 결과는 MCP를 통해 출처와 함께 돌려줍니다.',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: '컨트롤 플레인',
        name: 'Waffle',
        tagline: '모든 GPU와 그 위에서 돌아가는 모든 엔진을 한눈에.',
        body: 'GPU 위에서 도는 LLM을 위한 컨트롤 플레인입니다. 책상 아래 서버 한 대부터 플릿을 임대하는 네오클라우드까지 다룹니다. 각 호스트에서 작은 Rust 사이드카가 서명된 텔레메트리를 보고합니다. Butter, vLLM, SGLang, llama.cpp 등 OpenAI 호환 서버와 함께 동작합니다.',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: '서빙',
        name: 'Butter',
        tagline: 'Python 없는 모델 서빙.',
        body: 'Apple 실리콘에는 Metal 위의 Swift를, CUDA를 비롯한 나머지에는 Rust를 씁니다. 2~8비트 양자화 체크포인트와 하이브리드·MoE 모델을 불러오고, 양자화된 KV 캐시를 지원합니다.',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: '커널',
        name: 'Iron',
        tagline: '하나의 커널 정의, 네 가지 백엔드.',
        body: 'Rust에 내장된 DSL입니다. 커널은 공통 IR을 거쳐 Metal, CUDA, HIP/ROCm 또는 Vulkan SPIR-V로 변환됩니다. 버전이 관리되는 C·Rust ABI로 기존 호스트에서도 호출할 수 있습니다.',
      },
    ],
  },

  team: {
    title: '*주방*에 있는 사람들.',
    intro: '연구, 보안, 매출, 그리고 이미 제품을 출시해 본 창업자들.',
    portraitAlt: '{name}의 사진',
    link: { label: '팀 소개', href: '/about/team' },
  },

  cta: {
    title: '자리에 앉으세요.',
    body: '아직 공개된 것은 없습니다. 얼리 액세스를 신청하시거나 아래에 이메일을 남겨 주세요. 공개되는 대로 연락드리겠습니다.',
  },
};

export default homeKo;
