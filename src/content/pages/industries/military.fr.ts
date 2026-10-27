import type { military } from './military';

const militaryFr: (typeof military)['en'] = {
  seo: {
    title: 'Inférence IA privée pour la défense et les armées',
    description:
      'Des modèles capables sur votre matériel sécurisé, du Mac aux stations RTX et DGX Spark, avec une stack de serving réduite, sans Python ni JIT. Accès anticipé.',
    keywords: [
      'infrastructure IA de défense',
      'inférence IA militaire',
      'LLM sur site pour la défense',
      'IA sur son propre matériel',
      'IA locale',
    ],
  },
  name: 'Défense',
  serviceType: 'Logiciel d’inférence IA sur site pour la défense',
  card: {
    title: '*Défense*',
    summary:
      'Une IA capable sur du matériel que vous possédez et sécurisez, avec une empreinte assez réduite pour pouvoir en rendre compte.',
  },
  hero: {
    title: 'Une IA capable, sur du matériel qui vous *appartient*.',
    lede: 'Faites tourner des modèles sur des machines que vous achetez, détenez et sécurisez, d’un Mac Studio aux stations RTX et à DGX Spark. La stack de serving est réduite, sans Python et sans JIT : moins de choses à durcir, moins de choses auxquelles se fier.',
  },
  problem: {
    title: 'Chaque dépendance est une *porte*.',
    statement:
      'Les données de mission ne peuvent pas partir vers le cloud de quelqu’un d’autre, et le matériel qui fait tourner un modèle doit être du matériel que vous possédez, détenez et sécurisez.',
    body: 'La plupart des stacks de serving IA arrivent sous la forme d’une longue chaîne de paquets Python, d’un compilateur JIT et du runtime d’un fournisseur, chacun à vérifier, corriger et suivre. Le matériel vient de celui qui est sous contrat, et les machines qui devraient faire tourner le modèle sont éparpillées des bureaux aux baies, sans vue d’ensemble de ce qui tourne où.',
  },
  useCases: {
    title: 'Une *empreinte* plus réduite.',
    intro:
      'Quatre missions pour l’équipe qui doit faire tourner une IA dont elle peut rendre compte.',
    items: [
      {
        tag: 'control',
        title:
          'Faites tourner des modèles sur du matériel que vous possédez et sécurisez.',
        body: 'Butter sert des modèles sur des machines que vous détenez, d’un Mac Studio aux stations RTX et à DGX Spark. Prompts, documents et sorties restent sur ce matériel, sauf si vous choisissez de les partager.',
      },
      {
        tag: 'inference',
        title: 'Raccourcissez la chaîne de dépendances.',
        body: 'Butter, c’est du Swift sur Metal et du Rust pour CUDA, sans Python et sans JIT dans le chemin de serving. Moins de composants, c’est moins à vérifier, moins à corriger et moins de choses qui peuvent casser au mauvais moment.',
      },
      {
        tag: 'control',
        title: 'Durcissez les machines avant l’arrivée du modèle.',
        body: 'Pantry, notre scanner gratuit et open source, trouve les vulnérabilités qui s’appliquent réellement à une machine macOS ou Linux et corrige ce qu’il peut corriger sans risque. Lancez-le sur chaque machine qui hébergera un modèle.',
        link: { label: 'Découvrir Pantry', href: '/products/pantry' },
      },
      {
        tag: 'cost',
        title: 'Rendez compte de chaque GPU acheté.',
        body: 'Waffle montre chaque GPU et chaque moteur qui y tourne, occupé ou inactif, sur les Mac, les stations de travail et les baies. La capacité inutilisée apparaît avant le prochain achat.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Butter fait tourner les modèles, Waffle rend compte du matériel, et Iron laisse la porte ouverte à la prochaine plateforme.',
    items: [
      {
        product: 'butter',
        need: 'Une stack de serving avec peu à vérifier.',
        body: 'Du serving compatible OpenAI en Swift sur Metal et en Rust pour CUDA, sans Python et sans JIT dans le chemin de serving. Il charge directement les checkpoints safetensors, MLX, JANG et GGUF, sans étape de conversion.',
      },
      {
        product: 'waffle',
        need: 'Chaque GPU que vous possédez, en une seule vue.',
        body: 'Chaque GPU et chaque moteur qui y tourne, que ce soit Butter, vLLM, SGLang ou llama.cpp. Un petit sidecar Rust sur chaque hôte remonte une télémétrie signée.',
      },
      {
        product: 'iron',
        need: 'Du matériel du commerce aujourd’hui, d’autres plateformes demain.',
        body: 'Une seule définition de kernel est compilée vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V derrière une ABI C et Rust versionnée : changer de matériel ne veut pas dire changer de base de code.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Les produits sont en accès anticipé et à code fermé pour l’instant. Nous ne revendiquons aucune conformité, certification ou accréditation, et préférons le dire ici plutôt que lors d’une évaluation.',
    notes: [
      'Le silicium Apple est l’endroit où chaque kernel est optimisé en premier. CUDA est en production sur RTX et DGX Spark, et les GPU de datacenter sont en cours.',
      'ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
      'Dites-nous vos exigences de sécurité et votre matériel, et nous vous répondrons précisément.',
    ],
  },
  faq: [
    {
      question: 'Quelque chose quitte-t-il nos machines ?',
      answer:
        'Les données d’inférence ne sortent pas par défaut : les modèles tournent sur du matériel que vous exploitez, et les données y restent, sauf si vous choisissez de les partager. Chaque hôte Waffle exécute un sidecar qui remonte une télémétrie signée, et nous vous détaillerons exactement ce qu’elle contient.',
    },
    {
      question: 'Sur quel matériel cela tourne-t-il ?',
      answer:
        'Du matériel du commerce que vous pouvez acheter et détenir. Le silicium Apple via Metal est principal, et NVIDIA via CUDA est en production sur RTX et DGX Spark. Les GPU de datacenter sont en cours, et AMD ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    },
    {
      question:
        'Pourquoi l’absence de Python dans le chemin de serving compte-t-elle ?',
      answer:
        'Chaque paquet d’une stack de serving est un élément à vérifier, corriger et suivre. Butter, c’est du Swift sur Metal et du Rust pour CUDA, sans Python et sans JIT : la chaîne entre un modèle et une réponse est plus courte.',
    },
    {
      question: 'Êtes-vous accrédités pour des travaux de défense ?',
      answer:
        'Nous ne revendiquons aucune conformité, certification ou accréditation. Dites-nous ce qu’exige votre programme, et nous vous répondrons précisément.',
    },
    {
      question: 'Comment commencer ?',
      answer:
        'L’accès anticipé est ouvert sur demande, et les produits sont à code fermé pour l’instant. Dites-nous votre matériel et ce qui doit y rester, et nous vous répondrons.',
    },
  ],
  cta: {
    title: 'Apportez-nous votre *matériel*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous ce que vous faites tourner et ce qui doit y rester, et nous vous dirons honnêtement ce qui convient aujourd’hui.',
  },
};

export default militaryFr;
