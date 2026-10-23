import type { solutionsOverview } from './overview';

const solutionsOverviewFr: (typeof solutionsOverview)['en'] = {
  seo: {
    title: 'Solutions d’inférence IA',
    description:
      'La stack d’IA locale de Waffuru pour petites et grandes entreprises, neoclouds et sociétés d’IA : coût par charge réduit, meilleure inférence, plus de maîtrise.',
    keywords: ['solutions d’inférence IA', 'IA locale'],
  },
  hero: {
    label: 'Solutions',
    title: 'Une IA locale, taillée pour votre *usage*.',
    lede: 'Waffuru est une seule stack, des kernels à la mémoire, qui fait tourner vite des modèles sur du matériel que vous possédez déjà. Choisissez la page qui se rapproche le plus de ce que vous voulez accomplir.',
  },
  cards: {
    label: 'Pour qui',
    title: 'Trouvez votre *place*.',
    intro:
      'Quatre publics, une seule stack. Chaque page couvre le problème, les usages et ce qui fonctionne aujourd’hui.',
  },
  values: {
    label: 'Ce qui ne change pas',
    title: 'Trois raisons pour *tous*.',
    intro:
      'Chaque public a son propre travail à accomplir. Ces trois raisons valent pour tous.',
    items: [
      {
        tag: 'cost',
        title: 'Des dollars par *charge de travail*.',
        body: 'Quand l’énergie est le plafond, les tokens par watt et les dollars par charge de travail sont ce que vous pouvez encore maximiser. Waffuru est construit autour des deux.',
        points: [
          'Tournez sur du matériel que vous possédez déjà plutôt que de louer',
          'Les modèles quantifiés tiennent davantage dans la mémoire dont vous disposez',
          'Waffle montre où la capacité reste inutilisée',
        ],
      },
      {
        tag: 'inference',
        title: 'Une meilleure *inférence*.',
        body: 'Des kernels optimisés pour chaque backend, des modèles et un cache KV quantifiés, et du décodage spéculatif, dans un moteur sans Python sur le chemin critique.',
        points: [
          'Metal d’abord, CUDA ensuite, ROCm et Vulkan fonctionnent',
          'Charge les modèles Hugging Face sans conversion',
          'Modèles de texte, de vision, de voix et omni',
        ],
      },
      {
        tag: 'control',
        title: 'Plus de *maîtrise*.',
        body: 'Local-first : vos données restent où elles sont, sauf si vous choisissez de les partager, que ce soit sur un portable, sur site ou dans votre propre cloud.',
        points: [
          'Serving compatible OpenAI : vos applications continuent de fonctionner',
          'Waffle fonctionne avec vLLM, SGLang et llama.cpp',
          'Aucun verrouillage sur un moteur ou un fournisseur',
        ],
      },
    ],
  },
  cta: {
    title: 'Prenez *place*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous ce que vous voulez faire tourner et nous vous répondrons.',
  },
};

export default solutionsOverviewFr;
