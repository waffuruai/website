import type { teamPage } from './team';

const teamPageKo: (typeof teamPage)['en'] = {
  seo: {
    title: '창업자와 팀 소개',
    description:
      'Waffuru를 만드는 사람들: 사이버보안, 군, 소비자, 엔터프라이즈 분야를 두루 거쳤고, 스타트업을 키워 본 경험부터 중소기업·대기업과 일한 경험까지 갖췄습니다.',
    keywords: ['Waffuru 팀', 'Waffuru 창업자'],
  },
  hero: {
    label: '팀',
    title: '*주방*에 있는 사람들.',
    lede: '사이버보안, 군, 소비자, 엔터프라이즈 분야를 두루 거쳤습니다. 스타트업을 세우고 키워 왔으며, 중소기업부터 대기업까지 폭넓게 함께 일해 왔습니다.',
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
