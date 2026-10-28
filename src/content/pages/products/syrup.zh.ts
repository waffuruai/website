import type { syrup } from './syrup';

const syrupZh: (typeof syrup)['en'] = {
  layer: '控制平面',
  tagline: '监控、遥测、访问控制与成本，覆盖每一块 GPU。',
  summary:
    '面向 GPU 上大模型的控制平面，从桌下的一台机器，到出租集群的新型云服务商。每台主机运行一个小型 Rust sidecar，上报带签名的遥测数据，其上还有基于角色的访问控制和成本查看器。支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器。',
  seo: {
    title: 'Syrup：GPU 上大模型的控制平面',
    description:
      '看清每块 GPU 和其上的每个推理引擎，从桌下一台机器到新型云服务商的集群。Rust sidecar 上报签名遥测，支持 Butter、vLLM、SGLang、llama.cpp。',
    keywords: [
      'GPU 集群管理',
      '大模型控制平面',
      'GPU 可观测性',
      'vLLM SGLang llama.cpp 监控',
    ],
  },
  hero: {
    title: '看清每一块 GPU，和其上运行的每个*引擎*。',
    lede: 'Syrup 是 GPU 上大模型的控制平面，从桌下的一台机器，到出租集群的新型云服务商。每台主机运行一个小型 Rust sidecar，上报带签名的遥测数据。',
    highlights: [
      { value: '一台机器', label: '桌下一台，直至新型云服务商的集群' },
      {
        value: '已签名',
        label: '每台主机上的小型 Rust sidecar 上报的遥测数据',
      },
      {
        value: '无锁定',
        label: 'Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器',
      },
    ],
  },
  story: {
    heading: '每块 GPU 上*跑着什么*，一目了然。',
    problem:
      'GPU 机器上跑的，是某个人在上面启动的任何引擎：这台是 llama.cpp，下一台是 vLLM，新的那台是 SGLang。想知道什么在哪里运行，就得逐台登录主机。',
    outcome:
      '在每台主机上放一个小型 Rust sidecar。它上报带签名的遥测数据，Syrup 则呈现每一块 GPU 和其上的每个引擎，不论你管的是一台机器还是一整个集群。',
    outcomes: [
      '用同一个工具，看管桌下的一台机器，或你出租的整个集群。',
      '保留你已在运行的引擎。Syrup 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器。',
      '放心依赖你所看到的：每台主机都上报带签名的遥测数据。',
    ],
  },
  capabilities: {
    heading: 'Syrup 能*做什么*。',
    intro: '控制平面守在你的引擎旁边，而不是取代它们。',
    items: [
      {
        title: '每一块 GPU',
        body: '在一处看到每台主机上的每块 GPU。',
      },
      {
        title: '每一个引擎',
        body: '看到其上运行的是哪个引擎：Butter、vLLM、SGLang、llama.cpp，或其他兼容 OpenAI 的服务器。',
      },
      {
        title: '访问控制',
        body: '基于角色的访问控制决定谁能在每台主机上查看和运行什么。每台主机运行一个用 Rust 编写的小型 sidecar。',
      },
      {
        title: '带签名的遥测',
        body: '每个 sidecar 都会为它上报的遥测数据签名。',
      },
      {
        title: '成本查看器',
        body: '把 GPU 的成本和它们运行的内容放在一起看，从桌下的一台机器，到出租集群的新型云服务商。',
      },
      {
        title: '无锁定',
        body: 'Syrup 不要求使用 Butter。它同样支持 vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器。',
      },
    ],
  },
  specs: {
    heading: '技术*细节*。',
    rows: [
      { term: '角色', detail: '面向 GPU 上大模型的控制平面。' },
      {
        term: '每台主机上',
        detail: '一个用 Rust 编写的小型 sidecar。',
      },
      {
        term: '遥测',
        detail: '由上报它的 sidecar 签名。',
      },
      {
        term: '引擎',
        chips: [
          { label: 'Butter' },
          { label: 'vLLM' },
          { label: 'SGLang' },
          { label: 'llama.cpp' },
          { label: '其他兼容 OpenAI 的服务器' },
        ],
      },
      {
        term: '规模',
        detail: '从桌下的一台机器，到新型云服务商的集群。',
      },
      {
        term: '锁定',
        detail: '没有。Syrup 也支持 Butter 以外的引擎。',
      },
      {
        term: '可用性',
        detail: '抢先体验期间为私有闭源。',
      },
    ],
  },
  stack: {
    heading: '与其余*技术栈*协同工作。',
    intro:
      '无论是否使用 Butter，Syrup 都盯着 GPU。Butter 在 Iron 编译的内核上运行模型，Whisk 记得你在做什么。',
  },
  faq: [
    {
      question: 'Syrup 开源吗？',
      answer:
        '目前不开源。抢先体验期间，Syrup 为私有闭源。申请访问，有更多内容可以分享时，我们会写信给你。',
    },
    {
      question: '我必须用 Butter 吗？',
      answer:
        '不必。Syrup 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器，你可以继续用已经在跑的引擎。',
    },
    {
      question: '适合谁？',
      answer:
        '任何在 GPU 上运行大模型、并希望看清它们的人，从桌下的一台机器，到出租集群的新型云服务商。',
    },
    {
      question: 'sidecar 是做什么的？',
      answer:
        '每台主机运行一个用 Rust 编写的小型 sidecar。它上报该主机上的 GPU，以及其上所运行引擎的带签名遥测数据。',
    },
    {
      question: '支持哪些 GPU？',
      answer:
        '我们还没有发布 Syrup 的硬件支持矩阵。告诉我们你在用什么，我们会直接告诉你是否合适。',
    },
  ],
  cta: {
    title: '看看你的*集群*。',
    body: 'Syrup 目前处于抢先体验阶段，暂未开源。申请访问，或者告诉我们你在运行什么。',
  },
};

export default syrupZh;
