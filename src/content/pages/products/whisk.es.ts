import type { whisk } from './whisk';

const whiskEs: (typeof whisk)['en'] = {
  layer: 'Memoria',
  tagline: 'Memoria para tu IA, guardada en tu equipo.',
  summary:
    'Whisk indexa los archivos que ya tienes, desde notas y código hasta hojas de cálculo, PDF y grabaciones, y entrega a tu IA los pasajes que importan con una cita del original. El recuerdo de las propias sesiones de tu asistente, por día, semana y mes, está en desarrollo.',
  seo: {
    title: 'Whisk: memoria y recuperación local para tu IA',
    description:
      'Whisk busca en tus notas, código, documentos, hojas de cálculo, PDF y archivos multimedia en tu propio equipo y devuelve pasajes citados a través de MCP. El recuerdo de sesiones entre días y asistentes está en desarrollo.',
    keywords: [
      'RAG local',
      'memoria para IA',
      'recuperación por MCP',
      'búsqueda semántica privada',
      'búsqueda de documentos para IA',
    ],
  },
  hero: {
    title: 'Tu IA olvida. Tus *archivos* no.',
    lede: 'Whisk indexa lo que hay en tu ordenador y da a tu IA los pasajes relevantes cuando los necesita, cada uno con una cita del archivo, la página, la diapositiva o el rango de celdas de donde viene. No se sube nada; la recuperación se ejecuta en tu equipo.',
    highlights: [
      { value: 'Local', label: 'indexación y búsqueda en tu propio equipo' },
      {
        value: 'Con citas',
        label:
          'cada pasaje nombra su archivo, página, diapositiva o rango de celdas',
      },
      { value: 'MCP', label: 'y un hook que busca antes de enviar el prompt' },
    ],
  },
  story: {
    heading: 'Deja de explicarte *otra vez*.',
    problem:
      'Cada chat nuevo empieza de cero. Pegas la misma cita, la misma hoja de cálculo, la misma mitad de un PDF, y cuando llega la respuesta no sabes cuál de ellos usó. El trabajo que hiciste ayer con el asistente ya no está en su vista por la mañana.',
    outcome:
      'Whisk indexa tus notas, código, documentos y archivos multimedia en tu propio equipo y vigila sus cambios. Tu IA consulta a Whisk, o Whisk responde antes de enviar el prompt, y cada pasaje llega con una cita que puedes abrir. El recuerdo de las propias sesiones del asistente, para retomar donde lo dejó, está en desarrollo.',
    outcomes: [
      'Todo en casa: los archivos, el índice y la búsqueda se quedan en tu equipo, y la recuperación no necesita una clave de IA alojada.',
      'Comprueba cualquier respuesta: los resultados citan el archivo y la página, diapositiva, rango de hoja o rango de tiempo de donde vienen.',
      'Busca como piensas: por las palabras exactas que usaste o por lo que quisiste decir, en todas las carpetas que registraste.',
    ],
  },
  capabilities: {
    heading: 'Lo que *hace* Whisk.',
    intro:
      'Una capa de memoria que ejecutas tú, para los archivos que ya tienes.',
    items: [
      {
        title: 'Lee tus documentos tal cual',
        body: 'Archivos de Word, PowerPoint y Excel, PDF con capa de texto o escaneados, imágenes, audio y vídeo. Las fórmulas de las hojas de cálculo se conservan como texto y nunca se evalúan.',
      },
      {
        title: 'Cita el original',
        body: 'Un resultado de un PDF nombra la página, de una presentación la diapositiva, de un libro de cálculo la hoja y el rango de celdas, de una grabación los segundos. Las carpetas movidas se siguen resolviendo.',
      },
      {
        title: 'Busca por palabras y por significado',
        body: 'Búsqueda por palabras clave con derivación, búsqueda densa sobre embeddings y coincidencia por nombre de archivo para documentos cuyo tema solo está en el título. Los resultados se fusionan en una sola lista ordenada.',
      },
      {
        title: 'Pone primero la versión actual',
        body: 'Cuando una carpeta contiene varias versiones de un documento, la más reciente va primero y las anteriores se marcan como sustituidas, nunca se descartan.',
      },
      {
        title: 'Responde preguntas que abarcan varias fuentes',
        body: 'Pregunta qué decidió cada departamento y recibe una tarjeta por fuente con su mejor pasaje, más una lista de las fuentes donde se buscó y no había nada.',
      },
      {
        title: 'Funciona sin que se lo pidas',
        body: 'Un hook de Claude Code busca antes de cada prompt elegible e inyecta solo los pasajes que superan un umbral de confianza. Una búsqueda rechazada no añade nada.',
      },
    ],
  },
  code: {
    heading: 'Indexa una carpeta y luego *pregunta*.',
    intro:
      'Apunta Whisk a una carpeta. Cualquier cliente MCP puede buscar en ella, y el hook de Claude Code puede buscar por ti.',
    caption:
      'Ilustrativo. Sustituye los marcadores por tu carpeta y el nombre de tu proyecto. Las opciones y los valores por defecto están en la documentación.',
  },
  extras: [
    {
      id: 'privacy',
      heading: 'Privado *por construcción*.',
      intro:
        'Whisk se ejecuta en tu equipo. Estos son los controles que lo mantienen ahí.',
      items: [
        {
          title: 'Solo loopback',
          body: 'El puerto MCP acepta conexiones de este equipo. Enlazarlo a una dirección de red se rechaza salvo que lo permitas de forma explícita, y el registro indica que el puerto no está autenticado.',
        },
        {
          title: 'Proyectos restringidos',
          body: 'Marca una carpeta como restringida y se queda fuera de toda búsqueda automática. Solo se busca en ella cuando se nombra.',
        },
        {
          title: 'Registros con datos ocultos',
          body: 'El texto de las consultas y los directorios de trabajo pueden ocultarse en los registros operativos, y el registro de repeticiones puede desactivarse.',
        },
        {
          title: 'Higiene contra inyecciones',
          body: 'El texto que el hook coloca en un prompt se sanea: se eliminan o neutralizan el Unicode oculto, los marcadores de rol falsos, los enlaces descargables y los bloques largos codificados.',
        },
      ],
      note: 'Hoy el puerto local no tiene autenticación por usuario. Mantén el daemon en loopback y trata el índice con el mismo cuidado que los archivos con los que se construyó.',
    },
    {
      id: 'continuity',
      heading: 'Recordar *el trabajo en sí*.',
      intro:
        'En desarrollo: Whisk está aprendiendo a recordar lo que hicisteis tú y tu asistente, para que una sesión nueva pueda empezar donde terminó la anterior. Nada de esto está en la versión actual.',
      items: [
        {
          title: '¿Qué hice ayer?',
          body: 'Recuerdo por día, semana o mes, agrupado por proyecto, con el punto donde terminó cada sesión. Los días naturales siguen tu zona horaria, incluidos los días largos y cortos del cambio de hora.',
        },
        {
          title: 'Entre asistentes y equipos',
          body: 'Importa transcripciones de Claude Code, Codex y Grok y conserva de qué equipo viene cada una. Una sesión copiada o bifurcada se enlaza con su origen y no se cuenta dos veces.',
        },
        {
          title: 'Lo dicho frente a lo hecho',
          body: 'Un pull request cuenta como creado solo cuando el recibo del comando lo dice. Un «hecho» del asistente sin recibo sigue siendo una afirmación.',
        },
        {
          title: 'Citas hasta el byte',
          body: 'Cada línea de un resumen se expande al registro exacto de la transcripción de donde salió, incluso después de archivar la sesión.',
        },
        {
          title: 'Las correcciones ganan',
          body: 'Cuando un resumen se recorta para caber, tu última corrección conserva su lugar por delante del resumen anterior del asistente.',
        },
        {
          title: 'Un olvido que se mantiene',
          body: 'Borra una sesión y no se puede volver a importar. La purga elimina el contenido, sus resúmenes y sus copias de archivo.',
        },
      ],
      note: 'Inicial. La captura en vivo es opcional por cliente, las importaciones son explícitas y el recuerdo cubre solo las sesiones capturadas; nunca pretende conocer todo tu día. Aún no está en ninguna versión.',
    },
  ],
  specs: {
    heading: 'Detalles *técnicos*.',
    rows: [
      {
        term: 'Indexa',
        chips: [
          { label: 'Markdown' },
          { label: 'Código' },
          { label: 'DOCX' },
          { label: 'PPTX' },
          { label: 'XLSX' },
          { label: 'PDF' },
          { label: 'Imágenes' },
          { label: 'Audio' },
          { label: 'Vídeo' },
          { label: 'Sesiones del asistente', inProgress: true },
        ],
      },
      {
        term: 'Dónde se ejecuta',
        detail:
          'En local, en tu equipo. Python 3.11 o posterior. Embeddings nativos de EmbeddingGemma 2 a través de Butter en Apple silicon; un embebedor portátil de CPU en el resto.',
      },
      {
        term: 'Búsqueda',
        detail:
          'Palabras clave (FTS5, con derivación) más búsqueda vectorial densa con fusión de rangos. Coincidencia por nombre de archivo. Preferencia de versión dentro de una carpeta. Agrupación entre fuentes.',
      },
      {
        term: 'Citas',
        detail:
          'Ruta del archivo más página, diapositiva, hoja y rango de celdas, o segundos de inicio y fin.',
        chips: [{ label: 'Citas de sesión hasta el byte', inProgress: true }],
      },
      {
        term: 'Interfaces',
        detail:
          'MCP por stdio o HTTP en loopback. Hook UserPromptSubmit de Claude Code. Hook de DeepSeek Harness.',
      },
      {
        term: 'Embeddings',
        detail:
          'Se guardan en float32 por defecto. Compresión opcional sin pérdida o derivada de AURA para los vectores fríos de una caché nueva.',
      },
      {
        term: 'Controles de privacidad',
        detail:
          'Enlace solo a loopback, proyectos restringidos, ocultación de consultas y rutas, saneador de prompts.',
      },
      {
        term: 'Disponibilidad',
        detail: 'Privado y de código cerrado durante el acceso anticipado.',
      },
    ],
  },
  stack: {
    heading: 'Funciona con el resto del *stack*.',
    intro:
      'Whisk funciona por sí solo con cualquier cliente MCP. Butter aporta embeddings nativos en Apple silicon, Syrup vigila las máquinas e Iron compila los kernels de debajo.',
  },
  faq: [
    {
      question: '¿Whisk es de código abierto?',
      answer:
        'Hoy no. Whisk es privado y de código cerrado durante el acceso anticipado. Solicita acceso y te escribiremos cuando haya más que contar.',
    },
    {
      question: '¿Mis datos salen de mi equipo?',
      answer:
        'No. La indexación y la búsqueda se ejecutan en local y no necesitan una clave de IA alojada. El único evento de red es la primera descarga del modelo de embeddings. Si conectas tu asistente a un proveedor de IA alojado, ese proveedor ve lo que el asistente le envía; Whisk no cambia eso.',
    },
    {
      question: '¿Qué indexa?',
      answer:
        'Notas, código, archivos de Word, PowerPoint y Excel, PDF incluidos los escaneados, imágenes, audio y vídeo. El audio se indexa por significado, no se transcribe; las páginas escaneadas tienen OCR opcional en macOS.',
    },
    {
      question: '¿Recordará lo que hizo mi asistente ayer?',
      answer:
        'No en la versión actual. El recuerdo de sesiones entre días, asistentes y equipos está en desarrollo, con citas al registro exacto de la transcripción. Te escribiremos cuando salga.',
    },
    {
      question: '¿Qué es AURA?',
      answer:
        'Nuestro algoritmo de compresión para la caché KV, los embeddings y los pesos de los modelos. En Whisk es una opción para los vectores fríos de un índice nuevo; por defecto los embeddings se guardan sin comprimir. Se inspiró en TurboQuant+, las mejoras de Tom Turney a [TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/) de Google, y lo llevamos aún más lejos con algunas técnicas novedosas propias. AURA nació de una colaboración entre Eric Kryski y Tom Turney.',
    },
    {
      question: '¿Qué puede usar Whisk?',
      answer:
        'Cualquier cosa que hable MCP. Claude Code también puede ejecutarlo como hook, de modo que los pasajes relevantes llegan antes de que el modelo vea tu prompt.',
    },
  ],
  cta: {
    title: 'Dale una *memoria* a tu IA.',
    body: 'Whisk está en acceso anticipado y con código cerrado por ahora. Solicita acceso, o cuéntanos qué archivos te gustaría que tu IA ya conociera.',
  },
};

export default whiskEs;
