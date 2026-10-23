import type { Localized } from '@/content/types';

import type { SolutionPage } from './types';
import aiCompaniesEs from './ai-companies.es';
import aiCompaniesFr from './ai-companies.fr';
import aiCompaniesZh from './ai-companies.zh';
import aiCompaniesJa from './ai-companies.ja';
import aiCompaniesKo from './ai-companies.ko';

/*
 * AI model and inference companies: one kernel definition shipped to
 * Metal/CUDA/ROCm/Vulkan, serving without Python, a memory layer for
 * agents. The numbers on this page (about 1,139 kernel declarations,
 * 4,164/4,164 HIP and Vulkan test cases) are public facts from the content
 * brief. No tok/s, no "faster than" claims.
 */
export const aiCompanies: Localized<SolutionPage> = {
  en: {
    seo: {
      title: 'GPU kernels and LLM serving for AI companies',
      description:
        'Write a kernel once and ship it to Metal, CUDA, ROCm and Vulkan. Serve models without Python, with a quantized KV cache and speculative decoding. Early access.',
      keywords: [
        'inference optimization',
        'GPU kernel portability',
        'LLM serving engine',
        'reduce inference cost',
      ],
    },
    name: 'AI model and inference companies',
    serviceType: 'GPU kernel compiler and LLM serving engine',
    card: {
      title: 'AI model and inference *companies*',
      summary:
        'One kernel definition for every GPU backend, and serving that needs no Python.',
    },
    hero: {
      title: 'Write the kernel once. Ship it to four *backends*.',
      lede: 'Iron compiles one kernel definition to Metal, CUDA, ROCm and Vulkan. Butter serves models on top without Python, and Syrup gives your agents a memory.',
    },
    problem: {
      title: 'Every backend is a *rewrite*.',
      statement:
        'Your model is only as portable as your kernels, and kernels are usually written once per vendor.',
      body: 'Supporting Apple silicon, NVIDIA, AMD and Vulkan tends to mean separate codebases and separate bugs, with Python on the hot path of the serving stack. Inference cost lands straight on your margin, and agents lose their context the moment a session ends.',
    },
    useCases: {
      title: 'What you can *ship*.',
      intro: 'Four jobs for the team that builds models, kernels or serving.',
      items: [
        {
          tag: 'inference',
          title: 'Write a kernel once and run it on four backends.',
          body: 'Iron is a Rust-embedded DSL. Kernels lower to a shared IR and then to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V, behind a versioned C and Rust ABI that existing hosts can call.',
        },
        {
          tag: 'inference',
          title: 'Serve without Python or a JIT.',
          body: 'Butter is Swift on Metal for Apple silicon and Rust for CUDA and the rest, with an OpenAI-compatible API, streaming and tool calling. Hybrid and MoE models, speculative decoding and LoRA are in the box.',
        },
        {
          tag: 'cost',
          title: 'Spend fewer watts per token.',
          body: '3- to 8-bit quantized checkpoints, a quantized KV cache, speculative decoding and per-backend kernels all go after tokens per watt and dollars per workload. We measure, and we will not quote a number we cannot reproduce.',
        },
        {
          tag: 'control',
          title: 'Give your agents a memory that stays local.',
          body: 'Syrup compresses embeddings with TurboQuant+ and runs lexical plus vector search on the machine. Results come back with citations over MCP, so agents can pick up where they left off.',
        },
      ],
    },
    sample: {
      title: 'A kernel looks like *this*.',
      intro:
        'A Rust function with a few attributes. Iron lowers it to every backend.',
      filename: 'unary.rs',
      language: 'iron · rust dsl',
      code: [
        '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
        'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
        '    let idx = program_id(0);',
        '    store(out[idx], exp(load(a[idx])));',
        '}',
      ].join('\n'),
      emitsLabel: 'Emits',
      emits: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro: 'Iron and Butter are the core. Syrup and Waffle round it out.',
      items: [
        {
          product: 'iron',
          need: 'One kernel definition, four backends.',
          body: 'Press the math once. Iron lowers it through a shared IR to Metal, CUDA, HIP/ROCm or Vulkan SPIR-V, and a versioned C and Rust ABI lets the engines you already have call the result.',
        },
        {
          product: 'butter',
          need: 'Model serving without Python.',
          body: 'Loads safetensors, MLX, JANG and GGUF with no conversion, plus 3- to 8-bit quantized checkpoints, hybrid and MoE models, a quantized KV cache, speculative decoding and LoRA. Text, vision, speech-to-text, text-to-speech and omni models sit behind an OpenAI-compatible API.',
        },
        {
          product: 'syrup',
          need: 'Memory for agents.',
          body: 'Local retrieval over notes and code: embeddings compressed with TurboQuant+, lexical plus vector search, and cited results over MCP.',
        },
        {
          product: 'waffle',
          need: 'Every engine on every GPU, in one view.',
          body: 'Run Butter next to vLLM, SGLang or llama.cpp and see them side by side. A small Rust sidecar on each host reports signed telemetry.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'Metal is where every kernel is written and tuned first. The products are in early access and closed source for now.',
      notes: [
        'Roughly 1,139 kernel declarations are in Iron today.',
        'HIP and Vulkan pass a test corpus of 4,164 of 4,164 cases bit-accurately, but they are not tuned yet.',
        'CUDA is in production on RTX and DGX Spark, with datacenter GPUs in progress.',
      ],
    },
    faq: [
      {
        question: 'How is Iron different from writing Metal and CUDA by hand?',
        answer:
          'You write one kernel definition in a Rust-embedded DSL, and it lowers through a shared IR to Metal, CUDA (PTX), HIP/ROCm or Vulkan SPIR-V. Tuning is still per backend, and today Metal gets it first.',
      },
      {
        question: 'Can our existing stack call Iron kernels?',
        answer:
          'Yes. A versioned C and Rust ABI lets existing hosts call them, so you do not need to adopt Butter to use Iron.',
      },
      {
        question: 'Is Butter faster than vLLM or llama.cpp?',
        answer:
          'We do not publish comparisons we cannot reproduce, and we make no claim that Butter beats other engines on CUDA or ROCm. Benchmarks beat opinions, so when numbers go public they will come with the method.',
      },
      {
        question: 'Which models does Butter run?',
        answer:
          'Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite, Phi, LFM, OLMo, SmolLM, Falcon H1, Jamba and InternLM, plus vision, speech and omni variants. DeepSeek V4 is in progress. Models load straight from Hugging Face with no conversion.',
      },
      {
        question: 'Can we get access?',
        answer:
          'Early access is open by request, and the products are closed source for now. Tell us which backends and models matter to you and we will write back.',
      },
    ],
    cta: {
      title: 'Press your math into *silicon*.',
      body: 'Early access, closed source for now. Tell us what you build, which backends matter and where Python is in your way, and we will write back.',
    },
  },
  es: aiCompaniesEs,
  fr: aiCompaniesFr,
  zh: aiCompaniesZh,
  ja: aiCompaniesJa,
  ko: aiCompaniesKo,
};
