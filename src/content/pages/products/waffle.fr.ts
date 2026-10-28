import type { waffle } from './waffle';

const waffleFr: (typeof waffle)['en'] = {
  layer: 'Agents',
  tagline: 'Le harnais d’agents, avec W, votre assistant, à l’intérieur.',
  summary:
    'Waffle est le harnais dans lequel tournent vos agents, avec W, notre assistant, à l’intérieur. Il fait d’abord appel à des modèles locaux et ne se tourne vers le cloud que lorsqu’une tâche en demande davantage. Bientôt disponible.',
  seo: {
    title: 'Waffle : le harnais d’agents, avec W à l’intérieur',
    description:
      'Waffle est le harnais d’agents de Waffuru, avec W à l’intérieur : un assistant personnel pour le travail et la vie. Les modèles locaux d’abord, le cloud seulement quand une tâche l’exige. Bientôt disponible.',
    keywords: [
      'harnais d’agents',
      'assistant IA',
      'assistant IA privé',
      'agents IA locaux',
    ],
  },
  hero: {
    title: 'Des agents qui travaillent pour *vous*.',
    lede: 'Waffle est le harnais dans lequel tournent vos agents, avec W, notre assistant, à l’intérieur : un prolongement de vous-même digne de confiance, pour le travail et la vie. Il fait d’abord appel à des modèles locaux et ne se tourne vers le cloud que lorsqu’une tâche en demande davantage.',
    highlights: [
      { value: 'W', label: 'l’assistant à l’intérieur' },
      {
        value: 'Local d’abord',
        label: 'le cloud seulement quand une tâche l’exige',
      },
      { value: 'Bientôt', label: 'construit sur Butter, Iron et Whisk' },
    ],
  },
  story: {
    heading: 'Un assistant bien à *vous*.',
    problem:
      'La plupart des assistants vivent sur les serveurs de quelqu’un d’autre, voient tout ce que vous partagez et facturent chaque token. Leur confier vos e-mails, votre agenda et vos fichiers, c’est confier votre travail et votre vie à un inconnu.',
    outcome:
      'Waffle fait tourner votre assistant sur du matériel que vous possédez ou louez. W tire sa mémoire et son contexte de Whisk et ses modèles de Butter, et vos données restent chez vous, sauf si vous choisissez de les partager.',
    outcomes: [
      'Déléguez le travail du quotidien, des e-mails et de l’agenda aux réservations, aux projets et aux documents.',
      'Gardez ce que votre assistant apprend sur vous sur du matériel que vous contrôlez.',
      'Payez la puissance de calcul que vous choisissez, pas chaque token.',
    ],
  },
  capabilities: {
    heading: 'À quoi *sert* Waffle.',
    intro: 'Waffle arrive bientôt. Voici ce pour quoi il est conçu.',
    items: [
      {
        title: 'Un harnais pour vos agents',
        body: 'L’endroit où tournent vos agents : les modèles qu’ils appellent, la mémoire dans laquelle ils puisent et les outils qu’ils utilisent, réunis.',
      },
      {
        title: 'W, l’assistant',
        body: 'Un assistant personnel pour le travail et la vie, conçu pour être un prolongement de vous-même digne de confiance : utile, accessible et jamais inquiétant.',
      },
      {
        title: 'Les modèles locaux d’abord',
        body: 'W tourne sur des modèles locaux grâce à Butter et Iron, et ne se tourne vers le cloud que lorsqu’une tâche en demande davantage.',
      },
      {
        title: 'Une mémoire qui reste la vôtre',
        body: 'Le contexte et la mémoire viennent de Whisk, sur du matériel que vous contrôlez.',
      },
    ],
  },
  specs: {
    heading: 'Les *détails* techniques.',
    intro: 'La place de Waffle, pour celles et ceux qui liront ces lignes.',
    rows: [
      { term: 'Assistant', detail: 'W.' },
      {
        term: 'Modèles',
        detail:
          'Locaux d’abord ; le cloud quand une tâche en demande davantage.',
      },
      {
        term: 'Tourne sur',
        detail: 'Butter et Iron, sur du matériel que vous possédez ou louez.',
      },
      { term: 'Mémoire et contexte', detail: 'Whisk.' },
      { term: 'Disponibilité', detail: 'Bientôt disponible.' },
    ],
  },
  stack: {
    heading: 'Le sommet de la *stack*.',
    intro:
      'Waffle repose sur tout ce qui se trouve en dessous : Whisk pour la mémoire et le contexte, Syrup pour le contrôle, Butter pour exécuter les modèles et Iron pour les kernels.',
  },
  faq: [
    {
      question: 'Quand pourrai-je utiliser Waffle ?',
      answer:
        'Bientôt. Demandez l’accès anticipé et nous vous écrirons quand il sera prêt à être essayé.',
    },
    {
      question: 'Waffle est-il open source ?',
      answer:
        'Pas aujourd’hui. Waffle arrive bientôt, et il sera à code fermé pendant l’accès anticipé.',
    },
    {
      question: 'Qu’est-ce que W ?',
      answer:
        'W est l’assistant intégré à Waffle : un assistant personnel pour le travail et la vie, conçu pour être un prolongement de vous-même digne de confiance.',
    },
    {
      question: 'A-t-il besoin du cloud ?',
      answer:
        'Non. Waffle fait d’abord appel à des modèles locaux et ne se tourne vers le cloud que lorsqu’une tâche en demande davantage.',
    },
    {
      question: 'Mes données quittent-elles mon matériel ?',
      answer: 'Non, sauf si vous choisissez de les partager.',
    },
  ],
  cta: {
    title: 'Bientôt, faites connaissance avec *W*.',
    body: 'Waffle arrive bientôt. Demandez l’accès anticipé, et nous vous écrirons quand il sera prêt à être essayé.',
  },
};

export default waffleFr;
