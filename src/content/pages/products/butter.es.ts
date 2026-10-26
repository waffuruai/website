import type { butter } from './butter';

const butterEs: (typeof butter)['en'] = {
  layer: 'Serving',
  tagline: 'Servir modelos sin Python.',
  summary:
    'Swift sobre Metal para Apple silicon, Rust para CUDA y el resto. Carga checkpoints cuantizados de 2 a 8 bits, modelos híbridos y MoE, y los sirve con APIs compatibles con OpenAI y con Anthropic Messages.',
  seo: {
    title: 'Butter: inferencia de LLM sin Python',
    description:
      'Motor de inferencia de LLM: Swift sobre Metal en Apple silicon, Rust para CUDA. Sirve modelos de Hugging Face con APIs compatibles con OpenAI y con Anthropic Messages, pensado para harnesses de agentes.',
    keywords: [
      'motor de inferencia de LLM',
      'servidor de LLM local',
      'inferencia en Apple silicon',
      'servidor compatible con OpenAI',
      'servidor de API Anthropic Messages',
      'caché KV cuantizada',
      'GGUF MLX safetensors',
    ],
  },
  hero: {
    title: 'Servir modelos *sin* Python.',
    lede: 'Butter es un motor de inferencia escrito en Swift sobre Metal para Apple silicon y en Rust para CUDA y el resto. Sin Python, con kernels Metal precompilados, y los modelos se cargan directo desde Hugging Face.',
    highlights: [
      {
        value: '4',
        label: 'formatos de checkpoint, cargados sin conversión',
      },
      {
        value: '2–8 bit',
        label: 'checkpoints cuantizados, con caché KV cuantizada',
      },
      { value: '2 APIs', label: 'compatible con OpenAI y Anthropic Messages' },
    ],
  },
  story: {
    heading: 'Tus modelos. Tu hardware. *Sin* factura por token.',
    problem:
      'La mayoría de los equipos alquilan la IA por token. Cada prompt sale de la empresa, la factura crece con cada usuario y el hardware que ya pagaste queda sin uso. Ejecutar modelos en casa suele exigir un equipo especializado y semanas de configuración.',
    outcome:
      'Butter convierte un Mac o una estación con GPU que ya tienes en un servidor de IA privado. Elige un modelo, inicia Butter y las apps y agentes de tu equipo pueden usarlo el mismo día.',
    outcomes: [
      'Recorta la factura: modelos abiertos en hardware que ya pagaste, comprimidos para que una sola máquina atienda a más personas y conversaciones más largas. Sin precio por token.',
      'Los datos se quedan en casa: prompts, documentos y respuestas nunca salen de tus máquinas.',
      'Nada cambia aguas arriba: Butter habla las mismas API de OpenAI y Anthropic que ya usan tus herramientas, así que cambiar es cambiar una URL.',
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
        body: 'Ejecuta checkpoints cuantizados de 2 a 8 bits, checkpoints MXFP4 y NVFP4 con escalas por bloque, modelos híbridos y modelos de mezcla de expertos.',
      },
      {
        title: 'Una caché KV que cabe',
        body: 'La caché KV puede guardarse en 4 u 8 bits o comprimida con AURA. Toda caché es un anillo en el límite de contexto: una sesión larga desaloja sus tokens más antiguos con un aviso en lugar de fallar la solicitud.',
      },
      {
        title: 'Dos APIs, un servidor',
        body: 'butter serve habla la API Chat Completions de OpenAI y la API Messages de Anthropic, con streaming, llamadas a herramientas estructuradas, razonamiento en su propio campo y un prefijo de prompt reutilizado entre turnos.',
      },
      {
        title: 'Decodificación especulativa y LoRA',
        body: 'Decodificación especulativa para la generación, y LoRA para los adaptadores que entrenas tú.',
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
  extras: [
    {
      id: 'agents',
      heading: 'Funciona con tu harness de *agentes*.',
      intro:
        'Butter es el servidor. Tu harness conserva su bucle, sus herramientas, sus aprobaciones y su compactación.',
      items: [
        {
          title: 'Dos APIs, una sesión',
          body: 'Chat Completions y Completions de OpenAI, y la API Messages de Anthropic con bloques system, historial de tool_use y tool_result y bloques de thinking. Configura una URL base y listo.',
        },
        {
          title: 'Llamadas a herramientas estructuradas, en streaming',
          body: 'Las llamadas a herramientas vuelven como JSON con ids únicos entre turnos, transmitidas como deltas. Los tipos de los argumentos siguen tu esquema: un entero sigue siendo un entero.',
        },
        {
          title: 'Razonamiento visible u oculto',
          body: 'Pensamiento activado o desactivado por solicitud. Cuando está activado, el razonamiento llega en su propio campo o bloque de thinking y la respuesta queda limpia.',
        },
        {
          title:
            'Un prefijo de prompt que sobrevive a las rondas de herramientas',
          body: 'La segunda ronda no vuelve a procesar tu system prompt ni tu lista de herramientas. usage.cached_tokens y cache_read_input_tokens informan de lo que se reutilizó.',
        },
        {
          title: 'Cancelar es cancelar',
          body: 'Cierra la conexión y esa solicitud se detiene, en pleno prefill o en pleno decode. El trabajo pendiente no se ejecuta y las demás solicitudes continúan.',
        },
        {
          title: 'Un contexto que se degrada, no que falla',
          body: 'El presupuesto de contexto se informa en /v1/models. Pasado el límite, la caché desaloja los tokens más antiguos con un aviso en lugar de romper el bucle.',
        },
      ],
      note: 'Probado de extremo a extremo con Oh My Pi sobre Chat Completions y con un cliente tipo Claude Code sobre Messages, en Qwen 3.6, Qwen 3.8 y Flint.',
    },
    {
      id: 'quirks',
      heading:
        'Nos ocupamos de las *manías* del modelo para que tu agente no tenga que hacerlo.',
      intro:
        'Cada familia trae su propia plantilla, sus tokens y sus costumbres. Butter las absorbe en el servidor.',
      items: [
        {
          title: 'Plantillas de chat y tokens',
          body: 'La plantilla de Nanbeige conserva sus espacios en blanco, los tokens de control de los GGUF de Qwen se mantienen enteros y los dígitos se tokenizan en los límites del checkpoint, así que los prompts coinciden con el tokenizador oficial y las llamadas a herramientas se parsean. Gemma e InternLM se detienen al final del turno en lugar de divagar.',
        },
        {
          title: 'Control del razonamiento',
          body: 'Los bloques de pensamiento se separan de la respuesta y se conservan entre rondas de herramientas para que la caché de prefijo sobreviva. Al razonamiento de Flint se le puede asignar un presupuesto de tokens y un mensaje de transición.',
        },
        {
          title: 'Llamadas a herramientas',
          body: 'Las llamadas XML de Qwen se convierten en JSON tipado, en la respuesta y en el historial reproducido. Una respuesta sin herramientas anunciadas nunca se convierte en una llamada, y un tool_choice no soportado se rechaza de entrada en lugar de ignorarse en silencio.',
        },
        {
          title: 'Front-ends de audio',
          body: 'Los modelos de la familia Whisper reciben el banco de filtros mel Slaney con el que se entrenaron, la cabecera de idioma de Qwen3-ASR se elimina de las transcripciones y los checkpoints de Kokoro se enrutan a Kokoro y no a StyleTTS2.',
        },
        {
          title: 'Cargadores y memoria',
          body: 'Los GGUF con embeddings compartidos cargan sin cabeza de salida, los repositorios que solo traen SentencePiece tokenizan, el texto en streaming conserva sus espacios y una conversación de Qwen que supera su caché se recupera en lugar de ser rechazada.',
        },
      ],
    },
  ],
  specs: {
    heading: 'Detalles *técnicos*.',
    intro: 'Los detalles, para quienes los van a leer.',
    rows: [
      {
        term: 'Runtime',
        detail:
          'Swift sobre Metal para Apple silicon, macOS 14 o posterior. Rust para CUDA y el resto. Sin Python.',
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
        detail:
          'Checkpoints afines de 2, 3, 4, 5, 6 y 8 bits, con el ancho derivado por tensor. Checkpoints MXFP4 y NVFP4 con escalas por bloque. Block FP8 en CUDA.',
      },
      {
        term: 'Arquitecturas',
        detail:
          'Modelos densos, híbridos (atención mezclada con recurrencia) y de mezcla de expertos (MoE).',
      },
      {
        term: 'Caché KV',
        detail:
          'Cuantizada: afín de 4 u 8 bits, o comprimida con AURA. Toda caché es un anillo en el límite de contexto.',
      },
      {
        term: 'API de serving',
        detail:
          'Chat Completions y Completions de OpenAI, Anthropic Messages, rutas de tokenización y recuento de tokens, salud, readiness y métricas Prometheus. Se inicia con butter serve, con --parallel para sesiones concurrentes.',
        chips: [
          { label: 'Streaming' },
          { label: 'Llamada a herramientas' },
          { label: 'Campos de razonamiento' },
          { label: 'Reutilización de prefijo' },
          { label: 'Entrada de visión' },
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
        term: 'Disponibilidad',
        detail: 'Privado y de código cerrado durante el acceso anticipado.',
      },
    ],
  },
  platforms: {
    heading: 'Dónde *funciona*.',
    intro:
      'Metal es el objetivo principal. CUDA es secundario, y AMD a través de ROCm y Vulkan avanza rápido.',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Swift sobre Metal para Apple silicon, macOS 14 o posterior: MacBook, Mac mini y Mac Studio.',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'Rust sobre CUDA. En producción en RTX y DGX Spark.',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: 'AMD a través de ROCm y Vulkan, avanzando rápido.',
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
        'Swift sobre Metal para Apple silicon es el objetivo principal, desde un MacBook hasta un Mac Studio con macOS 14 o posterior. CUDA es secundario, en producción en RTX y DGX Spark. AMD a través de ROCm y Vulkan avanza rápido.',
    },
    {
      question: '¿Qué modelos ejecuta?',
      answer:
        'La cobertura actual incluye Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite y Phi, entre otros de los listados arriba, en variantes de texto, visión, voz y omni.',
    },
    {
      question: '¿Necesito Python?',
      answer:
        'No. Butter es Swift sobre Metal para Apple silicon y Rust para CUDA y el resto, sin Python en ningún punto de la ruta de serving.',
    },
    {
      question:
        '¿Funcionarán mis herramientas y harnesses de agentes actuales?',
      answer:
        'Butter sirve la API Chat Completions de OpenAI y la API Messages de Anthropic desde un solo proceso de butter serve, con streaming, llamadas a herramientas estructuradas, campos de razonamiento y un prefijo de prompt reutilizado. Los clientes que hablan cualquiera de las dos APIs pueden apuntar a él.',
    },
    {
      question: '¿Cuál es su velocidad?',
      answer:
        'En un M5 Max con 128 GB, Butter sirvió Qwen3.8-27B en 4 bits a 75,4 tokens por segundo para una sola solicitud (prompt de 2.052 tokens, greedy) y 157,3 tokens por segundo en total con 16 solicitudes concurrentes, unos 12,9 por solicitud. Los resultados dependen del modelo, la longitud del prompt y el hardware; la página de inicio detalla las condiciones de prueba.',
    },
  ],
  cta: {
    title: 'Derrite la *latencia*.',
    body: 'Butter está en acceso anticipado y con código cerrado por ahora. Solicita acceso.',
    docsLabel: 'Lee la documentación',
  },
};

export default butterEs;
