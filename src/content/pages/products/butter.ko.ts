import type { butter } from './butter';

const butterKo: (typeof butter)['en'] = {
  layer: '서빙',
  tagline: '타협 없는 멀티모달 추론.',
  summary:
    'Apple 실리콘에는 Metal 위의 Swift를, CUDA를 비롯한 나머지에는 Rust를 씁니다. 2~8비트 양자화 체크포인트와 하이브리드·MoE 모델을 불러오고, OpenAI 호환 API와 Anthropic Messages API로 서빙합니다.',
  seo: {
    title: 'Butter: 의존성을 최소화한 멀티모달 추론',
    description:
      'macOS와 iOS는 Swift, 그 밖의 모든 곳은 Rust로 만든, 의존성을 최소화한 LLM 추론 엔진. Hugging Face 모델을 OpenAI 호환 API와 Anthropic Messages API로 서빙하며, 에이전트 하니스를 위해 만들었습니다.',
    keywords: [
      'LLM 추론 엔진',
      '로컬 LLM 서빙',
      'Apple 실리콘 추론',
      'OpenAI 호환 서버',
      'Anthropic Messages API 서버',
      '양자화 KV 캐시',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: '*타협* 없는 모델 서빙.',
    lede: 'Butter는 최소한의 의존성으로 모델을 서빙합니다. macOS와 iOS에는 Swift를, 그 밖의 모든 곳에는 Rust를 쓰며, 백엔드별로 튜닝한 커널 위에서 돌아갑니다. 안전성과 최고의 성능을 타협 없이 얻을 수 있습니다. Metal 커널은 미리 컴파일해 배포하며, 모델은 Hugging Face에서 곧바로 불러옵니다.',
    highlights: [
      {
        value: '4',
        label: '변환 없이 불러오는 체크포인트 형식',
      },
      {
        value: '2–8 bit',
        label: '양자화 체크포인트, 양자화된 KV 캐시까지',
      },
      { value: 'API 2종', label: 'OpenAI 호환과 Anthropic Messages' },
    ],
  },
  story: {
    heading: '내 모델. 내 하드웨어. 토큰 요금은 *없이*.',
    problem:
      '대부분의 팀은 AI를 토큰 단위로 빌려 씁니다. 프롬프트는 매번 회사 밖으로 나가고, 청구서는 사용자가 늘 때마다 커지며, 이미 값을 치른 하드웨어는 놀고 있습니다. 모델을 사내에서 돌리려면 보통 전문 팀과 몇 주의 설정이 필요합니다.',
    outcome:
      'Butter는 이미 가진 Mac이나 GPU 워크스테이션을 프라이빗 AI 서버로 바꿉니다. 모델을 고르고 Butter를 실행하면, 팀의 앱과 에이전트가 그날 바로 사용할 수 있습니다.',
    outcomes: [
      '비용 절감: 이미 값을 치른 하드웨어에서 오픈 모델을 돌리고, 압축으로 한 대가 더 많은 사람과 더 긴 대화를 감당합니다. 토큰 단위 요금이 없습니다.',
      '데이터는 사내에: 프롬프트, 문서, 답변이 여러분의 기기 밖으로 나가지 않습니다.',
      '기존 시스템은 그대로: Butter는 도구들이 이미 쓰는 OpenAI와 Anthropic API를 그대로 지원하므로, 전환은 URL 하나만 바꾸면 됩니다.',
    ],
  },
  capabilities: {
    heading: 'Butter가 *하는* 일.',
    intro:
      '체크포인트를 불러오는 순간부터 토큰을 스트리밍하기까지, 의존성은 최소한입니다.',
    items: [
      {
        title: '모델을 그대로 불러옵니다',
        body: 'safetensors, MLX, JANG, GGUF를 Hugging Face에서 곧바로 가져옵니다. 변환 단계는 없습니다.',
      },
      {
        title: '양자화, 하이브리드, MoE',
        body: '2~8비트 양자화 체크포인트, MXFP4와 NVFP4 블록 스케일 체크포인트, 하이브리드 모델, 전문가 혼합(MoE) 모델을 실행합니다.',
      },
      {
        title: '들어맞는 KV 캐시',
        body: 'KV 캐시는 4비트나 8비트로 저장하거나 AURA로 압축할 수 있습니다. 모든 캐시는 컨텍스트 한도에서 도는 링이라, 긴 세션은 요청을 실패시키는 대신 경고와 함께 가장 오래된 토큰을 밀어냅니다.',
      },
      {
        title: 'API 2종, 서버 하나',
        body: 'butter serve는 OpenAI Chat Completions API와 Anthropic Messages API를 모두 지원하며, 스트리밍, 구조화된 도구 호출, 별도 필드의 추론, 턴을 넘어 재사용되는 프롬프트 접두사를 제공합니다.',
      },
      {
        title: '추측 디코딩과 LoRA',
        body: '생성에는 추측 디코딩을, 직접 학습한 어댑터에는 LoRA를 씁니다.',
      },
      {
        title: '텍스트 그 이상',
        body: '텍스트, 비전, 음성 인식, 음성 합성, 옴니 모델.',
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
  extras: [
    {
      id: 'agents',
      heading: '당신의 *에이전트* 하니스와 함께 동작합니다.',
      intro:
        'Butter는 서버입니다. 하니스는 자기 루프, 도구, 승인, 압축을 그대로 유지합니다.',
      items: [
        {
          title: 'API 2종, 세션 하나',
          body: 'OpenAI Chat Completions와 Completions, 그리고 system 블록, tool_use와 tool_result 기록, thinking 블록을 갖춘 Anthropic Messages API. 기본 URL만 설정하면 됩니다.',
        },
        {
          title: '구조화된 도구 호출을 스트리밍으로',
          body: '도구 호출은 턴을 넘어 고유한 id를 가진 JSON으로 돌아오며 델타로 스트리밍됩니다. 인수 타입이 스키마를 따르므로 정수는 정수로 남습니다.',
        },
        {
          title: '추론을 보이거나 숨기거나',
          body: '요청마다 사고를 켜거나 끌 수 있습니다. 켜져 있으면 추론은 별도 필드나 thinking 블록으로 스트리밍되고 답변은 깔끔하게 유지됩니다.',
        },
        {
          title: '도구 라운드를 넘어 살아남는 프롬프트 접두사',
          body: '두 번째 라운드에서 시스템 프롬프트와 도구 목록을 다시 프리필하지 않습니다. usage.cached_tokens와 cache_read_input_tokens가 재사용된 양을 알려 줍니다.',
        },
        {
          title: '취소는 취소입니다',
          body: '연결을 닫으면 프리필 중이든 디코딩 중이든 그 요청은 멈춥니다. 남은 작업은 실행되지 않고 다른 요청은 계속됩니다.',
        },
        {
          title: '오류 대신 완만하게 줄어드는 컨텍스트',
          body: '컨텍스트 예산은 /v1/models에서 알려 줍니다. 한도를 넘으면 캐시는 루프를 실패시키는 대신 경고와 함께 가장 오래된 토큰을 밀어냅니다.',
        },
      ],
      note: 'Oh My Pi(Chat Completions)와 Claude Code 방식 클라이언트(Messages)를 테스트했고 지원합니다. Qwen 3.6, Qwen 3.8, Flint에서 확인했습니다.',
    },
    {
      id: 'quirks',
      heading: '모델의 *별난 습성*은 에이전트 대신 저희가 처리합니다.',
      intro:
        '모델 계열마다 템플릿, 토큰, 습성이 다릅니다. Butter는 이를 서버에서 흡수합니다.',
      items: [
        {
          title: '채팅 템플릿과 토큰',
          body: 'Nanbeige 템플릿의 공백은 그대로 유지되고, Qwen GGUF 제어 토큰은 쪼개지지 않으며, 숫자는 체크포인트의 경계대로 토큰화되어 프롬프트가 공식 토크나이저와 일치하고 도구 호출이 제대로 파싱됩니다. Gemma와 InternLM은 횡설수설하지 않고 턴 끝에서 멈춥니다.',
        },
        {
          title: '추론 제어',
          body: '사고 블록은 답변과 분리되고, 접두사 캐시가 살아남도록 도구 라운드를 넘어 유지됩니다. Flint의 추론에는 토큰 예산과 전환 메시지를 지정할 수 있습니다.',
        },
        {
          title: '도구 호출',
          body: 'Qwen의 XML 도구 호출은 응답에서도 재생된 기록에서도 타입이 있는 JSON이 됩니다. 도구를 선언하지 않은 응답은 절대 호출로 바뀌지 않고, 지원하지 않는 tool_choice는 조용히 무시되는 대신 처음부터 거부됩니다.',
        },
        {
          title: '오디오 프런트엔드',
          body: 'Whisper 계열 모델은 학습 때 쓴 Slaney 멜 필터뱅크를 그대로 받고, Qwen3-ASR의 언어 헤더는 전사에서 제거되며, Kokoro 체크포인트는 StyleTTS2가 아니라 Kokoro로 라우팅됩니다.',
        },
        {
          title: '로더와 메모리',
          body: '임베딩을 공유하는 GGUF는 출력 헤드 없이 불러오고, SentencePiece만 있는 저장소도 토큰화되며, 스트리밍 텍스트는 공백을 유지하고, 캐시를 넘어선 Qwen 대화는 거부되는 대신 복구됩니다.',
        },
      ],
    },
  ],
  specs: {
    heading: '기술 *세부 사항*.',
    rows: [
      {
        term: '런타임',
        detail:
          'macOS와 iOS에는 Metal 위의 Swift(macOS 14 이상), CUDA를 비롯한 그 밖의 모든 곳에는 Rust. 의존성이 최소한이어서 공급망 위험이 적습니다.',
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
      {
        term: '양자화',
        detail:
          '2, 3, 4, 5, 6, 8비트 어파인 양자화 체크포인트, 비트 폭은 텐서별로 유도. MXFP4와 NVFP4 블록 스케일 체크포인트. CUDA에서는 블록 FP8.',
      },
      {
        term: '아키텍처',
        detail:
          '밀집 모델, 하이브리드(어텐션과 순환의 혼합) 모델, 전문가 혼합(MoE) 모델.',
      },
      {
        term: 'KV 캐시',
        detail:
          '양자화: 4비트 또는 8비트 어파인, 또는 AURA 압축. 모든 캐시는 컨텍스트 한도에서 도는 링입니다.',
      },
      {
        term: '서빙 API',
        detail:
          'OpenAI Chat Completions와 Completions, Anthropic Messages, 토큰화와 토큰 수 계산 라우트, 헬스, 레디니스, Prometheus 메트릭. butter serve로 시작하며 --parallel로 동시 세션 수를 지정합니다.',
        chips: [
          { label: '스트리밍' },
          { label: '도구 호출' },
          { label: '추론 필드' },
          { label: '접두사 재사용' },
          { label: '비전 입력' },
          { label: '추측 디코딩' },
          { label: 'LoRA' },
        ],
      },
      {
        term: '에이전트 하네스',
        detail:
          '테스트 및 지원: Chat Completions를 쓰는 Oh My Pi, Messages를 쓰는 Claude Code 방식 클라이언트.',
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
          { label: 'DeepSeek', text: 'V4' },
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
      'Metal이 주력 대상입니다. CUDA는 지금 튜닝을 진행하고 있으며, ROCm과 Vulkan을 통한 AMD 지원은 빠르게 나아가고 있습니다.',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Apple 실리콘에는 Metal 위의 Swift, macOS 14 이상: MacBook, Mac mini, Mac Studio.',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'CUDA 위의 Rust. RTX와 DGX Spark에서 프로덕션으로 운영 중입니다.',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: 'ROCm과 Vulkan을 통한 AMD 지원, 빠르게 나아가고 있습니다.',
      },
    ],
  },
  stack: {
    heading: '나머지 *스택*과 함께 쓰기.',
    intro:
      'Butter는 Iron이 컴파일한 커널 위에서 모델을 실행합니다. Syrup은 vLLM, SGLang, llama.cpp와 나란히 Butter도 지켜볼 수 있고, Whisk는 AI가 하던 일을 기억하게 합니다.',
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
        'Apple 실리콘의 Metal 위 Swift가 주력 대상이며, macOS 14 이상의 MacBook부터 Mac Studio까지 지원합니다. CUDA는 RTX와 DGX Spark에서 프로덕션으로 운영 중이며 튜닝을 진행하고 있습니다. ROCm과 Vulkan을 통한 AMD 지원은 빠르게 나아가고 있습니다.',
    },
    {
      question: '어떤 모델을 돌릴 수 있나요?',
      answer:
        '현재 Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite, Phi를 비롯해 위에 나열한 여러 모델을 텍스트, 비전, 음성, 옴니 변형까지 지원합니다.',
    },
    {
      question: 'Butter는 어떤 언어로 만들었나요?',
      answer:
        'macOS와 iOS에는 Swift를, 그 밖의 모든 곳에는 Rust를 써서 속도와 메모리 안전성을 갖췄습니다. Butter는 의존성을 최소한으로 유지해 공급망 공격의 여지를 줄이며, 백엔드별로 튜닝한 커널 위에서 돌아갑니다.',
    },
    {
      question: '기존에 쓰던 도구와 에이전트 하니스도 연결할 수 있나요?',
      answer:
        'Butter는 butter serve 프로세스 하나로 OpenAI Chat Completions API와 Anthropic Messages API를 제공하며, 스트리밍, 구조화된 도구 호출, 추론 필드, 재사용되는 프롬프트 접두사를 지원합니다. 두 API 중 하나를 쓰는 클라이언트라면 그대로 연결할 수 있습니다.',
    },
    {
      question: '얼마나 빠른가요?',
      answer:
        '128 GB M5 Max에서 Butter는 4-bit Qwen3.8-27B를 단일 요청 기준 초당 103 토큰(약 937 토큰 프롬프트, 그리디)으로, 동시 요청 8개 기준 합계 초당 146 토큰(요청당 약 26)으로 서빙했습니다. 결과는 모델, 프롬프트 길이, 하드웨어에 따라 달라지며, 시험 조건은 이 페이지의 측정 결과와 함께 적혀 있습니다.',
    },
  ],
  cta: {
    title: '*지연 시간*을 녹여 없애세요.',
    body: 'Butter는 얼리 액세스 중이며 당분간 비공개 소스입니다. 접근을 신청해 주세요.',
    docsLabel: '문서 읽기',
  },
};

export default butterKo;
