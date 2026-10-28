import type { solutionsOverview } from './overview';

const solutionsOverviewEs: (typeof solutionsOverview)['en'] = {
  seo: {
    title: 'Soluciones de inferencia de IA',
    description:
      'El stack de IA local de Waffuru para pequeñas empresas, empresas, neoclouds y compañías de IA: menor costo por carga de trabajo, mejor inferencia y más control.',
    keywords: ['soluciones de inferencia de IA', 'IA local'],
  },
  hero: {
    label: 'Soluciones',
    title: 'IA local-first, a la medida de tu *trabajo*.',
    lede: 'Waffuru es un solo stack, de los kernels a la memoria, que ejecuta modelos con rapidez en hardware propio o alquilado. Elige la página más cercana a lo que quieres lograr.',
  },
  cards: {
    label: 'Para quién es',
    title: 'Encuentra tu *lugar*.',
    intro:
      'Cuatro perfiles, un solo stack. Cada página cubre el problema, las tareas y lo que funciona hoy.',
  },
  values: {
    label: 'Lo que no cambia',
    title: 'Tres razones para *todos*.',
    intro: 'Cada perfil tiene su propio trabajo. Estas tres valen para todos.',
    items: [
      {
        tag: 'cost',
        title: 'Dólares por *carga de trabajo*.',
        body: 'Cuando el límite es la energía, los tokens por vatio y los dólares por carga de trabajo son las cifras que todavía se pueden mejorar. Waffuru está construido en torno a ambos.',
        points: [
          'Ejecuta en hardware propio o alquilado, con un menor costo por token',
          'Los modelos cuantizados hacen caber más en la memoria disponible',
          'Syrup muestra dónde hay capacidad ociosa',
        ],
      },
      {
        tag: 'inference',
        title: 'Mejor *inferencia*.',
        body: 'Kernels afinados para cada backend, modelos y caché KV cuantizados, y decodificación especulativa, en un motor con dependencias mínimas.',
        points: [
          'Metal primero, CUDA en afinación, ROCm y Vulkan próximamente',
          'Carga modelos de Hugging Face sin conversión',
          'Modelos de texto, visión, voz y omni',
        ],
      },
      {
        tag: 'control',
        title: 'Más *control*.',
        body: 'Local-first: tus datos se quedan donde están a menos que tú lo autorices, ya sea en una laptop, en tus instalaciones o en tu propia nube.',
        points: [
          'Serving compatible con OpenAI, para que tus apps sigan funcionando',
          'Syrup funciona con vLLM, SGLang y llama.cpp',
          'Sin dependencia de un solo motor ni de un solo proveedor',
        ],
      },
    ],
  },
  cta: {
    title: 'Siéntate a la *mesa*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué quieres ejecutar y te responderemos.',
  },
};

export default solutionsOverviewEs;
