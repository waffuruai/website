import type { military } from './military';

const militaryZh: (typeof military)['en'] = {
  seo: {
    title: '面向军事与国防的私有 AI 推理',
    description:
      '在自有的基础设施上部署强大的模型，从设备端的野外机器人，到野外工作站、指挥中心或私有云。抢先体验。',
    keywords: [
      '国防 AI 基础设施',
      '军事 AI 推理',
      '国防私有化部署大模型',
      '自有硬件运行 AI',
      '本地优先 AI',
    ],
  },
  name: '国防',
  serviceType: '面向国防的本地部署 AI 推理软件',
  card: {
    title: '*国防*',
    summary:
      '在自有并由你保障安全的硬件上运行强大的 AI，体量小到足以逐项清点。',
  },
  hero: {
    title: '在*自有*硬件上运行强大的 AI。',
    lede: '把技术栈部署在你自己的基础设施上，从设备端运行的野外机器人和防御系统，到你在野外的工作站、指挥中心或私有云。服务栈很精简，依赖极少，需要加固的更少，需要信任的也更少。',
  },
  problem: {
    title: '每个依赖都是一扇*门*。',
    statement:
      '任务数据不能进入别人的云，运行模型的硬件也必须是你拥有、持有并保障安全的硬件。',
    body: '大多数 AI 服务栈都带着一长串第三方包和某家厂商的运行时，每一样都需要审查、打补丁和跟踪。硬件来自当时签约的供应商，本该运行模型的机器从工位散落到机架，没有一个统一视图能看清什么在哪里运行。',
  },
  useCases: {
    title: '更小的*体量*。',
    intro: '为需要把所运行的 AI 交代清楚的团队准备的四件事。',
    items: [
      {
        tag: 'control',
        title: '在自有并由你保障安全的硬件上运行模型。',
        body: 'Butter 在你持有的机器上提供模型服务，从 Mac Studio 到 RTX 工作站和 DGX Spark。除非你选择使用托管的 AI 推理服务商，提示词、文档和输出都留在这些硬件上。',
      },
      {
        tag: 'inference',
        title: '砍短依赖链。',
        body: 'Butter 在 macOS 和 iOS 上用 Swift，其他平台用 Rust，依赖极少。组件更少，意味着要审查的更少，要打的补丁更少，在关键时刻出故障的可能也更少。',
      },
      {
        tag: 'control',
        title: '在模型到来之前，先加固机器。',
        body: 'Pantry 是我们免费开源的扫描器，它会找出真正适用于某台 macOS 或 Linux 机器的漏洞，并修复能安全修复的部分。在每一台将要承载模型的机器上运行它。',
        link: { label: '了解 Pantry', href: '/products/pantry' },
      },
      {
        tag: 'cost',
        title: '清点你买下的每一块 GPU。',
        body: 'Syrup 显示每一块 GPU 和其上的每个引擎，无论正忙还是闲置，覆盖 Mac、工作站和机架。闲置的算力，会在下一次采购之前先显现出来。',
      },
    ],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro: 'Butter 运行模型，Syrup 清点硬件，Iron 为下一个平台留好余地。',
    items: [
      {
        product: 'butter',
        need: '需要审查的东西很少的服务栈。',
        body: 'macOS 和 iOS 上用 Swift、其他平台用 Rust，提供兼容 OpenAI 的服务，兼顾速度与内存安全。依赖极少，供应链攻击的可乘之机更少。它直接加载 safetensors、MLX、JANG 和 GGUF 检查点，无需转换步骤。',
      },
      {
        product: 'syrup',
        need: '你拥有的每一块 GPU，尽在一个视图中。',
        body: '每一块 GPU 和其上的每个引擎，不论是 Butter、vLLM、SGLang 还是 llama.cpp。每台主机上的小型 Rust sidecar 上报带签名的遥测数据。',
      },
      {
        product: 'iron',
        need: '现在用通用硬件，以后可换其他平台。',
        body: '一份内核定义，转换为 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V，对外是版本化的 C 与 Rust ABI，所以更换硬件并不意味着一套新的代码库。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: '产品目前处于抢先体验阶段，暂未开源。我们不作任何合规、认证或资质认定声明，宁愿在这里说清，也不想等到评审时才说。',
    notes: [
      'Apple 芯片是每个内核最先调优的地方。CUDA 已在 RTX 和 DGX Spark 上投入生产，并已在 H100、H200、B100 和 B200 上完成首次运行。',
      'AMD 方面，已在 MI300 上完成首次运行。ROCm 和 Vulkan 可以运行，但尚未调优。',
      '模型放到你的机器上之后，大部分技术栈都能离线运行。物理隔离环境的支持即将推出。',
      '告诉我们你的安全要求和你的硬件，我们会具体回答。',
    ],
  },
  faq: [
    {
      question: '会有任何东西离开我们的机器吗？',
      answer:
        '推理数据默认不会离开：模型在你运营的硬件上运行，除非你选择使用托管的 AI 推理服务商，数据始终留在那里。每台 Syrup 主机运行一个 sidecar，上报带签名的遥测数据，我们会逐项讲清楚其中包含什么。',
    },
    {
      question: '它能在哪些硬件上运行？',
      answer:
        '你可以购买并持有的通用硬件。Apple 芯片上的 Metal 是首要，NVIDIA 通过 CUDA 已在 RTX 和 DGX Spark 上投入生产，并已在 H100、H200、B100 和 B200 上完成首次运行。AMD 方面，已在 MI300 上完成首次运行，ROCm 和 Vulkan 可以运行，但尚未调优。',
    },
    {
      question: '依赖极少，为什么重要？',
      answer:
        '服务栈里的每个包，都需要审查、打补丁和跟踪。Butter 把依赖降到最少，macOS 和 iOS 上用 Swift，其他平台用 Rust，所以从模型到答案之间的链条更短。',
    },
    {
      question: '它能离线运行吗？',
      answer:
        '大部分可以，前提是模型已经放到你的机器上。对物理隔离环境的完整支持即将推出。告诉我们你的环境，我们会告诉你目前哪些部分能在那里运行。',
    },
    {
      question: '你们是否具备国防工作的资质认定？',
      answer:
        '我们不作任何合规、认证或资质认定声明。告诉我们你的项目有什么要求，我们会具体回答。',
    },
    {
      question: '我们如何开始？',
      answer:
        '抢先体验按申请开放，产品暂未开源。告诉我们你的硬件，以及哪些东西必须留在上面，我们会回信。',
    },
  ],
  cta: {
    title: '把你的*硬件*带来。',
    body: '抢先体验，暂未开源。告诉我们你运行的是什么，以及哪些东西必须留在上面，我们会坦率地告诉你今天哪些合适。',
  },
};

export default militaryZh;
