import type { iron } from './iron';

const ironFr: (typeof iron)['en'] = {
  layer: 'Kernels',
  tagline: 'Une définition de kernel, quatre backends.',
  summary:
    'Écrivez une fois en Rust, obtenez des kernels optimisés partout. Un DSL embarqué dans Rust. Les kernels sont compilés vers une IR partagée, puis vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V. Une ABI C et Rust versionnée permet aux hôtes existants de les appeler.',
  seo: {
    title: 'Iron : une définition de kernel GPU, quatre backends',
    description:
      'Écrivez un kernel GPU une fois en Rust, compilez-le vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V. ABI C et Rust versionnée. Iron est en accès anticipé.',
    keywords: [
      'DSL Rust pour kernels GPU',
      'kernels Metal',
      'kernels CUDA',
      'ROCm HIP',
      'Vulkan SPIR-V',
      'kernels GPU multiplateformes',
    ],
  },
  hero: {
    title: 'Une définition de kernel, *quatre* backends.',
    lede: 'Pressez des maths brutes directement dans du silicium haute performance. Iron est un DSL embarqué dans Rust : vous écrivez le kernel une fois, il est compilé vers une IR partagée, puis vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V.',
    highlights: [
      {
        value: '4',
        label: 'backends GPU à partir d’une seule définition de kernel',
      },
      { value: '~1 139', label: 'déclarations de kernels' },
      {
        value: '4 164 / 4 164',
        label: 'corpus de tests HIP et Vulkan, exact au bit près',
      },
    ],
  },
  story: {
    heading: 'Cessez d’écrire le même kernel *quatre* fois.',
    problem:
      'Chaque fabricant de GPU a son propre langage de kernel. Livrer sur du matériel Apple, NVIDIA et AMD, c’est écrire, optimiser et tester les mêmes maths pour chacun, puis garder toutes les copies synchronisées à chaque évolution.',
    outcome:
      'Vous écrivez le kernel une fois, en Rust. Iron le compile vers une IR partagée, puis vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V : une seule définition couvre tous les backends que vous visez.',
    outcomes: [
      'Écrivez et optimisez d’abord sur le Mac posé sur votre bureau. Metal est la cible principale, et la même définition se transporte vers les autres backends.',
      'Appelez vos kernels depuis le code que vous avez déjà, grâce à une ABI C et Rust versionnée.',
      'Vérifiez les backends avec un corpus de tests exact au bit près, plutôt que d’espérer que deux d’entre eux concordent.',
    ],
  },
  capabilities: {
    heading: 'Ce que fait *Iron*.',
    intro:
      'Construit depuis le métal, pour celles et ceux qui écrivent des kernels.',
    items: [
      {
        title: 'Une définition, quatre backends',
        body: 'Les kernels sont compilés vers une IR partagée, puis vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V. Vous ne maintenez qu’une seule source.',
      },
      {
        title: 'Écrit en Rust',
        body: 'Un DSL embarqué dans Rust. Les kernels sont des fonctions Rust annotées #[kernel], composées de primitives comme program_id, load et store. Iron est lui-même écrit en Rust, pour la vitesse et la sûreté mémoire, et réduit ses dépendances au minimum, ce qui laisse moins de prise à une attaque de la chaîne d’approvisionnement.',
      },
      {
        title: 'Appelable depuis votre hôte',
        body: 'Une ABI C et Rust versionnée permet aux hôtes existants d’appeler les kernels Iron sans devoir être réécrits autour.',
      },
      {
        title: 'Exact au bit près par test, mesuré par bench',
        body: 'Le corpus de tests HIP et Vulkan compte 4 164 cas, tous exacts au bit près. Des outils de bench et de performance sont fournis avec, si bien que chaque kernel est mesuré autant que vérifié.',
      },
      {
        title: 'Plus d’un millier de kernels',
        body: 'Environ 1 139 déclarations de kernels aujourd’hui. Chacune est une définition que tous les backends partagent.',
      },
      {
        title: 'Optimisé là où ça compte',
        body: 'Chaque kernel est d’abord écrit et optimisé sur Metal. CUDA est en cours d’optimisation, et ROCm et Vulkan fonctionnent aujourd’hui mais ne sont pas encore optimisés.',
      },
    ],
  },
  specs: {
    heading: 'Les *détails* techniques.',
    rows: [
      {
        term: 'Langage',
        detail:
          'Un DSL embarqué dans Rust. Les kernels sont des fonctions Rust annotées #[kernel].',
      },
      {
        term: 'Chaîne de compilation',
        detail:
          'Une définition de kernel est compilée vers une IR partagée, puis vers chaque backend.',
      },
      {
        term: 'Backends',
        chips: [
          { label: 'Metal : MSL → .metallib' },
          { label: 'CUDA → PTX' },
          { label: 'HIP/ROCm : HIP → AMDGPU' },
          { label: 'Vulkan → SPIR-V' },
        ],
      },
      {
        term: 'ABI hôte',
        detail:
          'Une ABI C et Rust versionnée, pour que les hôtes existants puissent appeler les kernels Iron.',
      },
      {
        term: 'Nombre de kernels',
        detail: 'Environ 1 139 déclarations de kernels.',
      },
      {
        term: 'Corpus de tests',
        detail: 'HIP et Vulkan : 4 164 cas sur 4 164 exacts au bit près.',
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
      'Iron se suffit à lui-même. Ajoutez Butter pour exécuter des modèles sur les kernels, Syrup pour surveiller les GPU sur lesquels ils tournent, ou Whisk pour donner à votre IA la mémoire de ce sur quoi vous travailliez.',
  },
  faq: [
    {
      question: 'Iron est-il open source ?',
      answer:
        'Pas aujourd’hui. Iron est privé et à code fermé pendant l’accès anticipé. Demandez l’accès et nous vous écrirons quand il y aura plus à partager.',
    },
    {
      question: 'Sur quel matériel cela tourne-t-il ?',
      answer:
        'Metal sur le silicium Apple est la cible principale : chaque kernel y est d’abord écrit et optimisé. CUDA est en production sur RTX et DGX Spark et en cours d’optimisation, avec de premières exécutions faites sur H100, H200, B100 et B200. Côté AMD, les premières exécutions sont faites sur MI300, et ROCm et Vulkan fonctionnent aujourd’hui mais ne sont pas encore optimisés.',
    },
    {
      question: 'Dois-je réécrire mon code hôte ?',
      answer:
        'Pas pour appeler les kernels Iron. Une ABI C et Rust versionnée permet aux hôtes existants de les appeler.',
    },
    {
      question: 'Est-ce plus rapide que du CUDA ou du Metal écrit à la main ?',
      answer:
        'Nous n’avons publié aucun chiffre de benchmark, donc nous n’en revendiquons aucun. Ce que nous pouvons dire aujourd’hui : une définition se compile vers quatre backends, et le corpus de tests HIP et Vulkan est exact au bit près.',
    },
    {
      question: 'Comment l’essayer ?',
      answer: 'Demandez un accès anticipé avec le formulaire de cette page.',
    },
  ],
  cta: {
    title: 'Pressez votre premier *kernel*.',
    body: 'Iron est en accès anticipé et à code fermé pour l’instant. Demandez l’accès.',
    docsLabel: 'Lire la documentation',
  },
};

export default ironFr;
