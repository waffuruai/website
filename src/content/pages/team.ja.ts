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
    lede: 'サイバーセキュリティ、軍事、コンシューマー、エンタープライズの各分野で経験を積んだつくり手たちです。スタートアップを立ち上げて大きく育て、中小企業から大企業まで、あらゆる規模の組織と仕事をしてきました。',
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
    body: 'Pantry は現在、無料のオープンソースとして公開中です。AI 推論スタックは非公開の早期アクセス中です。アクセスをお申し込みのうえお試しいただくか、必要なことについてご相談ください。',
  },
};

export default teamPageJa;
