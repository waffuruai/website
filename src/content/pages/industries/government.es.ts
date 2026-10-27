import type { government } from './government';

const governmentEs: (typeof government)['en'] = {
  seo: {
    title: 'Inferencia de IA soberana para gobiernos',
    description:
      'IA en hardware que controlas: datos públicos en tu jurisdicción, cuentas claras por carga de trabajo y sin atarte a un motor o proveedor. Acceso anticipado.',
    keywords: [
      'IA soberana',
      'infraestructura de IA para gobiernos',
      'LLM on-premise para gobiernos',
      'residencia de datos en IA',
      'inferencia de IA sin dependencia de proveedor',
    ],
  },
  name: 'Gobierno',
  serviceType: 'Software de inferencia de IA soberana en instalaciones propias',
  card: {
    title: '*Gobierno*',
    summary:
      'Inferencia soberana en hardware que tú controlas, sin depender de un solo motor ni de un solo proveedor.',
  },
  hero: {
    title: 'IA soberana, en hardware que tú *controlas*.',
    lede: 'Ejecuta modelos en infraestructura que opera tu organismo, para que los datos públicos se queden en tu jurisdicción. Rinde cuentas de cada GPU y cada carga de trabajo, y conserva la libertad de cambiar de proveedor sin empezar de cero.',
  },
  problem: {
    title: 'Dinero público, *datos* privados.',
    statement:
      'Los servicios públicos funcionan con datos que deben quedarse en tu jurisdicción, y cada dólar de gasto en GPU tiene que superar una revisión de contratación.',
    body: 'La IA alojada a menudo significa datos que salen hacia la nube de otro. Comprar hardware puede significar apostar por un solo proveedor durante años. Los organismos acaban con una mezcla de máquinas que nadie puede ver en un solo lugar, y un stack de serving difícil de explicar a quienes lo aprueban.',
  },
  useCases: {
    title: 'Capacidad que se queda en *casa*.',
    intro:
      'Cuatro tareas para el equipo que tiene que hacer funcionar la IA bajo reglas públicas.',
    items: [
      {
        tag: 'control',
        title: 'Mantén los datos en tu jurisdicción.',
        body: 'Butter sirve modelos en servidores que tú operas, en tus instalaciones o en la nube que elijas, para que los prompts y los documentos se queden en la infraestructura que controlas. Los datos se quedan donde están a menos que tú lo autorices.',
      },
      {
        tag: 'cost',
        title: 'Muestra a dónde va el dinero.',
        body: 'Los dólares por carga de trabajo son la cifra que pide una oficina de presupuesto, y casi nadie puede verla. Waffle muestra cada GPU, cada motor que corre en ella y lo que está ocioso, para que el gasto se vincule con los servicios que ejecuta.',
      },
      {
        tag: 'control',
        title: 'Compra hardware sin comprar dependencia.',
        body: 'Una sola definición de kernel de Iron se traduce a Metal, CUDA, HIP/ROCm y Vulkan, y Waffle funciona con Butter, vLLM, SGLang y llama.cpp. Cambiar de proveedor de GPU o de motor pasa a ser una decisión, no una reescritura.',
      },
      {
        tag: 'inference',
        title: 'Usa el hardware que ya compraste.',
        body: 'De los Mac en los escritorios a las estaciones de trabajo RTX y DGX Spark, un solo stack sirve modelos en lo que ya está pagado. Butter no tiene Python ni JIT en la ruta de serving, así que hay menos que parchear y menos que justificar.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Butter mantiene el trabajo en tu jurisdicción, Waffle rinde cuentas de él, Syrup responde desde tus propios documentos e Iron mantiene a los proveedores intercambiables.',
    items: [
      {
        product: 'butter',
        need: 'Sirve modelos en infraestructura que tú operas.',
        body: 'Serving compatible con OpenAI en Swift sobre Metal y Rust para CUDA, sin Python y sin JIT en la ruta de serving. Las herramientas existentes cambian una dirección, no un SDK.',
      },
      {
        product: 'waffle',
        need: 'Cuentas claras de cada GPU.',
        body: 'Cada GPU y cada motor en una sola vista, sea Butter, vLLM, SGLang o llama.cpp. Un pequeño sidecar en Rust en cada host reporta telemetría firmada.',
      },
      {
        product: 'syrup',
        need: 'Respuestas de tus propios documentos, con fuentes.',
        body: 'Recuperación local sobre notas, documentos y código internos. La búsqueda es léxica más vectorial, y los resultados llegan con citas a través de MCP.',
      },
      {
        product: 'iron',
        need: 'Libertad de proveedor que sobrevive a la próxima licitación.',
        body: 'Una definición de kernel se traduce a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V tras una ABI versionada de C y Rust. Los kernels se trasladan cuando cambia el hardware, y la afinación va siguiendo backend por backend.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Los productos están en acceso anticipado y son de código cerrado por ahora, y no hacemos afirmaciones de cumplimiento normativo ni de acreditación. Esto es lo que funciona hoy.',
    notes: [
      'Planifica los pilotos en Apple silicon, estaciones de trabajo RTX y DGX Spark, donde el stack funciona hoy. Las GPU de centros de datos están en desarrollo.',
      'ROCm y Vulkan funcionan, pero aún sin afinar.',
      'Tráenos directamente tus requisitos de contratación y de seguridad, y los responderemos de forma concreta.',
    ],
  },
  faq: [
    {
      question: '¿Algún dato sale de nuestra infraestructura?',
      answer:
        'Los datos de inferencia no salen por defecto, porque los datos se quedan en el equipo a menos que tú lo autorices. Cada host de Waffle ejecuta un sidecar que reporta telemetría firmada, y te explicaremos con detalle qué contiene en tu entorno.',
    },
    {
      question: '¿Están acreditados para uso gubernamental?',
      answer:
        'No hacemos afirmaciones de cumplimiento normativo, certificación ni acreditación. Cuéntanos qué requiere tu organismo y te responderemos de forma concreta.',
    },
    {
      question: '¿Cómo evita la dependencia?',
      answer:
        'Waffle funciona con Butter, vLLM, SGLang y llama.cpp, así que no estás atado a un solo motor. Los kernels de Iron se traducen a Metal, CUDA, HIP/ROCm y Vulkan, así que no estás atado a un solo proveedor de GPU.',
    },
    {
      question: '¿Qué hardware admite?',
      answer:
        'Apple silicon mediante Metal es el principal. NVIDIA mediante CUDA es secundario, en producción en RTX y DGX Spark, con las GPU de centros de datos en desarrollo. AMD ROCm y Vulkan funcionan, pero aún sin afinar.',
    },
    {
      question: '¿Cómo lo evaluamos?',
      answer:
        'El acceso anticipado está abierto bajo solicitud, y los productos son de código cerrado por ahora. Cuéntanos tu hardware y tu carga de trabajo, y te diremos con honestidad si encaja hoy.',
    },
  ],
  cta: {
    title: 'Mantenlo en tu *jurisdicción*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué debe quedarse en el país y qué hardware usas, y te diremos con honestidad qué encaja hoy.',
  },
};

export default governmentEs;
