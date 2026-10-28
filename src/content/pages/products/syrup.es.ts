import type { syrup } from './syrup';

const syrupEs: (typeof syrup)['en'] = {
  layer: 'Plano de control',
  tagline: 'Ve cada GPU y cada motor que corre en ella.',
  summary:
    'Un plano de control para LLM en GPU, desde un equipo bajo el escritorio hasta un neocloud que alquila una flota. Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada. Funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI.',
  seo: {
    title: 'Syrup: un plano de control para LLM en GPU',
    description:
      'Ve cada GPU y cada motor de inferencia, desde un equipo bajo el escritorio hasta un neocloud. Telemetría firmada. Funciona con Butter, vLLM, SGLang y llama.cpp.',
    keywords: [
      'gestión de flotas de GPU',
      'plano de control para LLM',
      'observabilidad de GPU',
      'monitoreo de vLLM SGLang llama.cpp',
    ],
  },
  hero: {
    title: 'Ve cada GPU y cada *motor* que corre en ella.',
    lede: 'Syrup es un plano de control para LLM en GPU, desde un equipo bajo el escritorio hasta un neocloud que alquila una flota. Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada.',
    highlights: [
      {
        value: 'Un equipo',
        label: 'bajo el escritorio, hasta la flota de un neocloud',
      },
      {
        value: 'Firmada',
        label: 'telemetría de un pequeño sidecar en Rust en cada host',
      },
      {
        value: 'Sin ataduras',
        label:
          'Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI',
      },
    ],
  },
  story: {
    heading: 'Sabe qué corre en cada *GPU*.',
    problem:
      'Un equipo con GPU corre el motor que alguien haya arrancado en él: llama.cpp en una máquina, vLLM en la siguiente, SGLang en la nueva. Averiguar qué se está ejecutando, y dónde, significa entrar en cada host.',
    outcome:
      'Pon un pequeño sidecar en Rust en cada host. Reporta telemetría firmada, y Syrup te muestra cada GPU y cada motor que corre en ella, ya tengas una sola máquina o toda una flota.',
    outcomes: [
      'Vigila un equipo bajo tu escritorio, o una flota que alquilas, con la misma herramienta.',
      'Conserva los motores que ya usas. Syrup funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI.',
      'Confía en lo que ves: cada host reporta telemetría firmada.',
    ],
  },
  capabilities: {
    heading: 'Lo que *hace* Syrup.',
    intro:
      'Un plano de control que se sienta junto a tus motores en lugar de reemplazarlos.',
    items: [
      {
        title: 'Cada GPU',
        body: 'Ve cada GPU de cada host en un solo lugar.',
      },
      {
        title: 'Cada motor',
        body: 'Ve qué motor corre en ella: Butter, vLLM, SGLang, llama.cpp u otro servidor compatible con OpenAI.',
      },
      {
        title: 'Un pequeño sidecar en Rust',
        body: 'Cada host ejecuta un pequeño sidecar escrito en Rust, así que añadir una máquina es añadir el sidecar.',
      },
      {
        title: 'Telemetría firmada',
        body: 'Cada sidecar firma la telemetría que reporta.',
      },
      {
        title: 'De un equipo a una flota',
        body: 'Empieza con una sola máquina bajo el escritorio. La misma configuración llega hasta un neocloud que alquila una flota.',
      },
      {
        title: 'Sin ataduras',
        body: 'Syrup no necesita Butter. También funciona con vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI.',
      },
    ],
  },
  specs: {
    heading: 'Detalles *técnicos*.',
    intro: 'Los detalles, para quienes los van a leer.',
    rows: [
      { term: 'Función', detail: 'Un plano de control para LLM en GPU.' },
      {
        term: 'En cada host',
        detail: 'Un pequeño sidecar escrito en Rust.',
      },
      {
        term: 'Telemetría',
        detail: 'Firmada por el sidecar que la reporta.',
      },
      {
        term: 'Motores',
        chips: [
          { label: 'Butter' },
          { label: 'vLLM' },
          { label: 'SGLang' },
          { label: 'llama.cpp' },
          { label: 'Otros servidores compatibles con OpenAI' },
        ],
      },
      {
        term: 'Escala',
        detail: 'De un equipo bajo el escritorio a la flota de un neocloud.',
      },
      {
        term: 'Lock-in',
        detail: 'Ninguno. Syrup funciona con motores distintos de Butter.',
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
      'Syrup vigila las GPU, con Butter o sin él. Butter ejecuta modelos sobre los kernels que compila Iron, y Whisk recuerda en qué estabas trabajando.',
  },
  faq: [
    {
      question: '¿Syrup es de código abierto?',
      answer:
        'Hoy no. Syrup es privado y de código cerrado durante el acceso anticipado. Solicita acceso y te escribiremos cuando haya más que contar.',
    },
    {
      question: '¿Tengo que usar Butter?',
      answer:
        'No. Syrup funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI, así que conservas los motores que ya usas.',
    },
    {
      question: '¿Para quién es?',
      answer:
        'Para cualquiera que ejecute LLM en GPU y quiera verlos, desde un solo equipo bajo el escritorio hasta un neocloud que alquila una flota.',
    },
    {
      question: '¿Qué hace el sidecar?',
      answer:
        'Cada host ejecuta un pequeño sidecar escrito en Rust. Reporta telemetría firmada sobre las GPU del host y los motores que corren en ellas.',
    },
    {
      question: '¿Qué GPU admite?',
      answer:
        'Todavía no hemos publicado una matriz de hardware para Syrup. Cuéntanos qué usas y te diremos con franqueza si encaja.',
    },
  ],
  cta: {
    title: 'Mira tu *flota*.',
    body: 'Syrup está en acceso anticipado y con código cerrado por ahora. Solicita acceso o cuéntanos qué ejecutas.',
  },
};

export default syrupEs;
