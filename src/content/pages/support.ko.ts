import { mailto, site } from '@/content/site';
import type { support } from './support';

const supportKo: (typeof support)['en'] = {
  seo: {
    title: '지원',
    description:
      '지금 이용할 수 있는 것, 얼리 액세스 방식, 지원 하드웨어, 문서 위치, 버그와 보안 이슈를 신고하는 방법.',
    keywords: [
      'Waffuru 지원',
      'Waffuru 문서',
      'Waffuru 얼리 액세스',
      '보안 이슈 신고',
      '로컬 AI 하드웨어 지원',
    ],
  },
  hero: {
    label: '지원',
    title: '답변, 그리고 필요할 땐 *사람*.',
    lede: '지금 이용할 수 있는 것, 얼리 액세스 방식, 문제가 생겼을 때 찾아갈 곳.',
  },
  links: {
    title: '어디서 *시작*할까',
    items: [
      {
        title: '문서 읽기',
        body: '가이드와 레퍼런스는 docs.waffuru.ai에 있습니다.',
        href: site.urls.docs,
      },
      {
        title: '이메일 지원',
        body: '버그, 질문, 설치 문제. 어떤 하드웨어에서 무엇을 실행했는지 함께 알려 주세요.',
        href: mailto('Support'),
      },
      {
        title: '보안 이슈 신고',
        body: 'hello@waffuru.ai로 제목을 Security로 해서 비공개로 보내 주세요.',
        href: mailto('Security'),
      },
      {
        title: 'security.txt',
        body: '기계가 읽을 수 있는 형식의 보안 연락처입니다.',
        href: '/.well-known/security.txt',
        file: true,
      },
    ],
  },
  faq: [
    {
      question: '지금 무엇을 쓸 수 있나요?',
      answer:
        '우리 제품(Iron, Butter, Waffle, Syrup)은 당분간 비공개 소스이며 아직 일반에 공개되지 않았습니다. 얼리 액세스가 가장 먼저 써 볼 수 있는 방법입니다. 가이드와 레퍼런스는 docs.waffuru.ai에 있습니다.',
    },
    {
      question: '얼리 액세스는 어떻게 진행되나요?',
      answer:
        '얼리 액세스 신청서를 작성하고, 무엇을 만들고 있으며 어떤 환경에서 돌리고 싶은지 알려 주세요. 맞는 것이 준비되면 연락드립니다. 얼리 액세스는 정식 출시 전 소프트웨어이므로 바뀌거나 문제가 생길 수 있으며, 여러분의 피드백으로 나아집니다.',
    },
    {
      question: '어떤 하드웨어에서 돌아가나요?',
      answer:
        'Apple 실리콘이 주력 대상으로, 모든 커널을 Metal용으로 가장 먼저 작성하고 튜닝합니다. NVIDIA CUDA는 그다음으로 RTX와 DGX Spark에서 프로덕션으로 운영 중이며, 데이터센터 GPU는 진행 중입니다. AMD ROCm과 Vulkan은 지금도 구동되지만 아직 튜닝하지 않았습니다. MacBook과 Mac Studio, RTX 워크스테이션, DGX Spark, Strix Halo, 네오클라우드 플릿을 떠올리시면 됩니다.',
    },
    {
      question: '문서는 어디에 있나요?',
      answer:
        'docs.waffuru.ai에 있습니다. 잘못되었거나 빠진 내용이 있다면 이 페이지의 지원 링크로 알려 주세요.',
    },
    {
      question: '버그는 어떻게 신고하나요?',
      answer:
        '제목을 Support로 해서 hello@waffuru.ai로 이메일을 보내 주세요. 위의 이메일 지원 링크를 누르면 자동으로 채워집니다. 하드웨어와 OS, 실행한 내용, 기대한 결과와 실제 결과를 적어 주시고, 로그에 비공개 정보가 있다면 먼저 지워 주세요.',
    },
    {
      question: '보안 이슈는 어떻게 신고하나요?',
      answer:
        '제목을 Security로 해서 hello@waffuru.ai로 재현할 수 있을 만큼 자세히 적어 이메일을 보내 주세요. 수정할 합리적인 시간을 가질 때까지는 비공개로 유지해 주시기 바랍니다. security.txt에도 같은 연락처가 기계가 읽을 수 있는 형식으로 적혀 있습니다.',
    },
    {
      question: '내 데이터는 어떻게 되나요?',
      answer:
        '우리 소프트웨어는 로컬에서 실행되며, 데이터를 다른 곳으로 보내는 기능에 직접 동의하지 않는 한 데이터는 내 컴퓨터에 남습니다. 이 웹사이트에서는 개인정보 처리방침에 나열된 정보만 수집하며, Google Analytics는 동의하기 전까지 꺼져 있습니다.',
    },
  ],
  cta: {
    title: '여기에 없나요? *물어보세요*.',
    body: '하드웨어, OS, 실행한 내용, 일어난 일을 보내 주세요. 자세할수록 도와드리기 쉽습니다.',
    docs: '문서 읽기',
    email: '이메일 지원',
  },
};

export default supportKo;
