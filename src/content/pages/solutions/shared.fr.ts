import type { solutionsShared } from './shared';

const solutionsSharedFr: (typeof solutionsShared)['en'] = {
  breadcrumb: {
    label: 'Fil d’Ariane',
    home: 'Accueil',
    solutions: 'Solutions',
  },
  sections: {
    problem: 'Le problème',
    useCases: 'Cas d’usage',
    stackFit: 'La stack',
    whereWeAre: 'Accès anticipé',
  },
  tags: {
    cost: 'Coût',
    inference: 'Inférence',
    control: 'Maîtrise',
  },
  products: {
    iron: {
      index: '01',
      role: 'Kernels',
      name: 'Iron',
      linkLabel: 'Découvrir Iron',
      href: '/products/iron',
    },
    butter: {
      index: '02',
      role: 'Serving',
      name: 'Butter',
      linkLabel: 'Découvrir Butter',
      href: '/products/butter',
    },
    syrup: {
      index: '03',
      role: 'Plan de contrôle',
      name: 'Syrup',
      linkLabel: 'Découvrir Syrup',
      href: '/products/syrup',
    },
    whisk: {
      index: '04',
      role: 'Mémoire',
      name: 'Whisk',
      linkLabel: 'Découvrir Whisk',
      href: '/products/whisk',
    },
  },
  hardware: {
    notesLabel: 'Ce que cela change pour vous',
    tiersLabel: 'Où c’est optimisé',
    runsOnLabel: 'Fonctionne sur',
    tiers: [
      {
        name: 'Apple · Metal',
        status: 'primary',
        statusLabel: 'Principal',
        note: 'Chaque kernel est d’abord écrit et optimisé ici. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        status: 'secondary',
        statusLabel: 'Secondaire',
        note: 'En production sur RTX et DGX Spark. GPU de datacenter en cours. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: 'Fonctionne',
        note: 'Fonctionne aujourd’hui, pas encore optimisé. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: [
      { label: 'MacBook & Mac Studio' },
      { label: 'Stations RTX' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'Flottes de neoclouds' },
      {
        label: 'GPU de datacenter pour entreprises · en cours',
        inProgress: true,
      },
    ],
  },
};

export default solutionsSharedFr;
