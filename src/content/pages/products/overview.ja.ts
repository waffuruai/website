import type { productsOverview } from './overview';

const productsOverviewJa: (typeof productsOverview)['en'] = {
  seo: {
    title: 'Waffuru スタック：カーネルからエージェントまで',
    description:
      'Iron がカーネルをコンパイル、Butter がモデルを実行、Syrup が GPU を制御、Whisk が記憶とコンテキストを加え、Waffle がエージェントを動かす。1 つだけでも、5 つ全部でも使えます。',
    keywords: [
      'AI 推論スタック',
      'GPU カーネルからサービングまで',
      '所有またはレンタルのハードウェアで動く AI インフラ',
    ],
  },
  hero: {
    label: '5 つの製品',
    title: 'Waffuru *スタック*',
    lede: 'Iron がカーネルをコンパイルし、Butter がその上でモデルを動かします。Syrup が GPU を制御し、Whisk が記憶とコンテキストを加えます。Waffle は W を中に備え、あなたのエージェントを動かします。5 つとも、所有またはレンタルのハードウェアで動きます。',
  },
  layers: {
    heading: '5 つのレイヤーの*かみ合い方*',
    intro:
      'ハードウェアに近いほうから順に、番号を振っています。いちばん上が Waffle、ハードウェアに接するのが Iron で、各レイヤーに専用のページがあります。',
    metal: {
      label: 'ハードウェア層',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: 'スタックの 5 つのレイヤー',
  },
  together: {
    heading: '1 つでも、*5 つすべて*でも。',
    intro:
      '今日の課題を解くレイヤーから始めて、必要になったら次を足してください。',
    aloneLabel: '単体で',
    alone: {
      iron: 'GPU カーネルを一度書けば、Metal、CUDA、ROCm、Vulkan で動かせます。',
      butter: 'OpenAI 互換 API でモデルを提供できます。依存関係は最小限です。',
      syrup:
        'どのエンジンであっても、すべての GPU と、その上で動くすべてのエンジンを見渡せます。',
      whisk:
        'ノートとコードについての、ローカルで出典付きの記憶を、あなたの AI に持たせられます。',
      waffle:
        'ひとつのハーネスでエージェントを動かせます。中にはあなたのアシスタント W がいます。',
    },
    allLabel: '組み合わせて',
    all: 'Butter は Iron がコンパイルしたカーネルの上でモデルを動かし、Syrup はその下で動く GPU とエンジンを制御し、Whisk は記憶とコンテキストを加え、Waffle はいちばん上でエージェントを動かします。足したレイヤーは、その下のレイヤーの上に積み重なります。',
  },
  audience: {
    heading: '*誰*のためのものか',
    intro: '自分に当てはまるページを選んでください。',
    items: {
      smallBusiness:
        'すでにお持ちの Mac やワークステーションで、プライベート AI を動かします。',
      enterprise:
        'オンプレミスでも自社クラウドでも、自ら管理できる推論を動かします。',
      neoclouds:
        'フリート内のすべての GPU と、その上で動くすべてのエンジンを見渡せます。',
      aiCompanies:
        'カーネルを一度書けば、Metal、CUDA、ROCm、Vulkan にまたがってモデルを提供できます。',
    },
  },
  cta: {
    title: '必要な*レイヤー*から始める。',
    body: 'スタック全体が、現時点では早期アクセスでクローズドソースです。お申し込みの際に、最初に使いたいレイヤーを教えてください。',
  },
};

export default productsOverviewJa;
