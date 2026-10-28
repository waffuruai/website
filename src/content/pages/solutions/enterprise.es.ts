import type { enterprise } from './enterprise';

const enterpriseEs: (typeof enterprise)['en'] = {
  seo: {
    title: 'Inferencia de LLM on-prem para empresas',
    description:
      'Inferencia de LLM en tus instalaciones o nube privada: datos sensibles dentro de tu perímetro y cada GPU y cada motor en un solo lugar. Acceso anticipado.',
    keywords: [
      'inferencia de LLM on-premise',
      'infraestructura de IA privada',
      'IA soberana',
      'privacidad de datos en IA',
    ],
  },
  name: 'Empresas',
  serviceType:
    'Software de inferencia de LLM en instalaciones propias y nube privada',
  card: {
    title: '*Empresas*',
    summary:
      'Inferencia en tus instalaciones o en nube privada para datos sensibles, con una sola vista de cada GPU.',
  },
  hero: {
    title: 'IA privada, en tus propios *términos*.',
    lede: 'Ejecuta modelos en hardware que tú operas, en tus instalaciones o en tu nube privada, para que los datos sensibles se queden donde ya viven. Ve cada GPU y cada motor desde un solo lugar.',
  },
  problem: {
    title: 'Algunos datos no pueden *salir*.',
    statement:
      'Las cargas de trabajo que vale la pena automatizar tocan registros de clientes, contratos, código fuente y datos regulados, justo los que no puedes enviar sin más a la API de otro.',
    body: 'Así que una política dice que no mientras los equipos dicen que sí a escondidas, y las GPU quedan repartidas entre clústeres y nubes que nadie ve en un solo lugar. Seguridad quiere un perímetro, finanzas quiere una cifra por cada carga de trabajo, e ingeniería quiere un modelo que simplemente atienda solicitudes.',
  },
  useCases: {
    title: 'Trabajo que se queda *dentro*.',
    intro:
      'Cuatro tareas para un equipo de plataforma que responde a seguridad, finanzas e ingeniería a la vez.',
    items: [
      {
        tag: 'control',
        title: 'Sirve modelos dentro de tu propio perímetro.',
        body: 'Ejecuta Butter en servidores que tú operas, en tus instalaciones o en una nube privada, para que los prompts, los documentos y los resultados se queden en la infraestructura que controlas. Nuestra norma por defecto es que los datos de un usuario se quedan en su equipo a menos que lo autorice.',
      },
      {
        tag: 'cost',
        title: 'Ve cada GPU y cada motor en un solo lugar.',
        body: 'Syrup muestra qué GPU están ocupadas, qué motores corren en ellas y cuáles están ociosas, sea el motor Butter, vLLM, SGLang o llama.cpp. Es el punto de partida para decidir qué consolidar, retirar o comprar.',
      },
      {
        tag: 'inference',
        title: 'Saca más partido a las GPU que ya compraste.',
        body: 'Kernels afinados por backend, modelos y caché KV cuantizados, y decodificación especulativa apuntan a más tokens útiles por vatio y por dólar. Preferimos medir tu carga de trabajo antes que darte una cifra.',
      },
      {
        tag: 'control',
        title: 'Apunta tus apps actuales a él sin reescribir nada.',
        body: 'La API de Butter compatible con OpenAI admite streaming y llamada a herramientas, así que las herramientas internas cambian una dirección, no un SDK. Nada te ata a un motor, porque Syrup funciona junto a vLLM, SGLang y llama.cpp.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Butter sirve, Syrup vigila, Whisk recupera e Iron está debajo de los tres.',
    items: [
      {
        product: 'butter',
        need: 'Sirve modelos en servidores que tú operas.',
        body: 'Serving compatible con OpenAI en Swift para macOS e iOS y Rust para todo lo demás, con dependencias mínimas. Carga checkpoints safetensors, MLX, JANG y GGUF directamente, así que no hay un pipeline de conversión entre un modelo nuevo y tus servidores.',
      },
      {
        product: 'syrup',
        need: 'Una sola vista de cada GPU y cada motor.',
        body: 'Un pequeño sidecar en Rust en cada host reporta telemetría firmada. Syrup funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI, así que adoptarlo no implica reemplazar lo que ya corre.',
      },
      {
        product: 'whisk',
        need: 'Respuestas de tus propias fuentes, con citas.',
        body: 'Recuperación local sobre notas y código internos. La búsqueda es léxica más vectorial, y los resultados llegan con citas a través de MCP.',
      },
      {
        product: 'iron',
        need: 'Una decisión de hardware que no sea una reescritura.',
        body: 'Una definición de kernel se traduce a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V tras una ABI versionada de C y Rust. Cuando llegue un segundo proveedor o una nueva generación de GPU, los kernels se trasladan, y la afinación va siguiendo backend por backend.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'En GPU de centros de datos tenemos primeras ejecuciones, no producción, y preferimos decirlo desde el principio. Los productos están en acceso anticipado y son de código cerrado por ahora.',
    notes: [
      'Planifica los pilotos en torno a Apple silicon, estaciones de trabajo RTX y DGX Spark, donde el stack funciona hoy.',
      'Las primeras ejecuciones ya están hechas en H100, H200, B100, B200 y MI300. Si las GPU de centros de datos son tu objetivo, dinos cuáles, porque eso define qué afinamos primero.',
      'ROCm y Vulkan funcionan, pero aún sin afinar.',
    ],
  },
  faq: [
    {
      question:
        '¿Podemos ejecutarlo en nuestras instalaciones o en una nube privada?',
      answer:
        'Así está construido. Butter sirve modelos en hardware que tú operas, y los datos de un usuario se quedan en su equipo a menos que lo autorice. Las primeras ejecuciones en GPU de centros de datos ya están hechas, así que cuéntanos en cuáles planeas desplegarlo.',
    },
    {
      question: '¿Qué GPU admite hoy?',
      answer:
        'Apple silicon mediante Metal es el principal, y NVIDIA mediante CUDA está en producción en RTX y DGX Spark y se está afinando, con las primeras ejecuciones ya hechas en H100, H200, B100 y B200. En AMD, las primeras ejecuciones en MI300 ya están hechas, y ROCm y Vulkan funcionan, pero aún sin afinar.',
    },
    {
      question: '¿Tenemos que reemplazar el stack de serving que ya usamos?',
      answer:
        'No. Syrup funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI, así que puedes ganar visibilidad primero y decidir sobre los motores después.',
    },
    {
      question: '¿Qué sale de nuestra red?',
      answer:
        'Los datos de inferencia no salen por defecto, porque los datos de un usuario se quedan en su equipo a menos que lo autorice. Cada host de Syrup ejecuta un sidecar que reporta telemetría firmada, y te explicaremos con detalle qué contiene en tu entorno.',
    },
    {
      question: '¿Cómo lo evaluamos?',
      answer:
        'Habla con nosotros con tu hardware y tu carga de trabajo. Te diremos con honestidad si encaja hoy, y el acceso anticipado está abierto bajo solicitud.',
    },
  ],
  cta: {
    title: 'Tráenos tu *carga de trabajo*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué debe quedarse en casa y qué hardware usas, y te diremos con honestidad qué encaja hoy.',
  },
};

export default enterpriseEs;
