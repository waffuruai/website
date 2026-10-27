import type { home } from './home';

const homeFr: (typeof home)['en'] = {
  seo: {
    keywords: [
      'inférence LLM locale',
      'kernels GPU',
      'moteur d’inférence',
      'silicium Apple',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'gestion de flotte GPU',
      'neocloud',
      'IA sur appareil',
      'IA privée',
    ],
  },

  hero: {
    eyebrow: 'Quatre produits · code fermé pour l’instant',
    title: 'Des maths brutes, *pressées* dans le silicium.',
    lede: 'Nous écrivons des kernels GPU, un moteur d’inférence, un plan de contrôle et une couche de recherche, pour que votre équipe exécute des modèles sur son propre matériel. Ils tournent sur un portable, un labo maison ou une flotte neocloud, et nous publions ce que nous mesurons.',
    secondary: { label: 'Voir la stack', href: '#stack' },
    emits: {
      label: 'Génère',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: 'La stack.',
    intro:
      'Iron compile les kernels. Butter y exécute les modèles. Waffle surveille les GPU. Syrup se souvient de ce sur quoi vous travailliez.',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: 'Mémoire',
        name: 'Syrup',
        tagline: 'Votre IA se souvient de ce sur quoi vous travailliez.',
        body: 'Recherche locale sur vos notes et votre code. Les embeddings sont compressés avec TurboQuant+, la recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: 'Plan de contrôle',
        name: 'Waffle',
        tagline: 'Voir chaque GPU et chaque moteur qui y tourne.',
        body: 'Un plan de contrôle pour les LLM sur GPU, d’une machine sous un bureau à un neocloud qui loue une flotte. Chaque hôte exécute un petit sidecar en Rust qui remonte une télémétrie signée. Fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI.',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: 'Serving',
        name: 'Butter',
        tagline: 'Servir des modèles sans Python.',
        body: 'Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Charge des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et MoE, avec un cache KV quantifié.',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: 'Kernels',
        name: 'Iron',
        tagline: 'Une définition de kernel, quatre backends.',
        body: 'Un DSL embarqué dans Rust. Les kernels sont compilés vers une IR partagée, puis vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V. Une ABI C et Rust versionnée permet aux hôtes existants de les appeler.',
      },
    ],
  },

  team: {
    title: 'Qui est en *cuisine*.',
    intro:
      'De la recherche, de la sécurité, des ventes, et quelques fondateurs qui ont déjà livré des produits.',
    portraitAlt: 'Portrait de {name}',
    link: { label: 'Rencontrer l’équipe', href: '/about/team' },
  },

  cta: {
    title: 'Prenez place.',
    body: 'Rien n’est encore public. Demandez un accès anticipé, ou laissez votre e-mail ci-dessous et nous vous écrirons quand ce sera le cas.',
  },
};

export default homeFr;
