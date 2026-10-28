import type { smallBusiness } from './small-business';

const smallBusinessZh: (typeof smallBusiness)['en'] = {
  seo: {
    title: '小型企业的私有化 AI',
    description:
      '在你已有的 Mac Studio 或 RTX 工作站上运行私有 AI。数据留在你的机器上，没有按 token 计费的云账单。抢先体验中。',
    keywords: ['小型企业私有 AI', '本地 AI', '本地大模型', '无云成本的 AI'],
  },
  name: '小型企业',
  serviceType: '私有化本地 AI 推理软件',
  card: {
    title: '小型*企业*',
    summary: '在 Mac Studio 或 RTX 主机上运行私有 AI，没有云账单。',
  },
  hero: {
    title: '私有 AI，不再有*云*账单。',
    lede: '在你已有的 Mac Studio 或 RTX 工作站上运行开源模型。文件留在你的机器上，也不会按提问次数计费。',
  },
  problem: {
    title: '每次提问都有*标价*。',
    statement:
      'AI 最有用的时候，是处理你自己的文件，而账单和隐私问题恰恰也从这里开始。',
    body: '按 token 计价，让每次尝试都显得昂贵；把客户文档、发票或源代码发到别人的服务器上，也不是你想每问一句就做一次的决定。与此同时，你桌上的那台机器，本来就能运行 Llama、Gemma、Qwen 和 GPT-OSS 这样的开源模型。',
  },
  useCases: {
    title: '让这台机器*干活*。',
    intro: '小团队可以交给自己已有机器的四件事。',
    items: [
      {
        tag: 'cost',
        title: '不再为每个问题付费。',
        body: '在你已有的 Mac Studio 或 RTX 工作站上运行模型，让花销不再随每条提示、每份文档、每位同事而增长。重度使用变成一份电费，而不是一张意外的账单。',
      },
      {
        tag: 'control',
        title: '处理客户文件，不必把它们发往任何地方。',
        body: '模型、提示词和文档都留在你的机器上，除非你主动选择开启。总结合同、起草回复、核对发票，全程没有第三方参与。',
      },
      {
        tag: 'inference',
        title: '在你现有的机器上装下更大的模型。',
        body: '2 至 8 位量化检查点和量化 KV 缓存，让更大的模型和更长的对话装进你已有的内存里。Butter 直接从 Hugging Face 加载它们，无需转换。',
      },
      {
        tag: 'control',
        title: '向你自己的笔记和代码提问。',
        body: 'Whisk 在本地对你的笔记和代码做检索，所以每个答案都带着出处的引用。搜索结合关键词与向量，确切的名称和模糊的问题都能命中。',
      },
    ],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro: 'Butter 负责最重的活。Whisk 和 Syrup 在你需要时随时待命。',
    items: [
      {
        product: 'butter',
        need: '在你自己的机器上运行模型。',
        body: 'Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。Llama、Gemma、Qwen、GPT-OSS 等模型，可以与语音转文字、文字转语音和视觉模型一起运行，butter serve 则为你的应用提供兼容 OpenAI 的端点。',
      },
      {
        product: 'whisk',
        need: '向你自己的文件提问，并拿到出处。',
        body: '对你的笔记和代码做本地检索。结果通过 MCP 附带引用返回，让助理能亮出依据。',
      },
      {
        product: 'syrup',
        need: '盯着你桌下的那台机器。',
        body: '从一台机器到一个小机架，看清每一块 GPU 和其上运行的每个引擎，不论是 Butter、llama.cpp、vLLM 还是 SGLang。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: 'Waffuru 目前处于抢先体验阶段，产品暂未开源。对小团队来说，这意味着：',
    notes: [
      'Apple 芯片是每个内核最先调优的地方，所以 Mac Studio 是最顺畅的起点。',
      'NVIDIA RTX 工作站运行在 CUDA 上，已投入生产。AMD 和 Vulkan 可以运行，但尚未调优。',
      '模型覆盖面很广，而且还在扩大，DeepSeek V4 正在进行中。',
    ],
  },
  faq: [
    {
      question: '需要什么硬件？',
      answer:
        'Apple 芯片的 Mac 是支持最好的起点，因为每个内核都先在 Metal 上调优。RTX 工作站运行在 CUDA 上，DGX Spark 和 Strix Halo 也在支持之列。能运行多大的模型，取决于你有多少内存。',
    },
    {
      question: '本地模型能和最大的托管模型一样好吗？',
      answer:
        '并非每项任务都能，我们也不会假装可以。开源模型能胜任大量日常工作，而最难的任务，托管模型可能仍是更合适的工具。在本地运行，意味着你可以逐项任务做选择，而不是默认走云端。',
    },
    {
      question: '我的数据会离开我的机器吗？',
      answer:
        '除非你主动选择开启，否则不会。模型在本地运行，你的提示词、文件和笔记默认留在你的机器上。',
    },
    {
      question: '我还能继续用现在的应用吗？',
      answer:
        '如果它们使用 OpenAI API，通常可以。Butter 提供兼容 OpenAI、支持流式输出和工具调用的端点，很多工具只需要换一个地址。',
    },
    {
      question: '今天就能试用吗？',
      answer:
        '抢先体验按申请开放，产品暂未开源。告诉我们你想运行什么、用什么硬件，我们会回信。',
    },
  ],
  cta: {
    title: '在你*自己*的机器上运行。',
    body: '抢先体验，暂未开源。告诉我们你想运行什么、用什么硬件，我们会回信。',
  },
};

export default smallBusinessZh;
