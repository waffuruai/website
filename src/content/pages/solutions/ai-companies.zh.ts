import type { aiCompanies } from './ai-companies';

const aiCompaniesZh: (typeof aiCompanies)['en'] = {
  seo: {
    title: 'AI 公司的 GPU 内核与大模型服务',
    description:
      '一次编写内核，发布到 Metal、CUDA、ROCm 和 Vulkan。以极少的依赖提供模型服务，支持量化 KV 缓存和推测解码。抢先体验。',
    keywords: [
      '推理加速',
      'GPU 内核可移植性',
      '大模型推理引擎',
      '降低推理成本',
    ],
  },
  name: 'AI 模型与推理公司',
  serviceType: 'GPU 内核编译器与大模型服务引擎',
  card: {
    title: 'AI 模型与推理*公司*',
    summary: '为每种 GPU 后端提供一份内核定义，以及依赖极少的模型服务。',
  },
  hero: {
    title: '内核只写一次，交付*四种*后端。',
    lede: 'Iron 把一份内核定义编译到 Metal、CUDA、ROCm 和 Vulkan。Butter 在其上以极少的依赖提供模型服务，Whisk 则给你的智能体一份记忆。',
  },
  problem: {
    title: '每多一个后端，就是一次*重写*。',
    statement:
      '你的模型能移植到什么程度，取决于你的内核，而内核通常是每家厂商各写一份。',
    body: '要同时支持 Apple 芯片、NVIDIA、AMD 和 Vulkan，往往意味着多套代码库、多套 bug，服务栈还背着一大堆依赖。推理成本直接落在你的毛利上，智能体在会话结束的那一刻就丢掉了上下文。',
  },
  useCases: {
    title: '你能*交付*什么。',
    intro: '为构建模型、内核或模型服务的团队准备的四件事。',
    items: [
      {
        tag: 'inference',
        title: '内核只写一次，在四种后端上运行。',
        body: 'Iron 是嵌入 Rust 的 DSL。内核先转换为共享 IR，再生成 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V，对外是现有宿主可以调用的版本化 C 与 Rust ABI。',
      },
      {
        tag: 'inference',
        title: '提供服务，绝不妥协。',
        body: 'Butter 在 macOS 和 iOS 上用 Swift，其他平台用 Rust，依赖极少，提供兼容 OpenAI 的 API、流式输出和工具调用。混合模型和 MoE 模型、推测解码和 LoRA 一应俱全。',
      },
      {
        tag: 'cost',
        title: '每个 token 少耗几瓦。',
        body: '2 至 8 位量化检查点、量化 KV 缓存、推测解码和按后端调优的内核，都是冲着每瓦 token 数和每个工作负载的成本去的。我们去测量，也不会报一个无法复现的数字。',
      },
      {
        tag: 'control',
        title: '给智能体一份留在本地的记忆。',
        body: 'Whisk 用我们专有的 AURA 算法压缩嵌入向量，在本机运行关键词加向量搜索。结果通过 MCP 附带引用返回，智能体可以接着上次停下的地方继续。',
      },
    ],
  },
  sample: {
    title: '内核长*这样*。',
    intro: '一个带几个属性的 Rust 函数。Iron 会把它转换到每一种后端。',
    filename: 'unary.rs',
    language: 'iron · rust dsl',
    code: [
      '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
      'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
      '    let idx = program_id(0);',
      '    store(out[idx], exp(load(a[idx])));',
      '}',
    ].join('\n'),
    emitsLabel: '生成',
    emits: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
  },
  stackFit: {
    title: '技术栈如何*配合*。',
    intro: 'Iron 和 Butter 是核心。Whisk 和 Syrup 补全其余。',
    items: [
      {
        product: 'iron',
        need: '一份内核定义，四种后端。',
        body: '数学只需压一次。Iron 经由共享 IR 把它转换为 Metal、CUDA、HIP/ROCm 或 Vulkan SPIR-V，版本化的 C 与 Rust ABI 让你已有的引擎可以直接调用结果。',
      },
      {
        product: 'butter',
        need: '依赖极少的模型服务。',
        body: '无需转换即可加载 safetensors、MLX、JANG 和 GGUF，并支持 2 至 8 位量化检查点、混合模型和 MoE 模型、量化 KV 缓存、推测解码和 LoRA。文本、视觉、语音转文字、文字转语音和全模态模型，都在兼容 OpenAI 的 API 背后。',
      },
      {
        product: 'whisk',
        need: '给智能体的记忆。',
        body: '对笔记和代码做本地检索：用我们的 AURA 算法压缩的嵌入向量，关键词加向量搜索，以及通过 MCP 返回的带引用结果。',
      },
      {
        product: 'syrup',
        need: '一个视图，看清每块 GPU 上的每个引擎。',
        body: '让 Butter 与 vLLM、SGLang 或 llama.cpp 并排运行，并排对照。每台主机上的小型 Rust sidecar 上报带签名的遥测数据。',
      },
    ],
  },
  whereWeAre: {
    title: '我们的*进度*。',
    lede: 'Metal 是每个内核最先编写和调优的地方。产品目前处于抢先体验阶段，暂未开源。',
    notes: [
      'Iron 目前有大约 1,139 个内核声明。',
      'HIP 和 Vulkan 在 4,164 个测试用例中全部逐位精确通过（4,164/4,164），但尚未调优。',
      'CUDA 已在 RTX 和 DGX Spark 上投入生产，并已在 H100、H200、B100 和 B200 上完成首次运行。',
    ],
  },
  faq: [
    {
      question: 'Iron 和手写 Metal、CUDA 有什么不同？',
      answer:
        '你用嵌入 Rust 的 DSL 写一份内核定义，它经共享 IR 转换为 Metal、CUDA（PTX）、HIP/ROCm 或 Vulkan SPIR-V。调优仍然按后端进行，目前 Metal 最先得到调优。',
    },
    {
      question: '我们现有的技术栈能调用 Iron 内核吗？',
      answer:
        '可以。版本化的 C 与 Rust ABI 让现有宿主可以直接调用，所以使用 Iron 不必采用 Butter。',
    },
    {
      question: 'Butter 比 vLLM 或 llama.cpp 更快吗？',
      answer:
        '我们不发布无法复现的对比，也不声称 Butter 在 CUDA 或 ROCm 上胜过其他引擎。基准测试胜过观点，所以当数字公开时，会连同方法一起给出。',
    },
    {
      question: 'Butter 能运行哪些模型？',
      answer:
        'Llama、Gemma、Qwen、GPT-OSS、Mistral、Nemotron、Granite、Phi、LFM、OLMo、SmolLM、Falcon H1、Jamba 和 InternLM，以及视觉、语音和全模态变体。DeepSeek V4 正在进行中。模型直接从 Hugging Face 加载，无需转换。',
    },
    {
      question: '我们能获得访问权限吗？',
      answer:
        '抢先体验按申请开放，产品暂未开源。告诉我们你关心哪些后端和模型，我们会回信。',
    },
  ],
  cta: {
    title: '把你的数学压进*硅片*。',
    body: '抢先体验，暂未开源。告诉我们你在构建什么、哪些后端重要、现有技术栈在哪里挡了你的路，我们会回信。',
  },
};

export default aiCompaniesZh;
