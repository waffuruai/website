import type { industriesOverview } from './overview';

const industriesOverviewEs: (typeof industriesOverview)['en'] = {
  seo: {
    title: 'Inferencia de IA por industria',
    description:
      'Waffuru para nubes de GPU, finanzas, ciencias de la vida, gobierno y defensa: un costo por cada carga de trabajo, en hardware que controlas. Acceso anticipado.',
    keywords: [
      'inferencia de IA por industria',
      'infraestructura de IA privada',
      'IA soberana',
      'costo de GPU por carga de trabajo',
    ],
  },
  hero: {
    label: 'Industrias',
    title: 'Un solo stack, a la medida de tus *reglas*.',
    lede: 'Cada sector ejecuta IA bajo sus propias restricciones: qué datos pueden moverse, quién aprueba el gasto, qué hardware está permitido. Waffuru es un solo stack, de los kernels a la memoria, que ejecuta modelos en hardware que tú controlas. Elige el tuyo.',
  },
  cards: {
    label: 'Por industria',
    title: 'Encuentra tu *sector*.',
    intro:
      'Cinco sectores, un solo stack. Cada página cubre la presión que enfrentas, las tareas y lo que funciona hoy.',
  },
  values: {
    label: 'Lo que vale en todas partes',
    title: 'Tres respuestas para cada *sector*.',
    intro:
      'Finanzas obtiene un costo por cada carga de trabajo. TI, menos piezas que operar y parchear. Seguridad, datos que se quedan en el hardware que tú eliges. Y el CEO, las tres cosas, sin reescribir nada.',
    items: [
      {
        tag: 'cost',
        title: 'La cifra que *importa*.',
        body: 'Los dólares por carga de trabajo son lo que pide finanzas, y casi nadie puede verlos. Syrup muestra cada GPU y cada motor que corre en ella, para que el gasto se vincule con el trabajo que hizo.',
        points: [
          'Ve qué GPU están ocupadas, ociosas o desajustadas',
          'Saca más del hardware propio o alquilado',
          'Los modelos cuantizados hacen caber más en la memoria disponible',
        ],
      },
      {
        tag: 'inference',
        title: 'Menos *piezas* móviles.',
        body: 'Butter sirve modelos con dependencias mínimas, usando Swift para macOS e iOS y Rust para todo lo demás, sobre kernels afinados para cada backend. Obtienes seguridad y el máximo rendimiento, sin concesiones. Menos que parchear, menos que se rompa y menos que explicar.',
        points: [
          'Metal primero, CUDA en afinación, ROCm y Vulkan próximamente',
          'Serving compatible con OpenAI, para que tus apps sigan funcionando',
          'Carga modelos de Hugging Face sin conversión',
        ],
      },
      {
        tag: 'control',
        title: 'Hardware que tú *eliges*.',
        body: 'Una sola definición de kernel de Iron se traduce a Metal, CUDA, HIP y Vulkan, y tus datos se quedan donde están a menos que elijas usar un proveedor de inferencia de IA alojado. Cambiar de proveedor es una decisión, no una reescritura.',
        points: [
          'En tus instalaciones, en tu propia nube o en una sola estación de trabajo',
          'Syrup funciona con vLLM, SGLang y llama.cpp',
          'Sin dependencia de un solo motor ni de un solo proveedor de GPU',
        ],
      },
    ],
  },
  cta: {
    title: 'Cuéntanos tus *restricciones*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos tu sector, tu hardware y lo que no puede salir del edificio, y te diremos con honestidad qué encaja hoy.',
  },
};

export default industriesOverviewEs;
