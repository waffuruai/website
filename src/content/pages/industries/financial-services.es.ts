import type { financialServices } from './financial-services';

const financialServicesEs: (typeof financialServices)['en'] = {
  seo: {
    title: 'Inferencia de IA privada para servicios financieros',
    description:
      'Usa IA donde ya viven los datos de clientes, pon un costo a cada carga de trabajo y da a riesgo de modelos un stack más pequeño que revisar. Acceso anticipado.',
    keywords: [
      'IA privada para servicios financieros',
      'LLM on-premise para bancos',
      'costo de IA por carga de trabajo',
      'residencia de datos en IA',
      'visibilidad del costo de GPU',
    ],
  },
  name: 'Servicios financieros',
  serviceType:
    'Software de inferencia de IA privada en instalaciones propias para finanzas',
  card: {
    title: '*Servicios* financieros',
    summary:
      'Inferencia privada sobre datos de clientes, con un costo por carga de trabajo que puedes llevar a finanzas.',
  },
  hero: {
    title: 'Ejecuta IA donde ya *viven* los datos de tus clientes.',
    lede: 'Sirve modelos en hardware que tú operas, para que los registros de clientes, la investigación y el código se queden dentro de tu perímetro. Ve cuánto cuesta cada carga de trabajo antes de que finanzas lo pregunte, y dale a riesgo de modelos menos piezas móviles que revisar.',
  },
  problem: {
    title: 'Cada prompt es una *divulgación*.',
    statement:
      'El trabajo que vale la pena automatizar se apoya en datos de clientes, y enviarlos a la API de otro es una decisión de divulgación que nadie quiere tomar prompt a prompt.',
    body: 'Mientras tanto, riesgo de modelos quiere saber qué corre dónde, auditoría quiere un rastro y finanzas quiere un costo por cada carga de trabajo que nadie puede dar. Las GPU acaban repartidas entre escritorios y clústeres, y el stack de serving es un montón de dependencias que cambia cada semana.',
  },
  useCases: {
    title: 'Trabajo que no sale de tus *libros*.',
    intro:
      'Cuatro tareas para el equipo de plataforma que responde a riesgos, a finanzas y al negocio a la vez.',
    items: [
      {
        tag: 'control',
        title: 'Usa IA con datos de clientes sin enviarlos fuera.',
        body: 'Butter sirve modelos en servidores que tú operas, en tus instalaciones o en tu nube privada, para que los prompts, los documentos y los resultados se queden en la infraestructura que controlas. Nuestra norma por defecto es que los datos se quedan donde están a menos que tú lo autorices.',
      },
      {
        tag: 'cost',
        title: 'Ponle un costo a cada carga de trabajo.',
        body: 'Los dólares por carga de trabajo son la cifra que pide finanzas, y casi nadie puede verla. Syrup muestra qué GPU están ocupadas, qué motores corren en ellas y cuáles están ociosas, para que el gasto se vincule con el trabajo que hizo.',
      },
      {
        tag: 'inference',
        title: 'Sirve con menos piezas móviles.',
        body: 'Butter mantiene sus dependencias al mínimo, y su API compatible con OpenAI hace que las herramientas internas cambien una dirección, no un SDK. Menos dependencias significa menos que rastrear entre la revisión y producción.',
      },
      {
        tag: 'control',
        title: 'Responde desde tu propia investigación, con fuentes.',
        body: 'Whisk ejecuta la recuperación en local sobre notas, documentos y código internos, y cada respuesta llega con una cita. Un analista puede revisar la fuente en lugar de fiarse del resumen.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Butter mantiene el trabajo dentro, Syrup le pone una cifra, Whisk aporta las fuentes e Iron está debajo.',
    items: [
      {
        product: 'butter',
        need: 'Sirve modelos dentro de tu perímetro.',
        body: 'Serving compatible con OpenAI en Swift para macOS e iOS y Rust para todo lo demás, con dependencias mínimas. Carga checkpoints safetensors, MLX, JANG y GGUF directamente, así que un modelo nuevo no necesita un pipeline de conversión.',
      },
      {
        product: 'syrup',
        need: 'Un costo para cada carga de trabajo.',
        body: 'Cada GPU y cada motor en una sola vista, sea Butter, vLLM, SGLang o llama.cpp. Un pequeño sidecar en Rust en cada host reporta telemetría firmada, así que las lecturas que llevas a finanzas se pueden rastrear hasta el host que las envió.',
      },
      {
        product: 'whisk',
        need: 'Respuestas con la fuente adjunta.',
        body: 'Recuperación local sobre notas, documentos y código internos. La búsqueda es léxica más vectorial, y los resultados llegan con citas a través de MCP.',
      },
      {
        product: 'iron',
        need: 'Una decisión de proveedor que no sea una reescritura.',
        body: 'Una definición de kernel se traduce a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V. Si el área de compras cambia de proveedor de GPU, los kernels se trasladan y la afinación va siguiendo backend por backend.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Mejor que lo oigas aquí que en una revisión de proveedores. Los productos están en acceso anticipado y son de código cerrado por ahora, y las GPU de centros de datos están en desarrollo.',
    notes: [
      'Planifica un piloto en Apple silicon, estaciones de trabajo RTX o DGX Spark, donde el stack funciona hoy.',
      'ROCm y Vulkan funcionan, pero aún sin afinar.',
      'No hacemos afirmaciones de cumplimiento normativo ni de certificación en este sitio. Tráenos tus requisitos y los responderemos directamente.',
    ],
  },
  faq: [
    {
      question: '¿Los datos de clientes salen de nuestra red?',
      answer:
        'Los datos de inferencia no salen por defecto, porque los datos se quedan en el equipo a menos que tú lo autorices. Cada host de Syrup ejecuta un sidecar que reporta telemetría firmada, y te explicaremos con detalle qué contiene.',
    },
    {
      question: '¿Podemos ver cuánto cuesta cada carga de trabajo?',
      answer:
        'Para eso está Syrup. Muestra cada GPU, ocupada u ociosa, y los motores que corren en ella, que es donde empieza un costo por carga de trabajo. Preferimos mostrarlo en tu hardware antes que prometer una cifra.',
    },
    {
      question: '¿En qué hardware funciona hoy?',
      answer:
        'Apple silicon mediante Metal es el principal. NVIDIA mediante CUDA es secundario, en producción en RTX y DGX Spark, con las GPU de centros de datos en desarrollo. AMD ROCm y Vulkan funcionan, pero aún sin afinar.',
    },
    {
      question: '¿Está certificado para cargas de trabajo reguladas?',
      answer:
        'No hacemos afirmaciones de cumplimiento normativo ni de certificación. Cuéntanos qué exigen tus reguladores y tu equipo de riesgos, y te responderemos de forma concreta.',
    },
    {
      question: '¿Tenemos que reemplazar lo que ya usamos?',
      answer:
        'No. Syrup funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI, así que la visibilidad va primero y las decisiones sobre motores pueden esperar.',
    },
  ],
  cta: {
    title: 'Enséñanos lo que no puede *salir*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué datos deben quedarse dentro y qué hardware usas, y te diremos con honestidad qué encaja hoy.',
  },
};

export default financialServicesEs;
