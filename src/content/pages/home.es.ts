import type { home } from './home';

// TODO(i18n): translate to es. Keep hrefs, slugs and product names.
const homeEs: (typeof home)['en'] = {
  seo: {
    keywords: [
      'local LLM inference',
      'GPU kernels',
      'inference engine',
      'Apple silicon',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'GPU fleet management',
      'neocloud',
      'on-device AI',
      'private AI',
    ],
  },

  hero: {
    eyebrow: 'Four products · closed source for now',
    title: 'Raw math, *pressed* into silicon.',
    lede: 'We write GPU kernels, an inference engine, a control plane and a retrieval layer. They run on a laptop, a home lab or a neocloud fleet.',
    secondary: { label: 'See the stack', href: '#stack' },
    emits: {
      label: 'Emits',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: 'The stack.',
    intro:
      'Iron compiles the kernels. Butter runs models on them. Waffle watches the GPUs. Syrup remembers what you were working on.',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: 'Memory',
        name: 'Syrup',
        tagline: 'Your AI remembers what you were working on.',
        body: 'Local retrieval over your notes and code. Embeddings are compressed with TurboQuant+, search is lexical plus vector, and results come back with citations over MCP.',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: 'Control plane',
        name: 'Waffle',
        tagline: 'See every GPU and every engine running on it.',
        body: 'A control plane for LLMs on GPUs, from one box under a desk to a neocloud renting out a fleet. Each host runs a small Rust sidecar that reports signed telemetry. Works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers.',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: 'Serving',
        name: 'Butter',
        tagline: 'Model serving without Python.',
        body: 'Swift on Metal for Apple silicon, Rust for CUDA and the rest. Loads 3- to 8-bit quantized checkpoints, hybrid and MoE models, with a quantized KV cache.',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: 'Kernels',
        name: 'Iron',
        tagline: 'One kernel definition, four backends.',
        body: 'A Rust-embedded DSL. Kernels lower to a shared IR, then to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V. A versioned C and Rust ABI lets existing hosts call them.',
      },
    ],
  },

  models: {
    title: 'Models on the menu.',
    intro:
      'Loaded straight from Hugging Face. Coverage is widest on Metal; CUDA support is added model by model.',
    legend: { supported: 'Supported', inProgress: 'In progress' },
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
      ],
    ],
  },

  kernel: {
    title: 'You write this.\n*Iron writes the rest.*',
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
    tuned: { title: 'Where it’s tuned', note: 'Pulse = relative speed' },
    tiers: [
      {
        name: 'Apple · Metal',
        level: 'primary',
        label: 'Primary',
        note: 'Every kernel is written and tuned here first. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        level: 'secondary',
        label: 'Secondary',
        note: 'In production on RTX and DGX Spark. Datacenter GPUs are in progress. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        level: 'runs',
        label: 'Runs',
        note: 'Works today, not tuned yet. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: {
      label: 'Runs on',
      items: [
        'MacBook & Mac Studio',
        'RTX workstations',
        'DGX Spark',
        'Strix Halo',
        'Neocloud fleets',
      ],
      pending: 'Enterprise datacenter GPUs · in progress',
    },
  },

  team: {
    title: 'Who’s in the *kitchen*.',
    intro:
      'Research, security, revenue and a couple of founders who have shipped before.',
    portraitAlt: 'Portrait of {name}',
    link: { label: 'Meet the team', href: '/about/team' },
  },

  cta: {
    title: 'Pull up a seat.',
    body: 'Nothing’s public yet. Request early access, or leave your email below and we’ll write when something is.',
  },
};

export default homeEs;
