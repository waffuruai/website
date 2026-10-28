import type { productsOverview } from './overview';

const productsOverviewZh: (typeof productsOverview)['en'] = {
  seo: {
    title: 'Waffuru 技术栈：内核、推理、管控、记忆与智能体',
    description:
      'Iron 编译内核，Butter 在内核上运行模型，Syrup 管控 GPU，Whisk 融入记忆与上下文，Waffle 运行你的智能体。可单独使用，也可五者合用。',
    keywords: [
      'AI 推理技术栈',
      'GPU 内核到模型服务',
      '自有或租用硬件上的 AI 基础设施',
    ],
  },
  hero: {
    label: '五款产品',
    title: 'Waffuru *技术栈*。',
    lede: 'Iron 编译内核，Butter 在内核上运行模型，Syrup 管控 GPU，Whisk 融入记忆与上下文，Waffle 运行你的智能体，内置 W。五款产品都在你自有或租用的硬件上运行。',
  },
  layers: {
    heading: '五层如何*配合*。',
    intro:
      '从底层硬件往上编号。Waffle 在顶层，Iron 紧贴硬件，每一层都有自己的页面。',
    metal: {
      label: '底层硬件',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: '技术栈的五个层次',
  },
  together: {
    heading: '可以只用一个，也可以*全部*用上。',
    intro: '从解决眼下问题的那一层开始。需要时，再加上下一层。',
    aloneLabel: '单独使用',
    alone: {
      iron: '一次编写 GPU 内核，在 Metal、CUDA、ROCm 和 Vulkan 上运行。',
      butter: '通过兼容 OpenAI 的 API 提供模型服务，不被 Python 挡路。',
      syrup: '看清每一块 GPU 和其上运行的每个引擎，不论是哪种引擎。',
      whisk: '让你的 AI 对你的笔记和代码拥有本地记忆，并附带引用。',
      waffle: '在同一个框架里运行你的智能体，内置你的助手 W。',
    },
    allLabel: '组合使用',
    all: 'Butter 在 Iron 编译的内核上运行模型，Syrup 管控它们之下的 GPU 与引擎，Whisk 融入记忆与上下文，Waffle 在最上层运行你的智能体。你每加一层，都建立在下面各层之上。',
  },
  audience: {
    heading: '适合*谁*。',
    intro: '选一个听起来像你的页面。',
    items: {
      smallBusiness: '在你已有的 Mac 和工作站上运行私有 AI。',
      enterprise: '运行由你掌控的推理，部署在本地或你自己的云上。',
      neoclouds: '看清集群中的每一块 GPU，以及其上运行的每个引擎。',
      aiCompanies:
        '一次编写内核，在 Metal、CUDA、ROCm 和 Vulkan 上提供模型服务。',
    },
  },
  cta: {
    title: '从你需要的*那一层*开始。',
    body: '整套技术栈目前处于抢先体验阶段，暂未开源。申请访问，并告诉我们你最想先用哪一层。',
  },
};

export default productsOverviewZh;
