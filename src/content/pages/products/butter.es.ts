import type { butter } from './butter';

const butterEs: (typeof butter)['en'] = {
  layer: 'Serving',
  tagline: 'Tus modelos, en tu propio hardware.',
  summary:
    'Swift sobre Metal para Apple silicon, Rust para CUDA y el resto. Carga checkpoints cuantizados de 2 a 8 bits, modelos híbridos y MoE, y los sirve con APIs compatibles con OpenAI y con Anthropic Messages.',
  seo: {
    title: 'Butter: ejecuta tus propios modelos y cámbialos en tu hardware',
    description:
      'Butter es un servidor de LLM privado para el hardware que ya tienes. Carga modelos abiertos directo desde Hugging Face, cambia el modelo servido a petición y habla las APIs compatibles con OpenAI y Anthropic Messages. Swift para macOS e iOS, Rust para todo lo demás.',
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
    title: 'Ejecuta los modelos que *elijas*.',
    lede: 'Butter convierte un Mac o una estación con GPU que ya tienes en un servidor de IA privado. Trae tus propios modelos, mantén cada prompt en casa y no pagues por token. Cambia de modelo cuando cambie el trabajo. Los modelos se cargan directo desde Hugging Face y tus herramientas se conectan con las APIs de OpenAI y Anthropic que ya usan.',
    highlights: [
      { value: '4', label: 'formatos de checkpoint, cargados sin conversión' },
      {
        value: 'Modelos abiertos',
        label: 'texto, visión, voz y omni',
      },
      {
        value: 'Cambia de modelo',
        label: 'a petición, y retoma la conversación',
      },
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
      'Desde cargar un checkpoint hasta transmitir tokens, con dependencias mínimas en todo el camino.',
    items: [
      {
        title: 'Carga los modelos tal cual',
        body: 'Descarga safetensors, MLX, JANG o GGUF directo desde Hugging Face. No hay paso de conversión.',
      },
      {
        title: 'Densos, híbridos y MoE',
        body: 'Ejecuta modelos densos, híbridos y de mezcla de expertos, desde checkpoints cuantizados de 2 a 8 bits hasta checkpoints MXFP4 y NVFP4 con escalas por bloque.',
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
      id: 'modalities',
      heading: 'Texto, visión y *audio*.',
      items: [
        {
          title: 'Texto',
          body: 'Modelos densos, híbridos y de mezcla de expertos. Llama, Gemma, Qwen, GPT-OSS y más.',
        },
        {
          title: 'Multimodal',
          body: 'Modelos de visión y lenguaje y modelos omni, entre ellos Gemma 4, Qwen3.8 VL y Mistral 3 VL.',
        },
        {
          title: 'Audio',
          body: 'Voz a texto con Whisper, Voxtral y Qwen3-ASR. Texto a voz con Kokoro, FishSpeech y Marvis.',
        },
      ],
    },
    {
      id: 'swap',
      heading: 'Cambia de modelo sin perder el *hilo*.',
      intro:
        'Un solo proceso de butter serve puede cambiar el modelo que sirve, solicitud a solicitud, para que cada tarea la atienda el modelo adecuado.',
      items: [
        {
          title: 'Cambio a petición',
          body: 'Inicia butter serve con --model-swap y una solicitud puede nombrar otro modelo. --model-swap-allow indica cuáles se permiten. Por defecto solo se permite el modelo con el que arrancó el servidor, así que nada cambia salvo que tú lo digas.',
        },
        {
          title: 'La conversación continúa',
          body: 'Una conversación puede pasar por un cambio de modelo y retomarse sin volver a leer su historial. En nuestras pruebas de aceptación no se repitió ningún prefill y las continuaciones coincidieron con las de una conversación sin interrupciones.',
        },
        {
          title: 'Los destinos defectuosos se rechazan o se revierten',
          body: 'Un destino mal formado revierte al modelo que tenías. Un archivo dañado se conserva tal cual, y un cambio que superaría una cuota se rechaza.',
        },
        {
          title: 'Los modelos recientes siguen en caliente',
          body: 'Un número limitado de modelos usados recientemente sigue en caliente en memoria, así que volver a uno es rápido. Un modelo que no está en caliente se carga desde el disco y tarda lo que tarda. No damos tiempos.',
        },
      ],
    },
    {
      id: 'tools',
      heading: 'Llamadas a herramientas que llegan *válidas*.',
      intro:
        'Para quien construye agentes: lo que devuelve una llamada a herramienta es algo que tu bucle puede ejecutar.',
      items: [
        {
          title: 'Los tipos siguen tu esquema',
          body: 'Los tipos de los argumentos siguen tu esquema, así que un entero sigue siendo un entero.',
        },
        {
          title: 'Las llamadas incompletas se rechazan',
          body: 'Una llamada incompleta, o a una herramienta que no anunciaste, se rechaza en lugar de emitirse.',
        },
        {
          title: 'Se comprueba antes de admitir',
          body: 'Los esquemas de herramientas se validan antes de admitir la solicitud, y un tool_choice no compatible se rechaza de entrada.',
        },
        {
          title: 'En streaming, con ids estables',
          body: 'Las llamadas llegan en streaming como deltas, con ids que se mantienen únicos entre turnos.',
        },
      ],
    },
    {
      id: 'validation',
      heading: 'Verificado con el harness de *InferenceX*.',
      intro:
        'InferenceX es el harness de benchmarks abierto de SemiAnalysis. Ejecutamos sus comprobaciones contra Butter en nuestro propio hardware, para que veas qué se sostiene antes de probarlo.',
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
          title: 'Pasan todas las comprobaciones de API',
          body: 'Todas las comprobaciones de API y de streaming que ejecutamos contra el harness pasan en las dos compilaciones de Butter: Swift para Apple silicon y Rust para NVIDIA, AMD y el resto.',
        },
        {
          title: 'Cerca del 97 % en GSM8K',
          body: 'En el conjunto completo de GSM8K, Qwen3.8-27B en un DGX Spark y Qwen3.8-Flash-Next en un Strix Halo obtuvieron cada uno cerca del 97 %, por encima del mínimo del 90 %. Cada respuesta se volvió a calificar de forma independiente.',
        },
        {
          title: 'Una ejecución de AgentX termina limpia',
          body: 'Una ejecución corta de AgentX terminó sin solicitudes fallidas y pasó el validador oficial. Es una prueba pequeña, no una repetición completa. Al ejecutarla también salieron errores reales, que corregimos.',
        },
      ],
      note: 'Son ejecuciones internas en nuestro propio hardware, y ni el DGX Spark ni el Strix Halo son objetivos oficiales de InferenceX. No son resultados oficiales de InferenceX y SemiAnalysis no los ha avalado. El rendimiento en hardware empresarial aún no está validado.',
    },
    {
      id: 'memory',
      heading: '*TurboQuant+* nativo, de su autor.',
      intro:
        'TurboQuant+ es nuestro trabajo de código abierto para reducir la caché de memoria de la IA. Butter lo ejecuta de forma nativa, escrito por la misma persona y adaptado a un servidor que además hace decodificación especulativa, reutilización de sesiones y bucles de herramientas. A la versión del motor la llamamos AURA.',
      links: [
        {
          label: 'TurboQuant+',
          href: 'https://github.com/TheTom/turboquant_plus',
        },
      ],
      items: [
        {
          title: 'Las filas recientes se mantienen exactas',
          body: 'Solo se comprime el historial más antiguo. Los retrocesos, los cortes por parada y la verificación especulativa nunca tocan datos con pérdida.',
        },
        {
          title: 'Parte de la caché, no un añadido',
          body: 'La compresión es un modo de la propia caché KV de Butter, así que la reutilización de sesiones, las instantáneas y las conversaciones largas de varios turnos siguen funcionando.',
        },
        {
          title: 'Elige el ancho',
          body: '8 bits por defecto para conservar la calidad, con 4 bits y anchos distintos para claves y valores disponibles.',
        },
      ],
      note: 'Por ahora es opcional. La compresión cambia un poco de calidad por memoria, y medimos ese intercambio.',
    },
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
      note: 'Probado y soportado con Oh My Pi sobre Chat Completions y con clientes tipo Claude Code sobre Messages, en Qwen 3.6, Qwen 3.8 y Flint.',
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
  platforms: {
    heading: 'Dónde *funciona*.',
    intro:
      'Metal es el objetivo principal. CUDA se está afinando ahora, y AMD a través de ROCm y Vulkan avanza rápido.',
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
      'Butter ejecuta modelos sobre los kernels que compila Iron. Syrup puede vigilarlo junto con vLLM, SGLang y llama.cpp, y Whisk hace que tu IA recuerde en qué estabas trabajando.',
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
        'Swift sobre Metal para Apple silicon es el objetivo principal, desde un MacBook hasta un Mac Studio con macOS 14 o posterior. CUDA está en producción en RTX y DGX Spark y se está afinando. AMD a través de ROCm y Vulkan avanza rápido.',
    },
    {
      question: '¿Qué modelos ejecuta?',
      answer:
        'Muchas familias abiertas, en variantes de texto, visión, voz y omni. El menú de modelos, cerca del inicio de esta página, muestra cuáles son compatibles hoy y cuáles llegan pronto.',
    },
    {
      question: '¿En qué está escrito Butter?',
      answer:
        'En Swift para macOS e iOS, y en Rust para todo lo demás, por seguridad de memoria. Butter mantiene sus dependencias al mínimo, lo que deja menos margen a un ataque a la cadena de suministro, y corre sobre kernels afinados para cada backend.',
    },
    {
      question:
        '¿Funcionarán mis herramientas y harnesses de agentes actuales?',
      answer:
        'Butter sirve la API Chat Completions de OpenAI y la API Messages de Anthropic desde un solo proceso de butter serve, con streaming, llamadas a herramientas estructuradas, campos de razonamiento y un prefijo de prompt reutilizado. Los clientes que hablan cualquiera de las dos APIs pueden apuntar a él.',
    },
    {
      question: '¿Puedo cambiar de modelo?',
      answer:
        'Sí. Inicia butter serve con --model-swap y una solicitud puede cambiar el modelo servido; --model-swap-allow indica qué modelos se permiten y, por defecto, solo se permite el de arranque. Una conversación puede pasar por un cambio y retomarse sin volver a leer su historial. Los destinos defectuosos se rechazan o se revierten de forma segura. Un número limitado de modelos usados recientemente sigue en caliente en memoria, así que volver a uno es rápido. Un modelo que no está en caliente se carga desde el disco y tarda lo que tarda. No damos tiempos.',
    },
  ],
  cta: {
    title: 'Trae tus *modelos*.',
    body: 'Butter está en acceso anticipado y con código cerrado por ahora. Solicita acceso.',
    docsLabel: 'Lee la documentación',
  },
};

export default butterEs;
