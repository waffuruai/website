import { mailto } from '@/content/site';
import type { brand } from './brand';

const brandZh: (typeof brand)['en'] = {
  seo: {
    title: '品牌与媒体资料包',
    description:
      '下载 Waffuru 华夫饼标志，查看字标、配色、字体与图案，以及使用规则。含媒体联系方式。',
    keywords: ['Waffuru 标志', '品牌素材', '媒体资料包'],
  },
  hero: {
    label: '品牌',
    title: '我们的品牌，*开箱*即用。',
    lede: '华夫饼标志、字标、配色、字体与图案，附带几条使用规则。要写 Waffuru？从这里开始。',
    actions: [
      { label: '下载标志', href: '#mark' },
      { label: '联系媒体', href: mailto('Press'), variant: 'outline' },
    ],
  },
  mark: {
    title: '华夫饼*标志*。',
    intro:
      '一块华夫饼，上面放着一小块黄油，糖浆顺着侧边流下。背景透明，深色和浅色底色上都能使用。',
    darkLabel: '深色背景',
    lightLabel: '浅色背景',
    alt: 'Waffuru 华夫饼标志：一块放着黄油、糖浆顺着流下的华夫饼。',
    downloadsLabel: '下载',
    downloadAction: '下载',
    downloads: [
      {
        label: '原图',
        detail: 'PNG · 384 × 384 · 透明背景',
        href: '/brand/waffuru-waffle.png',
        filename: 'waffuru-waffle.png',
      },
      {
        label: '网页用，大图',
        detail: 'PNG · 384 × 384 · 已优化',
        href: '/img/brand/waffle-384.png',
        filename: 'waffuru-waffle-384.png',
      },
      {
        label: '网页用，小图',
        detail: 'PNG · 160 × 160 · 已优化',
        href: '/img/brand/waffle-160.png',
        filename: 'waffuru-waffle-160.png',
      },
    ],
  },
  wordmark: {
    title: '*字标*。',
    intro:
      '由标志、小写衬线体的“waffuru”，以及并排放置的片假名 ワッフル（意为华夫饼）组成。',
    darkLabel: '深色背景',
    lightLabel: '浅色背景',
    namingLabel: '命名',
    rules: [
      {
        term: 'Waffuru',
        body: '正文和标题中首字母大写。小写的“waffuru”只属于字标。',
      },
      {
        term: 'Iron, Butter, Syrup, Whisk',
        body: '四款产品，名称始终首字母大写，在任何语言中都不翻译。',
      },
      {
        term: 'ワッフル',
        body: '“waffle”的片假名。它与字标并排出现，呼应名字的由来，在正文中不替代字标。',
      },
      {
        term: '华夫饼标志',
        body: '请把这幅图称作“华夫饼标志”。',
      },
    ],
    origin:
      '“Waffuru”是日语里“华夫饼”的说法。这个名字表达了对日本文化及其深厚历史的敬意、对华夫饼的共同喜爱，以及一个面向全球的使命。',
  },
  colour: {
    title: '*配色*。',
    intro:
      '默认是深烘咖啡色，搭配奶油色文字和一种金色强调色。浅色主题更换底色，并在金色用作文字时加深。可复制任意十六进制色值。',
    darkLabel: '深色（默认）',
    lightLabel: '浅色',
    dark: [
      {
        name: '深烘',
        token: '--roast',
        hex: '#0a0908',
        role: '页面底色。',
      },
      {
        name: '深烘 · 浮起',
        token: '--roast-raised',
        hex: '#12100e',
        role: '卡片与浮起的表面。',
      },
      {
        name: '奶油',
        token: '--cream',
        hex: '#ede8df',
        role: '文字与主按钮。',
      },
      {
        name: '金',
        token: '--gold',
        hex: '#e8a33d',
        role: '强调色：填充、圆点与斜体强调词。',
      },
      {
        name: '柔和',
        token: '--soft',
        hex: '#d2ccc1',
        role: '次要文字。',
      },
      {
        name: '低调',
        token: '--muted-foreground',
        hex: '#aba599',
        role: '说明文字与小字。',
      },
      {
        name: '微弱',
        token: '--faint',
        hex: '#8a847a',
        role: '仅作装饰，不用于文字。',
      },
      {
        name: '熄灭',
        token: '--off',
        hex: '#2a2622',
        role: '熄灭的 LED、印章与进度条。',
      },
    ],
    light: [
      {
        name: '背景',
        token: '--background',
        hex: '#f4efe6',
        role: '页面底色。',
      },
      {
        name: '卡片',
        token: '--card',
        hex: '#fbf8f2',
        role: '卡片与浮起的表面。',
      },
      {
        name: '墨',
        token: '--foreground',
        hex: '#0a0908',
        role: '文字与主按钮。',
      },
      {
        name: '金',
        token: '--brand',
        hex: '#e8a33d',
        role: '填充与圆点，与深色主题保持一致。',
      },
      {
        name: '品牌墨金',
        token: '--brand-ink',
        hex: '#8a5514',
        role: '用作文字的金色，加深以便在浅色底上清晰可读。',
      },
      {
        name: '柔和',
        token: '--soft',
        hex: '#3b362f',
        role: '次要文字。',
      },
      {
        name: '低调',
        token: '--muted-foreground',
        hex: '#5c554b',
        role: '说明文字与小字。',
      },
      {
        name: '熄灭',
        token: '--off',
        hex: '#ddd5c8',
        role: '熄灭的 LED、印章与进度条。',
      },
    ],
  },
  type: {
    title: '三套*字体*。',
    intro:
      'Instrument Serif 负责标题，Geist 承载正文，Geist Mono 标注细节。中文、日文和韩文页面使用各平台自带的字体。',
    faces: [
      {
        key: 'serif',
        name: 'Instrument Serif',
        role: '标题',
        use: '标题、字标，以及斜体强调词。',
        // The specimens stay in English: the typefaces have no Chinese glyphs.
        sample: 'Raw math, *pressed* into silicon.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub 上的 Instrument Serif',
          href: 'https://github.com/Instrument/instrument-serif',
        },
      },
      {
        key: 'sans',
        name: 'Geist',
        role: '正文',
        use: '正文、按钮与界面。',
        sample:
          'Kernels, inference, a control plane, memory and an agent harness, for hardware you own or rent.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub 上的 Geist',
          href: 'https://github.com/vercel/geist-font',
        },
      },
      {
        key: 'mono',
        name: 'Geist Mono',
        role: '标签',
        use: '大写标签、序号与代码。',
        sample: '01 · Kernels   02 · Serving   03 · Control plane',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'GitHub 上的 Geist Mono',
          href: 'https://github.com/vercel/geist-font',
        },
      },
    ],
    licence: '三套字体均可依据 SIL Open Font License 免费使用。',
    licenceLink: {
      label: '阅读 SIL Open Font License',
      href: 'https://openfontlicense.org',
    },
  },
  motifs: {
    title: '图案，让它*动起来*。',
    intro:
      '纯 CSS 绘制，取材自各款产品，按技术栈从上到下：Pantry 的两个备选、会发光的方块、打蛋器、滴落的糖浆、融化的黄油、压机和状态灯。当访客的设备要求减少动态效果时，它们会停止运动。',
    items: [
      {
        key: 'jar',
        name: '密封罐',
        description:
          '拧紧盖子，再压上金色封印：运行前先验证。Pantry 的备选之一。',
      },
      {
        key: 'shelf',
        name: '货架检查',
        description:
          '从上到下扫描货架，把唯一过期的罐子换成新的。Pantry 的备选之一。',
      },
      {
        key: 'tiles',
        name: '华夫饼方格',
        description: '一格格方块，其中几块泛着金色的光。',
      },
      {
        key: 'whisk',
        name: '打蛋器',
        description: '钢丝圈在碗里旋转，把金色拌进去。Whisk 的图案。',
      },
      {
        key: 'drips',
        name: '糖浆滴',
        description: '糖浆聚起又滴落，每一滴都是一个数据点。Syrup 的图案。',
      },
      {
        key: 'pat',
        name: '融化的黄油',
        description:
          '黄油块化成一摊油亮的黄油，让一切运转更顺滑。Butter 的图案。',
      },
      {
        key: 'stamps',
        name: '压机',
        description: '一次压下一整行的压机。Iron 的图案。',
      },
      {
        key: 'leds',
        name: 'LED 灯',
        description: '一排状态灯，留给一款还在打磨中的产品。',
      },
    ],
  },
  usage: {
    title: '我们的*规矩*。',
    intro: '很短，大多是常识。',
    doLabel: '应当',
    dontLabel: '请勿',
    dos: [
      '写作 Waffuru，W 大写。小写的“waffuru”只用于字标。',
      '写作 Iron、Butter、Syrup 和 Whisk，在任何语言中都保持原样。',
      '给华夫饼标志留出空间，放在对比度足够的深色或浅色底色上。',
      '如实描述我们的产品：目前未公开，可申请抢先体验。',
      '如实描述硬件支持：Metal 为首要，CUDA 调优中，ROCm 和 Vulkan 即将推出（可运行但尚未调优）。',
    ],
    donts: [
      '给标志重新着色、描边、旋转、裁剪或添加特效。',
      '重新绘制字标，或改用其他字体排印。',
      '翻译或缩写产品名称。',
      '引用我们没有公布过的性能数字。',
      '暗示并不存在的合作、背书或客户关系。请先问我们。',
    ],
  },
  press: {
    title: '想写写*我们*？',
    body: '告诉我们你在写什么、何时发布。我们会提供事实资料、素材，或约个时间聊聊。',
    cta: '联系媒体',
  },
};

export default brandZh;
