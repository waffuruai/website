import type { home } from './home';

const homeZh: (typeof home)['en'] = {
  seo: {
    keywords: [
      '私有化 AI',
      '本地 AI',
      '端侧 AI',
      '在自有硬件上运行 AI',
      '本地大模型推理',
      '推理引擎',
      'GPU 内核',
      'Apple silicon',
      '漏洞扫描器',
      'Pantry',
    ],
  },

  hero: {
    eyebrow: '你的硬件 · 你的数据 · 你的 AI',
    title: '在你*已有*的硬件上，获得更多智能。',
    lede: 'Waffuru 打造在你自有或租用的硬件上运行的 AI 技术栈，从一台笔记本到数据中心里的一整支 GPU 集群。你能从每块 GPU 中获得更多，每个 token 花得更少，数据也留在你手里。',
    launch: {
      label: '新品',
      text: 'Pantry，我们面向 macOS 和 Linux 的免费漏洞扫描器',
    },
    secondary: { label: '了解工作原理', href: '#stack' },
  },

  pantry: {
    label: '免费 · 开源 · 今日发布',
    title: '看清哪里*暴露*，快速修补。',
    body: 'AI 要在你的机器上运行，这些机器得先安全。Pantry 会对照公开的漏洞数据，检查已安装的一切和每个代码仓库，只报告真正影响你的问题，并修复能安全修复的部分。',
    points: [
      '只报与你确切版本相关的问题',
      '安全的修复替你执行；需要 sudo 的步骤会打印出来',
      '无遥测，不用 AI，用 Rust 编写',
    ],
    primary: '保护你的系统',
    secondary: 'Pantry 的工作方式',
    caption: '某台机器的示例输出。',
  },

  stack: {
    title: '从芯片到*答案*。',
    intro:
      '六款产品，可单独使用，也可组合使用。请求向下传递，答案原路返回，全程都不必离开你掌控的硬件。',
    note: 'Pantry 今天已免费开源；技术栈的其余部分处于非公开抢先体验阶段，Waffle 即将推出。Metal 优先，CUDA 调优中，ROCm 和 Vulkan 即将推出。',
    flow: {
      you: '你、你的团队、你的智能体',
      boundary: '你自有或租用的硬件',
      layers: [
        {
          role: '安全',
          name: 'Pantry',
          icon: 'pantry',
          line: '找出每台机器上暴露的问题，并加以修补。',
        },
        {
          role: '智能体',
          name: 'Waffle',
          icon: 'waffle',
          line: '智能体框架，你的助理 W 就在其中。',
        },
        {
          role: '记忆',
          name: 'Whisk',
          icon: 'whisk',
          line: '把合适的文档和上下文调入每一次请求。',
        },
        {
          role: '控制',
          name: 'Syrup',
          icon: 'syrup',
          line: '监控、遥测、访问控制与成本，覆盖每一块 GPU。',
        },
        {
          role: '引擎',
          name: 'Butter',
          icon: 'butter',
          line: '面向文本、视觉和音频的多模态推理，流式输出。',
        },
        {
          role: '内核',
          name: 'Iron',
          icon: 'iron',
          line: '用 Rust 写一次，到处都能得到优化的内核。',
        },
      ],
      hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
      outside: {
        title: '别人的 API',
        note: '不需要。除非你主动选择开启，数据始终留在你的硬件上。',
      },
      outcomes: ['为降低每 token 成本而打造', '默认私密', '补丁到位，一目了然'],
      caption:
        '来自你、你的团队或你的智能体的请求，依次经过 Pantry（安全）、Waffle（智能体）、Whisk（记忆）、Syrup（控制）、Butter（引擎）和 Iron（内核），抵达你自有或租用的硬件，答案再沿原路返回。为降低每 token 成本而打造，默认私密，补丁到位，一目了然。',
    },
  },

  audiences: {
    title: '我们已在餐桌旁为*你*留好了座位。',
    intro: '无论你是谁，同一套技术栈都适用。',
    items: [
      {
        title: '为你自己',
        body: '在你自己的笔记本上运行私人助理。你的笔记、代码和问题都留在你的机器上。',
        soon: true,
      },
      {
        title: '为企业',
        body: '把 AI 搬进公司内部，跑在你自有或租用的 GPU 上。让敏感数据待在该待的地方，每个 token 花得更少。',
        href: '/solutions/enterprise',
      },
      {
        title: '为 GPU 云',
        body: '让你出租的每一块 GPU 提供更多服务，并在一处看清整个集群。',
        href: '/solutions/neoclouds',
      },
      {
        title: '为 AI 开发者',
        body: '内核只写一次，即可交付到 Metal、CUDA、ROCm 和 Vulkan。',
        href: '/solutions/ai-companies',
      },
    ],
    linkLabel: '看看怎么做',
    soonLabel: '即将推出',
  },

  beliefs: {
    title: '我们为何*下厨*。',
    intro: '三条信念，贯穿我们打造的一切。',
    items: [
      {
        title: '人人可及的智能',
        body: '能否用上 AI，不应取决于你住在哪里、收入多少或持有什么资历。',
      },
      {
        title: '让每一瓦做更多',
        body: '对智能的需求没有上限，电力和芯片却有。关键在于让每一单位算力做更多有用的功。',
      },
      {
        title: '足够好，就在你自己的硬件上',
        body: '大约两年内，人们已有机器上的模型就能好到足以胜任有意义的工作。我们正为此而建。',
      },
    ],
    links: [
      { label: '阅读发布公告', href: '/blog/introducing-waffuru' },
      { label: '我们相信什么', href: '/about#beliefs' },
    ],
  },

  team: {
    title: '谁在*厨房*里。',
    intro:
      '我们是一群经验丰富的构建者，背景横跨网络安全、军队、消费和企业领域。创办并做大过创业公司，合作对象从小企业到大型企业都有。',
    portraitAlt: '{name} 的肖像',
    link: { label: '认识团队', href: '/about/team' },
  },

  cta: {
    title: '预订你的座位。',
    body: '今天就免费试用 Pantry。技术栈的其余部分处于抢先体验阶段：预订一个座位，或者留下邮箱，有消息时我们会写信给你。',
  },
};

export default homeZh;
