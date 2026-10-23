import type { productsShared } from './shared';

const productsSharedEs: (typeof productsShared)['en'] = {
  statusLabel: 'Privado · acceso anticipado',
  storyProblemLabel: 'El problema',
  storyOutcomeLabel: 'Lo que puedes hacer ahora',
  tierLabels: {
    primary: 'Principal',
    secondary: 'Secundario',
    runs: 'Funciona',
  },
  tierLegend: 'Más barras, más afinación.',
  runsOn: {
    label: 'Funciona en',
    items: [
      { label: 'MacBook y Mac Studio' },
      { label: 'Estaciones de trabajo RTX' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'Flotas de neoclouds' },
      { label: 'GPU de centros de datos empresariales', inProgress: true },
    ],
  },
};

export default productsSharedEs;
