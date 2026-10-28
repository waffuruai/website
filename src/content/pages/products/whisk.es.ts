import type { whisk } from './whisk';

const whiskEs: (typeof whisk)['en'] = {
  layer: 'Memoria',
  tagline: 'IA que recuerda en qué estabas trabajando.',
  summary:
    'Recuperación local sobre tus notas, código, documentos e imágenes. Los embeddings se comprimen con nuestro algoritmo propietario de compresión AURA, la búsqueda combina léxico y vectores, y los resultados llegan con citas a través de MCP.',
  seo: {
    title: 'Whisk: memoria y recuperación local para tu IA',
    description:
      'Whisk mezcla tus notas, código, documentos e imágenes en tus sesiones de IA. Búsqueda léxica y vectorial sobre embeddings comprimidos con AURA, con citas a través de MCP.',
    keywords: [
      'RAG local',
      'memoria para IA',
      'recuperación por MCP',
      'búsqueda semántica privada',
    ],
  },
  hero: {
    title: 'IA que *recuerda* en qué estabas trabajando.',
    lede: 'Whisk busca y mezcla las notas, el código, los documentos y las imágenes relevantes que tienes en tu equipo, y los incorpora de forma fluida a tus sesiones de IA.',
    highlights: [
      {
        value: 'Local',
        label: 'recuperación sobre tus notas, código, documentos e imágenes',
      },
      {
        value: 'Léxica + vectorial',
        label:
          'búsqueda, sobre embeddings comprimidos con nuestro algoritmo AURA',
      },
      { value: 'Con citas', label: 'resultados, entregados a través de MCP' },
    ],
  },
  story: {
    heading: 'Deja de explicarte *otra vez*.',
    problem:
      'Cada chat nuevo empieza de cero. Vuelves a pegar las mismas notas y los mismos archivos, y cuando llega una respuesta no sabes de cuál de ellos salió.',
    outcome:
      'Whisk indexa tus notas, código, documentos e imágenes en tu propio equipo. Tu IA se lo pide y recibe los pasajes que importan, cada uno con una cita a la fuente original que puedes comprobar.',
    outcomes: [
      'Mantén tus notas y tu código en tu propio equipo. La recuperación es local.',
      'Encuentra las cosas por las palabras exactas que usaste o por lo que significan: la búsqueda es léxica más vectorial.',
      'Comprueba cualquier respuesta contra su fuente, porque los resultados llegan con citas.',
    ],
  },
  capabilities: {
    heading: 'Lo que *hace* Whisk.',
    intro:
      'Una capa de memoria que ejecutas tú mismo, para el trabajo que ya tienes.',
    items: [
      {
        title: 'Recuperación local',
        body: 'Whisk busca en tus notas, código, documentos e imágenes en tu propio equipo, y tus datos se quedan ahí a menos que optes por usar un modelo alojado con un proveedor de inferencia.',
      },
      {
        title: 'Embeddings comprimidos',
        body: 'Los embeddings se comprimen con nuestro algoritmo propietario de compresión AURA, así que tus datos ocupan menos espacio.',
      },
      {
        title: 'Búsqueda léxica más vectorial',
        body: 'La coincidencia de palabras exactas y la búsqueda por significado trabajan juntas.',
      },
      {
        title: 'Citas a través de MCP',
        body: 'Los resultados llegan con citas a través de MCP, así que cualquier cliente MCP puede usarlos y mostrar de dónde salió cada uno.',
      },
    ],
  },
  specs: {
    heading: 'Detalles *técnicos*.',
    rows: [
      { term: 'Indexa', detail: 'Tus notas, código, documentos e imágenes.' },
      { term: 'Dónde se ejecuta', detail: 'En local, en tu equipo.' },
      {
        term: 'Embeddings',
        detail:
          'Comprimidos con AURA, nuestro algoritmo propietario de compresión.',
      },
      { term: 'Búsqueda', detail: 'Léxica más vectorial.' },
      { term: 'Resultados', detail: 'Se devuelven con citas.' },
      { term: 'Interfaz', detail: 'MCP.' },
      {
        term: 'Disponibilidad',
        detail: 'Privado y de código cerrado durante el acceso anticipado.',
      },
    ],
  },
  stack: {
    heading: 'Funciona con el resto del *stack*.',
    intro:
      'Whisk funciona por sí solo, con cualquier cliente MCP. Por debajo, Butter ejecuta modelos, Syrup vigila las GPU e Iron compila los kernels.',
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
        'La recuperación es local: Whisk indexa y busca en tu equipo. Nos atenemos a una regla sencilla: tus datos se quedan en tu equipo a menos que optes por usar un modelo alojado con un proveedor de inferencia.',
    },
    {
      question: '¿Qué indexa?',
      answer: 'Tus notas, código, documentos e imágenes.',
    },
    {
      question: '¿Qué es AURA?',
      answer:
        'Nuestro algoritmo propietario de compresión, para que tus datos ocupen menos espacio. Se inspiró en TurboQuant+, las mejoras de Tom Turney a [TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/) de Google, y lo llevamos aún más lejos con algunas técnicas novedosas propias. AURA nació de una colaboración entre Eric Kryski y Tom Turney.',
    },
    {
      question: '¿Qué puede usar Whisk?',
      answer:
        'Cualquier cosa que hable MCP puede pedirle resultados a Whisk, y cada resultado llega con una cita.',
    },
    {
      question: '¿Necesito el resto del stack?',
      answer:
        'No. Cada producto de Waffuru funciona por sí solo, y Whisk no es la excepción.',
    },
  ],
  cta: {
    title: 'Dale una *memoria* a tu IA.',
    body: 'Whisk está en acceso anticipado y con código cerrado por ahora. Solicita acceso o cuéntanos qué te gustaría que recordara.',
  },
};

export default whiskEs;
