import type { butter } from './butter';

const butterEs: (typeof butter)['en'] = {
  layer: 'Serving',
  tagline: 'Servir modelos sin Python.',
  summary:
    'Swift sobre Metal para Apple silicon, Rust para CUDA y el resto. Carga checkpoints cuantizados de 2 a 8 bits, modelos híbridos y MoE, con una caché KV cuantizada.',
  seo: {
    title: 'Butter: inferencia de LLM sin Python',
    description:
      'Motor de inferencia de LLM: Swift sobre Metal en Apple silicon, Rust para CUDA. Carga modelos de Hugging Face tal cual, con API compatible con OpenAI.',
    keywords: [
      'motor de inferencia de LLM',
      'servidor de LLM local',
      'inferencia en Apple silicon',
      'servidor compatible con OpenAI',
      'caché KV cuantizada',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: 'Servir modelos *sin* Python.',
    lede: 'Butter es un motor de inferencia escrito en Swift sobre Metal para Apple silicon y en Rust para CUDA y el resto. Sin Python, sin JIT, y los modelos se cargan directo desde Hugging Face.',
    highlights: [
      {
        value: '4',
        label: 'formatos de checkpoint, cargados sin conversión',
      },
      {
        value: '2–8 bit',
        label: 'checkpoints cuantizados, con una caché KV cuantizada',
      },
      { value: 'Sin Python', label: 'y sin JIT' },
    ],
  },
  story: {
    heading: 'Olvídate de Python y de la *conversión*.',
    problem:
      'Conseguir que un modelo responda suele significar un entorno de Python, un paso de conversión y un runtime que compila sobre la marcha. En una laptop o en un equipo con una sola GPU, es mucha maquinaria entre tú y una respuesta.',
    outcome:
      'Apunta Butter a un modelo de Hugging Face. Carga safetensors, MLX, JANG y GGUF tal cual, y butter serve te da un servidor compatible con OpenAI en el hardware que ya tienes.',
    outcomes: [
      'Ejecuta checkpoints cuantizados de 2 a 8 bits, modelos híbridos y modelos de mezcla de expertos en un Mac o en una estación de trabajo RTX.',
      'Apunta las herramientas que ya usas a un endpoint compatible con OpenAI, con streaming y llamada a herramientas.',
      'Mantén bajo el uso de memoria en contextos largos con una caché KV cuantizada.',
    ],
  },
  capabilities: {
    heading: 'Lo que *hace* Butter.',
    intro:
      'Desde cargar un checkpoint hasta transmitir tokens, sin Python en medio.',
    items: [
      {
        title: 'Carga los modelos tal cual',
        body: 'Descarga safetensors, MLX, JANG o GGUF directo desde Hugging Face. No hay paso de conversión.',
      },
      {
        title: 'Cuantizados, híbridos y MoE',
        body: 'Ejecuta checkpoints cuantizados de 2 a 8 bits, modelos híbridos y modelos de mezcla de expertos.',
      },
      {
        title: 'Una caché KV cuantizada',
        body: 'Guarda la caché KV cuantizada, para mantener bajo el uso de memoria a medida que crece el contexto.',
      },
      {
        title: 'Serving compatible con OpenAI',
        body: 'butter serve expone una API compatible con OpenAI, con streaming y llamada a herramientas.',
      },
      {
        title: 'Decodificación especulativa y LoRA',
        body: 'Decodificación especulativa para generar, y LoRA para los adaptadores que entrenas tú.',
      },
      {
        title: 'Más que texto',
        body: 'Modelos de texto, visión, voz a texto, texto a voz y omni.',
      },
    ],
  },
  code: {
    heading: 'Arranca un servidor y luego *pregúntale*.',
    intro:
      'Butter habla la API de OpenAI, así que los clientes que ya usas pueden apuntar a él.',
    caption:
      'Ilustrativo. Sustituye los marcadores por tu modelo y tu puerto. No es un benchmark.',
  },
  specs: {
    heading: 'Detalles *técnicos*.',
    intro: 'Los detalles, para quienes los van a leer.',
    rows: [
      {
        term: 'Runtime',
        detail:
          'Swift sobre Metal para Apple silicon. Rust para CUDA y el resto. Sin Python, sin JIT.',
      },
      {
        term: 'Formatos de modelo',
        detail: 'Se cargan directo desde Hugging Face, sin conversión.',
        chips: [
          { label: 'safetensors' },
          { label: 'MLX' },
          { label: 'JANG' },
          { label: 'GGUF' },
        ],
      },
      {
        term: 'Cuantización',
        detail: 'Checkpoints cuantizados de 2 a 8 bits.',
      },
      {
        term: 'Arquitecturas',
        detail: 'Modelos híbridos y de mezcla de expertos (MoE).',
      },
      { term: 'Caché KV', detail: 'Cuantizada.' },
      {
        term: 'API de serving',
        detail: 'Compatible con OpenAI, se inicia con butter serve.',
        chips: [
          { label: 'Streaming' },
          { label: 'Llamada a herramientas' },
          { label: 'Decodificación especulativa' },
          { label: 'LoRA' },
        ],
      },
      {
        term: 'Modalidades',
        chips: [
          { label: 'Texto' },
          { label: 'Visión' },
          { label: 'Voz a texto' },
          { label: 'Texto a voz' },
          { label: 'Omni' },
        ],
      },
      {
        term: 'Familias de modelos',
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
        term: 'Disponibilidad',
        detail: 'Privado y de código cerrado durante el acceso anticipado.',
      },
    ],
  },
  platforms: {
    heading: 'Dónde *funciona*.',
    intro:
      'Metal es el objetivo principal. CUDA es secundario, y ROCm y Vulkan funcionan, pero aún sin afinar.',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Swift sobre Metal para Apple silicon: MacBook y Mac Studio.',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'Rust sobre CUDA. En producción en RTX y DGX Spark; las GPU de centros de datos están en desarrollo.',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: 'Funciona hoy, aún sin afinar.',
      },
    ],
  },
  stack: {
    heading: 'Funciona con el resto del *stack*.',
    intro:
      'Butter ejecuta modelos sobre los kernels que compila Iron. Waffle puede vigilarlo junto con vLLM, SGLang y llama.cpp, y Syrup hace que tu IA recuerde en qué estabas trabajando.',
  },
  faq: [
    {
      question: '¿Butter es de código abierto?',
      answer:
        'Hoy no. Butter es privado y de código cerrado durante el acceso anticipado. Solicita acceso y te escribiremos cuando haya más que contar.',
    },
    {
      question: '¿En qué hardware funciona?',
      answer:
        'Swift sobre Metal para Apple silicon es el objetivo principal, desde un MacBook hasta un Mac Studio. CUDA es secundario, en producción en RTX y DGX Spark, con las GPU de centros de datos en desarrollo. ROCm y Vulkan funcionan hoy, pero aún sin afinar.',
    },
    {
      question: '¿Qué modelos ejecuta?',
      answer:
        'La cobertura actual incluye Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite y Phi, entre otros de los listados arriba, en variantes de texto, visión, voz y omni. DeepSeek V4 está en desarrollo.',
    },
    {
      question: '¿Necesito Python?',
      answer:
        'No. Butter es Swift sobre Metal para Apple silicon y Rust para CUDA y el resto, sin Python y sin JIT.',
    },
    {
      question: '¿Funcionarán mis herramientas actuales?',
      answer:
        'Butter sirve una API compatible con OpenAI con butter serve, incluidos streaming y llamada a herramientas, así que los clientes que hablan esa API pueden apuntar a él.',
    },
    {
      question: '¿Cuál es su velocidad?',
      answer:
        'No hemos publicado cifras de benchmarks, así que no daremos ninguna aquí. La decodificación especulativa y una caché KV cuantizada vienen integradas, y preferimos mostrarte una medición antes que hacer una afirmación.',
    },
  ],
  cta: {
    title: 'Derrite la *latencia*.',
    body: 'Butter está en acceso anticipado y con código cerrado por ahora. Solicita acceso y lee la documentación mientras esperas.',
    docsLabel: 'Lee la documentación',
  },
};

export default butterEs;
