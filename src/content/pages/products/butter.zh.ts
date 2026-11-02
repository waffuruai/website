import type { butter } from './butter';

const butterZh: (typeof butter)['en'] = {
  layer: '模型服务',
  tagline: '你的模型，跑在你自己的硬件上。',
  summary:
    'Apple 芯片上用 Swift 搭配 Metal，CUDA 及其他平台用 Rust。可加载 2 至 8 位量化检查点、混合模型和 MoE 模型，并通过兼容 OpenAI 和 Anthropic Messages 的 API 提供服务。',
  seo: {
    title: 'Butter：在自有硬件上运行并切换你自己的模型',
    description:
      'Butter 是为你已有硬件打造的私有大模型服务。它直接从 Hugging Face 加载开源模型，按请求切换所服务的模型，并提供兼容 OpenAI 和 Anthropic Messages 的 API。macOS 和 iOS 上用 Swift，其他平台用 Rust。',
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
    title: '运行你*选定*的模型。',
    lede: 'Butter 把你已有的 Mac 或 GPU 工作站变成私有 AI 服务器。带上你自己的模型，让每条提示词都留在内部，也不用按 token 付费。工作变了，就换一个模型。模型直接从 Hugging Face 加载，你的工具通过它们已在使用的 OpenAI 和 Anthropic API 连接。',
    highlights: [
      { value: '4', label: '种检查点格式，无需转换即可加载' },
      { value: '开源模型', label: '文本、视觉、语音与全模态' },
      { value: '按需切换', label: '所服务的模型，对话可接着继续' },
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
    intro: '从加载检查点到流式输出 token，全程依赖极少。',
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
      id: 'modalities',
      heading: '文本、视觉与*音频*。',
      items: [
        {
          title: '文本',
          body: '稠密模型、混合模型和混合专家模型。Llama、Gemma、Qwen、GPT-OSS 等。',
        },
        {
          title: '多模态',
          body: '视觉语言模型和全模态模型，包括 Gemma 4、Qwen3.8 VL 和 Mistral 3 VL。',
        },
        {
          title: '音频',
          body: '语音转文字：Whisper、Voxtral 和 Qwen3-ASR。文字转语音：Kokoro、FishSpeech 和 Marvis。',
        },
      ],
    },
    {
      id: 'swap',
      heading: '换模型，不丢*进度*。',
      intro:
        '同一个 butter serve 进程可以逐个请求地切换所服务的模型，让合适的模型处理每项任务。',
      items: [
        {
          title: '按需切换',
          body: '用 --model-swap 启动 butter serve，请求即可指定另一个模型。--model-swap-allow 列出允许的模型。默认只允许启动时的那个模型，所以你不开口，什么都不会切换。',
        },
        {
          title: '对话接着继续',
          body: '对话可以跨越一次模型切换，并在不重新读取历史的情况下继续。在我们的验收运行中，没有任何重复预填充，续写结果与未中断的对话完全一致。',
        },
        {
          title: '错误的目标会被拒绝或回滚',
          body: '格式错误的目标会回滚到原来的模型。损坏的归档会原样保留，会超出配额的切换会被拒绝。',
        },
        {
          title: '近期用过的模型保持预热',
          body: '数量有限的近期使用过的模型会保持在内存中预热，所以切回其中一个很快。未预热的模型要从磁盘加载，该花多久就花多久。我们不给出耗时数字。',
        },
      ],
    },
    {
      id: 'tools',
      heading: '返回即有效的*工具调用*。',
      intro: '写给构建智能体的人：工具调用返回的内容，你的循环可以直接执行。',
      items: [
        {
          title: '类型遵循你的 schema',
          body: '参数类型遵循你的 schema，整数依然是整数。',
        },
        {
          title: '不完整的调用会被拒绝',
          body: '不完整的调用，或调用了你没有声明的工具，会被拒绝而不是输出。',
        },
        {
          title: '准入前先校验',
          body: '请求准入前会先校验工具 schema，不支持的 tool_choice 会被直接拒绝。',
        },
        {
          title: '流式返回，id 稳定',
          body: '调用以增量方式流式返回，id 在各轮之间保持唯一。',
        },
      ],
    },
    {
      id: 'validation',
      heading: '已用 *InferenceX* 测试框架检验。',
      intro:
        'InferenceX 是 SemiAnalysis 的开放基准测试框架。我们在自己的硬件上，用它的检查项来测试 Butter，让你在试用之前就能看到哪些经得起检验。',
      links: [
        {
          label: 'InferenceX',
          href: 'https://github.com/SemiAnalysisAI/InferenceX',
        },
        {
          label: 'AgentX',
          href: 'https://inferencex.semianalysis.com/agentx/quickstart/',
        },
      ],
      items: [
        {
          title: '所有 API 检查均通过',
          body: '我们针对该测试框架运行的所有 API 和流式输出检查，在两个 Butter 构建上都通过：面向 Apple 芯片的 Swift 版，以及面向 NVIDIA、AMD 等平台的 Rust 版。',
        },
        {
          title: 'GSM8K 约 97%',
          body: '在完整的 GSM8K 数据集上，DGX Spark 上的 Qwen3.8-27B 和 Strix Halo 上的 Qwen3.8-Flash-Next 各自得分约 97%，高于 90% 的下限。每个答案都经过独立重新评分。',
        },
        {
          title: 'AgentX 运行顺利完成',
          body: '一次简短的 AgentX 运行没有任何失败请求，并通过了官方验证器。这只是一次小规模试验，不是完整回放。运行过程中还暴露出了真实的缺陷，我们已经修复。',
        },
      ],
      note: '这些是我们在自有硬件上进行的内部运行，DGX Spark 和 Strix Halo 都不是 InferenceX 的官方目标。它们不是 InferenceX 的官方结果，SemiAnalysis 也未为其背书。企业级硬件上的性能尚未验证。',
    },
    {
      id: 'memory',
      heading: '原生 *TurboQuant+*，出自原作者。',
      intro:
        'TurboQuant+ 是我们压缩 AI 内存缓存的开源工作。Butter 原生运行它，由同一个人编写，并针对同时做推测解码、会话复用和工具循环的服务器做了调整。我们把引擎里的版本称为 AURA。',
      links: [
        {
          label: 'TurboQuant+',
          href: 'https://github.com/TheTom/turboquant_plus',
        },
      ],
      items: [
        {
          title: '近期的行保持精确',
          body: '只压缩较早的历史。回退、停止截断和推测验证都不会碰到有损数据。',
        },
        {
          title: '是缓存的一部分，不是外挂',
          body: '压缩是 Butter 自身 KV 缓存的一种模式，因此会话复用、快照和多轮长对话都能照常工作。',
        },
        {
          title: '自选位宽',
          body: '默认 8 位以保证质量，也可使用 4 位，以及分别设置键和值的位宽。',
        },
      ],
      note: '目前需要主动开启。压缩是用一点质量换内存，我们会衡量这个取舍。',
    },
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
      note: '已测试并支持 Oh My Pi（Chat Completions）和 Claude Code 风格客户端（Messages），覆盖 Qwen 3.6、Qwen 3.8 和 Flint。',
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
    rows: [
      {
        term: '运行时',
        detail:
          'macOS 和 iOS 上是 Swift 搭配 Metal，macOS 需 14 或更高版本；CUDA 及其他平台是 Rust。依赖极少，供应链风险更低。',
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
        term: '智能体框架',
        detail:
          '已测试并支持：通过 Chat Completions 的 Oh My Pi，以及通过 Messages 的 Claude Code 风格客户端。',
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
        term: '可用性',
        detail: '抢先体验期间为私有闭源。',
      },
    ],
  },
  platforms: {
    heading: '在*哪里*运行。',
    intro:
      'Metal 是首要目标。CUDA 正在调优，通过 ROCm 和 Vulkan 支持的 AMD 进展迅速。',
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
      'Butter 在 Iron 编译的内核上运行模型。Syrup 可以把它和 vLLM、SGLang、llama.cpp 放在一起监看，Whisk 则让你的 AI 记得你在做什么。',
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
        'Apple 芯片上的 Swift 与 Metal 是首要目标，从 MacBook 到 Mac Studio，需要 macOS 14 或更高版本。CUDA 已在 RTX 和 DGX Spark 上投入生产，正在调优。通过 ROCm 和 Vulkan 支持 AMD，进展迅速。',
    },
    {
      question: '能运行哪些模型？',
      answer:
        '支持众多开源模型系列，涵盖文本、视觉、语音和全模态版本。目前已支持和即将支持的模型，见本页靠上的模型列表。',
    },
    {
      question: 'Butter 是用什么语言写的？',
      answer:
        'macOS 和 iOS 上用 Swift，其他平台用 Rust，保证内存安全。Butter 把依赖降到最少，供应链攻击的可乘之机更少，并运行在为每种后端调优的内核上。',
    },
    {
      question: '我现有的工具和智能体框架能用吗？',
      answer:
        'Butter 用一个 butter serve 进程同时提供 OpenAI Chat Completions API 和 Anthropic Messages API，支持流式输出、结构化工具调用、推理字段和复用的提示前缀。使用任一 API 的客户端都可以指向它。',
    },
    {
      question: '可以切换模型吗？',
      answer:
        '可以。用 --model-swap 启动 butter serve，请求即可更改所服务的模型；--model-swap-allow 指定允许的模型，默认只允许启动时的模型。对话可以跨越一次切换，并在不重新读取历史的情况下继续。错误的目标会被安全地拒绝或回滚。数量有限的近期使用过的模型会保持在内存中预热，所以切回其中一个很快。未预热的模型要从磁盘加载，该花多久就花多久。我们不给出耗时数字。',
    },
  ],
  cta: {
    title: '带上你的*模型*。',
    body: 'Butter 目前处于抢先体验阶段，暂未开源。申请访问。',
    docsLabel: '阅读文档',
  },
};

export default butterZh;
