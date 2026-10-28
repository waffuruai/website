import type { industriesOverview } from './overview';

const industriesOverviewZh: (typeof industriesOverview)['en'] = {
  seo: {
    title: '面向各行业的 AI 推理',
    description:
      'Waffuru 面向 GPU 云、金融服务、生命科学、政府和国防：为每个工作负载算清成本，运行在你掌控的硬件上。抢先体验。',
    keywords: [
      '行业 AI 推理',
      '私有 AI 基础设施',
      '自主可控 AI',
      '每个工作负载的 GPU 成本',
    ],
  },
  hero: {
    label: '行业',
    title: '一套技术栈，贴合你的*规则*。',
    lede: '每个行业都在各自的约束下运行 AI：哪些数据可以流动，谁来批准开支，允许使用哪些硬件。Waffuru 是从内核到记忆的一整套技术栈，让模型运行在你掌控的硬件上。选出你所在的行业。',
  },
  cards: {
    label: '按行业',
    title: '找到你的*行业*。',
    intro:
      '五个行业，一套技术栈。每个页面都会讲清你承受的压力、要做的事，以及目前能做到什么。',
  },
  values: {
    label: '各行业通用',
    title: '三个答案，适用于每个*行业*。',
    intro:
      '财务能拿到每个工作负载的成本。IT 要运维、要打补丁的组件更少。安全部门能确保数据留在你选定的硬件上。而 CEO 三者兼得，无需推倒重写。',
    items: [
      {
        tag: 'cost',
        title: '真正*重要*的数字。',
        body: '每个工作负载的成本，是财务部门要的数字，却几乎没人能看到。Syrup 显示每一块 GPU 和其上的每个引擎，让开支能对应回它完成的工作。',
        points: [
          '看清哪些 GPU 正忙、闲置或错配',
          '从你自有或租用的硬件中获得更多产出',
          '量化模型让现有内存装下更多',
        ],
      },
      {
        tag: 'inference',
        title: '更少的*组件*。',
        body: 'Butter 以极少的依赖提供模型服务：macOS 和 iOS 上用 Swift，其他平台用 Rust，运行在为每种后端调优的内核上。安全与极致性能兼得，无需妥协。要打的补丁更少，会出的故障更少，要解释的也更少。',
        points: [
          'Metal 优先，CUDA 调优中，ROCm 和 Vulkan 即将推出',
          '兼容 OpenAI 的服务，应用照常工作',
          '无需转换，直接加载 Hugging Face 模型',
        ],
      },
      {
        tag: 'control',
        title: '硬件由你*选择*。',
        body: '一份 Iron 内核定义，可转换为 Metal、CUDA、HIP 和 Vulkan；除非你选择使用托管的 AI 推理服务商，数据始终留在原处。更换厂商是一个决定，而不是一次重写。',
        points: [
          '本地机房、你自己的云，或一台工作站',
          'Syrup 支持 vLLM、SGLang 和 llama.cpp',
          '不被锁定在某一种引擎或某一家 GPU 厂商',
        ],
      },
    ],
  },
  cta: {
    title: '告诉我们你的*约束*。',
    body: '抢先体验，暂未开源。告诉我们你所在的行业、你的硬件，以及哪些东西不能离开大楼，我们会坦率地告诉你今天哪些合适。',
  },
};

export default industriesOverviewZh;
