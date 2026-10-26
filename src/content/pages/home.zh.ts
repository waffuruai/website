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
    title: '释放模型的更多价值。\n*在自己的芯片上。*',
    lede: '从 GPU 内核到智能体的工具调用，为团队运行本地 AI。我们测量吞吐量、调查失败并改进推理路径，让你看清改变及其原因。',
    secondary: { label: '查看结果', href: '#native-inference' },
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

  models: {
    title: '菜单上的模型。',
    intro:
      '直接从 Hugging Face 加载。Metal 上覆盖最广；CUDA 的支持逐个模型添加。',
    legend: { supported: '已支持', inProgress: '进行中' },
    lanes: [
      [
        {
          lab: 'Meta',
          logo: 'meta',
          models: 'Llama 3 · 3.1 · 3.2 · 3.3',
        },
        {
          lab: 'Google',
          logo: 'google',
          models: 'Gemma 2 · 3 · 4, PaliGemma',
        },
        {
          lab: 'Qwen',
          logo: 'qwen',
          models: 'Qwen 2 · 3 · 3.5 · 3.6 · 3.8, VL, Omni',
        },
        {
          lab: 'OpenAI',
          logo: 'openai',
          models: 'GPT-OSS 20B · 120B, Whisper',
        },
        {
          lab: 'Mistral AI',
          logo: 'mistral',
          models: 'Mistral, Mistral 3 VL, Voxtral',
        },
        {
          lab: 'NVIDIA',
          logo: 'nvidia',
          models: 'Nemotron H, Nemotron VLM',
        },
        {
          lab: 'DeepSeek',
          logo: 'deepseek',
          models: 'DeepSeek V4',
          status: 'in-progress',
        },
        { lab: 'IBM', logo: 'ibm', models: 'Granite 3 · 4' },
      ],
      [
        { lab: 'Microsoft', logo: 'microsoft', models: 'Phi 3' },
        { lab: 'Liquid AI', logo: 'liquid', models: 'LFM2 · LFM2.5' },
        { lab: 'Ai2', logo: 'ai2', models: 'OLMo 1 · 2' },
        {
          lab: 'Hugging Face',
          logo: 'huggingface',
          models: 'SmolLM, SmolVLM',
        },
        { lab: 'TII', logo: 'tii', models: 'Falcon H1' },
        { lab: 'AI21', logo: 'ai21', models: 'Jamba' },
        { lab: 'Apple', logo: 'apple', models: 'FastVLM' },
        {
          lab: 'Shanghai AI Lab',
          logo: 'internlm',
          models: 'InternLM 2',
        },
        {
          lab: 'Fish Audio',
          logo: 'fishaudio',
          models: 'Drama-3',
          status: 'in-progress',
        },
        {
          lab: 'Recursive',
          logo: 'recursive',
          models: 'Flint',
          status: 'in-progress',
        },
      ],
    ],
  },

  kernel: {
    title: '你写这些。\n*其余交给 Iron。*',
    code: {
      file: 'unary.rs',
      label: 'iron · rust dsl',
      tokens: [
        {
          text: '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
          kind: 'comment',
        },
        { text: '\n' },
        { text: 'pub fn', kind: 'keyword' },
        { text: ' ' },
        { text: 'iron_exp', kind: 'function' },
        { text: '<T>(a: Tensor<T>, out: Tensor<T>) {\n    ' },
        { text: 'let', kind: 'keyword' },
        {
          text: ' idx = program_id(0);\n    store(out[idx], exp(load(a[idx])));\n}',
        },
      ],
    },
    tuned: { title: '调优在哪里', note: '脉冲 = 相对速度' },
    tiers: [
      {
        name: 'Apple · Metal',
        level: 'primary',
        label: '首要',
        note: '每个内核都先在这里编写并调优。MSL → .metallib。',
      },
      {
        name: 'NVIDIA · CUDA',
        level: 'secondary',
        label: '其次',
        note: '已在 RTX 和 DGX Spark 上投入生产。数据中心 GPU 正在进行中。CUDA → PTX。',
      },
      {
        name: 'AMD ROCm · Vulkan',
        level: 'runs',
        label: '可运行',
        note: '目前可以运行，尚未调优。HIP → AMDGPU，Vulkan → SPIR-V。',
      },
    ],
    runsOn: {
      label: '运行于',
      items: [
        'MacBook & Mac Studio',
        'RTX 工作站',
        'DGX Spark',
        'Strix Halo',
        '新型云服务商集群',
      ],
      pending: '企业级数据中心 GPU · 进行中',
    },
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
