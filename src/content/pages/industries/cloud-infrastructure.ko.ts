import type { cloudInfrastructure } from './cloud-infrastructure';

const cloudInfrastructureKo: (typeof cloudInfrastructure)['en'] = {
  seo: {
    title: 'GPU 클라우드·호스팅을 위한 추론 소프트웨어',
    description:
      'GPU 클라우드와 호스팅 사업자라면 모든 GPU, 엔진, 테넌트를 보고, GPU 시간마다 더 많이 얻으며, 여러 벤더에서 서빙하세요. 얼리 액세스.',
    keywords: [
      '매니지드 추론 플랫폼',
      'GPU 호스팅 소프트웨어',
      'GPU 활용률',
      'GPU 시간당 매출',
      '멀티 벤더 GPU 추론',
    ],
  },
  name: '클라우드 인프라',
  serviceType: 'GPU 플릿 가시성 및 매니지드 추론 소프트웨어',
  card: {
    title: '클라우드 *인프라*',
    summary:
      'GPU 클라우드와 호스팅 사업자를 위한, GPU 시간마다 더 많은 성과와 모든 테넌트에 대한 가시성, 그리고 여러 벤더.',
  },
  hero: {
    title: 'GPU 시간 하나하나가 *수익*을 내게 하세요.',
    lede: '용량을 시간 단위로 판매하고, 그 위에서 돌아가는 것을 책임집니다. 모든 GPU와 엔진, 테넌트를 한곳에서 보고, 자신 있게 내놓을 수 있는 매니지드 추론을 제공하며, GPU 벤더 선택지를 열어 두세요.',
  },
  problem: {
    title: '노는 시간은 *청구*되지 않습니다.',
    statement:
      'GPU 시간당 매출과 마진이 사업을 좌우하는데, 플릿은 그 어느 쪽도 좀처럼 알려 주지 않습니다.',
    body: '테넌트는 각자의 엔진과 설정을 가져오고, 벤더마다 보고 방식이 다르며, 비용은 그것을 쓴 고객이 아니라 카드에 쌓입니다. 이제 고객은 베어메탈만이 아니라 매니지드 추론을 원하고, 이를 취약한 의존성 더미 위에 쌓는 것은 고객 대신 떠안는 위험입니다.',
  },
  useCases: {
    title: '*랙*마다 더 많은 성과를.',
    intro: 'GPU 용량을 판매하는 팀을 위한 네 가지 일.',
    items: [
      {
        tag: 'cost',
        title: '모든 GPU가 무엇을 하는지 파악하세요.',
        body: 'Syrup은 호스트, GPU, 엔진, 테넌트를 가로지르는 하나의 뷰를 제공합니다. 엔진이 Butter, vLLM, SGLang, llama.cpp 무엇이든 마찬가지입니다. 놀고 있거나 맞지 않게 배치된 용량이 마진에 드러나기 전에 화면에 먼저 드러납니다.',
      },
      {
        tag: 'control',
        title: '어느 테넌트가 무엇을 돌리는지 확인하세요.',
        body: '비용을 귀속시키려면 먼저 누가 어느 카드에서 무엇을 돌렸는지 알아야 합니다. 호스트마다 작은 Rust 사이드카가 서명된 텔레메트리를 보고하므로, 수치가 그것을 보낸 호스트에서 왔는지 검증할 수 있습니다.',
      },
      {
        tag: 'inference',
        title: '자신 있게 내놓을 수 있는 매니지드 추론을 제공하세요.',
        body: 'Butter는 스트리밍과 도구 호출을 지원하는 OpenAI 호환 API를 제공하며, 의존성을 최소한으로 줄였습니다. 구성 요소가 적을수록 남의 워크로드 아래에서 패치할 것도, 고장 날 것도 줄어듭니다.',
      },
      {
        tag: 'control',
        title: '여러 벤더를 랙에 올리세요.',
        body: 'Iron은 버전이 관리되는 C·Rust ABI 뒤에서 하나의 커널 정의를 Metal, CUDA, HIP/ROCm, Vulkan SPIR-V로 변환합니다. GPU 벤더를 추가하는 일은 두 번째 코드베이스가 아니라 튜닝 작업이 됩니다.',
      },
    ],
  },
  stackFit: {
    title: '스택이 *맞물리는* 방식.',
    intro: '시작은 Syrup입니다. Butter와 Iron은 그 밑에서 산출을 끌어올립니다.',
    items: [
      {
        product: 'syrup',
        need: '모든 GPU, 엔진, 테넌트를 하나의 화면으로.',
        body: '호스트마다 작은 Rust 사이드카가 서명된 텔레메트리를 보고하고, Syrup은 비용을 테넌트별로 나누어 보여 줍니다. Butter, vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버와 함께 동작하므로, 테넌트는 자신이 고른 엔진을 그대로 씁니다.',
      },
      {
        product: 'butter',
        need: '구성 요소가 더 적은 매니지드 추론.',
        body: 'macOS와 iOS에는 Swift, 그 밖의 모든 곳에는 Rust를 써서 속도와 메모리 안전성을 갖췄습니다. 의존성이 최소한이어서 테넌트를 위해 떠안는 공급망 위험이 줄어듭니다. 양자화 체크포인트와 KV 캐시, 추측 디코딩, LoRA를 OpenAI 호환 API 뒤에서 제공합니다.',
      },
      {
        product: 'iron',
        need: '다음 벤더까지 따라가는 커널.',
        body: '하나의 커널 정의가 Metal, CUDA, HIP/ROCm 또는 Vulkan SPIR-V로 변환됩니다. 버전이 관리되는 C·Rust ABI로 이미 호스팅 중인 엔진에서 호출할 수 있습니다.',
      },
    ],
  },
  whereWeAre: {
    title: '우리는 지금 *어디쯤*인가.',
    lede: 'GPU 클라우드에 가장 중요한 이야기부터 하겠습니다. 데이터센터 GPU는 첫 실행을 마친 단계로 아직 프로덕션은 아닙니다. Syrup, Butter, Iron은 얼리 액세스 중이며 당분간 비공개 소스입니다.',
    notes: [
      'CUDA는 RTX와 DGX Spark에서 프로덕션으로 운영 중입니다. H100, H200, B100, B200, MI300에서는 첫 실행을 마쳤습니다. 보유한 데이터센터 GPU 세대를 알려 주세요. 우리가 듣는 플릿 이야기가 무엇부터 튜닝할지 결정합니다.',
      'ROCm과 Vulkan은 지금도 구동되지만 아직 튜닝하지 않았습니다.',
      'CUDA나 ROCm에서 Butter가 다른 엔진을 앞선다고 주장하지 않습니다. 측정값을 공개할 때는 방법도 함께 공개하겠습니다.',
    ],
  },
  faq: [
    {
      question: '테넌트가 엔진을 바꿔야 하나요?',
      answer:
        '아니요. Syrup은 Butter, vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버와 함께 동작합니다. 테넌트는 쓰던 것을 그대로 쓰고, 여러분은 그 전체를 하나의 뷰로 봅니다.',
    },
    {
      question: '어떤 GPU를 지원하나요?',
      answer:
        'Apple 실리콘은 Metal을 통해 주력입니다. NVIDIA는 CUDA를 통해 RTX와 DGX Spark에서 프로덕션으로 운영 중이며 튜닝을 진행하고 있고, H100, H200, B100, B200에서는 첫 실행을 마쳤습니다. AMD에서는 MI300에서 첫 실행을 마쳤고, ROCm과 Vulkan은 구동되지만 아직 튜닝하지 않았습니다.',
    },
    {
      question: '마진을 얼마나 늘려 주나요?',
      answer:
        '수치를 약속하지는 않겠습니다. 각 GPU가 누구를 위해 무엇을 돌리는지, 테넌트당 비용이 얼마인지 보는 것이 먼저입니다. 그다음 우리가 움직이려는 숫자는 GPU 시간당 산출과 워크로드당 비용이며, 고객의 플릿에서 직접 측정합니다.',
    },
    {
      question: '텔레메트리를 왜 믿어야 하나요?',
      answer:
        '호스트마다 작은 Rust 사이드카가 서명된 텔레메트리를 보고하므로, 수치가 그것을 보낸 호스트에서 왔는지 검증할 수 있습니다. 고객 환경에서 서명이 어떻게 동작하는지는 문의해 주세요.',
    },
    {
      question: '어떻게 이용할 수 있나요?',
      answer:
        '얼리 액세스는 신청을 받아 열어 드리고 있으며, 제품은 당분간 비공개 소스입니다. 플릿과 벤더, 테넌트에 대해 알려 주시면 답장드리겠습니다.',
    },
  ],
  cta: {
    title: '*랙*을 보여 주세요.',
    body: '얼리 액세스, 당분간 비공개 소스. GPU, 엔진, 테넌트가 이를 나눠 쓰는 방식을 알려 주시면, 지금 무엇이 맞는지 솔직하게 말씀드리겠습니다.',
  },
};

export default cloudInfrastructureKo;
