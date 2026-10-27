import type { home } from './home';

const homeEs: (typeof home)['en'] = {
  seo: {
    keywords: [
      'inferencia de LLM local',
      'kernels de GPU',
      'motor de inferencia',
      'Apple silicon',
      'Metal',
      'CUDA',
      'ROCm',
      'Vulkan',
      'gestión de flotas de GPU',
      'neocloud',
      'IA en el dispositivo',
      'IA privada',
    ],
  },

  hero: {
    eyebrow: 'Cuatro productos · código cerrado por ahora',
    title: 'Matemática pura, *prensada* en silicio.',
    lede: 'Escribimos kernels de GPU, un motor de inferencia, un plano de control y una capa de recuperación para que tu equipo ejecute modelos en su propio hardware. Funcionan en un portátil, un laboratorio casero o una flota de neocloud, y publicamos lo que medimos.',
    secondary: { label: 'Ver el stack', href: '#stack' },
    emits: {
      label: 'Emite',
      targets: ['Metal', 'CUDA', 'ROCm / HIP', 'Vulkan', 'SPIR-V'],
    },
  },

  stack: {
    title: 'El stack.',
    intro:
      'Iron compila los kernels. Butter ejecuta modelos sobre ellos. Waffle vigila las GPU. Syrup recuerda en qué estabas trabajando.',
    products: [
      {
        slug: 'syrup',
        index: '04',
        kicker: 'Memoria',
        name: 'Syrup',
        tagline: 'Tu IA recuerda en qué estabas trabajando.',
        body: 'Recuperación local sobre tus notas y tu código. Los embeddings se comprimen con TurboQuant+, la búsqueda combina léxico y vectores, y los resultados llegan con citas a través de MCP.',
      },
      {
        slug: 'waffle',
        index: '03',
        kicker: 'Plano de control',
        name: 'Waffle',
        tagline: 'Ve cada GPU y cada motor que corre en ella.',
        body: 'Un plano de control para LLM en GPU, desde un equipo bajo el escritorio hasta un neocloud que alquila una flota. Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada. Funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI.',
      },
      {
        slug: 'butter',
        index: '02',
        kicker: 'Serving',
        name: 'Butter',
        tagline: 'Servir modelos sin Python.',
        body: 'Swift sobre Metal para Apple silicon, Rust para CUDA y el resto. Carga checkpoints cuantizados de 2 a 8 bits, modelos híbridos y MoE, con una caché KV cuantizada.',
      },
      {
        slug: 'iron',
        index: '01',
        kicker: 'Kernels',
        name: 'Iron',
        tagline: 'Una definición de kernel, cuatro backends.',
        body: 'Un DSL embebido en Rust. Los kernels se traducen a una representación intermedia (IR) compartida y de ahí a Metal, CUDA, HIP/ROCm o Vulkan SPIR-V. Una ABI versionada de C y Rust permite que los hosts existentes los invoquen.',
      },
    ],
  },

  team: {
    title: 'Quién está en la *cocina*.',
    intro:
      'Investigación, seguridad, ingresos y un par de fundadores que ya han llevado productos al mercado.',
    portraitAlt: 'Retrato de {name}',
    link: { label: 'Conoce al equipo', href: '/about/team' },
  },

  cta: {
    title: 'Siéntate a la mesa.',
    body: 'Todavía no hay nada público. Solicita acceso anticipado o deja tu correo abajo y te escribiremos cuando lo haya.',
  },
};

export default homeEs;
