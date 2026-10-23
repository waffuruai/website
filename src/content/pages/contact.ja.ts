import type { contact } from './contact';

const contactJa: (typeof contact)['en'] = {
  seo: {
    title: 'お問い合わせ',
    description:
      '営業、提携、報道、サポート、セキュリティ報告、採用のご連絡や、早期アクセスのお申し込みはこちら。',
    keywords: [
      'Waffuru お問い合わせ',
      'AI インフラ 導入相談',
      '提携',
      'Waffuru 広報',
      'Waffuru 早期アクセス',
    ],
  },
  hero: {
    label: 'お問い合わせ',
    title: '何を*つくって*いるか、聞かせてください。',
    lede: '営業、提携、報道、サポート、セキュリティ、採用。どのご連絡も hello@waffuru.ai に届きます。内容に合うものをお選びください。',
  },
  callouts: {
    title: 'ご用件の*入口*を選ぶ',
    intro:
      'フォームの入力は不要です。各ボタンで、件名が入力済みのメールが開きます。',
    emailLabel: 'メールを送る',
    items: [
      {
        subject: 'Sales',
        title: '営業',
        body: 'お手元のハードウェアやそのフリートでモデルを動かすなら、ワークロードと動かす場所を教えてください。',
      },
      {
        subject: 'Partnerships',
        title: '提携',
        body: 'ハードウェアメーカー、ネオクラウド、モデル開発チームの皆さん。一緒につくりたいものを聞かせてください。',
      },
      {
        subject: 'Press',
        title: '報道・取材',
        body: 'ローカル AI や GPU ソフトウェア、あるいはそれをつくる人たちについて書かれるなら、喜んでお話しします。',
      },
      {
        subject: 'Support',
        title: 'サポート',
        body: 'うまく動かない、あるいは不明な点があるときは、お使いのハードウェア、実行した内容、起きたことを送ってください。',
      },
      {
        subject: 'Security',
        title: 'セキュリティ',
        body: '脆弱性を見つけたら、まずは非公開でお知らせください。公開の前に、修正のための時間をいただけると助かります。',
      },
      {
        subject: 'Hiring',
        title: '採用',
        body: 'スタックづくりに加わりたい方は、これまでにリリースしたものと、取り組みたいことを教えてください。',
      },
    ],
  },
  earlyAccess: {
    title: '*いち早く*使いたい方へ',
    body: '製品は、非公開の早期アクセス段階にあります。動かしたいものと、そのハードウェアを教えてください。合うものができ次第、ご連絡します。',
  },
};

export default contactJa;
