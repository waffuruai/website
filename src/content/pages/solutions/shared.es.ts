import type { solutionsShared } from './shared';

// TODO(i18n): translate to es. Keep hrefs, slugs and product names.
const solutionsSharedEs: (typeof solutionsShared)['en'] = {
  breadcrumb: {
    label: 'Breadcrumb',
    home: 'Home',
    solutions: 'Solutions',
  },
  sections: {
    problem: 'The problem',
    useCases: 'Use cases',
    stackFit: 'The stack',
    whereWeAre: 'Early access',
  },
  tags: {
    cost: 'Cost',
    inference: 'Inference',
    control: 'Control',
  },
  products: {
    iron: {
      index: '01',
      role: 'Kernels',
      name: 'Iron',
      linkLabel: 'Explore Iron',
      href: '/products/iron',
    },
    butter: {
      index: '02',
      role: 'Serving',
      name: 'Butter',
      linkLabel: 'Explore Butter',
      href: '/products/butter',
    },
    waffle: {
      index: '03',
      role: 'Control plane',
      name: 'Waffle',
      linkLabel: 'Explore Waffle',
      href: '/products/waffle',
    },
    syrup: {
      index: '04',
      role: 'Memory',
      name: 'Syrup',
      linkLabel: 'Explore Syrup',
      href: '/products/syrup',
    },
  },
  hardware: {
    notesLabel: 'What it means for you',
    tiersLabel: 'Where it’s tuned',
    runsOnLabel: 'Runs on',
    tiers: [
      {
        name: 'Apple · Metal',
        status: 'primary',
        statusLabel: 'Primary',
        note: 'Every kernel is written and tuned here first. MSL → .metallib.',
      },
      {
        name: 'NVIDIA · CUDA',
        status: 'secondary',
        statusLabel: 'Secondary',
        note: 'In production on RTX and DGX Spark. Datacenter GPUs are in progress. CUDA → PTX.',
      },
      {
        name: 'AMD ROCm · Vulkan',
        status: 'runs',
        statusLabel: 'Runs',
        note: 'Works today, not tuned yet. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
    runsOn: [
      { label: 'MacBook & Mac Studio' },
      { label: 'RTX workstations' },
      { label: 'DGX Spark' },
      { label: 'Strix Halo' },
      { label: 'Neocloud fleets' },
      { label: 'Enterprise datacenter GPUs · in progress', inProgress: true },
    ],
  },
};

export default solutionsSharedEs;
