import type { butter } from './butter';

const butterJa: (typeof butter)['en'] = {
  layer: 'サービング',
  tagline: 'あなたのモデルを、あなたのハードウェアで。',
  summary:
    'Apple シリコンでは Metal 上の Swift、CUDA などでは Rust。2〜8 ビットの量子化チェックポイント、ハイブリッドモデルや MoE モデルを読み込み、OpenAI 互換と Anthropic Messages の API で提供します。',
  seo: {
    title: 'Butter：自分のモデルを自分のハードウェアで動かし、切り替える',
    description:
      'すでにお持ちのハードウェアで動くプライベートな LLM サーバー。オープンなモデルを Hugging Face から直接読み込み、リクエストに応じて提供モデルを切り替え、OpenAI 互換と Anthropic Messages の API で提供します。macOS と iOS では Swift、それ以外では Rust。',
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
    title: '選んだモデルを、*そのまま*動かす。',
    lede: 'Butter は、すでにお持ちの Mac や GPU ワークステーションをプライベートな AI サーバーに変えます。自分のモデルを持ち込み、プロンプトはすべて社内に留め、トークン課金もありません。仕事が変わったらモデルを切り替えられます。モデルは Hugging Face から直接読み込み、ツールは普段使っている OpenAI と Anthropic の API でつながります。',
    highlights: [
      { value: '4', label: '変換なしで読み込めるチェックポイント形式' },
      {
        value: 'オープンモデル',
        label: 'テキスト、ビジョン、音声、オムニ',
      },
      { value: 'モデル切替', label: 'リクエストに応じて。会話は続きから' },
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
      'チェックポイントの読み込みから、トークンのストリーミングまで。依存関係は最小限です。',
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
      id: 'modalities',
      heading: 'テキスト、ビジョン、*音声*。',
      items: [
        {
          title: 'テキスト',
          body: '密モデル、ハイブリッドモデル、混合エキスパートモデル。Llama、Gemma、Qwen、GPT-OSS など。',
        },
        {
          title: 'マルチモーダル',
          body: 'ビジョン言語モデルとオムニモデル。Gemma 4、Qwen3.8 VL、Mistral 3 VL など。',
        },
        {
          title: '音声',
          body: '音声認識は Whisper、Voxtral、Qwen3-ASR。音声合成は Kokoro、FishSpeech、Marvis。',
        },
      ],
    },
    {
      id: 'swap',
      heading: '場所を失わずに、モデルを*切り替える*。',
      intro:
        '1 つの butter serve プロセスが、リクエストごとに提供するモデルを切り替えられます。仕事ごとに合ったモデルが応答します。',
      items: [
        {
          title: 'リクエストに応じて切り替え',
          body: 'butter serve を --model-swap 付きで起動すると、リクエストで別のモデルを指定できます。--model-swap-allow で許可するモデルを指定します。既定では起動時のモデルだけが許可されるので、指定しない限り切り替わりません。',
        },
        {
          title: '会話はそのまま続く',
          body: '会話は切り替えをまたいで持ち越せ、履歴を読み直さずに再開できます。受け入れテストでは、プレフィルの繰り返しはゼロで、続きの出力は中断のない会話と同一でした。',
        },
        {
          title: '不正な切り替え先は拒否またはロールバック',
          body: '形式が不正な切り替え先は、元のモデルにロールバックされます。壊れたアーカイブはそのまま保存され、クォータを超える切り替えは拒否されます。',
        },
        {
          title: '最近のモデルはウォームのまま',
          body: '最近使ったモデルのうち限られた数は、メモリ上でウォームのまま保たれるので、そのモデルに戻るのは手早く済みます。ウォームでないモデルはディスクから読み込まれ、相応の時間がかかります。時間の数値は示しません。',
        },
      ],
    },
    {
      id: 'tools',
      heading: '返ってくるときには*有効*なツール呼び出し。',
      intro:
        'エージェントを作る方へ。ツール呼び出しの結果は、そのままループで実行できる形で返ります。',
      items: [
        {
          title: '型はスキーマに従う',
          body: '引数の型はスキーマに従うので、整数は整数のままです。',
        },
        {
          title: '不完全な呼び出しは拒否',
          body: '不完全な呼び出しや、宣言していないツールへの呼び出しは、出力されずに拒否されます。',
        },
        {
          title: '受け付ける前に検証',
          body: 'リクエストを受け付ける前にツールのスキーマを検証し、未対応の tool_choice は最初の段階で拒否します。',
        },
        {
          title: 'ストリーミングで、ID は安定',
          body: '呼び出しは差分としてストリーミングされ、ID はターンをまたいでも一意のままです。',
        },
      ],
    },
    {
      id: 'validation',
      heading: '*InferenceX* ハーネスで検証済み。',
      intro:
        'InferenceX は SemiAnalysis が公開しているオープンなベンチマークハーネスです。そのチェックを自社のハードウェアで Butter に対して実行しているので、試す前に何が通るかを確認できます。',
      links: [
        {
          label: 'InferenceX',
          href: 'https://github.com/SemiAnalysisAI/InferenceX',
        },
        {
          label: 'AgentX',
          href: 'https://inferencex.semianalysis.com/agentx/quickstart/',
        },
      ],
      items: [
        {
          title: 'API チェックはすべて合格',
          body: 'ハーネスに対して実行している API とストリーミングのチェックは、2 つの Butter ビルドのどちらでもすべて合格しています。Apple シリコン向けの Swift と、NVIDIA、AMD などに向けた Rust です。',
        },
        {
          title: 'GSM8K で約 97%',
          body: 'GSM8K の全問題で、DGX Spark 上の Qwen3.8-27B と Strix Halo 上の Qwen3.8-Flash-Next はそれぞれ約 97% を記録し、下限の 90% を上回りました。すべての回答は独立に採点し直しています。',
        },
        {
          title: 'AgentX の実行が問題なく完了',
          body: '短い AgentX の実行は、失敗したリクエストなしで終わり、公式バリデーターに合格しました。小規模な試行であり、完全なリプレイではありません。実行の過程で実際のバグも見つかり、修正しました。',
        },
      ],
      note: 'これらは自社のハードウェアでの内部実行で、DGX Spark も Strix Halo も InferenceX の公式ターゲットではありません。InferenceX の公式結果ではなく、SemiAnalysis による承認も受けていません。エンタープライズ向けハードウェアでの性能は、まだ検証していません。',
    },
    {
      id: 'memory',
      heading: '*TurboQuant+* をネイティブで、作者自身の手で。',
      intro:
        'TurboQuant+ は、AI のメモリキャッシュを小さくするための、私たちのオープンソースの取り組みです。Butter はこれをネイティブに実行します。同じ人物が書き、投機的デコーディング、セッションの再利用、ツールループも扱うサーバー向けに作り替えました。エンジン側のバージョンを AURA と呼んでいます。',
      links: [
        {
          label: 'TurboQuant+',
          href: 'https://github.com/TheTom/turboquant_plus',
        },
      ],
      items: [
        {
          title: '新しい行は正確なまま',
          body: '圧縮されるのは古い履歴だけです。巻き戻し、停止位置での切り詰め、投機的検証が、非可逆なデータに触れることはありません。',
        },
        {
          title: '後付けではなく、キャッシュの一部',
          body: '圧縮は Butter 自身の KV キャッシュのモードなので、セッションの再利用、スナップショット、長いマルチターンの会話も引き続き動作します。',
        },
        {
          title: 'ビット幅を選べる',
          body: '品質のため既定は 8 ビットで、4 ビットや、キーと値で別々のビット幅も使えます。',
        },
      ],
      note: '現時点ではオプトインです。圧縮は少しの品質とメモリを引き換えにするもので、そのトレードオフを私たちは計測しています。',
    },
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
    rows: [
      {
        term: 'ランタイム',
        detail:
          'macOS と iOS では Metal 上の Swift（macOS は 14 以降）、CUDA などそれ以外では Rust。依存関係は最小限で、サプライチェーンのリスクを抑えます。',
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
        term: '提供状況',
        detail: '早期アクセス期間中は非公開で、クローズドソース。',
      },
    ],
  },
  platforms: {
    heading: '*動作*する環境',
    intro:
      'Metal が第一の対象です。CUDA はチューニングを進めているところで、ROCm と Vulkan を通じた AMD 対応は急速に進んでいます。',
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
        'Apple シリコン向けの Metal 上の Swift が第一の対象で、macOS 14 以降の MacBook から Mac Studio まで対応します。CUDA は RTX と DGX Spark では本番稼働中で、チューニングを進めています。ROCm と Vulkan を通じた AMD 対応は急速に進んでいます。',
    },
    {
      question: 'どのモデルが動きますか？',
      answer:
        '多くのオープンなモデルファミリーに、テキスト、ビジョン、音声、オムニの各種で対応しています。現在対応しているものと近日対応予定のものは、このページ上部のモデル一覧で確認できます。',
    },
    {
      question: 'Butter は何で書かれていますか？',
      answer:
        'macOS と iOS では Swift、それ以外ではすべて Rust で、メモリ安全性を確保しています。Butter は依存関係を最小限に抑えているので、サプライチェーン攻撃の入り込む余地が少なく、バックエンドごとにチューニングしたカーネルの上で動きます。',
    },
    {
      question: 'いま使っているツールやエージェントハーネスは使えますか？',
      answer:
        'Butter は 1 つの butter serve プロセスで OpenAI の Chat Completions API と Anthropic の Messages API を提供し、ストリーミング、構造化されたツール呼び出し、推論フィールド、再利用されるプロンプト接頭辞に対応します。どちらかの API を話すクライアントなら向けられます。',
    },
    {
      question: 'モデルを切り替えられますか？',
      answer:
        'はい。butter serve を --model-swap 付きで起動すると、リクエストで提供モデルを変えられます。--model-swap-allow で許可するモデルを指定し、既定では起動時のモデルだけが許可されます。会話は切り替えをまたいで持ち越せ、履歴を読み直さずに再開できます。不正な切り替え先は、安全に拒否またはロールバックされます。最近使ったモデルのうち限られた数は、メモリ上でウォームのまま保たれるので、そのモデルに戻るのは手早く済みます。ウォームでないモデルはディスクから読み込まれ、相応の時間がかかります。時間の数値は示しません。',
    },
  ],
  cta: {
    title: 'あなたの*モデル*を持ち込もう。',
    body: 'Butter は現時点で早期アクセスで、クローズドソースです。アクセスをお申し込みください。',
    docsLabel: 'ドキュメントを読む',
  },
};

export default butterJa;
