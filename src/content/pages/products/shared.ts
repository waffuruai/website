import type { ProductsShared } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import productsSharedEs from './shared.es';
import productsSharedFr from './shared.fr';
import productsSharedZh from './shared.zh';
import productsSharedJa from './shared.ja';
import productsSharedKo from './shared.ko';

/**
 * Words the four product pages share: section labels, the hardware tier
 * labels and the "runs on" list. Hardware names never translate.
 */
export const productsShared: Localized<ProductsShared> = {
  en: {
    statusLabel: 'Private · early access',
    storyProblemLabel: 'The problem',
    storyOutcomeLabel: 'What you can do now',
    tierLabels: { primary: 'Primary', secondary: 'Secondary', runs: 'Runs' },
    tierLegend: 'More bars, more tuning.',
    runsOn: {
      label: 'Runs on',
      items: [
        { label: 'MacBook & Mac Studio' },
        { label: 'RTX workstations' },
        { label: 'DGX Spark' },
        { label: 'Strix Halo' },
        { label: 'Neocloud fleets' },
        { label: 'Enterprise datacenter GPUs', inProgress: true },
      ],
    },
  },
  es: productsSharedEs,
  fr: productsSharedFr,
  zh: productsSharedZh,
  ja: productsSharedJa,
  ko: productsSharedKo,
};
