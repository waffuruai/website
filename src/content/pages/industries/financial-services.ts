import type { Localized } from '@/content/types';

import type { IndustryPage } from './types';
import financialServicesEs from './financial-services.es';
import financialServicesFr from './financial-services.fr';
import financialServicesZh from './financial-services.zh';
import financialServicesJa from './financial-services.ja';
import financialServicesKo from './financial-services.ko';

/*
 * Financial services: banks, asset managers and insurers bringing inference
 * in-house. Client data can't leave, model risk and audit want to know what
 * runs where, and finance wants a cost per workload. No compliance or
 * certification claims (SOC 2, PCI and the like), no audit-logging or SSO
 * claims, no customers.
 *
 * TODO(founder): confirm (1) any compliance, certification or security
 * review facts we may state; (2) exactly what Syrup's signed telemetry
 * contains and where the control plane runs, so "what leaves our network"
 * can be specific; (3) whether Butter or Syrup keep a request log we can
 * describe to model risk teams.
 */
export const financialServices: Localized<IndustryPage> = {
  en: {
    seo: {
      title: 'Private AI inference for financial services',
      description:
        'Run AI where client data already lives, put a cost on every workload, and give model risk a smaller serving stack to review. Early access.',
      keywords: [
        'private AI for financial services',
        'on-prem LLM for banks',
        'AI cost per workload',
        'AI data residency',
        'GPU cost visibility',
      ],
    },
    name: 'Financial services',
    serviceType: 'Private, on-premises AI inference software for finance',
    card: {
      title: 'Financial *services*',
      summary:
        'Private inference on client data, with a cost per workload you can take to finance.',
    },
    hero: {
      title: 'Run AI where client data already *lives*.',
      lede: 'Serve models on hardware you operate, so client records, research and code stay inside your boundary. See what each workload costs before finance asks, and give model risk fewer moving parts to review.',
    },
    problem: {
      title: 'Every prompt is a *disclosure*.',
      statement:
        'The work worth automating sits on client data, and sending it to someone else’s API is a disclosure decision nobody wants to make one prompt at a time.',
      body: 'Meanwhile model risk wants to know what runs where, audit wants a trail, and finance wants a cost for each workload that nobody can produce. GPUs end up spread across desks and clusters, and the serving stack is a pile of dependencies that changes every week.',
    },
    useCases: {
      title: 'Work that stays on the *books*.',
      intro:
        'Four jobs for the platform team that answers to risk, finance and the business at once.',
      items: [
        {
          tag: 'control',
          title: 'Use AI on client data without sending it out.',
          body: 'Butter serves models on servers you operate, on-prem or in your private cloud, so prompts, documents and outputs stay on infrastructure you control. Our default is that data stays put unless you opt in.',
        },
        {
          tag: 'cost',
          title: 'Put a cost on every workload.',
          body: 'Dollars per workload is the number finance asks for, and almost nobody can see it. Syrup shows which GPUs are busy, which engines run on them and which sit idle, so spend ties back to the work it did.',
        },
        {
          tag: 'inference',
          title: 'Serve with fewer moving parts.',
          body: 'Butter keeps its dependencies minimal, so there is less to track between review and production, and its OpenAI-compatible API means internal tools change an address, not an SDK.',
        },
        {
          tag: 'control',
          title: 'Answer from your own research, with sources.',
          body: 'Whisk runs retrieval locally over internal notes, documents and code, and every answer comes back with a citation. An analyst can check the source instead of trusting the summary.',
        },
      ],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro:
        'Butter keeps the work inside, Syrup puts a number on it, Whisk brings the sources, and Iron sits underneath.',
      items: [
        {
          product: 'butter',
          need: 'Serve models inside your boundary.',
          body: 'OpenAI-compatible serving in Swift for macOS and iOS and Rust for everything else, with minimal dependencies. It loads safetensors, MLX, JANG and GGUF checkpoints directly, so a new model needs no conversion pipeline.',
        },
        {
          product: 'syrup',
          need: 'A cost for every workload.',
          body: 'Every GPU and every engine in one view, whether that is Butter, vLLM, SGLang or llama.cpp. A small Rust sidecar on each host reports signed telemetry, so the readings you take to finance can be traced to the host that sent them.',
        },
        {
          product: 'whisk',
          need: 'Answers with the source attached.',
          body: 'Local retrieval over internal notes, documents and code. Search is lexical plus vector, and results come back with citations over MCP.',
        },
        {
          product: 'iron',
          need: 'A vendor decision that is not a rewrite.',
          body: 'One kernel definition lowers to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V. If procurement changes GPU vendor, the kernels carry over and tuning follows backend by backend.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'Better you hear it here than in a vendor review. The products are in early access and closed source for now, and datacenter GPUs are in progress.',
      notes: [
        'Plan a pilot on Apple silicon, RTX workstations or DGX Spark, where the stack runs today.',
        'ROCm and Vulkan run but are not tuned yet.',
        'We make no compliance or certification claims on this site. Bring your requirements and we will answer them directly.',
      ],
    },
    faq: [
      {
        question: 'Does client data leave our network?',
        answer:
          'Inference data does not leave by default, because data stays on the machine unless you opt in. Each Syrup host runs a sidecar that reports signed telemetry, and we will walk you through exactly what that contains.',
      },
      {
        question: 'Can we see what each workload costs?',
        answer:
          'That is what Syrup is for. It shows every GPU and the engines on it, busy or idle, which is where a cost per workload starts. We would rather show it on your hardware than promise a figure.',
      },
      {
        question: 'Which hardware does it run on today?',
        answer:
          'Apple silicon through Metal is primary. NVIDIA through CUDA is secondary, in production on RTX and DGX Spark, with datacenter GPUs in progress. AMD ROCm and Vulkan run but are not tuned yet.',
      },
      {
        question: 'Is it certified for regulated workloads?',
        answer:
          'We make no compliance or certification claims. Tell us what your regulators and your risk team require, and we will answer specifically.',
      },
      {
        question: 'Do we have to replace what we already run?',
        answer:
          'No. Syrup works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers, so visibility comes first and engine decisions can wait.',
      },
    ],
    cta: {
      title: 'Show us what can’t *leave*.',
      body: 'Early access, closed source for now. Tell us which data has to stay inside and which hardware you run, and we will tell you honestly what fits today.',
    },
  },
  es: financialServicesEs,
  fr: financialServicesFr,
  zh: financialServicesZh,
  ja: financialServicesJa,
  ko: financialServicesKo,
};
