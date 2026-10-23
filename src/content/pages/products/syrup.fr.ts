import type { syrup } from './syrup';

const syrupFr: (typeof syrup)['en'] = {
  layer: 'Mémoire',
  tagline: 'Votre IA se souvient de ce sur quoi vous travailliez.',
  summary:
    'Recherche locale sur vos notes et votre code. Les embeddings sont compressés avec TurboQuant+, la recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
  seo: {
    title: 'Syrup : mémoire locale et recherche pour votre IA',
    description:
      'Syrup indexe vos notes et votre code en local. Embeddings compressés avec TurboQuant+, recherche lexicale et vectorielle, résultats cités via MCP.',
    keywords: [
      'RAG local',
      'mémoire d’IA',
      'recherche via MCP',
      'recherche sémantique privée',
    ],
  },
  hero: {
    title: 'Votre IA se *souvient* de ce sur quoi vous travailliez.',
    lede: 'Syrup est une recherche locale sur vos notes et votre code. Les embeddings sont compressés avec TurboQuant+, la recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
    highlights: [
      { value: 'Local', label: 'recherche sur vos notes et votre code' },
      {
        value: 'Lexical + vectoriel',
        label: 'recherche, sur des embeddings compressés avec TurboQuant+',
      },
      { value: 'Cités', label: 'résultats, livrés via MCP' },
    ],
  },
  story: {
    heading: 'Cessez de vous *réexpliquer*.',
    problem:
      'Chaque nouvelle conversation repart de zéro. Vous recollez les mêmes notes et les mêmes fichiers, et quand une réponse arrive, vous ne savez pas de quelle source elle vient.',
    outcome:
      'Syrup indexe vos notes et votre code sur votre propre machine. Votre IA l’interroge via MCP et récupère les passages utiles, chacun avec une citation que vous pouvez vérifier.',
    outcomes: [
      'Gardez vos notes et votre code sur votre propre machine. La recherche est locale.',
      'Retrouvez les choses par les mots exacts que vous avez employés ou par leur sens : la recherche est lexicale plus vectorielle.',
      'Vérifiez toute réponse à partir de sa source, car les résultats reviennent avec des citations.',
    ],
  },
  capabilities: {
    heading: 'Ce que fait *Syrup*.',
    intro:
      'Une couche de mémoire que vous faites tourner vous-même, pour le travail que vous avez déjà.',
    items: [
      {
        title: 'Recherche locale',
        body: 'Syrup fouille vos notes et votre code sur votre propre machine, et vos données y restent, sauf si vous choisissez de les partager.',
      },
      {
        title: 'Embeddings compressés',
        body: 'Les embeddings sont compressés avec TurboQuant+, pour que l’index prenne moins de place.',
      },
      {
        title: 'Recherche lexicale plus vectorielle',
        body: 'La correspondance de mots exacts et la recherche par le sens travaillent ensemble.',
      },
      {
        title: 'Citations via MCP',
        body: 'Les résultats reviennent avec leurs citations via MCP : n’importe quel client MCP peut les utiliser et montrer d’où vient chacun.',
      },
    ],
  },
  specs: {
    heading: 'Les *détails* techniques.',
    intro: 'Les détails, pour celles et ceux qui les liront.',
    rows: [
      { term: 'Indexe', detail: 'Vos notes et votre code.' },
      { term: 'Où ça tourne', detail: 'En local, sur votre machine.' },
      { term: 'Embeddings', detail: 'Compressés avec TurboQuant+.' },
      { term: 'Recherche', detail: 'Lexicale plus vectorielle.' },
      { term: 'Résultats', detail: 'Renvoyés avec leurs citations.' },
      { term: 'Interface', detail: 'MCP.' },
      {
        term: 'Disponibilité',
        detail: 'Privé et à code fermé pendant l’accès anticipé.',
      },
    ],
  },
  stack: {
    heading: 'Compatible avec le reste de la *stack*.',
    intro:
      'Syrup fonctionne seul, avec n’importe quel client MCP. En dessous, Butter exécute les modèles, Waffle surveille les GPU et Iron compile les kernels.',
  },
  faq: [
    {
      question: 'Syrup est-il open source ?',
      answer:
        'Pas aujourd’hui. Syrup est privé et à code fermé pendant l’accès anticipé. Demandez l’accès et nous vous écrirons quand il y aura plus à partager.',
    },
    {
      question: 'Mes données quittent-elles ma machine ?',
      answer:
        'La recherche est locale : Syrup indexe et recherche sur votre machine. Nous nous tenons à une règle simple : vos données restent sur votre machine, sauf si vous choisissez de les partager.',
    },
    {
      question: 'Qu’indexe-t-il ?',
      answer: 'Vos notes et votre code.',
    },
    {
      question: 'Qu’est-ce que TurboQuant+ ?',
      answer:
        'La méthode que Syrup utilise pour compresser les embeddings. Elle vient de notre directeur de la recherche, Tom Turney.',
    },
    {
      question: 'Qu’est-ce qui peut utiliser Syrup ?',
      answer:
        'Tout ce qui parle MCP peut demander des résultats à Syrup, et chaque résultat revient avec une citation.',
    },
    {
      question: 'Ai-je besoin du reste de la stack ?',
      answer:
        'Non. Chaque produit Waffuru fonctionne seul, et Syrup ne fait pas exception.',
    },
  ],
  cta: {
    title: 'Donnez une *mémoire* à votre IA.',
    body: 'Syrup est en accès anticipé et à code fermé pour l’instant. Demandez l’accès, ou dites-nous ce que vous aimeriez qu’il retienne.',
  },
};

export default syrupFr;
