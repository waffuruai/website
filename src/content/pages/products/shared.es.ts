import type { productsShared } from './shared';

const productsSharedEs: (typeof productsShared)['en'] = {
  statusLabel: 'Privado · acceso anticipado',
  storyProblemLabel: 'El problema',
  storyOutcomeLabel: 'Lo que puedes hacer ahora',
  tierLabels: {
    primary: 'Principal',
    secondary: 'Afinando',
    runs: 'Próximamente',
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
      { label: 'H100 · H200 · B100 · B200 · primeras ejecuciones' },
      { label: 'MI300 · primeras ejecuciones' },
    ],
  },
};

export default productsSharedEs;
