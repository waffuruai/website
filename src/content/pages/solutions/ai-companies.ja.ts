import type { aiCompanies } from './ai-companies';

const aiCompaniesJa: (typeof aiCompanies)['en'] = {
  seo: {
    title: 'AI 企業向け GPU カーネルと LLM サービング',
    description:
      'カーネルを一度書いて、Metal、CUDA、ROCm、Vulkan へ。依存関係を最小限にしたサービング、量子化 KV キャッシュ、投機的デコーディング。早期アクセス中。',
    keywords: [
      '推論の高速化',
      'GPU カーネルの移植性',
      'LLM サービングエンジン',
      '推論コスト削減',
    ],
  },
  name: 'AI モデル・推論企業',
  serviceType: 'GPU カーネルコンパイラと LLM サービングエンジン',
  card: {
    title: 'AI モデル・推論*企業*',
    summary:
      'すべての GPU バックエンドに向けたひとつのカーネル定義と、依存関係を最小限にしたサービング。',
  },
  hero: {
    title: 'カーネルは一度書くだけ。4 つの*バックエンド*へ届ける。',
    lede: 'Iron は、ひとつのカーネル定義を Metal、CUDA、ROCm、Vulkan にコンパイルします。その上で Butter が最小限の依存関係でモデルを提供し、Whisk がエージェントに記憶を与えます。',
  },
  problem: {
    title: 'バックエンドが増えるたび、*書き直し*。',
    statement:
      'モデルの移植性は、カーネルの移植性で決まります。そしてカーネルは、たいていベンダーごとに書かれています。',
    body: 'Apple シリコン、NVIDIA、AMD、Vulkan に対応しようとすれば、コードベースもバグも別々になりがちで、サービングスタックは依存関係で膨れ上がります。推論コストは利益率に直撃し、エージェントはセッションが終わった瞬間に文脈を失います。',
  },
  useCases: {
    title: 'リリースできる*もの*',
    intro: 'モデル、カーネル、サービングをつくるチームのための、4 つの仕事。',
    items: [
      {
        tag: 'inference',
        title: 'カーネルを一度書いて、4 つのバックエンドで動かす。',
        body: 'Iron は Rust に埋め込む DSL です。カーネルは共通の IR に落とされ、さらに Metal、CUDA、HIP/ROCm、Vulkan SPIR-V へ変換され、既存のホストから呼び出せる、バージョン管理された C と Rust の ABI の背後にあります。',
      },
      {
        tag: 'inference',
        title: '妥協なしで、提供する。',
        body: 'Butter は、macOS と iOS では Swift、それ以外では Rust で書かれ、依存関係を最小限に抑えつつ、OpenAI 互換 API、ストリーミング、ツール呼び出しに対応しています。ハイブリッドモデル、MoE モデル、投機的デコーディング、LoRA も最初から備えています。',
      },
      {
        tag: 'cost',
        title: 'トークンあたりのワット数を、減らす。',
        body: '2〜8 ビットの量子化チェックポイント、量子化された KV キャッシュ、投機的デコーディング、バックエンドごとのカーネルは、いずれも 1 ワットあたりのトークン数と、ワークロードあたりのコストを狙っています。私たちは計測し、再現できない数字は示しません。',
      },
      {
        tag: 'control',
        title: 'エージェントに、ローカルにとどまる記憶を与える。',
        body: 'Whisk は TurboQuant+ で埋め込みを圧縮し、マシン上でキーワード検索とベクトル検索を併用します。結果は MCP 経由で出典付きで返るので、エージェントは前回の続きから再開できます。',
      },
    ],
  },
  sample: {
    title: 'カーネルは、*こんな*ふうに書く。',
    intro:
      'いくつかの属性を付けた Rust の関数。Iron がそれを、すべてのバックエンドに変換します。',
    filename: 'unary.rs',
    language: 'iron · rust dsl',
    code: [
      '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
      'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
      '    let idx = program_id(0);',
      '    store(out[idx], exp(load(a[idx])));',
      '}',
    ].join('\n'),
    emitsLabel: '出力先',
    emits: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
  },
  stackFit: {
    title: 'スタックの*かみ合わせ方*',
    intro: '中核は Iron と Butter。Whisk と Syrup が、それを補います。',
    items: [
      {
        product: 'iron',
        need: 'ひとつのカーネル定義から、4 つのバックエンドへ。',
        body: '計算を一度だけ焼き込めば、Iron が共通の IR を経由して Metal、CUDA、HIP/ROCm、Vulkan SPIR-V に変換し、バージョン管理された C と Rust の ABI で、すでにお持ちのエンジンから結果を呼び出せます。',
      },
      {
        product: 'butter',
        need: '依存関係を最小限にしたモデルサービング。',
        body: 'safetensors、MLX、JANG、GGUF を変換なしで読み込み、さらに 2〜8 ビットの量子化チェックポイント、ハイブリッドモデルと MoE モデル、量子化された KV キャッシュ、投機的デコーディング、LoRA に対応します。テキスト、ビジョン、音声認識、音声合成、オムニの各モデルが、OpenAI 互換 API の背後にあります。',
      },
      {
        product: 'whisk',
        need: 'エージェントのための記憶。',
        body: 'ノートとコードに対するローカル検索。TurboQuant+ で圧縮した埋め込み、キーワード検索とベクトル検索の併用、MCP 経由の出典付きの結果。',
      },
      {
        product: 'syrup',
        need: 'すべての GPU のすべてのエンジンを、ひとつの画面で。',
        body: 'Butter を vLLM、SGLang、llama.cpp と並べて動かし、横並びで確認できます。各ホストの小さな Rust 製サイドカーが署名付きテレメトリを報告します。',
      },
    ],
  },
  whereWeAre: {
    title: '私たちの*現在地*',
    lede: 'すべてのカーネルを、まず Metal で書き、チューニングします。製品は、現時点で早期アクセスで、クローズドソースです。',
    notes: [
      '現在、Iron には約 1,139 個のカーネル宣言があります。',
      'HIP と Vulkan は、テストコーパス 4,164 件のうち 4,164 件でビット単位の一致を確認していますが、チューニングはこれからです。',
      'CUDA は RTX と DGX Spark で本番稼働中で、H100、H200、B100、B200 では初回の実行を終えています。',
    ],
  },
  faq: [
    {
      question: 'Iron は、Metal や CUDA を手で書くのと何が違いますか？',
      answer:
        'Rust に埋め込む DSL でカーネル定義をひとつ書けば、共通の IR を経由して Metal、CUDA（PTX）、HIP/ROCm、Vulkan SPIR-V に変換されます。チューニングは引き続きバックエンドごとで、現時点では Metal が最初です。',
    },
    {
      question: '既存のスタックから Iron のカーネルを呼び出せますか？',
      answer:
        'はい。バージョン管理された C と Rust の ABI で既存のホストから呼び出せるので、Iron を使うために Butter を導入する必要はありません。',
    },
    {
      question: 'Butter は vLLM や llama.cpp より速いですか？',
      answer:
        '再現できない比較は公開しませんし、CUDA や ROCm で Butter が他のエンジンを上回るとも主張しません。意見よりベンチマークです。数字を公開するときは、方法も併せて示します。',
    },
    {
      question: 'Butter はどのモデルを動かせますか？',
      answer:
        'Llama、Gemma、Qwen、GPT-OSS、Mistral、Nemotron、Granite、Phi、LFM、OLMo、SmolLM、Falcon H1、Jamba、InternLM、そしてビジョン、音声、オムニのバリエーションです。DeepSeek V4 は対応中です。モデルは Hugging Face から変換なしで直接読み込めます。',
    },
    {
      question: 'アクセスは可能ですか？',
      answer:
        '早期アクセスは申し込み制で、製品は現時点でクローズドソースです。重要なバックエンドとモデルを教えていただければ、返信します。',
    },
  ],
  cta: {
    title: '計算を、*シリコン*に焼き込む。',
    body: '現時点では早期アクセスで、クローズドソースです。何をつくっているか、どのバックエンドが重要か、いまのスタックのどこが邪魔になっているかを教えていただければ、返信します。',
  },
};

export default aiCompaniesJa;
