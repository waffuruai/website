import type { home } from './home';

const homeJa: (typeof home)['en'] = {
  seo: {
    keywords: [
      'ローカル LLM 推論',
      'GPU カーネル',
      '推論エンジン',
      'Apple シリコン',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'GPU フリート管理',
      'ネオクラウド',
      'オンデバイス AI',
      'プライベート AI',
    ],
  },

  hero: {
    eyebrow: '4 つの製品 · 現時点ではクローズドソース',
    title: '生の数式を、シリコンに*焼き付ける*。',
    lede: 'GPUカーネル、推論エンジン、コントロールプレーン、検索レイヤーを私たちが書き、チームが自分のハードウェアでモデルを動かせるようにします。ノートPCでも、自宅のラボでも、neocloud のフリートでも動き、計測した結果は公開します。',
    secondary: { label: 'スタックを見る', href: '#stack' },
    emits: {
      label: '出力先',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: 'スタック',
    intro:
      'Iron がカーネルをコンパイルし、Butter がその上でモデルを動かします。Waffle が GPU を見守り、Syrup が取り組んでいたことを覚えています。',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: '記憶',
        name: 'Syrup',
        tagline: 'あなたの AI が、取り組んでいたことを覚えています。',
        body: 'ノートとコードをローカルで検索します。埋め込みは TurboQuant+ で圧縮し、検索はキーワード検索とベクトル検索の併用。結果は出典付きで、MCP 経由で返ります。',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: 'コントロールプレーン',
        name: 'Waffle',
        tagline: 'すべての GPU と、その上で動くすべてのエンジンを可視化。',
        body: 'GPU 上の LLM のためのコントロールプレーン。デスクの下の 1 台から、フリートを貸し出すネオクラウドまで対応します。各ホストでは小さな Rust 製サイドカーが動き、署名付きテレメトリを報告します。Butter、vLLM、SGLang、llama.cpp など、OpenAI 互換のサーバーと連携できます。',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: 'サービング',
        name: 'Butter',
        tagline: 'Python 不要のモデルサービング。',
        body: 'Apple シリコンでは Metal 上の Swift、CUDA などでは Rust。2〜8 ビットの量子化チェックポイント、ハイブリッドモデルや MoE モデルを読み込み、KV キャッシュの量子化にも対応します。',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: 'カーネル',
        name: 'Iron',
        tagline: 'ひとつのカーネル定義から、4 つのバックエンドへ。',
        body: 'Rust に埋め込む DSL。カーネルは共通の IR に落とされ、そこから Metal、CUDA、HIP/ROCm、Vulkan SPIR-V へ。バージョン管理された C と Rust の ABI で、既存のホストから呼び出せます。',
      },
    ],
  },

  models: {
    title: 'メニューに並ぶモデル',
    intro:
      'Hugging Face からそのまま読み込めます。対応がもっとも広いのは Metal で、CUDA はモデルごとに順次広げています。',
    legend: { supported: '対応済み', inProgress: '近日対応' },
    lanes: [
      [
        {
          lab: 'Meta',
          logo: 'meta',
          models: 'Llama 3 · 3.1 · 3.2 · 3.3, Muse Glimmer',
        },
        {
          lab: 'Google',
          logo: 'google',
          models: 'Gemma 2 · 3 · 4, PaliGemma',
        },
        {
          lab: 'Qwen',
          logo: 'qwen',
          models: 'Qwen 2 · 3 · 3.5 · 3.6 · 3.8, VL, Omni, ASR',
        },
        {
          lab: 'OpenAI',
          logo: 'openai',
          models: 'GPT-OSS 20B · 120B, Whisper',
        },
        {
          lab: 'Mistral AI',
          logo: 'mistral',
          models: 'Mistral, Mistral 3 VL, Pixtral, Voxtral',
        },
        {
          lab: 'NVIDIA',
          logo: 'nvidia',
          models: 'Nemotron H · 3.5, VLM, Diffusion, Parakeet',
        },
        {
          lab: 'DeepSeek',
          logo: 'deepseek',
          models: 'DeepSeek V4 · V4.1',
          status: 'in-progress',
        },
        { lab: 'Z.ai', logo: 'zai', models: 'GLM-5.3, GLM-OCR, GLM-ASR' },
        { lab: 'IBM', logo: 'ibm', models: 'Granite 3 · 4, Granite Speech' },
        {
          lab: 'OpenBMB',
          logo: 'openbmb',
          models: 'MiniCPM 5, MiniCPM-V 4.6, MiniCPM-o',
        },
        { lab: 'Tencent', logo: 'tencent', models: 'Hy3' },
        { lab: 'inclusionAI', logo: 'inclusionai', models: 'Ling 3.0' },
        {
          lab: 'StepFun',
          logo: 'stepfun',
          models: 'Step 3',
          status: 'in-progress',
        },
        { lab: 'BigCode', logo: 'bigcode', models: 'StarCoder2' },
      ],
      [
        { lab: 'Microsoft', logo: 'microsoft', models: 'Phi 3' },
        { lab: 'Liquid AI', logo: 'liquid', models: 'LFM2 · LFM2.5' },
        { lab: 'Ai2', logo: 'ai2', models: 'OLMo 1 · 2' },
        {
          lab: 'Hugging Face',
          logo: 'huggingface',
          models: 'SmolLM, SmolVLM',
        },
        { lab: 'TII', logo: 'tii', models: 'Falcon H1' },
        { lab: 'AI21', logo: 'ai21', models: 'Jamba' },
        { lab: 'Apple', logo: 'apple', models: 'FastVLM' },
        {
          lab: 'Shanghai AI Lab',
          logo: 'internlm',
          models: 'InternLM 2',
        },
        { lab: 'hexgrad', logo: 'hexgrad', models: 'Kokoro' },
        { lab: '01.AI', logo: '01ai', models: 'Yi 1.5' },
        { lab: 'Recursive', logo: 'recursive', models: 'Flint' },
        {
          lab: 'Poolside',
          logo: 'poolside',
          models: 'Laguna S 2.1 · XS 2.1',
        },
        {
          lab: 'Nanbeige',
          logo: 'nanbeige',
          models: 'Nanbeige 4.3',
          status: 'in-progress',
        },
        {
          lab: 'Fish Audio',
          logo: 'fishaudio',
          models: 'Drama-3',
          status: 'in-progress',
        },
        {
          lab: 'Cohere',
          logo: 'cohere',
          models: 'Cohere Transcribe',
          status: 'in-progress',
        },
      ],
    ],
  },

  kernel: {
    title: 'あなたが書くのは、ここまで。\n*残りは Iron が書く。*',
    code: {
      file: 'unary.rs',
      label: 'iron · rust dsl',
      tokens: [
        {
          text: '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
          kind: 'comment',
        },
        { text: '\n' },
        { text: 'pub fn', kind: 'keyword' },
        { text: ' ' },
        { text: 'iron_exp', kind: 'function' },
        { text: '<T>(a: Tensor<T>, out: Tensor<T>) {\n    ' },
        { text: 'let', kind: 'keyword' },
        {
          text: ' idx = program_id(0);\n    store(out[idx], exp(load(a[idx])));\n}',
        },
      ],
    },
    tuned: {
      title: 'チューニングの状況',
      note: 'パルスの速さ = チューニングの進み具合',
    },
    tiers: [
      {
        name: 'Apple · Metal',
        level: 'primary',
        label: 'プライマリ',
        note: 'すべてのカーネルを、まずここで書き、チューニングします。MSL → .metallib。',
      },
      {
        name: 'NVIDIA · CUDA',
        level: 'secondary',
        label: 'セカンダリ',
        note: 'RTX と DGX Spark では本番稼働中。CUDA → PTX。',
      },
      {
        name: 'AMD ROCm · Vulkan',
        level: 'runs',
        label: '動作',
        note: 'AMD では急速に前進中。HIP → AMDGPU、Vulkan → SPIR-V。',
      },
    ],
    runsOn: {
      label: '動作環境',
      items: [
        'MacBook & Mac Studio',
        'RTX ワークステーション',
        'DGX Spark',
        'Strix Halo',
        'ネオクラウドのフリート',
      ],
      pending: 'エンタープライズ向けデータセンター GPU · 次の対象',
    },
  },

  team: {
    title: '*キッチン*に立つ人たち',
    intro:
      'リサーチ、セキュリティ、収益、そして製品を世に送り出した経験のある創業者が数人。',
    portraitAlt: '{name} のポートレート',
    link: { label: 'チームを見る', href: '/about/team' },
  },

  cta: {
    title: 'どうぞ、お席へ。',
    body: 'まだ公開しているものはありません。早期アクセスをお申し込みいただくか、下にメールアドレスを残してください。公開できるものができ次第、お知らせします。',
  },
};

export default homeJa;
