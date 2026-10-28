import type { waffle } from './waffle';

const waffleEs: (typeof waffle)['en'] = {
  layer: 'Agentes',
  tagline: 'El harness de agentes, con W, tu asistente, dentro.',
  summary:
    'Waffle es el harness donde se ejecutan tus agentes, con W, nuestro asistente, dentro. Usa primero modelos locales y recurre a la nube solo cuando una tarea necesita más. Próximamente.',
  seo: {
    title: 'Waffle: el harness de agentes, con W dentro',
    description:
      'Waffle es el harness de agentes de Waffuru, con W dentro: un asistente personal para el trabajo y la vida. Primero modelos locales, la nube solo cuando una tarea lo necesita. Próximamente.',
    keywords: [
      'harness de agentes',
      'asistente de IA',
      'asistente de IA privado',
      'agentes de IA locales',
    ],
  },
  hero: {
    title: 'Agentes que trabajan para *ti*.',
    lede: 'Waffle es el harness donde se ejecutan tus agentes, con W, nuestro asistente, dentro: una extensión de ti en la que puedes confiar, para el trabajo y la vida. Usa primero modelos locales y recurre a la nube solo cuando una tarea necesita más.',
    highlights: [
      { value: 'W', label: 'el asistente que lleva dentro' },
      {
        value: 'Primero local',
        label: 'la nube solo cuando una tarea la necesita',
      },
      { value: 'Pronto', label: 'construido sobre Butter, Iron y Whisk' },
    ],
  },
  story: {
    heading: 'Un asistente que es *tuyo*.',
    problem:
      'La mayoría de los asistentes viven en los servidores de otro, ven todo lo que compartes y cobran por cada token. Darle a uno tu correo, tu calendario y tus archivos es confiarle tu trabajo y tu vida a un desconocido.',
    outcome:
      'Waffle ejecuta tu asistente en hardware propio o alquilado. W obtiene su memoria y su contexto de Whisk y sus modelos de Butter, y tus datos se quedan contigo a menos que elijas usar un proveedor de inferencia de IA alojado.',
    outcomes: [
      'Delega el trabajo de cada día, del correo y el calendario a reservas, proyectos y documentos.',
      'Guarda lo que tu asistente aprende de ti en hardware que tú controlas.',
      'Gasta en el cómputo que eliges, no en cada token.',
    ],
  },
  capabilities: {
    heading: 'Para qué *sirve* Waffle.',
    intro:
      'Waffle llegará pronto. Esto es lo que se está construyendo para hacer.',
    items: [
      {
        title: 'Un harness para agentes',
        body: 'El lugar donde se ejecutan tus agentes: los modelos a los que llaman, la memoria de la que se nutren y las herramientas que usan, juntos.',
      },
      {
        title: 'W, el asistente',
        body: 'Un asistente personal para el trabajo y la vida, hecho para ser una extensión de ti en la que puedes confiar: útil, cercano y nunca intimidante.',
      },
      {
        title: 'Primero, modelos locales',
        body: 'W funciona con modelos locales a través de Butter e Iron, y recurre a la nube solo cuando una tarea necesita más.',
      },
      {
        title: 'Una memoria que sigue siendo tuya',
        body: 'El contexto y la memoria vienen de Whisk, en hardware que tú controlas.',
      },
    ],
  },
  specs: {
    heading: 'Detalles *técnicos*.',
    intro: 'Dónde encaja Waffle, para quienes lo van a leer.',
    rows: [
      { term: 'Asistente', detail: 'W.' },
      {
        term: 'Modelos',
        detail: 'Primero locales; la nube cuando una tarea necesita más.',
      },
      {
        term: 'Se ejecuta en',
        detail: 'Butter e Iron, en hardware propio o alquilado.',
      },
      { term: 'Memoria y contexto', detail: 'Whisk.' },
      { term: 'Disponibilidad', detail: 'Próximamente.' },
    ],
  },
  stack: {
    heading: 'La cima del *stack*.',
    intro:
      'Waffle se apoya en todo lo que tiene debajo: Whisk para la memoria y el contexto, Syrup para el control, Butter para ejecutar los modelos e Iron para los kernels.',
  },
  faq: [
    {
      question: '¿Cuándo puedo usar Waffle?',
      answer:
        'Llegará pronto. Solicita acceso anticipado y te escribiremos cuando esté listo para probar.',
    },
    {
      question: '¿Waffle es de código abierto?',
      answer:
        'Hoy no. Waffle llegará pronto y será de código cerrado durante el acceso anticipado.',
    },
    {
      question: '¿Qué es W?',
      answer:
        'W es el asistente que hay dentro de Waffle: un asistente personal para el trabajo y la vida, hecho para ser una extensión de ti en la que puedes confiar.',
    },
    {
      question: '¿Necesita la nube?',
      answer:
        'No. Waffle usa primero modelos locales y recurre a la nube solo cuando una tarea necesita más.',
    },
    {
      question: '¿Mis datos salen de mi hardware?',
      answer:
        'No, a menos que elijas usar un proveedor de inferencia de IA alojado.',
    },
  ],
  cta: {
    title: 'Conoce a *W* pronto.',
    body: 'Waffle llegará pronto. Solicita acceso anticipado y te escribiremos cuando esté listo para probar.',
  },
};

export default waffleEs;
