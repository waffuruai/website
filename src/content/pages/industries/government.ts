import type { Localized } from '@/content/types';

import type { IndustryPage } from './types';
import governmentEs from './government.es';
import governmentFr from './government.fr';
import governmentZh from './government.zh';
import governmentJa from './government.ja';
import governmentKo from './government.ko';

/*
 * Government: agencies and public bodies bringing inference in-house.
 * Sovereignty and residency, procurement scrutiny, avoiding lock-in, a mix
 * of hardware already bought. No compliance, accreditation or certification
 * claims (FedRAMP, IL levels and the like), no customers. Offline: most of
 * the stack runs offline once models are on the machines, and air-gapped
 * support is coming soon (founder, 2026-10-27); say no more than that.
 *
 * TODO(founder): confirm (1) on-prem support terms and procurement routes
 * we can name; (2) any accreditation status we may state; (3) what Syrup's
 * signed telemetry contains and whether the control plane runs fully
 * self-hosted, so "does any data leave" can be specific.
 */
export const government: Localized<IndustryPage> = {
  en: {
    seo: {
      title: 'Sovereign AI inference for government',
      description:
        'Run AI on hardware you control so public data stays in your jurisdiction, account for every workload, and avoid lock-in to one engine or vendor. Early access.',
      keywords: [
        'sovereign AI',
        'government AI infrastructure',
        'on-prem LLM for government',
        'AI data residency',
        'vendor-neutral AI inference',
      ],
    },
    name: 'Government',
    serviceType: 'Sovereign, on-premises AI inference software',
    card: {
      title: '*Government*',
      summary:
        'Sovereign inference on hardware you control, with no lock-in to one engine or vendor.',
    },
    hero: {
      title: 'Sovereign AI, on hardware you *control*.',
      lede: 'Run models on infrastructure your agency operates, so public data stays in your jurisdiction. Account for every GPU and every workload, and keep the freedom to change vendors without starting over.',
    },
    problem: {
      title: 'Public money, private *data*.',
      statement:
        'Public services run on data that has to stay in your jurisdiction, and every dollar of GPU spend has to survive a procurement review.',
      body: 'Hosted AI often means data leaving for someone else’s cloud. Buying hardware can mean betting on one vendor for years. Agencies end up with a mix of machines nobody can see in one place, and a serving stack that is hard to explain to the people who sign off on it.',
    },
    useCases: {
      title: 'Capability that stays *home*.',
      intro:
        'Four jobs for the team that has to make AI work under public rules.',
      items: [
        {
          tag: 'control',
          title: 'Keep data in your jurisdiction.',
          body: 'Butter serves models on servers you operate, on-prem or in a cloud you choose, so prompts and documents stay on infrastructure you control. Data stays put unless you opt in.',
        },
        {
          tag: 'cost',
          title: 'Show where the money goes.',
          body: 'Dollars per workload is the number a budget office asks for, and almost nobody can see it. Syrup shows every GPU, every engine on it and what sits idle, so spend ties back to the services it runs.',
        },
        {
          tag: 'control',
          title: 'Buy hardware without buying lock-in.',
          body: 'One Iron kernel definition lowers to Metal, CUDA, HIP/ROCm and Vulkan, and Syrup works with Butter, vLLM, SGLang and llama.cpp. Changing a GPU vendor or an engine becomes a decision, not a rewrite.',
        },
        {
          tag: 'inference',
          title: 'Use the hardware you already bought.',
          body: 'From Macs on desks to RTX workstations and DGX Spark, one stack serves models on what is already paid for. Butter keeps its dependencies minimal, so there is less to patch and less to justify.',
        },
      ],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro:
        'Butter keeps the work in your jurisdiction, Syrup accounts for it, Whisk answers from your own documents, and Iron keeps vendors interchangeable.',
      items: [
        {
          product: 'butter',
          need: 'Serve models on infrastructure you operate.',
          body: 'OpenAI-compatible serving in Swift for macOS and iOS and Rust for everything else, with minimal dependencies. Existing tools change an address, not an SDK.',
        },
        {
          product: 'syrup',
          need: 'One account of every GPU.',
          body: 'Every GPU and every engine in one view, whether that is Butter, vLLM, SGLang or llama.cpp. A small Rust sidecar on each host reports signed telemetry.',
        },
        {
          product: 'whisk',
          need: 'Answers from your own documents, with sources.',
          body: 'Local retrieval over internal notes, documents and code. Search is lexical plus vector, and results come back with citations over MCP.',
        },
        {
          product: 'iron',
          need: 'Vendor choice that survives the next tender.',
          body: 'One kernel definition lowers to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V behind a versioned C and Rust ABI. The kernels carry over when the hardware changes, and tuning follows backend by backend.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'The products are in early access and closed source for now, and we make no compliance or accreditation claims. Here is what works today.',
      notes: [
        'Plan pilots on Apple silicon, RTX workstations and DGX Spark, where the stack runs today. Datacenter GPUs are in progress.',
        'ROCm and Vulkan run but are not tuned yet.',
        'Most of the stack runs offline once models are on your machines. Air-gapped support is coming soon.',
        'Bring your procurement and security requirements to us directly, and we will answer them specifically.',
      ],
    },
    faq: [
      {
        question: 'Does any data leave our infrastructure?',
        answer:
          'Inference data does not leave by default, because data stays on the machine unless you opt in. Each Syrup host runs a sidecar that reports signed telemetry, and we will walk you through exactly what that contains for your environment.',
      },
      {
        question: 'Can it run offline?',
        answer:
          'Most of the stack runs offline once models are on your machines. Air-gapped support is coming soon, and we will tell you what works in your environment today.',
      },
      {
        question: 'Are you accredited for government use?',
        answer:
          'We make no compliance, certification or accreditation claims. Tell us what your agency requires, and we will answer specifically.',
      },
      {
        question: 'How does it avoid lock-in?',
        answer:
          'Syrup works with Butter, vLLM, SGLang and llama.cpp, so you are not tied to one engine. Iron kernels lower to Metal, CUDA, HIP/ROCm and Vulkan, so you are not tied to one GPU vendor.',
      },
      {
        question: 'Which hardware does it support?',
        answer:
          'Apple silicon through Metal is primary. NVIDIA through CUDA is secondary, in production on RTX and DGX Spark, with datacenter GPUs in progress. AMD ROCm and Vulkan run but are not tuned yet.',
      },
      {
        question: 'How do we evaluate it?',
        answer:
          'Early access is open by request, and the products are closed source for now. Tell us your hardware and your workload, and we will tell you honestly whether it fits today.',
      },
    ],
    cta: {
      title: 'Keep it in your *jurisdiction*.',
      body: 'Early access, closed source for now. Tell us what has to stay in-country and which hardware you run, and we will tell you honestly what fits today.',
    },
  },
  es: governmentEs,
  fr: governmentFr,
  zh: governmentZh,
  ja: governmentJa,
  ko: governmentKo,
};
