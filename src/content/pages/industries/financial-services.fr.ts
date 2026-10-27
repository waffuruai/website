import type { financialServices } from './financial-services';

const financialServicesFr: (typeof financialServices)['en'] = {
  seo: {
    title: 'Inférence IA privée pour les services financiers',
    description:
      'L’IA là où vivent vos données clients, un coût par charge de travail et une stack de serving plus légère à examiner pour le risque de modèle. Accès anticipé.',
    keywords: [
      'IA privée pour les services financiers',
      'LLM sur site pour les banques',
      'coût de l’IA par charge de travail',
      'résidence des données IA',
      'visibilité des coûts GPU',
    ],
  },
  name: 'Services financiers',
  serviceType: 'Logiciel d’inférence IA privée et sur site pour la finance',
  card: {
    title: 'Services *financiers*',
    summary:
      'Une inférence privée sur les données clients, avec un coût par charge de travail à présenter à la finance.',
  },
  hero: {
    title: 'Faites tourner l’IA là où *vivent* déjà vos données clients.',
    lede: 'Servez des modèles sur du matériel que vous exploitez, pour que dossiers clients, analyses et code restent dans votre périmètre. Voyez ce que coûte chaque charge de travail avant que la finance ne le demande, et donnez aux équipes risque de modèle moins de rouages à examiner.',
  },
  problem: {
    title: 'Chaque prompt est une *divulgation*.',
    statement:
      'Le travail qui vaut la peine d’être automatisé repose sur des données clients, et les envoyer à l’API de quelqu’un d’autre est une décision de divulgation que personne ne veut prendre prompt après prompt.',
    body: 'Pendant ce temps, les équipes risque de modèle veulent savoir ce qui tourne où, l’audit veut une traçabilité, et la finance veut un coût par charge de travail que personne ne sait produire. Les GPU finissent éparpillés entre les desks et les clusters, et la stack de serving est un empilement de dépendances Python qui change chaque semaine.',
  },
  useCases: {
    title: 'Un travail qui reste *dans vos livres*.',
    intro:
      'Quatre missions pour l’équipe plateforme qui répond à la fois au risque, à la finance et aux métiers.',
    items: [
      {
        tag: 'control',
        title:
          'Utilisez l’IA sur les données clients sans les envoyer à l’extérieur.',
        body: 'Butter sert des modèles sur des serveurs que vous exploitez, sur site ou dans votre cloud privé : prompts, documents et sorties restent sur une infrastructure que vous maîtrisez. Notre règle par défaut : les données restent où elles sont, sauf si vous choisissez de les partager.',
      },
      {
        tag: 'cost',
        title: 'Chiffrez chaque charge de travail.',
        body: 'Les dollars par charge de travail, c’est le chiffre que demande la finance, et presque personne ne peut le voir. Waffle montre quels GPU sont occupés, quels moteurs y tournent et lesquels sont inactifs, pour que la dépense se rattache au travail effectué.',
      },
      {
        tag: 'inference',
        title: 'Servez avec moins de rouages.',
        body: 'Butter se passe de Python dans le chemin de serving, et son API compatible OpenAI permet à vos outils internes de changer d’adresse, pas de SDK. Moins de dépendances, c’est moins de choses à suivre entre la revue et la production.',
      },
      {
        tag: 'control',
        title: 'Répondez à partir de vos propres analyses, sources à l’appui.',
        body: 'Syrup exécute la recherche en local sur vos notes, documents et code internes, et chaque réponse revient avec une citation. Un analyste peut vérifier la source au lieu de se fier au résumé.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Butter garde le travail en interne, Waffle le chiffre, Syrup apporte les sources, et Iron se trouve en dessous.',
    items: [
      {
        product: 'butter',
        need: 'Servir des modèles dans votre périmètre.',
        body: 'Du serving compatible OpenAI en Swift sur Metal et en Rust pour CUDA, sans Python dans le chemin de serving. Il charge directement les checkpoints safetensors, MLX, JANG et GGUF : un nouveau modèle ne demande aucune chaîne de conversion.',
      },
      {
        product: 'waffle',
        need: 'Un coût pour chaque charge de travail.',
        body: 'Chaque GPU et chaque moteur en une seule vue, que ce soit Butter, vLLM, SGLang ou llama.cpp. Un petit sidecar Rust sur chaque hôte remonte une télémétrie signée : les mesures que vous présentez à la finance peuvent être rattachées à l’hôte qui les a envoyées.',
      },
      {
        product: 'syrup',
        need: 'Des réponses avec leur source.',
        body: 'Recherche locale sur vos notes, documents et code internes. La recherche est lexicale plus vectorielle, et les résultats reviennent avec leurs citations via MCP.',
      },
      {
        product: 'iron',
        need: 'Un choix de fournisseur qui n’impose pas de tout réécrire.',
        body: 'Une seule définition de kernel est compilée vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V. Si les achats changent de fournisseur de GPU, les kernels suivent, et l’optimisation se fait backend par backend.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Mieux vaut l’entendre ici que lors d’une évaluation fournisseur. Les produits sont en accès anticipé et à code fermé pour l’instant, et les GPU de datacenter sont en cours.',
    notes: [
      'Prévoyez un pilote sur silicium Apple, stations RTX ou DGX Spark, là où la stack tourne aujourd’hui.',
      'ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
      'Nous ne revendiquons aucune conformité ni certification sur ce site. Apportez vos exigences et nous y répondrons directement.',
    ],
  },
  faq: [
    {
      question: 'Les données clients quittent-elles notre réseau ?',
      answer:
        'Les données d’inférence ne sortent pas par défaut, car les données restent sur la machine, sauf si vous choisissez de les partager. Chaque hôte Waffle exécute un sidecar qui remonte une télémétrie signée, et nous vous détaillerons exactement ce qu’elle contient.',
    },
    {
      question: 'Pouvons-nous voir ce que coûte chaque charge de travail ?',
      answer:
        'C’est le rôle de Waffle. Il montre chaque GPU et les moteurs qui y tournent, occupés ou inactifs : c’est là que commence un coût par charge de travail. Nous préférons vous le montrer sur votre matériel plutôt que promettre un chiffre.',
    },
    {
      question: 'Sur quel matériel cela tourne-t-il aujourd’hui ?',
      answer:
        'Le silicium Apple via Metal est principal. NVIDIA via CUDA est secondaire, en production sur RTX et DGX Spark, avec les GPU de datacenter en cours. AMD ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    },
    {
      question: 'Est-ce certifié pour les charges de travail réglementées ?',
      answer:
        'Nous ne revendiquons aucune conformité ni certification. Dites-nous ce qu’exigent vos régulateurs et votre équipe risque, et nous vous répondrons précisément.',
    },
    {
      question: 'Devons-nous remplacer ce que nous utilisons déjà ?',
      answer:
        'Non. Waffle fonctionne avec Butter, vLLM, SGLang, llama.cpp et d’autres serveurs compatibles OpenAI : la visibilité vient d’abord, et les choix de moteur peuvent attendre.',
    },
  ],
  cta: {
    title: 'Montrez-nous ce qui ne peut pas *sortir*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous quelles données doivent rester en interne et quel matériel vous utilisez, et nous vous dirons honnêtement ce qui convient aujourd’hui.',
  },
};

export default financialServicesFr;
