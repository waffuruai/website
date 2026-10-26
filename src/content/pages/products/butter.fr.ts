import type { butter } from './butter';

const butterFr: (typeof butter)['en'] = {
  layer: 'Serving',
  tagline: 'Servir des modèles sans Python.',
  summary:
    'Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Charge des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et MoE, et les sert via des API compatibles OpenAI et Anthropic Messages.',
  seo: {
    title: 'Butter : inférence LLM sans Python',
    description:
      'Moteur d’inférence LLM : Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Sert les modèles Hugging Face via des API compatibles OpenAI et Anthropic Messages, pensé pour les harnais d’agents.',
    keywords: [
      'moteur d’inférence LLM',
      'serving LLM local',
      'inférence sur silicium Apple',
      'serveur compatible OpenAI',
      'serveur API Anthropic Messages',
      'cache KV quantifié',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: 'Servir des modèles *sans* Python.',
    lede: 'Butter est un moteur d’inférence écrit en Swift sur Metal pour le silicium Apple et en Rust pour CUDA et le reste. Pas de Python, des kernels Metal livrés précompilés, et les modèles se chargent directement depuis Hugging Face.',
    highlights: [
      {
        value: '4',
        label: 'formats de checkpoint, chargés sans conversion',
      },
      {
        value: '2–8 bits',
        label: 'checkpoints quantifiés, avec un cache KV quantifié',
      },
      { value: '2 API', label: 'compatible OpenAI et Anthropic Messages' },
    ],
  },
  story: {
    heading: 'Vos modèles. Votre matériel. *Aucune* facture au token.',
    problem:
      'La plupart des équipes louent l’IA au token. Chaque prompt quitte l’entreprise, la facture grimpe avec chaque utilisateur et le matériel déjà payé reste inutilisé. Faire tourner des modèles en interne demande en général une équipe spécialisée et des semaines de mise en place.',
    outcome:
      'Butter transforme un Mac ou une station GPU que vous possédez déjà en serveur d’IA privé. Choisissez un modèle, lancez Butter, et les applications et agents de votre équipe peuvent l’utiliser le jour même.',
    outcomes: [
      'Réduisez la facture : des modèles ouverts sur du matériel déjà payé, compressés pour qu’une seule machine serve plus de personnes et des conversations plus longues. Pas de prix au token.',
      'Vos données restent chez vous : prompts, documents et réponses ne quittent jamais vos machines.',
      'Rien à changer en amont : Butter parle les mêmes API OpenAI et Anthropic que vos outils, changer se résume à une URL.',
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
        body: 'Fait tourner des checkpoints quantifiés de 2 à 8 bits, des checkpoints MXFP4 et NVFP4 à échelles par bloc, des modèles hybrides et des modèles MoE (mixture of experts).',
      },
      {
        title: 'Un cache KV qui tient',
        body: 'Le cache KV peut être stocké en 4 ou 8 bits ou compressé avec AURA. Chaque cache est un anneau au plafond de contexte : une longue session évince ses tokens les plus anciens avec un avertissement au lieu de faire échouer la requête.',
      },
      {
        title: 'Deux API, un serveur',
        body: 'butter serve parle l’API Chat Completions d’OpenAI et l’API Messages d’Anthropic, avec streaming, appels d’outils structurés, raisonnement dans son propre champ et un préfixe de prompt réutilisé d’un tour à l’autre.',
      },
      {
        title: 'Décodage spéculatif et LoRA',
        body: 'Décodage spéculatif pour la génération, et LoRA pour les adaptateurs que vous entraînez vous-même.',
      },
      {
        title: 'Plus que du texte',
        body: 'Modèles texte, vision, reconnaissance vocale, synthèse vocale et omni.',
      },
    ],
  },
  code: {
    heading: 'Lancez un serveur, puis *interrogez*-le.',
    intro:
      'Butter parle l’API OpenAI : les clients que vous utilisez déjà peuvent le viser.',
    caption:
      'À titre d’illustration. Remplacez les valeurs entre chevrons par votre modèle et votre port. Ce n’est pas un benchmark.',
  },
  extras: [
    {
      id: 'agents',
      heading: 'Compatible avec votre harnais d’*agents*.',
      intro:
        'Butter est le serveur. Votre harnais garde sa boucle, ses outils, ses approbations et sa compaction.',
      items: [
        {
          title: 'Deux API, une session',
          body: 'Chat Completions et Completions d’OpenAI, et l’API Messages d’Anthropic avec blocs system, historique tool_use et tool_result et blocs thinking. Réglez une URL de base et c’est parti.',
        },
        {
          title: 'Appels d’outils structurés, en streaming',
          body: 'Les appels d’outils reviennent en JSON avec des ids uniques d’un tour à l’autre, diffusés en deltas. Les types des arguments suivent votre schéma : un entier reste un entier.',
        },
        {
          title: 'Un raisonnement visible ou masqué',
          body: 'Réflexion activée ou désactivée par requête. Quand elle est activée, le raisonnement arrive dans son propre champ ou bloc thinking et la réponse reste propre.',
        },
        {
          title: 'Un préfixe de prompt qui survit aux tours d’outils',
          body: 'Le deuxième tour ne refait pas le prefill de votre system prompt ni de votre liste d’outils. usage.cached_tokens et cache_read_input_tokens indiquent ce qui a été réutilisé.',
        },
        {
          title: 'Annuler veut dire annuler',
          body: 'Fermez la connexion et cette requête s’arrête, en plein prefill ou en plein décodage. Le travail restant ne s’exécute pas et les autres requêtes continuent.',
        },
        {
          title: 'Un contexte qui se dégrade sans échouer',
          body: 'Le budget de contexte est indiqué sur /v1/models. Passé le plafond, le cache évince les tokens les plus anciens avec un avertissement plutôt que de casser la boucle.',
        },
      ],
      note: 'Éprouvé de bout en bout avec Oh My Pi via Chat Completions et avec un client de type Claude Code via Messages, sur Qwen 3.6, Qwen 3.8 et Flint.',
    },
    {
      id: 'quirks',
      heading:
        'Nous gérons les *manies* du modèle pour que votre agent n’ait pas à le faire.',
      intro:
        'Chaque famille arrive avec son template, ses tokens et ses habitudes. Butter les absorbe côté serveur.',
      items: [
        {
          title: 'Templates de chat et tokens',
          body: 'Le template de Nanbeige garde ses espaces, les tokens de contrôle des GGUF Qwen restent entiers et les chiffres se tokenisent aux frontières du checkpoint, donc les prompts correspondent au tokenizer officiel et les appels d’outils se parsent. Gemma et InternLM s’arrêtent en fin de tour au lieu de divaguer.',
        },
        {
          title: 'Contrôle du raisonnement',
          body: 'Les blocs de réflexion sont séparés de la réponse et conservés d’un tour d’outils à l’autre pour que le cache de préfixe survive. Le raisonnement de Flint peut recevoir un budget de tokens et un message de transition.',
        },
        {
          title: 'Appels d’outils',
          body: 'Les appels XML de Qwen deviennent du JSON typé, dans la réponse comme dans l’historique rejoué. Une réponse sans outils annoncés n’est jamais transformée en appel, et un tool_choice non pris en charge est refusé d’emblée au lieu d’être ignoré en silence.',
        },
        {
          title: 'Front-ends audio',
          body: 'Les modèles de la famille Whisper reçoivent le banc de filtres mel Slaney avec lequel ils ont été entraînés, l’en-tête de langue de Qwen3-ASR est retiré des transcriptions, et les checkpoints Kokoro sont routés vers Kokoro plutôt que StyleTTS2.',
        },
        {
          title: 'Chargeurs et mémoire',
          body: 'Les GGUF à embeddings liés se chargent sans tête de sortie, les dépôts qui n’ont que SentencePiece se tokenisent, le texte en streaming garde ses espaces, et une conversation Qwen qui dépasse son cache se rétablit au lieu d’être refusée.',
        },
      ],
    },
  ],
  specs: {
    heading: 'Les *détails* techniques.',
    intro: 'Les détails, pour celles et ceux qui les liront.',
    rows: [
      {
        term: 'Runtime',
        detail:
          'Swift sur Metal pour le silicium Apple, macOS 14 ou plus récent. Rust pour CUDA et le reste. Pas de Python.',
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
        detail:
          'Checkpoints affines en 2, 3, 4, 5, 6 et 8 bits, largeur déduite par tenseur. Checkpoints MXFP4 et NVFP4 à échelles par bloc. Block FP8 sur CUDA.',
      },
      {
        term: 'Architectures',
        detail:
          'Modèles denses, hybrides (attention mêlée de récurrence) et mixture-of-experts (MoE).',
      },
      {
        term: 'Cache KV',
        detail:
          'Quantifié : affine 4 ou 8 bits, ou compressé AURA. Chaque cache est un anneau au plafond de contexte.',
      },
      {
        term: 'API de serving',
        detail:
          'Chat Completions et Completions d’OpenAI, Anthropic Messages, routes de tokenisation et de comptage de tokens, santé, readiness et métriques Prometheus. Lancée avec butter serve, avec --parallel pour les sessions concurrentes.',
        chips: [
          { label: 'Streaming' },
          { label: 'Appel d’outils' },
          { label: 'Champs de raisonnement' },
          { label: 'Réutilisation du préfixe' },
          { label: 'Entrée vision' },
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
          { label: 'DeepSeek', text: 'V4' },
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
      'Metal est la cible principale. CUDA est secondaire, et AMD via ROCm et Vulkan avance vite.',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Swift sur Metal pour le silicium Apple, macOS 14 ou plus récent : MacBook, Mac mini et Mac Studio.',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'Rust sur CUDA. En production sur RTX et DGX Spark.',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: 'AMD via ROCm et Vulkan, qui avance vite.',
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
      question: 'Butter est-il open source ?',
      answer:
        'Pas aujourd’hui. Butter est privé et à code fermé pendant l’accès anticipé. Demandez l’accès et nous vous écrirons quand il y aura plus à partager.',
    },
    {
      question: 'Sur quel matériel cela tourne-t-il ?',
      answer:
        'Swift sur Metal pour le silicium Apple est la cible principale, du MacBook au Mac Studio sous macOS 14 ou plus récent. CUDA est secondaire, en production sur RTX et DGX Spark. AMD via ROCm et Vulkan avance vite.',
    },
    {
      question: 'Quels modèles fait-il tourner ?',
      answer:
        'La couverture actuelle comprend Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite et Phi, entre autres listés plus haut, en variantes texte, vision, voix et omni.',
    },
    {
      question: 'Ai-je besoin de Python ?',
      answer:
        'Non. Butter, c’est du Swift sur Metal pour le silicium Apple et du Rust pour CUDA et le reste, sans Python nulle part dans le chemin de serving.',
    },
    {
      question:
        'Mes outils et harnais d’agents actuels fonctionneront-ils avec Butter ?',
      answer:
        'Butter sert l’API Chat Completions d’OpenAI et l’API Messages d’Anthropic depuis un seul processus butter serve, avec streaming, appels d’outils structurés, champs de raisonnement et préfixe de prompt réutilisé. Les clients qui parlent l’une ou l’autre API peuvent le viser.',
    },
    {
      question: 'À quelle vitesse tourne-t-il ?',
      answer:
        'Sur un M5 Max avec 128 Go, Butter a servi Qwen3.8-27B en 4 bits à 75,4 tokens par seconde pour une seule requête (prompt de 2 052 tokens, glouton) et 157,3 tokens par seconde au total sur 16 requêtes simultanées, soit environ 12,9 par requête. Les résultats dépendent du modèle, de la longueur du prompt et du matériel ; la page d’accueil donne les conditions de test.',
    },
  ],
  cta: {
    title: 'Faites fondre la *latence*.',
    body: 'Butter est en accès anticipé et à code fermé pour l’instant. Demandez l’accès.',
    docsLabel: 'Lire la documentation',
  },
};

export default butterFr;
