import type { butter } from './butter';

const butterJa: (typeof butter)['en'] = {
  layer: 'サービング',
  tagline: 'Python 不要のモデルサービング。',
  summary:
    'Apple シリコンでは Metal 上の Swift、CUDA などでは Rust。2〜8 ビットの量子化チェックポイント、ハイブリッドモデルや MoE モデルを読み込み、KV キャッシュの量子化にも対応します。',
  seo: {
    title: 'Butter：Python 不要の LLM 推論エンジン',
    description:
      'Hugging Face のモデルをそのまま読み込み、OpenAI 互換 API で提供する LLM 推論エンジン。Swift と Rust で書かれ、Python は不要。',
    keywords: [
      'LLM 推論エンジン',
      'ローカル LLM サービング',
      'Apple シリコン 推論',
      'OpenAI 互換サーバー',
      '量子化 KV キャッシュ',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: 'モデルサービングを、Python *なし*で。',
    lede: 'Butter は、Apple シリコンでは Metal 上の Swift、CUDA などでは Rust で書かれた推論エンジンです。Python も JIT も使わず、モデルは Hugging Face から直接読み込みます。',
    highlights: [
      {
        value: '4',
        label: '変換なしで読み込めるチェックポイント形式',
      },
      {
        value: '2–8 bit',
        label: '量子化チェックポイント。KV キャッシュも量子化',
      },
      { value: 'Python 不要', label: 'JIT もなし' },
    ],
  },
  story: {
    heading: 'Python も*変換*も、省く。',
    problem:
      'モデルに答えさせるには、たいてい Python 環境、変換の手順、そして実行しながらコンパイルするランタイムが必要です。ノート PC や GPU 1 台のマシンでは、あなたと応答のあいだに、ずいぶん多くの仕掛けが挟まることになります。',
    outcome:
      'Butter に Hugging Face 上のモデルを指定するだけ。safetensors、MLX、JANG、GGUF をそのまま読み込み、butter serve で、お手元のハードウェア上に OpenAI 互換のサーバーが立ち上がります。',
    outcomes: [
      'Mac や RTX ワークステーションで、2〜8 ビットの量子化チェックポイント、ハイブリッドモデル、Mixture of Experts（MoE）モデルを動かせます。',
      'いま使っているツールを、ストリーミングとツール呼び出しに対応した OpenAI 互換のエンドポイントに向けられます。',
      '量子化した KV キャッシュで、長いコンテキストでもメモリ使用量を抑えられます。',
    ],
  },
  capabilities: {
    heading: 'Butter が*できる*こと',
    intro:
      'チェックポイントの読み込みから、トークンのストリーミングまで。間に Python は入りません。',
    items: [
      {
        title: 'モデルをそのまま読み込む',
        body: 'safetensors、MLX、JANG、GGUF を Hugging Face から直接取得できます。変換の手順はありません。',
      },
      {
        title: '量子化、ハイブリッド、MoE',
        body: '2〜8 ビットの量子化チェックポイント、ハイブリッドモデル、Mixture of Experts モデルを動かせます。',
      },
      {
        title: '量子化された KV キャッシュ',
        body: 'KV キャッシュを量子化して保持し、コンテキストが伸びてもメモリ使用量を抑えます。',
      },
      {
        title: 'OpenAI 互換のサービング',
        body: 'butter serve が、ストリーミングとツール呼び出しに対応した OpenAI 互換 API を公開します。',
      },
      {
        title: '投機的デコーディングと LoRA',
        body: '生成には投機的デコーディングを、自分で学習させたアダプターには LoRA を使えます。',
      },
      {
        title: 'テキストだけではない',
        body: 'テキスト、ビジョン、音声認識、音声合成、オムニモデルに対応します。',
      },
    ],
  },
  code: {
    heading: 'サーバーを起動して、*問いかける*。',
    intro:
      'Butter は OpenAI API で話すので、いま使っているクライアントをそのまま向けられます。',
    caption:
      'あくまで例です。プレースホルダーは、お使いのモデルとポートに置き換えてください。ベンチマークではありません。',
  },
  specs: {
    heading: '技術的な*詳細*',
    intro: '細部まで読みたい人のための、詳細です。',
    rows: [
      {
        term: 'ランタイム',
        detail:
          'Apple シリコンでは Metal 上の Swift、CUDA などでは Rust。Python も JIT も不要。',
      },
      {
        term: 'モデル形式',
        detail: 'Hugging Face から直接読み込み。変換は不要。',
        chips: [
          { label: 'safetensors' },
          { label: 'MLX' },
          { label: 'JANG' },
          { label: 'GGUF' },
        ],
      },
      { term: '量子化', detail: '2〜8 ビットの量子化チェックポイント。' },
      {
        term: 'アーキテクチャ',
        detail: 'ハイブリッドモデルと Mixture of Experts（MoE）モデル。',
      },
      { term: 'KV キャッシュ', detail: '量子化。' },
      {
        term: 'サービング API',
        detail: 'OpenAI 互換。butter serve で起動。',
        chips: [
          { label: 'ストリーミング' },
          { label: 'ツール呼び出し' },
          { label: '投機的デコーディング' },
          { label: 'LoRA' },
        ],
      },
      {
        term: 'モダリティ',
        chips: [
          { label: 'テキスト' },
          { label: 'ビジョン' },
          { label: '音声認識' },
          { label: '音声合成' },
          { label: 'オムニ' },
        ],
      },
      {
        term: 'モデルファミリー',
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
        term: '提供状況',
        detail: '早期アクセス期間中は非公開で、クローズドソース。',
      },
    ],
  },
  platforms: {
    heading: '*動作*する環境',
    intro:
      'Metal が第一の対象です。CUDA は第二で、ROCm と Vulkan は動作しますが、チューニングはこれからです。',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Apple シリコン向けの Metal 上の Swift。MacBook と Mac Studio。',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'CUDA 上の Rust。RTX と DGX Spark では本番稼働中で、データセンター GPU は対応中です。',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: '現時点で動作しますが、チューニングはこれからです。',
      },
    ],
  },
  stack: {
    heading: '*スタック*のほかの部分とも連携する。',
    intro:
      'Butter は、Iron がコンパイルしたカーネルの上でモデルを動かします。Waffle は vLLM、SGLang、llama.cpp と並べて Butter を見守ることができ、Syrup は、取り組んでいたことを AI に覚えさせます。',
  },
  faq: [
    {
      question: 'Butter はオープンソースですか？',
      answer:
        '現時点ではオープンソースではありません。Butter は早期アクセス期間中、非公開でクローズドソースです。アクセスをお申し込みいただければ、お伝えできることが増えた時点でご連絡します。',
    },
    {
      question: 'どのハードウェアで動きますか？',
      answer:
        'Apple シリコン向けの Metal 上の Swift が第一の対象で、MacBook から Mac Studio まで対応します。CUDA は第二の対象で、RTX と DGX Spark では本番稼働中、データセンター GPU は対応中です。ROCm と Vulkan は現時点で動作しますが、チューニングはこれからです。',
    },
    {
      question: 'どのモデルが動きますか？',
      answer:
        '現時点では、Llama、Gemma、Qwen、GPT-OSS、Mistral、Nemotron、Granite、Phi のほか、上に挙げたモデルに対応しています。テキスト、ビジョン、音声、オムニの各バリエーションがあります。DeepSeek V4 は対応中です。',
    },
    {
      question: 'Python は必要ですか？',
      answer:
        '必要ありません。Butter は、Apple シリコンでは Metal 上の Swift、CUDA などでは Rust で書かれており、Python も JIT も使いません。',
    },
    {
      question: 'いま使っているツールは使えますか？',
      answer:
        'butter serve で、ストリーミングとツール呼び出しを含む OpenAI 互換 API を提供するので、その API に対応したクライアントを向けられます。',
    },
    {
      question: 'どのくらい速いですか？',
      answer:
        '128 GB の M5 Max で、Butter は 4-bit の Qwen3.8-27B を単一リクエストで毎秒 75.4 トークン（2,052 トークンのプロンプト、グリーディ）、同時 16 リクエストの合計で毎秒 157.3 トークン（1 リクエストあたり約 12.9）で提供しました。結果はモデル、プロンプトの長さ、ハードウェアによって変わります。試験条件はホームページに記載しています。',
    },
  ],
  cta: {
    title: '*レイテンシ*を、溶かして消す。',
    body: 'Butter は現時点で早期アクセスで、クローズドソースです。アクセスをお申し込みください。',
    docsLabel: 'ドキュメントを読む',
  },
};

export default butterJa;
