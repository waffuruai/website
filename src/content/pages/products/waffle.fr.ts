import type { waffle } from './waffle';

const waffleFr: (typeof waffle)['en'] = {
  layer: 'Plan de contrôle',
  tagline: 'Voir chaque GPU et chaque moteur qui y tourne.',
  summary:
    'Un plan de contrôle pour les LLM sur GPU, d’une machine sous un bureau à un neocloud qui loue une flotte. Chaque hôte exécute un petit sidecar en Rust qui remonte une télémétrie signée. Fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI.',
  seo: {
    title: 'Waffle : un plan de contrôle pour les LLM sur GPU',
    description:
      'Voyez chaque GPU et chaque moteur d’inférence, d’une machine sous un bureau à une flotte de neocloud. Un petit sidecar Rust par hôte, télémétrie signée.',
    keywords: [
      'gestion de flotte GPU',
      'plan de contrôle LLM',
      'observabilité GPU',
      'supervision vLLM SGLang llama.cpp',
    ],
  },
  hero: {
    title: 'Voir chaque GPU et chaque *moteur* qui y tourne.',
    lede: 'Waffle est un plan de contrôle pour les LLM sur GPU, d’une machine sous un bureau à un neocloud qui loue une flotte. Chaque hôte exécute un petit sidecar en Rust qui remonte une télémétrie signée.',
    highlights: [
      {
        value: 'Une machine',
        label: 'sous un bureau, jusqu’à une flotte de neocloud',
      },
      {
        value: 'Signée',
        label:
          'la télémétrie, remontée par un petit sidecar Rust sur chaque hôte',
      },
      {
        value: 'Sans verrouillage',
        label:
          'Butter, vLLM, SGLang, llama.cpp et autres serveurs compatibles OpenAI',
      },
    ],
  },
  story: {
    heading: 'Sachez ce qui tourne sur chaque *GPU*.',
    problem:
      'Une machine GPU fait tourner le moteur que quelqu’un y a lancé : llama.cpp sur l’une, vLLM sur la suivante, SGLang sur la nouvelle. Savoir ce qui tourne, et où, oblige à se connecter à chaque hôte.',
    outcome:
      'Installez un petit sidecar Rust sur chaque hôte. Il remonte une télémétrie signée, et Waffle vous montre chaque GPU et chaque moteur qui y tourne, que vous ayez une machine ou toute une flotte.',
    outcomes: [
      'Surveillez une machine sous votre bureau, ou une flotte que vous louez, avec le même outil.',
      'Gardez les moteurs que vous utilisez déjà. Waffle fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI.',
      'Fiez-vous à ce que vous voyez : chaque hôte remonte une télémétrie signée.',
    ],
  },
  capabilities: {
    heading: 'Ce que fait *Waffle*.',
    intro:
      'Un plan de contrôle qui se place à côté de vos moteurs au lieu de les remplacer.',
    items: [
      {
        title: 'Chaque GPU',
        body: 'Voyez chaque GPU de chaque hôte au même endroit.',
      },
      {
        title: 'Chaque moteur',
        body: 'Voyez quel moteur tourne dessus : Butter, vLLM, SGLang, llama.cpp ou un autre serveur compatible OpenAI.',
      },
      {
        title: 'Un petit sidecar Rust',
        body: 'Chaque hôte exécute un petit sidecar écrit en Rust : ajouter une machine, c’est ajouter le sidecar.',
      },
      {
        title: 'Télémétrie signée',
        body: 'Chaque sidecar signe la télémétrie qu’il remonte.',
      },
      {
        title: 'D’une machine à une flotte',
        body: 'Commencez avec une seule machine sous un bureau. La même configuration monte jusqu’à un neocloud qui loue une flotte.',
      },
      {
        title: 'Sans verrouillage',
        body: 'Waffle n’a pas besoin de Butter. Il fonctionne aussi avec vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI.',
      },
    ],
  },
  specs: {
    heading: 'Les *détails* techniques.',
    intro: 'Les détails, pour celles et ceux qui les liront.',
    rows: [
      { term: 'Rôle', detail: 'Un plan de contrôle pour les LLM sur GPU.' },
      {
        term: 'Sur chaque hôte',
        detail: 'Un petit sidecar écrit en Rust.',
      },
      {
        term: 'Télémétrie',
        detail: 'Signée par le sidecar qui la remonte.',
      },
      {
        term: 'Moteurs',
        chips: [
          { label: 'Butter' },
          { label: 'vLLM' },
          { label: 'SGLang' },
          { label: 'llama.cpp' },
          { label: 'Autres serveurs compatibles OpenAI' },
        ],
      },
      {
        term: 'Échelle',
        detail: 'D’une machine sous un bureau à une flotte de neocloud.',
      },
      {
        term: 'Verrouillage',
        detail: 'Aucun. Waffle fonctionne avec d’autres moteurs que Butter.',
      },
      {
        term: 'Disponibilité',
        detail: 'Privé et à code fermé pendant l’accès anticipé.',
      },
    ],
  },
  stack: {
    heading: 'Compatible avec le reste de la *stack*.',
    intro:
      'Waffle surveille les GPU, avec ou sans Butter. Butter exécute les modèles sur les kernels qu’Iron compile, et Syrup se souvient de ce sur quoi vous travailliez.',
  },
  faq: [
    {
      question: 'Waffle est-il open source ?',
      answer:
        'Pas aujourd’hui. Waffle est privé et à code fermé pendant l’accès anticipé. Demandez l’accès et nous vous écrirons quand il y aura plus à partager.',
    },
    {
      question: 'Dois-je utiliser Butter ?',
      answer:
        'Non. Waffle fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI : vous gardez les moteurs que vous utilisez déjà.',
    },
    {
      question: 'À qui s’adresse-t-il ?',
      answer:
        'À toute personne qui fait tourner des LLM sur des GPU et veut les voir, d’une machine sous un bureau à un neocloud qui loue une flotte.',
    },
    {
      question: 'Que fait le sidecar ?',
      answer:
        'Chaque hôte exécute un petit sidecar écrit en Rust. Il remonte une télémétrie signée sur les GPU de l’hôte et sur les moteurs qui y tournent.',
    },
    {
      question: 'Quels GPU sont pris en charge ?',
      answer:
        'Nous n’avons pas encore publié de matrice matérielle pour Waffle. Dites-nous ce que vous utilisez et nous vous dirons franchement si cela convient.',
    },
  ],
  cta: {
    title: 'Voyez votre *flotte*.',
    body: 'Waffle est en accès anticipé et à code fermé pour l’instant. Demandez l’accès, ou dites-nous ce que vous utilisez.',
  },
};

export default waffleFr;
