import type { neoclouds } from './neoclouds';

// TODO(founder): confirm what Syrup can break down per tenant, and how the
// telemetry signature is verified, before this page says more than "signed
// telemetry" and "across tenants and engines".
const neocloudsJa: (typeof neoclouds)['en'] = {
  seo: {
    title: 'GPU クラウド向け推論プラットフォーム',
    description:
      'テナントとエンジンをまたぐフリートの可視化、GPU あたりのトークン増、全ホストの署名付きテレメトリ。vLLM、SGLang、llama.cpp 対応。早期アクセス中。',
    keywords: [
      'GPU クラウド ソフトウェア',
      'GPU 稼働率',
      'GPU クラウド向け推論プラットフォーム',
      'マルチテナント GPU 監視',
    ],
  },
  name: 'ネオクラウド',
  serviceType: 'GPU フリート可視化・推論ソフトウェア',
  card: {
    title: '*ネオクラウド*',
    summary:
      'テナントとエンジンをまたぐフリートの可視化。GPU あたりの有用なトークンを増やします。',
  },
  hero: {
    title: '貸し出すすべての *GPU* から、より多くを引き出す。',
    lede: 'テナントとエンジンをまたいでフリート全体を見渡し、お客様が動かす仕事の下に、バックエンドごとにチューニングしたカーネルを敷く。特定のエンジンに縛られることはありません。',
  },
  problem: {
    title: '*見えない*フリート',
    statement:
      'お客様は、それぞれのエンジン、バージョン、設定を持ち込み、その下にある GPU が、あなたの責任範囲になります。',
    body: 'ダッシュボードは、カードが稼働中だとは言えても、そこで何が、誰のために、どれだけうまく動いているかは教えてくれません。エンジンごとに報告の仕方が違い、テナントごとに構成も違い、遊んでいる容量やうまく噛み合っていない容量は、どこにあるのかも示せない売上です。',
  },
  useCases: {
    title: '引き締まった*フリート*',
    intro: 'GPU クラウドを動かし続けるチームのための、4 つの仕事。',
    items: [
      {
        tag: 'cost',
        title: 'すべての GPU で何が動いているかを、把握する。',
        body: 'vLLM でも、SGLang でも、llama.cpp でも、Butter でも、Syrup はホスト、GPU、エンジン、テナントをまたいで、ひとつの画面を提供します。遊んでいる容量や、噛み合っていない容量は、まずあなたの画面に現れます。',
      },
      {
        tag: 'control',
        title: 'ダッシュボードの数値を、信頼できる。',
        body: '各ホストでは小さな Rust 製サイドカーが動き、署名付きテレメトリを報告します。そのため、数値が送信元のホストのものだと検証できます。フリート全体の数字を、信じるしかない状態から抜け出せます。',
      },
      {
        tag: 'inference',
        title: 'GPU あたりの有用なトークンを、増やす。',
        body: 'Butter は、バックエンドごとにチューニングしたカーネルに、量子化モデルと KV キャッシュ、投機的デコーディングを組み合わせ、すべて 1 ワットあたりのトークン数を狙っています。テナントがすでに選んでいるエンジンと並べて動かせるので、自分のフリートで比較できます。',
      },
      {
        tag: 'control',
        title: '特定のエンジンに賭けずに、選択肢を提供する。',
        body: 'Butter は OpenAI 互換 API を提供し、Syrup は vLLM、SGLang、llama.cpp と連携します。特定のエンジンを軸に組み直すことなく、お客様により多くの選択肢を提供できます。',
      },
    ],
  },
  stackFit: {
    title: 'スタックの*かみ合わせ方*',
    intro:
      'あなたのためにあるのは Syrup です。Butter と Iron は、その下で効率を高めます。',
    items: [
      {
        product: 'syrup',
        need: 'フリート全体を見渡す。',
        body: 'デスクの下の 1 台から、フリートを貸し出すネオクラウドまで。各ホストの小さな Rust 製サイドカーが署名付きテレメトリを報告し、Syrup は Butter、vLLM、SGLang、llama.cpp など OpenAI 互換のサーバーと連携します。',
      },
      {
        product: 'butter',
        need: '自分で制御できる、依存関係が最小限のエンジン。',
        body: 'macOS と iOS では Swift、それ以外では Rust。量子化されたチェックポイントと KV キャッシュ、投機的デコーディング、LoRA が OpenAI 互換 API の背後にあります。',
      },
      {
        product: 'iron',
        need: '次に買うハードウェアのための、カーネル。',
        body: 'ひとつのカーネル定義から、4 つのバックエンドへ。Metal、CUDA、HIP/ROCm、Vulkan SPIR-V。バージョン管理された C と Rust の ABI で、既存のホストから呼び出せます。',
      },
    ],
  },
  whereWeAre: {
    title: '私たちの*現在地*',
    lede: 'Syrup と Butter は、現時点で早期アクセスで、クローズドソースです。CUDA は RTX と DGX Spark で本番稼働中です。H100、H200、B100、B200、MI300 では初回の実行を終えています。',
    notes: [
      'お使いの GPU の世代を教えてください。お聞きするフリートの状況が、どれから先にチューニングするかを左右します。',
      'ROCm と Vulkan は現時点で動作しますが、チューニングはこれからです。',
      'CUDA や ROCm で Butter が他のエンジンを上回るとは主張しません。計測結果を公開するときは、方法も併せて示します。',
    ],
  },
  faq: [
    {
      question: 'Syrup は、いま使っているエンジンを置き換えますか？',
      answer:
        '置き換えません。Syrup は Butter、vLLM、SGLang、llama.cpp など OpenAI 互換のサーバーと連携します。まず可視化を手に入れ、エンジンを変えるのは、変えたいと思ったときだけで構いません。',
    },
    {
      question: 'どの GPU で動きますか？',
      answer:
        'Metal 経由の Apple シリコンが第一です。CUDA 経由の NVIDIA は、RTX と DGX Spark では本番稼働中でチューニングを進めており、H100、H200、B100、B200 では初回の実行を終えています。AMD では MI300 で初回の実行を終えており、ROCm と Vulkan は動作しますが、チューニングはこれからです。',
    },
    {
      question: 'テレメトリを信頼できる理由は何ですか？',
      answer:
        '各ホストでは小さな Rust 製サイドカーが動き、署名付きテレメトリを報告します。そのため、数値が送信元のホストのものだと検証できます。お客様の環境で署名がどう機能するかは、お問い合わせください。',
    },
    {
      question: '稼働率はどのくらい回復しますか？',
      answer:
        'パーセンテージはお約束しません。フリートを見渡すことが最初の一歩で、私たちが動かそうとしている数字は、1 ワットあたりのトークン数と、ワークロードあたりのコストです。数字を示すより、お客様のフリートで計測したいと考えています。',
    },
    {
      question: '試すことはできますか？',
      answer:
        '早期アクセスは申し込み制で、製品は現時点でクローズドソースです。フリートについて教えていただければ、返信します。',
    },
  ],
  cta: {
    title: 'あなたの*フリート*を、見せてほしい。',
    body: '現時点では早期アクセスで、クローズドソースです。お使いの GPU、エンジン、そしてテナントがそれらをどう共有しているかを教えていただければ、合うものについて返信します。',
  },
};

export default neocloudsJa;
