import type { military } from './military';

const militaryEs: (typeof military)['en'] = {
  seo: {
    title: 'Inferencia de IA privada para defensa y uso militar',
    description:
      'Ejecuta modelos capaces en hardware propio y seguro, de Mac a estaciones RTX y DGX Spark, con un stack de serving pequeño sin Python. Acceso anticipado.',
    keywords: [
      'infraestructura de IA para defensa',
      'inferencia de IA militar',
      'LLM on-premise para defensa',
      'IA en hardware propio',
      'IA local',
    ],
  },
  name: 'Defensa',
  serviceType:
    'Software de inferencia de IA en instalaciones propias para defensa',
  card: {
    title: '*Defensa*',
    summary:
      'IA capaz en hardware que posees y aseguras, con una huella lo bastante pequeña como para rendir cuentas de ella.',
  },
  hero: {
    title: 'IA capaz en hardware *propio*.',
    lede: 'Ejecuta modelos en máquinas que compras, custodias y aseguras, de un Mac Studio a estaciones de trabajo RTX y DGX Spark. El stack de serving es pequeño, sin Python, así que hay menos que blindar y menos en qué confiar.',
  },
  problem: {
    title: 'Cada dependencia es una *puerta*.',
    statement:
      'Los datos de misión no pueden ir a la nube de otro, y el hardware que ejecuta un modelo tiene que ser hardware que posees, custodias y aseguras.',
    body: 'La mayoría de los stacks de serving de IA llegan como una larga cadena de paquetes de Python y el runtime de un proveedor, y cada uno es algo que verificar, parchear y rastrear. El hardware viene de quien tenga el contrato, y las máquinas que deberían ejecutar el modelo están repartidas de los escritorios a los racks, sin una sola vista de qué corre dónde.',
  },
  useCases: {
    title: 'Una *huella* más pequeña.',
    intro:
      'Cuatro tareas para el equipo que tiene que ejecutar IA de la que pueda rendir cuentas.',
    items: [
      {
        tag: 'control',
        title: 'Ejecuta modelos en hardware que posees y aseguras.',
        body: 'Butter sirve modelos en máquinas que custodias, de un Mac Studio a estaciones de trabajo RTX y DGX Spark. Los prompts, los documentos y los resultados se quedan en ese hardware a menos que tú lo autorices.',
      },
      {
        tag: 'inference',
        title: 'Acorta la cadena de dependencias.',
        body: 'Butter es Swift sobre Metal y Rust para CUDA, sin Python en la ruta de serving. Menos componentes significa menos que verificar, menos que parchear y menos que pueda fallar en el peor momento.',
      },
      {
        tag: 'control',
        title: 'Blinda las máquinas antes de que llegue el modelo.',
        body: 'Pantry, nuestro escáner gratuito y de código abierto, encuentra las vulnerabilidades que de verdad afectan a una máquina macOS o Linux y corrige lo que puede corregir con seguridad. Ejecútalo en cada máquina que vaya a alojar un modelo.',
        link: { label: 'Explorar Pantry', href: '/products/pantry' },
      },
      {
        tag: 'cost',
        title: 'Rinde cuentas de cada GPU que compraste.',
        body: 'Waffle muestra cada GPU y cada motor que corre en ella, ocupada u ociosa, entre los Mac, las estaciones de trabajo y los racks. La capacidad ociosa aparece antes que la próxima compra.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Butter ejecuta los modelos, Waffle rinde cuentas del hardware e Iron mantiene abierta la próxima plataforma.',
    items: [
      {
        product: 'butter',
        need: 'Un stack de serving con poco que verificar.',
        body: 'Serving compatible con OpenAI en Swift sobre Metal y Rust para CUDA, sin Python en la ruta de serving. Carga checkpoints safetensors, MLX, JANG y GGUF directamente, sin paso de conversión.',
      },
      {
        product: 'waffle',
        need: 'Cada GPU que posees, en una sola vista.',
        body: 'Cada GPU y cada motor que corre en ella, sea Butter, vLLM, SGLang o llama.cpp. Un pequeño sidecar en Rust en cada host reporta telemetría firmada.',
      },
      {
        product: 'iron',
        need: 'Hardware comercial hoy, otras plataformas después.',
        body: 'Una definición de kernel se traduce a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V tras una ABI versionada de C y Rust, así que un cambio de hardware no implica una nueva base de código.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Los productos están en acceso anticipado y son de código cerrado por ahora. No hacemos afirmaciones de cumplimiento normativo, certificación ni acreditación, y preferimos decirlo aquí antes que en una revisión.',
    notes: [
      'Apple silicon es donde se afina primero cada kernel. CUDA está en producción en RTX y DGX Spark, y las GPU de centros de datos están en desarrollo.',
      'ROCm y Vulkan funcionan, pero aún sin afinar.',
      'La mayor parte del stack funciona sin conexión una vez que los modelos están en tus máquinas. El soporte para entornos con aislamiento físico llegará pronto.',
      'Cuéntanos tus requisitos de seguridad y tu hardware, y te responderemos de forma concreta.',
    ],
  },
  faq: [
    {
      question: '¿Sale algo de nuestras máquinas?',
      answer:
        'Los datos de inferencia no salen por defecto: los modelos se ejecutan en hardware que tú operas, y los datos se quedan ahí a menos que tú lo autorices. Cada host de Waffle ejecuta un sidecar que reporta telemetría firmada, y te explicaremos con detalle qué contiene.',
    },
    {
      question: '¿En qué hardware funciona?',
      answer:
        'Hardware comercial que puedes comprar y custodiar. Apple silicon mediante Metal es el principal, y NVIDIA mediante CUDA está en producción en RTX y DGX Spark. Las GPU de centros de datos están en desarrollo, y AMD ROCm y Vulkan funcionan, pero aún sin afinar.',
    },
    {
      question: '¿Por qué importa que no haya Python en la ruta de serving?',
      answer:
        'Cada paquete de un stack de serving es algo que verificar, parchear y rastrear. Butter es Swift sobre Metal y Rust para CUDA, sin Python, así que la cadena entre un modelo y una respuesta es más corta.',
    },
    {
      question: '¿Funciona sin conexión?',
      answer:
        'En su mayor parte, sí, una vez que los modelos están en tus máquinas. El soporte completo para entornos con aislamiento físico llegará pronto. Cuéntanos cómo es tu entorno y te diremos qué funciona ahí hoy.',
    },
    {
      question: '¿Están acreditados para trabajo de defensa?',
      answer:
        'No hacemos afirmaciones de cumplimiento normativo, certificación ni acreditación. Cuéntanos qué requiere tu programa y te responderemos de forma concreta.',
    },
    {
      question: '¿Cómo empezamos?',
      answer:
        'El acceso anticipado está abierto bajo solicitud, y los productos son de código cerrado por ahora. Cuéntanos tu hardware y qué tiene que quedarse en él, y te responderemos.',
    },
  ],
  cta: {
    title: 'Tráenos tu *hardware*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué hardware usas y qué tiene que quedarse en él, y te diremos con honestidad qué encaja hoy.',
  },
};

export default militaryEs;
