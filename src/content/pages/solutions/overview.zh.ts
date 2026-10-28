import type { solutionsOverview } from './overview';

const solutionsOverviewZh: (typeof solutionsOverview)['en'] = {
  seo: {
    title: 'AI 推理解决方案',
    description:
      'Waffuru 面向小型企业、大型企业、新型云服务商和 AI 公司的本地优先 AI 技术栈：更低的单位工作负载成本、更好的推理，以及更多掌控。',
    keywords: ['AI 推理解决方案', '本地优先 AI'],
  },
  hero: {
    label: '解决方案',
    title: '本地优先的 AI，贴合你的*工作*。',
    lede: 'Waffuru 是从内核到记忆的一整套技术栈，让模型在你已有的硬件上快速运行。选一个最接近你想完成之事的页面。',
  },
  cards: {
    label: '适合谁',
    title: '找到你的*座位*。',
    intro:
      '四类对象，一套技术栈。每个页面都会讲清问题、任务，以及目前能做到什么。',
  },
  values: {
    label: '不变的部分',
    title: '三个理由，*人人*适用。',
    intro: '每类对象有各自的任务，而这三点对所有人都成立。',
    items: [
      {
        tag: 'cost',
        title: '每个工作负载的*成本*。',
        body: '当电力成为天花板，每瓦 token 数和每个工作负载的成本，就是你仍能继续优化的指标。Waffuru 围绕这两者而建。',
        points: [
          '在你已有的硬件上运行，而不是租用',
          '量化模型让现有内存装下更多',
          'Syrup 显示哪里的算力在闲置',
        ],
      },
      {
        tag: 'inference',
        title: '更好的*推理*。',
        body: '为每种后端调优的内核，量化模型与 KV 缓存，以及推测解码，运行在热路径上没有 Python 的引擎里。',
        points: [
          'Metal 优先，其次 CUDA，ROCm 和 Vulkan 可运行',
          '无需转换，直接加载 Hugging Face 模型',
          '文本、视觉、语音和全模态模型',
        ],
      },
      {
        tag: 'control',
        title: '更多*掌控*。',
        body: '本地优先：除非你主动选择开启，数据始终留在原处，无论是在笔记本、本地机房还是你自己的云上。',
        points: [
          '兼容 OpenAI 的服务，应用照常工作',
          'Syrup 支持 vLLM、SGLang 和 llama.cpp',
          '不被锁定在某一种引擎或某一家厂商',
        ],
      },
    ],
  },
  cta: {
    title: '请*入座*。',
    body: '抢先体验，暂未开源。告诉我们你想运行什么，我们会回信。',
  },
};

export default solutionsOverviewZh;
