import type { productsOverview } from './overview';

const productsOverviewFr: (typeof productsOverview)['en'] = {
  seo: {
    title: 'Stack Waffuru : kernels, serving, contrôle, mémoire',
    description:
      'Iron compile les kernels. Butter y exécute les modèles. Waffle surveille les GPU. Syrup se souvient de ce sur quoi vous travailliez. Utilisez-en un, ou les quatre.',
    keywords: [
      'stack d’inférence IA',
      'des kernels GPU au serving',
      'infrastructure d’IA local-first',
    ],
  },
  hero: {
    label: 'Quatre produits',
    title: 'La *stack* Waffuru.',
    lede: 'Iron compile les kernels. Butter y exécute les modèles. Waffle surveille les GPU. Syrup se souvient de ce sur quoi vous travailliez. Les quatre sont conçus pour tourner sur le matériel que vous possédez déjà.',
  },
  layers: {
    heading: 'Comment les quatre couches *s’emboîtent*.',
    intro:
      'Numérotées depuis le métal. Syrup est au sommet, Iron au contact du métal, et chaque couche a sa propre page.',
    metal: {
      label: 'Le métal',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: 'Les quatre couches de la stack',
  },
  together: {
    heading: 'Utilisez-en une, ou *les quatre*.',
    intro:
      'Commencez par la couche qui résout le problème du jour. Ajoutez la suivante quand vous en avez besoin.',
    aloneLabel: 'Utilisé seul',
    alone: {
      iron: 'Écrivez un kernel GPU une fois et exécutez-le sur Metal, CUDA, ROCm et Vulkan.',
      butter:
        'Servez des modèles derrière une API compatible OpenAI, sans Python dans le chemin.',
      waffle:
        'Voyez chaque GPU et chaque moteur qui y tourne, quel que soit ce moteur.',
      syrup:
        'Donnez à votre IA une mémoire locale et citée de vos notes et de votre code.',
    },
    allLabel: 'Ensemble',
    all: 'Butter exécute les modèles sur les kernels qu’Iron compile, Waffle surveille les GPU et les moteurs qui tournent dessus, et Syrup se souvient de ce sur quoi vous travailliez. Chaque couche ajoutée s’appuie sur celles du dessous.',
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
