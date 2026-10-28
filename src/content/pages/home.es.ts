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
    title: 'Más inteligencia del hardware que ya *tienes*.',
    lede: 'Waffuru construye el stack que ejecuta IA en tus propias máquinas, desde un portátil hasta una flota de GPU. Sacas más del hardware que tienes, tus datos se quedan contigo y no hay una factura de la nube por cada prompt.',
    launch: {
      label: 'Nuevo',
      text: 'Pantry, nuestro escáner de vulnerabilidades gratuito para macOS y Linux',
    },
    secondary: { label: 'Ver cómo funciona', href: '#stack' },
  },

  pantry: {
    label: 'Gratis · Código abierto · Ya disponible',
    title: 'Descubre qué está *expuesto*. Parchéalo rápido.',
    body: 'Antes de que un asistente funcione en tu equipo, el equipo tiene que ser seguro. Pantry contrasta todo lo instalado, y cada repositorio, con datos abiertos de vulnerabilidades, informa solo de lo que te afecta y corrige lo que puede sin riesgo.',
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
      'Cuatro capas que funcionan solas o juntas. Tu petición baja, la respuesta sube, y nada de eso tiene que salir de tu hardware.',
    note: 'El stack es privado y está en acceso anticipado. Primero Metal, después CUDA; ROCm y Vulkan funcionan, pero aún sin afinar.',
    flow: {
      you: 'Tú, tus apps, tus agentes',
      boundary: 'Tu hardware · tu red',
      layers: [
        {
          role: 'Control',
          name: 'Syrup',
          line: 'Ve cada GPU y cada motor que corre en ella.',
        },
        {
          role: 'Memoria',
          name: 'Whisk',
          line: 'Contexto de tus propias notas y tu código, con citas.',
        },
        {
          role: 'Motor',
          name: 'Butter',
          line: 'Ejecuta el modelo, sin Python en la ruta de serving.',
        },
        {
          role: 'Kernels',
          name: 'Iron',
          line: 'Una definición de kernel, afinada para cada chip.',
        },
      ],
      hardware: ['Apple silicon', 'NVIDIA', 'AMD'],
      outside: {
        title: 'La nube de otros',
        note: 'No hace falta. Tus datos se quedan contigo a menos que lo autorices.',
      },
      outcomes: [
        'Privado por defecto',
        'Más del hardware que tienes',
        'Cada GPU a la vista',
      ],
      caption:
        'Tu petición pasa por el plano de control, la memoria, el motor y los kernels hasta tu propio hardware, y la respuesta vuelve por el mismo camino, todo dentro de tu hardware y tu red. El resultado: privado por defecto, más del hardware que tienes y cada GPU a la vista.',
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
        body: 'Lleva la IA a tu propia infraestructura. Mantén los datos sensibles donde deben estar y deja de pagar por prompt un trabajo que tu hardware puede hacer.',
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
      'Investigación, seguridad, ingresos y algunos fundadores que ya han llevado productos al mercado.',
    portraitAlt: 'Retrato de {name}',
    link: { label: 'Conoce al equipo', href: '/about/team' },
  },

  cta: {
    title: 'Siéntate a la mesa.',
    body: 'Prueba Pantry hoy, gratis. El resto del stack está en acceso anticipado: pide un sitio o deja tu correo y te escribiremos cuando haya novedades.',
  },
};

export default homeEs;
