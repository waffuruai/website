import type { Localized } from '@/content/types';

import type { IndustriesOverview } from './types';
import industriesOverviewEs from './overview.es';
import industriesOverviewFr from './overview.fr';
import industriesOverviewZh from './overview.zh';
import industriesOverviewJa from './overview.ja';
import industriesOverviewKo from './overview.ko';

/*
 * /industries: hero, one card per sector (the cards' words live on each
 * sector page as `card`), the three value props every sector shares, and
 * the closing call to action. Same template as /solutions.
 *
 * TODO(founder): the sales guidelines say "open core you can inspect,
 * commercial platform you can rely on", but the site says the products are
 * closed source for now. Confirm which parts are open before any page here
 * says "open core".
 */
export const industriesOverview: Localized<IndustriesOverview> = {
  en: {
    seo: {
      title: 'AI inference by industry',
      description:
        'Waffuru for GPU clouds, financial services, life sciences, government and the military: a cost for every workload, on hardware you control. Early access.',
      keywords: [
        'AI inference by industry',
        'private AI infrastructure',
        'sovereign AI',
        'GPU cost per workload',
      ],
    },
    hero: {
      label: 'Industries',
      title: 'One stack, fitted to your *rules*.',
      lede: 'Every sector runs AI under its own constraints: which data can move, who signs off on the spend, which hardware is allowed. Waffuru is one stack, from kernels to memory, that runs models on hardware you control. Pick yours.',
    },
    cards: {
      label: 'By industry',
      title: 'Find your *sector*.',
      intro:
        'Five sectors, one stack. Each page covers the pressure you are under, the jobs and what works today.',
    },
    values: {
      label: 'What holds everywhere',
      title: 'Three answers for every *sector*.',
      intro:
        'Finance gets a cost for every workload. IT gets fewer parts to run and patch. Security gets data that stays on hardware you choose. And the CEO gets all three, without a rewrite.',
      items: [
        {
          tag: 'cost',
          title: 'The number that *matters*.',
          body: 'Dollars per workload is what finance asks for, and almost nobody can see it. Syrup shows every GPU and every engine on it, so spend ties back to the work it did.',
          points: [
            'See which GPUs are busy, idle or mismatched',
            'Get more output from hardware you own or rent',
            'Quantized models fit more in the memory you have',
          ],
        },
        {
          tag: 'inference',
          title: 'Fewer moving *parts*.',
          body: 'Butter serves models with minimal dependencies, using Swift for macOS and iOS and Rust for everything else, on kernels tuned for each backend. You get safety and maximal performance without compromises. Less to patch, less to break and less to explain.',
          points: [
            'Metal first, CUDA being tuned, ROCm and Vulkan coming soon',
            'OpenAI-compatible serving, so apps keep working',
            'Loads Hugging Face models with no conversion',
          ],
        },
        {
          tag: 'control',
          title: 'Hardware you *choose*.',
          body: 'One Iron kernel definition lowers to Metal, CUDA, HIP and Vulkan, and your data stays where it is unless you choose to use a hosted AI inference provider. Changing vendors is a decision, not a rewrite.',
          points: [
            'On-prem, in your own cloud or on one workstation',
            'Syrup works with vLLM, SGLang and llama.cpp',
            'No lock-in to one engine or one GPU vendor',
          ],
        },
      ],
    },
    cta: {
      title: 'Tell us your *constraints*.',
      body: 'Early access, closed source for now. Tell us your sector, your hardware and what cannot leave the building, and we will tell you honestly what fits today.',
    },
  },
  es: industriesOverviewEs,
  fr: industriesOverviewFr,
  zh: industriesOverviewZh,
  ja: industriesOverviewJa,
  ko: industriesOverviewKo,
};
