import type { whisk } from './whisk';

const whiskFr: (typeof whisk)['en'] = {
  layer: 'Mémoire',
  tagline: 'Une IA qui se souvient de ce sur quoi vous travailliez.',
  summary:
    'Recherche locale sur vos notes, votre code, vos documents et vos images. Les embeddings sont compressés avec notre algorithme de compression propriétaire AURA, la recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
  seo: {
    title: 'Whisk : mémoire locale et recherche pour votre IA',
    description:
      'Whisk incorpore vos notes, votre code, vos documents et vos images à vos sessions d’IA. Recherche lexicale et vectorielle sur des embeddings compressés par AURA, résultats cités via MCP.',
    keywords: [
      'RAG local',
      'mémoire d’IA',
      'recherche via MCP',
      'recherche sémantique privée',
    ],
  },
  hero: {
    title: 'Une IA qui se *souvient* de ce sur quoi vous travailliez.',
    lede: 'Whisk va chercher et mélange les notes, le code, les documents et les images utiles de votre ordinateur, et les incorpore en douceur à vos sessions d’IA.',
    highlights: [
      {
        value: 'Local',
        label:
          'recherche sur vos notes, votre code, vos documents et vos images',
      },
      {
        value: 'Lexical + vectoriel',
        label:
          'recherche, sur des embeddings compressés avec notre algorithme AURA',
      },
      { value: 'Cités', label: 'résultats, livrés via MCP' },
    ],
  },
  story: {
    heading: 'Cessez de vous *réexpliquer*.',
    problem:
      'Chaque nouvelle conversation repart de zéro. Vous recollez les mêmes notes et les mêmes fichiers, et quand une réponse arrive, vous ne savez pas de quelle source elle vient.',
    outcome:
      'Whisk indexe vos notes, votre code, vos documents et vos images sur votre propre machine. Votre IA le sollicite et récupère les passages utiles, chacun accompagné d’une citation vers la source d’origine, que vous pouvez vérifier.',
    outcomes: [
      'Gardez vos notes et votre code sur votre propre machine. La recherche est locale.',
      'Retrouvez les choses par les mots exacts que vous avez employés ou par leur sens : la recherche est lexicale plus vectorielle.',
      'Vérifiez toute réponse à partir de sa source, car les résultats reviennent avec des citations.',
    ],
  },
  capabilities: {
    heading: 'Ce que fait *Whisk*.',
    intro:
      'Une couche de mémoire que vous faites tourner vous-même, pour le travail que vous avez déjà.',
    items: [
      {
        title: 'Recherche locale',
        body: 'Whisk fouille vos notes, votre code, vos documents et vos images sur votre propre machine, et vos données y restent, sauf si vous choisissez d’utiliser un modèle hébergé chez un fournisseur d’inférence.',
      },
      {
        title: 'Embeddings compressés',
        body: 'Les embeddings sont compressés avec notre algorithme de compression propriétaire AURA, pour que vos données prennent moins de place.',
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
    rows: [
      {
        term: 'Indexe',
        detail: 'Vos notes, votre code, vos documents et vos images.',
      },
      { term: 'Où ça tourne', detail: 'En local, sur votre machine.' },
      {
        term: 'Embeddings',
        detail:
          'Compressés avec AURA, notre algorithme de compression propriétaire.',
      },
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
      'Whisk fonctionne seul, avec n’importe quel client MCP. En dessous, Butter exécute les modèles, Syrup surveille les GPU et Iron compile les kernels.',
  },
  faq: [
    {
      question: 'Whisk est-il open source ?',
      answer:
        'Pas aujourd’hui. Whisk est privé et à code fermé pendant l’accès anticipé. Demandez l’accès et nous vous écrirons quand il y aura plus à partager.',
    },
    {
      question: 'Mes données quittent-elles ma machine ?',
      answer:
        'La recherche est locale : Whisk indexe et recherche sur votre machine. Nous nous tenons à une règle simple : vos données restent sur votre machine, sauf si vous choisissez d’utiliser un modèle hébergé chez un fournisseur d’inférence.',
    },
    {
      question: 'Qu’indexe-t-il ?',
      answer: 'Vos notes, votre code, vos documents et vos images.',
    },
    {
      question: 'Qu’est-ce qu’AURA ?',
      answer:
        'Notre algorithme de compression propriétaire, pour que vos données prennent moins de place. Il s’inspire de TurboQuant+, les améliorations apportées par Tom Turney au [TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/) de Google, et nous sommes allés encore plus loin avec quelques techniques inédites de notre cru. AURA est né d’une collaboration entre Eric Kryski et Tom Turney.',
    },
    {
      question: 'Qu’est-ce qui peut utiliser Whisk ?',
      answer:
        'Tout ce qui parle MCP peut demander des résultats à Whisk, et chaque résultat revient avec une citation.',
    },
    {
      question: 'Ai-je besoin du reste de la stack ?',
      answer:
        'Non. Chaque produit Waffuru fonctionne seul, et Whisk ne fait pas exception.',
    },
  ],
  cta: {
    title: 'Donnez une *mémoire* à votre IA.',
    body: 'Whisk est en accès anticipé et à code fermé pour l’instant. Demandez l’accès, ou dites-nous ce que vous aimeriez qu’il retienne.',
  },
};

export default whiskFr;
