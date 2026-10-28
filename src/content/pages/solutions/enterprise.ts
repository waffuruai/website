import type { Localized } from '@/content/types';

import type { SolutionPage } from './types';
import enterpriseEs from './enterprise.es';
import enterpriseFr from './enterprise.fr';
import enterpriseZh from './enterprise.zh';
import enterpriseJa from './enterprise.ja';
import enterpriseKo from './enterprise.ko';

/*
 * Enterprise: on-prem or private-cloud inference for sensitive data, with
 * one view of every GPU. Datacenter GPUs are in progress and the page says
 * so. Do not claim certifications, SSO, audit logging or air-gap support
 * until a human confirms them.
 *
 * TODO(founder): confirm (1) exactly what Syrup's signed telemetry contains
 * and where the control plane runs (self-hosted or hosted), so the "what
 * leaves our network" answer can be specific; (2) any compliance or
 * certification facts we may state.
 */
export const enterprise: Localized<SolutionPage> = {
  en: {
    seo: {
      title: 'On-prem LLM inference for the enterprise',
      description:
        'Run LLM inference on-prem or in your private cloud, keep sensitive data inside your boundary, and see every GPU and engine from one place. Early access.',
      keywords: [
        'on-prem LLM inference',
        'private AI infrastructure',
        'sovereign AI',
        'AI data privacy',
      ],
    },
    name: 'Enterprise',
    serviceType: 'On-premises and private-cloud LLM inference software',
    card: {
      title: '*Enterprise*',
      summary:
        'On-prem or private-cloud inference for sensitive data, with one view of every GPU.',
    },
    hero: {
      title: 'Private AI, on your own *terms*.',
      lede: 'Run models on hardware you operate, on-prem or in your private cloud, so sensitive data stays where it already lives. See every GPU and every engine on it from one place.',
    },
    problem: {
      title: 'Some data can’t *leave*.',
      statement:
        'The workloads worth automating touch customer records, contracts, source code and regulated data, which are the ones you cannot casually send to someone else’s API.',
      body: 'So a policy says no while teams quietly say yes, and GPUs sit scattered across clusters and clouds that nobody can see in one place. Security wants a boundary, finance wants a number for each workload, and engineering wants a model that simply serves requests.',
    },
    useCases: {
      title: 'Work that stays *inside*.',
      intro:
        'Four jobs for a platform team that answers to security, finance and engineering at once.',
      items: [
        {
          tag: 'control',
          title: 'Serve models inside your own boundary.',
          body: 'Run Butter on servers you operate, on-prem or in a private cloud, so prompts, documents and outputs stay on infrastructure you control. Our default is that a user’s data stays on their machine unless they opt in.',
        },
        {
          tag: 'cost',
          title: 'See every GPU and every engine in one place.',
          body: 'Syrup shows which GPUs are busy, which engines run on them and which sit idle, whether the engine is Butter, vLLM, SGLang or llama.cpp. That is the starting point for deciding what to consolidate, retire or buy.',
        },
        {
          tag: 'inference',
          title: 'Get more from the GPUs you already bought.',
          body: 'Kernels tuned per backend, quantized models and KV cache, and speculative decoding all go after more useful tokens per watt and per dollar. We would rather measure your workload than quote you a number.',
        },
        {
          tag: 'control',
          title: 'Point existing apps at it without a rewrite.',
          body: 'Butter’s OpenAI-compatible API supports streaming and tool calling, so internal tools change an address, not an SDK. Nothing locks you to one engine, because Syrup works alongside vLLM, SGLang and llama.cpp.',
        },
      ],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro:
        'Butter serves, Syrup watches, Whisk retrieves, and Iron sits underneath all three.',
      items: [
        {
          product: 'butter',
          need: 'Serve models on servers you operate.',
          body: 'OpenAI-compatible serving in Swift on Metal and Rust for CUDA, with no Python in the serving path. It loads safetensors, MLX, JANG and GGUF checkpoints directly, so there is no conversion pipeline between a new model and your servers.',
        },
        {
          product: 'syrup',
          need: 'One view of every GPU and every engine.',
          body: 'A small Rust sidecar on each host reports signed telemetry. Syrup works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers, so adopting it does not mean replacing what already runs.',
        },
        {
          product: 'whisk',
          need: 'Answers from your own sources, with citations.',
          body: 'Local retrieval over internal notes and code. Search is lexical plus vector, and results come back with citations over MCP.',
        },
        {
          product: 'iron',
          need: 'A hardware decision that is not a rewrite.',
          body: 'One kernel definition lowers to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V behind a versioned C and Rust ABI. When a second vendor or a new GPU generation arrives, the kernels carry over, with tuning following backend by backend.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'Enterprise datacenter GPUs are in progress, and we would rather say so up front. The products are in early access and closed source for now.',
      notes: [
        'Plan pilots around Apple silicon, RTX workstations and DGX Spark, where the stack runs today.',
        'Datacenter GPUs are in progress. If they are your target, tell us which ones, because it shapes what we build first.',
        'ROCm and Vulkan run but are not tuned yet.',
      ],
    },
    faq: [
      {
        question: 'Can we run it on-prem or in a private cloud?',
        answer:
          'That is how it is built. Butter serves models on hardware you operate, and a user’s data stays on their machine unless they opt in. Datacenter GPU support is in progress, so tell us what you plan to deploy on.',
      },
      {
        question: 'Which GPUs does it support today?',
        answer:
          'Apple silicon through Metal is primary, and NVIDIA through CUDA is secondary and in production on RTX and DGX Spark. AMD ROCm and Vulkan run but are not tuned yet. Enterprise datacenter GPUs are in progress.',
      },
      {
        question: 'Do we have to replace the serving stack we already run?',
        answer:
          'No. Syrup works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers, so you can get visibility first and decide about engines later.',
      },
      {
        question: 'What leaves our network?',
        answer:
          'Inference data does not leave by default, because a user’s data stays on their machine unless they opt in. Each Syrup host runs a sidecar that reports signed telemetry, and we will walk you through exactly what that contains for your environment.',
      },
      {
        question: 'How do we evaluate it?',
        answer:
          'Talk to us with your hardware and your workload. We will tell you honestly whether it fits today, and early access is open by request.',
      },
    ],
    cta: {
      title: 'Bring us your *workload*.',
      body: 'Early access, closed source for now. Tell us what has to stay in-house and which hardware you run, and we will tell you honestly what fits today.',
    },
  },
  es: enterpriseEs,
  fr: enterpriseFr,
  zh: enterpriseZh,
  ja: enterpriseJa,
  ko: enterpriseKo,
};
