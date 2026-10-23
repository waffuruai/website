import type { teamPage } from './team';

const teamPageJa: (typeof teamPage)['en'] = {
  seo: {
    title: '創業者とチームの紹介',
    description:
      'Waffuru をつくる人たち。リサーチ、セキュリティ、収益、そして製品を世に送り出した経験のある創業者が数人。',
    keywords: ['Waffuru チーム', 'Waffuru 創業者'],
  },
  hero: {
    label: 'チーム',
    title: '*キッチン*に立つ人たち',
    lede: 'リサーチ、セキュリティ、収益、そして製品を世に送り出した経験のある創業者が数人。',
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
