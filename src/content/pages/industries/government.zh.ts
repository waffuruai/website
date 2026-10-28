import type { government } from './government';

const governmentZh: (typeof government)['en'] = {
  seo: {
    title: '面向政府的主权 AI 推理',
    description:
      '在你掌控的硬件上运行 AI，让公共数据留在你的管辖范围内，算清每个工作负载，不被锁定在某一种引擎或某一家厂商。抢先体验。',
    keywords: [
      '主权 AI',
      '政务 AI 基础设施',
      '政府私有化部署大模型',
      'AI 数据驻留',
      '厂商中立的 AI 推理',
    ],
  },
  name: '政府',
  serviceType: '自主可控的本地部署 AI 推理软件',
  card: {
    title: '*政府*',
    summary: '在你掌控的硬件上运行主权推理，不被锁定在某一种引擎或某一家厂商。',
  },
  hero: {
    title: '主权 AI，运行在你*掌控*的硬件上。',
    lede: '在你的机构运营的基础设施上运行模型，让公共数据留在你的管辖范围内。算清每一块 GPU 和每个工作负载，并保留更换厂商而无需从头再来的自由。',
  },
  problem: {
    title: '公共资金，私密*数据*。',
    statement:
      '公共服务依赖的数据必须留在你的管辖范围内，而每一笔 GPU 开支都要经得起采购审查。',
    body: '托管 AI 往往意味着数据流向别人的云。采购硬件，可能意味着押注一家厂商好几年。机构最终手里是一堆没人能在一处看清的混杂机器，以及一套很难向签字批准者解释清楚的服务栈。',
  },
  useCases: {
    title: '留在*本土*的能力。',
    intro: '为必须在公共规则下让 AI 落地的团队准备的四件事。',
    items: [
      {
        tag: 'control',
        title: '让数据留在你的管辖范围内。',
        body: 'Butter 在你运营的服务器上提供模型服务，无论是本地机房还是你选择的云，让提示词和文档都留在你掌控的基础设施上。除非你主动选择开启，数据始终留在原处。',
      },
      {
        tag: 'cost',
        title: '讲清钱花在了哪里。',
        body: '每个工作负载的成本，是预算部门要的数字，却几乎没人能看到。Syrup 显示每一块 GPU、其上的每个引擎以及哪些在闲置，让开支能对应回它所支撑的服务。',
      },
      {
        tag: 'control',
        title: '买硬件，不买锁定。',
        body: '一份 Iron 内核定义，可转换为 Metal、CUDA、HIP/ROCm 和 Vulkan，而 Syrup 支持 Butter、vLLM、SGLang 和 llama.cpp。更换 GPU 厂商或引擎，变成一个决定，而不是一次重写。',
      },
      {
        tag: 'inference',
        title: '用好你已经买下的硬件。',
        body: '从桌上的 Mac，到 RTX 工作站和 DGX Spark，一套技术栈在已经付过钱的硬件上提供模型服务。Butter 的依赖降到最少，要打的补丁更少，要论证的理由也更少。',
      },
    ],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro:
      'Butter 让工作留在你的管辖范围内，Syrup 为它记账，Whisk 根据你自己的文档作答，Iron 让厂商可以互换。',
    items: [
      {
        product: 'butter',
        need: '在你运营的基础设施上提供模型服务。',
        body: 'macOS 和 iOS 上用 Swift、其他平台用 Rust，提供兼容 OpenAI 的服务，依赖极少。现有工具只需换一个地址，不用换 SDK。',
      },
      {
        product: 'syrup',
        need: '每一块 GPU，一本账。',
        body: '一个视图看清每一块 GPU 和每个引擎，不论是 Butter、vLLM、SGLang 还是 llama.cpp。每台主机上的小型 Rust sidecar 上报带签名的遥测数据。',
      },
      {
        product: 'whisk',
        need: '答案来自你自己的文档，并附出处。',
        body: '对内部笔记、文档和代码做本地检索。搜索结合关键词与向量，结果通过 MCP 附带引用返回。',
      },
      {
        product: 'iron',
        need: '经得起下一次招标的厂商选择。',
        body: '一份内核定义，转换为 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V，对外是版本化的 C 与 Rust ABI。硬件更换时，内核可以直接沿用，调优则逐个后端跟进。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: '产品目前处于抢先体验阶段，暂未开源，我们也不作任何合规或资质认定声明。以下是目前可用的部分。',
    notes: [
      '在 Apple 芯片、RTX 工作站和 DGX Spark 上规划试点，整套技术栈目前就运行在这些平台上。数据中心 GPU 正在进行中。',
      'ROCm 和 Vulkan 可以运行，但尚未调优。',
      '模型放到你的机器上之后，大部分技术栈都能离线运行。物理隔离环境的支持即将推出。',
      '请直接把你的采购和安全要求带来，我们会逐项具体回答。',
    ],
  },
  faq: [
    {
      question: '会有数据离开我们的基础设施吗？',
      answer:
        '推理数据默认不会离开，因为除非你主动选择开启，数据始终留在机器上。每台 Syrup 主机运行一个 sidecar，上报带签名的遥测数据，我们会针对你的环境，逐项讲清楚其中包含什么。',
    },
    {
      question: '可以离线运行吗？',
      answer:
        '模型放到你的机器上之后，大部分技术栈都能离线运行。物理隔离环境的支持即将推出，我们也会告诉你，目前在你的环境中哪些部分能运行。',
    },
    {
      question: '你们是否具备政府使用的资质认定？',
      answer:
        '我们不作任何合规、认证或资质认定声明。告诉我们你的机构有什么要求，我们会具体回答。',
    },
    {
      question: '它如何避免锁定？',
      answer:
        'Syrup 支持 Butter、vLLM、SGLang 和 llama.cpp，所以你不会被绑在某一种引擎上。Iron 内核可转换为 Metal、CUDA、HIP/ROCm 和 Vulkan，所以你也不会被绑在某一家 GPU 厂商上。',
    },
    {
      question: '它支持哪些硬件？',
      answer:
        'Apple 芯片上的 Metal 是首要。NVIDIA 通过 CUDA 其次，已在 RTX 和 DGX Spark 上投入生产，数据中心 GPU 正在进行中。AMD ROCm 和 Vulkan 可以运行，但尚未调优。',
    },
    {
      question: '我们如何评估？',
      answer:
        '抢先体验按申请开放，产品暂未开源。告诉我们你的硬件和工作负载，我们会坦率地告诉你，它今天是否合适。',
    },
  ],
  cta: {
    title: '让它留在你的*管辖范围*内。',
    body: '抢先体验，暂未开源。告诉我们什么必须留在境内，以及你运行的是什么硬件，我们会坦率地告诉你今天哪些合适。',
  },
};

export default governmentZh;
