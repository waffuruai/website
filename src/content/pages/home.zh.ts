import type { home } from './home';

const homeZh: (typeof home)['en'] = {
  seo: {
    keywords: [
      '本地大模型推理',
      'GPU 内核',
      '推理引擎',
      'Apple 芯片',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'GPU 集群管理',
      '新型云服务商',
      '端侧 AI',
      '私有化部署 AI',
    ],
  },

  hero: {
    eyebrow: '四款产品 · 暂未开源',
    title: '原始数学，*压*进芯片。',
    lede: '我们编写 GPU 内核、推理引擎、控制平面和检索层，让你的团队在自己的硬件上运行模型。它们可以跑在一台笔记本、一个家庭实验室或一支 neocloud 集群上，而且我们公开自己测到的结果。',
    secondary: { label: '查看技术栈', href: '#stack' },
    emits: {
      label: '生成',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: '技术栈。',
    intro:
      'Iron 编译内核，Butter 在内核上运行模型，Waffle 盯着 GPU，Syrup 记得你在做什么。',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: '记忆',
        name: 'Syrup',
        tagline: '让你的 AI 记得你在做什么。',
        body: '对你的笔记和代码做本地检索。嵌入向量用 TurboQuant+ 压缩，搜索结合关键词与向量，结果通过 MCP 返回，并附带引用。',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: '控制平面',
        name: 'Waffle',
        tagline: '看清每一块 GPU 和其上运行的每个引擎。',
        body: '面向 GPU 上大模型的控制平面，从桌下的一台机器，到出租集群的新型云服务商。每台主机运行一个小型 Rust sidecar，上报带签名的遥测数据。支持 Butter、vLLM、SGLang、llama.cpp 以及其他兼容 OpenAI 的服务器。',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: '模型服务',
        name: 'Butter',
        tagline: '无需 Python 的模型服务。',
        body: 'Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。可加载 2 至 8 位量化检查点、混合模型和 MoE 模型，并支持量化 KV 缓存。',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: '内核',
        name: 'Iron',
        tagline: '一次定义内核，生成四种后端。',
        body: '嵌入 Rust 的 DSL。内核先转换为共享 IR，再生成 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V。版本化的 C 与 Rust ABI 让现有宿主可以直接调用。',
      },
    ],
  },

  team: {
    title: '谁在*厨房*里。',
    intro: '研究、安全、营收，还有几位曾把产品做出来的创始人。',
    portraitAlt: '{name} 的肖像',
    link: { label: '认识团队', href: '/about/team' },
  },

  cta: {
    title: '请入座。',
    body: '目前一切尚未公开。申请抢先体验，或者在下方留下邮箱，等有消息时我们会写信给你。',
  },
};

export default homeZh;
