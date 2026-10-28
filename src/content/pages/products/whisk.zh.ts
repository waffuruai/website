import type { whisk } from './whisk';

const whiskZh: (typeof whisk)['en'] = {
  layer: '记忆',
  tagline: '记得你在做什么的 AI。',
  summary:
    '对你的笔记、代码、文档和图片做本地检索。嵌入向量用我们专有的 AURA 压缩算法压缩，搜索结合关键词与向量，结果通过 MCP 返回，并附带引用。',
  seo: {
    title: 'Whisk：为你的 AI 提供本地记忆与检索',
    description:
      'Whisk 把你的笔记、代码、文档和图片融入你的 AI 会话。基于 AURA 压缩嵌入向量的关键词加向量搜索，结果通过 MCP 附带引用返回。',
    keywords: ['本地 RAG', 'AI 记忆', 'MCP 检索', '私有语义搜索'],
  },
  hero: {
    title: '*记得*你在做什么的 AI。',
    lede: 'Whisk 从你的电脑上找出相关的笔记、代码、文档和图片，把它们拌进来，无缝融入你的 AI 会话。',
    highlights: [
      { value: '本地', label: '对你的笔记、代码、文档和图片做检索' },
      {
        value: '关键词 + 向量',
        label: '搜索，基于用我们的 AURA 算法压缩的嵌入向量',
      },
      { value: '附引用', label: '的结果，通过 MCP 交付' },
    ],
  },
  story: {
    heading: '不用再一遍遍*解释自己*。',
    problem:
      '每次新开一个对话，都是从零开始。你把同样的笔记和文件再贴一遍，答案回来了，你却分不清它出自哪一份。',
    outcome:
      'Whisk 在你自己的机器上为笔记、代码、文档和图片建立索引。你的 AI 向它发出请求，拿回要紧的段落，每一段都附带指向原始来源、可供核对的引用。',
    outcomes: [
      '笔记和代码留在你自己的机器上。检索在本地完成。',
      '既能按你用过的原词查找，也能按意思查找：搜索结合关键词与向量。',
      '任何答案都能对照来源核实，因为结果附带引用。',
    ],
  },
  capabilities: {
    heading: 'Whisk 能*做什么*。',
    intro: '一个由你自己运行的记忆层，服务于你已有的工作。',
    items: [
      {
        title: '本地检索',
        body: 'Whisk 在你自己的机器上搜索笔记、代码、文档和图片，除非你选择使用托管的 AI 推理服务商，否则数据始终留在那里。',
      },
      {
        title: '压缩的嵌入向量',
        body: '嵌入向量用我们专有的 AURA 压缩算法压缩，你的数据占用的空间更小。',
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
    rows: [
      { term: '索引对象', detail: '你的笔记、代码、文档和图片。' },
      { term: '运行位置', detail: '本地，在你的机器上。' },
      { term: '嵌入向量', detail: '用我们专有的压缩算法 AURA 压缩。' },
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
      'Whisk 可以单独使用，配合任何 MCP 客户端。在它之下，Butter 运行模型，Syrup 盯着 GPU，Iron 编译内核。',
  },
  faq: [
    {
      question: 'Whisk 开源吗？',
      answer:
        '目前不开源。抢先体验期间，Whisk 为私有闭源。申请访问，有更多内容可以分享时，我们会写信给你。',
    },
    {
      question: '我的数据会离开我的机器吗？',
      answer:
        '检索在本地完成：Whisk 在你的机器上建立索引并搜索。我们给自己定了一条简单的规矩：除非你选择使用托管的 AI 推理服务商，否则数据始终留在你的机器上。',
    },
    {
      question: '它会索引什么？',
      answer: '你的笔记、代码、文档和图片。',
    },
    {
      question: 'AURA 是什么？',
      answer:
        '我们专有的压缩算法，用于 KV 缓存、嵌入向量和模型权重。在 Whisk 中，它压缩嵌入向量，让你的数据占用更少的空间。它的灵感来自 TurboQuant+，即 Tom Turney 对 Google [TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/) 的改进；我们又用一些自己独创的新技术，把它推进得更远。AURA 出自 Eric Kryski 与 Tom Turney 的合作。',
    },
    {
      question: '什么可以使用 Whisk？',
      answer:
        '任何支持 MCP 的工具都可以向 Whisk 请求结果，每条结果都附带引用。',
    },
    {
      question: '我需要整套技术栈吗？',
      answer: '不需要。Waffuru 的每款产品都可以单独使用，Whisk 也不例外。',
    },
  ],
  cta: {
    title: '给你的 AI 一份*记忆*。',
    body: 'Whisk 目前处于抢先体验阶段，暂未开源。申请访问，或者告诉我们你希望它记住什么。',
  },
};

export default whiskZh;
