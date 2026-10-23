import type { butter } from './butter';

const butterFr: (typeof butter)['en'] = {
  layer: 'Serving',
  tagline: 'Servir des modèles sans Python.',
  summary:
    'Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Charge des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et MoE, avec un cache KV quantifié.',
  seo: {
    title: 'Butter : inférence LLM sans Python',
    description:
      'Moteur d’inférence LLM : Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Charge les modèles Hugging Face tels quels, API compatible OpenAI.',
    keywords: [
      'moteur d’inférence LLM',
      'serving LLM local',
      'inférence sur silicium Apple',
      'serveur compatible OpenAI',
      'cache KV quantifié',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: 'Servir des modèles *sans* Python.',
    lede: 'Butter est un moteur d’inférence écrit en Swift sur Metal pour le silicium Apple et en Rust pour CUDA et le reste. Pas de Python, pas de JIT, et les modèles se chargent directement depuis Hugging Face.',
    highlights: [
      {
        value: '4',
        label: 'formats de checkpoint, chargés sans conversion',
      },
      {
        value: '2–8 bits',
        label: 'checkpoints quantifiés, avec un cache KV quantifié',
      },
      { value: 'Sans Python', label: 'et sans JIT' },
    ],
  },
  story: {
    heading: 'Oubliez Python et la *conversion*.',
    problem:
      'Pour qu’un modèle réponde, il faut généralement un environnement Python, une étape de conversion et un runtime qui compile au fil de l’eau. Sur un portable ou une machine à un seul GPU, cela fait beaucoup de mécanique entre vous et une réponse.',
    outcome:
      'Pointez Butter vers un modèle sur Hugging Face. Il charge safetensors, MLX, JANG et GGUF tels quels, et butter serve vous donne un serveur compatible OpenAI sur le matériel que vous possédez déjà.',
    outcomes: [
      'Faites tourner des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et des modèles MoE (mixture of experts) sur un Mac ou une station RTX.',
      'Pointez les outils que vous utilisez déjà vers un endpoint compatible OpenAI, avec streaming et appel d’outils.',
      'Gardez la mémoire sous contrôle sur les longs contextes grâce à un cache KV quantifié.',
    ],
  },
  capabilities: {
    heading: 'Ce que fait *Butter*.',
    intro:
      'Du chargement d’un checkpoint au streaming des tokens, sans Python entre les deux.',
    items: [
      {
        title: 'Charge les modèles tels quels',
        body: 'Récupérez safetensors, MLX, JANG ou GGUF directement depuis Hugging Face. Aucune étape de conversion.',
      },
      {
        title: 'Quantifié, hybride et MoE',
        body: 'Fait tourner des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et des modèles MoE (mixture of experts).',
      },
      {
        title: 'Un cache KV quantifié',
        body: 'Stocke le cache KV en quantifié, pour contenir l’usage mémoire à mesure que le contexte s’allonge.',
      },
      {
        title: 'Serving compatible OpenAI',
        body: 'butter serve expose une API compatible OpenAI, avec streaming et appel d’outils.',
      },
      {
        title: 'Décodage spéculatif et LoRA',
        body: 'Le décodage spéculatif pour la génération, et LoRA pour les adaptateurs que vous entraînez vous-même.',
      },
      {
        title: 'Plus que du texte',
        body: 'Modèles de texte, de vision, de reconnaissance vocale, de synthèse vocale et omni.',
      },
    ],
  },
  code: {
    heading: 'Lancez un serveur, puis *interrogez*-le.',
    intro:
      'Butter parle l’API OpenAI : les clients que vous utilisez déjà peuvent le viser.',
    caption:
      'À titre d’illustration. Remplacez les valeurs entre chevrons par votre modèle et votre port. Ce n’est pas un benchmark.',
  },
  specs: {
    heading: 'Les *détails* techniques.',
    intro: 'Les détails, pour celles et ceux qui les liront.',
    rows: [
      {
        term: 'Runtime',
        detail:
          'Swift sur Metal pour le silicium Apple. Rust pour CUDA et le reste. Pas de Python, pas de JIT.',
      },
      {
        term: 'Formats de modèles',
        detail: 'Chargés directement depuis Hugging Face, sans conversion.',
        chips: [
          { label: 'safetensors' },
          { label: 'MLX' },
          { label: 'JANG' },
          { label: 'GGUF' },
        ],
      },
      {
        term: 'Quantification',
        detail: 'Checkpoints quantifiés de 2 à 8 bits.',
      },
      {
        term: 'Architectures',
        detail: 'Modèles hybrides et mixture-of-experts (MoE).',
      },
      { term: 'Cache KV', detail: 'Quantifié.' },
      {
        term: 'API de serving',
        detail: 'Compatible OpenAI, lancée avec butter serve.',
        chips: [
          { label: 'Streaming' },
          { label: 'Appel d’outils' },
          { label: 'Décodage spéculatif' },
          { label: 'LoRA' },
        ],
      },
      {
        term: 'Modalités',
        chips: [
          { label: 'Texte' },
          { label: 'Vision' },
          { label: 'Reconnaissance vocale' },
          { label: 'Synthèse vocale' },
          { label: 'Omni' },
        ],
      },
      {
        term: 'Familles de modèles',
        groups: [
          { label: 'Meta', text: 'Llama 3, 3.1, 3.2, 3.3' },
          { label: 'Google', text: 'Gemma 2, 3, 4; PaliGemma' },
          { label: 'Qwen', text: '2, 3, 3.5, 3.6, 3.8; VL; Omni' },
          { label: 'OpenAI', text: 'GPT-OSS 20B, 120B; Whisper' },
          { label: 'Mistral', text: 'Mistral; Mistral 3 VL; Voxtral' },
          { label: 'NVIDIA', text: 'Nemotron H; Nemotron VLM' },
          { label: 'DeepSeek', text: 'V4', inProgress: true },
          { label: 'IBM', text: 'Granite 3, 4' },
          { label: 'Microsoft', text: 'Phi 3' },
          { label: 'Liquid AI', text: 'LFM2, LFM2.5' },
          { label: 'Ai2', text: 'OLMo 1, 2' },
          { label: 'Hugging Face', text: 'SmolLM; SmolVLM' },
          { label: 'TII', text: 'Falcon H1' },
          { label: 'AI21', text: 'Jamba' },
          { label: 'Apple', text: 'FastVLM' },
          { label: 'Shanghai AI Lab', text: 'InternLM 2' },
        ],
      },
      {
        term: 'Disponibilité',
        detail: 'Privé et à code fermé pendant l’accès anticipé.',
      },
    ],
  },
  platforms: {
    heading: 'Où ça *tourne*.',
    intro:
      'Metal est la cible principale. CUDA est secondaire, et ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Swift sur Metal pour le silicium Apple : MacBook et Mac Studio.',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'Rust sur CUDA. En production sur RTX et DGX Spark ; GPU de datacenter en cours.',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: 'Fonctionne aujourd’hui, pas encore optimisé.',
      },
    ],
  },
  stack: {
    heading: 'Compatible avec le reste de la *stack*.',
    intro:
      'Butter exécute les modèles sur les kernels qu’Iron compile. Waffle peut le surveiller aux côtés de vLLM, SGLang et llama.cpp, et Syrup donne à votre IA la mémoire de ce sur quoi vous travailliez.',
  },
  faq: [
    {
      question: 'Butter est-il open source ?',
      answer:
        'Pas aujourd’hui. Butter est privé et à code fermé pendant l’accès anticipé. Demandez l’accès et nous vous écrirons quand il y aura plus à partager.',
    },
    {
      question: 'Sur quel matériel cela tourne-t-il ?',
      answer:
        'Swift sur Metal pour le silicium Apple est la cible principale, du MacBook au Mac Studio. CUDA est secondaire, en production sur RTX et DGX Spark, avec les GPU de datacenter en cours. ROCm et Vulkan fonctionnent aujourd’hui mais ne sont pas encore optimisés.',
    },
    {
      question: 'Quels modèles fait-il tourner ?',
      answer:
        'La couverture actuelle comprend Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite et Phi, entre autres listés plus haut, en variantes texte, vision, voix et omni. DeepSeek V4 est en cours.',
    },
    {
      question: 'Ai-je besoin de Python ?',
      answer:
        'Non. Butter, c’est du Swift sur Metal pour le silicium Apple et du Rust pour CUDA et le reste, sans Python et sans JIT.',
    },
    {
      question: 'Mes outils actuels fonctionneront-ils avec Butter ?',
      answer:
        'Butter sert une API compatible OpenAI avec butter serve, y compris le streaming et l’appel d’outils : les clients qui parlent cette API peuvent le viser.',
    },
    {
      question: 'À quelle vitesse tourne-t-il ?',
      answer:
        'Nous n’avons publié aucun chiffre de benchmark, donc nous n’en citerons pas ici. Le décodage spéculatif et un cache KV quantifié sont intégrés, et nous préférons vous montrer une mesure plutôt que d’avancer une affirmation.',
    },
  ],
  cta: {
    title: 'Faites fondre la *latence*.',
    body: 'Butter est en accès anticipé et à code fermé pour l’instant. Demandez l’accès, et lisez la documentation en attendant.',
    docsLabel: 'Lire la documentation',
  },
};

export default butterFr;
