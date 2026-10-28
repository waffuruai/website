import type { enterprise } from './enterprise';

const enterpriseFr: (typeof enterprise)['en'] = {
  seo: {
    title: 'Inférence LLM sur site pour l’entreprise',
    description:
      'Inférence LLM sur site ou dans votre cloud privé, données sensibles dans votre périmètre, et une seule vue de chaque GPU et de chaque moteur. Accès anticipé.',
    keywords: [
      'inférence LLM sur site',
      'infrastructure d’IA privée',
      'IA souveraine',
      'confidentialité des données IA',
    ],
  },
  name: 'Grandes entreprises',
  serviceType: 'Logiciel d’inférence LLM sur site et en cloud privé',
  card: {
    title: '*Grandes entreprises*',
    summary:
      'Inférence sur site ou en cloud privé pour les données sensibles, avec une seule vue de chaque GPU.',
  },
  hero: {
    title: 'Une IA privée, selon vos propres *règles*.',
    lede: 'Faites tourner des modèles sur du matériel que vous exploitez, sur site ou dans votre cloud privé, pour que les données sensibles restent là où elles vivent déjà. Voyez chaque GPU et chaque moteur qui y tourne depuis un seul endroit.',
  },
  problem: {
    title: 'Certaines données ne peuvent pas *sortir*.',
    statement:
      'Les charges de travail qui valent la peine d’être automatisées touchent aux dossiers clients, aux contrats, au code source et aux données réglementées : justement celles que vous ne pouvez pas envoyer à la légère à l’API de quelqu’un d’autre.',
    body: 'Alors une politique dit non pendant que les équipes disent oui en silence, et les GPU sont éparpillés sur des clusters et des clouds que personne ne voit au même endroit. La sécurité veut un périmètre, la finance veut un chiffre par charge de travail, et l’ingénierie veut un modèle qui répond simplement aux requêtes.',
  },
  useCases: {
    title: 'Un travail qui reste *à l’intérieur*.',
    intro:
      'Quatre missions pour une équipe plateforme qui répond en même temps à la sécurité, à la finance et à l’ingénierie.',
    items: [
      {
        tag: 'control',
        title: 'Servez des modèles à l’intérieur de votre propre périmètre.',
        body: 'Faites tourner Butter sur des serveurs que vous exploitez, sur site ou dans un cloud privé : prompts, documents et sorties restent sur une infrastructure que vous maîtrisez. Notre règle par défaut : les données d’un utilisateur restent sur sa machine, sauf s’il choisit de les partager.',
      },
      {
        tag: 'cost',
        title: 'Voyez chaque GPU et chaque moteur au même endroit.',
        body: 'Syrup montre quels GPU sont occupés, quels moteurs y tournent et lesquels sont inactifs, que le moteur soit Butter, vLLM, SGLang ou llama.cpp. C’est le point de départ pour décider quoi consolider, retirer ou acheter.',
      },
      {
        tag: 'inference',
        title: 'Tirez davantage des GPU que vous avez déjà achetés.',
        body: 'Des kernels optimisés par backend, des modèles et un cache KV quantifiés, et du décodage spéculatif visent tous davantage de tokens utiles par watt et par dollar. Nous préférons mesurer votre charge de travail plutôt que vous annoncer un chiffre.',
      },
      {
        tag: 'control',
        title: 'Branchez vos applications existantes sans les réécrire.',
        body: 'L’API compatible OpenAI de Butter prend en charge le streaming et l’appel d’outils : vos outils internes changent d’adresse, pas de SDK. Rien ne vous enferme dans un moteur, car Syrup fonctionne aux côtés de vLLM, SGLang et llama.cpp.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Butter sert, Syrup surveille, Whisk retrouve, et Iron se trouve sous les trois.',
    items: [
      {
        product: 'butter',
        need: 'Servir des modèles sur des serveurs que vous exploitez.',
        body: 'Du serving compatible OpenAI en Swift sur Metal et en Rust pour CUDA, sans Python dans le chemin de serving. Il charge directement les checkpoints safetensors, MLX, JANG et GGUF : aucune chaîne de conversion entre un nouveau modèle et vos serveurs.',
      },
      {
        product: 'syrup',
        need: 'Une seule vue de chaque GPU et de chaque moteur.',
        body: 'Un petit sidecar Rust sur chaque hôte remonte une télémétrie signée. Syrup fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI : l’adopter ne veut pas dire remplacer ce qui tourne déjà.',
      },
      {
        product: 'whisk',
        need: 'Des réponses tirées de vos propres sources, avec citations.',
        body: 'Recherche locale sur vos notes et votre code internes. La recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
      },
      {
        product: 'iron',
        need: 'Un choix de matériel qui n’impose pas de tout réécrire.',
        body: 'Une seule définition de kernel est compilée vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V derrière une ABI C et Rust versionnée. Quand un deuxième fournisseur ou une nouvelle génération de GPU arrive, les kernels suivent, et l’optimisation se fait backend par backend.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Les GPU de datacenter pour entreprises sont en cours, et nous préférons le dire d’emblée. Les produits sont en accès anticipé et à code fermé pour l’instant.',
    notes: [
      'Prévoyez vos pilotes autour du silicium Apple, des stations RTX et de DGX Spark, là où la stack tourne aujourd’hui.',
      'Les GPU de datacenter sont en cours. S’ils sont votre cible, dites-nous lesquels : cela détermine ce que nous construisons en premier.',
      'ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    ],
  },
  faq: [
    {
      question: 'Pouvons-nous l’exécuter sur site ou dans un cloud privé ?',
      answer:
        'C’est ainsi qu’il est conçu. Butter sert des modèles sur du matériel que vous exploitez, et les données d’un utilisateur restent sur sa machine, sauf s’il choisit de les partager. La prise en charge des GPU de datacenter est en cours : dites-nous sur quoi vous comptez le déployer.',
    },
    {
      question: 'Quels GPU sont pris en charge aujourd’hui ?',
      answer:
        'Le silicium Apple via Metal est principal, et NVIDIA via CUDA est secondaire, en production sur RTX et DGX Spark. AMD ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés. Les GPU de datacenter pour entreprises sont en cours.',
    },
    {
      question:
        'Devons-nous remplacer la stack de serving que nous utilisons déjà ?',
      answer:
        'Non. Syrup fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI : vous pouvez d’abord gagner en visibilité et décider des moteurs plus tard.',
    },
    {
      question: 'Qu’est-ce qui quitte notre réseau ?',
      answer:
        'Les données d’inférence ne sortent pas par défaut, car les données d’un utilisateur restent sur sa machine, sauf s’il choisit de les partager. Chaque hôte Syrup exécute un sidecar qui remonte une télémétrie signée, et nous vous détaillerons exactement ce qu’elle contient pour votre environnement.',
    },
    {
      question: 'Comment l’évaluer ?',
      answer:
        'Parlez-nous avec votre matériel et votre charge de travail. Nous vous dirons honnêtement si cela convient aujourd’hui, et l’accès anticipé est ouvert sur demande.',
    },
  ],
  cta: {
    title: 'Apportez-nous votre *charge de travail*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous ce qui doit rester en interne et quel matériel vous utilisez, et nous vous dirons honnêtement ce qui convient aujourd’hui.',
  },
};

export default enterpriseFr;
