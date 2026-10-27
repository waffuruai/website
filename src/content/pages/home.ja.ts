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
