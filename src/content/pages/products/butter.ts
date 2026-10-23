import type { ProductCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import butterEs from './butter.es';
import butterFr from './butter.fr';
import butterZh from './butter.zh';
import butterJa from './butter.ja';
import butterKo from './butter.ko';

/*
 * Butter, 02 · Serving. Facts come from the content brief only. Nothing here
 * is a benchmark: no tokens-per-second, no speedups. The terminal snippet
 * lives in `facts.ts` (placeholders, captioned as illustrative).
 */
export const butter: Localized<ProductCopy> = {
  en: {
    layer: 'Serving',
    tagline: 'Model serving without Python.',
    summary:
      'Swift on Metal for Apple silicon, Rust for CUDA and the rest. Loads 2- to 8-bit quantized checkpoints, hybrid and MoE models, with a quantized KV cache.',
    seo: {
      title: 'Butter: LLM inference without Python',
      description:
        'Butter is an LLM inference engine in Swift on Metal and Rust for CUDA and the rest. It serves Hugging Face models over an OpenAI-compatible API.',
      keywords: [
        'LLM inference engine',
        'local LLM serving',
        'Apple silicon inference',
        'OpenAI-compatible server',
        'quantized KV cache',
        'GGUF MLX safetensors',
      ],
    },
    hero: {
      title: 'Model serving *without* Python.',
      lede: 'Butter is an inference engine written in Swift on Metal for Apple silicon and Rust for CUDA and the rest. No Python, no JIT, and models load straight from Hugging Face.',
      highlights: [
        {
          value: '4',
          label: 'checkpoint formats, loaded without conversion',
        },
        {
          value: '2–8 bit',
          label: 'quantized checkpoints, with a quantized KV cache',
        },
        { value: 'No Python', label: 'and no JIT' },
      ],
    },
    story: {
      heading: 'Skip the Python and the *conversion*.',
      problem:
        'Getting a model to answer usually means a Python environment, a conversion step and a runtime that compiles as it goes. On a laptop or a single GPU box, that is a lot of machinery standing between you and a response.',
      outcome:
        'Point Butter at a model on Hugging Face. It loads safetensors, MLX, JANG and GGUF as they are, and butter serve gives you an OpenAI-compatible server on the hardware you already own.',
      outcomes: [
        'Run 2- to 8-bit quantized checkpoints, hybrid models and mixture-of-experts models on a Mac or an RTX workstation.',
        'Point the tools you already use at an OpenAI-compatible endpoint, with streaming and tool calling.',
        'Keep memory use down on long contexts with a quantized KV cache.',
      ],
    },
    capabilities: {
      heading: 'What Butter *does*.',
      intro:
        'From loading a checkpoint to streaming tokens, with no Python in between.',
      items: [
        {
          title: 'Loads models as they are',
          body: 'Pull safetensors, MLX, JANG or GGUF straight from Hugging Face. There is no conversion step.',
        },
        {
          title: 'Quantized, hybrid and MoE',
          body: 'Runs 2- to 8-bit quantized checkpoints, hybrid models and mixture-of-experts models.',
        },
        {
          title: 'A quantized KV cache',
          body: 'Stores the KV cache quantized, to keep memory use down as context grows.',
        },
        {
          title: 'OpenAI-compatible serving',
          body: 'butter serve exposes an OpenAI-compatible API, with streaming and tool calling.',
        },
        {
          title: 'Speculative decoding and LoRA',
          body: 'Speculative decoding for generation, and LoRA for the adapters you train yourself.',
        },
        {
          title: 'More than text',
          body: 'Text, vision, speech-to-text, text-to-speech and omni models.',
        },
      ],
    },
    code: {
      heading: 'Start a server, then *ask* it.',
      intro:
        'Butter speaks the OpenAI API, so the clients you already use can point at it.',
      caption:
        'Illustrative. Replace the placeholders with your model and port. Not a benchmark.',
    },
    specs: {
      heading: 'Technical *specifics*.',
      intro: 'The details, for the people who will read them.',
      rows: [
        {
          term: 'Runtime',
          detail:
            'Swift on Metal for Apple silicon. Rust for CUDA and the rest. No Python, no JIT.',
        },
        {
          term: 'Model formats',
          detail: 'Loaded straight from Hugging Face, with no conversion.',
          chips: [
            { label: 'safetensors' },
            { label: 'MLX' },
            { label: 'JANG' },
            { label: 'GGUF' },
          ],
        },
        { term: 'Quantization', detail: '2- to 8-bit quantized checkpoints.' },
        {
          term: 'Architectures',
          detail: 'Hybrid and mixture-of-experts (MoE) models.',
        },
        { term: 'KV cache', detail: 'Quantized.' },
        {
          term: 'Serving API',
          detail: 'OpenAI-compatible, started with butter serve.',
          chips: [
            { label: 'Streaming' },
            { label: 'Tool calling' },
            { label: 'Speculative decoding' },
            { label: 'LoRA' },
          ],
        },
        {
          term: 'Modalities',
          chips: [
            { label: 'Text' },
            { label: 'Vision' },
            { label: 'Speech-to-text' },
            { label: 'Text-to-speech' },
            { label: 'Omni' },
          ],
        },
        {
          term: 'Model families',
          groups: [
            { label: 'Meta', text: 'Llama 3, 3.1, 3.2, 3.3' },
            { label: 'Google', text: 'Gemma 2, 3, 4; PaliGemma' },
            { label: 'Qwen', text: '2, 3, 3.5, 3.6, 3.8; VL; Omni' },
            { label: 'OpenAI', text: 'GPT-OSS 20B, 120B; Whisper' },
            { label: 'Mistral', text: 'Mistral; Mistral 3 VL; Voxtral' },
            { label: 'NVIDIA', text: 'Nemotron H; Nemotron VLM' },
            { label: 'DeepSeek', text: 'V4', inProgress: true },
            { label: 'IBM', text: 'Granite 3, 4' },
            { label: 'Microsoft', text: 'Phi 3' },
            { label: 'Liquid AI', text: 'LFM2, LFM2.5' },
            { label: 'Ai2', text: 'OLMo 1, 2' },
            { label: 'Hugging Face', text: 'SmolLM; SmolVLM' },
            { label: 'TII', text: 'Falcon H1' },
            { label: 'AI21', text: 'Jamba' },
            { label: 'Apple', text: 'FastVLM' },
            { label: 'Shanghai AI Lab', text: 'InternLM 2' },
          ],
        },
        {
          term: 'Availability',
          detail: 'Private and closed source during early access.',
        },
      ],
    },
    platforms: {
      heading: 'Where it *runs*.',
      intro:
        'Metal is the primary target. CUDA is secondary, and ROCm and Vulkan run but are not tuned yet.',
      tiers: [
        {
          platform: 'Apple · Metal',
          level: 'primary',
          note: 'Swift on Metal for Apple silicon: MacBook and Mac Studio.',
        },
        {
          platform: 'NVIDIA · CUDA',
          level: 'secondary',
          note: 'Rust on CUDA. In production on RTX and DGX Spark; datacenter GPUs are in progress.',
        },
        {
          platform: 'AMD ROCm · Vulkan',
          level: 'runs',
          note: 'Works today, not tuned yet.',
        },
      ],
    },
    stack: {
      heading: 'Works with the rest of the *stack*.',
      intro:
        'Butter runs models on the kernels Iron compiles. Waffle can watch it alongside vLLM, SGLang and llama.cpp, and Syrup gives your AI a memory of what you were working on.',
    },
    faq: [
      {
        question: 'Is Butter open source?',
        answer:
          'Not today. Butter is private and closed source during early access. Request access and we’ll write when there is more to share.',
      },
      {
        question: 'What hardware does it run on?',
        answer:
          'Swift on Metal for Apple silicon is the primary target, from a MacBook to a Mac Studio. CUDA is secondary, in production on RTX and DGX Spark, with datacenter GPUs in progress. ROCm and Vulkan run today but are not tuned yet.',
      },
      {
        question: 'Which models does it run?',
        answer:
          'Coverage today includes Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite and Phi, among the others listed above, in text, vision, speech and omni variants. DeepSeek V4 is in progress.',
      },
      {
        question: 'Do I need Python?',
        answer:
          'No. Butter is Swift on Metal for Apple silicon and Rust for CUDA and the rest, with no Python and no JIT.',
      },
      {
        question: 'Will my existing tools work with it?',
        answer:
          'Butter serves an OpenAI-compatible API with butter serve, including streaming and tool calling, so clients that speak that API can point at it.',
      },
      {
        question: 'How fast is it?',
        answer:
          'We haven’t published benchmark numbers, so we won’t quote one here. Speculative decoding and a quantized KV cache are built in, and we’d rather show you a measurement than make a claim.',
      },
    ],
    cta: {
      title: 'Melt away *latency*.',
      body: 'Butter is in early access and closed source for now. Request access, and read the docs while you wait.',
      docsLabel: 'Read the docs',
    },
  },
  es: butterEs,
  fr: butterFr,
  zh: butterZh,
  ja: butterJa,
  ko: butterKo,
};
