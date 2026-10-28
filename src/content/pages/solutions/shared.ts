import type { Localized } from '@/content/types';

import type { SolutionsShared } from './types';
import solutionsSharedEs from './shared.es';
import solutionsSharedFr from './shared.fr';
import solutionsSharedZh from './shared.zh';
import solutionsSharedJa from './shared.ja';
import solutionsSharedKo from './shared.ko';

/**
 * Strings every audience page shares: section labels, the four products as
 * they appear in "How the stack fits", and the hardware tiers for "Where we
 * are". Tiers and chips follow the public wording on the product pages;
 * never overclaim (Metal primary, CUDA secondary, ROCm and Vulkan run).
 */
export const solutionsShared: Localized<SolutionsShared> = {
  en: {
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
      syrup: {
        index: '03',
        role: 'Control plane',
        name: 'Syrup',
        linkLabel: 'Explore Syrup',
        href: '/products/syrup',
      },
      whisk: {
        index: '04',
        role: 'Memory',
        name: 'Whisk',
        linkLabel: 'Explore Whisk',
        href: '/products/whisk',
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
  },
  es: solutionsSharedEs,
  fr: solutionsSharedFr,
  zh: solutionsSharedZh,
  ja: solutionsSharedJa,
  ko: solutionsSharedKo,
};
