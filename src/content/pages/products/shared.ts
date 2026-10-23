import type { ProductsShared } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';

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
};
