import type { home } from './home';

const homeFr: (typeof home)['en'] = {
  seo: {
    keywords: [
      'inférence LLM locale',
      'kernels GPU',
      'moteur d’inférence',
      'silicium Apple',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'gestion de flotte GPU',
      'neocloud',
      'IA sur appareil',
      'IA privée',
    ],
  },

  hero: {
    eyebrow: 'Quatre produits · code fermé pour l’instant',
    title: 'Des maths brutes, *pressées* dans le silicium.',
    lede: 'Nous écrivons des kernels GPU, un moteur d’inférence, un plan de contrôle et une couche de recherche, pour que votre équipe exécute des modèles sur son propre matériel. Ils tournent sur un portable, un labo maison ou une flotte neocloud, et nous publions ce que nous mesurons.',
    secondary: { label: 'Voir la stack', href: '#stack' },
    emits: {
      label: 'Génère',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: 'La stack.',
    intro:
      'Iron compile les kernels. Butter y exécute les modèles. Waffle surveille les GPU. Syrup se souvient de ce sur quoi vous travailliez.',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: 'Mémoire',
        name: 'Syrup',
        tagline: 'Votre IA se souvient de ce sur quoi vous travailliez.',
        body: 'Recherche locale sur vos notes et votre code. Les embeddings sont compressés avec TurboQuant+, la recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: 'Plan de contrôle',
        name: 'Waffle',
        tagline: 'Voir chaque GPU et chaque moteur qui y tourne.',
        body: 'Un plan de contrôle pour les LLM sur GPU, d’une machine sous un bureau à un neocloud qui loue une flotte. Chaque hôte exécute un petit sidecar en Rust qui remonte une télémétrie signée. Fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI.',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: 'Serving',
        name: 'Butter',
        tagline: 'Servir des modèles sans Python.',
        body: 'Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Charge des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et MoE, avec un cache KV quantifié.',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: 'Kernels',
        name: 'Iron',
        tagline: 'Une définition de kernel, quatre backends.',
        body: 'Un DSL embarqué dans Rust. Les kernels sont compilés vers une IR partagée, puis vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V. Une ABI C et Rust versionnée permet aux hôtes existants de les appeler.',
      },
    ],
  },

  models: {
    title: 'Des modèles au menu.',
    intro:
      'Chargés directement depuis Hugging Face. La couverture est la plus large sur Metal ; la prise en charge de CUDA s’ajoute modèle par modèle.',
    legend: { supported: 'Pris en charge', inProgress: 'En cours' },
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
    title: 'Vous écrivez ceci.\n*Iron écrit le reste.*',
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
      title: 'Où c’est optimisé',
      note: 'Pulsation = avancement de l’optimisation',
    },
    tiers: [
      {
        name: 'Apple · Metal',
        level: 'primary',
        label: 'Principal',
        note: 'Chaque kernel est d’abord écrit et optimisé ici. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        level: 'secondary',
        label: 'Secondaire',
        note: 'En production sur RTX et DGX Spark. GPU de datacenter en cours. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        level: 'runs',
        label: 'Fonctionne',
        note: 'Fonctionne aujourd’hui, pas encore optimisé. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: {
      label: 'Fonctionne sur',
      items: [
        'MacBook & Mac Studio',
        'Stations RTX',
        'DGX Spark',
        'Strix Halo',
        'Flottes de neoclouds',
      ],
      pending: 'GPU de datacenter pour entreprises · en cours',
    },
  },

  team: {
    title: 'Qui est en *cuisine*.',
    intro:
      'De la recherche, de la sécurité, des ventes, et quelques fondateurs qui ont déjà livré des produits.',
    portraitAlt: 'Portrait de {name}',
    link: { label: 'Rencontrer l’équipe', href: '/about/team' },
  },

  cta: {
    title: 'Prenez place.',
    body: 'Rien n’est encore public. Demandez un accès anticipé, ou laissez votre e-mail ci-dessous et nous vous écrirons quand ce sera le cas.',
  },
};

export default homeFr;
