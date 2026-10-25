import type { teamPage } from './team';

const teamPageZh: (typeof teamPage)['en'] = {
  seo: {
    title: '创始人与团队',
    description:
      '认识打造 Waffuru 的人：研究、安全、营收，以及几位做过产品的创始人。',
    keywords: ['Waffuru 团队', 'Waffuru 创始人'],
  },
  hero: {
    label: '团队',
    title: '谁在*厨房*里。',
    lede: '研究、安全、营收，还有几位曾把产品做出来的创始人。',
  },
  portraitAlt: '{name} 的肖像',
  linkAria: '{name} 的 {network} 主页',
  linkNames: {
    linkedin: 'LinkedIn',
    website: '个人网站',
    x: 'X',
    github: 'GitHub',
  },
  cta: {
    title: '看看我们在*烹制*什么。',
    body: '我们的产品暂未公开。申请抢先体验，亲自试用，或者告诉我们你需要什么。',
  },
};

export default teamPageZh;
