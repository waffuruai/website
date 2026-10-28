import type { lifeSciences } from './life-sciences';

const lifeSciencesEs: (typeof lifeSciences)['en'] = {
  seo: {
    title: 'Inferencia de IA privada para ciencias de la vida',
    description:
      'Modelos junto a datos sensibles de investigación y pacientes, tu propiedad intelectual en tu hardware y respuestas citadas de tus fuentes. Acceso anticipado.',
    keywords: [
      'IA privada para ciencias de la vida',
      'IA para datos de investigación',
      'LLM local para biotecnología',
      'recuperación con citas',
      'inferencia de IA on-premise',
    ],
  },
  name: 'Ciencias de la vida',
  serviceType:
    'Software de inferencia de IA privada y recuperación para investigación',
  card: {
    title: '*Ciencias* de la vida',
    summary:
      'Modelos junto a datos de investigación sensibles, y respuestas de tus propias fuentes con citas.',
  },
  hero: {
    title: 'Lleva el modelo a los *datos*.',
    lede: 'Ejecuta modelos en hardware que tú controlas, junto a la investigación, los datos de pacientes y la propiedad intelectual que nunca deberían salir de él. Pregunta a tus propias notas, documentos y código, y obtén respuestas que citan de dónde salieron.',
  },
  problem: {
    title: 'Los datos que importan no pueden *viajar*.',
    statement:
      'Los datos que harían útil a un modelo, de los resultados de ensayos al trabajo inédito, son justo los que no puedes enviar a la API de otro.',
    body: 'Así que los equipos pegan menos, o pegan igual. La literatura crece más rápido de lo que nadie puede leerla, un resumen sin fuente no sirve en una revisión, y el cómputo de investigación es difícil de vincular al proyecto que lo usó.',
  },
  useCases: {
    title: 'Investigación que sigue siendo *tuya*.',
    intro:
      'Cuatro tareas para el equipo de computación de investigación y los científicos a los que da servicio.',
    items: [
      {
        tag: 'control',
        title: 'Ejecuta modelos junto a datos sensibles.',
        body: 'Butter sirve modelos en hardware que tú operas, desde un Mac Studio en el laboratorio hasta estaciones de trabajo RTX y servidores en tus instalaciones, para que los datos de pacientes y los resultados inéditos no se muevan. Los datos se quedan donde están a menos que tú lo autorices.',
      },
      {
        tag: 'inference',
        title: 'Pregunta a tus fuentes y obtén la cita.',
        body: 'Whisk ejecuta la recuperación en local sobre notas, documentos y código. La búsqueda es léxica más vectorial, así que tanto los nombres exactos de genes como las preguntas difusas dan en el blanco, y cada respuesta cita de dónde salió.',
      },
      {
        tag: 'control',
        title: 'Mantén tu propiedad intelectual en máquinas propias.',
        body: 'Los modelos, los prompts y los resultados se quedan en la infraestructura que controlas, así que una nueva diana terapéutica o un borrador de patente no queda en los registros de otro. El mismo stack funciona en una sola estación de trabajo o en un clúster compartido.',
      },
      {
        tag: 'cost',
        title: 'Sabe cuánto cuesta el cómputo de cada proyecto.',
        body: 'Syrup muestra cada GPU y cada motor que corre en ella, ocupada u ociosa, para que el cómputo de investigación se vincule con el trabajo que hizo. Los presupuestos tienen una cifra en lugar de una suposición.',
      },
    ],
  },
  stackFit: {
    title: 'Cómo *encaja* el stack.',
    intro:
      'Butter ejecuta los modelos, Whisk lee tus fuentes y Syrup lleva la cuenta.',
    items: [
      {
        product: 'butter',
        need: 'Modelos junto a los datos.',
        body: 'Swift sobre Metal para Apple silicon y Rust para CUDA, sin Python en la ruta de serving. Modelos de texto, visión, voz y omni tras una API compatible con OpenAI, y los checkpoints se cargan directo desde Hugging Face.',
      },
      {
        product: 'whisk',
        need: 'Respuestas de tus fuentes, con citas.',
        body: 'Recuperación local sobre notas, documentos y código. La búsqueda es léxica más vectorial, y los resultados llegan con citas a través de MCP, para que los asistentes muestren de dónde sacan lo que dicen.',
      },
      {
        product: 'syrup',
        need: 'Cómputo del que puedes rendir cuentas.',
        body: 'Cada GPU y cada motor en una sola vista, sea Butter, vLLM, SGLang o llama.cpp, de una sola estación de trabajo a un clúster compartido.',
      },
    ],
  },
  whereWeAre: {
    title: 'Dónde *estamos*.',
    lede: 'Los productos están en acceso anticipado y son de código cerrado por ahora. No hacemos afirmaciones de cumplimiento normativo ni de validación, así que pregúntanos directamente por tus requisitos.',
    notes: [
      'Un Mac Studio o una estación de trabajo RTX es el lugar más fácil para empezar: Metal es el principal, y CUDA está en producción en RTX y DGX Spark.',
      'Las GPU de centros de datos están en desarrollo. ROCm y Vulkan funcionan, pero aún sin afinar.',
      'Whisk cita sus fuentes, pero no comprueba la ciencia. Eso lo siguen haciendo tus revisores.',
    ],
  },
  faq: [
    {
      question:
        '¿Los datos de pacientes o de investigación salen de nuestros equipos?',
      answer:
        'No por defecto. Los modelos se ejecutan en hardware que tú operas, y los datos se quedan donde están a menos que tú lo autorices.',
    },
    {
      question: '¿Puede responder a partir de nuestros propios documentos?',
      answer:
        'Sí. Whisk ejecuta la recuperación en local sobre notas, documentos y código, y cada resultado llega con una cita a su fuente, a través de MCP.',
    },
    {
      question: '¿Está validado para trabajo clínico o regulado?',
      answer:
        'No hacemos afirmaciones de cumplimiento normativo, certificación ni validación. Cuéntanos qué requiere tu trabajo y te responderemos de forma concreta.',
    },
    {
      question: '¿Qué hardware necesitamos?',
      answer:
        'Un Mac con Apple silicon es el punto de partida con mejor soporte, porque Metal es donde se afina primero cada kernel. Las estaciones de trabajo RTX y DGX Spark corren sobre CUDA. El tamaño del modelo que puedes ejecutar depende de cuánta memoria tengas.',
    },
    {
      question: '¿Cómo obtenemos acceso?',
      answer:
        'El acceso anticipado está abierto bajo solicitud, y los productos son de código cerrado por ahora. Cuéntanos sobre tus datos y tu hardware, y te responderemos.',
    },
  ],
  cta: {
    title: 'Mantén la ciencia *en casa*.',
    body: 'Acceso anticipado, código cerrado por ahora. Cuéntanos qué datos deben quedarse donde están y qué hardware usas, y te diremos con honestidad qué encaja hoy.',
  },
};

export default lifeSciencesEs;
