import type { Localized } from '@/content/types';

import { pantryFacts } from '@/content/pages/pantry/facts';

import type { IndustryPage } from './types';
import militaryEs from './military.es';
import militaryFr from './military.fr';
import militaryZh from './military.zh';
import militaryJa from './military.ja';
import militaryKo from './military.ko';

/*
 * Military and defense: hardware you own and secure, a small serving stack
 * with few dependencies, commodity machines from Macs to RTX workstations
 * and DGX Spark. Pantry (free, open source) for hardening the machines,
 * linked once its page launches. No compliance, accreditation or export
 * claims (ITAR, CMMC, IL levels and the like), no customers, no programs.
 *
 * TODO(founder): edge and disconnected deployments are a design goal only.
 * Confirm fully offline / air-gapped operation (licence checks, where
 * Waffle's signed telemetry goes, whether its control plane runs fully
 * self-hosted, how models are delivered) before "offline", "disconnected",
 * "air-gapped" or "edge" appears in rendered copy. Also confirm on-prem
 * support terms and any accreditation status we may state.
 */
export const military: Localized<IndustryPage> = {
  en: {
    seo: {
      title: 'Private AI inference for military and defense',
      description:
        'Run capable models on hardware you own and secure, from Macs to RTX workstations and DGX Spark, on a small serving stack with no Python or JIT. Early access.',
      keywords: [
        'defense AI infrastructure',
        'military AI inference',
        'on-prem LLM for defense',
        'AI on owned hardware',
        'local-first AI',
      ],
    },
    name: 'Military',
    serviceType: 'On-premises AI inference software for defense',
    card: {
      title: '*Military*',
      summary:
        'Capable AI on hardware you own and secure, with a footprint small enough to account for.',
    },
    hero: {
      title: 'Capable AI on hardware you *own*.',
      lede: 'Run models on machines you buy, hold and secure, from a Mac Studio to RTX workstations and DGX Spark. The serving stack is small, with no Python and no JIT, so there is less to harden and less to trust.',
    },
    problem: {
      title: 'Every dependency is a *door*.',
      statement:
        'Mission data cannot go to someone else’s cloud, and the hardware that runs a model has to be hardware you own, hold and secure.',
      body: 'Most AI serving stacks arrive as a long chain of Python packages, a JIT compiler and a vendor’s runtime, each one something to vet, patch and track. Hardware comes from whoever is on contract, and the machines that should run the model are scattered from desks to racks, with no single view of what runs where.',
    },
    useCases: {
      title: 'A smaller *footprint*.',
      intro: 'Four jobs for the team that has to run AI it can account for.',
      items: [
        {
          tag: 'control',
          title: 'Run models on hardware you own and secure.',
          body: 'Butter serves models on machines you hold, from a Mac Studio to RTX workstations and DGX Spark. Prompts, documents and outputs stay on that hardware unless you opt in.',
        },
        {
          tag: 'inference',
          title: 'Cut the dependency chain.',
          body: 'Butter is Swift on Metal and Rust for CUDA, with no Python and no JIT in the serving path. Fewer components means less to vet, less to patch and less that can break at the wrong moment.',
        },
        {
          tag: 'control',
          title: 'Harden the machines before the model arrives.',
          body: 'Pantry, our free and open-source scanner, finds the vulnerabilities that actually apply to a macOS or Linux machine and fixes what it safely can. Run it on every machine that will host a model.',
          link: { label: 'Explore Pantry', href: pantryFacts.path },
        },
        {
          tag: 'cost',
          title: 'Account for every GPU you bought.',
          body: 'Waffle shows every GPU and every engine on it, busy or idle, across Macs, workstations and racks. Capacity that sits idle shows up before the next purchase does.',
        },
      ],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro:
        'Butter runs the models, Waffle accounts for the hardware, and Iron keeps the next platform open.',
      items: [
        {
          product: 'butter',
          need: 'A serving stack with little to vet.',
          body: 'OpenAI-compatible serving in Swift on Metal and Rust for CUDA, with no Python and no JIT in the serving path. It loads safetensors, MLX, JANG and GGUF checkpoints directly, with no conversion step.',
        },
        {
          product: 'waffle',
          need: 'Every GPU you own, in one view.',
          body: 'Every GPU and every engine on it, whether that is Butter, vLLM, SGLang or llama.cpp. A small Rust sidecar on each host reports signed telemetry.',
        },
        {
          product: 'iron',
          need: 'Commodity hardware now, other platforms later.',
          body: 'One kernel definition lowers to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V behind a versioned C and Rust ABI, so a change of hardware does not mean a new codebase.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'The products are in early access and closed source for now. We make no compliance, certification or accreditation claims, and would rather say so here than in a review.',
      notes: [
        'Apple silicon is where every kernel is tuned first. CUDA is in production on RTX and DGX Spark, and datacenter GPUs are in progress.',
        'ROCm and Vulkan run but are not tuned yet.',
        'Tell us your security requirements and your hardware, and we will answer specifically.',
      ],
    },
    faq: [
      {
        question: 'Does anything leave our machines?',
        answer:
          'Inference data does not leave by default: models run on hardware you operate, and data stays there unless you opt in. Each Waffle host runs a sidecar that reports signed telemetry, and we will walk you through exactly what that contains.',
      },
      {
        question: 'Which hardware does it run on?',
        answer:
          'Commodity hardware you can buy and hold. Apple silicon through Metal is primary, and NVIDIA through CUDA is in production on RTX and DGX Spark. Datacenter GPUs are in progress, and AMD ROCm and Vulkan run but are not tuned yet.',
      },
      {
        question: 'Why does no Python in the serving path matter?',
        answer:
          'Every package in a serving stack is something to vet, patch and track. Butter is Swift on Metal and Rust for CUDA, with no Python and no JIT, so the chain between a model and an answer is shorter.',
      },
      {
        question: 'Are you accredited for defense work?',
        answer:
          'We make no compliance, certification or accreditation claims. Tell us what your program requires, and we will answer specifically.',
      },
      {
        question: 'How do we start?',
        answer:
          'Early access is open by request, and the products are closed source for now. Tell us your hardware and what has to stay on it, and we will write back.',
      },
    ],
    cta: {
      title: 'Bring us your *hardware*.',
      body: 'Early access, closed source for now. Tell us what you run and what has to stay on it, and we will tell you honestly what fits today.',
    },
  },
  es: militaryEs,
  fr: militaryFr,
  zh: militaryZh,
  ja: militaryJa,
  ko: militaryKo,
};
