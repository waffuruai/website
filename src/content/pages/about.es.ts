import type { about } from './about';

const aboutEs: (typeof about)['en'] = {
  seo: {
    title: 'Misión: democratizar el acceso a la inteligencia',
    description:
      'La misión de Waffuru es democratizar el acceso a la inteligencia. En qué creemos, qué valoramos y por qué construimos infraestructura de IA local.',
    keywords: [
      'misión de Waffuru',
      'democratizar la IA',
      'empresa de IA local',
      'startup de infraestructura de IA',
    ],
  },
  hero: {
    label: 'Sobre Waffuru',
    title: 'Democratizar el acceso a la *inteligencia*.',
    lede: 'Waffuru construye el stack que sostiene la IA local-first: kernels, inferencia, control de flotas y memoria que ejecutan modelos con rapidez en el hardware que la gente ya tiene.',
    actions: [
      { label: 'Conoce al equipo', href: '/about/team' },
      { label: 'Trabaja con nosotros', href: '#hiring', variant: 'outline' },
    ],
  },
  why: {
    title: 'Por qué *construimos*.',
    intro: 'La inteligencia debe correr donde ya está la gente.',
    paragraphs: [
      'Los modelos se están volviendo lo bastante buenos para correr en el hardware que la gente ya tiene.',
      'Eso solo importa si el stack que hay debajo está listo. Tiene que ser más rápido, más barato y tuyo: kernels que sacan más de cada vatio, serving sin Python de por medio y una memoria que se queda en tu equipo. Es también la base de los asistentes personales local-first.',
      'El acceso a la inteligencia no debe depender de la geografía, la riqueza ni las credenciales. Un modelo que necesita un centro de datos, un presupuesto o una credencial no es acceso. Uno que corre en un equipo que ya tienes, sí.',
    ],
    constraintsLabel: 'Dos límites que nos imponemos',
    constraints: [
      'Funciona en hardware de consumo.',
      'Tus datos se quedan en tu equipo a menos que tú lo autorices.',
    ],
  },
  beliefs: {
    title: 'En qué *creemos*.',
    intro: 'Siete tesis que guían lo que construimos.',
    theses: [
      {
        statement:
          'La demanda de inteligencia es ilimitada. Los recursos que la sostienen, no.',
        body: 'Escalar la inferencia exige más que nuevos centros de datos y más energía. Exige sacar más trabajo útil de cada unidad de cómputo y de energía, para que el acceso crezca más rápido que el costo, la demanda de energía y el impacto ambiental.',
      },
      {
        statement:
          'Cuando el límite es la energía, la eficiencia es la variable.',
        body: 'Los tokens por vatio y los dólares por carga de trabajo son las cifras que todavía se pueden mejorar.',
      },
      {
        statement: 'La demanda de cómputo es insaciable.',
        body: 'Cada mejora de eficiencia se gasta en más inteligencia: la paradoja de Jevons en acción. Por eso el trabajo de eficiencia nunca termina.',
      },
      {
        statement:
          'Los modelos suficientemente buenos en hardware convencional están cerca.',
        body: 'En unos dos años, los modelos que corran en el hardware que la gente ya tiene serán lo bastante buenos para un trabajo con sentido. La ley de Moore y el rápido avance de la IA siguen acumulando efecto.',
      },
      {
        statement:
          'Todos tendremos un asistente personal, o un equipo de ellos.',
        body: 'Y esos asistentes hablarán entre sí.',
      },
      {
        statement: 'Las personas quieren tener el control.',
        body: 'Un asistente tiene que ser una extensión de confianza de ti mismo: útil, cercano, nada intimidante. Esa relación será tan personal como la que tienes con tu teléfono.',
      },
      {
        statement:
          'El acceso a la inteligencia no debe depender de la geografía, la riqueza ni las credenciales.',
        body: 'Elevar el potencial de ingresos en todas partes exige un acceso abierto y local a la inteligencia.',
      },
    ],
  },
  values: {
    title: 'Lo que *valoramos*.',
    intro: 'Catorce valores que guían cómo decidimos.',
    items: [
      {
        name: 'Libertad',
        line: 'Dar libertad a través del acceso a la tecnología es fundamental para lo que construimos.',
      },
      {
        name: 'Autonomía',
        line: 'Construimos sistemas que devuelven tiempo a las personas.',
      },
      {
        name: 'Iniciativa',
        line: 'Si algo hay que hacer y eres quien está en mejor posición, empieza.',
      },
      {
        name: 'Respeto',
        line: 'Tratamos a las personas como colegas capaces.',
      },
      {
        name: 'Confianza',
        line: 'Se gana despacio y se pierde en un instante.',
      },
      {
        name: 'Honestidad',
        line: 'Decimos con franqueza el estado, los riesgos, los errores y los límites.',
      },
      {
        name: 'Integridad',
        line: 'Cumple lo que prometes. No lances lo que no defenderías.',
      },
      {
        name: 'Igualdad de oportunidades',
        line: 'El acceso a la inteligencia no debe depender de la geografía, la riqueza ni las credenciales.',
      },
      { name: 'Compasión', line: 'Nos importan las personas como personas.' },
      {
        name: 'Meritocracia',
        line: 'Gana la mejor idea, según la evidencia y el impacto.',
      },
      {
        name: 'Método científico',
        line: 'Plantea una hipótesis, mide, reproduce. Los benchmarks valen más que las opiniones.',
      },
      {
        name: 'Decisiones y acciones rápidas',
        line: 'Preferimos lanzar, medir y aprender.',
      },
      {
        name: 'Prudencia fiscal',
        line: 'Gastamos tiempo y dinero como si fueran escasos.',
      },
      {
        name: 'Disfrutar',
        line: 'Los problemas difíciles merecen equipos que disfruten del trabajo.',
      },
    ],
  },
  teamTeaser: {
    title: 'Las personas *detrás*.',
    body: 'Investigación, seguridad, ingresos y un par de fundadores que ya han llevado productos al mercado.',
    cta: 'Conoce al equipo',
    portraitAlt: 'Retrato de {name}',
  },
  hiring: {
    label: 'Estamos contratando',
    title: 'Acerca una *silla*.',
    lines: [
      'Buscamos personas a las que les guste el trabajo de bajo nivel: kernels de GPU, motores de inferencia, Rust, Swift y Metal, y el producto que se construye encima.',
      'Trabajamos de forma asíncrona entre husos horarios. Además, somos una empresa que trabaja con agentes: personas y agentes construyendo juntos.',
      'Si esa es tu clase de cocina, cuéntanos qué te gustaría construir.',
    ],
    skillsLabel: 'En qué nos gusta trabajar',
    skills: [
      'GPU de bajo nivel',
      'Kernels',
      'Inferencia',
      'Rust',
      'Swift y Metal',
      'Producto',
    ],
    cta: 'Ponte en contacto',
  },
  cta: {
    title: 'Pruébalo *antes*.',
    body: 'Nuestros productos son privados por ahora. Solicita acceso anticipado o cuéntanos qué quieres ejecutar en el hardware que ya tienes.',
  },
};

export default aboutEs;
