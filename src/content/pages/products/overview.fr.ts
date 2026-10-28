import type { productsOverview } from './overview';

const productsOverviewFr: (typeof productsOverview)['en'] = {
  seo: {
    title: 'Stack Waffuru : kernels, serving, contrôle, mémoire, agents',
    description:
      'Iron compile les kernels. Butter exécute les modèles. Syrup pilote les GPU. Whisk incorpore mémoire et contexte. Waffle fait tourner vos agents. Utilisez-en un, ou les cinq.',
    keywords: [
      'stack d’inférence IA',
      'des kernels GPU au serving',
      'infrastructure d’IA sur du matériel que vous possédez ou louez',
    ],
  },
  hero: {
    label: 'Cinq produits',
    title: 'La *stack* Waffuru.',
    lede: 'Iron compile les kernels. Butter y exécute les modèles. Syrup pilote les GPU. Whisk incorpore la mémoire et le contexte. Waffle fait tourner vos agents, avec W à l’intérieur. Les cinq tournent sur du matériel que vous possédez ou louez.',
  },
  layers: {
    heading: 'Comment les cinq couches *s’emboîtent*.',
    intro:
      'Numérotées depuis le métal. Waffle est au sommet, Iron au contact du métal, et chaque couche a sa propre page.',
    metal: {
      label: 'Le métal',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: 'Les cinq couches de la stack',
  },
  together: {
    heading: 'Utilisez-en une, ou *les cinq*.',
    intro:
      'Commencez par la couche qui résout le problème du jour. Ajoutez la suivante quand vous en avez besoin.',
    aloneLabel: 'Utilisé seul',
    alone: {
      iron: 'Écrivez un kernel GPU une fois et exécutez-le sur Metal, CUDA, ROCm et Vulkan.',
      butter:
        'Servez des modèles derrière une API compatible OpenAI, sans Python dans le chemin.',
      syrup:
        'Voyez chaque GPU et chaque moteur qui y tourne, quel que soit ce moteur.',
      whisk:
        'Donnez à votre IA une mémoire locale et citée de vos notes et de votre code.',
      waffle:
        'Faites tourner vos agents dans un seul harnais, avec W, votre assistant, à l’intérieur.',
    },
    allLabel: 'Ensemble',
    all: 'Butter exécute les modèles sur les kernels qu’Iron compile, Syrup pilote les GPU et les moteurs qui tournent dessus, Whisk incorpore la mémoire et le contexte, et Waffle fait tourner vos agents au sommet. Chaque couche ajoutée s’appuie sur celles du dessous.',
  },
  audience: {
    heading: 'Pour *qui*.',
    intro: 'Choisissez la page qui vous ressemble.',
    items: {
      smallBusiness:
        'Faites tourner une IA privée sur les Mac et les stations de travail que vous possédez déjà.',
      enterprise:
        'Faites tourner une inférence que vous maîtrisez, sur site ou dans votre propre cloud.',
      neoclouds:
        'Voyez chaque GPU de votre flotte et chaque moteur qui y tourne.',
      aiCompanies:
        'Écrivez vos kernels une fois et servez vos modèles sur Metal, CUDA, ROCm et Vulkan.',
    },
  },
  cta: {
    title: 'Commencez par la *couche* qu’il vous faut.',
    body: 'Toute la stack est en accès anticipé et à code fermé pour l’instant. Demandez l’accès et dites-nous quelle couche vous voulez en premier.',
  },
};

export default productsOverviewFr;
