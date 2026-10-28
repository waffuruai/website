import type { solutionsShared } from './shared';

const solutionsSharedEs: (typeof solutionsShared)['en'] = {
  breadcrumb: {
    label: 'Ruta de navegación',
    home: 'Inicio',
    solutions: 'Soluciones',
  },
  sections: {
    problem: 'El problema',
    useCases: 'Casos de uso',
    stackFit: 'El stack',
    whereWeAre: 'Acceso anticipado',
  },
  tags: {
    cost: 'Costo',
    inference: 'Inferencia',
    control: 'Control',
  },
  products: {
    iron: {
      index: '01',
      role: 'Kernels',
      name: 'Iron',
      linkLabel: 'Explorar Iron',
      href: '/products/iron',
    },
    butter: {
      index: '02',
      role: 'Serving',
      name: 'Butter',
      linkLabel: 'Explorar Butter',
      href: '/products/butter',
    },
    syrup: {
      index: '03',
      role: 'Plano de control',
      name: 'Syrup',
      linkLabel: 'Explorar Syrup',
      href: '/products/syrup',
    },
    whisk: {
      index: '04',
      role: 'Memoria',
      name: 'Whisk',
      linkLabel: 'Explorar Whisk',
      href: '/products/whisk',
    },
  },
  hardware: {
    notesLabel: 'Qué significa para ti',
    tiersLabel: 'Dónde está afinado',
    runsOnLabel: 'Funciona en',
    tiers: [
      {
        name: 'Apple · Metal',
        status: 'primary',
        statusLabel: 'Principal',
        note: 'Cada kernel se escribe y se afina aquí primero. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        status: 'secondary',
        statusLabel: 'Afinando',
        note: 'En producción en RTX y DGX Spark, con primeras ejecuciones en H100, H200, B100 y B200. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: 'Próximamente',
        note: 'Funciona hoy, aún sin afinar, con primeras ejecuciones en MI300. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: [
      { label: 'MacBook y Mac Studio' },
      { label: 'Estaciones de trabajo RTX' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'Flotas de neoclouds' },
      {
        label: 'H100 · H200 · B100 · B200 · primeras ejecuciones',
        inProgress: true,
      },
      { label: 'MI300 · primeras ejecuciones', inProgress: true },
    ],
  },
};

export default solutionsSharedEs;
