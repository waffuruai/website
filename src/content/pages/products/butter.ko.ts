import type { butter } from './butter';

const butterKo: (typeof butter)['en'] = {
  layer: '서빙',
  tagline: 'Python 없는 모델 서빙.',
  summary:
    'Apple 실리콘에는 Metal 위의 Swift를, CUDA를 비롯한 나머지에는 Rust를 씁니다. 2~8비트 양자화 체크포인트와 하이브리드·MoE 모델을 불러오고, 양자화된 KV 캐시를 지원합니다.',
  seo: {
    title: 'Butter: Python 없는 LLM 추론',
    description:
      'Apple 실리콘은 Swift, CUDA는 Rust로 만든 LLM 추론 엔진. Hugging Face 모델을 그대로 불러 OpenAI 호환 API로 서빙합니다.',
    keywords: [
      'LLM 추론 엔진',
      '로컬 LLM 서빙',
      'Apple 실리콘 추론',
      'OpenAI 호환 서버',
      '양자화 KV 캐시',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: 'Python *없는* 모델 서빙.',
    lede: 'Butter는 Apple 실리콘에는 Metal 위의 Swift로, CUDA를 비롯한 나머지에는 Rust로 작성한 추론 엔진입니다. Python도 JIT도 없고, 모델은 Hugging Face에서 곧바로 불러옵니다.',
    highlights: [
      {
        value: '4',
        label: '변환 없이 불러오는 체크포인트 형식',
      },
      {
        value: '2–8 bit',
        label: '양자화 체크포인트, 양자화된 KV 캐시 지원',
      },
      { value: 'Python 없음', label: 'JIT도 없음' },
    ],
  },
  story: {
    heading: 'Python도 *변환*도 건너뛰세요.',
    problem:
      '모델이 답을 내게 하려면 보통 Python 환경, 변환 단계, 실행하면서 컴파일하는 런타임이 필요합니다. 노트북이나 GPU 한 대짜리 서버에서는 응답을 받기까지 너무 많은 장치가 가로막고 있는 셈입니다.',
    outcome:
      'Hugging Face의 모델을 Butter에 지정하세요. safetensors, MLX, JANG, GGUF를 그대로 불러오며, butter serve 한 줄이면 이미 가진 하드웨어에서 OpenAI 호환 서버가 뜹니다.',
    outcomes: [
      'Mac이나 RTX 워크스테이션에서 2~8비트 양자화 체크포인트, 하이브리드 모델, 전문가 혼합(MoE) 모델을 돌리세요.',
      '이미 쓰는 도구를 스트리밍과 도구 호출을 지원하는 OpenAI 호환 엔드포인트에 연결하세요.',
      '양자화된 KV 캐시로 긴 컨텍스트에서도 메모리 사용량을 낮추세요.',
    ],
  },
  capabilities: {
    heading: 'Butter가 *하는* 일.',
    intro:
      '체크포인트를 불러오는 순간부터 토큰을 스트리밍하기까지, 그 사이에 Python은 없습니다.',
    items: [
      {
        title: '모델을 그대로 불러옵니다',
        body: 'safetensors, MLX, JANG, GGUF를 Hugging Face에서 곧바로 가져옵니다. 변환 단계는 없습니다.',
      },
      {
        title: '양자화, 하이브리드, MoE',
        body: '2~8비트 양자화 체크포인트, 하이브리드 모델, 전문가 혼합(MoE) 모델을 실행합니다.',
      },
      {
        title: '양자화된 KV 캐시',
        body: '컨텍스트가 길어져도 메모리 사용량을 억제할 수 있도록 KV 캐시를 양자화해 저장합니다.',
      },
      {
        title: 'OpenAI 호환 서빙',
        body: 'butter serve는 스트리밍과 도구 호출을 지원하는 OpenAI 호환 API를 제공합니다.',
      },
      {
        title: '추측 디코딩과 LoRA',
        body: '생성에는 추측 디코딩을, 직접 학습한 어댑터에는 LoRA를 지원합니다.',
      },
      {
        title: '텍스트 그 이상',
        body: '텍스트, 비전, 음성 인식, 음성 합성, 옴니 모델을 지원합니다.',
      },
    ],
  },
  code: {
    heading: '서버를 띄우고, *물어보세요*.',
    intro:
      'Butter는 OpenAI API를 그대로 사용하므로, 이미 쓰는 클라이언트를 연결할 수 있습니다.',
    caption:
      '예시입니다. 플레이스홀더는 사용하는 모델과 포트로 바꾸세요. 벤치마크가 아닙니다.',
  },
  specs: {
    heading: '기술 *세부 사항*.',
    intro: '꼼꼼히 읽어 보실 분들을 위한 상세 정보.',
    rows: [
      {
        term: '런타임',
        detail:
          'Apple 실리콘에는 Metal 위의 Swift, CUDA를 비롯한 나머지에는 Rust. Python도 JIT도 없습니다.',
      },
      {
        term: '모델 형식',
        detail: 'Hugging Face에서 변환 없이 곧바로 불러옵니다.',
        chips: [
          { label: 'safetensors' },
          { label: 'MLX' },
          { label: 'JANG' },
          { label: 'GGUF' },
        ],
      },
      { term: '양자화', detail: '2~8비트 양자화 체크포인트.' },
      {
        term: '아키텍처',
        detail: '하이브리드 및 전문가 혼합(MoE) 모델.',
      },
      { term: 'KV 캐시', detail: '양자화 지원.' },
      {
        term: '서빙 API',
        detail: 'OpenAI 호환, butter serve로 시작.',
        chips: [
          { label: '스트리밍' },
          { label: '도구 호출' },
          { label: '추측 디코딩' },
          { label: 'LoRA' },
        ],
      },
      {
        term: '모달리티',
        chips: [
          { label: '텍스트' },
          { label: '비전' },
          { label: '음성 인식' },
          { label: '음성 합성' },
          { label: '옴니' },
        ],
      },
      {
        term: '모델 계열',
        groups: [
          { label: 'Meta', text: 'Llama 3, 3.1, 3.2, 3.3' },
          { label: 'Google', text: 'Gemma 2, 3, 4; PaliGemma' },
          { label: 'Qwen', text: '2, 3, 3.5, 3.6, 3.8; VL; Omni' },
          { label: 'OpenAI', text: 'GPT-OSS 20B, 120B; Whisper' },
          { label: 'Mistral', text: 'Mistral; Mistral 3 VL; Voxtral' },
          { label: 'NVIDIA', text: 'Nemotron H; Nemotron VLM' },
          { label: 'DeepSeek', text: 'V4', inProgress: true },
          { label: 'IBM', text: 'Granite 3, 4' },
          { label: 'Microsoft', text: 'Phi 3' },
          { label: 'Liquid AI', text: 'LFM2, LFM2.5' },
          { label: 'Ai2', text: 'OLMo 1, 2' },
          { label: 'Hugging Face', text: 'SmolLM; SmolVLM' },
          { label: 'TII', text: 'Falcon H1' },
          { label: 'AI21', text: 'Jamba' },
          { label: 'Apple', text: 'FastVLM' },
          { label: 'Shanghai AI Lab', text: 'InternLM 2' },
        ],
      },
      {
        term: '제공 현황',
        detail: '얼리 액세스 기간 동안 비공개 소스.',
      },
    ],
  },
  platforms: {
    heading: '*구동*되는 곳.',
    intro:
      'Metal이 주력 대상입니다. CUDA는 그다음이며, ROCm과 Vulkan은 구동되지만 아직 튜닝하지 않았습니다.',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Apple 실리콘에는 Metal 위의 Swift: MacBook과 Mac Studio.',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'CUDA 위의 Rust. RTX와 DGX Spark에서 프로덕션으로 운영 중이며, 데이터센터 GPU는 진행 중입니다.',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: '지금도 동작하지만 아직 튜닝하지 않았습니다.',
      },
    ],
  },
  stack: {
    heading: '나머지 *스택*과 함께 쓰기.',
    intro:
      'Butter는 Iron이 컴파일한 커널 위에서 모델을 실행합니다. Waffle은 vLLM, SGLang, llama.cpp와 나란히 Butter도 지켜볼 수 있고, Syrup은 AI가 하던 일을 기억하게 합니다.',
  },
  faq: [
    {
      question: 'Butter는 오픈 소스인가요?',
      answer:
        '아직은 아닙니다. Butter는 얼리 액세스 기간 동안 비공개 소스입니다. 얼리 액세스를 신청해 주시면 공유할 소식이 생길 때 연락드리겠습니다.',
    },
    {
      question: '어떤 하드웨어에서 돌아가나요?',
      answer:
        'Apple 실리콘의 Metal 위 Swift가 주력 대상이며, MacBook부터 Mac Studio까지 지원합니다. CUDA는 그다음으로, RTX와 DGX Spark에서 프로덕션으로 운영 중이고 데이터센터 GPU는 진행 중입니다. ROCm과 Vulkan은 지금도 구동되지만 아직 튜닝하지 않았습니다.',
    },
    {
      question: '어떤 모델을 돌릴 수 있나요?',
      answer:
        '현재 Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite, Phi를 비롯해 위에 나열한 여러 모델을 텍스트, 비전, 음성, 옴니 변형까지 지원합니다. DeepSeek V4는 진행 중입니다.',
    },
    {
      question: 'Python이 필요한가요?',
      answer:
        '아니요. Butter는 Apple 실리콘에는 Metal 위의 Swift, CUDA를 비롯한 나머지에는 Rust로 만들어져 Python도 JIT도 없습니다.',
    },
    {
      question: '기존에 쓰던 도구도 연결할 수 있나요?',
      answer:
        'Butter는 butter serve로 스트리밍과 도구 호출을 포함한 OpenAI 호환 API를 제공하므로, 해당 API를 쓰는 클라이언트를 그대로 연결할 수 있습니다.',
    },
    {
      question: '얼마나 빠른가요?',
      answer:
        '128 GB M5 Max에서 Butter는 4-bit Qwen3.8-27B를 단일 요청 기준 초당 75.4 토큰(2,052 토큰 프롬프트, 그리디)으로, 동시 요청 16개 기준 합계 초당 157.3 토큰(요청당 약 12.9)으로 서빙했습니다. 결과는 모델, 프롬프트 길이, 하드웨어에 따라 달라지며, 시험 조건은 홈페이지에 적혀 있습니다.',
    },
  ],
  cta: {
    title: '*지연 시간*을 녹여 없애세요.',
    body: 'Butter는 얼리 액세스 중이며 당분간 비공개 소스입니다. 접근을 신청해 주세요.',
    docsLabel: '문서 읽기',
  },
};

export default butterKo;
