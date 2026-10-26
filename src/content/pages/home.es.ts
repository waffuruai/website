import type { home } from './home';

const homeEs: (typeof home)['en'] = {
  seo: {
    keywords: [
      'inferencia de LLM local',
      'kernels de GPU',
      'motor de inferencia',
      'Apple silicon',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'gestión de flotas de GPU',
      'neocloud',
      'IA en el dispositivo',
      'IA privada',
    ],
  },

  hero: {
    eyebrow: 'Cuatro productos · código cerrado por ahora',
    title: 'Matemática pura, *prensada* en silicio.',
    lede: 'Escribimos kernels de GPU, un motor de inferencia, un plano de control y una capa de recuperación para que tu equipo ejecute modelos en su propio hardware. Funcionan en un portátil, un laboratorio casero o una flota de neocloud, y publicamos lo que medimos.',
    secondary: { label: 'Ver el stack', href: '#stack' },
    emits: {
      label: 'Emite',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: 'El stack.',
    intro:
      'Iron compila los kernels. Butter ejecuta modelos sobre ellos. Waffle vigila las GPU. Syrup recuerda en qué estabas trabajando.',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: 'Memoria',
        name: 'Syrup',
        tagline: 'Tu IA recuerda en qué estabas trabajando.',
        body: 'Recuperación local sobre tus notas y tu código. Los embeddings se comprimen con TurboQuant+, la búsqueda combina léxico y vectores, y los resultados llegan con citas a través de MCP.',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: 'Plano de control',
        name: 'Waffle',
        tagline: 'Ve cada GPU y cada motor que corre en ella.',
        body: 'Un plano de control para LLM en GPU, desde un equipo bajo el escritorio hasta un neocloud que alquila una flota. Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada. Funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI.',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: 'Serving',
        name: 'Butter',
        tagline: 'Servir modelos sin Python.',
        body: 'Swift sobre Metal para Apple silicon, Rust para CUDA y el resto. Carga checkpoints cuantizados de 2 a 8 bits, modelos híbridos y MoE, con una caché KV cuantizada.',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: 'Kernels',
        name: 'Iron',
        tagline: 'Una definición de kernel, cuatro backends.',
        body: 'Un DSL embebido en Rust. Los kernels se traducen a una representación intermedia (IR) compartida y de ahí a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V. Una ABI versionada de C y Rust permite que los hosts existentes los invoquen.',
      },
    ],
  },

  models: {
    title: 'Modelos a la carta.',
    intro:
      'Se cargan directo desde Hugging Face. La cobertura es más amplia en Metal; el soporte de CUDA se añade modelo por modelo.',
    legend: { supported: 'Compatible', inProgress: 'En desarrollo' },
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
    title: 'Tú escribes esto.\n*Iron escribe el resto.*',
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
    tuned: {
      title: 'Dónde está afinado',
      note: 'Pulso = hasta dónde llega el ajuste',
    },
    tiers: [
      {
        name: 'Apple · Metal',
        level: 'primary',
        label: 'Principal',
        note: 'Cada kernel se escribe y se afina aquí primero. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        level: 'secondary',
        label: 'Secundario',
        note: 'En producción en RTX y DGX Spark. Las GPU de centros de datos están en desarrollo. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        level: 'runs',
        label: 'Funciona',
        note: 'Funciona hoy, aún sin afinar. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: {
      label: 'Funciona en',
      items: [
        'MacBook y Mac Studio',
        'Estaciones de trabajo RTX',
        'DGX Spark',
        'Strix Halo',
        'Flotas de neoclouds',
      ],
      pending: 'GPU de centros de datos empresariales · en desarrollo',
    },
  },

  team: {
    title: 'Quién está en la *cocina*.',
    intro:
      'Investigación, seguridad, ingresos y un par de fundadores que ya han llevado productos al mercado.',
    portraitAlt: 'Retrato de {name}',
    link: { label: 'Conoce al equipo', href: '/about/team' },
  },

  cta: {
    title: 'Siéntate a la mesa.',
    body: 'Todavía no hay nada público. Solicita acceso anticipado o deja tu correo abajo y te escribiremos cuando lo haya.',
  },
};

export default homeEs;
