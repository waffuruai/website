import type { Localized } from '@/content/types';

import type { IndustryPage } from './types';
import cloudInfrastructureEs from './cloud-infrastructure.es';
import cloudInfrastructureFr from './cloud-infrastructure.fr';
import cloudInfrastructureZh from './cloud-infrastructure.zh';
import cloudInfrastructureJa from './cloud-infrastructure.ja';
import cloudInfrastructureKo from './cloud-infrastructure.ko';

/*
 * Cloud infrastructure: GPU clouds, hosting providers and capacity builders,
 * whose business is revenue and margin per GPU-hour. Fleet visibility across
 * tenants and engines, managed inference with fewer moving parts, more than
 * one GPU vendor. No utilisation percentages, no revenue or margin claims,
 * no comparisons with other engines.
 *
 * Cost per tenant: the founder believes Waffle shows it today and it is on
 * the roadmap regardless (2026-10-27), so the page says so.
 *
 * TODO(founder): before Industries launches, confirm (1) cost per tenant is
 * shipping, and whether it is billing-grade; (2) licensing terms for offering Butter as a managed service to
 * tenants; (3) how the telemetry signature is verified.
 */
export const cloudInfrastructure: Localized<IndustryPage> = {
  en: {
    seo: {
      title: 'Inference software for GPU clouds and hosting',
      description:
        'For GPU clouds and hosting providers: see every GPU, engine and tenant, get more from each GPU-hour and serve on more than one vendor. Early access.',
      keywords: [
        'managed inference platform',
        'GPU hosting software',
        'GPU utilization',
        'revenue per GPU-hour',
        'multi-vendor GPU inference',
      ],
    },
    name: 'Cloud infrastructure',
    serviceType: 'GPU fleet visibility and managed inference software',
    card: {
      title: 'Cloud *infrastructure*',
      summary:
        'For GPU clouds and hosts: more from every GPU-hour, a view of every tenant, and more than one vendor.',
    },
    hero: {
      title: 'Make every GPU-hour *earn*.',
      lede: 'You sell capacity by the hour and answer for what runs on it. See every GPU, engine and tenant in one place, offer managed inference you can stand behind, and keep your options open across GPU vendors.',
    },
    problem: {
      title: 'Idle hours don’t *invoice*.',
      statement:
        'Revenue and margin per GPU-hour decide your business, and the fleet rarely tells you either one.',
      body: 'Tenants bring their own engines and settings, every vendor reports in its own way, and cost lands on the card rather than on the customer who used it. Customers now want managed inference, not just bare metal, and building that on a fragile Python stack is a risk you carry for them.',
    },
    useCases: {
      title: 'More from every *rack*.',
      intro: 'Four jobs for the team that sells GPU capacity.',
      items: [
        {
          tag: 'cost',
          title: 'Know what every GPU is doing.',
          body: 'Waffle gives one view across hosts, GPUs, engines and tenants, whether the engine is Butter, vLLM, SGLang or llama.cpp. Idle and mismatched capacity shows up on your screen before it shows up in the margin.',
        },
        {
          tag: 'control',
          title: 'See which tenant runs what.',
          body: 'Attributing cost starts with knowing who ran what, on which card. Each host runs a small Rust sidecar that reports signed telemetry, so readings can be verified as coming from the host that sent them.',
        },
        {
          tag: 'inference',
          title: 'Offer managed inference you can stand behind.',
          body: 'Butter serves an OpenAI-compatible API with streaming and tool calling, with no Python in the serving path. Fewer moving parts means less to patch and less to break under someone else’s workload.',
        },
        {
          tag: 'control',
          title: 'Rack more than one vendor.',
          body: 'Iron lowers one kernel definition to Metal, CUDA, HIP/ROCm and Vulkan SPIR-V behind a versioned C and Rust ABI. Adding a GPU vendor becomes tuning work, not a second codebase.',
        },
      ],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro:
        'Waffle is where you start. Butter and Iron go after the output underneath.',
      items: [
        {
          product: 'waffle',
          need: 'Every GPU, engine and tenant in one view.',
          body: 'A small Rust sidecar on each host reports signed telemetry, and Waffle breaks cost down per tenant. It works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers, so tenants keep the engines they chose.',
        },
        {
          product: 'butter',
          need: 'Managed inference with fewer moving parts.',
          body: 'Swift on Metal and Rust for CUDA, with no Python in the serving path. Quantized checkpoints and KV cache, speculative decoding and LoRA sit behind an OpenAI-compatible API.',
        },
        {
          product: 'iron',
          need: 'Kernels that follow you to the next vendor.',
          body: 'One kernel definition lowers to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V. A versioned C and Rust ABI lets the engines you already host call them.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'The part that matters most to a GPU cloud comes first: datacenter GPUs are in progress. Waffle, Butter and Iron are in early access and closed source for now.',
      notes: [
        'CUDA is in production on RTX and DGX Spark. Tell us your datacenter GPU generations, because the fleets we hear about shape what comes first.',
        'ROCm and Vulkan run today but are not tuned yet.',
        'We make no claim that Butter beats other engines on CUDA or ROCm. When we publish measurements, they will come with the method.',
      ],
    },
    faq: [
      {
        question: 'Do our tenants have to switch engines?',
        answer:
          'No. Waffle works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers. Tenants keep what they run, and you get one view across all of it.',
      },
      {
        question: 'Which GPUs does it support?',
        answer:
          'Apple silicon through Metal is primary. NVIDIA through CUDA is secondary, in production on RTX and DGX Spark, with datacenter GPUs in progress. AMD ROCm and Vulkan run but are not tuned yet.',
      },
      {
        question: 'How much will it add to our margin?',
        answer:
          'We will not promise a number. Seeing what each GPU runs, for whom and at what cost per tenant comes first. Output per GPU-hour and dollars per workload are what we then try to move, measured on your fleet.',
      },
      {
        question: 'Why should we trust the telemetry?',
        answer:
          'Each host runs a small Rust sidecar that reports signed telemetry, so readings can be verified as coming from the host that sent them. Ask us how signing works in your environment.',
      },
      {
        question: 'How do we get access?',
        answer:
          'Early access is open by request, and the products are closed source for now. Tell us about your fleet, your vendors and your tenants, and we will write back.',
      },
    ],
    cta: {
      title: 'Show us the *racks*.',
      body: 'Early access, closed source for now. Tell us your GPUs, your engines and how tenants share them, and we will tell you honestly what fits today.',
    },
  },
  es: cloudInfrastructureEs,
  fr: cloudInfrastructureFr,
  zh: cloudInfrastructureZh,
  ja: cloudInfrastructureJa,
  ko: cloudInfrastructureKo,
};
