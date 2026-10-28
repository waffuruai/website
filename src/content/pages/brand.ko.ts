import { mailto } from '@/content/site';
import type { brand } from './brand';

/*
 * Palette names (Roast, Cream, Gold, …) stay in English: they are the names of
 * the design tokens shown beside them. The three type specimens stay in English
 * too, because they show the Latin typefaces themselves.
 */
const brandKo: (typeof brand)['en'] = {
  seo: {
    title: '브랜드 및 보도 자료 키트',
    description:
      'Waffuru 와플 마크를 내려받고 워드마크, 색상, 서체, 모티프와 사용 규칙을 확인하세요. 언론 문의 안내 포함.',
    keywords: ['Waffuru 로고', '브랜드 에셋', '프레스 킷'],
  },
  hero: {
    label: '브랜드',
    title: '*바로* 쓸 수 있는 우리의 브랜드.',
    lede: '와플 마크, 워드마크, 색상, 서체, 모티프와 사용 규칙을 모았습니다. Waffuru에 대한 글을 쓰고 계신가요? 여기서 시작하세요.',
    actions: [
      { label: '마크 내려받기', href: '#mark' },
      { label: '언론 문의', href: mailto('Press'), variant: 'outline' },
    ],
  },
  mark: {
    title: '*마크*.',
    intro:
      '버터 한 조각이 올라가고 시럽이 옆으로 흘러내리는 와플입니다. 배경이 투명해서 어두운 바탕과 밝은 바탕 모두에 어울립니다.',
    darkLabel: '어두운 배경',
    lightLabel: '밝은 배경',
    alt: 'Waffuru 와플 마크: 버터 한 조각이 올라가고 시럽이 흘러내리는 와플.',
    downloadsLabel: '다운로드',
    downloadAction: '다운로드',
    downloads: [
      {
        label: '원본',
        detail: 'PNG · 384 × 384 · 투명 배경',
        href: '/brand/waffuru-waffle.png',
        filename: 'waffuru-waffle.png',
      },
      {
        label: '웹용, 대',
        detail: 'PNG · 384 × 384 · 최적화',
        href: '/img/brand/waffle-384.png',
        filename: 'waffuru-waffle-384.png',
      },
      {
        label: '웹용, 소',
        detail: 'PNG · 160 × 160 · 최적화',
        href: '/img/brand/waffle-160.png',
        filename: 'waffuru-waffle-160.png',
      },
    ],
  },
  wordmark: {
    title: '*워드마크*.',
    intro:
      '마크, 소문자 세리프체 “waffuru”, 그리고 그 옆에 놓는 와플의 가타카나 ワッフル로 이루어집니다.',
    darkLabel: '어두운 배경',
    lightLabel: '밝은 배경',
    namingLabel: '표기',
    rules: [
      {
        term: 'Waffuru',
        body: '본문과 제목에서는 대문자 W로 시작해 씁니다. 소문자 “waffuru”는 워드마크에서만 씁니다.',
      },
      {
        term: 'Iron, Butter, Syrup, Whisk',
        body: '네 가지 제품 이름은 어떤 언어에서든 항상 대문자로 시작하며 번역하지 않습니다.',
      },
      {
        term: 'ワッフル',
        body: '“waffle”을 뜻하는 가타카나입니다. 이름에 보내는 인사로 워드마크 옆에 놓으며, 본문에서 이름을 대신하지는 않습니다.',
      },
      {
        term: '와플 마크',
        body: '그림은 “와플 마크”라고 부릅니다.',
      },
    ],
    origin:
      '“Waffuru”는 일본어로 와플을 부르는 말입니다. 만화에 대한 애정, 와플을 함께 좋아하는 마음, 그리고 전 세계를 향한 미션에 보내는 인사입니다.',
  },
  colour: {
    title: '*팔레트*.',
    intro:
      '기본은 다크 로스트 바탕에 크림색 글자, 그리고 하나의 골드 포인트입니다. 라이트 테마는 바탕을 바꾸고, 골드를 글자로 쓸 때는 더 어둡게 조정합니다. HEX 값은 마음껏 복사해 쓰세요.',
    darkLabel: '다크(기본)',
    lightLabel: '라이트',
    dark: [
      {
        name: 'Roast',
        token: '--roast',
        hex: '#0a0908',
        role: '페이지 바탕.',
      },
      {
        name: 'Roast raised',
        token: '--roast-raised',
        hex: '#12100e',
        role: '카드와 한 단계 올라온 표면.',
      },
      {
        name: 'Cream',
        token: '--cream',
        hex: '#ede8df',
        role: '글자와 기본 버튼.',
      },
      {
        name: 'Gold',
        token: '--gold',
        hex: '#e8a33d',
        role: '포인트 색: 면, 점, 이탤릭 단어.',
      },
      {
        name: 'Soft',
        token: '--soft',
        hex: '#d2ccc1',
        role: '보조 본문.',
      },
      {
        name: 'Muted',
        token: '--muted-foreground',
        hex: '#aba599',
        role: '캡션과 작은 글씨.',
      },
      {
        name: 'Faint',
        token: '--faint',
        hex: '#8a847a',
        role: '장식 전용. 글자에는 쓰지 않습니다.',
      },
      {
        name: 'Off',
        token: '--off',
        hex: '#2a2622',
        role: '꺼진 LED, 스탬프, 막대.',
      },
    ],
    light: [
      {
        name: 'Background',
        token: '--background',
        hex: '#f4efe6',
        role: '페이지 바탕.',
      },
      {
        name: 'Card',
        token: '--card',
        hex: '#fbf8f2',
        role: '카드와 한 단계 올라온 표면.',
      },
      {
        name: 'Ink',
        token: '--foreground',
        hex: '#0a0908',
        role: '글자와 기본 버튼.',
      },
      {
        name: 'Gold',
        token: '--brand',
        hex: '#e8a33d',
        role: '면과 점. 다크 테마와 같은 값입니다.',
      },
      {
        name: 'Brand ink',
        token: '--brand-ink',
        hex: '#8a5514',
        role: '글자로 쓰는 골드. 밝은 바탕에서 읽히도록 어둡게 조정했습니다.',
      },
      {
        name: 'Soft',
        token: '--soft',
        hex: '#3b362f',
        role: '보조 본문.',
      },
      {
        name: 'Muted',
        token: '--muted-foreground',
        hex: '#5c554b',
        role: '캡션과 작은 글씨.',
      },
      {
        name: 'Off',
        token: '--off',
        hex: '#ddd5c8',
        role: '꺼진 LED, 스탬프, 막대.',
      },
    ],
  },
  type: {
    title: '세 가지 *서체*.',
    intro:
      '헤드라인은 Instrument Serif, 본문은 Geist, 세부 레이블은 Geist Mono로 짭니다. 중국어, 일본어, 한국어 페이지는 각 플랫폼의 기본 폰트를 사용합니다.',
    faces: [
      {
        key: 'serif',
        name: 'Instrument Serif',
        role: '디스플레이',
        use: '헤드라인, 워드마크, 이탤릭 포인트 단어.',
        sample: 'Raw math, *pressed* into silicon.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub의 Instrument Serif',
          href: 'https://github.com/Instrument/instrument-serif',
        },
      },
      {
        key: 'sans',
        name: 'Geist',
        role: '본문',
        use: '본문, 버튼, 인터페이스.',
        sample:
          'Kernels, inference, a control plane, memory and an agent harness, for hardware you own or rent.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub의 Geist',
          href: 'https://github.com/vercel/geist-font',
        },
      },
      {
        key: 'mono',
        name: 'Geist Mono',
        role: '레이블',
        use: '대문자 레이블, 인덱스, 코드.',
        sample: '01 · Kernels   02 · Serving   03 · Control plane',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub의 Geist Mono',
          href: 'https://github.com/vercel/geist-font',
        },
      },
    ],
    licence:
      '세 서체 모두 SIL 오픈 폰트 라이선스에 따라 자유롭게 쓸 수 있습니다.',
    licenceLink: {
      label: 'SIL 오픈 폰트 라이선스 읽기',
      href: 'https://openfontlicense.org',
    },
  },
  motifs: {
    title: '*움직이는* 모티프.',
    intro:
      '제품에서 가져온 순수 CSS 모티프입니다. 빛나는 타일, 스탬프, 녹는 버터, 상태 표시등, 흘러내리는 시럽 한 방울. 방문자의 기기가 동작 줄이기를 요청하면 움직임을 멈춥니다.',
    items: [
      {
        key: 'tiles',
        name: '와플 타일',
        description: '타일 격자 가운데 몇 칸이 골드로 빛납니다.',
      },
      {
        key: 'stamps',
        name: '스탬프',
        description: '한 칸씩 눌러 찍는 격자. Iron의 모티프입니다.',
      },
      {
        key: 'pat',
        name: '버터 조각',
        description: '녹았다가 다시 돌아오는 버터 조각. Butter의 모티프입니다.',
      },
      {
        key: 'leds',
        name: 'LED',
        description: '상태 표시등이 늘어선 랙. Syrup의 모티프입니다.',
      },
      {
        key: 'drip',
        name: '드립',
        description: '선을 따라 흘러내리는 한 방울. Whisk의 모티프입니다.',
      },
    ],
  },
  usage: {
    title: '우리 *규칙*.',
    intro: '짧고, 대부분 상식입니다.',
    doLabel: '이렇게',
    dontLabel: '이렇게는 안 됩니다',
    dos: [
      'Waffuru는 대문자 W로 시작해 씁니다. 소문자 “waffuru”는 워드마크에서만 씁니다.',
      'Iron, Butter, Syrup, Whisk는 어떤 언어에서든 표기 그대로 씁니다.',
      '와플 마크 주위에 여백을 두고, 대비가 충분한 어둡거나 밝은 바탕 위에 놓습니다.',
      '제품은 있는 그대로 설명합니다. 현재는 비공개이며, 요청하시면 얼리 액세스를 제공합니다.',
      '하드웨어 지원도 있는 그대로 설명합니다. Metal이 우선, CUDA가 그다음이며, ROCm과 Vulkan은 구동되지만 아직 튜닝하지 않았습니다.',
    ],
    donts: [
      '마크의 색을 바꾸거나, 외곽선을 두르거나, 회전·자르기·효과를 더하지 않습니다.',
      '워드마크를 다시 그리거나 다른 서체로 쓰지 않습니다.',
      '제품 이름을 번역하거나 줄여 쓰지 않습니다.',
      '공개하지 않은 성능 수치를 인용하지 않습니다.',
      '존재하지 않는 제휴, 보증, 고객 관계를 암시하지 않습니다. 먼저 문의해 주세요.',
    ],
  },
  press: {
    title: '*우리*에 대해 쓰고 계신가요?',
    body: '무엇을 다루고 계신지, 언제 공개되는지 알려 주세요. 사실 관계와 자료를 보내드리거나 대화할 시간을 잡겠습니다.',
    cta: '언론 문의',
  },
};

export default brandKo;
