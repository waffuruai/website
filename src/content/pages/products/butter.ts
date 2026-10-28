import type { ProductCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import butterEs from './butter.es';
import butterFr from './butter.fr';
import butterZh from './butter.zh';
import butterJa from './butter.ja';
import butterKo from './butter.ko';

/*
 * Butter, 02 · Serving. Facts come from the content brief and from Butter's
 * own docs on `origin/dev` (documentation/serve.md, README.md, models.md,
 * quantization.md, kv-cache.md) plus merged PRs, verified 2026-10-26. The
 * only measured number in this copy is the "How fast is it?" answer, which
 * repeats the speculative decoding section rendered on the same page (its
 * numbers and test conditions live in `../speculative-research.ts`). The
 * terminal snippet lives in `facts.ts` (placeholders, captioned as
 * illustrative).
 *
 * TODO(founder): "no JIT" stays off the page because the CUDA host compiles
 * kernels through NVRTC at runtime (rust/README.md); Metal kernels ship
 * precompiled.
 */
export const butter: Localized<ProductCopy> = {
  en: {
    layer: 'Serving',
    tagline: 'Multi-modal inference, without compromise.',
    summary:
      'Swift on Metal for Apple silicon, Rust for CUDA and the rest. Loads 2- to 8-bit quantized checkpoints, hybrid and MoE models, and serves them over OpenAI-compatible and Anthropic Messages APIs.',
    seo: {
      title: 'Butter: multi-modal inference with minimal dependencies',
      description:
        'Butter is an LLM inference engine with minimal dependencies: Swift for macOS and iOS, Rust for everything else. It serves Hugging Face models over OpenAI-compatible and Anthropic Messages APIs, built for agent harnesses.',
      keywords: [
        'LLM inference engine',
        'local LLM serving',
        'Apple silicon inference',
        'OpenAI-compatible server',
        'Anthropic Messages API server',
        'quantized KV cache',
        'GGUF MLX safetensors',
      ],
    },
    hero: {
      title: 'Model serving without *compromise*.',
      lede: 'Butter serves models with minimal dependencies, using Swift for macOS and iOS and Rust for everything else, on kernels tuned for each backend. You get safety and maximal performance without compromises. Metal kernels ship precompiled, and models load straight from Hugging Face.',
      highlights: [
        {
          value: '4',
          label: 'checkpoint formats, loaded without conversion',
        },
        {
          value: '2–8 bit',
          label: 'quantized checkpoints, with a quantized KV cache',
        },
        { value: '2 APIs', label: 'OpenAI-compatible and Anthropic Messages' },
      ],
    },
    story: {
      heading: 'Your models. Your hardware. *No* token bill.',
      problem:
        'Most teams rent AI by the token. Every prompt leaves the building, the bill grows with every user, and the hardware you already paid for sits idle. Running models in-house usually takes a specialist team and weeks of setup.',
      outcome:
        "Butter turns a Mac or a GPU workstation you already own into a private AI server. Pick a model, start Butter, and your team's apps and agents can use it the same day.",
      outcomes: [
        'Cut the bill: open models run on hardware you already paid for, compressed so one machine serves more people and longer conversations. No per-token pricing.',
        'Keep data in-house: prompts, documents and answers never leave your machines.',
        'Change nothing upstream: Butter speaks the same OpenAI and Anthropic APIs your tools already use, so switching is a URL change.',
      ],
    },
    capabilities: {
      heading: 'What Butter *does*.',
      intro:
        'From loading a checkpoint to streaming tokens, with minimal dependencies along the way.',
      items: [
        {
          title: 'Loads models as they are',
          body: 'Pull safetensors, MLX, JANG or GGUF straight from Hugging Face. There is no conversion step.',
        },
        {
          title: 'Quantized, hybrid and MoE',
          body: 'Runs 2- to 8-bit quantized checkpoints, MXFP4 and NVFP4 block-scaled checkpoints, hybrid models and mixture-of-experts models.',
        },
        {
          title: 'A KV cache that fits',
          body: 'The KV cache can be stored 4- or 8-bit or AURA-compressed. Every cache is a ring at the context ceiling, so a long session evicts its oldest tokens with a warning instead of failing the request.',
        },
        {
          title: 'Two APIs, one server',
          body: 'butter serve speaks the OpenAI Chat Completions API and the Anthropic Messages API, with streaming, structured tool calls, reasoning in its own field and a reused prompt prefix across turns.',
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
    extras: [
      {
        id: 'agents',
        heading: 'Works with your *agent* harness.',
        intro:
          'Butter is the server. Your harness keeps its loop, its tools, its approvals and its compaction.',
        items: [
          {
            title: 'Two APIs, one session',
            body: 'OpenAI Chat Completions and Completions, and the Anthropic Messages API with system blocks, tool_use and tool_result history and thinking blocks. Set a base URL and go.',
          },
          {
            title: 'Structured tool calls, streamed',
            body: 'Tool calls come back as JSON with ids that stay unique across turns, streamed as deltas. Argument types follow your schema, so an integer stays an integer.',
          },
          {
            title: 'Reasoning you can see or hide',
            body: 'Thinking on or off per request. When it is on, the reasoning streams in its own field or thinking block and the answer stays clean.',
          },
          {
            title: 'A prompt prefix that survives tool rounds',
            body: 'Round two does not re-prefill your system prompt and tool list. usage.cached_tokens and cache_read_input_tokens report what was reused.',
          },
          {
            title: 'Cancel means cancel',
            body: 'Close the connection and that request stops, mid-prefill or mid-decode. Leftover work does not run and other requests carry on.',
          },
          {
            title: 'Context that degrades, not errors',
            body: 'The context budget is reported on /v1/models. Past the ceiling, the cache evicts the oldest tokens with a warning rather than failing the loop.',
          },
        ],
        note: 'Tested and supported with Oh My Pi over Chat Completions and with Claude Code-style clients over Messages, on Qwen 3.6, Qwen 3.8 and Flint.',
      },
      {
        id: 'quirks',
        heading: 'We handle the model’s *quirks* so your agent doesn’t.',
        intro:
          'Every family ships its own template, tokens and habits. Butter absorbs them at the server.',
        items: [
          {
            title: 'Chat templates and tokens',
            body: 'Nanbeige’s template keeps its whitespace, Qwen GGUF control tokens stay whole and digits tokenize at the checkpoint’s boundaries, so prompts match the official tokenizer and tool calls parse. Gemma and InternLM stop at the end of a turn instead of rambling.',
          },
          {
            title: 'Reasoning control',
            body: 'Think blocks are split from the answer and carried through tool rounds so the prefix cache survives. Flint’s reasoning can be given a token budget and a transition message.',
          },
          {
            title: 'Tool calls',
            body: 'Qwen’s XML tool calls become typed JSON, in the reply and in replayed history. A reply with no advertised tools is never turned into a call, and an unsupported tool_choice is refused up front instead of silently ignored.',
          },
          {
            title: 'Audio front ends',
            body: 'Whisper-family models get the Slaney mel filterbank they were trained on, Qwen3-ASR’s language header is stripped from transcripts, and Kokoro checkpoints route to Kokoro rather than StyleTTS2.',
          },
          {
            title: 'Loaders and memory',
            body: 'Tied-embedding GGUFs load without an output head, SentencePiece-only repos tokenize, streamed text keeps its spaces, and a Qwen conversation that outgrows its cache recovers instead of being refused.',
          },
        ],
      },
    ],
    specs: {
      heading: 'Technical *specifics*.',
      rows: [
        {
          term: 'Runtime',
          detail:
            'Swift on Metal for macOS and iOS, with macOS 14 or later. Rust for CUDA and everything else. Minimal dependencies, for less supply-chain risk.',
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
        {
          term: 'Quantization',
          detail:
            '2-, 3-, 4-, 5-, 6- and 8-bit affine checkpoints, with the width derived per tensor. MXFP4 and NVFP4 block-scaled checkpoints. Block FP8 on CUDA.',
        },
        {
          term: 'Architectures',
          detail:
            'Dense, hybrid (attention mixed with recurrence) and mixture-of-experts (MoE) models.',
        },
        {
          term: 'KV cache',
          detail:
            'Quantized: 4- or 8-bit affine, or AURA-compressed. Every cache is a ring at the context ceiling.',
        },
        {
          term: 'Serving API',
          detail:
            'OpenAI Chat Completions and Completions, Anthropic Messages, tokenize and count-tokens routes, health, readiness and Prometheus metrics. Started with butter serve, with --parallel for concurrent sessions.',
          chips: [
            { label: 'Streaming' },
            { label: 'Tool calling' },
            { label: 'Reasoning fields' },
            { label: 'Prefix reuse' },
            { label: 'Vision input' },
            { label: 'Speculative decoding' },
            { label: 'LoRA' },
          ],
        },
        {
          term: 'Agent harnesses',
          detail:
            'Tested and supported: Oh My Pi over Chat Completions, and Claude Code-style clients over Messages.',
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
            { label: 'DeepSeek', text: 'V4' },
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
        'Metal is the primary target. CUDA is being tuned now, and AMD through ROCm and Vulkan is moving fast.',
      tiers: [
        {
          platform: 'Apple · Metal',
          level: 'primary',
          note: 'Swift on Metal for Apple silicon, macOS 14 or later: MacBook, Mac mini and Mac Studio.',
        },
        {
          platform: 'NVIDIA · CUDA',
          level: 'secondary',
          note: 'Rust on CUDA. In production on RTX and DGX Spark.',
        },
        {
          platform: 'AMD ROCm · Vulkan',
          level: 'runs',
          note: 'AMD through ROCm and Vulkan, moving fast.',
        },
      ],
    },
    stack: {
      heading: 'Works with the rest of the *stack*.',
      intro:
        'Butter runs models on the kernels Iron compiles. Syrup can watch it alongside vLLM, SGLang and llama.cpp, and Whisk gives your AI a memory of what you were working on.',
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
          'Swift on Metal for Apple silicon is the primary target, from a MacBook to a Mac Studio on macOS 14 or later. CUDA is in production on RTX and DGX Spark and being tuned. AMD through ROCm and Vulkan is moving fast.',
      },
      {
        question: 'Which models does it run?',
        answer:
          'Coverage today includes Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite and Phi, among the others listed above, in text, vision, speech and omni variants.',
      },
      {
        question: 'What is Butter written in?',
        answer:
          'Swift for macOS and iOS, and Rust for everything else, for speed and memory safety. Butter keeps its dependencies minimal, so there is less room for a supply-chain attack, and it runs on kernels tuned for each backend.',
      },
      {
        question: 'Will my existing tools and agent harnesses work with it?',
        answer:
          'Butter serves the OpenAI Chat Completions API and the Anthropic Messages API from one butter serve process, with streaming, structured tool calls, reasoning fields and a reused prompt prefix. Clients that speak either API can point at it.',
      },
      {
        question: 'How fast is it?',
        answer:
          'On an M5 Max with 128 GB, Butter served Qwen3.8-27B 4-bit at 103 tokens per second for a single request (about 937-token prompts, greedy) and 146 tokens per second total across 8 concurrent requests, about 26 per request. Results depend on model, prompt length and hardware; the test conditions are listed with the measurements on this page.',
      },
    ],
    cta: {
      title: 'Melt away *latency*.',
      body: 'Butter is in early access and closed source for now. Request access.',
      docsLabel: 'Read the docs',
    },
  },
  es: butterEs,
  fr: butterFr,
  zh: butterZh,
  ja: butterJa,
  ko: butterKo,
};
