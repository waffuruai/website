import type { neoclouds } from './neoclouds';

const neocloudsFr: (typeof neoclouds)['en'] = {
  seo: {
    title: 'Plateforme d’inférence pour clouds GPU',
    description:
      'Vue de la flotte entre locataires et moteurs, plus de tokens utiles par GPU, télémétrie signée. Compatible vLLM, SGLang, llama.cpp. Accès anticipé.',
    keywords: [
      'logiciel pour cloud GPU',
      'utilisation des GPU',
      'plateforme d’inférence pour clouds GPU',
      'supervision GPU multi-locataire',
    ],
  },
  name: 'Neoclouds',
  serviceType: 'Logiciel de visibilité de flotte GPU et d’inférence',
  card: {
    title: '*Neoclouds*',
    summary:
      'Une vue de la flotte entre locataires et moteurs, et plus de tokens utiles par GPU.',
  },
  hero: {
    title: 'Tirez plus de chaque *GPU* que vous louez.',
    lede: 'Voyez toute la flotte, entre locataires et moteurs, et placez des kernels optimisés par backend sous le travail de vos clients. Rien ne vous enferme dans un moteur.',
  },
  problem: {
    title: 'Une flotte que vous ne *voyez* pas.',
    statement:
      'Les clients apportent leurs propres moteurs, versions et réglages, et le GPU en dessous est la partie dont vous répondez.',
    body: 'Un tableau de bord peut dire qu’une carte est occupée sans dire ce qui y tourne, pour qui ni avec quelle efficacité. Chaque moteur remonte l’information à sa façon, chaque locataire apporte un mélange différent, et la capacité inutilisée ou mal adaptée est un revenu qui vous échappe.',
  },
  useCases: {
    title: 'Une *flotte* mieux tenue.',
    intro: 'Quatre missions pour l’équipe qui fait tourner un cloud GPU.',
    items: [
      {
        tag: 'cost',
        title: 'Sachez ce qui tourne sur chaque GPU.',
        body: 'Syrup donne une seule vue sur les hôtes, les GPU, les moteurs et les locataires, que le moteur soit vLLM, SGLang, llama.cpp ou Butter. La capacité inactive ou mal adaptée apparaît d’abord sur votre écran.',
      },
      {
        tag: 'control',
        title: 'Fiez-vous aux mesures de votre tableau de bord.',
        body: 'Chaque hôte exécute un petit sidecar Rust qui remonte une télémétrie signée : on peut vérifier que les mesures viennent bien de l’hôte qui les a envoyées. Les chiffres de toute la flotte cessent d’être pris sur parole.',
      },
      {
        tag: 'inference',
        title: 'Servez plus de tokens utiles par GPU.',
        body: 'Butter associe des kernels optimisés par backend à des modèles et un cache KV quantifiés et à du décodage spéculatif, le tout visant les tokens par watt. Il tourne aux côtés des moteurs que vos locataires choisissent déjà : vous pouvez comparer sur votre propre flotte.',
      },
      {
        tag: 'control',
        title: 'Proposez des options sans parier sur un seul moteur.',
        body: 'Butter sert une API compatible OpenAI, et Syrup fonctionne avec vLLM, SGLang et llama.cpp. Vous pouvez offrir plus de choix à vos clients sans tout reconstruire autour d’un seul moteur.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Syrup est la partie conçue pour vous. Butter et Iron travaillent sur l’efficacité en dessous.',
    items: [
      {
        product: 'syrup',
        need: 'Voir toute la flotte.',
        body: 'D’une machine sous un bureau à un neocloud qui loue une flotte. Un petit sidecar Rust sur chaque hôte remonte une télémétrie signée, et Syrup fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI.',
      },
      {
        product: 'butter',
        need: 'Un moteur que vous maîtrisez, avec un minimum de dépendances.',
        body: 'Swift pour macOS et iOS, Rust pour tout le reste. Checkpoints et cache KV quantifiés, décodage spéculatif et LoRA derrière une API compatible OpenAI.',
      },
      {
        product: 'iron',
        need: 'Des kernels pour le matériel que vous achèterez ensuite.',
        body: 'Une définition de kernel, quatre backends : Metal, CUDA, HIP/ROCm et Vulkan SPIR-V. Une ABI C et Rust versionnée permet aux hôtes existants de les appeler.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Syrup et Butter sont en accès anticipé et à code fermé pour l’instant. CUDA est en production sur RTX et DGX Spark, et les GPU de datacenter sont en cours.',
    notes: [
      'Dites-nous vos générations de GPU. CUDA pour datacenter est en cours : les flottes dont nous entendons parler orientent ce que nous faisons en premier.',
      'ROCm et Vulkan fonctionnent aujourd’hui mais ne sont pas encore optimisés.',
      'Nous ne prétendons pas que Butter fait mieux que d’autres moteurs sur CUDA ou ROCm. Quand nous publierons des mesures, elles seront accompagnées de la méthode.',
    ],
  },
  faq: [
    {
      question: 'Syrup remplace-t-il nos moteurs actuels ?',
      answer:
        'Non. Syrup fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI. Gagnez d’abord en visibilité, et ne changez de moteur que si et quand vous le souhaitez.',
    },
    {
      question: 'Sur quels GPU cela tourne-t-il ?',
      answer:
        'Le silicium Apple via Metal est principal. NVIDIA via CUDA est secondaire, en production sur RTX et DGX Spark, avec les GPU de datacenter en cours. AMD ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    },
    {
      question: 'Pourquoi faire confiance à la télémétrie ?',
      answer:
        'Chaque hôte exécute un petit sidecar Rust qui remonte une télémétrie signée : on peut vérifier que les mesures viennent bien de l’hôte qui les a envoyées. Demandez-nous comment fonctionne la signature dans votre environnement.',
    },
    {
      question: 'Quelle part d’utilisation récupérerons-nous ?',
      answer:
        'Nous ne promettrons pas de pourcentage. Voir la flotte est la première étape, et les tokens par watt et les dollars par charge de travail sont les chiffres que nous cherchons à faire bouger. Nous préférons les mesurer sur votre flotte plutôt que vous en annoncer un.',
    },
    {
      question: 'Pouvons-nous l’essayer ?',
      answer:
        'L’accès anticipé est ouvert sur demande, et les produits sont à code fermé pour l’instant. Parlez-nous de votre flotte et nous vous répondrons.',
    },
  ],
  cta: {
    title: 'Montrez-nous la *flotte*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous vos GPU, vos moteurs et la façon dont vos locataires les partagent, et nous vous répondrons sur ce qui convient.',
  },
};

export default neocloudsFr;
