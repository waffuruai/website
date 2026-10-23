import type { butter } from './butter';

const butterZh: (typeof butter)['en'] = {
  layer: '模型服务',
  tagline: '无需 Python 的模型服务。',
  summary:
    'Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。可加载 2 至 8 位量化检查点、混合模型和 MoE 模型，并支持量化 KV 缓存。',
  seo: {
    title: 'Butter：无需 Python 的大模型推理引擎',
    description:
      'Butter 是大模型推理引擎：Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。直接加载 Hugging Face 模型，并通过兼容 OpenAI 的 API 提供服务。',
    keywords: [
      '大模型推理引擎',
      '本地大模型推理',
      'Apple 芯片推理',
      '兼容 OpenAI 的服务',
      '量化 KV 缓存',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: '模型服务，*无需* Python。',
    lede: 'Butter 是一款推理引擎：Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。没有 Python，没有 JIT，模型直接从 Hugging Face 加载。',
    highlights: [
      {
        value: '4',
        label: '种检查点格式，无需转换即可加载',
      },
      {
        value: '2–8 bit',
        label: '量化检查点，并支持量化 KV 缓存',
      },
      { value: '无 Python', label: '也无 JIT' },
    ],
  },
  story: {
    heading: '省掉 Python，也省掉*转换*。',
    problem:
      '想让一个模型开口回答，通常意味着要有 Python 环境、一道转换步骤，以及一个边运行边编译的运行时。在笔记本或单卡机器上，这是横在你和一次回复之间的一大堆东西。',
    outcome:
      '把 Butter 指向 Hugging Face 上的模型。它会原样加载 safetensors、MLX、JANG 和 GGUF，butter serve 则在你已有的硬件上为你起一个兼容 OpenAI 的服务器。',
    outcomes: [
      '在 Mac 或 RTX 工作站上运行 2 至 8 位量化检查点、混合模型和混合专家（MoE）模型。',
      '让你已在用的工具指向兼容 OpenAI 的端点，支持流式输出和工具调用。',
      '借助量化 KV 缓存，让长上下文占用更少内存。',
    ],
  },
  capabilities: {
    heading: 'Butter 能*做什么*。',
    intro: '从加载检查点到流式输出 token，中间没有 Python。',
    items: [
      {
        title: '模型原样加载',
        body: '直接从 Hugging Face 拉取 safetensors、MLX、JANG 或 GGUF。没有转换步骤。',
      },
      {
        title: '量化、混合与 MoE',
        body: '运行 2 至 8 位量化检查点、混合模型和混合专家（MoE）模型。',
      },
      {
        title: '量化 KV 缓存',
        body: '以量化形式存放 KV 缓存，上下文变长时也能压低内存占用。',
      },
      {
        title: '兼容 OpenAI 的服务',
        body: 'butter serve 提供兼容 OpenAI 的 API，支持流式输出和工具调用。',
      },
      {
        title: '推测解码与 LoRA',
        body: '推测解码用于生成，LoRA 用于你自己训练的适配器。',
      },
      {
        title: '不止文本',
        body: '文本、视觉、语音转文字、文字转语音，以及全模态（omni）模型。',
      },
    ],
  },
  code: {
    heading: '启动服务，然后*提问*。',
    intro: 'Butter 使用 OpenAI API，你已在用的客户端可以直接指向它。',
    caption: '仅为示意。请把占位符替换为你的模型和端口。并非基准测试。',
  },
  specs: {
    heading: '技术*细节*。',
    intro: '给会细读的人看的细节。',
    rows: [
      {
        term: '运行时',
        detail:
          'Apple 芯片上是 Swift 搭配 Metal；CUDA 及其他平台是 Rust。无 Python，无 JIT。',
      },
      {
        term: '模型格式',
        detail: '直接从 Hugging Face 加载，无需转换。',
        chips: [
          { label: 'safetensors' },
          { label: 'MLX' },
          { label: 'JANG' },
          { label: 'GGUF' },
        ],
      },
      { term: '量化', detail: '2 至 8 位量化检查点。' },
      {
        term: '架构',
        detail: '混合模型和混合专家（MoE）模型。',
      },
      { term: 'KV 缓存', detail: '已量化。' },
      {
        term: '服务 API',
        detail: '兼容 OpenAI，通过 butter serve 启动。',
        chips: [
          { label: '流式输出' },
          { label: '工具调用' },
          { label: '推测解码' },
          { label: 'LoRA' },
        ],
      },
      {
        term: '模态',
        chips: [
          { label: '文本' },
          { label: '视觉' },
          { label: '语音转文字' },
          { label: '文字转语音' },
          { label: 'Omni' },
        ],
      },
      {
        term: '模型家族',
        groups: [
          { label: 'Meta', text: 'Llama 3, 3.1, 3.2, 3.3' },
          { label: 'Google', text: 'Gemma 2, 3, 4; PaliGemma' },
          { label: 'Qwen', text: '2, 3, 3.5, 3.6, 3.8; VL; Omni' },
          { label: 'OpenAI', text: 'GPT-OSS 20B, 120B; Whisper' },
          { label: 'Mistral', text: 'Mistral; Mistral 3 VL; Voxtral' },
          { label: 'NVIDIA', text: 'Nemotron H; Nemotron VLM' },
          { label: 'DeepSeek', text: 'V4', inProgress: true },
          { label: 'IBM', text: 'Granite 3, 4' },
          { label: 'Microsoft', text: 'Phi 3' },
          { label: 'Liquid AI', text: 'LFM2, LFM2.5' },
          { label: 'Ai2', text: 'OLMo 1, 2' },
          { label: 'Hugging Face', text: 'SmolLM; SmolVLM' },
          { label: 'TII', text: 'Falcon H1' },
          { label: 'AI21', text: 'Jamba' },
          { label: 'Apple', text: 'FastVLM' },
          { label: 'Shanghai AI Lab', text: 'InternLM 2' },
        ],
      },
      {
        term: '可用性',
        detail: '抢先体验期间为私有闭源。',
      },
    ],
  },
  platforms: {
    heading: '在*哪里*运行。',
    intro: 'Metal 是首要目标。CUDA 其次，ROCm 和 Vulkan 可以运行，但尚未调优。',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Apple 芯片上的 Swift 与 Metal：MacBook 和 Mac Studio。',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'CUDA 上的 Rust。已在 RTX 和 DGX Spark 上投入生产；数据中心 GPU 正在进行中。',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: '目前可以运行，尚未调优。',
      },
    ],
  },
  stack: {
    heading: '与其余*技术栈*协同工作。',
    intro:
      'Butter 在 Iron 编译的内核上运行模型。Waffle 可以把它和 vLLM、SGLang、llama.cpp 放在一起监看，Syrup 则让你的 AI 记得你在做什么。',
  },
  faq: [
    {
      question: 'Butter 开源吗？',
      answer:
        '目前不开源。抢先体验期间，Butter 为私有闭源。申请访问，有更多内容可以分享时，我们会写信给你。',
    },
    {
      question: '它能在什么硬件上运行？',
      answer:
        'Apple 芯片上的 Swift 与 Metal 是首要目标，从 MacBook 到 Mac Studio。CUDA 其次，已在 RTX 和 DGX Spark 上投入生产，数据中心 GPU 正在进行中。ROCm 和 Vulkan 目前可以运行，但尚未调优。',
    },
    {
      question: '能运行哪些模型？',
      answer:
        '目前覆盖上面列出的 Llama、Gemma、Qwen、GPT-OSS、Mistral、Nemotron、Granite、Phi 等模型家族，包括文本、视觉、语音和全模态变体。DeepSeek V4 正在进行中。',
    },
    {
      question: '需要 Python 吗？',
      answer:
        '不需要。Butter 在 Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust，没有 Python，也没有 JIT。',
    },
    {
      question: '我现有的工具能用吗？',
      answer:
        'Butter 通过 butter serve 提供兼容 OpenAI 的 API，包括流式输出和工具调用，所以使用该 API 的客户端都可以指向它。',
    },
    {
      question: '它有多快？',
      answer:
        '我们还没有发布基准测试数据，所以这里不引用任何数字。推测解码和量化 KV 缓存已内置，我们宁愿拿出一次测量结果，也不空口下结论。',
    },
  ],
  cta: {
    title: '让*延迟*融化。',
    body: 'Butter 目前处于抢先体验阶段，暂未开源。申请访问，等待期间可以先读文档。',
    docsLabel: '阅读文档',
  },
};

export default butterZh;
