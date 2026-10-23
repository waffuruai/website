import type { Localized } from '@/content/types';

import type { SolutionsOverview } from './types';
import solutionsOverviewEs from './overview.es';
import solutionsOverviewFr from './overview.fr';
import solutionsOverviewZh from './overview.zh';
import solutionsOverviewJa from './overview.ja';
import solutionsOverviewKo from './overview.ko';

/*
 * /solutions: hero, one card per audience (the cards' words live on each
 * audience page as `card`), the three shared value props, and the closing
 * call to action.
 */
export const solutionsOverview: Localized<SolutionsOverview> = {
  en: {
    seo: {
      title: 'AI inference solutions',
      description:
        'Waffuru’s local-first AI stack for small businesses, enterprises, neoclouds and AI companies: a lower cost per workload, better inference and more control.',
      keywords: ['AI inference solutions', 'local-first AI'],
    },
    hero: {
      label: 'Solutions',
      title: 'Local-first AI, fitted to your *job*.',
      lede: 'Waffuru is one stack, from kernels to memory, that runs models fast on hardware you already own. Pick the page closest to what you are trying to get done.',
    },
    cards: {
      label: 'Who it’s for',
      title: 'Find your *seat*.',
      intro:
        'Four audiences, one stack. Each page covers the problem, the jobs and what works today.',
    },
    values: {
      label: 'What stays the same',
      title: 'Three reasons for *everyone*.',
      intro: 'Each audience has its own job. These three hold for all of them.',
      items: [
        {
          tag: 'cost',
          title: 'Dollars per *workload*.',
          body: 'When power is the ceiling, tokens per watt and dollars per workload are the numbers you can still improve. Waffuru is built around both.',
          points: [
            'Run on hardware you already own instead of renting',
            'Quantized models fit more in the memory you have',
            'Waffle shows where capacity sits idle',
          ],
        },
        {
          tag: 'inference',
          title: 'Better *inference*.',
          body: 'Kernels tuned for each backend, quantized models and KV cache, and speculative decoding, in an engine with no Python on the hot path.',
          points: [
            'Metal first, CUDA next, ROCm and Vulkan running',
            'Loads Hugging Face models with no conversion',
            'Text, vision, speech and omni models',
          ],
        },
        {
          tag: 'control',
          title: 'More *control*.',
          body: 'Local-first: your data stays where it is unless you opt in, on a laptop, on-prem or in your own cloud.',
          points: [
            'OpenAI-compatible serving, so apps keep working',
            'Waffle works with vLLM, SGLang and llama.cpp',
            'No lock-in to one engine or one vendor',
          ],
        },
      ],
    },
    cta: {
      title: 'Pull up a *seat*.',
      body: 'Early access, closed source for now. Tell us what you want to run and we will write back.',
    },
  },
  es: solutionsOverviewEs,
  fr: solutionsOverviewFr,
  zh: solutionsOverviewZh,
  ja: solutionsOverviewJa,
  ko: solutionsOverviewKo,
};
