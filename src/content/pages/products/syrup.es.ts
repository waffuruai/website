import type { syrup } from './syrup';

// TODO(i18n): translate to es. Keep hrefs, slugs and product names.
const syrupEs: (typeof syrup)['en'] = {
  layer: 'Memory',
  tagline: 'Your AI remembers what you were working on.',
  summary:
    'Local retrieval over your notes and code. Embeddings are compressed with TurboQuant+, search is lexical plus vector, and results come back with citations over MCP.',
  seo: {
    title: 'Syrup: local memory and retrieval for your AI',
    description:
      'Syrup is local retrieval over your notes and code. Embeddings are compressed with TurboQuant+, search is lexical plus vector, and results come back with citations over MCP.',
    keywords: [
      'local RAG',
      'AI memory',
      'MCP retrieval',
      'private semantic search',
    ],
  },
  hero: {
    title: 'Your AI *remembers* what you were working on.',
    lede: 'Syrup is local retrieval over your notes and code. Embeddings are compressed with TurboQuant+, search is lexical plus vector, and results come back with citations over MCP.',
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
      'Syrup indexes your notes and code on your own machine. Your AI asks it over MCP and gets back the passages that matter, each with a citation you can check.',
    outcomes: [
      'Keep your notes and code on your own machine. Retrieval is local.',
      'Find things by the exact words you used or by what they mean: search is lexical plus vector.',
      'Check any answer against its source, because results come back with citations.',
    ],
  },
  capabilities: {
    heading: 'What Syrup *does*.',
    intro: 'A memory layer you run yourself, for the work you already have.',
    items: [
      {
        title: 'Local retrieval',
        body: 'Syrup searches your notes and code on your own machine, and your data stays there unless you opt in.',
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
      'Syrup works on its own, with any MCP client. Underneath it, Butter runs models, Waffle watches the GPUs and Iron compiles the kernels.',
  },
  faq: [
    {
      question: 'Is Syrup open source?',
      answer:
        'Not today. Syrup is private and closed source during early access. Request access and we’ll write when there is more to share.',
    },
    {
      question: 'Does my data leave my machine?',
      answer:
        'Retrieval is local: Syrup indexes and searches on your machine. We hold ourselves to a simple rule, which is that your data stays on your machine unless you opt in.',
    },
    {
      question: 'What does it index?',
      answer: 'Your notes and your code.',
    },
    {
      question: 'What is TurboQuant+?',
      answer:
        'The method Syrup uses to compress embeddings. It comes from our Chief of Research, Tom Turney.',
    },
    {
      question: 'What can use Syrup?',
      answer:
        'Anything that speaks MCP can ask Syrup for results, and each result comes back with a citation.',
    },
    {
      question: 'Do I need the rest of the stack?',
      answer:
        'No. Each Waffuru product works on its own, and Syrup is no exception.',
    },
  ],
  cta: {
    title: 'Give your AI a *memory*.',
    body: 'Syrup is in early access and closed source for now. Request access, or tell us what you’d like it to remember.',
  },
};

export default syrupEs;
