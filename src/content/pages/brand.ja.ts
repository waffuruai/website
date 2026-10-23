import { mailto } from '@/content/site';
import type { brand } from './brand';

const brandJa: (typeof brand)['en'] = {
  seo: {
    title: 'ブランド・プレスキット',
    description:
      'Waffuru のワッフルのマークをダウンロード。ワードマーク、カラー、書体、モチーフと、使い方のルール。広報窓口も掲載。',
    keywords: ['Waffuru ロゴ', 'ブランド素材', 'プレスキット'],
  },
  hero: {
    label: 'ブランド',
    title: 'ブランドを、*すぐ*使える形で。',
    lede: 'ワッフルのマーク、ワードマーク、カラー、書体、モチーフ、そして使い方の簡単なルール。Waffuru について書くなら、まずここから。',
    actions: [
      { label: 'マークをダウンロード', href: '#mark' },
      { label: '広報窓口', href: mailto('Press'), variant: 'outline' },
    ],
  },
  mark: {
    title: 'ワッフルの*マーク*',
    intro:
      'バターをひとかけのせ、シロップが側面を伝い落ちるワッフル。背景は透過なので、ダークの背景にもライトの背景にもなじみます。',
    darkLabel: 'ダーク背景',
    lightLabel: 'ライト背景',
    alt: 'Waffuru のワッフルのマーク。バターをのせ、シロップが伝い落ちるワッフル。',
    downloadsLabel: 'ダウンロード',
    downloadAction: 'ダウンロード',
    downloads: [
      {
        label: 'オリジナル',
        detail: 'PNG · 384 × 384 · 透過',
        href: '/brand/waffuru-waffle.png',
        filename: 'waffuru-waffle.png',
      },
      {
        label: 'Web 用（大）',
        detail: 'PNG · 384 × 384 · 最適化済み',
        href: '/img/brand/waffle-384.png',
        filename: 'waffuru-waffle-384.png',
      },
      {
        label: 'Web 用（小）',
        detail: 'PNG · 160 × 160 · 最適化済み',
        href: '/img/brand/waffle-160.png',
        filename: 'waffuru-waffle-160.png',
      },
    ],
  },
  wordmark: {
    title: '*ワードマーク*',
    intro:
      'マークと、小文字のセリフ体で組んだ「waffuru」、そしてその隣に添えた、waffle を表すカタカナの ワッフル で構成します。',
    darkLabel: 'ダーク背景',
    lightLabel: 'ライト背景',
    namingLabel: '表記',
    rules: [
      {
        term: 'Waffuru',
        body: '本文と見出しでは、W を大文字にして書きます。小文字の「waffuru」はワードマーク専用です。',
      },
      {
        term: 'Iron, Butter, Waffle, Syrup',
        body: '4 つの製品名は、どの言語でも必ず頭文字を大文字にし、翻訳しません。',
      },
      {
        term: 'ワッフル',
        body: 'waffle を表すカタカナ。名前の由来への目配せとしてワードマークの隣に置くもので、本文中で Waffuru の代わりには使いません。',
      },
      {
        term: 'ワッフルのマーク',
        body: 'この絵柄は「ワッフルのマーク」と呼びます。大文字の W で始まる Waffle は、GPU コントロールプレーン製品の名前です。',
      },
    ],
    origin:
      'Waffuru は、日本語の「ワッフル」のローマ字表記です。漫画への愛、共通のワッフル好き、そして世界に向けたミッションへの、ささやかな目配せでもあります。',
  },
  colour: {
    title: 'カラー*パレット*',
    intro:
      'デフォルトは深煎りのダーク。クリーム色の文字に、アクセントはゴールドがひとつだけ。ライトテーマでは背景を入れ替え、ゴールドを文字に使う場面では濃くします。16 進カラーコードはどれもコピーできます。',
    darkLabel: 'ダーク（デフォルト）',
    lightLabel: 'ライト',
    dark: [
      {
        name: 'ロースト',
        token: '--roast',
        hex: '#0a0908',
        role: 'ページの背景。',
      },
      {
        name: 'ロースト・レイズド',
        token: '--roast-raised',
        hex: '#12100e',
        role: 'カードなど、一段高い面。',
      },
      {
        name: 'クリーム',
        token: '--cream',
        hex: '#ede8df',
        role: 'テキストとプライマリボタン。',
      },
      {
        name: 'ゴールド',
        token: '--gold',
        hex: '#e8a33d',
        role: 'アクセント。塗り、ドット、イタリックの語。',
      },
      {
        name: 'ソフト',
        token: '--soft',
        hex: '#d2ccc1',
        role: '補助的な本文。',
      },
      {
        name: 'ミュート',
        token: '--muted-foreground',
        hex: '#aba599',
        role: 'キャプションと注記。',
      },
      {
        name: 'フェイント',
        token: '--faint',
        hex: '#8a847a',
        role: '装飾専用。文字には使いません。',
      },
      {
        name: 'オフ',
        token: '--off',
        hex: '#2a2622',
        role: '消灯した LED、スタンプ、バー。',
      },
    ],
    light: [
      {
        name: '背景',
        token: '--background',
        hex: '#f4efe6',
        role: 'ページの背景。',
      },
      {
        name: 'カード',
        token: '--card',
        hex: '#fbf8f2',
        role: 'カードなど、一段高い面。',
      },
      {
        name: 'インク',
        token: '--foreground',
        hex: '#0a0908',
        role: 'テキストとプライマリボタン。',
      },
      {
        name: 'ゴールド',
        token: '--brand',
        hex: '#e8a33d',
        role: '塗りとドット。ダークと同じ値です。',
      },
      {
        name: 'ブランドインク',
        token: '--brand-ink',
        hex: '#8a5514',
        role: '文字に使うゴールド。ライト背景でも読めるよう濃くしています。',
      },
      {
        name: 'ソフト',
        token: '--soft',
        hex: '#3b362f',
        role: '補助的な本文。',
      },
      {
        name: 'ミュート',
        token: '--muted-foreground',
        hex: '#5c554b',
        role: 'キャプションと注記。',
      },
      {
        name: 'オフ',
        token: '--off',
        hex: '#ddd5c8',
        role: '消灯した LED、スタンプ、バー。',
      },
    ],
  },
  type: {
    title: '3 つの*書体*',
    intro:
      '見出しは Instrument Serif、本文は Geist、細部のラベルは Geist Mono。中国語、日本語、韓国語のページでは、各プラットフォームの標準フォントを使います。',
    faces: [
      {
        key: 'serif',
        name: 'Instrument Serif',
        role: 'ディスプレイ',
        use: '見出し、ワードマーク、イタリックのアクセント語。',
        sample: '純粋な数学を、シリコンに*焼き込む*。',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub の Instrument Serif',
          href: 'https://github.com/Instrument/instrument-serif',
        },
      },
      {
        key: 'sans',
        name: 'Geist',
        role: '本文',
        use: '本文、ボタン、インターフェース。',
        sample:
          'お手元のハードウェアのための GPU カーネル、推論、フリート管理、記憶。',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub の Geist',
          href: 'https://github.com/vercel/geist-font',
        },
      },
      {
        key: 'mono',
        name: 'Geist Mono',
        role: 'ラベル',
        use: '大文字ラベル、インデックス、コード。',
        sample: '01 · カーネル   02 · サービング   03 · コントロールプレーン',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub の Geist Mono',
          href: 'https://github.com/vercel/geist-font',
        },
      },
    ],
    licence:
      '3 つの書体はすべて、SIL Open Font License のもとで自由に使えます。',
    licenceLink: {
      label: 'SIL Open Font License を読む',
      href: 'https://openfontlicense.org',
    },
  },
  motifs: {
    title: '動く*モチーフ*',
    intro:
      'すべて CSS だけで描いた、製品由来のモチーフ。光るタイル、スタンプ、溶けていくバター、ステータスライト、そしてシロップのしずく。閲覧する人の端末が「動きを減らす」設定になっている場合は、動きを止めます。',
    items: [
      {
        key: 'tiles',
        name: 'ワッフルのタイル',
        description:
          'タイルを敷き詰めたグリッド。いくつかがゴールドに光ります。',
      },
      {
        key: 'stamps',
        name: 'スタンプ',
        description: '1 マスずつ押されていくグリッド。Iron のモチーフ。',
      },
      {
        key: 'pat',
        name: 'バターのひとかけ',
        description: '溶けては元に戻るひとかけ。Butter のモチーフ。',
      },
      {
        key: 'leds',
        name: 'LED',
        description: 'ラックに並ぶステータスライト。Waffle のモチーフ。',
      },
      {
        key: 'drip',
        name: 'しずく',
        description: '線を伝って落ちるしずく。Syrup のモチーフ。',
      },
    ],
  },
  usage: {
    title: 'ブランドの*ルール*',
    intro: '短く、ほとんどは常識の範囲です。',
    doLabel: 'すること',
    dontLabel: 'しないこと',
    dos: [
      'Waffuru は W を大文字で書く。小文字の「waffuru」はワードマークにだけ使う。',
      'Iron、Butter、Waffle、Syrup は、どの言語でも表記のとおりに書く。',
      'ワッフルのマークには余白を取り、十分なコントラストのあるダークまたはライトの背景に置く。',
      '製品は実際のとおりに説明する。現時点では非公開で、早期アクセスは申し込み制。',
      'ハードウェア対応も実際のとおりに説明する。Metal が第一、CUDA が第二、ROCm と Vulkan は動作するがチューニングはこれから。',
    ],
    donts: [
      'マークの色を変えたり、輪郭線を付けたり、回転、トリミング、エフェクトの追加をしない。',
      'ワードマークを描き直したり、別の書体で組み直したりしない。',
      '製品名を翻訳したり、短縮したりしない。',
      '公開していない性能の数値を引用しない。',
      '存在しない提携、推奨、顧客関係をほのめかさない。先に私たちに確認してください。',
    ],
  },
  press: {
    title: '私たちを*紹介*してくださる方へ',
    body: '取り組んでいる内容と、公開の時期をお知らせください。事実関係の確認、素材の提供、お話しする日時のご案内をお送りします。',
    cta: '広報に連絡',
  },
};

export default brandJa;
