import type { waffle } from './waffle';

const waffleZh: (typeof waffle)['en'] = {
  layer: '智能体',
  tagline: '智能体框架，内置你的助手 W。',
  summary:
    'Waffle 是运行你的智能体的框架，内置我们的助手 W。它优先使用本地模型，只有任务需要更强能力时才转向云端。即将推出。',
  seo: {
    title: 'Waffle：智能体框架，内置 W',
    description:
      'Waffle 是 Waffuru 的智能体框架，内置 W：一个为工作与生活打造的个人助手。优先使用本地模型，只有任务需要时才用云端。即将推出。',
    keywords: ['智能体框架', 'AI 助手', '私有 AI 助手', '本地 AI 智能体'],
  },
  hero: {
    title: '为*你*工作的智能体。',
    lede: 'Waffle 是运行你的智能体的框架，内置我们的助手 W：你值得信赖的延伸，兼顾工作与生活。它优先使用本地模型，只有任务需要更强能力时才转向云端。',
    highlights: [
      { value: 'W', label: '内置的助手' },
      { value: '本地优先', label: '只有任务需要时才用云端' },
      { value: '即将推出', label: '基于 Butter、Iron 和 Whisk 打造' },
    ],
  },
  story: {
    heading: '真正属于*你*的助手。',
    problem:
      '大多数助手都住在别人的服务器上，看得到你分享的一切，还按 token 收费。把邮件、日历和文件交给它，就等于把你的工作和生活托付给一个陌生人。',
    outcome:
      'Waffle 在你自有或租用的硬件上运行你的助手。W 的记忆与上下文来自 Whisk，模型来自 Butter；除非你主动选择开启，否则数据始终留在你手中。',
    outcomes: [
      '把日常事务交出去，从邮件、日历到预订、项目和文档。',
      '助手对你的了解，留在你掌控的硬件上。',
      '把钱花在你选择的算力上，而不是花在每个 token 上。',
    ],
  },
  capabilities: {
    heading: 'Waffle *用来*做什么。',
    intro: 'Waffle 即将推出。下面是它被设计来做的事。',
    items: [
      {
        title: '智能体的运行框架',
        body: '你的智能体运行的地方：它们调用的模型、借助的记忆和使用的工具，都在一处。',
      },
      {
        title: '助手 W',
        body: '为工作与生活打造的个人助手，力求成为你值得信赖的延伸：乐于助人、平易近人，从不令人生畏。',
      },
      {
        title: '本地模型优先',
        body: 'W 通过 Butter 和 Iron 运行本地模型，只有任务需要更强能力时才转向云端。',
      },
      {
        title: '记忆始终属于你',
        body: '上下文与记忆来自 Whisk，存放在你掌控的硬件上。',
      },
    ],
  },
  specs: {
    heading: '技术*细节*。',
    intro: 'Waffle 在技术栈中的位置，给会细读的人看。',
    rows: [
      { term: '助手', detail: 'W。' },
      { term: '模型', detail: '本地优先；任务需要更多时使用云端。' },
      { term: '运行于', detail: 'Butter 和 Iron，在你自有或租用的硬件上。' },
      { term: '记忆与上下文', detail: 'Whisk。' },
      { term: '可用性', detail: '即将推出。' },
    ],
  },
  stack: {
    heading: '技术栈的*顶层*。',
    intro:
      'Waffle 建立在它下面的每一层之上：Whisk 提供记忆与上下文，Syrup 负责管控，Butter 运行模型，Iron 提供内核。',
  },
  faq: [
    {
      question: '什么时候能用上 Waffle？',
      answer: '即将推出。申请抢先体验，准备好试用时我们会写信给你。',
    },
    {
      question: 'Waffle 开源吗？',
      answer: '目前不开源。Waffle 即将推出，抢先体验期间将保持闭源。',
    },
    {
      question: 'W 是什么？',
      answer:
        'W 是 Waffle 内置的助手：一个为工作与生活打造的个人助手，力求成为你值得信赖的延伸。',
    },
    {
      question: '它需要云端吗？',
      answer:
        '不需要。Waffle 优先使用本地模型，只有任务需要更强能力时才转向云端。',
    },
    {
      question: '我的数据会离开我的硬件吗？',
      answer: '除非你选择使用托管的 AI 推理服务商，否则不会。',
    },
  ],
  cta: {
    title: '很快就能见到 *W*。',
    body: 'Waffle 即将推出。申请抢先体验，准备好试用时我们会写信给你。',
  },
};

export default waffleZh;
