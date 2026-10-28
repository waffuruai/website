import type { iron } from './iron';

const ironKo: (typeof iron)['en'] = {
  layer: '커널',
  tagline: '하나의 커널 정의, 네 가지 백엔드.',
  summary:
    'Rust로 한 번 작성하면, 어디서나 최적화된 커널을 얻습니다. Rust에 내장된 DSL입니다. 커널은 공통 IR을 거쳐 Metal, CUDA, HIP/ROCm 또는 Vulkan SPIR-V로 변환됩니다. 버전이 관리되는 C·Rust ABI로 기존 호스트에서도 호출할 수 있습니다.',
  seo: {
    title: 'Iron: GPU 커널 하나로 네 가지 백엔드',
    description:
      'GPU 커널을 Rust로 한 번 쓰면 Metal, CUDA, HIP/ROCm, Vulkan SPIR-V로 변환됩니다. C·Rust ABI 제공, 얼리 액세스 중.',
    keywords: [
      'Rust GPU 커널 DSL',
      'Metal 커널',
      'CUDA 커널',
      'ROCm HIP',
      'Vulkan SPIR-V',
      '크로스 플랫폼 GPU 커널',
    ],
  },
  hero: {
    title: '하나의 커널 정의, *네 가지* 백엔드.',
    lede: '추론 엔진이 brrrr 하고 질주하게 하세요. Iron은 Rust에 내장된 DSL입니다. 커널을 한 번 작성하면 특정 하드웨어에 최적화된 커널로 컴파일되고, 주요 모델과 일반적인 워크로드에 맞게 튜닝됩니다.',
    highlights: [
      { value: '4', label: '하나의 커널 정의에서 나오는 GPU 백엔드' },
      { value: '~1,139', label: '커널 선언' },
      {
        value: '4,164 / 4,164',
        label: 'HIP·Vulkan 테스트 코퍼스, 비트 단위로 정확',
      },
    ],
  },
  story: {
    heading: '같은 커널을 *네 번* 쓰는 일은 그만.',
    problem:
      'GPU 벤더마다 고유한 커널 언어가 있습니다. Apple, NVIDIA, AMD 하드웨어에 모두 내놓으려면 같은 수학을 벤더마다 다시 작성하고, 튜닝하고, 테스트해야 하며, 수식이 바뀔 때마다 모든 사본을 맞춰야 합니다.',
    outcome:
      '커널은 Rust로 한 번만 씁니다. Iron이 이를 공통 IR로, 다시 Metal, CUDA, HIP/ROCm 또는 Vulkan SPIR-V로 변환하므로 하나의 정의가 대상으로 삼는 모든 백엔드를 포괄합니다.',
    outcomes: [
      '책상 위의 Mac에서 먼저 작성하고 튜닝하세요. Metal이 주력 대상이며, 같은 정의가 다른 백엔드로 이어집니다.',
      '버전이 관리되는 C·Rust ABI로 이미 가진 코드에서 커널을 호출하세요.',
      '두 백엔드가 일치하기를 바라는 대신, 비트 단위로 정확한 테스트 코퍼스로 백엔드를 검증하세요.',
    ],
  },
  capabilities: {
    heading: 'Iron이 *하는* 일.',
    intro: '하드웨어에서부터 쌓아 올렸습니다. 커널을 쓰는 사람들을 위해.',
    items: [
      {
        title: '하나의 정의, 네 가지 백엔드',
        body: '커널은 공통 IR을 거쳐 Metal, CUDA, HIP/ROCm 또는 Vulkan SPIR-V로 변환됩니다. 관리할 소스는 하나입니다.',
      },
      {
        title: 'Rust로 작성',
        body: 'Rust에 내장된 DSL입니다. 커널은 #[kernel]이 붙은 Rust 함수이며, program_id, load, store 같은 기본 연산으로 구성됩니다. Iron 자체도 Rust로 만들어 속도와 메모리 안전성을 갖췄고, 의존성이 최소한이어서 공급망 공격의 여지가 줄어듭니다.',
      },
      {
        title: '호스트에서 바로 호출',
        body: '버전이 관리되는 C·Rust ABI 덕분에, 기존 호스트를 Iron에 맞춰 다시 쓰지 않고도 Iron 커널을 호출할 수 있습니다.',
      },
      {
        title: '테스트로 보증하는 비트 정확도, 벤치로 측정하는 성능',
        body: 'HIP·Vulkan 테스트 코퍼스는 4,164개 케이스로 이루어져 있으며, 4,164개 모두 비트 단위로 정확합니다. 벤치마크와 성능 측정 도구가 함께 제공되므로, 모든 커널을 검증할 뿐 아니라 측정도 합니다.',
      },
      {
        title: '천 개가 넘는 커널',
        body: '현재 약 1,139개의 커널 선언이 있습니다. 각각은 모든 백엔드가 공유하는 하나의 정의입니다.',
      },
      {
        title: '중요한 곳을 먼저 튜닝',
        body: '모든 커널은 Metal에서 가장 먼저 작성하고 튜닝합니다. CUDA는 지금 튜닝을 진행하고 있으며, ROCm과 Vulkan은 지금도 구동되지만 아직 튜닝하지 않았습니다.',
      },
    ],
  },
  specs: {
    heading: '기술 *세부 사항*.',
    rows: [
      {
        term: '언어',
        detail: 'Rust에 내장된 DSL. 커널은 #[kernel]이 붙은 Rust 함수입니다.',
      },
      {
        term: '파이프라인',
        detail: '하나의 커널 정의가 공통 IR로, 다시 각 백엔드로 변환됩니다.',
      },
      {
        term: '백엔드',
        chips: [
          { label: 'Metal: MSL → .metallib' },
          { label: 'CUDA → PTX' },
          { label: 'HIP/ROCm: HIP → AMDGPU' },
          { label: 'Vulkan → SPIR-V' },
        ],
      },
      {
        term: '호스트 ABI',
        detail:
          '버전이 관리되는 C·Rust ABI로 기존 호스트에서 Iron 커널을 호출할 수 있습니다.',
      },
      { term: '커널 수', detail: '약 1,139개의 커널 선언.' },
      {
        term: '테스트 코퍼스',
        detail: 'HIP·Vulkan: 4,164개 중 4,164개 케이스가 비트 단위로 정확.',
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
      'Iron은 단독으로도 쓸 수 있습니다. 커널 위에서 모델을 돌리려면 Butter를, 그 GPU를 지켜보려면 Syrup을, AI가 하던 일을 기억하게 하려면 Whisk를 더하세요.',
  },
  faq: [
    {
      question: 'Iron은 오픈 소스인가요?',
      answer:
        '아직은 아닙니다. Iron은 얼리 액세스 기간 동안 비공개 소스입니다. 얼리 액세스를 신청해 주시면 공유할 소식이 생길 때 연락드리겠습니다.',
    },
    {
      question: '어떤 하드웨어에서 돌아가나요?',
      answer:
        'Apple 실리콘의 Metal이 주력 대상이며, 모든 커널을 그곳에서 가장 먼저 작성하고 튜닝합니다. CUDA는 RTX와 DGX Spark에서 프로덕션으로 운영 중이며 튜닝을 진행하고 있고, H100, H200, B100, B200에서는 첫 실행을 마쳤습니다. AMD에서는 MI300에서 첫 실행을 마쳤고, ROCm과 Vulkan은 지금도 구동되지만 아직 튜닝하지 않았습니다.',
    },
    {
      question: '호스트 코드를 다시 작성해야 하나요?',
      answer:
        'Iron 커널을 호출하는 데는 필요 없습니다. 버전이 관리되는 C·Rust ABI로 기존 호스트에서 호출할 수 있습니다.',
    },
    {
      question: '직접 작성한 CUDA나 Metal보다 빠른가요?',
      answer:
        '벤치마크 수치를 공개하지 않았으므로 더 빠르다고 주장하지 않겠습니다. 지금 말씀드릴 수 있는 것은 하나의 정의가 네 가지 백엔드로 변환된다는 점, 그리고 HIP·Vulkan 테스트 코퍼스가 비트 단위로 정확하다는 점입니다.',
    },
    {
      question: '어떻게 써 볼 수 있나요?',
      answer: '이 페이지에서 얼리 액세스를 신청하세요.',
    },
  ],
  cta: {
    title: '첫 번째 *커널*을 새겨 보세요.',
    body: 'Iron은 얼리 액세스 중이며 당분간 비공개 소스입니다. 접근을 신청해 주세요.',
    docsLabel: '문서 읽기',
  },
};

export default ironKo;
