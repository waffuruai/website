import type { aiCompanies } from './ai-companies';

const aiCompaniesKo: (typeof aiCompanies)['en'] = {
  seo: {
    title: 'AI 기업을 위한 GPU 커널과 LLM 서빙',
    description:
      'Metal, CUDA, ROCm, Vulkan용 커널을 한 번만 작성하세요. Python 없이 모델을 서빙하고, 양자화 KV 캐시와 추측 디코딩을 쓰세요. 얼리 액세스.',
    keywords: [
      '추론 최적화',
      'GPU 커널 이식성',
      'LLM 서빙 엔진',
      '추론 비용 절감',
    ],
  },
  name: 'AI 모델·추론 기업',
  serviceType: 'GPU 커널 컴파일러 및 LLM 서빙 엔진',
  card: {
    title: 'AI 모델·추론 *기업*',
    summary:
      '모든 GPU 백엔드를 위한 하나의 커널 정의, 그리고 Python이 필요 없는 서빙.',
  },
  hero: {
    title: '커널은 한 번만 쓰세요. 네 *백엔드*로 내보내세요.',
    lede: 'Iron이 하나의 커널 정의를 Metal, CUDA, ROCm, Vulkan으로 컴파일합니다. 그 위에서 Butter가 Python 없이 모델을 서빙하고, Syrup이 에이전트에 메모리를 줍니다.',
  },
  problem: {
    title: '백엔드마다 *재작성*입니다.',
    statement:
      '모델은 커널만큼만 이식할 수 있고, 커널은 보통 벤더마다 따로 작성합니다.',
    body: 'Apple 실리콘, NVIDIA, AMD, Vulkan을 모두 지원하려면 코드베이스도 버그도 따로 생기기 쉽고, 서빙 스택의 핫 패스에는 Python이 놓입니다. 추론 비용은 마진에 그대로 얹히고, 에이전트는 세션이 끝나는 순간 맥락을 잃습니다.',
  },
  useCases: {
    title: '무엇을 *출시*할 수 있나.',
    intro: '모델, 커널, 서빙을 만드는 팀을 위한 네 가지 일.',
    items: [
      {
        tag: 'inference',
        title: '커널을 한 번 쓰고 네 가지 백엔드에서 실행하세요.',
        body: 'Iron은 Rust에 내장된 DSL입니다. 커널은 공통 IR을 거쳐 Metal, CUDA, HIP/ROCm 또는 Vulkan SPIR-V로 변환되며, 기존 호스트가 호출할 수 있는 버전 관리형 C·Rust ABI 뒤에 놓입니다.',
      },
      {
        tag: 'inference',
        title: 'Python 없이 서빙하세요.',
        body: 'Butter는 Apple 실리콘에는 Metal 위의 Swift, CUDA를 비롯한 나머지에는 Rust로 만들었고, 스트리밍과 도구 호출을 지원하는 OpenAI 호환 API를 제공합니다. 하이브리드·MoE 모델, 추측 디코딩, LoRA도 기본으로 갖추고 있습니다.',
      },
      {
        tag: 'cost',
        title: '토큰당 와트를 줄이세요.',
        body: '2~8비트 양자화 체크포인트, 양자화된 KV 캐시, 추측 디코딩, 백엔드별 커널은 모두 와트당 토큰 수와 워크로드당 비용을 겨냥합니다. 우리는 측정하며, 재현할 수 없는 숫자는 내세우지 않습니다.',
      },
      {
        tag: 'control',
        title: '로컬에 머무는 메모리를 에이전트에 주세요.',
        body: 'Syrup은 TurboQuant+로 임베딩을 압축하고, 머신에서 어휘 검색과 벡터 검색을 함께 실행합니다. 결과는 MCP로 출처 인용과 함께 돌아오므로, 에이전트가 중단한 지점에서 이어갈 수 있습니다.',
      },
    ],
  },
  sample: {
    title: '커널은 *이렇게* 생겼습니다.',
    intro:
      '몇 개의 속성이 붙은 Rust 함수입니다. Iron이 이를 모든 백엔드로 변환합니다.',
    filename: 'unary.rs',
    language: 'iron · rust dsl',
    code: [
      '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
      'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
      '    let idx = program_id(0);',
      '    store(out[idx], exp(load(a[idx])));',
      '}',
    ].join('\n'),
    emitsLabel: '출력',
    emits: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
  },
  stackFit: {
    title: '스택이 *맞물리는* 방식.',
    intro: 'Iron과 Butter가 핵심입니다. Syrup과 Waffle이 이를 완성합니다.',
    items: [
      {
        product: 'iron',
        need: '하나의 커널 정의, 네 가지 백엔드.',
        body: '수학은 한 번만 새기세요. Iron이 공통 IR을 거쳐 Metal, CUDA, HIP/ROCm 또는 Vulkan SPIR-V로 변환하고, 버전이 관리되는 C·Rust ABI로 이미 가진 엔진이 결과물을 호출할 수 있습니다.',
      },
      {
        product: 'butter',
        need: 'Python 없는 모델 서빙.',
        body: 'safetensors, MLX, JANG, GGUF를 변환 없이 불러오고, 2~8비트 양자화 체크포인트, 하이브리드·MoE 모델, 양자화된 KV 캐시, 추측 디코딩, LoRA를 지원합니다. 텍스트, 비전, 음성 인식, 음성 합성, 옴니 모델을 OpenAI 호환 API 뒤에서 제공합니다.',
      },
      {
        product: 'syrup',
        need: '에이전트를 위한 메모리.',
        body: '노트와 코드에 대한 로컬 검색: TurboQuant+로 압축한 임베딩, 어휘 검색과 벡터 검색, MCP를 통한 출처 표기 결과.',
      },
      {
        product: 'waffle',
        need: '모든 GPU의 모든 엔진을 하나의 뷰로.',
        body: 'Butter를 vLLM, SGLang, llama.cpp 옆에서 돌리고 나란히 비교해 보세요. 호스트마다 작은 Rust 사이드카가 서명된 텔레메트리를 보고합니다.',
      },
    ],
  },
  whereWeAre: {
    title: '우리는 지금 *어디쯤*인가.',
    lede: 'Metal은 모든 커널을 가장 먼저 작성하고 튜닝하는 곳입니다. 제품은 얼리 액세스 중이며 당분간 비공개 소스입니다.',
    notes: [
      'Iron에는 현재 약 1,139개의 커널 선언이 있습니다.',
      'HIP와 Vulkan은 4,164개 중 4,164개 테스트 케이스를 비트 단위로 정확하게 통과하지만, 아직 튜닝하지는 않았습니다.',
      'CUDA는 RTX와 DGX Spark에서 프로덕션으로 운영 중이며, 데이터센터 GPU는 진행 중입니다.',
    ],
  },
  faq: [
    {
      question: 'Iron은 Metal과 CUDA를 직접 작성하는 것과 무엇이 다른가요?',
      answer:
        'Rust에 내장된 DSL로 커널 정의를 하나만 작성하면, 공통 IR을 거쳐 Metal, CUDA(PTX), HIP/ROCm 또는 Vulkan SPIR-V로 변환됩니다. 튜닝은 여전히 백엔드별로 하며, 지금은 Metal이 가장 먼저 받습니다.',
    },
    {
      question: '우리 기존 스택에서 Iron 커널을 호출할 수 있나요?',
      answer:
        '네. 버전이 관리되는 C·Rust ABI로 기존 호스트가 호출할 수 있으므로, Iron을 쓰기 위해 Butter를 도입할 필요는 없습니다.',
    },
    {
      question: 'Butter가 vLLM이나 llama.cpp보다 빠른가요?',
      answer:
        '재현할 수 없는 비교는 공개하지 않으며, CUDA나 ROCm에서 Butter가 다른 엔진을 앞선다고 주장하지도 않습니다. 벤치마크는 의견을 이기므로, 수치를 공개할 때는 방법도 함께 공개하겠습니다.',
    },
    {
      question: 'Butter는 어떤 모델을 돌리나요?',
      answer:
        'Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite, Phi, LFM, OLMo, SmolLM, Falcon H1, Jamba, InternLM과 비전, 음성, 옴니 변형을 지원합니다. DeepSeek V4는 진행 중입니다. 모델은 변환 없이 Hugging Face에서 곧바로 불러옵니다.',
    },
    {
      question: '접근 권한을 받을 수 있나요?',
      answer:
        '얼리 액세스는 신청을 받아 열어 드리고 있으며, 제품은 당분간 비공개 소스입니다. 어떤 백엔드와 모델이 중요한지 알려 주시면 답장드리겠습니다.',
    },
  ],
  cta: {
    title: '수학을 *실리콘*에 새기세요.',
    body: '얼리 액세스, 당분간 비공개 소스. 무엇을 만드는지, 어떤 백엔드가 중요한지, Python이 어디서 발목을 잡는지 알려 주시면 답장드리겠습니다.',
  },
};

export default aiCompaniesKo;
