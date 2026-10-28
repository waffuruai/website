import type { ProductCopy } from '@/content/pages/products/types';
import type { Localized } from '@/content/types';
import whiskEs from './whisk.es';
import whiskFr from './whisk.fr';
import whiskZh from './whisk.zh';
import whiskJa from './whisk.ja';
import whiskKo from './whisk.ko';

/*
 * Whisk, 04 · Memory. Facts come from the content brief only.
 * TurboQuant+ is Tom Turney's work (Chief of Research); the FAQ credits him.
 */
export const whisk: Localized<ProductCopy> = {
  en: {
    layer: 'Memory',
    tagline: 'Your AI remembers what you were working on.',
    summary:
      'Local retrieval over your notes and code. Embeddings are compressed with TurboQuant+, search is lexical plus vector, and results come back with citations over MCP.',
    seo: {
      title: 'Whisk: local memory and retrieval for your AI',
      description:
        'Whisk is local retrieval over your notes and code. Lexical plus vector search over TurboQuant+ compressed embeddings, with citations returned over MCP.',
      keywords: [
        'local RAG',
        'AI memory',
        'MCP retrieval',
        'private semantic search',
      ],
    },
    hero: {
      title: 'Your AI *remembers* what you were working on.',
      lede: 'Whisk is local retrieval over your notes and code. Embeddings are compressed with TurboQuant+, search is lexical plus vector, and results come back with citations over MCP.',
      highlights: [
        { value: 'Local', label: 'retrieval over your notes and code' },
        {
          value: 'Lexical + vector',
          label: 'search, over embeddings compressed with TurboQuant+',
        },
        { value: 'Cited', label: 'results, delivered over MCP' },
      ],
    },
    story: {
      heading: 'Stop re-explaining *yourself*.',
      problem:
        'Every new chat starts from nothing. You paste in the same notes and files again, and when an answer comes back you can’t tell which of them it came from.',
      outcome:
        'Whisk indexes your notes and code on your own machine. Your AI asks it over MCP and gets back the passages that matter, each with a citation you can check.',
      outcomes: [
        'Keep your notes and code on your own machine. Retrieval is local.',
        'Find things by the exact words you used or by what they mean: search is lexical plus vector.',
        'Check any answer against its source, because results come back with citations.',
      ],
    },
    capabilities: {
      heading: 'What Whisk *does*.',
      intro: 'A memory layer you run yourself, for the work you already have.',
      items: [
        {
          title: 'Local retrieval',
          body: 'Whisk searches your notes and code on your own machine, and your data stays there unless you opt in.',
        },
        {
          title: 'Compressed embeddings',
          body: 'Embeddings are compressed with TurboQuant+, so the index takes up less room.',
        },
        {
          title: 'Lexical plus vector search',
          body: 'Exact-word matching and meaning-based search work together.',
        },
        {
          title: 'Citations over MCP',
          body: 'Results come back with citations over MCP, so any MCP client can use them and show where each one came from.',
        },
      ],
    },
    specs: {
      heading: 'Technical *specifics*.',
      intro: 'The details, for the people who will read them.',
      rows: [
        { term: 'Indexes', detail: 'Your notes and code.' },
        { term: 'Where it runs', detail: 'Locally, on your machine.' },
        { term: 'Embeddings', detail: 'Compressed with TurboQuant+.' },
        { term: 'Search', detail: 'Lexical plus vector.' },
        { term: 'Results', detail: 'Returned with citations.' },
        { term: 'Interface', detail: 'MCP.' },
        {
          term: 'Availability',
          detail: 'Private and closed source during early access.',
        },
      ],
    },
    stack: {
      heading: 'Works with the rest of the *stack*.',
      intro:
        'Whisk works on its own, with any MCP client. Underneath it, Butter runs models, Syrup watches the GPUs and Iron compiles the kernels.',
    },
    faq: [
      {
        question: 'Is Whisk open source?',
        answer:
          'Not today. Whisk is private and closed source during early access. Request access and we’ll write when there is more to share.',
      },
      {
        question: 'Does my data leave my machine?',
        answer:
          'Retrieval is local: Whisk indexes and searches on your machine. We hold ourselves to a simple rule, which is that your data stays on your machine unless you opt in.',
      },
      {
        question: 'What does it index?',
        answer: 'Your notes and your code.',
      },
      {
        question: 'What is TurboQuant+?',
        answer:
          'The method Whisk uses to compress embeddings. It comes from our Chief of Research, Tom Turney.',
      },
      {
        question: 'What can use Whisk?',
        answer:
          'Anything that speaks MCP can ask Whisk for results, and each result comes back with a citation.',
      },
      {
        question: 'Do I need the rest of the stack?',
        answer:
          'No. Each Waffuru product works on its own, and Whisk is no exception.',
      },
    ],
    cta: {
      title: 'Give your AI a *memory*.',
      body: 'Whisk is in early access and closed source for now. Request access, or tell us what you’d like it to remember.',
    },
  },
  es: whiskEs,
  fr: whiskFr,
  zh: whiskZh,
  ja: whiskJa,
  ko: whiskKo,
};
