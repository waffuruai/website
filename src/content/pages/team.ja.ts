import type { teamPage } from './team';

const teamPageJa: (typeof teamPage)['en'] = {
  seo: {
    title: '創業者とチームの紹介',
    description:
      'Waffuru をつくる人たち。サイバーセキュリティ、軍事、コンシューマー、エンタープライズにわたる経験を持ち、スタートアップの成長から中小企業・大企業との仕事まで手がけてきました。',
    keywords: ['Waffuru チーム', 'Waffuru 創業者'],
  },
  hero: {
    label: 'チーム',
    title: '*キッチン*に立つ人たち',
    lede: 'サイバーセキュリティ、軍事、コンシューマー、エンタープライズ。スタートアップを立ち上げて大きく育て、中小企業から大企業まで、あらゆる規模の組織と仕事をしてきました。',
  },
  portraitAlt: '{name} のポートレート',
  linkAria: '{network} の {name}',
  linkNames: {
    linkedin: 'LinkedIn',
    website: 'ウェブサイト',
    x: 'X',
    github: 'GitHub',
  },
  cta: {
    title: 'いま*焼いている*ものを、のぞいてみる。',
    body: '現時点では、製品は非公開です。早期アクセスをお申し込みいただくか、必要なことについてご相談ください。',
  },
};

export default teamPageJa;
