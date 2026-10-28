import type { ProductCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import waffleEs from './waffle.es';
import waffleFr from './waffle.fr';
import waffleZh from './waffle.zh';
import waffleJa from './waffle.ja';
import waffleKo from './waffle.ko';

/*
 * Waffle, 05 · Agents: the agent harness, with W (the assistant and its
 * personality) inside. Facts come from the founder and the waffuruai/
 * assistant README: a personal assistant for work and life, local models
 * first and the cloud only when a task needs more, coming soon. Everything it
 * will do is described as what it is being built to do.
 */
export const waffle: Localized<ProductCopy> = {
  en: {
    layer: 'Agents',
    tagline: 'The agent harness, with W, your assistant, inside.',
    summary:
      'Waffle is the harness your agents run in, with W, our assistant, inside. It runs local models first and reaches for the cloud only when a task needs more. Coming soon.',
    seo: {
      title: 'Waffle: the agent harness, with W inside',
      description:
        'Waffle is Waffuru’s agent harness, with W, a personal assistant for work and life, inside. Local models first, the cloud only when a task needs it. Coming soon.',
      keywords: [
        'agent harness',
        'AI assistant',
        'private AI assistant',
        'local AI agents',
      ],
    },
    hero: {
      title: 'Agents that work for *you*.',
      lede: 'Waffle is the harness your agents run in, with W, our assistant, inside: a trusted extension of you, for work and life. It runs local models first and reaches for the cloud only when a task needs more.',
      highlights: [
        { value: 'W', label: 'the assistant inside' },
        { value: 'Local first', label: 'the cloud only when a task needs it' },
        { value: 'Soon', label: 'built on Butter, Iron and Whisk' },
      ],
    },
    story: {
      heading: 'An assistant that is *yours*.',
      problem:
        'Most assistants live on someone else’s servers, see everything you share and charge for every token. Handing one your email, calendar and files means trusting a stranger with your work and your life.',
      outcome:
        'Waffle runs your assistant on hardware you own or rent. W gets its memory and context from Whisk and its models from Butter, and your data stays with you unless you opt in.',
      outcomes: [
        'Hand off everyday work, from email and calendar to bookings, projects and documents.',
        'Keep what your assistant learns about you on hardware you control.',
        'Spend on the compute you choose, not on every token.',
      ],
    },
    capabilities: {
      heading: 'What Waffle is *for*.',
      intro: 'Waffle is coming soon. This is what it is being built to do.',
      items: [
        {
          title: 'A harness for agents',
          body: 'The place your agents run: the models they call, the memory they draw on and the tools they use, together.',
        },
        {
          title: 'W, the assistant',
          body: 'A personal assistant for work and life, built to be a trusted extension of you: helpful, approachable and never scary.',
        },
        {
          title: 'Local models first',
          body: 'W runs on local models through Butter and Iron, and reaches for the cloud only when a task needs more.',
        },
        {
          title: 'Memory that stays yours',
          body: 'Context and memory come from Whisk, on hardware you control.',
        },
      ],
    },
    specs: {
      heading: 'Technical *specifics*.',
      intro: 'Where Waffle sits, for the people who will read it.',
      rows: [
        { term: 'Assistant', detail: 'W.' },
        {
          term: 'Models',
          detail: 'Local first; the cloud when a task needs more.',
        },
        {
          term: 'Runs on',
          detail: 'Butter and Iron, on hardware you own or rent.',
        },
        { term: 'Memory and context', detail: 'Whisk.' },
        { term: 'Availability', detail: 'Coming soon.' },
      ],
    },
    stack: {
      heading: 'The top of the *stack*.',
      intro:
        'Waffle sits on everything below it: Whisk for memory and context, Syrup for control, Butter to run the models and Iron for the kernels.',
    },
    faq: [
      {
        question: 'When can I use Waffle?',
        answer:
          'It is coming soon. Request early access and we will write when it is ready to try.',
      },
      {
        question: 'Is Waffle open source?',
        answer:
          'Not today. Waffle is coming soon, and it will be closed source during early access.',
      },
      {
        question: 'What is W?',
        answer:
          'W is the assistant inside Waffle: a personal assistant for work and life, built to be a trusted extension of you.',
      },
      {
        question: 'Does it need the cloud?',
        answer:
          'No. Waffle runs local models first and reaches for the cloud only when a task needs more.',
      },
      {
        question: 'Does my data leave my hardware?',
        answer: 'Not unless you choose to use a hosted AI inference provider.',
      },
    ],
    cta: {
      title: 'Meet *W* soon.',
      body: 'Waffle is coming soon. Request early access, and we will write when it is ready to try.',
    },
  },
  es: waffleEs,
  fr: waffleFr,
  zh: waffleZh,
  ja: waffleJa,
  ko: waffleKo,
};
