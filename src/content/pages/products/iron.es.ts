import type { iron } from './iron';

const ironEs: (typeof iron)['en'] = {
  layer: 'Kernels',
  tagline: 'Una definición de kernel, cuatro backends.',
  summary:
    'Un DSL embebido en Rust. Los kernels se traducen a una representación intermedia (IR) compartida y de ahí a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V. Una ABI versionada de C y Rust permite que los hosts existentes los invoquen.',
  seo: {
    title: 'Iron: un kernel de GPU, cuatro backends',
    description:
      'Escribe un kernel de GPU una vez en Rust y llévalo a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V con una IR compartida. ABI de C y Rust. En acceso anticipado.',
    keywords: [
      'DSL de kernels de GPU en Rust',
      'kernels de Metal',
      'kernels de CUDA',
      'ROCm HIP',
      'Vulkan SPIR-V',
      'kernels de GPU multiplataforma',
    ],
  },
  hero: {
    title: 'Una definición de kernel, *cuatro* backends.',
    lede: 'Prensa la matemática pura directamente en silicio de alto rendimiento. Iron es un DSL embebido en Rust: escribes el kernel una vez, se traduce a una IR compartida y de ahí a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V.',
    highlights: [
      {
        value: '4',
        label: 'backends de GPU desde una sola definición de kernel',
      },
      { value: '~1.139', label: 'declaraciones de kernel' },
      {
        value: '4.164 / 4.164',
        label: 'corpus de pruebas de HIP y Vulkan, exacto bit a bit',
      },
    ],
  },
  story: {
    heading: 'Deja de escribir el mismo kernel *cuatro* veces.',
    problem:
      'Cada fabricante de GPU tiene su propio lenguaje de kernels. Lanzar en hardware de Apple, NVIDIA y AMD significa escribir, afinar y probar la misma matemática otra vez para cada uno, y luego mantener cada copia al día cuando la matemática cambia.',
    outcome:
      'Escribes el kernel una vez, en Rust. Iron lo traduce a una IR compartida y luego a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V, así que una sola definición cubre todos los backends a los que apuntas.',
    outcomes: [
      'Escribe y afina primero en el Mac de tu escritorio. Metal es el objetivo principal, y la misma definición se lleva a los demás backends.',
      'Llama a tus kernels desde el código que ya tienes, a través de una ABI versionada de C y Rust.',
      'Comprueba los backends contra un corpus de pruebas exacto bit a bit, en lugar de esperar que dos de ellos coincidan.',
    ],
  },
  capabilities: {
    heading: 'Lo que *hace* Iron.',
    intro:
      'Construido desde el metal hacia arriba, para quienes escriben kernels.',
    items: [
      {
        title: 'Una definición, cuatro backends',
        body: 'Los kernels se traducen a una IR compartida y de ahí a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V. Mantienes un único código fuente.',
      },
      {
        title: 'Escrito en Rust',
        body: 'Un DSL embebido en Rust. Los kernels son funciones de Rust marcadas con #[kernel], construidas con primitivas como program_id, load y store.',
      },
      {
        title: 'Invocable desde tu host',
        body: 'Una ABI versionada de C y Rust permite que los hosts existentes llamen a los kernels de Iron sin reescribirse a su alrededor.',
      },
      {
        title: 'Exacto bit a bit, con pruebas',
        body: 'El corpus de pruebas de HIP y Vulkan reúne 4.164 casos, y los 4.164 son exactos bit a bit.',
      },
      {
        title: 'Más de mil kernels',
        body: 'Unas 1.139 declaraciones de kernel hoy. Cada una es una definición que comparten todos los backends.',
      },
      {
        title: 'Afinado donde importa',
        body: 'Cada kernel se escribe y se afina primero en Metal. CUDA es secundario, y ROCm y Vulkan funcionan hoy, pero aún sin afinar.',
      },
    ],
  },
  code: {
    heading: 'Un kernel completo, *de principio a fin*.',
    intro:
      'Esto es exp sobre un tensor. Cada instancia carga un elemento, aplica exp y guarda el resultado. El atributo #[kernel] etiqueta la operación y su tolerancia.',
    caption:
      'Código fuente del DSL de Iron. Iron lo traduce a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V.',
  },
  specs: {
    heading: 'Detalles *técnicos*.',
    intro: 'Los detalles, para quienes los van a leer.',
    rows: [
      {
        term: 'Lenguaje',
        detail:
          'Un DSL embebido en Rust. Los kernels son funciones de Rust marcadas con #[kernel].',
      },
      {
        term: 'Pipeline',
        detail:
          'Una definición de kernel se traduce a una IR compartida y de ahí a cada backend.',
      },
      {
        term: 'Backends',
        chips: [
          { label: 'Metal: MSL → .metallib' },
          { label: 'CUDA → PTX' },
          { label: 'HIP/ROCm: HIP → AMDGPU' },
          { label: 'Vulkan → SPIR-V' },
        ],
      },
      {
        term: 'ABI del host',
        detail:
          'Una ABI versionada de C y Rust, para que los hosts existentes puedan llamar a los kernels de Iron.',
      },
      {
        term: 'Cantidad de kernels',
        detail: 'Unas 1.139 declaraciones de kernel.',
      },
      {
        term: 'Corpus de pruebas',
        detail: 'HIP y Vulkan: 4.164 de 4.164 casos exactos bit a bit.',
      },
      {
        term: 'Disponibilidad',
        detail: 'Privado y de código cerrado durante el acceso anticipado.',
      },
    ],
  },
  platforms: {
    heading: 'Dónde está *afinado*.',
    intro:
      'Metal va primero, porque es donde se escribe y se afina cada kernel.',
    tiers: [
      {
        platform: 'Apple · Metal',
        level: 'primary',
        note: 'Cada kernel se escribe y se afina aquí primero. MSL → .metallib.',
      },
      {
        platform: 'NVIDIA · CUDA',
        level: 'secondary',
        note: 'En producción en RTX y DGX Spark. Las GPU de centros de datos están en desarrollo. CUDA → PTX.',
      },
      {
        platform: 'AMD ROCm · Vulkan',
        level: 'runs',
        note: 'Funciona hoy, aún sin afinar. HIP → AMDGPU, Vulkan → SPIR-V.',
      },
    ],
  },
  stack: {
    heading: 'Funciona con el resto del *stack*.',
    intro:
      'Iron funciona por sí solo. Añade Butter para ejecutar modelos sobre los kernels, Waffle para vigilar las GPU en las que corren, o Syrup para que tu IA recuerde en qué estabas trabajando.',
  },
  faq: [
    {
      question: '¿Iron es de código abierto?',
      answer:
        'Hoy no. Iron es privado y de código cerrado durante el acceso anticipado. Solicita acceso y te escribiremos cuando haya más que contar.',
    },
    {
      question: '¿En qué hardware funciona?',
      answer:
        'Metal en Apple silicon es el objetivo principal: cada kernel se escribe y se afina allí primero. CUDA es secundario, en producción en RTX y DGX Spark, con las GPU de centros de datos en desarrollo. ROCm y Vulkan funcionan hoy, pero aún sin afinar.',
    },
    {
      question: '¿Tengo que reescribir el código de mi host?',
      answer:
        'No para llamar a los kernels de Iron. Una ABI versionada de C y Rust permite que los hosts existentes los llamen.',
    },
    {
      question: '¿Es más rápido que CUDA o Metal escritos a mano?',
      answer:
        'No hemos publicado cifras de benchmarks, así que no vamos a afirmarlo. Lo que sí podemos decir hoy es que una definición se traduce a cuatro backends y que el corpus de pruebas de HIP y Vulkan es exacto bit a bit.',
    },
    {
      question: '¿Cómo lo pruebo?',
      answer: 'Solicita acceso anticipado con el formulario de esta página.',
    },
  ],
  cta: {
    title: 'Prensa tu primer *kernel*.',
    body: 'Iron está en acceso anticipado y con código cerrado por ahora. Solicita acceso.',
    docsLabel: 'Lee la documentación',
  },
};

export default ironEs;
