import type { home } from './home';

const homeEs: (typeof home)['en'] = {
  seo: {
    keywords: [
      'IA privada',
      'IA local',
      'IA en el dispositivo',
      'IA en tu propio hardware',
      'inferencia de LLM local',
      'motor de inferencia',
      'kernels de GPU',
      'Apple silicon',
      'escáner de vulnerabilidades',
      'Pantry',
    ],
  },

  hero: {
    eyebrow: 'Tu hardware · tus datos · tu IA',
    title: 'Más inteligencia en el hardware que ya *tienes*.',
    lede: 'Waffuru construye el stack de IA que funciona en el hardware que tienes o alquilas, desde un portátil hasta una flota de GPU en el centro de datos. Sacas más de cada GPU, gastas menos por token y tus datos se quedan contigo.',
    launch: {
      label: 'Nuevo',
      text: 'Pantry, nuestro escáner de vulnerabilidades gratuito para macOS y Linux',
    },
    secondary: { label: 'Ver cómo funciona', href: '#stack' },
  },

  pantry: {
    label: 'Gratis · Código abierto · Ya disponible',
    title: 'Descubre qué está *expuesto*. Parchéalo rápido.',
    body: 'Antes de que la IA funcione en tus equipos, tienen que ser seguros. Pantry contrasta todo lo instalado, y cada repositorio, con datos abiertos de vulnerabilidades, informa solo de lo que te afecta y corrige lo que puede sin riesgo.',
    points: [
      'Solo lo que afecta a tus versiones exactas',
      'Aplica por ti las correcciones seguras; muestra los pasos con sudo',
      'Sin telemetría, sin IA, escrito en Rust',
    ],
    primary: 'Protege tu sistema',
    secondary: 'Cómo funciona Pantry',
    caption: 'Salida de ejemplo de un equipo.',
  },

  stack: {
    title: 'Del silicio a la *respuesta*.',
    intro:
      'Seis productos que funcionan solos o juntos. Tu petición baja, la respuesta sube, y nada de eso tiene que salir del hardware que controlas.',
    note: 'Pantry ya es gratuito y de código abierto; el resto del stack está en acceso anticipado privado, y Waffle llegará pronto. Primero Metal, después CUDA; ROCm y Vulkan funcionan, pero aún sin afinar.',
    flow: {
      you: 'Tú, tu equipo, tus agentes',
      boundary: 'Hardware que tienes o alquilas',
      layers: [
        {
          role: 'Seguridad',
          name: 'Pantry',
          icon: 'pantry',
          line: 'Encuentra lo que está expuesto en cada equipo y lo parchea.',
        },
        {
          role: 'Agentes',
          name: 'Waffle',
          icon: 'waffle',
          line: 'El harness de agentes, con W, tu asistente, dentro.',
        },
        {
          role: 'Memoria',
          name: 'Whisk',
          icon: 'whisk',
          line: 'Mezcla los documentos y el contexto adecuados en cada petición.',
        },
        {
          role: 'Control',
          name: 'Syrup',
          icon: 'syrup',
          line: 'Monitoreo, telemetría, control de acceso y costos, para cada GPU.',
        },
        {
          role: 'Motor',
          name: 'Butter',
          icon: 'butter',
          line: 'Inferencia multimodal para texto, visión y audio, en streaming.',
        },
        {
          role: 'Kernels',
          name: 'Iron',
          icon: 'iron',
          line: 'Escribe una vez en Rust y obtén kernels optimizados en todas partes.',
        },
      ],
      hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
      outside: {
        title: 'La API de otros',
        note: 'No hace falta. Tus datos se quedan en tu hardware a menos que lo autorices.',
      },
      outcomes: [
        'Pensado para un menor costo por token',
        'Privado por defecto',
        'Parcheado y a la vista',
      ],
      caption:
        'Una petición tuya, de tu equipo o de tus agentes pasa por Pantry (seguridad), Waffle (agentes), Whisk (memoria), Syrup (control), Butter (el motor) e Iron (kernels) hasta el hardware que tienes o alquilas, y la respuesta vuelve por el mismo camino. Pensado para un menor costo por token, privado por defecto, parcheado y a la vista.',
    },
  },

  audiences: {
    title: 'Un lugar en la *mesa*.',
    intro: 'Seas quien seas, el mismo stack te sirve.',
    items: [
      {
        title: 'Para ti',
        body: 'Un asistente privado en tu propio portátil. Tus notas, tu código y tus preguntas se quedan en tu equipo.',
      },
      {
        title: 'Para empresas',
        body: 'Lleva la IA a tu propia infraestructura, en GPU propias o alquiladas. Mantén los datos sensibles donde deben estar y gasta menos por token.',
        href: '/solutions/enterprise',
      },
      {
        title: 'Para nubes de GPU',
        body: 'Sirve más con cada GPU que alquilas y ve toda la flota en un solo lugar.',
        href: '/solutions/neoclouds',
      },
      {
        title: 'Para quienes crean IA',
        body: 'Escribe un kernel una vez y llévalo a Metal, CUDA, ROCm y Vulkan.',
        href: '/solutions/ai-companies',
      },
    ],
    linkLabel: 'Ver cómo',
  },

  beliefs: {
    title: 'Por qué *cocinamos*.',
    intro: 'Tres convicciones detrás de todo lo que construimos.',
    items: [
      {
        title: 'Inteligencia para todos',
        body: 'El acceso a la IA no debería depender de dónde vives, cuánto ganas ni qué credenciales tienes.',
      },
      {
        title: 'Más de cada vatio',
        body: 'La demanda de inteligencia es ilimitada; la energía y los chips, no. La clave es sacar más trabajo útil de cada unidad de cómputo.',
      },
      {
        title: 'Suficientemente bueno, en tu propio hardware',
        body: 'En unos dos años, los modelos en las máquinas que la gente ya tiene serán lo bastante buenos para un trabajo con sentido. Construimos para ese momento.',
      },
    ],
    links: [
      { label: 'Lee el anuncio', href: '/blog/introducing-waffuru' },
      { label: 'En qué creemos', href: '/about#beliefs' },
    ],
  },

  team: {
    title: 'Quién está en la *cocina*.',
    intro:
      'Ciberseguridad, sector militar, consumo y empresa. Hemos creado y escalado startups, y hemos trabajado con todos, desde pequeños negocios hasta grandes empresas.',
    portraitAlt: 'Retrato de {name}',
    link: { label: 'Conoce al equipo', href: '/about/team' },
  },

  cta: {
    title: 'Siéntate a la mesa.',
    body: 'Prueba Pantry hoy, gratis. El resto del stack está en acceso anticipado: pide un sitio o deja tu correo y te escribiremos cuando haya novedades.',
  },
};

export default homeEs;
