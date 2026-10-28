import type { productsOverview } from './overview';

const productsOverviewEs: (typeof productsOverview)['en'] = {
  seo: {
    title: 'El stack de Waffuru: kernels, serving, control y memoria',
    description:
      'Iron compila los kernels. Butter ejecuta modelos sobre ellos. Syrup vigila las GPU. Whisk recuerda en qué estabas trabajando. Usa uno, o los cuatro.',
    keywords: [
      'stack de inferencia de IA',
      'de kernels de GPU a serving',
      'infraestructura de IA local',
    ],
  },
  hero: {
    label: 'Cuatro productos',
    title: 'El *stack* de Waffuru.',
    lede: 'Iron compila los kernels. Butter ejecuta modelos sobre ellos. Syrup vigila las GPU. Whisk recuerda en qué estabas trabajando. Los cuatro están hechos para funcionar en el hardware que ya tienes.',
  },
  layers: {
    heading: 'Cómo *encajan* las cuatro capas.',
    intro:
      'Numeradas desde el metal hacia arriba. Whisk va arriba, Iron junto al metal, y cada capa tiene su propia página.',
    metal: {
      label: 'El metal',
      backends: ['Apple · Metal', 'NVIDIA · CUDA', 'AMD ROCm · Vulkan'],
    },
    listLabel: 'Las cuatro capas del stack',
  },
  together: {
    heading: 'Usa uno, o *los cuatro*.',
    intro:
      'Empieza por la capa que resuelve el problema de hoy. Añade la siguiente cuando la necesites.',
    aloneLabel: 'Por separado',
    alone: {
      iron: 'Escribe un kernel de GPU una vez y ejecútalo en Metal, CUDA, ROCm y Vulkan.',
      butter:
        'Sirve modelos tras una API compatible con OpenAI, sin Python de por medio.',
      syrup:
        'Ve cada GPU y cada motor que corre en ella, sea cual sea el motor.',
      whisk:
        'Dale a tu IA una memoria local, con citas, de tus notas y tu código.',
    },
    allLabel: 'Juntos',
    all: 'Butter ejecuta modelos sobre los kernels que compila Iron, Syrup vigila las GPU y los motores que hay debajo, y Whisk recuerda en qué estabas trabajando. Cada capa que añades se apoya en las de abajo.',
  },
  audience: {
    heading: 'Para quién *es*.',
    intro: 'Elige la página que más se parezca a ti.',
    items: {
      smallBusiness:
        'Ejecuta IA privada en los Mac y las estaciones de trabajo que ya tienes.',
      enterprise:
        'Ejecuta inferencia bajo tu control, en tus instalaciones o en tu propia nube.',
      neoclouds: 'Ve cada GPU de tu flota y cada motor que corre en ella.',
      aiCompanies:
        'Escribe kernels una vez y sirve modelos en Metal, CUDA, ROCm y Vulkan.',
    },
  },
  cta: {
    title: 'Empieza por la *capa* que necesitas.',
    body: 'Todo el stack está en acceso anticipado y con código cerrado por ahora. Solicita acceso y dinos qué capa quieres primero.',
  },
};

export default productsOverviewEs;
