import type { syrup } from './syrup';

const syrupZh: (typeof syrup)['en'] = {
  layer: '记忆',
  tagline: '让你的 AI 记得你在做什么。',
  summary:
    '对你的笔记和代码做本地检索。嵌入向量用 TurboQuant+ 压缩，搜索结合关键词与向量，结果通过 MCP 返回，并附带引用。',
  seo: {
    title: 'Syrup：为你的 AI 提供本地记忆与检索',
    description:
      'Syrup 对你的笔记和代码做本地检索。嵌入向量由 TurboQuant+ 压缩，关键词加向量搜索，结果通过 MCP 附带引用返回。',
    keywords: ['本地 RAG', 'AI 记忆', 'MCP 检索', '私有语义搜索'],
  },
  hero: {
    title: '你的 AI *记得*你在做什么。',
    lede: 'Syrup 对你的笔记和代码做本地检索。嵌入向量用 TurboQuant+ 压缩，搜索结合关键词与向量，结果通过 MCP 返回，并附带引用。',
    highlights: [
      { value: '本地', label: '对你的笔记和代码做检索' },
      {
        value: '关键词 + 向量',
        label: '搜索，基于用 TurboQuant+ 压缩的嵌入向量',
      },
      { value: '附引用', label: '的结果，通过 MCP 交付' },
    ],
  },
  story: {
    heading: '不用再一遍遍*解释自己*。',
    problem:
      '每次新开一个对话，都是从零开始。你把同样的笔记和文件再贴一遍，答案回来了，你却分不清它出自哪一份。',
    outcome:
      'Syrup 在你自己的机器上为笔记和代码建立索引。你的 AI 通过 MCP 向它提问，拿回要紧的段落，每一段都附带可核对的引用。',
    outcomes: [
      '笔记和代码留在你自己的机器上。检索在本地完成。',
      '既能按你用过的原词查找，也能按意思查找：搜索结合关键词与向量。',
      '任何答案都能对照来源核实，因为结果附带引用。',
    ],
  },
  capabilities: {
    heading: 'Syrup 能*做什么*。',
    intro: '一个由你自己运行的记忆层，服务于你已有的工作。',
    items: [
      {
        title: '本地检索',
        body: 'Syrup 在你自己的机器上搜索笔记和代码，除非你主动选择开启，否则数据始终留在那里。',
      },
      {
        title: '压缩的嵌入向量',
        body: '嵌入向量用 TurboQuant+ 压缩，索引占用的空间更小。',
      },
      {
        title: '关键词加向量搜索',
        body: '精确词匹配与按语义搜索协同工作。',
      },
      {
        title: '通过 MCP 返回引用',
        body: '结果通过 MCP 附带引用返回，因此任何 MCP 客户端都能使用，并展示每条结果的出处。',
      },
    ],
  },
  specs: {
    heading: '技术*细节*。',
    intro: '给会细读的人看的细节。',
    rows: [
      { term: '索引对象', detail: '你的笔记和代码。' },
      { term: '运行位置', detail: '本地，在你的机器上。' },
      { term: '嵌入向量', detail: '用 TurboQuant+ 压缩。' },
      { term: '搜索', detail: '关键词加向量。' },
      { term: '结果', detail: '附带引用返回。' },
      { term: '接口', detail: 'MCP。' },
      {
        term: '可用性',
        detail: '抢先体验期间为私有闭源。',
      },
    ],
  },
  stack: {
    heading: '与其余*技术栈*协同工作。',
    intro:
      'Syrup 可以单独使用，配合任何 MCP 客户端。在它之下，Butter 运行模型，Waffle 盯着 GPU，Iron 编译内核。',
  },
  faq: [
    {
      question: 'Syrup 开源吗？',
      answer:
        '目前不开源。抢先体验期间，Syrup 为私有闭源。申请访问，有更多内容可以分享时，我们会写信给你。',
    },
    {
      question: '我的数据会离开我的机器吗？',
      answer:
        '检索在本地完成：Syrup 在你的机器上建立索引并搜索。我们给自己定了一条简单的规矩：除非你主动选择开启，否则数据始终留在你的机器上。',
    },
    {
      question: '它会索引什么？',
      answer: '你的笔记和代码。',
    },
    {
      question: 'TurboQuant+ 是什么？',
      answer:
        'Syrup 用来压缩嵌入向量的方法。它来自我们的首席研究官 Tom Turney。',
    },
    {
      question: '什么可以使用 Syrup？',
      answer:
        '任何支持 MCP 的工具都可以向 Syrup 请求结果，每条结果都附带引用。',
    },
    {
      question: '我需要整套技术栈吗？',
      answer: '不需要。Waffuru 的每款产品都可以单独使用，Syrup 也不例外。',
    },
  ],
  cta: {
    title: '给你的 AI 一份*记忆*。',
    body: 'Syrup 目前处于抢先体验阶段，暂未开源。申请访问，或者告诉我们你希望它记住什么。',
  },
};

export default syrupZh;
