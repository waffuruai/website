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
