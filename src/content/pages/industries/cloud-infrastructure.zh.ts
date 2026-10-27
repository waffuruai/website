import type { cloudInfrastructure } from './cloud-infrastructure';

const cloudInfrastructureZh: (typeof cloudInfrastructure)['en'] = {
  seo: {
    title: 'GPU 云与托管服务商的推理软件',
    description:
      '面向 GPU 云和托管服务商：看清每一块 GPU、每个引擎和每个租户，让每个 GPU 小时产出更多，并在多家厂商的硬件上提供服务。抢先体验。',
    keywords: [
      '托管推理平台',
      'GPU 托管软件',
      'GPU 利用率',
      '每 GPU 小时收入',
      '多厂商 GPU 推理',
    ],
  },
  name: '云基础设施',
  serviceType: 'GPU 集群可见性与托管推理软件',
  card: {
    title: '云*基础设施*',
    summary:
      '面向 GPU 云和托管服务商：每个 GPU 小时产出更多，看清每个租户，并支持不止一家厂商。',
  },
  hero: {
    title: '让每个 GPU 小时都在*创收*。',
    lede: '你按小时出售算力，并为其上运行的东西负责。在一处看清每一块 GPU、每个引擎和每个租户，提供你敢于担保的托管推理，并在不同 GPU 厂商之间保留选择余地。',
  },
  problem: {
    title: '闲置的小时*开不出*账单。',
    statement:
      '每个 GPU 小时的收入和毛利决定着你的生意，而集群很少告诉你其中任何一个。',
    body: '租户带来他们自己的引擎和配置，每家厂商的上报方式各不相同，成本落在显卡上，而不是落在用了它的客户身上。客户如今想要的是托管推理，而不只是裸金属，而在脆弱的 Python 技术栈上构建它，风险由你替他们承担。',
  },
  useCases: {
    title: '每个*机架*产出更多。',
    intro: '为出售 GPU 算力的团队准备的四件事。',
    items: [
      {
        tag: 'cost',
        title: '知道每块 GPU 在做什么。',
        body: 'Waffle 提供跨主机、GPU、引擎和租户的统一视图，不论引擎是 Butter、vLLM、SGLang 还是 llama.cpp。闲置和错配的算力会先出现在你的屏幕上，而不是先体现在毛利里。',
      },
      {
        tag: 'control',
        title: '看清哪个租户在跑什么。',
        body: '归因成本，始于知道谁在哪张卡上跑了什么。每台主机运行一个小型 Rust sidecar，上报带签名的遥测数据，因此读数可以被验证确实来自发送它的那台主机。',
      },
      {
        tag: 'inference',
        title: '提供你敢于担保的托管推理。',
        body: 'Butter 提供兼容 OpenAI 的 API，支持流式输出和工具调用，服务路径上没有 Python，也没有 JIT。组件更少，意味着要打的补丁更少，在别人的工作负载下会出的故障也更少。',
      },
      {
        tag: 'control',
        title: '机架上不止一家厂商。',
        body: 'Iron 把一份内核定义转换为 Metal、CUDA、HIP/ROCm 和 Vulkan SPIR-V，对外是版本化的 C 与 Rust ABI。新增一家 GPU 厂商，变成调优工作，而不是第二套代码库。',
      },
    ],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro: '从 Waffle 开始。Butter 和 Iron 负责提升底层的产出。',
    items: [
      {
        product: 'waffle',
        need: '一个视图，看清每一块 GPU、每个引擎和每个租户。',
        body: '每台主机上的小型 Rust sidecar 上报带签名的遥测数据。Waffle 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器，所以租户可以继续使用他们选定的引擎。',
      },
      {
        product: 'butter',
        need: '组件更少的托管推理。',
        body: 'Metal 上用 Swift，CUDA 上用 Rust，服务路径上没有 Python，也没有 JIT。量化检查点与 KV 缓存、推测解码和 LoRA 都在兼容 OpenAI 的 API 背后。',
      },
      {
        product: 'iron',
        need: '跟着你换到下一家厂商的内核。',
        body: '一份内核定义，转换为 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V。版本化的 C 与 Rust ABI 让你已经托管的引擎可以直接调用。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: '先说对 GPU 云最重要的一点：数据中心 GPU 正在进行中。Waffle、Butter 和 Iron 目前处于抢先体验阶段，暂未开源。',
    notes: [
      'CUDA 已在 RTX 和 DGX Spark 上投入生产。告诉我们你的数据中心 GPU 世代，因为我们听到的集群情况会决定先做什么。',
      'ROCm 和 Vulkan 目前可以运行，但尚未调优。',
      '我们不声称 Butter 在 CUDA 或 ROCm 上胜过其他引擎。等我们发布测量结果时，会连同方法一起给出。',
    ],
  },
  faq: [
    {
      question: '我们的租户必须更换引擎吗？',
      answer:
        '不必。Waffle 支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器。租户继续运行他们现有的东西，你则获得覆盖全部的统一视图。',
    },
    {
      question: '它支持哪些 GPU？',
      answer:
        'Apple 芯片上的 Metal 是首要。NVIDIA 通过 CUDA 其次，已在 RTX 和 DGX Spark 上投入生产，数据中心 GPU 正在进行中。AMD ROCm 和 Vulkan 可以运行，但尚未调优。',
    },
    {
      question: '它能为我们的毛利增加多少？',
      answer:
        '我们不会承诺一个数字。第一步是看清每块 GPU 在跑什么、为谁而跑。之后，每个 GPU 小时的产出和每个工作负载的成本，才是我们努力改善的数字，并在你的集群上测量。',
    },
    {
      question: '我们为什么该信任这些遥测数据？',
      answer:
        '每台主机运行一个小型 Rust sidecar，上报带签名的遥测数据，因此读数可以被验证确实来自发送它的那台主机。欢迎问我们签名在你的环境里如何工作。',
    },
    {
      question: '我们如何获得访问权限？',
      answer:
        '抢先体验按申请开放，产品暂未开源。告诉我们你的集群、你的厂商和你的租户情况，我们会回信。',
    },
  ],
  cta: {
    title: '让我们看看你的*机架*。',
    body: '抢先体验，暂未开源。告诉我们你的 GPU、你的引擎，以及租户如何共用它们，我们会坦率地告诉你今天哪些合适。',
  },
};

export default cloudInfrastructureZh;
