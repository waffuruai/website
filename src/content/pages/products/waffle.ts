import type { ProductCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';

/*
 * Waffle, 03 · Control plane. Facts come from the content brief only.
 * TODO(founder): publish a hardware and engine support matrix for Waffle and
 * link it from the FAQ; until then the page says plainly that there isn't one.
 */
export const waffle: Localized<ProductCopy> = {
  en: {
    layer: 'Control plane',
    tagline: 'See every GPU and every engine running on it.',
    summary:
      'A control plane for LLMs on GPUs, from one box under a desk to a neocloud renting out a fleet. Each host runs a small Rust sidecar that reports signed telemetry. Works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers.',
    seo: {
      title: 'Waffle: a control plane for LLMs on GPUs',
      description:
        'See every GPU and every inference engine running on it, from one box under a desk to a neocloud fleet. A small Rust sidecar on each host reports signed telemetry. Works with Butter, vLLM, SGLang and llama.cpp.',
      keywords: [
        'GPU fleet management',
        'LLM control plane',
        'GPU observability',
        'vLLM SGLang llama.cpp monitoring',
      ],
    },
    hero: {
      title: 'See every GPU and every *engine* running on it.',
      lede: 'Waffle is a control plane for LLMs on GPUs, from one box under a desk to a neocloud renting out a fleet. Each host runs a small Rust sidecar that reports signed telemetry.',
      highlights: [
        { value: 'One box', label: 'under a desk, up to a neocloud fleet' },
        {
          value: 'Signed',
          label: 'telemetry from a small Rust sidecar on each host',
        },
        {
          value: 'No lock-in',
          label:
            'Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers',
        },
      ],
    },
    story: {
      heading: 'Know what’s running on every *GPU*.',
      problem:
        'A GPU box runs whatever engine somebody started on it: llama.cpp on one machine, vLLM on the next, SGLang on the new one. Finding out what is running, and where, means logging in to each host.',
      outcome:
        'Put a small Rust sidecar on each host. It reports signed telemetry, and Waffle shows you every GPU and every engine on it, whether you run one machine or a whole fleet.',
      outcomes: [
        'Watch one box under your desk, or a fleet you rent out, with the same tool.',
        'Keep the engines you already run. Waffle works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers.',
        'Rely on what you see: every host reports signed telemetry.',
      ],
    },
    capabilities: {
      heading: 'What Waffle *does*.',
      intro:
        'A control plane that sits beside your engines instead of replacing them.',
      items: [
        {
          title: 'Every GPU',
          body: 'See each GPU on each host in one place.',
        },
        {
          title: 'Every engine',
          body: 'See which engine is running on it: Butter, vLLM, SGLang, llama.cpp or another OpenAI-compatible server.',
        },
        {
          title: 'A small Rust sidecar',
          body: 'Each host runs a small sidecar written in Rust, so adding a machine means adding the sidecar.',
        },
        {
          title: 'Signed telemetry',
          body: 'Each sidecar signs the telemetry it reports.',
        },
        {
          title: 'One box to a fleet',
          body: 'Start with a single machine under a desk. The same setup reaches a neocloud renting out a fleet.',
        },
        {
          title: 'No lock-in',
          body: 'Waffle doesn’t need Butter. It works with vLLM, SGLang, llama.cpp and other OpenAI-compatible servers too.',
        },
      ],
    },
    specs: {
      heading: 'Technical *specifics*.',
      intro: 'The details, for the people who will read them.',
      rows: [
        { term: 'Role', detail: 'A control plane for LLMs on GPUs.' },
        {
          term: 'On each host',
          detail: 'A small sidecar written in Rust.',
        },
        {
          term: 'Telemetry',
          detail: 'Signed by the sidecar that reports it.',
        },
        {
          term: 'Engines',
          chips: [
            { label: 'Butter' },
            { label: 'vLLM' },
            { label: 'SGLang' },
            { label: 'llama.cpp' },
            { label: 'Other OpenAI-compatible servers' },
          ],
        },
        {
          term: 'Scale',
          detail: 'One box under a desk to a neocloud fleet.',
        },
        {
          term: 'Lock-in',
          detail: 'None. Waffle works with engines other than Butter.',
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
        'Waffle watches the GPUs, with Butter or without it. Butter runs models on the kernels Iron compiles, and Syrup remembers what you were working on.',
    },
    faq: [
      {
        question: 'Is Waffle open source?',
        answer:
          'Not today. Waffle is private and closed source during early access. Request access and we’ll write when there is more to share.',
      },
      {
        question: 'Do I have to use Butter?',
        answer:
          'No. Waffle works with Butter, vLLM, SGLang, llama.cpp and other OpenAI-compatible servers, so you keep the engines you already run.',
      },
      {
        question: 'Who is it for?',
        answer:
          'Anyone who runs LLMs on GPUs and wants to see them, from a single box under a desk to a neocloud renting out a fleet.',
      },
      {
        question: 'What does the sidecar do?',
        answer:
          'Each host runs a small sidecar written in Rust. It reports signed telemetry about the host’s GPUs and the engines running on them.',
      },
      {
        question: 'Which GPUs does it support?',
        answer:
          'We haven’t published a hardware matrix for Waffle yet. Tell us what you run and we’ll say plainly whether it fits.',
      },
    ],
    cta: {
      title: 'See your *fleet*.',
      body: 'Waffle is in early access and closed source for now. Request access, or tell us what you run.',
    },
  },
};
