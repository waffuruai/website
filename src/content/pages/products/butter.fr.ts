import type { butter } from './butter';

const butterFr: (typeof butter)['en'] = {
  layer: 'Serving',
  tagline: 'Vos modèles, sur votre propre matériel.',
  summary:
    'Swift sur Metal pour le silicium Apple, Rust pour CUDA et le reste. Charge des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et MoE, et les sert via des API compatibles OpenAI et Anthropic Messages.',
  seo: {
    title:
      'Butter : exécutez vos propres modèles, et changez-en, sur votre matériel',
    description:
      'Butter est un serveur LLM privé pour le matériel que vous possédez déjà. Il charge des modèles ouverts directement depuis Hugging Face, change de modèle servi à la demande et parle les API compatibles OpenAI et Anthropic Messages. Swift pour macOS et iOS, Rust pour tout le reste.',
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
    title: 'Exécutez les modèles que vous *choisissez*.',
    lede: 'Butter transforme un Mac ou une station GPU que vous possédez déjà en serveur d’IA privé. Apportez vos propres modèles, gardez chaque prompt chez vous et ne payez aucun token. Changez de modèle quand le travail change. Les modèles se chargent directement depuis Hugging Face, et vos outils se connectent avec les API OpenAI et Anthropic qu’ils utilisent déjà.',
    highlights: [
      { value: '4', label: 'formats de checkpoint, chargés sans conversion' },
      {
        value: 'Modèles ouverts',
        label: 'texte, vision, voix et omni',
      },
      {
        value: 'Changez de modèle',
        label: 'à la demande, et reprenez la conversation',
      },
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
      'Du chargement d’un checkpoint au streaming des tokens, avec un minimum de dépendances tout du long.',
    items: [
      {
        title: 'Charge les modèles tels quels',
        body: 'Récupérez safetensors, MLX, JANG ou GGUF directement depuis Hugging Face. Aucune étape de conversion.',
      },
      {
        title: 'Dense, hybride et MoE',
        body: 'Fait tourner des modèles denses, hybrides et MoE (mélange d’experts), des checkpoints quantifiés de 2 à 8 bits aux checkpoints MXFP4 et NVFP4 à échelles par bloc.',
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
      id: 'modalities',
      heading: 'Texte, vision et *audio*.',
      items: [
        {
          title: 'Texte',
          body: 'Modèles denses, hybrides et à mélange d’experts. Llama, Gemma, Qwen, GPT-OSS et d’autres.',
        },
        {
          title: 'Multimodal',
          body: 'Modèles vision-langage et omni, dont Gemma 4, Qwen3.8 VL et Mistral 3 VL.',
        },
        {
          title: 'Audio',
          body: 'Reconnaissance vocale avec Whisper, Voxtral et Qwen3-ASR. Synthèse vocale avec Kokoro, FishSpeech et Marvis.',
        },
      ],
    },
    {
      id: 'swap',
      heading: 'Changez de modèle sans perdre le *fil*.',
      intro:
        'Un seul processus butter serve peut changer le modèle qu’il sert, requête par requête, pour que le bon modèle traite chaque tâche.',
      items: [
        {
          title: 'Changement à la demande',
          body: 'Lancez butter serve avec --model-swap et une requête peut nommer un autre modèle. --model-swap-allow indique lesquels sont autorisés. Par défaut, seul le modèle de démarrage l’est, donc rien ne change sans que vous le décidiez.',
        },
        {
          title: 'La conversation continue',
          body: 'Une conversation peut traverser un changement de modèle et reprendre sans relire son historique. Dans nos essais d’acceptation, aucun prefill n’a été répété et les suites correspondaient à celles d’une conversation ininterrompue.',
        },
        {
          title: 'Les cibles défectueuses sont refusées ou annulées',
          body: 'Une cible mal formée revient au modèle précédent. Une archive corrompue est conservée telle quelle, et un changement qui dépasserait un quota est refusé.',
        },
        {
          title: 'Les modèles récents restent chauds',
          body: 'Un nombre limité de modèles utilisés récemment restent chauds en mémoire, donc revenir à l’un d’eux est rapide. Un modèle qui n’est pas chaud se charge depuis le disque et prend le temps qu’il prend. Nous n’annonçons aucune durée.',
        },
      ],
    },
    {
      id: 'tools',
      heading: 'Des appels d’outils qui reviennent *valides*.',
      intro:
        'Pour ceux qui construisent des agents : ce que renvoie un appel d’outil est quelque chose que votre boucle peut exécuter.',
      items: [
        {
          title: 'Les types suivent votre schéma',
          body: 'Les types des arguments suivent votre schéma : un entier reste un entier.',
        },
        {
          title: 'Les appels incomplets sont rejetés',
          body: 'Un appel incomplet, ou vers un outil que vous n’avez pas déclaré, est rejeté au lieu d’être émis.',
        },
        {
          title: 'Vérifié avant admission',
          body: 'Les schémas d’outils sont validés avant l’admission de la requête, et un tool_choice non pris en charge est refusé d’emblée.',
        },
        {
          title: 'En flux, avec des ids stables',
          body: 'Les appels arrivent en flux sous forme de deltas, avec des ids qui restent uniques d’un tour à l’autre.',
        },
      ],
    },
    {
      id: 'validation',
      heading: 'Vérifié avec le harnais *InferenceX*.',
      intro:
        'InferenceX est le harnais de benchmark ouvert de SemiAnalysis. Nous exécutons ses vérifications sur Butter, sur notre propre matériel, pour que vous voyiez ce qui tient avant de l’essayer.',
      links: [
        {
          label: 'InferenceX',
          href: 'https://github.com/SemiAnalysisAI/InferenceX',
        },
        {
          label: 'AgentX',
          href: 'https://inferencex.semianalysis.com/agentx/quickstart/',
        },
      ],
      items: [
        {
          title: 'Toutes les vérifications d’API passent',
          body: 'Toutes les vérifications d’API et de streaming que nous exécutons sur le harnais passent sur les deux builds de Butter : Swift pour le silicium Apple, et Rust pour NVIDIA, AMD et le reste.',
        },
        {
          title: 'Environ 97 % sur GSM8K',
          body: 'Sur l’ensemble complet de GSM8K, Qwen3.8-27B sur un DGX Spark et Qwen3.8-Flash-Next sur un Strix Halo ont chacun obtenu environ 97 %, au-dessus du plancher de 90 %. Chaque réponse a été renotée de façon indépendante.',
        },
        {
          title: 'Une exécution AgentX se termine proprement',
          body: 'Une courte exécution AgentX s’est terminée sans requête en échec et a passé le validateur officiel. C’est un petit essai, pas un rejeu complet. Elle a aussi fait apparaître de vrais bugs, que nous avons corrigés.',
        },
      ],
      note: 'Ce sont des exécutions internes sur notre propre matériel, et ni le DGX Spark ni le Strix Halo ne sont des cibles officielles d’InferenceX. Ce ne sont pas des résultats officiels d’InferenceX et SemiAnalysis ne les a pas approuvés. Les performances sur du matériel d’entreprise ne sont pas encore validées.',
    },
    {
      id: 'memory',
      heading: '*TurboQuant+* natif, par son auteur.',
      intro:
        'TurboQuant+ est notre travail open source pour réduire le cache mémoire de l’IA. Butter l’exécute nativement, écrit par la même personne et adapté à un serveur qui fait aussi du décodage spéculatif, de la réutilisation de sessions et des boucles d’outils. Nous appelons AURA la version du moteur.',
      links: [
        {
          label: 'TurboQuant+',
          href: 'https://github.com/TheTom/turboquant_plus',
        },
      ],
      items: [
        {
          title: 'Les lignes récentes restent exactes',
          body: 'Seul l’historique ancien est compressé. Les retours en arrière, les coupures d’arrêt et la vérification spéculative ne touchent jamais de données avec perte.',
        },
        {
          title: 'Une partie du cache, pas un ajout',
          body: 'La compression est un mode du cache KV propre à Butter, donc la réutilisation de sessions, les instantanés et les longues conversations multi-tours continuent de fonctionner.',
        },
        {
          title: 'Choisissez la largeur',
          body: '8 bits par défaut pour la qualité, avec le 4 bits et des largeurs distinctes pour les clés et les valeurs disponibles.',
        },
      ],
      note: 'Optionnel pour l’instant. La compression échange un peu de qualité contre de la mémoire, et nous mesurons cet échange.',
    },
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
      note: 'Testé et pris en charge avec Oh My Pi via Chat Completions et avec les clients de type Claude Code via Messages, sur Qwen 3.6, Qwen 3.8 et Flint.',
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
  platforms: {
    heading: 'Où ça *tourne*.',
    intro:
      'Metal est la cible principale. CUDA est en cours d’optimisation, et AMD via ROCm et Vulkan avance vite.',
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
      'Butter exécute les modèles sur les kernels qu’Iron compile. Syrup peut le surveiller aux côtés de vLLM, SGLang et llama.cpp, et Whisk donne à votre IA la mémoire de ce sur quoi vous travailliez.',
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
        'Swift sur Metal pour le silicium Apple est la cible principale, du MacBook au Mac Studio sous macOS 14 ou plus récent. CUDA est en production sur RTX et DGX Spark et en cours d’optimisation. AMD via ROCm et Vulkan avance vite.',
    },
    {
      question: 'Quels modèles fait-il tourner ?',
      answer:
        'De nombreuses familles ouvertes, en variantes texte, vision, voix et omni. Le menu des modèles, en haut de cette page, indique lesquelles sont prises en charge aujourd’hui et lesquelles arrivent bientôt.',
    },
    {
      question: 'En quoi Butter est-il écrit ?',
      answer:
        'En Swift pour macOS et iOS, et en Rust pour tout le reste, pour la sûreté mémoire. Butter réduit ses dépendances au minimum, ce qui laisse moins de prise à une attaque de la chaîne d’approvisionnement, et tourne sur des kernels optimisés pour chaque backend.',
    },
    {
      question:
        'Mes outils et harnais d’agents actuels fonctionneront-ils avec Butter ?',
      answer:
        'Butter sert l’API Chat Completions d’OpenAI et l’API Messages d’Anthropic depuis un seul processus butter serve, avec streaming, appels d’outils structurés, champs de raisonnement et préfixe de prompt réutilisé. Les clients qui parlent l’une ou l’autre API peuvent le viser.',
    },
    {
      question: 'Puis-je changer de modèle ?',
      answer:
        'Oui. Lancez butter serve avec --model-swap et une requête peut changer le modèle servi ; --model-swap-allow nomme les modèles autorisés et, par défaut, seul le modèle de démarrage l’est. Une conversation peut traverser un changement et reprendre sans relire son historique. Les cibles défectueuses sont refusées ou annulées sans risque. Un nombre limité de modèles utilisés récemment restent chauds en mémoire, donc revenir à l’un d’eux est rapide. Un modèle qui n’est pas chaud se charge depuis le disque et prend le temps qu’il prend. Nous n’annonçons aucune durée.',
    },
  ],
  cta: {
    title: 'Apportez vos *modèles*.',
    body: 'Butter est en accès anticipé et à code fermé pour l’instant. Demandez l’accès.',
    docsLabel: 'Lire la documentation',
  },
};

export default butterFr;
