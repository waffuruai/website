import type { neoclouds } from './neoclouds';

const neocloudsZh: (typeof neoclouds)['en'] = {
  seo: {
    title: 'GPU 云服务商的推理平台',
    description:
      '跨租户、跨引擎的集群可见性，每块 GPU 产出更多有用的 token，每台主机上报带签名的遥测。Syrup 支持 vLLM、SGLang 和 llama.cpp。抢先体验。',
    keywords: ['GPU 云软件', 'GPU 利用率', 'GPU 云推理平台', '多租户 GPU 监控'],
  },
  name: '新型云服务商',
  serviceType: 'GPU 集群可见性与推理软件',
  card: {
    title: '*新型云服务商*',
    summary: '跨租户与引擎的集群可见性，每块 GPU 产出更多有用的 token。',
  },
  hero: {
    title: '让你出租的每一块 *GPU* 产出更多。',
    lede: '看清跨租户、跨引擎的整个集群，并为客户运行的工作负载垫上按后端调优的内核。没有什么会把你锁在某一种引擎上。',
  },
  problem: {
    title: '一个你*看不见*的集群。',
    statement:
      '客户带来他们自己的引擎、版本和配置，而底层的 GPU 才是你要负责的那部分。',
    body: '仪表盘能告诉你一张卡很忙，却说不清上面跑的是什么、为谁而跑、跑得好不好。每个引擎的上报方式各不相同，每个租户带来的组合也各异，而闲置或错配的算力，就是你指不出来的收入。',
  },
  useCases: {
    title: '更紧凑的*集群*。',
    intro: '为维持 GPU 云运转的团队准备的四件事。',
    items: [
      {
        tag: 'cost',
        title: '知道每块 GPU 上在跑什么。',
        body: 'Syrup 提供跨主机、GPU、引擎和租户的统一视图，不论引擎是 vLLM、SGLang、llama.cpp 还是 Butter。闲置和错配的算力会最先出现在你的屏幕上。',
      },
      {
        tag: 'control',
        title: '信任仪表盘上的读数。',
        body: '每台主机运行一个小型 Rust sidecar，上报带签名的遥测数据，因此读数可以被验证确实来自发送它的那台主机。全集群的数字不必再凭信任接受。',
      },
      {
        tag: 'inference',
        title: '每块 GPU 产出更多有用的 token。',
        body: 'Butter 把按后端调优的内核，与量化模型、KV 缓存和推测解码结合在一起，目标都是每瓦 token 数。它与你的租户已选的引擎并肩运行，你可以在自己的集群上做对比。',
      },
      {
        tag: 'control',
        title: '提供更多选择，而不押注某一种引擎。',
        body: 'Butter 提供兼容 OpenAI 的 API，Syrup 支持 vLLM、SGLang 和 llama.cpp。你可以给客户更多选择，而不必围绕任何单一引擎重建。',
      },
    ],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro: 'Syrup 是为你打造的那一部分。Butter 和 Iron 负责底下的效率。',
    items: [
      {
        product: 'syrup',
        need: '看清整个集群。',
        body: '从桌下的一台机器，到出租集群的新型云服务商。每台主机上的小型 Rust sidecar 上报带签名的遥测数据，Syrup 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器。',
      },
      {
        product: 'butter',
        need: '一个由你掌控、依赖极少的引擎。',
        body: 'macOS 和 iOS 上用 Swift，其他平台用 Rust。量化检查点与 KV 缓存、推测解码和 LoRA 都在兼容 OpenAI 的 API 背后。',
      },
      {
        product: 'iron',
        need: '为你下一批采购的硬件准备的内核。',
        body: '一份内核定义，四种后端：Metal、CUDA、HIP/ROCm 和 Vulkan SPIR-V。版本化的 C 与 Rust ABI 让现有宿主可以直接调用。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: 'Syrup 和 Butter 目前处于抢先体验阶段，暂未开源。CUDA 已在 RTX 和 DGX Spark 上投入生产，数据中心 GPU 正在进行中。',
    notes: [
      '告诉我们你的 GPU 世代。数据中心级 CUDA 正在进行中，我们听到的集群情况会决定先做什么。',
      'ROCm 和 Vulkan 目前可以运行，但尚未调优。',
      '我们不声称 Butter 在 CUDA 或 ROCm 上胜过其他引擎。等我们发布测量结果时，会连同方法一起给出。',
    ],
  },
  faq: [
    {
      question: 'Syrup 会取代我们现有的引擎吗？',
      answer:
        '不会。Syrup 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器。先获得可见性，只在你想换的时候才换引擎。',
    },
    {
      question: '它能在哪些 GPU 上运行？',
      answer:
        'Apple 芯片上的 Metal 是首要。NVIDIA 通过 CUDA 其次，已在 RTX 和 DGX Spark 上投入生产，数据中心 GPU 正在进行中。AMD ROCm 和 Vulkan 可以运行，但尚未调优。',
    },
    {
      question: '我们为什么该信任这些遥测数据？',
      answer:
        '每台主机运行一个小型 Rust sidecar，上报带签名的遥测数据，因此读数可以被验证确实来自发送它的那台主机。欢迎问我们签名在你的环境里如何工作。',
    },
    {
      question: '它能找回多少利用率？',
      answer:
        '我们不会承诺一个百分比。看清集群是第一步，而每瓦 token 数和每个工作负载的成本，才是我们努力改善的数字。我们更愿意在你的集群上测量它们，而不是报给你一个数字。',
    },
    {
      question: '我们可以试用吗？',
      answer:
        '抢先体验按申请开放，产品暂未开源。告诉我们你的集群情况，我们会回信。',
    },
  ],
  cta: {
    title: '让我们看看你的*集群*。',
    body: '抢先体验，暂未开源。告诉我们你的 GPU、你的引擎，以及租户如何共用它们，我们会回信说明哪些合适。',
  },
};

export default neocloudsZh;
