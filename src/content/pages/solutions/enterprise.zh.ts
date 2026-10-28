import type { enterprise } from './enterprise';

const enterpriseZh: (typeof enterprise)['en'] = {
  seo: {
    title: '企业私有化部署大模型推理',
    description:
      '在本地机房或私有云运行大模型推理，让敏感数据留在你的边界之内，在一处看清每一块 GPU 和每个引擎。抢先体验。',
    keywords: [
      '私有化部署大模型推理',
      '私有 AI 基础设施',
      '自主可控 AI',
      'AI 数据隐私',
    ],
  },
  name: '大型企业',
  serviceType: '本地部署与私有云大模型推理软件',
  card: {
    title: '*大型企业*',
    summary:
      '在本地或私有云中运行推理，保护敏感数据，并用一个视图看清每一块 GPU。',
  },
  hero: {
    title: '私有 AI，*规则*由你定。',
    lede: '在你自己运营的硬件上运行模型，无论是本地机房还是私有云，让敏感数据继续待在原处。在一处看清每一块 GPU 和其上的每个引擎。',
  },
  problem: {
    title: '有些数据*不能*离开。',
    statement:
      '值得自动化的工作负载，都会接触客户记录、合同、源代码和受监管数据，而这恰恰是你不能随手发给别人 API 的那一类。',
    body: '于是制度说不行，团队却悄悄说行，而 GPU 散落在各个集群和云上，没有人能在一处看到全貌。安全部门想要一道边界，财务想要每个工作负载的一个数字，你的员工则想要一个拿来就能用的模型。',
  },
  useCases: {
    title: '留在*内部*的工作。',
    intro: '为同时对安全、财务和工程负责的平台团队准备的四件事。',
    items: [
      {
        tag: 'control',
        title: '在你自己的边界内提供模型服务。',
        body: '在你运营的服务器上运行 Butter，无论是本地机房还是私有云，让提示词、文档和输出都留在你掌控的基础设施上。我们的默认原则是：除非用户选择使用托管的 AI 推理服务商，数据始终留在用户自己的机器上。',
      },
      {
        tag: 'cost',
        title: '在一处看清每一块 GPU 和每个引擎。',
        body: 'Syrup 显示哪些 GPU 正忙，上面跑着哪些引擎，哪些在闲置，不论引擎是 Butter、vLLM、SGLang 还是 llama.cpp。这是决定合并、淘汰还是新购的起点。',
      },
      {
        tag: 'inference',
        title: '从已经买下的 GPU 里获得更多。',
        body: '按后端调优的内核、量化模型与 KV 缓存、推测解码，都是为了让每瓦、每一美元产出更多有用的 token。我们更愿意去测量你的工作负载，而不是报给你一个数字。',
      },
      {
        tag: 'control',
        title: '无需重写，让现有应用直接指向它。',
        body: 'Butter 兼容 OpenAI 的 API 支持流式输出和工具调用，内部工具只需换一个地址，不用换 SDK。没有什么会把你锁在某一种引擎上，因为 Syrup 与 vLLM、SGLang 和 llama.cpp 并肩工作。',
      },
    ],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro:
      'Butter 提供服务，Syrup 盯着全局，Whisk 负责检索，Iron 垫在这三者之下。',
    items: [
      {
        product: 'butter',
        need: '在你运营的服务器上提供模型服务。',
        body: 'macOS 和 iOS 上用 Swift、其他平台用 Rust，提供兼容 OpenAI 的服务，依赖极少。它直接加载 safetensors、MLX、JANG 和 GGUF 检查点，所以新模型到你的服务器之间，没有转换流水线。',
      },
      {
        product: 'syrup',
        need: '一个视图，看清每一块 GPU 和每个引擎。',
        body: '每台主机上的小型 Rust sidecar 上报带签名的遥测数据。Syrup 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器，所以采用它，并不意味着要替换已经在跑的东西。',
      },
      {
        product: 'whisk',
        need: '答案来自你自己的资料，并附引用。',
        body: '对内部笔记和代码做本地检索。搜索结合关键词与向量，结果通过 MCP 附带引用返回。',
      },
      {
        product: 'iron',
        need: '换硬件，不用重写。',
        body: '一份内核定义，转换为 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V，对外是版本化的 C 与 Rust ABI。当第二家厂商或新一代 GPU 到来时，内核可以直接沿用，调优则逐个后端跟进。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: '数据中心 GPU 目前完成的是首次运行，尚未投入生产，我们宁愿一开始就说清楚。产品目前处于抢先体验阶段，暂未开源。',
    notes: [
      '围绕 Apple 芯片、RTX 工作站和 DGX Spark 规划试点，整套技术栈目前就运行在这些平台上。',
      '已在 H100、H200、B100、B200 和 MI300 上完成首次运行。如果数据中心 GPU 是你的目标，请告诉我们是哪些，因为这会影响我们先调优什么。',
      'ROCm 和 Vulkan 可以运行，但尚未调优。',
    ],
  },
  faq: [
    {
      question: '可以在本地机房或私有云里运行吗？',
      answer:
        '它本来就是这样构建的。Butter 在你运营的硬件上提供模型服务，除非用户选择使用托管的 AI 推理服务商，数据始终留在用户自己的机器上。数据中心 GPU 已完成首次运行，所以请告诉我们你打算部署在哪些 GPU 上。',
    },
    {
      question: '目前支持哪些 GPU？',
      answer:
        '以 Metal 驱动的 Apple 芯片为首要，NVIDIA 通过 CUDA 已在 RTX 和 DGX Spark 上投入生产，正在调优，并已在 H100、H200、B100 和 B200 上完成首次运行。AMD 方面，已在 MI300 上完成首次运行，ROCm 和 Vulkan 可以运行，但尚未调优。',
    },
    {
      question: '我们必须替换现在运行的服务栈吗？',
      answer:
        '不必。Syrup 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器，所以你可以先获得可见性，再决定引擎的事。',
    },
    {
      question: '哪些数据会离开我们的网络？',
      answer:
        '推理数据默认不会离开，因为除非用户选择使用托管的 AI 推理服务商，数据始终留在用户自己的机器上。每台 Syrup 主机运行一个 sidecar，上报带签名的遥测数据，我们会针对你的环境，逐项讲清楚其中包含什么。',
    },
    {
      question: '我们如何评估？',
      answer:
        '告诉我们你的硬件和工作负载。我们会坦率地告诉你，它今天是否合适；抢先体验按申请开放。',
    },
  ],
  cta: {
    title: '把你的*工作负载*带来。',
    body: '抢先体验，暂未开源。告诉我们什么必须留在内部，以及你运行的是什么硬件，我们会坦率地告诉你今天哪些合适。',
  },
};

export default enterpriseZh;
