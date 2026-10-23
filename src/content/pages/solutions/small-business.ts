import type { Localized } from '@/content/types';

import type { SolutionPage } from './types';

/*
 * Small business: private AI on a Mac Studio or an RTX box, no cloud bill.
 * Facts come from the content brief only. Do not add benchmarks, prices,
 * customer names or model-quality claims.
 */
export const smallBusiness: Localized<SolutionPage> = {
  en: {
    seo: {
      title: 'Private AI for small business',
      description:
        'Run private AI on a Mac Studio or an RTX workstation you already own. Your data stays on your machine and there is no per-token cloud bill. Early access.',
      keywords: [
        'private AI for small business',
        'local AI',
        'on-device LLM',
        'AI without cloud costs',
      ],
    },
    name: 'Small business',
    serviceType: 'Private, local AI inference software',
    card: {
      title: 'Small *business*',
      summary: 'Private AI on a Mac Studio or an RTX box, with no cloud bill.',
    },
    hero: {
      title: 'Private AI, without the *cloud* bill.',
      lede: 'Run open models on a Mac Studio or an RTX workstation you already own. Your files stay on your machine, and nothing is metered per question.',
    },
    problem: {
      title: 'Every prompt has a *price*.',
      statement:
        'AI is most useful on your own files, and that is exactly where the bills and the privacy questions start.',
      body: 'Per-token pricing makes every experiment feel expensive, and sending client documents, invoices or source code to someone else’s servers is a decision you would rather not make for every prompt. Meanwhile the machine on your desk is already able to run open models like Llama, Gemma, Qwen and GPT-OSS.',
    },
    useCases: {
      title: 'Put the box to *work*.',
      intro: 'Four jobs a small team can hand to a machine it already owns.',
      items: [
        {
          tag: 'cost',
          title: 'Stop paying per question.',
          body: 'Run models on a Mac Studio or an RTX workstation you already own, so spend stops scaling with every prompt, document and teammate. Heavy use becomes a power bill, not a surprise invoice.',
        },
        {
          tag: 'control',
          title: 'Work on client files without sending them anywhere.',
          body: 'Models, prompts and documents stay on your machine unless you opt in. Summarize contracts, draft replies and check invoices without a third party in the loop.',
        },
        {
          tag: 'inference',
          title: 'Fit a bigger model on the machine you have.',
          body: '3- to 8-bit quantized checkpoints and a quantized KV cache let larger models and longer conversations fit in the memory you already own. Butter loads them straight from Hugging Face, with no conversion step.',
        },
        {
          tag: 'control',
          title: 'Ask questions of your own notes and code.',
          body: 'Syrup runs retrieval locally over your notes and code, so an answer comes back with a citation to where it came from. Search is lexical plus vector, so exact names and fuzzy questions both land.',
        },
      ],
    },
    stackFit: {
      title: 'How the stack *fits*.',
      intro:
        'Butter does the heavy lifting. Syrup and Waffle are there when you want them.',
      items: [
        {
          product: 'butter',
          need: 'Run models on the machine you own.',
          body: 'Swift on Metal for Apple silicon, Rust for CUDA and the rest. Llama, Gemma, Qwen, GPT-OSS and more run alongside speech-to-text, text-to-speech and vision models, and butter serve gives your apps an OpenAI-compatible endpoint.',
        },
        {
          product: 'syrup',
          need: 'Ask your own files, and get sources.',
          body: 'Local retrieval over your notes and code. Results come back with citations over MCP, so assistants can show their work.',
        },
        {
          product: 'waffle',
          need: 'Keep an eye on the box under your desk.',
          body: 'From one machine to a small rack, see every GPU and every engine running on it, whether that is Butter, llama.cpp, vLLM or SGLang.',
        },
      ],
    },
    whereWeAre: {
      title: 'Where we *are*.',
      lede: 'Waffuru is in early access, and the products are closed source for now. Here is what that means for a small team.',
      notes: [
        'Apple silicon is where every kernel is tuned first, so a Mac Studio is the smoothest place to start.',
        'NVIDIA RTX workstations run on CUDA, which is in production. AMD and Vulkan run but are not tuned yet.',
        'Model coverage is wide and growing, and DeepSeek V4 is in progress.',
      ],
    },
    faq: [
      {
        question: 'What hardware do I need?',
        answer:
          'A Mac with Apple silicon is the best-supported place to start, because Metal is where every kernel is tuned first. RTX workstations run on CUDA, and DGX Spark and Strix Halo are on the list too. How large a model you can run depends on how much memory you have.',
      },
      {
        question: 'Will local models be as good as the biggest hosted ones?',
        answer:
          'Not for every task, and we will not pretend otherwise. Open models cover a lot of everyday work, and for the hardest jobs a hosted model may still be the better tool. Running locally means you choose per task instead of defaulting to the cloud.',
      },
      {
        question: 'Does my data leave my machine?',
        answer:
          'Not unless you opt in. Models run locally, and your prompts, files and notes stay on your machine by default.',
      },
      {
        question: 'Can I keep using the apps I already have?',
        answer:
          'If they speak the OpenAI API, usually yes. Butter serves an OpenAI-compatible endpoint with streaming and tool calling, so many tools only need a new address.',
      },
      {
        question: 'Can I try it today?',
        answer:
          'Early access is open by request, and the products are closed source for now. Tell us what you want to run and on what hardware, and we will write back.',
      },
    ],
    cta: {
      title: 'Run it on your *own* machine.',
      body: 'Early access, closed source for now. Tell us what you want to run and on what hardware, and we will write back.',
    },
  },
};
