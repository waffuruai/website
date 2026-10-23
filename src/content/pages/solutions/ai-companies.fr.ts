import type { aiCompanies } from './ai-companies';

const aiCompaniesFr: (typeof aiCompanies)['en'] = {
  seo: {
    title: 'Kernels GPU et serving LLM pour sociétés d’IA',
    description:
      'Écrivez un kernel une fois, livrez-le sur Metal, CUDA, ROCm et Vulkan. Servez des modèles sans Python, avec cache KV quantifié et décodage spéculatif.',
    keywords: [
      'optimisation de l’inférence',
      'portabilité des kernels GPU',
      'moteur de serving LLM',
      'réduire le coût d’inférence',
    ],
  },
  name: 'Entreprises de modèles et d’inférence',
  serviceType: 'Compilateur de kernels GPU et moteur de serving LLM',
  card: {
    title: 'Entreprises de modèles et d’*inférence*',
    summary:
      'Une définition de kernel pour chaque backend GPU, et un serving qui se passe de Python.',
  },
  hero: {
    title: 'Écrivez le kernel une fois. Livrez-le sur quatre *backends*.',
    lede: 'Iron compile une définition de kernel vers Metal, CUDA, ROCm et Vulkan. Butter sert des modèles par-dessus sans Python, et Syrup donne une mémoire à vos agents.',
  },
  problem: {
    title: 'Chaque backend est une *réécriture*.',
    statement:
      'Votre modèle n’est portable que dans la mesure où vos kernels le sont, et les kernels s’écrivent généralement une fois par fournisseur.',
    body: 'Prendre en charge le silicium Apple, NVIDIA, AMD et Vulkan implique souvent des bases de code séparées et des bugs séparés, avec Python sur le chemin critique de la stack de serving. Le coût d’inférence retombe directement sur votre marge, et les agents perdent leur contexte dès qu’une session se termine.',
  },
  useCases: {
    title: 'Ce que vous pouvez *livrer*.',
    intro:
      'Quatre missions pour l’équipe qui construit des modèles, des kernels ou du serving.',
    items: [
      {
        tag: 'inference',
        title: 'Écrivez un kernel une fois et exécutez-le sur quatre backends.',
        body: 'Iron est un DSL embarqué dans Rust. Les kernels sont compilés vers une IR partagée, puis vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V, derrière une ABI C et Rust versionnée que les hôtes existants peuvent appeler.',
      },
      {
        tag: 'inference',
        title: 'Servez sans Python ni JIT.',
        body: 'Butter, c’est du Swift sur Metal pour le silicium Apple et du Rust pour CUDA et le reste, avec une API compatible OpenAI, du streaming et de l’appel d’outils. Modèles hybrides et MoE, décodage spéculatif et LoRA sont fournis.',
      },
      {
        tag: 'cost',
        title: 'Dépensez moins de watts par token.',
        body: 'Des checkpoints quantifiés de 2 à 8 bits, un cache KV quantifié, du décodage spéculatif et des kernels par backend visent tous les tokens par watt et les dollars par charge de travail. Nous mesurons, et nous n’annoncerons pas un chiffre que nous ne savons pas reproduire.',
      },
      {
        tag: 'control',
        title: 'Donnez à vos agents une mémoire qui reste locale.',
        body: 'Syrup compresse les embeddings avec TurboQuant+ et exécute une recherche lexicale plus vectorielle sur la machine. Les résultats reviennent avec leurs citations via MCP, et les agents peuvent reprendre là où ils s’étaient arrêtés.',
      },
    ],
  },
  sample: {
    title: 'Voici à quoi ressemble un *kernel*.',
    intro:
      'Une fonction Rust avec quelques attributs. Iron la compile vers chaque backend.',
    filename: 'unary.rs',
    language: 'iron · rust dsl',
    code: [
      '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
      'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
      '    let idx = program_id(0);',
      '    store(out[idx], exp(load(a[idx])));',
      '}',
    ].join('\n'),
    emitsLabel: 'Génère',
    emits: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
  },
  stackFit: {
    title: 'Comment la stack *s’assemble*.',
    intro:
      'Iron et Butter forment le cœur. Syrup et Waffle complètent l’ensemble.',
    items: [
      {
        product: 'iron',
        need: 'Une définition de kernel, quatre backends.',
        body: 'Pressez les maths une fois. Iron les compile via une IR partagée vers Metal, CUDA, HIP/ROCm ou Vulkan SPIR-V, et une ABI C et Rust versionnée permet aux moteurs que vous avez déjà d’appeler le résultat.',
      },
      {
        product: 'butter',
        need: 'Servir des modèles sans Python.',
        body: 'Charge safetensors, MLX, JANG et GGUF sans conversion, plus des checkpoints quantifiés de 2 à 8 bits, des modèles hybrides et MoE, un cache KV quantifié, du décodage spéculatif et LoRA. Des modèles de texte, de vision, de reconnaissance vocale, de synthèse vocale et omni se trouvent derrière une API compatible OpenAI.',
      },
      {
        product: 'syrup',
        need: 'De la mémoire pour les agents.',
        body: 'Recherche locale sur les notes et le code : embeddings compressés avec TurboQuant+, recherche lexicale plus vectorielle et résultats cités via MCP.',
      },
      {
        product: 'waffle',
        need: 'Chaque moteur sur chaque GPU, en une seule vue.',
        body: 'Faites tourner Butter à côté de vLLM, SGLang ou llama.cpp et voyez-les côte à côte. Un petit sidecar Rust sur chaque hôte remonte une télémétrie signée.',
      },
    ],
  },
  whereWeAre: {
    title: 'Où nous *en sommes*.',
    lede: 'Metal est l’endroit où chaque kernel est écrit et optimisé en premier. Les produits sont en accès anticipé et à code fermé pour l’instant.',
    notes: [
      'Iron compte aujourd’hui environ 1 139 déclarations de kernels.',
      'HIP et Vulkan passent un corpus de tests de 4 164 cas sur 4 164, exacts au bit près, mais ne sont pas encore optimisés.',
      'CUDA est en production sur RTX et DGX Spark, avec les GPU de datacenter en cours.',
    ],
  },
  faq: [
    {
      question:
        'En quoi Iron diffère-t-il d’un code Metal et CUDA écrit à la main ?',
      answer:
        'Vous écrivez une seule définition de kernel dans un DSL embarqué dans Rust, et elle est compilée via une IR partagée vers Metal, CUDA (PTX), HIP/ROCm ou Vulkan SPIR-V. L’optimisation reste propre à chaque backend, et aujourd’hui Metal passe en premier.',
    },
    {
      question: 'Notre stack existante peut-elle appeler les kernels Iron ?',
      answer:
        'Oui. Une ABI C et Rust versionnée permet aux hôtes existants de les appeler : inutile d’adopter Butter pour utiliser Iron.',
    },
    {
      question: 'Butter est-il plus rapide que vLLM ou llama.cpp ?',
      answer:
        'Nous ne publions pas de comparaisons que nous ne pouvons pas reproduire, et nous ne prétendons pas que Butter fait mieux que d’autres moteurs sur CUDA ou ROCm. Les benchmarks priment sur les opinions : quand des chiffres seront publics, ils seront accompagnés de la méthode.',
    },
    {
      question: 'Quels modèles Butter fait-il tourner ?',
      answer:
        'Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite, Phi, LFM, OLMo, SmolLM, Falcon H1, Jamba et InternLM, ainsi que des variantes vision, voix et omni. DeepSeek V4 est en cours. Les modèles se chargent directement depuis Hugging Face, sans conversion.',
    },
    {
      question: 'Pouvons-nous obtenir un accès ?',
      answer:
        'L’accès anticipé est ouvert sur demande, et les produits sont à code fermé pour l’instant. Dites-nous quels backends et quels modèles comptent pour vous et nous vous répondrons.',
    },
  ],
  cta: {
    title: 'Pressez vos maths dans le *silicium*.',
    body: 'Accès anticipé, code fermé pour l’instant. Dites-nous ce que vous construisez, quels backends comptent et où Python vous gêne, et nous vous répondrons.',
  },
};

export default aiCompaniesFr;
