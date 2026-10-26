import type { Localized } from '@/content/types';
import homeEs from './home.es';
import homeFr from './home.fr';
import homeZh from './home.zh';
import homeJa from './home.ja';
import homeKo from './home.ko';

/*
 * Home page copy. English is the source of truth; translators add `home.es.ts`
 * and friends typed against `HomeContent`. Product, platform and lab names
 * (Waffuru, Iron, Butter, Waffle, Syrup, Metal, CUDA, ROCm, Vulkan, …) never
 * translate. `*word*` is the gold italic accent in a heading.
 *
 * The primary calls to action ("Request early access", "Talk to us") and the
 * "Private" chip come from the UI dictionary (`common.*`), not from here.
 */

export type StackProduct = {
  /** Product page: `/products/<slug>`. */
  slug: 'syrup' | 'waffle' | 'butter' | 'iron';
  /** Position in the stack, numbered from the metal up. */
  index: string;
  kicker: string;
  name: string;
  tagline: string;
  body: string;
};

export type ModelLab = {
  /** Lab name, shown on the card. */
  lab: string;
  /** Logo file in `/public/logos/<logo>.svg`. */
  logo: string;
  /** Model families Butter loads today. */
  models: string;
  /** Anything not listed as in progress is supported. */
  status?: 'in-progress';
};

export type CodeToken = {
  text: string;
  kind?: 'comment' | 'keyword' | 'function';
};

/** How well a backend is tuned today; drives the bars and the pulse speed. */
export type TuneLevel = 'primary' | 'secondary' | 'runs';

export type HomeContent = {
  seo: { keywords: string[] };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    secondary: { label: string; href: string };
    emits: { label: string; targets: string[] };
  };
  stack: {
    title: string;
    intro: string;
    /** In display order: top of the stack first. */
    products: StackProduct[];
  };
  models: {
    title: string;
    intro: string;
    legend: { supported: string; inProgress: string };
    /** Two lanes; the second scrolls the other way. */
    lanes: [ModelLab[], ModelLab[]];
  };
  kernel: {
    title: string;
    code: { file: string; label: string; tokens: CodeToken[] };
    tuned: { title: string; note: string };
    tiers: { name: string; level: TuneLevel; label: string; note: string }[];
    runsOn: { label: string; items: string[]; pending: string };
  };
  team: {
    title: string;
    intro: string;
    /** `{name}` is replaced with the person's name. */
    portraitAlt: string;
    link: { label: string; href: string };
  };
  cta: { title: string; body: string };
};

export const home: Localized<HomeContent> = {
  en: {
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
      lede: 'We write GPU kernels, an inference engine, a control plane and a retrieval layer, so your team can run models on its own hardware. They run on a laptop, a home lab or a neocloud fleet, and we publish what we measure.',
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
          body: 'Swift on Metal for Apple silicon, Rust for CUDA and the rest. Loads 2- to 8-bit quantized checkpoints, hybrid and MoE models, with a quantized KV cache.',
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
      legend: { supported: 'Supported', inProgress: 'Coming soon' },
      lanes: [
        [
          {
            lab: 'Meta',
            logo: 'meta',
            models: 'Llama 3 · 3.1 · 3.2 · 3.3, Muse Glimmer',
          },
          {
            lab: 'Google',
            logo: 'google',
            models: 'Gemma 2 · 3 · 4, PaliGemma',
          },
          {
            lab: 'Qwen',
            logo: 'qwen',
            models: 'Qwen 2 · 3 · 3.5 · 3.6 · 3.8, VL, Omni, ASR',
          },
          {
            lab: 'OpenAI',
            logo: 'openai',
            models: 'GPT-OSS 20B · 120B, Whisper',
          },
          {
            lab: 'Mistral AI',
            logo: 'mistral',
            models: 'Mistral, Mistral 3 VL, Pixtral, Voxtral',
          },
          {
            lab: 'NVIDIA',
            logo: 'nvidia',
            models: 'Nemotron H · 3.5, VLM, Diffusion, Parakeet',
          },
          {
            lab: 'DeepSeek',
            logo: 'deepseek',
            models: 'DeepSeek V4 · V4.1',
            status: 'in-progress',
          },
          { lab: 'Z.ai', logo: 'zai', models: 'GLM-5.3, GLM-OCR, GLM-ASR' },
          { lab: 'IBM', logo: 'ibm', models: 'Granite 3 · 4, Granite Speech' },
          {
            lab: 'OpenBMB',
            logo: 'openbmb',
            models: 'MiniCPM 5, MiniCPM-V 4.6, MiniCPM-o',
          },
          { lab: 'Tencent', logo: 'tencent', models: 'Hy3' },
          { lab: 'inclusionAI', logo: 'inclusionai', models: 'Ling 3.0' },
          {
            lab: 'StepFun',
            logo: 'stepfun',
            models: 'Step 3',
            status: 'in-progress',
          },
          { lab: 'BigCode', logo: 'bigcode', models: 'StarCoder2' },
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
          { lab: 'hexgrad', logo: 'hexgrad', models: 'Kokoro' },
          { lab: '01.AI', logo: '01ai', models: 'Yi 1.5' },
          { lab: 'Recursive', logo: 'recursive', models: 'Flint' },
          {
            lab: 'Poolside',
            logo: 'poolside',
            models: 'Laguna S 2.1 · XS 2.1',
          },
          {
            lab: 'Nanbeige',
            logo: 'nanbeige',
            models: 'Nanbeige 4.3',
            status: 'in-progress',
          },
          {
            lab: 'Fish Audio',
            logo: 'fishaudio',
            models: 'Drama-3',
            status: 'in-progress',
          },
          {
            lab: 'Cohere',
            logo: 'cohere',
            models: 'Cohere Transcribe',
            status: 'in-progress',
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
      tuned: {
        title: 'Where it’s tuned',
        note: 'Pulse = how far tuning has gone',
      },
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
          note: 'In production on RTX and DGX Spark. CUDA → PTX.',
        },
        {
          name: 'AMD ROCm · Vulkan',
          level: 'runs',
          label: 'Runs',
          note: 'Moving fast on AMD. HIP → AMDGPU, Vulkan → SPIR-V.',
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
        pending: 'Enterprise datacenter GPUs · next',
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
  },
  es: homeEs,
  fr: homeFr,
  zh: homeZh,
  ja: homeJa,
  ko: homeKo,
};
