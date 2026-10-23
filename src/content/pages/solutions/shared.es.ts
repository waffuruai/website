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
    waffle: {
      index: '03',
      role: 'Plano de control',
      name: 'Waffle',
      linkLabel: 'Explorar Waffle',
      href: '/products/waffle',
    },
    syrup: {
      index: '04',
      role: 'Memoria',
      name: 'Syrup',
      linkLabel: 'Explorar Syrup',
      href: '/products/syrup',
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
        statusLabel: 'Secundario',
        note: 'En producción en RTX y DGX Spark. Las GPU de centros de datos están en desarrollo. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: 'Funciona',
        note: 'Funciona hoy, aún sin afinar. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: [
      { label: 'MacBook y Mac Studio' },
      { label: 'Estaciones de trabajo RTX' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'Flotas de neoclouds' },
      {
        label: 'GPU de centros de datos empresariales · en desarrollo',
        inProgress: true,
      },
    ],
  },
};

export default solutionsSharedEs;
