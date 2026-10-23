import type { productsOverview } from './overview';

const productsOverviewZh: (typeof productsOverview)['en'] = {
  seo: {
    title: 'Waffuru 技术栈：内核、推理、管控与记忆',
    description:
      'Iron 编译内核，Butter 在内核上运行模型，Waffle 盯着 GPU，Syrup 记得你在做什么。可单独使用，也可四者合用。',
    keywords: ['AI 推理技术栈', 'GPU 内核到模型服务', '本地优先 AI 基础设施'],
  },
  hero: {
    label: '四款产品',
    title: 'Waffuru *技术栈*。',
    lede: 'Iron 编译内核，Butter 在内核上运行模型，Waffle 盯着 GPU，Syrup 记得你在做什么。四款产品都为在你已有的硬件上运行而打造。',
  },
  layers: {
    heading: '四层如何*配合*。',
    intro:
      '从底层硬件往上编号。Syrup 在顶层，Iron 紧贴硬件，每一层都有自己的页面。',
    metal: {
      label: '底层硬件',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: '技术栈的四个层次',
  },
  together: {
    heading: '可以只用一个，也可以*全部*用上。',
    intro: '从解决眼下问题的那一层开始。需要时，再加上下一层。',
    aloneLabel: '单独使用',
    alone: {
      iron: '一次编写 GPU 内核，在 Metal、CUDA、ROCm 和 Vulkan 上运行。',
      butter: '通过兼容 OpenAI 的 API 提供模型服务，不被 Python 挡路。',
      waffle: '看清每一块 GPU 和其上运行的每个引擎，不论是哪种引擎。',
      syrup: '让你的 AI 对你的笔记和代码拥有本地记忆，并附带引用。',
    },
    allLabel: '组合使用',
    all: 'Butter 在 Iron 编译的内核上运行模型，Waffle 盯着它们之下的 GPU 与引擎，Syrup 记得你在做什么。你每加一层，都建立在下面各层之上。',
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
