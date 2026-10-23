import type { smallBusiness } from './small-business';

const smallBusinessEs: (typeof smallBusiness)['en'] = {
  seo: {
    title: 'IA privada para pequeñas empresas',
    description:
      'Ejecuta IA privada en un Mac Studio o una estación RTX que ya tienes. Tus datos se quedan en tu equipo y sin factura de nube por token. Acceso anticipado.',
    keywords: [
      'IA privada para pequeñas empresas',
      'IA local',
      'LLM en el dispositivo',
      'IA sin costos de nube',
    ],
  },
  name: 'Pequeñas empresas',
  serviceType: 'Software de inferencia de IA local y privada',
  card: {
    title: 'Pequeñas *empresas*',
    summary:
      'IA privada en un Mac Studio o en un equipo con RTX, sin factura de la nube.',
  },
  hero: {
    title: 'IA privada, sin la factura de la *nube*.',
    lede: 'Ejecuta modelos abiertos en un Mac Studio o en una estación de trabajo RTX que ya tienes. Tus archivos se quedan en tu equipo y nada se cobra por pregunta.',
  },
  problem: {
    title: 'Cada prompt tiene un *precio*.',
    statement:
      'La IA es más útil con tus propios archivos, y justo ahí empiezan las facturas y las dudas de privacidad.',
    body: 'El precio por token hace que cada experimento parezca caro, y enviar documentos de clientes, facturas o código fuente a los servidores de otra persona es una decisión que preferirías no tomar con cada prompt. Mientras tanto, el equipo que tienes en tu escritorio ya puede ejecutar modelos abiertos como Llama, Gemma, Qwen y GPT-OSS.',
  },
  useCases: {
    title: 'Pon la máquina a *trabajar*.',
    intro:
      'Cuatro tareas que un equipo pequeño puede confiar a una máquina que ya tiene.',
    items: [
      {
        tag: 'cost',
        title: 'Deja de pagar por pregunta.',
        body: 'Ejecuta modelos en un Mac Studio o en una estación de trabajo RTX que ya tienes, para que el gasto deje de crecer con cada prompt, documento y compañero. El uso intensivo pasa a ser una factura de electricidad, no una factura sorpresa.',
      },
      {
        tag: 'control',
        title: 'Trabaja con archivos de clientes sin enviarlos a ningún lado.',
        body: 'Los modelos, los prompts y los documentos se quedan en tu equipo a menos que tú lo autorices. Resume contratos, redacta respuestas y revisa facturas sin un tercero de por medio.',
      },
      {
        tag: 'inference',
        title: 'Haz caber un modelo más grande en la máquina que tienes.',
        body: 'Los checkpoints cuantizados de 2 a 8 bits y una caché KV cuantizada permiten que modelos más grandes y conversaciones más largas quepan en la memoria que ya tienes. Butter los carga directo desde Hugging Face, sin paso de conversión.',
      },
      {
        tag: 'control',
        title: 'Hazle preguntas a tus propias notas y a tu código.',
        body: 'Syrup ejecuta la recuperación en local sobre tus notas y tu código, así que cada respuesta llega con una cita de dónde salió. La búsqueda es léxica más vectorial, de modo que tanto los nombres exactos como las preguntas difusas dan en el blanco.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Butter hace el trabajo pesado. Syrup y Waffle están ahí cuando los quieras.',
    items: [
      {
        product: 'butter',
        need: 'Ejecuta modelos en la máquina que ya tienes.',
        body: 'Swift sobre Metal para Apple silicon, Rust para CUDA y el resto. Llama, Gemma, Qwen, GPT-OSS y más corren junto a modelos de voz a texto, texto a voz y visión, y butter serve da a tus apps un endpoint compatible con OpenAI.',
      },
      {
        product: 'syrup',
        need: 'Pregunta a tus propios archivos y obtén fuentes.',
        body: 'Recuperación local sobre tus notas y tu código. Los resultados llegan con citas a través de MCP, para que los asistentes puedan mostrar de dónde sacan lo que dicen.',
      },
      {
        product: 'waffle',
        need: 'Mantén un ojo en el equipo bajo tu escritorio.',
        body: 'De una máquina a un rack pequeño, ve cada GPU y cada motor que corre en ella, sea Butter, llama.cpp, vLLM o SGLang.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Waffuru está en acceso anticipado y los productos son de código cerrado por ahora. Esto es lo que significa para un equipo pequeño.',
    notes: [
      'Apple silicon es donde se afina primero cada kernel, así que un Mac Studio es el lugar más fluido para empezar.',
      'Las estaciones de trabajo NVIDIA RTX corren sobre CUDA, que está en producción. AMD y Vulkan funcionan, pero aún sin afinar.',
      'La cobertura de modelos es amplia y sigue creciendo, y DeepSeek V4 está en desarrollo.',
    ],
  },
  faq: [
    {
      question: '¿Qué hardware necesito?',
      answer:
        'Un Mac con Apple silicon es el punto de partida con mejor soporte, porque Metal es donde se afina primero cada kernel. Las estaciones de trabajo RTX corren sobre CUDA, y DGX Spark y Strix Halo también están en la lista. El tamaño del modelo que puedes ejecutar depende de cuánta memoria tengas.',
    },
    {
      question:
        '¿Serán los modelos locales tan buenos como los alojados más grandes?',
      answer:
        'No para todas las tareas, y no vamos a fingir lo contrario. Los modelos abiertos cubren buena parte del trabajo diario y, para las tareas más difíciles, un modelo alojado puede seguir siendo la mejor herramienta. Ejecutar en local significa que eliges según la tarea, en lugar de usar la nube por defecto.',
    },
    {
      question: '¿Mis datos salen de mi equipo?',
      answer:
        'No, salvo que tú lo autorices. Los modelos se ejecutan en local, y tus prompts, archivos y notas se quedan en tu equipo por defecto.',
    },
    {
      question: '¿Puedo seguir usando las apps que ya tengo?',
      answer:
        'Si hablan la API de OpenAI, normalmente sí. Butter sirve un endpoint compatible con OpenAI con streaming y llamada a herramientas, así que a muchas herramientas solo les hace falta una dirección nueva.',
    },
    {
      question: '¿Puedo probarlo hoy?',
      answer:
        'El acceso anticipado está abierto bajo solicitud, y los productos son de código cerrado por ahora. Cuéntanos qué quieres ejecutar y en qué hardware, y te responderemos.',
    },
  ],
  cta: {
    title: 'Ejecútalo en tu *propia* máquina.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué quieres ejecutar y en qué hardware, y te responderemos.',
  },
};

export default smallBusinessEs;
