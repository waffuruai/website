import type { cloudInfrastructure } from './cloud-infrastructure';

const cloudInfrastructureEs: (typeof cloudInfrastructure)['en'] = {
  seo: {
    title: 'Software de inferencia para nubes de GPU y hosting',
    description:
      'Para nubes de GPU y empresas de hosting: ve cada GPU, motor e inquilino, saca más de cada hora de GPU y sirve con más de un proveedor. Acceso anticipado.',
    keywords: [
      'plataforma de inferencia gestionada',
      'software de hosting de GPU',
      'utilización de GPU',
      'ingresos por hora de GPU',
      'inferencia de GPU multiproveedor',
    ],
  },
  name: 'Infraestructura cloud',
  serviceType:
    'Software de visibilidad de flotas de GPU e inferencia gestionada',
  card: {
    title: '*Infraestructura* cloud',
    summary:
      'Para nubes de GPU y hosting: más de cada hora de GPU, una vista de cada inquilino y más de un proveedor.',
  },
  hero: {
    title: 'Haz que cada hora de GPU *rinda*.',
    lede: 'Vendes capacidad por horas y respondes por lo que corre en ella. Ve cada GPU, motor e inquilino en un solo lugar, ofrece inferencia gestionada que puedes respaldar y mantén abiertas tus opciones entre proveedores de GPU.',
  },
  problem: {
    title: 'Las horas ociosas no se *facturan*.',
    statement:
      'Los ingresos y el margen por hora de GPU deciden tu negocio, y la flota rara vez te muestra ninguno de los dos.',
    body: 'Los inquilinos traen sus propios motores y configuraciones, cada proveedor reporta a su manera, y el costo cae en la tarjeta en lugar de en el cliente que la usó. Los clientes ahora quieren inferencia gestionada, no solo bare metal, y construirla sobre un frágil stack de Python es un riesgo que cargas por ellos.',
  },
  useCases: {
    title: 'Más de cada *rack*.',
    intro: 'Cuatro tareas para el equipo que vende capacidad de GPU.',
    items: [
      {
        tag: 'cost',
        title: 'Sabe qué hace cada GPU.',
        body: 'Waffle ofrece una sola vista de hosts, GPU, motores e inquilinos, ya sea Butter, vLLM, SGLang o llama.cpp. La capacidad ociosa o desajustada aparece en tu pantalla antes de aparecer en el margen.',
      },
      {
        tag: 'control',
        title: 'Ve qué inquilino ejecuta qué.',
        body: 'Atribuir costos empieza por saber quién ejecutó qué y en qué tarjeta. Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada, así que las lecturas se pueden verificar como provenientes del host que las envió.',
      },
      {
        tag: 'inference',
        title: 'Ofrece inferencia gestionada que puedes respaldar.',
        body: 'Butter sirve una API compatible con OpenAI con streaming y llamada a herramientas, sin Python y sin JIT en la ruta de serving. Menos piezas móviles significa menos que parchear y menos que se rompa bajo la carga de trabajo de otro.',
      },
      {
        tag: 'control',
        title: 'Monta más de un proveedor en tus racks.',
        body: 'Iron traduce una definición de kernel a Metal, CUDA, HIP/ROCm y Vulkan SPIR-V tras una ABI versionada de C y Rust. Sumar un proveedor de GPU pasa a ser trabajo de afinación, no una segunda base de código.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Waffle es por donde empiezas. Butter e Iron se ocupan del rendimiento que hay debajo.',
    items: [
      {
        product: 'waffle',
        need: 'Cada GPU, motor e inquilino en una sola vista.',
        body: 'Un pequeño sidecar en Rust en cada host reporta telemetría firmada. Waffle funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI, así que los inquilinos conservan los motores que eligieron.',
      },
      {
        product: 'butter',
        need: 'Inferencia gestionada con menos piezas móviles.',
        body: 'Swift sobre Metal y Rust para CUDA, sin Python y sin JIT en la ruta de serving. Checkpoints y caché KV cuantizados, decodificación especulativa y LoRA tras una API compatible con OpenAI.',
      },
      {
        product: 'iron',
        need: 'Kernels que te siguen al próximo proveedor.',
        body: 'Una definición de kernel se traduce a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V. Una ABI versionada de C y Rust permite que los motores que ya alojas los llamen.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Lo que más le importa a una nube de GPU va primero: las GPU de centros de datos están en desarrollo. Waffle, Butter e Iron están en acceso anticipado y son de código cerrado por ahora.',
    notes: [
      'CUDA está en producción en RTX y DGX Spark. Cuéntanos tus generaciones de GPU de centros de datos, porque las flotas que conocemos marcan qué va primero.',
      'ROCm y Vulkan funcionan hoy, pero aún sin afinar.',
      'No afirmamos que Butter supere a otros motores en CUDA o ROCm. Cuando publiquemos mediciones, irán acompañadas del método.',
    ],
  },
  faq: [
    {
      question: '¿Nuestros inquilinos tienen que cambiar de motor?',
      answer:
        'No. Waffle funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI. Los inquilinos conservan lo que usan, y tú obtienes una sola vista de todo.',
    },
    {
      question: '¿Qué GPU admite?',
      answer:
        'Apple silicon mediante Metal es el principal. NVIDIA mediante CUDA es secundario, en producción en RTX y DGX Spark, con las GPU de centros de datos en desarrollo. AMD ROCm y Vulkan funcionan, pero aún sin afinar.',
    },
    {
      question: '¿Cuánto sumará a nuestro margen?',
      answer:
        'No prometeremos una cifra. Primero viene ver qué ejecuta cada GPU y para quién. El rendimiento por hora de GPU y los dólares por carga de trabajo son lo que luego intentamos mover, medidos en tu flota.',
    },
    {
      question: '¿Por qué deberíamos confiar en la telemetría?',
      answer:
        'Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada, así que las lecturas se pueden verificar como provenientes del host que las envió. Pregúntanos cómo funciona la firma en tu entorno.',
    },
    {
      question: '¿Cómo obtenemos acceso?',
      answer:
        'El acceso anticipado está abierto bajo solicitud, y los productos son de código cerrado por ahora. Cuéntanos sobre tu flota, tus proveedores y tus inquilinos, y te responderemos.',
    },
  ],
  cta: {
    title: 'Enséñanos los *racks*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos tus GPU, tus motores y cómo las comparten los inquilinos, y te diremos con honestidad qué encaja hoy.',
  },
};

export default cloudInfrastructureEs;
