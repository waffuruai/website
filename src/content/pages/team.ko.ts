import type { teamPage } from './team';

const teamPageKo: (typeof teamPage)['en'] = {
  seo: {
    title: '창업자와 팀 소개',
    description:
      'Waffuru를 만드는 사람들: 연구, 보안, 매출, 그리고 이미 제품을 출시해 본 창업자들.',
    keywords: ['Waffuru 팀', 'Waffuru 창업자'],
  },
  hero: {
    label: '팀',
    title: '*주방*에 있는 사람들.',
    lede: '연구, 보안, 매출, 그리고 이미 제품을 출시해 본 창업자들.',
  },
  portraitAlt: '{name}의 사진',
  linkAria: '{network}의 {name}',
  linkNames: {
    linkedin: 'LinkedIn',
    website: '웹사이트',
    x: 'X',
    github: 'GitHub',
  },
  cta: {
    title: '무엇을 *요리*하고 있는지 보세요.',
    body: '제품은 당분간 비공개입니다. 얼리 액세스를 신청해 써 보시거나, 필요한 것을 알려 주세요.',
  },
};

export default teamPageKo;
