import type { ProductCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import ironEs from './iron.es';
import ironFr from './iron.fr';
import ironZh from './iron.zh';
import ironJa from './iron.ja';
import ironKo from './iron.ko';

/*
 * Iron, 01 · Kernels. Facts come from the content brief only: no benchmark
 * numbers, no claims that CUDA or ROCm beat anything. The kernel, its
 * backend tiers and the hardware it runs on are one section with its own
 * copy (`../kernel-code.ts`), so this page has no `code` or `platforms`.
 */
export const iron: Localized<ProductCopy> = {
  en: {
    layer: 'Kernels',
    tagline: 'One kernel definition, four backends.',
    summary:
      'A Rust-embedded DSL. Kernels lower to a shared IR, then to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V. A versioned C and Rust ABI lets existing hosts call them.',
    seo: {
      title: 'Iron: one GPU kernel definition, four backends',
      description:
        'Write a GPU kernel once in Rust and lower it to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V. Iron has a versioned C and Rust ABI. Early access.',
      keywords: [
        'Rust GPU kernel DSL',
        'Metal kernels',
        'CUDA kernels',
        'ROCm HIP',
        'Vulkan SPIR-V',
        'cross-platform GPU kernels',
      ],
    },
    hero: {
      title: 'One kernel definition, *four* backends.',
      lede: 'Press raw math directly into high-performance silicon. Iron is a Rust-embedded DSL: you write the kernel once, it lowers to a shared IR, then to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V.',
      highlights: [
        { value: '4', label: 'GPU backends from one kernel definition' },
        { value: '~1,139', label: 'kernel declarations' },
        {
          value: '4,164 / 4,164',
          label: 'HIP and Vulkan test corpus, bit-accurate',
        },
      ],
    },
    story: {
      heading: 'Stop writing the same kernel *four* times.',
      problem:
        'Every GPU vendor has its own kernel language. Shipping on Apple, NVIDIA and AMD hardware means writing, tuning and testing the same math again for each one, then keeping every copy in step as the math changes.',
      outcome:
        'You write the kernel once, in Rust. Iron lowers it to a shared IR and then to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V, so a single definition covers every backend you target.',
      outcomes: [
        'Write and tune on the Mac on your desk first. Metal is the primary target, and the same definition carries to the other backends.',
        'Call your kernels from the code you already have, through a versioned C and Rust ABI.',
        'Check the backends against a bit-accurate test corpus instead of hoping two of them agree.',
      ],
    },
    capabilities: {
      heading: 'What Iron *does*.',
      intro: 'Built from the metal up, for people who write kernels.',
      items: [
        {
          title: 'One definition, four backends',
          body: 'Kernels lower to a shared IR, then to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V. You maintain one source.',
        },
        {
          title: 'Written in Rust',
          body: 'A Rust-embedded DSL. Kernels are Rust functions marked #[kernel], built from primitives like program_id, load and store.',
        },
        {
          title: 'Callable from your host',
          body: 'A versioned C and Rust ABI lets existing hosts call Iron kernels without being rewritten around them.',
        },
        {
          title: 'Bit-accurate by test',
          body: 'The HIP and Vulkan test corpus holds 4,164 cases, and all 4,164 are bit-accurate.',
        },
        {
          title: 'Over a thousand kernels',
          body: 'About 1,139 kernel declarations today. Each is one definition that every backend shares.',
        },
        {
          title: 'Tuned where it counts',
          body: 'Every kernel is written and tuned on Metal first. CUDA is secondary, and ROCm and Vulkan run today but are not tuned yet.',
        },
      ],
    },
    specs: {
      heading: 'Technical *specifics*.',
      intro: 'The details, for the people who will read them.',
      rows: [
        {
          term: 'Language',
          detail:
            'A Rust-embedded DSL. Kernels are Rust functions marked #[kernel].',
        },
        {
          term: 'Pipeline',
          detail:
            'One kernel definition lowers to a shared IR, then to each backend.',
        },
        {
          term: 'Backends',
          chips: [
            { label: 'Metal: MSL → .metallib' },
            { label: 'CUDA → PTX' },
            { label: 'HIP/ROCm: HIP → AMDGPU' },
            { label: 'Vulkan → SPIR-V' },
          ],
        },
        {
          term: 'Host ABI',
          detail:
            'A versioned C and Rust ABI, so existing hosts can call Iron kernels.',
        },
        { term: 'Kernel count', detail: 'About 1,139 kernel declarations.' },
        {
          term: 'Test corpus',
          detail: 'HIP and Vulkan: 4,164 of 4,164 cases bit-accurate.',
        },
        {
          term: 'Availability',
          detail: 'Private and closed source during early access.',
        },
      ],
    },
    stack: {
      heading: 'Works with the rest of the *stack*.',
      intro:
        'Iron stands on its own. Add Butter to run models on the kernels, Waffle to watch the GPUs they run on, or Syrup to give your AI a memory of what you were working on.',
    },
    faq: [
      {
        question: 'Is Iron open source?',
        answer:
          'Not today. Iron is private and closed source during early access. Request access and we’ll write when there is more to share.',
      },
      {
        question: 'Which hardware does it run on?',
        answer:
          'Metal on Apple silicon is the primary target: every kernel is written and tuned there first. CUDA is secondary, in production on RTX and DGX Spark, with datacenter GPUs in progress. ROCm and Vulkan run today but are not tuned yet.',
      },
      {
        question: 'Do I have to rewrite my host code?',
        answer:
          'Not to call Iron kernels. A versioned C and Rust ABI lets existing hosts call them.',
      },
      {
        question: 'Is it faster than hand-written CUDA or Metal?',
        answer:
          'We haven’t published benchmark numbers, so we won’t claim one. What we can say today is that one definition lowers to four backends, and the HIP and Vulkan test corpus is bit-accurate.',
      },
      {
        question: 'How do I try it?',
        answer: 'Request early access with the form on this page.',
      },
    ],
    cta: {
      title: 'Press your first *kernel*.',
      body: 'Iron is in early access and closed source for now. Request access.',
      docsLabel: 'Read the docs',
    },
  },
  es: ironEs,
  fr: ironFr,
  zh: ironZh,
  ja: ironJa,
  ko: ironKo,
};
