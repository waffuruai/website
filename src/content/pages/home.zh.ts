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
    title: '用你*已有*的硬件，获得更多智能。',
    lede: 'Waffuru 打造在你自己的机器上运行 AI 的技术栈，从一台笔记本到一整支 GPU 集群。你能从现有硬件中获得更多，数据留在你手里，也不会每发一次提示词就多一笔云账单。',
    launch: {
      label: '新品',
      text: 'Pantry，我们面向 macOS 和 Linux 的免费漏洞扫描器',
    },
    secondary: { label: '了解工作原理', href: '#stack' },
  },

  pantry: {
    label: '免费 · 开源 · 今日发布',
    title: '看清哪里*暴露*，快速修补。',
    body: '助理要在你的机器上运行，这台机器得先安全。Pantry 会对照公开的漏洞数据，检查已安装的一切和每个代码仓库，只报告真正影响你的问题，并修复能安全修复的部分。',
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
      '四个层次，可单独使用，也可组合使用。请求向下传递，答案原路返回，全程都不必离开你的硬件。',
    note: '技术栈目前未公开，处于抢先体验阶段。Metal 优先，CUDA 其次；ROCm 和 Vulkan 可以运行，但尚未调优。',
    flow: {
      you: '你、你的应用、你的智能体',
      boundary: '你的硬件 · 你的网络',
      layers: [
        {
          role: '控制',
          name: 'Syrup',
          line: '看清每一块 GPU 和其上运行的每个引擎。',
        },
        {
          role: '记忆',
          name: 'Whisk',
          line: '来自你自己笔记和代码的上下文，附带引用。',
        },
        {
          role: '引擎',
          name: 'Butter',
          line: '运行模型，服务路径中没有 Python。',
        },
        {
          role: '内核',
          name: 'Iron',
          line: '一份内核定义，针对每种芯片分别调优。',
        },
      ],
      hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
      outside: {
        title: '别人的云',
        note: '不需要。除非你主动选择开启，数据始终留在你手里。',
      },
      outcomes: ['默认私密', '从已有硬件中获得更多', '每块 GPU 一目了然'],
      caption:
        '你的请求依次经过控制平面、记忆、引擎和内核，抵达你自己的硬件，答案再沿原路返回，全程都在你的硬件和网络之内。结果是：默认私密，从已有硬件中获得更多，每块 GPU 一目了然。',
    },
  },

  audiences: {
    title: '为你留一个*座位*。',
    intro: '无论你是谁，同一套技术栈都适用。',
    items: [
      {
        title: '为你自己',
        body: '在你自己的笔记本上运行私人助理。你的笔记、代码和问题都留在你的机器上。',
      },
      {
        title: '为企业',
        body: '把 AI 搬进公司内部。让敏感数据待在该待的地方，不再为硬件本可完成的工作按提示词付费。',
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
    intro: '研究、安全、营收，还有几位曾把产品做出来的创始人。',
    portraitAlt: '{name} 的肖像',
    link: { label: '认识团队', href: '/about/team' },
  },

  cta: {
    title: '请入座。',
    body: '今天就免费试用 Pantry。技术栈的其余部分处于抢先体验阶段：申请一个席位，或者留下邮箱，有消息时我们会写信给你。',
  },
};

export default homeZh;
