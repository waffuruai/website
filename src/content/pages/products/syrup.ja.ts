import type { syrup } from './syrup';

// TODO(founder): publish a hardware and engine support matrix for Syrup and
// link it from the FAQ; until then the page says plainly that there isn't one.
const syrupJa: (typeof syrup)['en'] = {
  layer: 'コントロールプレーン',
  tagline: 'すべての GPU と、その上で動くすべてのエンジンを可視化。',
  summary:
    'GPU 上の LLM のためのコントロールプレーン。デスクの下の 1 台から、フリートを貸し出すネオクラウドまで対応します。各ホストでは小さな Rust 製サイドカーが動き、署名付きテレメトリを報告します。Butter、vLLM、SGLang、llama.cpp など、OpenAI 互換のサーバーと連携できます。',
  seo: {
    title: 'Syrup：GPU 上の LLM のコントロールプレーン',
    description:
      'すべての GPU とその上のエンジンを可視化。デスク下の 1 台からネオクラウドのフリートまで。署名付きテレメトリ。vLLM や llama.cpp にも対応。',
    keywords: [
      'GPU フリート管理',
      'LLM コントロールプレーン',
      'GPU オブザーバビリティ',
      'vLLM SGLang llama.cpp 監視',
    ],
  },
  hero: {
    title: 'すべての GPU と、その上で動く*エンジン*のすべてを見渡す。',
    lede: 'Syrup は、GPU 上の LLM のためのコントロールプレーン。デスクの下の 1 台から、フリートを貸し出すネオクラウドまで対応します。各ホストでは小さな Rust 製サイドカーが動き、署名付きテレメトリを報告します。',
    highlights: [
      { value: '1 台', label: 'デスクの下から、ネオクラウドのフリートまで' },
      {
        value: '署名付き',
        label: '各ホストの小さな Rust 製サイドカーが報告するテレメトリ',
      },
      {
        value: 'ロックインなし',
        label: 'Butter、vLLM、SGLang、llama.cpp などの OpenAI 互換サーバー',
      },
    ],
  },
  story: {
    heading: 'どの *GPU* で何が動いているかを、把握する。',
    problem:
      'GPU マシンでは、誰かが起動したエンジンがそのまま動いています。ある機械では llama.cpp、隣では vLLM、新しい機械では SGLang。何がどこで動いているのかを知るには、ホストごとにログインするしかありません。',
    outcome:
      '各ホストに、小さな Rust 製サイドカーを置きます。サイドカーが署名付きテレメトリを報告し、Syrup が、すべての GPU とその上のすべてのエンジンを見せてくれます。マシン 1 台でも、フリート全体でも同じです。',
    outcomes: [
      'デスクの下の 1 台も、貸し出しているフリートも、同じツールで見守れます。',
      'いま使っているエンジンはそのままで。Syrup は Butter、vLLM、SGLang、llama.cpp など、OpenAI 互換のサーバーと連携できます。',
      '目にするものを信頼できます。すべてのホストが、署名付きテレメトリを報告します。',
    ],
  },
  capabilities: {
    heading: 'Syrup が*できる*こと',
    intro:
      'エンジンを置き換えるのではなく、その隣に置くコントロールプレーンです。',
    items: [
      {
        title: 'すべての GPU',
        body: '各ホストの GPU を、ひとつの画面で確認できます。',
      },
      {
        title: 'すべてのエンジン',
        body: 'その上でどのエンジンが動いているかを確認できます。Butter、vLLM、SGLang、llama.cpp、あるいは他の OpenAI 互換サーバーです。',
      },
      {
        title: '小さな Rust 製サイドカー',
        body: '各ホストでは Rust で書かれた小さなサイドカーが動きます。マシンを増やすことは、サイドカーを増やすことです。',
      },
      {
        title: '署名付きテレメトリ',
        body: '各サイドカーは、報告するテレメトリに署名します。',
      },
      {
        title: '1 台からフリートまで',
        body: 'まずはデスクの下の 1 台から。同じ構成のまま、フリートを貸し出すネオクラウドまで広げられます。',
      },
      {
        title: 'ロックインなし',
        body: 'Syrup に Butter は必須ではありません。vLLM、SGLang、llama.cpp など、OpenAI 互換のサーバーでも動作します。',
      },
    ],
  },
  specs: {
    heading: '技術的な*詳細*',
    intro: '細部まで読みたい人のための、詳細です。',
    rows: [
      { term: '役割', detail: 'GPU 上の LLM のためのコントロールプレーン。' },
      {
        term: '各ホストで',
        detail: 'Rust で書かれた小さなサイドカー。',
      },
      {
        term: 'テレメトリ',
        detail: '報告するサイドカーが署名。',
      },
      {
        term: 'エンジン',
        chips: [
          { label: 'Butter' },
          { label: 'vLLM' },
          { label: 'SGLang' },
          { label: 'llama.cpp' },
          { label: 'その他の OpenAI 互換サーバー' },
        ],
      },
      {
        term: '規模',
        detail: 'デスクの下の 1 台から、ネオクラウドのフリートまで。',
      },
      {
        term: 'ロックイン',
        detail: 'なし。Syrup は Butter 以外のエンジンとも動作します。',
      },
      {
        term: '提供状況',
        detail: '早期アクセス期間中は非公開で、クローズドソース。',
      },
    ],
  },
  stack: {
    heading: '*スタック*のほかの部分とも連携する。',
    intro:
      'Syrup は、Butter があってもなくても GPU を見守ります。Butter は Iron がコンパイルしたカーネルの上でモデルを動かし、Whisk は取り組んでいたことを覚えています。',
  },
  faq: [
    {
      question: 'Syrup はオープンソースですか？',
      answer:
        '現時点ではオープンソースではありません。Syrup は早期アクセス期間中、非公開でクローズドソースです。アクセスをお申し込みいただければ、お伝えできることが増えた時点でご連絡します。',
    },
    {
      question: 'Butter を使う必要はありますか？',
      answer:
        'ありません。Syrup は Butter、vLLM、SGLang、llama.cpp など、OpenAI 互換のサーバーと連携するので、いま使っているエンジンをそのまま使えます。',
    },
    {
      question: '誰のためのものですか？',
      answer:
        'GPU 上で LLM を動かし、その様子を見たいすべての人のためのものです。デスクの下の 1 台から、フリートを貸し出すネオクラウドまで。',
    },
    {
      question: 'サイドカーは何をするのですか？',
      answer:
        '各ホストでは、Rust で書かれた小さなサイドカーが動きます。ホストの GPU と、その上で動くエンジンについて、署名付きテレメトリを報告します。',
    },
    {
      question: 'どの GPU に対応していますか？',
      answer:
        'Syrup のハードウェア対応表は、まだ公開していません。お使いの環境を教えてください。合うかどうかを率直にお答えします。',
    },
  ],
  cta: {
    title: 'あなたの*フリート*を見渡す。',
    body: 'Syrup は現時点で早期アクセスで、クローズドソースです。アクセスをお申し込みいただくか、お使いの環境を教えてください。',
  },
};

export default syrupJa;
