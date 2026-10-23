import type { productsOverview } from './overview';

// TODO(i18n): translate to es. Keep hrefs, slugs and product names.
const productsOverviewEs: (typeof productsOverview)['en'] = {
  seo: {
    title: 'The Waffuru stack: kernels, serving, control and memory',
    description:
      'Iron compiles the kernels. Butter runs models on them. Waffle watches the GPUs. Syrup remembers what you were working on. Use one, or all four.',
    keywords: [
      'AI inference stack',
      'GPU kernels to serving',
      'local-first AI infrastructure',
    ],
  },
  hero: {
    label: 'Four products',
    title: 'The Waffuru *stack*.',
    lede: 'Iron compiles the kernels. Butter runs models on them. Waffle watches the GPUs. Syrup remembers what you were working on. All four are built to run on the hardware you already own.',
  },
  layers: {
    heading: 'How the four layers *fit*.',
    intro:
      'Numbered from the metal up. Syrup sits on top, Iron sits at the metal, and each layer has its own page.',
    metal: {
      label: 'The metal',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: 'The four layers of the stack',
  },
  together: {
    heading: 'Use one, or *all four*.',
    intro:
      'Start with the layer that solves today’s problem. Add the next when you need it.',
    aloneLabel: 'On its own',
    alone: {
      iron: 'Write a GPU kernel once and run it on Metal, CUDA, ROCm and Vulkan.',
      butter:
        'Serve models behind an OpenAI-compatible API, with no Python in the way.',
      waffle:
        'See every GPU and every engine running on it, whichever engine that is.',
      syrup: 'Give your AI local, cited memory of your notes and code.',
    },
    allLabel: 'Together',
    all: 'Butter runs models on the kernels Iron compiles, Waffle watches the GPUs and engines under them, and Syrup remembers what you were working on. Each layer you add builds on the ones below.',
  },
  audience: {
    heading: 'Who it’s *for*.',
    intro: 'Pick the page that sounds like you.',
    items: {
      smallBusiness:
        'Run private AI on the Macs and workstations you already own.',
      enterprise: 'Run inference you control, on-prem or in your own cloud.',
      neoclouds: 'See every GPU in your fleet and every engine running on it.',
      aiCompanies:
        'Write kernels once and serve models across Metal, CUDA, ROCm and Vulkan.',
    },
  },
  cta: {
    title: 'Start with the *layer* you need.',
    body: 'The whole stack is in early access and closed source for now. Request access and tell us which layer you want first.',
  },
};

export default productsOverviewEs;
