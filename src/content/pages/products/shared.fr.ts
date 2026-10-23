import type { productsShared } from './shared';

const productsSharedFr: (typeof productsShared)['en'] = {
  statusLabel: 'Privé · accès anticipé',
  storyProblemLabel: 'Le problème',
  storyOutcomeLabel: 'Ce que vous pouvez faire maintenant',
  tierLabels: {
    primary: 'Principal',
    secondary: 'Secondaire',
    runs: 'Fonctionne',
  },
  tierLegend: 'Plus de barres, plus d’optimisation.',
  runsOn: {
    label: 'Fonctionne sur',
    items: [
      { label: 'MacBook & Mac Studio' },
      { label: 'Stations RTX' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'Flottes de neoclouds' },
      { label: 'GPU de datacenter pour entreprises', inProgress: true },
    ],
  },
};

export default productsSharedFr;
