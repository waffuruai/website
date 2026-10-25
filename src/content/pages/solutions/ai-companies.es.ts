import type { aiCompanies } from './ai-companies';

const aiCompaniesEs: (typeof aiCompanies)['en'] = {
  seo: {
    title: 'Kernels de GPU y serving de LLM para empresas de IA',
    description:
      'Escribe un kernel una vez y llévalo a Metal, CUDA, ROCm y Vulkan. Sirve modelos sin Python, con caché KV cuantizada y decodificación especulativa.',
    keywords: [
      'optimización de inferencia',
      'portabilidad de kernels de GPU',
      'motor de serving de LLM',
      'reducir el costo de inferencia',
    ],
  },
  name: 'Empresas de modelos e inferencia de IA',
  serviceType: 'Compilador de kernels de GPU y motor de serving de LLM',
  card: {
    title: 'Empresas de modelos e inferencia de *IA*',
    summary:
      'Una definición de kernel para cada backend de GPU, y serving que no necesita Python.',
  },
  hero: {
    title: 'Escribe el kernel una vez. Llévalo a cuatro *backends*.',
    lede: 'Iron compila una definición de kernel a Metal, CUDA, ROCm y Vulkan. Butter sirve modelos encima sin Python, y Syrup da memoria a tus agentes.',
  },
  problem: {
    title: 'Cada backend es una *reescritura*.',
    statement:
      'Tu modelo es tan portable como tus kernels, y los kernels suelen escribirse una vez por fabricante.',
    body: 'Dar soporte a Apple silicon, NVIDIA, AMD y Vulkan suele significar bases de código separadas y errores separados, con Python en la ruta crítica del stack de serving. El costo de inferencia cae directo sobre tu margen, y los agentes pierden su contexto en cuanto termina una sesión.',
  },
  useCases: {
    title: 'Lo que puedes *lanzar*.',
    intro:
      'Cuatro tareas para el equipo que construye modelos, kernels o serving.',
    items: [
      {
        tag: 'inference',
        title: 'Escribe un kernel una vez y ejecútalo en cuatro backends.',
        body: 'Iron es un DSL embebido en Rust. Los kernels se traducen a una IR compartida y luego a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V, tras una ABI versionada de C y Rust que los hosts existentes pueden llamar.',
      },
      {
        tag: 'inference',
        title: 'Sirve sin Python ni JIT.',
        body: 'Butter es Swift sobre Metal para Apple silicon y Rust para CUDA y el resto, con una API compatible con OpenAI, streaming y llamada a herramientas. Los modelos híbridos y MoE, la decodificación especulativa y LoRA vienen incluidos.',
      },
      {
        tag: 'cost',
        title: 'Gasta menos vatios por token.',
        body: 'Los checkpoints cuantizados de 2 a 8 bits, una caché KV cuantizada, la decodificación especulativa y los kernels por backend apuntan a tokens por vatio y dólares por carga de trabajo. Medimos, y no daremos una cifra que no podamos reproducir.',
      },
      {
        tag: 'control',
        title: 'Dale a tus agentes una memoria que se queda en local.',
        body: 'Syrup comprime los embeddings con TurboQuant+ y ejecuta la búsqueda léxica más vectorial en la propia máquina. Los resultados llegan con citas a través de MCP, para que los agentes retomen donde lo dejaron.',
      },
    ],
  },
  sample: {
    title: 'Así se ve un *kernel*.',
    intro:
      'Una función de Rust con unos pocos atributos. Iron la traduce a cada backend.',
    filename: 'unary.rs',
    language: 'iron · rust dsl',
    code: [
      '#[kernel(bench(op = "unary", subop = "exp", tol = 1e-4))]',
      'pub fn iron_exp<T>(a: Tensor<T>, out: Tensor<T>) {',
      '    let idx = program_id(0);',
      '    store(out[idx], exp(load(a[idx])));',
      '}',
    ].join('\n'),
    emitsLabel: 'Emite',
    emits: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro: 'Iron y Butter son el núcleo. Syrup y Waffle lo completan.',
    items: [
      {
        product: 'iron',
        need: 'Una definición de kernel, cuatro backends.',
        body: 'Prensa la matemática una sola vez. Iron la traduce mediante una IR compartida a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V, y una ABI versionada de C y Rust permite que los motores que ya tienes llamen al resultado.',
      },
      {
        product: 'butter',
        need: 'Servir modelos sin Python.',
        body: 'Carga safetensors, MLX, JANG y GGUF sin conversión, además de checkpoints cuantizados de 2 a 8 bits, modelos híbridos y MoE, una caché KV cuantizada, decodificación especulativa y LoRA. Los modelos de texto, visión, voz a texto, texto a voz y omni quedan tras una API compatible con OpenAI.',
      },
      {
        product: 'syrup',
        need: 'Memoria para agentes.',
        body: 'Recuperación local sobre notas y código: embeddings comprimidos con TurboQuant+, búsqueda léxica más vectorial y resultados con citas a través de MCP.',
      },
      {
        product: 'waffle',
        need: 'Cada motor en cada GPU, en una sola vista.',
        body: 'Ejecuta Butter junto a vLLM, SGLang o llama.cpp y míralos lado a lado. Un pequeño sidecar en Rust en cada host reporta telemetría firmada.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Metal es donde se escribe y se afina primero cada kernel. Los productos están en acceso anticipado y son de código cerrado por ahora.',
    notes: [
      'Hoy hay aproximadamente 1.139 declaraciones de kernel en Iron.',
      'HIP y Vulkan pasan un corpus de pruebas de 4.164 de 4.164 casos con exactitud bit a bit, pero aún no están afinados.',
      'CUDA está en producción en RTX y DGX Spark, con las GPU de centros de datos en desarrollo.',
    ],
  },
  faq: [
    {
      question: '¿En qué se diferencia Iron de escribir Metal y CUDA a mano?',
      answer:
        'Escribes una definición de kernel en un DSL embebido en Rust, y se traduce mediante una IR compartida a Metal, CUDA (PTX), HIP/ROCm o Vulkan SPIR-V. La afinación sigue siendo por backend, y hoy Metal la recibe primero.',
    },
    {
      question: '¿Puede nuestro stack actual llamar a los kernels de Iron?',
      answer:
        'Sí. Una ABI versionada de C y Rust permite que los hosts existentes los llamen, así que no necesitas adoptar Butter para usar Iron.',
    },
    {
      question: '¿Butter es más rápido que vLLM o llama.cpp?',
      answer:
        'No publicamos comparaciones que no podamos reproducir, ni afirmamos que Butter supere a otros motores en CUDA o ROCm. Los benchmarks valen más que las opiniones, así que cuando haya cifras públicas vendrán con su método.',
    },
    {
      question: '¿Qué modelos ejecuta Butter?',
      answer:
        'Llama, Gemma, Qwen, GPT-OSS, Mistral, Nemotron, Granite, Phi, LFM, OLMo, SmolLM, Falcon H1, Jamba e InternLM, además de variantes de visión, voz y omni. DeepSeek V4 está en desarrollo. Los modelos se cargan directo desde Hugging Face, sin conversión.',
    },
    {
      question: '¿Podemos conseguir acceso?',
      answer:
        'El acceso anticipado está abierto bajo solicitud, y los productos son de código cerrado por ahora. Cuéntanos qué backends y modelos te importan y te responderemos.',
    },
  ],
  cta: {
    title: 'Prensa tu matemática en *silicio*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué construyes, qué backends te importan y dónde te estorba Python, y te responderemos.',
  },
};

export default aiCompaniesEs;
