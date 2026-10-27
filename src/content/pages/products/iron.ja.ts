import type { iron } from './iron';

const ironJa: (typeof iron)['en'] = {
  layer: 'カーネル',
  tagline: 'ひとつのカーネル定義から、4 つのバックエンドへ。',
  summary:
    'Rust に埋め込む DSL。カーネルは共通の IR に落とされ、そこから Metal、CUDA、HIP/ROCm、Vulkan SPIR-V へ。バージョン管理された C と Rust の ABI で、既存のホストから呼び出せます。',
  seo: {
    title: 'Iron：GPU カーネルを一度書けば 4 バックエンドへ',
    description:
      'GPU カーネルを Rust で一度書けば、Metal、CUDA、HIP/ROCm、Vulkan SPIR-V へ。C と Rust の ABI を備え、早期アクセス中。',
    keywords: [
      'Rust GPU カーネル DSL',
      'Metal カーネル',
      'CUDA カーネル',
      'ROCm HIP',
      'Vulkan SPIR-V',
      'クロスプラットフォーム GPU カーネル',
    ],
  },
  hero: {
    title: 'ひとつのカーネル定義から、*4 つ*のバックエンドへ。',
    lede: '純粋な数学を、高性能なシリコンに直接焼き込む。Iron は Rust に埋め込む DSL です。カーネルを一度書けば、共通の IR に落とされ、そこから Metal、CUDA、HIP/ROCm、Vulkan SPIR-V へ向かいます。',
    highlights: [
      {
        value: '4',
        label: '1 つのカーネル定義から展開する GPU バックエンド',
      },
      { value: '~1,139', label: 'カーネル宣言' },
      {
        value: '4,164 / 4,164',
        label: 'HIP と Vulkan のテストコーパス、ビット単位で一致',
      },
    ],
  },
  story: {
    heading: '同じカーネルを*4 回*書くのは、もうやめよう。',
    problem:
      'GPU ベンダーごとに、カーネル言語が違います。Apple、NVIDIA、AMD のハードウェアに出荷するなら、同じ計算をベンダーごとに書き、チューニングし、テストし直し、計算が変わるたびにすべてのコピーをそろえ続けることになります。',
    outcome:
      'カーネルは Rust で一度書くだけ。Iron がそれを共通の IR に落とし、さらに Metal、CUDA、HIP/ROCm、Vulkan SPIR-V へ変換するので、ひとつの定義で対象のバックエンドすべてをカバーできます。',
    outcomes: [
      'まずは手元の Mac で書き、チューニングできます。Metal が第一の対象で、同じ定義がそのまま他のバックエンドにも引き継がれます。',
      'バージョン管理された C と Rust の ABI を通じて、いま使っているコードからカーネルを呼び出せます。',
      'バックエンド同士が一致していることを期待するのではなく、ビット単位で一致するテストコーパスで確かめられます。',
    ],
  },
  capabilities: {
    heading: 'Iron が*できる*こと',
    intro:
      'ハードウェアに近いところから、カーネルを書く人のためにつくっています。',
    items: [
      {
        title: 'ひとつの定義、4 つのバックエンド',
        body: 'カーネルは共通の IR に落とされ、そこから Metal、CUDA、HIP/ROCm、Vulkan SPIR-V へ。管理するソースはひとつだけです。',
      },
      {
        title: 'Rust で記述',
        body: 'Rust に埋め込む DSL。カーネルは #[kernel] を付けた Rust の関数で、program_id、load、store といったプリミティブで組み立てます。',
      },
      {
        title: 'ホストから呼び出せる',
        body: 'バージョン管理された C と Rust の ABI により、既存のホストを書き直すことなく Iron のカーネルを呼び出せます。',
      },
      {
        title: 'テストで確かめたビット単位の一致',
        body: 'HIP と Vulkan のテストコーパスには 4,164 件のケースがあり、4,164 件すべてがビット単位で一致しています。',
      },
      {
        title: '1,000 を超えるカーネル',
        body: '現在のカーネル宣言は約 1,139 個。それぞれが、すべてのバックエンドで共有されるひとつの定義です。',
      },
      {
        title: '効くところをチューニング',
        body: 'すべてのカーネルを、まず Metal で書いてチューニングします。CUDA は第二の対象で、ROCm と Vulkan は現時点で動作しますが、チューニングはこれからです。',
      },
    ],
  },
  specs: {
    heading: '技術的な*詳細*',
    intro: '細部まで読みたい人のための、詳細です。',
    rows: [
      {
        term: '言語',
        detail:
          'Rust に埋め込む DSL。カーネルは #[kernel] を付けた Rust の関数です。',
      },
      {
        term: 'パイプライン',
        detail:
          'ひとつのカーネル定義が共通の IR に落とされ、そこから各バックエンドへ。',
      },
      {
        term: 'バックエンド',
        chips: [
          { label: 'Metal: MSL → .metallib' },
          { label: 'CUDA → PTX' },
          { label: 'HIP/ROCm: HIP → AMDGPU' },
          { label: 'Vulkan → SPIR-V' },
        ],
      },
      {
        term: 'ホスト ABI',
        detail:
          'バージョン管理された C と Rust の ABI。既存のホストから Iron のカーネルを呼び出せます。',
      },
      { term: 'カーネル数', detail: 'カーネル宣言は約 1,139 個。' },
      {
        term: 'テストコーパス',
        detail: 'HIP と Vulkan：4,164 件中 4,164 件がビット単位で一致。',
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
      'Iron は単体でも使えます。カーネルの上でモデルを動かすなら Butter を、その GPU を見守るなら Waffle を、取り組んでいたことを AI に覚えさせるなら Syrup を足してください。',
  },
  faq: [
    {
      question: 'Iron はオープンソースですか？',
      answer:
        '現時点ではオープンソースではありません。Iron は早期アクセス期間中、非公開でクローズドソースです。アクセスをお申し込みいただければ、お伝えできることが増えた時点でご連絡します。',
    },
    {
      question: 'どのハードウェアで動きますか？',
      answer:
        'Apple シリコン上の Metal が第一の対象で、すべてのカーネルをまずここで書き、チューニングします。CUDA は第二の対象で、RTX と DGX Spark では本番稼働中、データセンター GPU は対応中です。ROCm と Vulkan は現時点で動作しますが、チューニングはこれからです。',
    },
    {
      question: 'ホスト側のコードを書き直す必要はありますか？',
      answer:
        'Iron のカーネルを呼び出すだけなら、必要ありません。バージョン管理された C と Rust の ABI で、既存のホストから呼び出せます。',
    },
    {
      question: '手書きの CUDA や Metal より速いですか？',
      answer:
        'ベンチマークの数値はまだ公開していないため、速いとは申し上げません。現時点で言えるのは、ひとつの定義が 4 つのバックエンドに変換されることと、HIP と Vulkan のテストコーパスがビット単位で一致していることです。',
    },
    {
      question: 'どうすれば試せますか？',
      answer: 'このページのフォームから、早期アクセスをお申し込みください。',
    },
  ],
  cta: {
    title: 'はじめての*カーネル*を、焼き込む。',
    body: 'Iron は現時点で早期アクセスで、クローズドソースです。アクセスをお申し込みください。',
    docsLabel: 'ドキュメントを読む',
  },
};

export default ironJa;
