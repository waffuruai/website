import type { ProductsOverviewCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import productsOverviewEs from './overview.es';
import productsOverviewFr from './overview.fr';
import productsOverviewZh from './overview.zh';
import productsOverviewJa from './overview.ja';
import productsOverviewKo from './overview.ko';

/*
 * /products: the stack, from Whisk (04) at the top down to Iron (01) at the
 * metal. Per-product pitches come from each product's own copy.
 */
export const productsOverview: Localized<ProductsOverviewCopy> = {
  en: {
    seo: {
      title: 'The Waffuru stack: kernels, serving, control, memory and agents',
      description:
        'Iron compiles the kernels. Butter runs models on them. Syrup controls the GPUs. Whisk mixes in memory and context. Waffle runs your agents. Use one, or all five.',
      keywords: [
        'AI inference stack',
        'GPU kernels to serving',
        'AI infrastructure on hardware you own or rent',
      ],
    },
    hero: {
      label: 'Five products',
      title: 'The Waffuru *stack*.',
      lede: 'Iron compiles the kernels. Butter runs models on them. Syrup controls the GPUs. Whisk mixes in memory and context. Waffle runs your agents, with W inside. All five run on hardware you own or rent.',
    },
    layers: {
      heading: 'How the five layers *fit*.',
      intro:
        'Numbered from the metal up. Waffle sits on top, Iron sits at the metal, and each layer has its own page.',
      metal: {
        label: 'The metal',
        backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
      },
      listLabel: 'The five layers of the stack',
    },
    together: {
      heading: 'Use one, or *all five*.',
      intro:
        'Start with the layer that solves today’s problem. Add the next when you need it.',
      aloneLabel: 'On its own',
      alone: {
        iron: 'Write a GPU kernel once and run it on Metal, CUDA, ROCm and Vulkan.',
        butter:
          'Serve models behind an OpenAI-compatible API, with minimal dependencies.',
        syrup:
          'See every GPU and every engine running on it, whichever engine that is.',
        whisk: 'Give your AI local, cited memory of your notes and code.',
        waffle:
          'Run your agents in one harness, with W, your assistant, inside.',
      },
      allLabel: 'Together',
      all: 'Butter runs models on the kernels Iron compiles, Syrup controls the GPUs and engines under them, Whisk mixes in memory and context, and Waffle runs your agents on top. Each layer you add builds on the ones below.',
    },
    audience: {
      heading: 'Who it’s *for*.',
      intro: 'Pick the page that sounds like you.',
      items: {
        smallBusiness:
          'Run private AI on the Macs and workstations you already own.',
        enterprise: 'Run inference you control, on-prem or in your own cloud.',
        neoclouds:
          'See every GPU in your fleet and every engine running on it.',
        aiCompanies:
          'Write kernels once and serve models across Metal, CUDA, ROCm and Vulkan.',
      },
    },
    cta: {
      title: 'Start with the *layer* you need.',
      body: 'The whole stack is in early access and closed source for now. Request access and tell us which layer you want first.',
    },
  },
  es: productsOverviewEs,
  fr: productsOverviewFr,
  zh: productsOverviewZh,
  ja: productsOverviewJa,
  ko: productsOverviewKo,
};
