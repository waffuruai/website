import type { cloudInfrastructure } from './cloud-infrastructure';

const cloudInfrastructureFr: (typeof cloudInfrastructure)['en'] = {
  seo: {
    title: 'Logiciel d’inférence pour clouds GPU et hébergeurs',
    description:
      'Pour clouds GPU et hébergeurs : voyez chaque GPU, moteur et locataire, tirez plus de chaque heure GPU et servez sur plusieurs fournisseurs. Accès anticipé.',
    keywords: [
      'plateforme d’inférence managée',
      'logiciel d’hébergement GPU',
      'utilisation des GPU',
      'revenu par heure GPU',
      'inférence GPU multi-fournisseur',
    ],
  },
  name: 'Infrastructure cloud',
  serviceType: 'Logiciel de visibilité de flotte GPU et d’inférence managée',
  card: {
    title: 'Infrastructure *cloud*',
    summary:
      'Pour les clouds GPU et les hébergeurs : davantage de chaque heure GPU, une vue sur chaque locataire, et plus d’un fournisseur.',
  },
  hero: {
    title: 'Faites *rapporter* chaque heure GPU.',
    lede: 'Vous vendez de la capacité à l’heure et vous répondez de ce qui tourne dessus. Voyez chaque GPU, chaque moteur et chaque locataire au même endroit, proposez une inférence managée sur laquelle vous pouvez vous engager, et gardez le choix entre fournisseurs de GPU.',
  },
  problem: {
    title: 'Une heure inactive ne se *facture* pas.',
    statement:
      'Le revenu et la marge par heure GPU décident de votre activité, et la flotte vous indique rarement l’un ou l’autre.',
    body: 'Les locataires apportent leurs propres moteurs et réglages, chaque fournisseur remonte l’information à sa façon, et le coût retombe sur la carte plutôt que sur le client qui l’a utilisée. Les clients veulent désormais de l’inférence managée, pas seulement du bare metal, et la construire sur un empilement fragile de dépendances est un risque que vous portez pour eux.',
  },
  useCases: {
    title: 'Tirez plus de chaque *baie*.',
    intro: 'Quatre missions pour l’équipe qui vend de la capacité GPU.',
    items: [
      {
        tag: 'cost',
        title: 'Sachez ce que fait chaque GPU.',
        body: 'Syrup donne une seule vue sur les hôtes, les GPU, les moteurs et les locataires, que le moteur soit Butter, vLLM, SGLang ou llama.cpp. La capacité inactive ou mal adaptée apparaît sur votre écran avant d’apparaître dans la marge.',
      },
      {
        tag: 'control',
        title: 'Voyez quel locataire fait tourner quoi.',
        body: 'Attribuer les coûts commence par savoir qui a fait tourner quoi, et sur quelle carte. Chaque hôte exécute un petit sidecar Rust qui remonte une télémétrie signée : on peut vérifier que les mesures viennent bien de l’hôte qui les a envoyées.',
      },
      {
        tag: 'inference',
        title:
          'Proposez une inférence managée sur laquelle vous pouvez vous engager.',
        body: 'Butter sert une API compatible OpenAI avec streaming et appel d’outils, et réduit ses dépendances au minimum. Moins de rouages, c’est moins à corriger et moins de pannes sous la charge de travail de quelqu’un d’autre.',
      },
      {
        tag: 'control',
        title: 'Équipez vos baies de plus d’un fournisseur.',
        body: 'Iron compile une seule définition de kernel vers Metal, CUDA, HIP/ROCm et Vulkan SPIR-V, derrière une ABI C et Rust versionnée. Ajouter un fournisseur de GPU devient un travail d’optimisation, pas une deuxième base de code.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Syrup est votre point de départ. Butter et Iron travaillent sur le rendement en dessous.',
    items: [
      {
        product: 'syrup',
        need: 'Chaque GPU, moteur et locataire en une seule vue.',
        body: 'Un petit sidecar Rust sur chaque hôte remonte une télémétrie signée, et Syrup ventile le coût par locataire. Il fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI : les locataires gardent les moteurs qu’ils ont choisis.',
      },
      {
        product: 'butter',
        need: 'De l’inférence managée avec moins de rouages.',
        body: 'Swift pour macOS et iOS, Rust pour tout le reste, avec un minimum de dépendances. Checkpoints et cache KV quantifiés, décodage spéculatif et LoRA derrière une API compatible OpenAI.',
      },
      {
        product: 'iron',
        need: 'Des kernels qui vous suivent chez le prochain fournisseur.',
        body: 'Une seule définition de kernel est compilée vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V. Une ABI C et Rust versionnée permet aux moteurs que vous hébergez déjà de les appeler.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Commençons par ce qui compte le plus pour un cloud GPU : les GPU de datacenter sont en cours. Syrup, Butter et Iron sont en accès anticipé et à code fermé pour l’instant.',
    notes: [
      'CUDA est en production sur RTX et DGX Spark. Dites-nous vos générations de GPU de datacenter : les flottes dont nous entendons parler orientent ce qui vient en premier.',
      'ROCm et Vulkan fonctionnent aujourd’hui mais ne sont pas encore optimisés.',
      'Nous ne prétendons pas que Butter fait mieux que d’autres moteurs sur CUDA ou ROCm. Quand nous publierons des mesures, elles seront accompagnées de la méthode.',
    ],
  },
  faq: [
    {
      question: 'Nos locataires doivent-ils changer de moteur ?',
      answer:
        'Non. Syrup fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI. Les locataires gardent ce qu’ils font tourner, et vous obtenez une seule vue sur l’ensemble.',
    },
    {
      question: 'Quels GPU sont pris en charge ?',
      answer:
        'Le silicium Apple via Metal est principal. NVIDIA via CUDA est secondaire, en production sur RTX et DGX Spark, avec les GPU de datacenter en cours. AMD ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    },
    {
      question: 'Combien cela ajoutera-t-il à notre marge ?',
      answer:
        'Nous ne promettrons pas de chiffre. Voir ce que fait tourner chaque GPU, pour qui et à quel coût par locataire, vient d’abord. Le rendement par heure GPU et les dollars par charge de travail sont ensuite ce que nous cherchons à faire bouger, mesurés sur votre flotte.',
    },
    {
      question: 'Pourquoi faire confiance à la télémétrie ?',
      answer:
        'Chaque hôte exécute un petit sidecar Rust qui remonte une télémétrie signée : on peut vérifier que les mesures viennent bien de l’hôte qui les a envoyées. Demandez-nous comment fonctionne la signature dans votre environnement.',
    },
    {
      question: 'Comment obtenir un accès ?',
      answer:
        'L’accès anticipé est ouvert sur demande, et les produits sont à code fermé pour l’instant. Parlez-nous de votre flotte, de vos fournisseurs et de vos locataires, et nous vous répondrons.',
    },
  ],
  cta: {
    title: 'Montrez-nous les *baies*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous vos GPU, vos moteurs et la façon dont vos locataires les partagent, et nous vous dirons honnêtement ce qui convient aujourd’hui.',
  },
};

export default cloudInfrastructureFr;
