import type { butter } from './butter';

const butterZh: (typeof butter)['en'] = {
  layer: '模型服务',
  tagline: '无需 Python 的模型服务。',
  summary:
    'Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。可加载 2 至 8 位量化检查点、混合模型和 MoE 模型，并通过兼容 OpenAI 和 Anthropic Messages 的 API 提供服务。',
  seo: {
    title: 'Butter：无需 Python 的大模型推理引擎',
    description:
      'Butter 是大模型推理引擎：Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。通过兼容 OpenAI 和 Anthropic Messages 的 API 提供 Hugging Face 模型服务，为智能体框架而建。',
    keywords: [
      '大模型推理引擎',
      '本地大模型推理',
      'Apple 芯片推理',
      '兼容 OpenAI 的服务',
      'Anthropic Messages API 服务',
      '量化 KV 缓存',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: '模型服务，*无需* Python。',
    lede: 'Butter 是一款推理引擎：Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。没有 Python，Metal 内核预编译交付，模型直接从 Hugging Face 加载。',
    highlights: [
      {
        value: '4',
        label: '种检查点格式，无需转换即可加载',
      },
      {
        value: '2–8 bit',
        label: '量化检查点，并支持量化 KV 缓存',
      },
      { value: '2 套 API', label: '兼容 OpenAI 与 Anthropic Messages' },
    ],
  },
  story: {
    heading: '你的模型。你的硬件。*不再*按 token 付费。',
    problem:
      '大多数团队按 token 租用 AI。每条提示都离开公司，账单随用户增长，而已经买下的硬件却闲置着。在内部运行模型通常需要专门团队和数周的部署。',
    outcome:
      'Butter 把你已有的 Mac 或 GPU 工作站变成私有的 AI 服务器。选一个模型，启动 Butter，团队的应用和智能体当天就能用上。',
    outcomes: [
      '降低成本：开放模型运行在你已付费的硬件上，经过压缩，一台机器就能服务更多人、更长的对话。没有按 token 计费。',
      '数据留在内部：提示、文档和回答从不离开你的机器。',
      '上游无需改动：Butter 使用你的工具已在用的 OpenAI 与 Anthropic API，切换只需改一个 URL。',
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
        body: '运行 2 至 8 位量化检查点、MXFP4 和 NVFP4 块缩放检查点、混合模型和混合专家（MoE）模型。',
      },
      {
        title: '装得下的 KV 缓存',
        body: 'KV 缓存可以用 4 位或 8 位存放，或用 AURA 压缩。每个缓存都是上下文上限处的环形缓冲：长会话会带着警告淘汰最旧的 token，而不是让请求失败。',
      },
      {
        title: '两套 API，一个服务器',
        body: 'butter serve 同时支持 OpenAI Chat Completions API 和 Anthropic Messages API，提供流式输出、结构化工具调用、独立字段中的推理内容，以及跨轮复用的提示前缀。',
      },
      {
        title: '推测解码与 LoRA',
        body: '生成时可用推测解码；LoRA 则用于你自己训练的适配器。',
      },
      {
        title: '不止文本',
        body: '文本、视觉、语音转文字、文字转语音和全模态（omni）模型。',
      },
    ],
  },
  code: {
    heading: '启动服务，然后*提问*。',
    intro: 'Butter 使用 OpenAI API，你已在用的客户端可以直接指向它。',
    caption: '仅为示意。请把占位符替换为你的模型和端口。并非基准测试。',
  },
  extras: [
    {
      id: 'agents',
      heading: '与你的*智能体*框架协同工作。',
      intro: 'Butter 是服务器。你的框架保留自己的循环、工具、审批和压缩。',
      items: [
        {
          title: '两套 API，一个会话',
          body: 'OpenAI 的 Chat Completions 和 Completions，以及带 system 块、tool_use 与 tool_result 历史和 thinking 块的 Anthropic Messages API。设置一个基础 URL 即可。',
        },
        {
          title: '结构化的流式工具调用',
          body: '工具调用以 JSON 返回，id 在多轮之间保持唯一，并以增量流式输出。参数类型遵循你的 schema：整数就是整数。',
        },
        {
          title: '推理可见或隐藏',
          body: '按请求开启或关闭思考。开启时，推理内容以独立字段或 thinking 块流式返回，答案保持干净。',
        },
        {
          title: '在多轮工具调用间保留的提示前缀',
          body: '第二轮不会重新预填你的系统提示和工具列表。usage.cached_tokens 和 cache_read_input_tokens 会报告复用了多少。',
        },
        {
          title: '取消就是取消',
          body: '关闭连接，该请求就会停止，无论是在预填还是解码中途。剩余工作不会执行，其他请求照常进行。',
        },
        {
          title: '上下文会降级，而不是报错',
          body: '上下文预算会在 /v1/models 中报告。超过上限后，缓存会带着警告淘汰最旧的 token，而不是让循环失败。',
        },
      ],
      note: '已通过 Oh My Pi（Chat Completions）和 Claude Code 风格客户端（Messages）在 Qwen 3.6、Qwen 3.8 和 Flint 上做过端到端验证。',
    },
    {
      id: 'quirks',
      heading: '我们替你的智能体处理模型的*怪癖*。',
      intro:
        '每个模型家族都有自己的模板、token 和习惯。Butter 在服务器端把它们消化掉。',
      items: [
        {
          title: '聊天模板与 token',
          body: 'Nanbeige 的模板保留其空白，Qwen GGUF 的控制 token 保持完整，数字按检查点的边界分词，因此提示与官方分词器一致，工具调用能够解析。Gemma 和 InternLM 在轮次结束时停止，而不是胡言乱语。',
        },
        {
          title: '推理控制',
          body: '思考块与答案分离，并在多轮工具调用间保留，以便前缀缓存存活。Flint 的推理可以设置 token 预算和过渡消息。',
        },
        {
          title: '工具调用',
          body: 'Qwen 的 XML 工具调用会变成带类型的 JSON，在回复和回放的历史中都是如此。没有声明工具的回复绝不会被当作调用；不支持的 tool_choice 会被预先拒绝，而不是被静默忽略。',
        },
        {
          title: '音频前端',
          body: 'Whisper 系列模型使用其训练时的 Slaney 梅尔滤波器组，Qwen3-ASR 的语言头会从转写中去除，Kokoro 检查点会路由到 Kokoro 而不是 StyleTTS2。',
        },
        {
          title: '加载器与内存',
          body: '共享嵌入的 GGUF 无需输出头即可加载，仅有 SentencePiece 的仓库也能分词，流式文本保留空格，超出缓存的 Qwen 对话会恢复而不是被拒绝。',
        },
      ],
    },
  ],
  specs: {
    heading: '技术*细节*。',
    intro: '给会细读的人看的细节。',
    rows: [
      {
        term: '运行时',
        detail:
          'Apple 芯片上是 Swift 搭配 Metal，需要 macOS 14 或更高版本；CUDA 及其他平台是 Rust。无 Python。',
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
      {
        term: '量化',
        detail:
          '2、3、4、5、6 和 8 位仿射量化检查点，位宽按张量推导。MXFP4 和 NVFP4 块缩放检查点。CUDA 上支持 block FP8。',
      },
      {
        term: '架构',
        detail:
          '稠密模型、混合模型（注意力与循环结构混合）和混合专家（MoE）模型。',
      },
      {
        term: 'KV 缓存',
        detail:
          '量化：4 位或 8 位仿射量化，或 AURA 压缩。每个缓存都是上下文上限处的环形缓冲。',
      },
      {
        term: '服务 API',
        detail:
          'OpenAI Chat Completions 和 Completions、Anthropic Messages、分词与 token 计数路由、健康检查、就绪检查和 Prometheus 指标。通过 butter serve 启动，用 --parallel 设置并发会话数。',
        chips: [
          { label: '流式输出' },
          { label: '工具调用' },
          { label: '推理字段' },
          { label: '前缀复用' },
          { label: '视觉输入' },
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
          { label: 'DeepSeek', text: 'V4' },
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
    intro:
      'Metal 是首要目标。CUDA 其次，通过 ROCm 和 Vulkan 支持的 AMD 进展迅速。',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Apple 芯片上的 Swift 与 Metal，macOS 14 或更高版本：MacBook、Mac mini 和 Mac Studio。',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'CUDA 上的 Rust。已在 RTX 和 DGX Spark 上投入生产。',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: '通过 ROCm 和 Vulkan 支持 AMD，进展迅速。',
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
        'Apple 芯片上的 Swift 与 Metal 是首要目标，从 MacBook 到 Mac Studio，需要 macOS 14 或更高版本。CUDA 其次，已在 RTX 和 DGX Spark 上投入生产。通过 ROCm 和 Vulkan 支持 AMD，进展迅速。',
    },
    {
      question: '能运行哪些模型？',
      answer:
        '目前覆盖上面列出的 Llama、Gemma、Qwen、GPT-OSS、Mistral、Nemotron、Granite、Phi 等模型家族，包括文本、视觉、语音和全模态变体。',
    },
    {
      question: '需要 Python 吗？',
      answer:
        '不需要。Butter 在 Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust，服务路径上没有任何 Python。',
    },
    {
      question: '我现有的工具和智能体框架能用吗？',
      answer:
        'Butter 用一个 butter serve 进程同时提供 OpenAI Chat Completions API 和 Anthropic Messages API，支持流式输出、结构化工具调用、推理字段和复用的提示前缀。使用任一 API 的客户端都可以指向它。',
    },
    {
      question: '它有多快？',
      answer:
        '在一台 128 GB 的 M5 Max 上，Butter 以 4-bit 运行 Qwen3.8-27B，单个请求达到每秒 75.4 个 token（2,052 token 的提示词，贪心解码），16 个并发请求合计每秒 157.3 个 token，约合每个请求 12.9。结果取决于模型、提示词长度和硬件；首页列出了测试条件。',
    },
  ],
  cta: {
    title: '让*延迟*融化。',
    body: 'Butter 目前处于抢先体验阶段，暂未开源。申请访问。',
    docsLabel: '阅读文档',
  },
};

export default butterZh;
