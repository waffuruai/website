import type { neoclouds } from './neoclouds';

const neocloudsKo: (typeof neoclouds)['en'] = {
  seo: {
    title: 'GPU 클라우드를 위한 추론 플랫폼',
    description:
      '테넌트와 엔진을 가로지르는 플릿 가시성, GPU당 더 쓸모 있는 토큰, 모든 호스트의 서명된 텔레메트리. vLLM, SGLang, llama.cpp와 함께 동작합니다.',
    keywords: [
      'GPU 클라우드 소프트웨어',
      'GPU 활용률',
      'GPU 클라우드 추론 플랫폼',
      '멀티 테넌트 GPU 모니터링',
    ],
  },
  name: '네오클라우드',
  serviceType: 'GPU 플릿 가시성 및 추론 소프트웨어',
  card: {
    title: '*네오클라우드*',
    summary: '테넌트와 엔진을 가로지르는 플릿 가시성, GPU당 더 쓸모 있는 토큰.',
  },
  hero: {
    title: '임대하는 *GPU* 하나하나에서 더 많은 성과를.',
    lede: '테넌트와 엔진을 가로질러 플릿 전체를 보고, 고객이 돌리는 워크로드 아래에 백엔드별로 튜닝한 커널을 깔아 보세요. 특정 엔진에 묶이지 않습니다.',
  },
  problem: {
    title: '보이지 않는 *플릿*.',
    statement:
      '고객은 각자의 엔진과 버전, 설정을 가져오고, 그 아래의 GPU는 우리가 책임져야 하는 부분입니다.',
    body: '대시보드는 카드가 바쁘다고 알려 줄 수는 있어도, 무엇이 누구를 위해 얼마나 잘 돌고 있는지는 알려 주지 못합니다. 엔진마다 보고 방식이 다르고 테넌트마다 구성이 다르며, 놀고 있거나 잘 맞지 않게 배치된 용량은 짚어 낼 수 없는 매출입니다.',
  },
  useCases: {
    title: '더 *촘촘한* 플릿.',
    intro: 'GPU 클라우드를 돌리는 팀을 위한 네 가지 일.',
    items: [
      {
        tag: 'cost',
        title: '모든 GPU에서 무엇이 도는지 파악하세요.',
        body: 'Syrup은 호스트, GPU, 엔진, 테넌트를 가로지르는 하나의 뷰를 제공합니다. 엔진이 vLLM, SGLang, llama.cpp, Butter 무엇이든 마찬가지입니다. 놀고 있거나 맞지 않게 배치된 용량이 화면에 가장 먼저 드러납니다.',
      },
      {
        tag: 'control',
        title: '대시보드의 수치를 믿으세요.',
        body: '호스트마다 작은 Rust 사이드카가 서명된 텔레메트리를 보고하므로, 수치가 그것을 보낸 호스트에서 왔는지 검증할 수 있습니다. 플릿 전체 수치를 믿음에 기대어 받아들이지 않아도 됩니다.',
      },
      {
        tag: 'inference',
        title: 'GPU당 더 쓸모 있는 토큰을 서빙하세요.',
        body: 'Butter는 백엔드별로 튜닝한 커널에 양자화된 모델과 KV 캐시, 추측 디코딩을 결합해 와트당 토큰 수를 겨냥합니다. 테넌트가 이미 고른 엔진과 나란히 돌릴 수 있어, 내 플릿에서 직접 비교할 수 있습니다.',
      },
      {
        tag: 'control',
        title: '하나의 엔진에 걸지 않고 선택지를 제공하세요.',
        body: 'Butter는 OpenAI 호환 API를 제공하고 Syrup은 vLLM, SGLang, llama.cpp와 함께 동작합니다. 어느 한 엔진을 중심으로 다시 짜지 않고도 고객에게 더 많은 선택권을 줄 수 있습니다.',
      },
    ],
  },
  stackFit: {
    title: '스택이 *맞물리는* 방식.',
    intro:
      'Syrup은 여러분을 위해 만든 부분입니다. Butter와 Iron은 그 밑의 효율을 다룹니다.',
    items: [
      {
        product: 'syrup',
        need: '플릿 전체를 보세요.',
        body: '책상 아래 서버 한 대부터 플릿을 임대하는 네오클라우드까지. 호스트마다 작은 Rust 사이드카가 서명된 텔레메트리를 보고하며, Syrup은 Butter, vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버와 함께 동작합니다.',
      },
      {
        product: 'butter',
        need: '의존성을 최소화한, 직접 통제하는 엔진.',
        body: 'macOS와 iOS에는 Swift, 그 밖의 모든 곳에는 Rust. 양자화 체크포인트와 KV 캐시, 추측 디코딩, LoRA를 OpenAI 호환 API 뒤에서 제공합니다.',
      },
      {
        product: 'iron',
        need: '다음에 구매할 하드웨어를 위한 커널.',
        body: '하나의 커널 정의, 네 가지 백엔드: Metal, CUDA, HIP/ROCm, Vulkan SPIR-V. 버전이 관리되는 C·Rust ABI로 기존 호스트에서 호출할 수 있습니다.',
      },
    ],
  },
  whereWeAre: {
    title: '우리는 지금 *어디쯤*인가.',
    lede: 'Syrup과 Butter는 얼리 액세스 중이며 당분간 비공개 소스입니다. CUDA는 RTX와 DGX Spark에서 프로덕션으로 운영 중이고, 데이터센터 GPU는 진행 중입니다.',
    notes: [
      '보유한 GPU 세대를 알려 주세요. 데이터센터용 CUDA는 진행 중이므로, 우리가 듣는 플릿 이야기가 무엇을 먼저 할지 결정합니다.',
      'ROCm과 Vulkan은 지금도 구동되지만 아직 튜닝하지 않았습니다.',
      'CUDA나 ROCm에서 Butter가 다른 엔진을 앞선다고 주장하지 않습니다. 측정값을 공개할 때는 방법도 함께 공개하겠습니다.',
    ],
  },
  faq: [
    {
      question: 'Syrup이 지금 쓰는 엔진을 대체하나요?',
      answer:
        '아니요. Syrup은 Butter, vLLM, SGLang, llama.cpp 및 기타 OpenAI 호환 서버와 함께 동작합니다. 먼저 가시성을 확보하고, 엔진은 바꾸고 싶을 때에만 바꾸세요.',
    },
    {
      question: '어떤 GPU에서 돌아가나요?',
      answer:
        'Apple 실리콘은 Metal을 통해 주력입니다. NVIDIA는 CUDA를 통해 보조이며 RTX와 DGX Spark에서 프로덕션으로 운영 중이고 데이터센터 GPU는 진행 중입니다. AMD ROCm과 Vulkan은 구동되지만 아직 튜닝하지 않았습니다.',
    },
    {
      question: '텔레메트리를 왜 믿어야 하나요?',
      answer:
        '호스트마다 작은 Rust 사이드카가 서명된 텔레메트리를 보고하므로, 수치가 그것을 보낸 호스트에서 왔는지 검증할 수 있습니다. 고객 환경에서 서명이 어떻게 동작하는지는 문의해 주세요.',
    },
    {
      question: '활용률을 얼마나 되찾을 수 있나요?',
      answer:
        '수치를 약속하지는 않겠습니다. 플릿을 보는 것이 첫걸음이고, 와트당 토큰 수와 워크로드당 비용이 우리가 움직이려는 숫자입니다. 숫자를 내세우기보다 고객의 플릿에서 직접 측정하겠습니다.',
    },
    {
      question: '써 볼 수 있나요?',
      answer:
        '얼리 액세스는 신청을 받아 열어 드리고 있으며, 제품은 당분간 비공개 소스입니다. 플릿에 대해 알려 주시면 답장드리겠습니다.',
    },
  ],
  cta: {
    title: '*플릿*을 보여 주세요.',
    body: '얼리 액세스, 당분간 비공개 소스. GPU, 엔진, 테넌트가 이를 나눠 쓰는 방식을 알려 주시면 무엇이 맞는지 답장드리겠습니다.',
  },
};

export default neocloudsKo;
