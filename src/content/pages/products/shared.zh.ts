import type { productsShared } from './shared';

// TODO(i18n): translate to zh. Keep hrefs, slugs and product names.
const productsSharedZh: (typeof productsShared)['en'] = {
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
};

export default productsSharedZh;
