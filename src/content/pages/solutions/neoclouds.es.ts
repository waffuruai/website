import type { neoclouds } from './neoclouds';

const neocloudsEs: (typeof neoclouds)['en'] = {
  seo: {
    title: 'Plataforma de inferencia para nubes de GPU',
    description:
      'Visibilidad de flota entre inquilinos y motores, más tokens útiles por GPU y telemetría firmada de cada host. Con vLLM, SGLang y llama.cpp. Acceso anticipado.',
    keywords: [
      'software para nubes de GPU',
      'utilización de GPU',
      'plataforma de inferencia para nubes de GPU',
      'monitoreo de GPU multiinquilino',
    ],
  },
  name: 'Neoclouds',
  serviceType: 'Software de visibilidad de flotas de GPU e inferencia',
  card: {
    title: '*Neoclouds*',
    summary:
      'Visibilidad de la flota entre inquilinos y motores, y más tokens útiles por GPU.',
  },
  hero: {
    title: 'Saca más de cada *GPU* que alquilas.',
    lede: 'Ve toda la flota entre inquilinos y motores, y pon kernels afinados por backend bajo el trabajo que ejecutan tus clientes. Nada te ata a un solo motor.',
  },
  problem: {
    title: 'Una flota que no puedes *ver*.',
    statement:
      'Los clientes traen sus propios motores, versiones y configuraciones, y la GPU de abajo es la parte de la que respondes tú.',
    body: 'Un panel puede decir que una tarjeta está ocupada sin decir qué corre en ella, para quién ni con qué calidad. Cada motor reporta a su manera, cada inquilino trae una mezcla distinta, y la capacidad ociosa o mal ajustada son ingresos que no puedes señalar.',
  },
  useCases: {
    title: 'Una *flota* más ajustada.',
    intro:
      'Cuatro tareas para el equipo que mantiene en marcha una nube de GPU.',
    items: [
      {
        tag: 'cost',
        title: 'Sabe qué corre en cada GPU.',
        body: 'Waffle ofrece una sola vista de hosts, GPU, motores e inquilinos, ya sea vLLM, SGLang, llama.cpp o Butter. La capacidad ociosa o desajustada aparece primero en tu pantalla.',
      },
      {
        tag: 'control',
        title: 'Confía en las lecturas de tu panel.',
        body: 'Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada, así que las lecturas se pueden verificar como provenientes del host que las envió. Las cifras de toda la flota dejan de aceptarse a ciegas.',
      },
      {
        tag: 'inference',
        title: 'Sirve más tokens útiles por GPU.',
        body: 'Butter combina kernels afinados por backend con modelos y caché KV cuantizados y decodificación especulativa, todo orientado a tokens por vatio. Corre junto a los motores que tus inquilinos ya eligen, así que puedes comparar en tu propia flota.',
      },
      {
        tag: 'control',
        title: 'Ofrece opciones sin apostar por un solo motor.',
        body: 'Butter sirve una API compatible con OpenAI, y Waffle funciona con vLLM, SGLang y llama.cpp. Puedes dar más opciones a tus clientes sin reconstruir todo en torno a un único motor.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Waffle es la parte pensada para ti. Butter e Iron trabajan en la eficiencia que hay debajo.',
    items: [
      {
        product: 'waffle',
        need: 'Ve toda la flota.',
        body: 'De un equipo bajo el escritorio a un neocloud que alquila una flota. Un pequeño sidecar en Rust en cada host reporta telemetría firmada, y Waffle funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI.',
      },
      {
        product: 'butter',
        need: 'Un motor que controlas, sin Python.',
        body: 'Swift sobre Metal, Rust para CUDA y el resto. Checkpoints y caché KV cuantizados, decodificación especulativa y LoRA tras una API compatible con OpenAI, sin Python.',
      },
      {
        product: 'iron',
        need: 'Kernels para el hardware que compres después.',
        body: 'Una definición de kernel, cuatro backends: Metal, CUDA, HIP/ROCm y Vulkan SPIR-V. Una ABI versionada de C y Rust permite que los hosts existentes los llamen.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Waffle y Butter están en acceso anticipado y son de código cerrado por ahora. CUDA está en producción en RTX y DGX Spark, y las GPU de centros de datos están en desarrollo.',
    notes: [
      'Cuéntanos tus generaciones de GPU. CUDA para centros de datos está en desarrollo, así que las flotas que conocemos marcan qué hacemos primero.',
      'ROCm y Vulkan funcionan hoy, pero aún sin afinar.',
      'No afirmamos que Butter supere a otros motores en CUDA o ROCm. Cuando publiquemos mediciones, irán acompañadas del método.',
    ],
  },
  faq: [
    {
      question: '¿Waffle reemplaza a nuestros motores actuales?',
      answer:
        'No. Waffle funciona con Butter, vLLM, SGLang, llama.cpp y otros servidores compatibles con OpenAI. Gana visibilidad primero y cambia de motor solo si y cuando quieras.',
    },
    {
      question: '¿En qué GPU funciona?',
      answer:
        'Apple silicon mediante Metal es el principal. NVIDIA mediante CUDA es secundario, en producción en RTX y DGX Spark, con las GPU de centros de datos en desarrollo. AMD ROCm y Vulkan funcionan, pero aún sin afinar.',
    },
    {
      question: '¿Por qué deberíamos confiar en la telemetría?',
      answer:
        'Cada host ejecuta un pequeño sidecar en Rust que reporta telemetría firmada, así que las lecturas se pueden verificar como provenientes del host que las envió. Pregúntanos cómo funciona la firma en tu entorno.',
    },
    {
      question: '¿Cuánta utilización recuperará?',
      answer:
        'No prometeremos un porcentaje. Ver la flota es el primer paso, y los tokens por vatio y los dólares por carga de trabajo son las cifras que intentamos mover. Preferimos medirlas en tu flota antes que darte una.',
    },
    {
      question: '¿Podemos probarlo?',
      answer:
        'El acceso anticipado está abierto bajo solicitud, y los productos son de código cerrado por ahora. Cuéntanos sobre tu flota y te responderemos.',
    },
  ],
  cta: {
    title: 'Enséñanos la *flota*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos tus GPU, tus motores y cómo las comparten los inquilinos, y te responderemos sobre lo que encaja.',
  },
};

export default neocloudsEs;
