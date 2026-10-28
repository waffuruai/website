import type { lifeSciences } from './life-sciences';

const lifeSciencesFr: (typeof lifeSciences)['en'] = {
  seo: {
    title: 'Inférence IA privée pour les sciences de la vie',
    description:
      'Des modèles près de vos données sensibles de recherche et de patients, votre propriété intellectuelle sur votre matériel, des réponses citées. Accès anticipé.',
    keywords: [
      'IA privée pour les sciences de la vie',
      'IA pour les données de recherche',
      'LLM local pour la biotech',
      'recherche avec citations',
      'inférence IA sur site',
    ],
  },
  name: 'Sciences de la vie',
  serviceType:
    'Logiciel d’inférence IA privée et de recherche documentaire pour la recherche scientifique',
  card: {
    title: 'Sciences de la *vie*',
    summary:
      'Des modèles au plus près de données de recherche sensibles, et des réponses tirées de vos propres sources, avec citations.',
  },
  hero: {
    title: 'Amenez le modèle aux *données*.',
    lede: 'Faites tourner des modèles sur du matériel que vous maîtrisez, à côté de la recherche, des données patients et de la propriété intellectuelle qui ne devraient jamais en sortir. Interrogez vos propres notes, documents et code, et obtenez des réponses qui citent leur provenance.',
  },
  problem: {
    title: 'Les données qui comptent ne peuvent pas *voyager*.',
    statement:
      'Les données qui rendraient un modèle utile, des résultats d’essais aux travaux non publiés, sont justement celles que vous ne pouvez pas envoyer à l’API de quelqu’un d’autre.',
    body: 'Alors les équipes en collent moins, ou les collent quand même. La littérature grandit plus vite que quiconque ne peut la lire, un résumé sans source ne sert à rien lors d’une revue, et la puissance de calcul de la recherche est difficile à rattacher au projet qui l’a utilisée.',
  },
  useCases: {
    title: 'Une recherche qui reste *la vôtre*.',
    intro:
      'Quatre missions pour l’équipe de calcul scientifique et les chercheurs qu’elle accompagne.',
    items: [
      {
        tag: 'control',
        title: 'Faites tourner des modèles à côté de données sensibles.',
        body: 'Butter sert des modèles sur du matériel que vous exploitez, d’un Mac Studio au labo jusqu’aux stations RTX et aux serveurs sur site, pour que les données patients et les résultats non publiés ne bougent pas. Les données restent où elles sont, sauf si vous choisissez d’utiliser un fournisseur d’inférence d’IA hébergé.',
      },
      {
        tag: 'inference',
        title: 'Interrogez vos sources et obtenez la citation.',
        body: 'Whisk exécute la recherche en local sur vos notes, documents et code. La recherche est lexicale plus vectorielle : les noms de gènes exacts comme les questions floues trouvent leur cible, et chaque réponse cite sa provenance.',
      },
      {
        tag: 'control',
        title: 'Gardez votre propriété intellectuelle sur des machines à vous.',
        body: 'Modèles, prompts et résultats restent sur une infrastructure que vous maîtrisez : une nouvelle cible ou un projet de brevet ne traîne pas dans les logs de quelqu’un d’autre. La même stack tourne sur une seule station de travail ou sur un cluster partagé.',
      },
      {
        tag: 'cost',
        title: 'Sachez ce que coûte le calcul de chaque projet.',
        body: 'Syrup montre chaque GPU et chaque moteur qui y tourne, occupé ou inactif, pour que le calcul de recherche se rattache au travail effectué. Les budgets reçoivent un chiffre plutôt qu’une supposition.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Butter fait tourner les modèles, Whisk lit vos sources, et Syrup tient les comptes.',
    items: [
      {
        product: 'butter',
        need: 'Des modèles à côté des données.',
        body: 'Swift pour macOS et iOS et Rust pour tout le reste, avec un minimum de dépendances. Des modèles de texte, de vision, de voix et omni se trouvent derrière une API compatible OpenAI, et les checkpoints se chargent directement depuis Hugging Face.',
      },
      {
        product: 'whisk',
        need: 'Des réponses tirées de vos sources, avec citations.',
        body: 'Recherche locale sur vos notes, documents et code. La recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP : les assistants peuvent montrer leur travail.',
      },
      {
        product: 'syrup',
        need: 'Un calcul dont vous pouvez rendre compte.',
        body: 'Chaque GPU et chaque moteur en une seule vue, que ce soit Butter, vLLM, SGLang ou llama.cpp, d’une seule station de travail à un cluster partagé.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Les produits sont en accès anticipé et à code fermé pour l’instant. Nous ne revendiquons aucune conformité ni validation : interrogez-nous directement sur vos exigences.',
    notes: [
      'Un Mac Studio ou une station RTX est le point de départ le plus simple : Metal est principal, et CUDA est en production sur RTX et DGX Spark.',
      'Sur les GPU de datacenter, les premières exécutions sont faites sur H100, H200, B100, B200 et MI300. ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
      'Whisk cite ses sources, mais il ne vérifie pas la science. Vos relecteurs, eux, le font toujours.',
    ],
  },
  faq: [
    {
      question:
        'Les données patients ou de recherche quittent-elles nos machines ?',
      answer:
        'Pas par défaut. Les modèles tournent sur du matériel que vous exploitez, et les données restent où elles sont, sauf si vous choisissez d’utiliser un fournisseur d’inférence d’IA hébergé.',
    },
    {
      question: 'Peut-on l’interroger sur nos propres documents ?',
      answer:
        'Oui. Whisk exécute la recherche en local sur vos notes, documents et code, et chaque résultat revient avec une citation de sa source, via MCP.',
    },
    {
      question: 'Est-ce validé pour des travaux cliniques ou réglementés ?',
      answer:
        'Nous ne revendiquons aucune conformité, certification ou validation. Dites-nous ce qu’exige votre travail, et nous vous répondrons précisément.',
    },
    {
      question: 'De quel matériel avons-nous besoin ?',
      answer:
        'Un Mac avec silicium Apple est le point de départ le mieux pris en charge, car Metal est l’endroit où chaque kernel est optimisé en premier. Les stations RTX et DGX Spark tournent sur CUDA. La taille du modèle que vous pouvez faire tourner dépend de la mémoire dont vous disposez.',
    },
    {
      question: 'Comment obtenir un accès ?',
      answer:
        'L’accès anticipé est ouvert sur demande, et les produits sont à code fermé pour l’instant. Parlez-nous de vos données et de votre matériel, et nous vous répondrons.',
    },
  ],
  cta: {
    title: 'Gardez la science *en interne*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous quelles données doivent rester où elles sont et quel matériel vous utilisez, et nous vous dirons honnêtement ce qui convient aujourd’hui.',
  },
};

export default lifeSciencesFr;
