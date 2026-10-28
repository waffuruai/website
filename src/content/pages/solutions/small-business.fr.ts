import type { smallBusiness } from './small-business';

const smallBusinessFr: (typeof smallBusiness)['en'] = {
  seo: {
    title: 'IA privée pour petites entreprises',
    description:
      'Une IA privée sur un Mac Studio ou une station RTX que vous possédez déjà. Vos données restent chez vous, sans facture cloud au token. Accès anticipé.',
    keywords: [
      'IA privée pour petite entreprise',
      'IA locale',
      'LLM sur appareil',
      'IA sans coûts cloud',
    ],
  },
  name: 'Petites entreprises',
  serviceType: 'Logiciel d’inférence IA locale et privée',
  card: {
    title: 'Petites *entreprises*',
    summary:
      'Une IA privée sur un Mac Studio ou une machine RTX, sans facture cloud.',
  },
  hero: {
    title: 'Une IA privée, sans facture *cloud*.',
    lede: 'Faites tourner des modèles ouverts sur un Mac Studio ou une station RTX que vous possédez déjà. Vos fichiers restent sur votre machine, et rien n’est facturé à la question.',
  },
  problem: {
    title: 'Chaque prompt a un *prix*.',
    statement:
      'L’IA est la plus utile sur vos propres fichiers, et c’est précisément là que commencent les factures et les questions de confidentialité.',
    body: 'La facturation au token rend chaque essai coûteux, et envoyer des documents clients, des factures ou du code source sur les serveurs de quelqu’un d’autre est une décision que vous préféreriez ne pas prendre à chaque prompt. Pendant ce temps, la machine posée sur votre bureau sait déjà faire tourner des modèles ouverts comme Llama, Gemma, Qwen et GPT-OSS.',
  },
  useCases: {
    title: 'Mettez la machine au *travail*.',
    intro:
      'Quatre tâches qu’une petite équipe peut confier à une machine qu’elle possède déjà.',
    items: [
      {
        tag: 'cost',
        title: 'Cessez de payer à la question.',
        body: 'Faites tourner des modèles sur un Mac Studio ou une station RTX que vous possédez déjà : la dépense ne grimpe plus avec chaque prompt, chaque document et chaque collègue. Un usage intensif devient une facture d’électricité, pas une mauvaise surprise.',
      },
      {
        tag: 'control',
        title:
          'Travaillez sur les fichiers de vos clients sans les envoyer nulle part.',
        body: 'Modèles, prompts et documents restent sur votre machine, sauf si vous choisissez de les partager. Résumez des contrats, rédigez des réponses et vérifiez des factures sans tiers dans la boucle.',
      },
      {
        tag: 'inference',
        title: 'Faites tenir un plus gros modèle sur la machine que vous avez.',
        body: 'Des checkpoints quantifiés de 2 à 8 bits et un cache KV quantifié permettent à des modèles plus grands et à des conversations plus longues de tenir dans la mémoire que vous possédez déjà. Butter les charge directement depuis Hugging Face, sans étape de conversion.',
      },
      {
        tag: 'control',
        title: 'Interrogez vos propres notes et votre propre code.',
        body: 'Whisk exécute la recherche en local sur vos notes et votre code : une réponse revient avec une citation de sa source. La recherche est lexicale plus vectorielle, donc les noms exacts comme les questions floues trouvent leur cible.',
      },
    ],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Butter fait le gros du travail. Whisk et Syrup sont là quand vous en avez envie.',
    items: [
      {
        product: 'butter',
        need: 'Faire tourner des modèles sur la machine que vous possédez.',
        body: 'Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Llama, Gemma, Qwen, GPT-OSS et d’autres tournent aux côtés de modèles de reconnaissance vocale, de synthèse vocale et de vision, et butter serve donne à vos applications un endpoint compatible OpenAI.',
      },
      {
        product: 'whisk',
        need: 'Interroger vos propres fichiers, et obtenir des sources.',
        body: 'Recherche locale sur vos notes et votre code. Les résultats reviennent avec leurs citations via MCP : les assistants peuvent montrer leur travail.',
      },
      {
        product: 'syrup',
        need: 'Garder un œil sur la machine sous votre bureau.',
        body: 'D’une machine à une petite baie, voyez chaque GPU et chaque moteur qui y tourne, que ce soit Butter, llama.cpp, vLLM ou SGLang.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Waffuru est en accès anticipé, et les produits sont à code fermé pour l’instant. Voici ce que cela signifie pour une petite équipe.',
    notes: [
      'Le silicium Apple est l’endroit où chaque kernel est optimisé en premier : un Mac Studio est donc le point de départ le plus fluide.',
      'Les stations NVIDIA RTX tournent sur CUDA, qui est en production. AMD et Vulkan fonctionnent mais ne sont pas encore optimisés.',
      'La couverture de modèles est large et s’étend, et DeepSeek V4 est en cours.',
    ],
  },
  faq: [
    {
      question: 'De quel matériel ai-je besoin ?',
      answer:
        'Un Mac avec silicium Apple est le point de départ le mieux pris en charge, car Metal est l’endroit où chaque kernel est optimisé en premier. Les stations RTX tournent sur CUDA, et DGX Spark et Strix Halo sont aussi sur la liste. La taille du modèle que vous pouvez faire tourner dépend de la mémoire dont vous disposez.',
    },
    {
      question:
        'Les modèles locaux seront-ils aussi bons que les plus gros modèles hébergés ?',
      answer:
        'Pas pour toutes les tâches, et nous ne ferons pas semblant du contraire. Les modèles ouverts couvrent une grande partie du travail quotidien, et pour les tâches les plus difficiles, un modèle hébergé peut rester le meilleur outil. Tourner en local, c’est choisir au cas par cas plutôt que de passer par défaut par le cloud.',
    },
    {
      question: 'Mes données quittent-elles ma machine ?',
      answer:
        'Non, sauf si vous choisissez d’utiliser un fournisseur d’inférence d’IA hébergé. Les modèles tournent en local, et vos prompts, fichiers et notes restent par défaut sur votre machine.',
    },
    {
      question: 'Puis-je continuer à utiliser les applications que j’ai déjà ?',
      answer:
        'Si elles parlent l’API OpenAI, en général oui. Butter sert un endpoint compatible OpenAI avec streaming et appel d’outils : beaucoup d’outils n’ont besoin que d’une nouvelle adresse.',
    },
    {
      question: 'Puis-je l’essayer dès aujourd’hui ?',
      answer:
        'L’accès anticipé est ouvert sur demande, et les produits sont à code fermé pour l’instant. Dites-nous ce que vous voulez faire tourner, et sur quel matériel, et nous vous répondrons.',
    },
  ],
  cta: {
    title: 'Faites-le tourner sur votre *propre* machine.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous ce que vous voulez faire tourner, et sur quel matériel, et nous vous répondrons.',
  },
};

export default smallBusinessFr;
