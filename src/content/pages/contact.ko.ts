import type { contact } from './contact';

const contactKo: (typeof contact)['en'] = {
  seo: {
    title: '연락처',
    description:
      'Waffuru에 영업, 제휴, 언론, 지원, 보안 신고, 채용 문의를 보내거나 얼리 액세스를 요청하세요.',
    keywords: [
      'Waffuru 문의',
      'AI 인프라 영업',
      '제휴',
      'Waffuru 언론',
      'Waffuru 얼리 액세스',
    ],
  },
  hero: {
    label: '연락처',
    title: '무엇을 *만들고* 계신지 들려주세요.',
    lede: '영업과 제휴 문의는 sales@waffuru.ai, 보안 신고는 security@waffuru.ai, 언론·지원·채용 문의는 hello@waffuru.ai로 연결됩니다. 주제에 맞는 항목을 골라 주세요.',
  },
  callouts: {
    title: '들어올 *문*을 고르세요.',
    intro:
      '작성할 양식은 없습니다. 각 버튼을 누르면 제목이 채워진 이메일이 열립니다.',
    emailLabel: '이메일 보내기',
    items: [
      {
        subject: 'Sales',
        title: '영업',
        body: '자체 하드웨어에서, 혹은 그 플릿 규모로 모델을 돌리고 계신가요? 워크로드와 실행 환경을 알려 주세요.',
      },
      {
        subject: 'Partnerships',
        title: '제휴',
        body: '하드웨어 제조사, 네오클라우드, 모델 팀 여러분, 함께 만들고 싶은 것을 들려주세요.',
      },
      {
        subject: 'Press',
        title: '언론',
        body: '로컬 AI, GPU 소프트웨어, 혹은 그것을 만드는 사람들에 대해 취재 중이신가요? 기꺼이 이야기 나누겠습니다.',
      },
      {
        subject: 'Support',
        title: '지원',
        body: '고장 났거나 불분명한 부분이 있나요? 하드웨어, 실행한 내용, 발생한 상황을 보내 주세요.',
      },
      {
        subject: 'Security',
        title: '보안',
        body: '취약점을 발견하셨나요? 비공개로 알려 주시고, 공개되기 전에 수정할 시간을 주세요.',
      },
      {
        subject: 'Hiring',
        title: '채용',
        body: '스택을 함께 만들고 싶으신가요? 지금까지 출시한 것과 하고 싶은 일을 알려 주세요.',
      },
    ],
  },
  earlyAccess: {
    title: '*가장 먼저* 쓰고 싶으신가요?',
    body: '제품은 비공개 얼리 액세스 중입니다. 무엇을, 어떤 하드웨어에서 돌리고 싶은지 알려 주시면, 맞는 것이 생길 때 연락드리겠습니다.',
  },
};

export default contactKo;
