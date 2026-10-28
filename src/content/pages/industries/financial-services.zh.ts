import type { financialServices } from './financial-services';

const financialServicesZh: (typeof financialServices)['en'] = {
  seo: {
    title: '面向金融服务的私有 AI 推理',
    description:
      '在客户数据所在之处运行 AI，为每个工作负载算清成本，让模型风险团队需要审查的服务栈更小。抢先体验。',
    keywords: [
      '金融行业私有 AI',
      '银行私有化部署大模型',
      'AI 工作负载成本',
      'AI 数据驻留',
      'GPU 成本可见性',
    ],
  },
  name: '金融服务',
  serviceType: '面向金融业的私有本地部署 AI 推理软件',
  card: {
    title: '金融*服务*',
    summary: '对客户数据做私有推理，每个工作负载的成本都能拿给财务部门看。',
  },
  hero: {
    title: '在客户数据*所在*之处运行 AI。',
    lede: '在你运营的硬件上提供模型服务，让客户记录、研究和代码都留在你的边界之内。在财务部门开口之前，就看清每个工作负载的成本，并让模型风险团队需要审查的组件更少。',
  },
  problem: {
    title: '每条提示词都是一次*披露*。',
    statement:
      '值得自动化的工作都建立在客户数据之上，而把它发给别人的 API，是一个没人愿意每条提示词都做一次的披露决定。',
    body: '与此同时，模型风险团队想知道什么在哪里运行，审计想要可追溯的记录，财务想要每个工作负载的成本，却没人拿得出来。GPU 最终散落在各个工位和集群上，而服务栈是一堆每周都在变的依赖。',
  },
  useCases: {
    title: '留在*账内*的工作。',
    intro: '为同时对风险、财务和业务负责的平台团队准备的四件事。',
    items: [
      {
        tag: 'control',
        title: '在客户数据上使用 AI，无需把数据发出去。',
        body: 'Butter 在你运营的服务器上提供模型服务，无论是本地机房还是私有云，让提示词、文档和输出都留在你掌控的基础设施上。我们的默认原则是：除非你主动选择开启，数据始终留在原处。',
      },
      {
        tag: 'cost',
        title: '为每个工作负载算清成本。',
        body: '每个工作负载的成本，是财务部门要的数字，却几乎没人能看到。Syrup 显示哪些 GPU 正忙，上面跑着哪些引擎，哪些在闲置，让开支能对应回它完成的工作。',
      },
      {
        tag: 'inference',
        title: '用更少的组件提供服务。',
        body: 'Butter 把依赖降到最少；它兼容 OpenAI 的 API 意味着内部工具只需换一个地址，不用换 SDK。依赖更少，从审查到生产之间要跟踪的东西就更少。',
      },
      {
        tag: 'control',
        title: '从你自己的研究中作答，并附出处。',
        body: 'Whisk 在本地对内部笔记、文档和代码做检索，每个答案都附带引用返回。分析师可以去核对出处，而不必只信摘要。',
      },
    ],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro:
      'Butter 让工作留在内部，Syrup 为它算出数字，Whisk 带来出处，Iron 垫在底下。',
    items: [
      {
        product: 'butter',
        need: '在你的边界内提供模型服务。',
        body: 'macOS 和 iOS 上用 Swift、其他平台用 Rust，提供兼容 OpenAI 的服务，兼顾速度与内存安全。依赖极少，需要跟踪的供应链风险更少。它直接加载 safetensors、MLX、JANG 和 GGUF 检查点，所以新模型不需要转换流水线。',
      },
      {
        product: 'syrup',
        need: '为每个工作负载算出成本。',
        body: '一个视图看清每一块 GPU 和每个引擎，不论是 Butter、vLLM、SGLang 还是 llama.cpp。每台主机上的小型 Rust sidecar 上报带签名的遥测数据，所以你拿给财务的读数，可以追溯到发送它的那台主机。',
      },
      {
        product: 'whisk',
        need: '答案附带出处。',
        body: '对内部笔记、文档和代码做本地检索。搜索结合关键词与向量，结果通过 MCP 附带引用返回。',
      },
      {
        product: 'iron',
        need: '换厂商，不用重写。',
        body: '一份内核定义，转换为 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V。如果采购部门更换了 GPU 厂商，内核可以直接沿用，调优则逐个后端跟进。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: '与其在供应商评审时才听到，不如现在就在这里告诉你。产品目前处于抢先体验阶段，暂未开源；数据中心 GPU 目前完成的是首次运行，尚未投入生产。',
    notes: [
      '在 Apple 芯片、RTX 工作站或 DGX Spark 上规划试点，整套技术栈目前就运行在这些平台上。',
      'ROCm 和 Vulkan 可以运行，但尚未调优。',
      '我们不在本网站上作任何合规或认证声明。带着你的要求来，我们会直接回答。',
    ],
  },
  faq: [
    {
      question: '客户数据会离开我们的网络吗？',
      answer:
        '推理数据默认不会离开，因为除非你主动选择开启，数据始终留在机器上。每台 Syrup 主机运行一个 sidecar，上报带签名的遥测数据，我们会逐项讲清楚其中包含什么。',
    },
    {
      question: '我们能看到每个工作负载的成本吗？',
      answer:
        '这正是 Syrup 的用途。它显示每一块 GPU 和其上的引擎，无论正忙还是闲置，而这正是计算每个工作负载成本的起点。我们更愿意在你的硬件上展示，而不是承诺一个数字。',
    },
    {
      question: '它目前能在哪些硬件上运行？',
      answer:
        'Apple 芯片上的 Metal 是首要。NVIDIA 通过 CUDA 已在 RTX 和 DGX Spark 上投入生产，正在调优，并已在 H100、H200、B100 和 B200 上完成首次运行。AMD 方面，已在 MI300 上完成首次运行，ROCm 和 Vulkan 可以运行，但尚未调优。',
    },
    {
      question: '它是否通过了受监管工作负载的认证？',
      answer:
        '我们不作任何合规或认证声明。告诉我们你的监管机构和风险团队有什么要求，我们会具体回答。',
    },
    {
      question: '我们必须替换现在运行的东西吗？',
      answer:
        '不必。Syrup 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器，所以可以先获得可见性，引擎的决定可以往后放。',
    },
  ],
  cta: {
    title: '告诉我们什么*不能*离开。',
    body: '抢先体验，暂未开源。告诉我们哪些数据必须留在内部，以及你运行的是什么硬件，我们会坦率地告诉你今天哪些合适。',
  },
};

export default financialServicesZh;
