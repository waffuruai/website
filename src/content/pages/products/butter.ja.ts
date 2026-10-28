import type { butter } from './butter';

const butterJa: (typeof butter)['en'] = {
  layer: 'サービング',
  tagline: 'Python 不要のモデルサービング。',
  summary:
    'Apple シリコンでは Metal 上の Swift、CUDA などでは Rust。2〜8 ビットの量子化チェックポイント、ハイブリッドモデルや MoE モデルを読み込み、OpenAI 互換と Anthropic Messages の API で提供します。',
  seo: {
    title: 'Butter：Python 不要の LLM 推論エンジン',
    description:
      'Hugging Face のモデルを OpenAI 互換と Anthropic Messages の API で提供する LLM 推論エンジン。Swift と Rust で書かれ、Python は不要。エージェントハーネス向けに作られています。',
    keywords: [
      'LLM 推論エンジン',
      'ローカル LLM サービング',
      'Apple シリコン 推論',
      'OpenAI 互換サーバー',
      'Anthropic Messages API サーバー',
      '量子化 KV キャッシュ',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: 'モデルサービングを、Python *なし*で。',
    lede: 'Butter は、Apple シリコンでは Metal 上の Swift、CUDA などでは Rust で書かれた推論エンジンです。Python は使わず、Metal カーネルは事前コンパイル済みで出荷され、モデルは Hugging Face から直接読み込みます。',
    highlights: [
      {
        value: '4',
        label: '変換なしで読み込めるチェックポイント形式',
      },
      {
        value: '2–8 bit',
        label: '量子化チェックポイント。KV キャッシュも量子化',
      },
      { value: '2 つの API', label: 'OpenAI 互換と Anthropic Messages' },
    ],
  },
  story: {
    heading: '自分のモデルを、自分のハードウェアで。トークン課金は*なし*。',
    problem:
      '多くのチームは AI をトークン単位で借りています。プロンプトは毎回社外に出て、請求額はユーザーが増えるたびに膨らみ、すでに支払ったハードウェアは遊んだまま。モデルを社内で動かすには、たいてい専門チームと数週間のセットアップが必要です。',
    outcome:
      'Butter は、手元の Mac や GPU ワークステーションをプライベートな AI サーバーに変えます。モデルを選んで Butter を起動すれば、チームのアプリやエージェントがその日のうちに使えます。',
    outcomes: [
      'コストを削減: すでに支払ったハードウェアでオープンモデルを動かし、圧縮によって 1 台でより多くの人とより長い会話に対応。トークン単位の料金はありません。',
      'データは社内に: プロンプト、ドキュメント、回答がマシンの外に出ることはありません。',
      '上流は変更不要: Butter はツールが使っているのと同じ OpenAI と Anthropic の API を話すので、切り替えは URL を変えるだけです。',
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
        body: '2〜8 ビットの量子化チェックポイント、MXFP4 と NVFP4 のブロックスケール付きチェックポイント、ハイブリッドモデル、Mixture of Experts モデルを動かせます。',
      },
      {
        title: '収まる KV キャッシュ',
        body: 'KV キャッシュは 4 ビットか 8 ビットで保持するか、AURA で圧縮できます。すべてのキャッシュはコンテキスト上限のリングなので、長いセッションでもリクエストを失敗させず、警告を出して最も古いトークンを追い出します。',
      },
      {
        title: '2 つの API、1 つのサーバー',
        body: 'butter serve は OpenAI の Chat Completions API と Anthropic の Messages API を話します。ストリーミング、構造化されたツール呼び出し、専用フィールドでの推論、ターンをまたいで再利用されるプロンプト接頭辞に対応します。',
      },
      {
        title: '投機的デコーディングと LoRA',
        body: '生成には投機的デコーディングを、自分で学習させたアダプターには LoRA を使えます。',
      },
      {
        title: 'テキストだけではない',
        body: 'テキスト、ビジョン、音声認識、音声合成、オムニの各モデル。',
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
  extras: [
    {
      id: 'agents',
      heading: 'あなたの*エージェント*ハーネスと組み合わせて使う。',
      intro:
        'Butter はサーバーです。ハーネス側のループ、ツール、承認、圧縮はそのままです。',
      items: [
        {
          title: '2 つの API、1 つのセッション',
          body: 'OpenAI の Chat Completions と Completions、そして system ブロック、tool_use と tool_result の履歴、thinking ブロックに対応した Anthropic Messages API。ベース URL を設定するだけです。',
        },
        {
          title: '構造化されたツール呼び出しをストリーミングで',
          body: 'ツール呼び出しは、ターンをまたいで一意な id を持つ JSON として、デルタでストリーミングされます。引数の型がスキーマに従うので、整数は整数のままです。',
        },
        {
          title: '推論は見せることも隠すことも',
          body: '思考のオンオフはリクエストごとに選べます。オンのときは推論が専用のフィールドか thinking ブロックで流れ、回答はきれいなままです。',
        },
        {
          title: 'ツールのラウンドをまたいで残るプロンプト接頭辞',
          body: '2 ラウンド目でシステムプロンプトとツール一覧を再度プレフィルすることはありません。usage.cached_tokens と cache_read_input_tokens が再利用量を報告します。',
        },
        {
          title: 'キャンセルはキャンセル',
          body: '接続を閉じれば、プレフィル中でもデコード中でもそのリクエストは止まります。残った処理は実行されず、ほかのリクエストは続行します。',
        },
        {
          title: 'エラーにならず、劣化するコンテキスト',
          body: 'コンテキストの予算は /v1/models で報告されます。上限を超えると、キャッシュはループを失敗させるのではなく、警告を出して最も古いトークンを追い出します。',
        },
      ],
      note: 'Oh My Pi（Chat Completions 経由）と Claude Code 形式のクライアント（Messages 経由）をテスト済みでサポートしています。Qwen 3.6、Qwen 3.8、Flint で確認済みです。',
    },
    {
      id: 'quirks',
      heading: 'モデルの*癖*は、エージェントではなく私たちが引き受ける。',
      intro:
        'モデルファミリーごとにテンプレート、トークン、習性が違います。Butter はそれをサーバー側で吸収します。',
      items: [
        {
          title: 'チャットテンプレートとトークン',
          body: 'Nanbeige のテンプレートは空白をそのまま保ち、Qwen GGUF の制御トークンは分割されず、数字はチェックポイントどおりの境界でトークン化されます。プロンプトは公式トークナイザーと一致し、ツール呼び出しは正しく解析されます。Gemma と InternLM はターンの終わりで止まり、だらだら続けません。',
        },
        {
          title: '推論の制御',
          body: '思考ブロックは回答から切り離され、接頭辞キャッシュが生き残るようツールのラウンドをまたいで保持されます。Flint の推論にはトークン予算と移行メッセージを設定できます。',
        },
        {
          title: 'ツール呼び出し',
          body: 'Qwen の XML ツール呼び出しは、応答でも再生された履歴でも型付き JSON になります。ツールを宣言していない応答が呼び出しに変わることはなく、未対応の tool_choice は黙って無視されず、最初に拒否されます。',
        },
        {
          title: '音声フロントエンド',
          body: 'Whisper 系モデルは学習時と同じ Slaney メルフィルタバンクを使い、Qwen3-ASR の言語ヘッダーは書き起こしから取り除かれ、Kokoro のチェックポイントは StyleTTS2 ではなく Kokoro にルーティングされます。',
        },
        {
          title: 'ローダーとメモリ',
          body: '埋め込み共有の GGUF は出力ヘッドなしで読み込め、SentencePiece しかないリポジトリもトークン化でき、ストリーミングのテキストは空白を保ち、キャッシュを超えた Qwen の会話は拒否されずに復帰します。',
        },
      ],
    },
  ],
  specs: {
    heading: '技術的な*詳細*',
    intro: '細部まで読みたい人のための、詳細です。',
    rows: [
      {
        term: 'ランタイム',
        detail:
          'Apple シリコンでは Metal 上の Swift（macOS 14 以降）、CUDA などでは Rust。Python は不要。',
      },
      {
        term: 'モデル形式',
        detail: 'Hugging Face から変換なしで直接読み込み。',
        chips: [
          { label: 'safetensors' },
          { label: 'MLX' },
          { label: 'JANG' },
          { label: 'GGUF' },
        ],
      },
      {
        term: '量子化',
        detail:
          '2、3、4、5、6、8 ビットのアフィン量子化チェックポイント。ビット幅はテンソルごとに導出。MXFP4 と NVFP4 のブロックスケール付きチェックポイント。CUDA ではブロック FP8。',
      },
      {
        term: 'アーキテクチャ',
        detail:
          '密なモデル、ハイブリッド（注意機構と再帰の混合）モデル、Mixture of Experts（MoE）モデル。',
      },
      {
        term: 'KV キャッシュ',
        detail:
          '量子化：4 ビットまたは 8 ビットのアフィン量子化、または AURA 圧縮。すべてのキャッシュはコンテキスト上限のリング。',
      },
      {
        term: 'サービング API',
        detail:
          'OpenAI の Chat Completions と Completions、Anthropic Messages、トークン化とトークン数カウントのルート、ヘルス、レディネス、Prometheus メトリクス。butter serve で起動し、--parallel で同時セッション数を指定。',
        chips: [
          { label: 'ストリーミング' },
          { label: 'ツール呼び出し' },
          { label: '推論フィールド' },
          { label: '接頭辞の再利用' },
          { label: 'ビジョン入力' },
          { label: '投機的デコーディング' },
          { label: 'LoRA' },
        ],
      },
      {
        term: 'エージェントハーネス',
        detail:
          'テスト済み・サポート対象: Chat Completions 経由の Oh My Pi、Messages 経由の Claude Code 形式のクライアント。',
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
        term: '提供状況',
        detail: '早期アクセス期間中は非公開で、クローズドソース。',
      },
    ],
  },
  platforms: {
    heading: '*動作*する環境',
    intro:
      'Metal が第一の対象です。CUDA は第二で、ROCm と Vulkan を通じた AMD 対応は急速に進んでいます。',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Apple シリコン向けの Metal 上の Swift、macOS 14 以降。MacBook、Mac mini、Mac Studio。',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'CUDA 上の Rust。RTX と DGX Spark では本番稼働中です。',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: 'ROCm と Vulkan を通じた AMD 対応。急速に進んでいます。',
      },
    ],
  },
  stack: {
    heading: '*スタック*のほかの部分とも連携する。',
    intro:
      'Butter は、Iron がコンパイルしたカーネルの上でモデルを動かします。Syrup は vLLM、SGLang、llama.cpp と並べて Butter を見守ることができ、Whisk は、取り組んでいたことを AI に覚えさせます。',
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
        'Apple シリコン向けの Metal 上の Swift が第一の対象で、macOS 14 以降の MacBook から Mac Studio まで対応します。CUDA は第二の対象で、RTX と DGX Spark では本番稼働中です。ROCm と Vulkan を通じた AMD 対応は急速に進んでいます。',
    },
    {
      question: 'どのモデルが動きますか？',
      answer:
        '現時点では、Llama、Gemma、Qwen、GPT-OSS、Mistral、Nemotron、Granite、Phi のほか、上に挙げたモデルに対応しています。テキスト、ビジョン、音声、オムニの各バリエーションがあります。',
    },
    {
      question: 'Python は必要ですか？',
      answer:
        '必要ありません。Butter は、Apple シリコンでは Metal 上の Swift、CUDA などでは Rust で書かれており、サービングの経路に Python は一切ありません。',
    },
    {
      question: 'いま使っているツールやエージェントハーネスは使えますか？',
      answer:
        'Butter は 1 つの butter serve プロセスで OpenAI の Chat Completions API と Anthropic の Messages API を提供し、ストリーミング、構造化されたツール呼び出し、推論フィールド、再利用されるプロンプト接頭辞に対応します。どちらかの API を話すクライアントなら向けられます。',
    },
    {
      question: 'どのくらい速いですか？',
      answer:
        '128 GB の M5 Max で、Butter は 4-bit の Qwen3.8-27B を単一リクエストで毎秒 103 トークン（約 937 トークンのプロンプト、グリーディ）、同時 8 リクエストの合計で毎秒 146 トークン（1 リクエストあたり約 26）で提供しました。結果はモデル、プロンプトの長さ、ハードウェアによって変わります。試験条件は、このページの測定結果と一緒に記載しています。',
    },
  ],
  cta: {
    title: '*レイテンシ*を、溶かして消す。',
    body: 'Butter は現時点で早期アクセスで、クローズドソースです。アクセスをお申し込みください。',
    docsLabel: 'ドキュメントを読む',
  },
};

export default butterJa;
