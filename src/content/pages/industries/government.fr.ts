import type { government } from './government';

const governmentFr: (typeof government)['en'] = {
  seo: {
    title: 'Inférence IA souveraine pour le secteur public',
    description:
      'L’IA sur votre matériel, les données publiques dans votre juridiction, chaque charge de travail comptée, ni moteur ni fournisseur imposé. Accès anticipé.',
    keywords: [
      'IA souveraine',
      'infrastructure IA pour le secteur public',
      'LLM sur site pour l’administration',
      'résidence des données IA',
      'inférence IA indépendante des fournisseurs',
    ],
  },
  name: 'Secteur public',
  serviceType: 'Logiciel d’inférence IA souveraine et sur site',
  card: {
    title: '*Secteur public*',
    summary:
      'Une inférence souveraine sur du matériel que vous maîtrisez, sans verrouillage sur un moteur ou un fournisseur.',
  },
  hero: {
    title: 'Une IA souveraine, sur du matériel que vous *maîtrisez*.',
    lede: 'Faites tourner des modèles sur une infrastructure exploitée par votre organisme, pour que les données publiques restent dans votre juridiction. Rendez compte de chaque GPU et de chaque charge de travail, et gardez la liberté de changer de fournisseur sans repartir de zéro.',
  },
  problem: {
    title: 'Argent public, données *privées*.',
    statement:
      'Les services publics reposent sur des données qui doivent rester dans votre juridiction, et chaque dollar dépensé en GPU doit résister à l’examen des marchés publics.',
    body: 'L’IA hébergée signifie souvent des données qui partent vers le cloud de quelqu’un d’autre. Acheter du matériel peut signifier parier sur un seul fournisseur pendant des années. Les organismes se retrouvent avec un mélange de machines que personne ne voit au même endroit, et une stack de serving difficile à expliquer à ceux qui la valident.',
  },
  useCases: {
    title: 'Des capacités qui restent *chez vous*.',
    intro:
      'Quatre missions pour l’équipe qui doit faire fonctionner l’IA selon les règles du secteur public.',
    items: [
      {
        tag: 'control',
        title: 'Gardez les données dans votre juridiction.',
        body: 'Butter sert des modèles sur des serveurs que vous exploitez, sur site ou dans un cloud de votre choix : prompts et documents restent sur une infrastructure que vous maîtrisez. Les données restent où elles sont, sauf si vous choisissez de les partager.',
      },
      {
        tag: 'cost',
        title: 'Montrez où va l’argent.',
        body: 'Les dollars par charge de travail, c’est le chiffre que demande un service du budget, et presque personne ne peut le voir. Syrup montre chaque GPU, chaque moteur qui y tourne et ce qui reste inactif, pour que la dépense se rattache aux services qu’elle fait tourner.',
      },
      {
        tag: 'control',
        title: 'Achetez du matériel sans acheter de verrouillage.',
        body: 'Une seule définition de kernel Iron est compilée vers Metal, CUDA, HIP/ROCm et Vulkan, et Syrup fonctionne avec Butter, vLLM, SGLang et llama.cpp. Changer de fournisseur de GPU ou de moteur devient une décision, pas une réécriture.',
      },
      {
        tag: 'inference',
        title: 'Utilisez le matériel que vous avez déjà acheté.',
        body: 'Des Mac sur les bureaux aux stations RTX et à DGX Spark, une seule stack sert des modèles sur ce qui est déjà payé. Butter réduit ses dépendances au minimum : moins à corriger, et moins à justifier.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Butter garde le travail dans votre juridiction, Syrup en rend compte, Whisk répond à partir de vos propres documents, et Iron rend les fournisseurs interchangeables.',
    items: [
      {
        product: 'butter',
        need: 'Servir des modèles sur une infrastructure que vous exploitez.',
        body: 'Du serving compatible OpenAI en Swift pour macOS et iOS et en Rust pour tout le reste, avec un minimum de dépendances. Vos outils existants changent d’adresse, pas de SDK.',
      },
      {
        product: 'syrup',
        need: 'Un inventaire unique de chaque GPU.',
        body: 'Chaque GPU et chaque moteur en une seule vue, que ce soit Butter, vLLM, SGLang ou llama.cpp. Un petit sidecar Rust sur chaque hôte remonte une télémétrie signée.',
      },
      {
        product: 'whisk',
        need: 'Des réponses tirées de vos propres documents, avec leurs sources.',
        body: 'Recherche locale sur vos notes, documents et code internes. La recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
      },
      {
        product: 'iron',
        need: 'Un choix de fournisseur qui survit au prochain appel d’offres.',
        body: 'Une seule définition de kernel est compilée vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V derrière une ABI C et Rust versionnée. Les kernels suivent quand le matériel change, et l’optimisation se fait backend par backend.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Les produits sont en accès anticipé et à code fermé pour l’instant, et nous ne revendiquons aucune conformité ni accréditation. Voici ce qui fonctionne aujourd’hui.',
    notes: [
      'Prévoyez vos pilotes sur silicium Apple, stations RTX et DGX Spark, là où la stack tourne aujourd’hui. Les GPU de datacenter sont en cours.',
      'ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
      'La majeure partie de la stack fonctionne hors ligne une fois les modèles sur vos machines. La prise en charge des environnements physiquement isolés arrive bientôt.',
      'Soumettez-nous directement vos exigences en matière d’achats et de sécurité, et nous y répondrons précisément.',
    ],
  },
  faq: [
    {
      question: 'Des données quittent-elles notre infrastructure ?',
      answer:
        'Les données d’inférence ne sortent pas par défaut, car les données restent sur la machine, sauf si vous choisissez de les partager. Chaque hôte Syrup exécute un sidecar qui remonte une télémétrie signée, et nous vous détaillerons exactement ce qu’elle contient pour votre environnement.',
    },
    {
      question: 'Cela peut-il fonctionner hors ligne ?',
      answer:
        'La majeure partie de la stack fonctionne hors ligne une fois les modèles sur vos machines. La prise en charge des environnements physiquement isolés arrive bientôt, et nous vous dirons ce qui fonctionne aujourd’hui dans votre environnement.',
    },
    {
      question: 'Êtes-vous accrédités pour un usage dans le secteur public ?',
      answer:
        'Nous ne revendiquons aucune conformité, certification ou accréditation. Dites-nous ce qu’exige votre organisme, et nous vous répondrons précisément.',
    },
    {
      question: 'Comment évite-t-on le verrouillage ?',
      answer:
        'Syrup fonctionne avec Butter, vLLM, SGLang et llama.cpp : vous n’êtes pas lié à un seul moteur. Les kernels Iron sont compilés vers Metal, CUDA, HIP/ROCm et Vulkan : vous n’êtes pas lié à un seul fournisseur de GPU.',
    },
    {
      question: 'Quel matériel est pris en charge ?',
      answer:
        'Le silicium Apple via Metal est principal. NVIDIA via CUDA est secondaire, en production sur RTX et DGX Spark, avec les GPU de datacenter en cours. AMD ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    },
    {
      question: 'Comment l’évaluer ?',
      answer:
        'L’accès anticipé est ouvert sur demande, et les produits sont à code fermé pour l’instant. Dites-nous votre matériel et votre charge de travail, et nous vous dirons honnêtement si cela convient aujourd’hui.',
    },
  ],
  cta: {
    title: 'Gardez tout dans votre *juridiction*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous ce qui doit rester dans le pays et quel matériel vous utilisez, et nous vous dirons honnêtement ce qui convient aujourd’hui.',
  },
};

export default governmentFr;
