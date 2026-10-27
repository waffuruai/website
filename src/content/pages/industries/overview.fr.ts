import type { industriesOverview } from './overview';

const industriesOverviewFr: (typeof industriesOverview)['en'] = {
  seo: {
    title: 'Inférence IA par secteur',
    description:
      'Waffuru pour clouds GPU, services financiers, sciences de la vie, secteur public et défense : un coût par charge de travail, sur votre matériel. Accès anticipé.',
    keywords: [
      'inférence IA par secteur',
      'infrastructure d’IA privée',
      'IA souveraine',
      'coût GPU par charge de travail',
    ],
  },
  hero: {
    label: 'Secteurs',
    title: 'Une seule stack, taillée pour vos *règles*.',
    lede: 'Chaque secteur fait tourner l’IA sous ses propres contraintes : quelles données peuvent circuler, qui valide la dépense, quel matériel est autorisé. Waffuru est une seule stack, des kernels à la mémoire, qui fait tourner des modèles sur du matériel que vous maîtrisez. Choisissez le vôtre.',
  },
  cards: {
    label: 'Par secteur',
    title: 'Trouvez votre *secteur*.',
    intro:
      'Cinq secteurs, une seule stack. Chaque page couvre la pression que vous subissez, les usages et ce qui fonctionne aujourd’hui.',
  },
  values: {
    label: 'Ce qui vaut partout',
    title: 'Trois réponses pour chaque *secteur*.',
    intro:
      'Les règles changent d’un secteur à l’autre. Ces trois questions se posent dans chacun d’eux.',
    items: [
      {
        tag: 'cost',
        title: 'Le chiffre qui *compte*.',
        body: 'Les dollars par charge de travail, c’est ce que demande la finance, et presque personne ne peut les voir. Waffle montre chaque GPU et chaque moteur qui y tourne, pour que la dépense se rattache au travail effectué.',
        points: [
          'Voyez quels GPU sont occupés, inactifs ou mal adaptés',
          'Tirez davantage du matériel que vous possédez déjà',
          'Les modèles quantifiés tiennent davantage dans la mémoire dont vous disposez',
        ],
      },
      {
        tag: 'inference',
        title: 'Moins de *rouages*.',
        body: 'Butter sert des modèles sans Python dans le chemin de serving, sur des kernels optimisés pour chaque backend. Moins à corriger, moins de pannes possibles et moins à expliquer.',
        points: [
          'Metal d’abord, CUDA ensuite, ROCm et Vulkan fonctionnent',
          'Serving compatible OpenAI : vos applications continuent de fonctionner',
          'Charge les modèles Hugging Face sans conversion',
        ],
      },
      {
        tag: 'control',
        title: 'Le matériel que vous *choisissez*.',
        body: 'Une seule définition de kernel Iron est compilée vers Metal, CUDA, HIP et Vulkan, et vos données restent où elles sont, sauf si vous choisissez de les partager. Changer de fournisseur devient une décision, pas une réécriture.',
        points: [
          'Sur site, dans votre propre cloud ou sur une seule station de travail',
          'Waffle fonctionne avec vLLM, SGLang et llama.cpp',
          'Aucun verrouillage sur un moteur ou un fournisseur de GPU',
        ],
      },
    ],
  },
  cta: {
    title: 'Dites-nous vos *contraintes*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous votre secteur, votre matériel et ce qui ne peut pas sortir de vos murs, et nous vous dirons honnêtement ce qui convient aujourd’hui.',
  },
};

export default industriesOverviewFr;
