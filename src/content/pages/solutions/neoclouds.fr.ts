import type { neoclouds } from './neoclouds';

// TODO(i18n): translate to fr. Keep hrefs, slugs and product names.
const neocloudsFr: (typeof neoclouds)['en'] = {
  seo: {
    title: 'Inference platform for GPU clouds',
    description:
      'Fleet visibility across tenants and engines, more useful tokens per GPU, and signed telemetry from every host. Waffle works with vLLM, SGLang and llama.cpp. Early access.',
    keywords: [
      'GPU cloud software',
      'GPU utilization',
      'inference platform for GPU clouds',
      'multi-tenant GPU monitoring',
    ],
  },
  name: 'Neoclouds',
  serviceType: 'GPU fleet visibility and inference software',
  card: {
    title: '*Neoclouds*',
    summary:
      'Fleet visibility across tenants and engines, and more useful tokens per GPU.',
  },
  hero: {
    title: 'Get more from every *GPU* you rent out.',
    lede: 'See the whole fleet across tenants and engines, and put kernels tuned per backend under the work your customers run. Nothing locks you to one engine.',
  },
  problem: {
    title: 'A fleet you can’t *see*.',
    statement:
      'Customers bring their own engines, versions and settings, and the GPU underneath is the part you answer for.',
    body: 'A dashboard can say a card is busy without saying what is running on it, for whom or how well. Every engine reports in its own way, every tenant brings a different mix, and capacity that sits idle or poorly matched is revenue you cannot point to.',
  },
  useCases: {
    title: 'A tighter *fleet*.',
    intro: 'Four jobs for the team that keeps a GPU cloud running.',
    items: [
      {
        tag: 'cost',
        title: 'Know what is running on every GPU.',
        body: 'Waffle gives one view across hosts, GPUs, engines and tenants, whether the engine is vLLM, SGLang, llama.cpp or Butter. Idle and mismatched capacity shows up on your screen first.',
      },
      {
        tag: 'control',
        title: 'Trust the readings on your dashboard.',
        body: 'Each host runs a small Rust sidecar that reports signed telemetry, so readings can be verified as coming from the host that sent them. Fleet-wide numbers stop being taken on faith.',
      },
      {
        tag: 'inference',
        title: 'Serve more useful tokens per GPU.',
        body: 'Butter pairs kernels tuned per backend with quantized models and KV cache and speculative decoding, all aimed at tokens per watt. It runs alongside the engines your tenants already choose, so you can compare on your own fleet.',
      },
      {
        tag: 'control',
        title: 'Offer options without betting on one engine.',
        body: 'Butter serves an OpenAI-compatible API, and Waffle works with vLLM, SGLang and llama.cpp. You can give customers more choice without rebuilding around any single engine.',
      },
    ],
  },
  stackFit: {
    title: 'How the stack *fits*.',
    intro:
      'Waffle is the part built for you. Butter and Iron work on the efficiency underneath.',
    items: [
      {
        product: 'waffle',
        need: 'See the whole fleet.',
        body: 'From one box under a desk to a neocloud renting out a fleet. A small Rust sidecar on each host reports signed telemetry, and Waffle works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers.',
      },
      {
        product: 'butter',
        need: 'An engine you control, with no Python.',
        body: 'Swift on Metal, Rust for CUDA and the rest. Quantized checkpoints and KV cache, speculative decoding and LoRA sit behind an OpenAI-compatible API, with no Python and no JIT.',
      },
      {
        product: 'iron',
        need: 'Kernels for the hardware you buy next.',
        body: 'One kernel definition, four backends: Metal, CUDA, HIP/ROCm and Vulkan SPIR-V. A versioned C and Rust ABI lets existing hosts call them.',
      },
    ],
  },
  whereWeAre: {
    title: 'Where we *are*.',
    lede: 'Waffle and Butter are in early access and closed source for now. CUDA is in production on RTX and DGX Spark, and datacenter GPUs are in progress.',
    notes: [
      'Tell us your GPU generations. Datacenter CUDA is in progress, so the fleets we hear about shape what we do first.',
      'ROCm and Vulkan run today but are not tuned yet.',
      'We make no claim that Butter beats other engines on CUDA or ROCm. When we publish measurements, they will come with the method.',
    ],
  },
  faq: [
    {
      question: 'Does Waffle replace our current engines?',
      answer:
        'No. Waffle works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers. Get visibility first, and change engines only if and when you want to.',
    },
    {
      question: 'What GPUs does it run on?',
      answer:
        'Apple silicon through Metal is primary. NVIDIA through CUDA is secondary, in production on RTX and DGX Spark, with datacenter GPUs in progress. AMD ROCm and Vulkan run but are not tuned yet.',
    },
    {
      question: 'Why should we trust the telemetry?',
      answer:
        'Each host runs a small Rust sidecar that reports signed telemetry, so readings can be verified as coming from the host that sent them. Ask us how signing works in your environment.',
    },
    {
      question: 'How much utilization will it recover?',
      answer:
        'We will not promise a percentage. Seeing the fleet is the first step, and tokens per watt and dollars per workload are the numbers we try to move. We would rather measure them on your fleet than quote you one.',
    },
    {
      question: 'Can we try it?',
      answer:
        'Early access is open by request, and the products are closed source for now. Tell us about your fleet and we will write back.',
    },
  ],
  cta: {
    title: 'Show us the *fleet*.',
    body: 'Early access, closed source for now. Tell us your GPUs, your engines and how tenants share them, and we will write back about what fits.',
  },
};

export default neocloudsFr;
