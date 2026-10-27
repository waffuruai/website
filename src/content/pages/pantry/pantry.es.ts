import type { pantry } from './pantry';

const pantryEs: (typeof pantry)['en'] = {
  seo: {
    title: 'Pantry: escáner de vulnerabilidades gratuito para macOS y Linux',
    description:
      'Pantry detecta vulnerabilidades que de verdad afectan a tu equipo y corrige lo que puede sin riesgo. Gratis, de código abierto, en Rust. Sin telemetría ni IA.',
    keywords: [
      'escáner de vulnerabilidades',
      'escáner de CVE',
      'escáner de seguridad de código abierto',
      'parchear vulnerabilidades en macOS',
      'escáner de vulnerabilidades para Linux',
      'OSV',
      'CISA KEV',
      'wscanner',
    ],
  },
  hero: {
    label: 'Gratis · Código abierto · macOS y Linux',
    title: 'De expuesto a *parcheado*, en minutos.',
    lede: 'Pantry contrasta todo lo que hay instalado en tu Mac o equipo Linux, y cada repositorio que contiene, con datos abiertos de vulnerabilidades. Solo informa de lo que de verdad te afecta, indica la versión que lo corrige y aplica las correcciones que puede hacer sin riesgo.',
    primary: 'Protege tu sistema',
    secondary: 'Más información',
    source: 'Ver el código fuente',
    windows: 'La compatibilidad con Windows está prevista.',
    windowsLink: 'Dinos si la necesitas',
  },
  how: {
    title: 'Instala. Escanea. Guarda en caché. *Corrige.*',
    intro:
      'Un solo binario pequeño hace todo el trabajo en tu equipo. De él solo salen nombres y versiones de paquetes.',
    caption: 'Salida de ejemplo de un equipo. La tuya será distinta.',
    stepsLabel: 'Cómo funciona Pantry',
    pause: 'Pausa',
    play: 'Reproducir',
    steps: [
      {
        id: 'install',
        label: 'Instalar',
        title: 'Verificado antes de ejecutarse',
        body: 'Pantry puede leer todo tu directorio personal, así que cada versión está firmada, tiene hash y se compila de forma reproducible. packslip o GitHub comprueban la descarga antes de que llegue a ejecutarse.',
        flow: ['Versión firmada', 'Firma + SHA-256', 'Tu equipo'],
        note: 'Una descarga que no supera alguna de las dos comprobaciones nunca se instala.',
      },
      {
        id: 'scan',
        label: 'Escanear',
        title: 'Solo lo que te afecta',
        body: 'Pantry hace inventario de tus runtimes, paquetes, apps y el lockfile de cada repositorio, y consulta a OSV.dev, CISA KEV y endoflife.date por esas versiones exactas. Nada que no tengas instalado aparece en el informe.',
        flow: [
          'Tu equipo',
          'Nombres + versiones',
          'OSV.dev · CISA KEV · endoflife.date',
        ],
        note: 'El contenido de los archivos, las rutas y los secretos nunca salen de tu equipo.',
      },
      {
        id: 'cache',
        label: 'Caché',
        title: 'Segundos, la segunda vez',
        body: 'Las respuestas se guardan en una base de datos SQLite en tu disco, junto con un registro de cada ejecución. Un segundo escaneo el mismo día tarda segundos, y puedes buscar en los avisos sin conexión.',
        flow: ['Datos abiertos', 'SQLite en tu disco', 'Tu próximo escaneo'],
        note: 'La caché es tuya: SQLite normal que puedes consultar en modo de solo lectura.',
      },
      {
        id: 'fix',
        label: 'Corregir',
        title: 'Correcciones de confianza',
        body: 'Revisa el plan y deja que Pantry ejecute las actualizaciones seguras, a nivel de usuario, y vuelva a comprobar. Lo que necesite sudo o un cambio de código se te muestra para que lo ejecutes tú.',
        flow: ['El plan', 'Actualizaciones seguras', 'Nueva comprobación'],
        note: 'Pantry nunca ejecuta sudo ni modifica tu código.',
      },
    ],
  },
  install: {
    title: 'Protege tu *sistema*.',
    intro:
      'Elige cuánto quieres comprobar por tu cuenta. Todas las vías verifican la versión antes de que se ejecute nada.',
    methods: [
      {
        id: 'packslip',
        label: 'Una línea',
        title: 'Con packslip',
        body: 'Descarga la compilación para tu plataforma y comprueba su firma y su SHA-256 antes de instalarla.',
        link: '¿Qué es packslip?',
      },
      {
        id: 'verify',
        label: 'A mano',
        title: 'Verifícalo tú mismo',
        body: 'Descarga el binario, compruébalo con SHA256SUMS y con su atestación de compilación de GitHub, y luego instálalo. También se incluye un bundle de cosign.',
        link: 'Guía de instalación completa',
      },
      {
        id: 'cargo',
        label: 'Desde el código',
        title: 'Compílalo con cargo',
        body: 'Compila desde crates.io con las versiones exactas de las dependencias del lockfile. Necesita una toolchain de Rust y un compilador de C.',
      },
    ],
    then: 'Después, escanea y revisa el plan:',
  },
  checks: {
    title: 'Todo lo que hay en las *estanterías*.',
    intro:
      'Revisar la despensa es ver qué tienes, qué está caducado y qué han retirado del mercado. Pantry hace lo mismo.',
    items: [
      {
        title: 'Todo lo instalado',
        body: 'Runtimes y compiladores (cada versión que guardan tus gestores de versiones), gestores de paquetes, herramientas de CLI, almacenes de datos, Docker, Homebrew y paquetes globales.',
      },
      {
        title: 'El lockfile de cada repositorio',
        body: 'Cargo, npm, pnpm, yarn, bun, Go, uv, poetry, pip, Bundler, Composer y más, antes de que se publique código vulnerable.',
      },
      {
        title: 'Malware, no solo CVE',
        body: 'Cada nombre de paquete, contrastado con el índice de paquetes maliciosos de OpenSSF, y las extensiones del editor, con la lista de extensiones maliciosas de VS Code.',
      },
      {
        title: 'Secretos filtrados',
        body: 'Credenciales presentes en cualquier commit del historial de git de un repositorio. El informe las muestra ocultas.',
      },
      {
        title: 'Tus herramientas de programación con IA',
        body: 'Lo que de verdad ejecutan Claude Code, Codex, Cursor, Gemini CLI y otros agentes: sus servidores MCP, plugins, skills y paquetes incluidos.',
      },
      {
        title: 'Sistema operativo, navegadores y apps',
        body: 'Actualización de software de macOS, los paquetes de las principales distribuciones de Linux, Chrome, Firefox, apps de Electron y otras apps, comparados con sus últimas versiones.',
      },
      {
        title: 'Fin de vida',
        body: 'Runtimes y almacenes de datos que ya no reciben parches de seguridad, con la fecha en que dejaron de recibirlos.',
      },
      {
        title: 'Autoridades de certificación comprometidas',
        body: 'Los almacenes de confianza de tu sistema, OpenSSL, Homebrew, Python y Node, contrastados con las autoridades de certificación que se sabe que ya no son de confianza.',
      },
      {
        title: 'Riesgo en la cadena de suministro',
        body: 'Licencias fuera de tu lista permitida, scripts de instalación de npm y las imágenes de contenedor a partir de las que se construyen tus repositorios.',
      },
    ],
  },
  trust: {
    title: 'Hecho para merecer tu *confianza*.',
    intro:
      'Una herramienta de seguridad ve todo tu equipo. Por eso Pantry mantiene su propia huella al mínimo y cada afirmación, verificable.',
    items: [
      {
        title: 'Sin telemetría',
        body: 'Pantry nunca informa sobre ti. Lo único que envía son nombres y versiones de paquetes a OSV.dev, para consultarlos.',
      },
      {
        title: 'Sin IA',
        body: 'Código simple y determinista. El mismo equipo obtiene la misma respuesta, siempre.',
      },
      {
        title: 'Escrito en Rust',
        body: 'Seguro en memoria, con el código unsafe prohibido, compilado en un único binario estático.',
      },
      {
        title: 'Pocas dependencias',
        body: 'Un puñado de crates de Rust con versión fijada, revisados uno a uno. Sin runtime que instalar.',
      },
      {
        title: 'Versionado y con hash',
        body: 'Cada versión se etiqueta, se recompila byte a byte antes de publicarse y aparece en SHA256SUMS.',
      },
      {
        title: 'Dos formas de verificar',
        body: 'Comprueba una descarga con packslip o con su atestación de compilación de GitHub antes de que se ejecute.',
      },
      {
        title: 'Primero, solo lectura',
        body: 'Un escaneo no cambia nada. Las correcciones solo se ejecutan cuando lo pides, y nunca con sudo.',
      },
      {
        title: 'Sin respuesta no es sin riesgo',
        body: 'Si no puede conectar con una fuente, Pantry dice “no comprobado”. Nunca lo da por seguro.',
      },
      {
        title: 'Gratis y de código abierto',
        body: 'Apache-2.0. Lee cada línea, haz un fork y ejecútalo en tantos equipos como quieras.',
      },
    ],
  },
  uses: {
    title: 'Para ti, tus agentes y tu *flota*.',
    intro:
      'El mismo binario en un portátil, dentro de tu agente de programación, en CI o en unos cuantos cientos de servidores.',
    items: [
      {
        title: 'Personas',
        body: 'Ejecútalo, lee el plan y aplica las correcciones seguras. El código de salida indica si algo todavía te necesita.',
      },
      {
        title: 'Agentes',
        body: 'Un JSON estructurado y una skill incluida (wscanner skill) enseñan a tu agente de programación a clasificar y corregir, sin ejecutar nunca sudo.',
      },
      {
        title: 'Flotas y CI',
        body: 'Apúntalo a un checkout, omite el equipo y haz que falle la compilación cuando algo tenga una corrección publicada.',
      },
    ],
  },
  faq: [
    {
      question: '¿Qué sale de mi equipo?',
      answer:
        'Nombres y versiones de paquetes, que se envían a OSV.dev, además de descargas de datos públicos como la lista Known Exploited Vulnerabilities de CISA y endoflife.date. El contenido de los archivos, las rutas y los secretos nunca salen. La única excepción es la comprobación opcional de filtraciones de tu correo electrónico, y solo se ejecuta después de que digas que sí.',
    },
    {
      question: '¿Necesita sudo?',
      answer:
        'No. Pantry se ejecuta con tu usuario. Las correcciones que necesitan sudo, como los paquetes del sistema operativo, se te muestran para que las ejecutes tú.',
    },
    {
      question: '¿Por qué es gratis?',
      answer:
        'Porque la seguridad no debería depender de lo que puedas pagar. Cuando los datos de vulnerabilidades están tras un muro de pago, quienes menos pueden permitirse una brecha son los más expuestos. Pantry usa datos abiertos y es gratis para todos.',
    },
    {
      question: '¿En qué se diferencia de un feed de CVE?',
      answer:
        'Un feed enumera todo lo que se ha roto, en cualquier parte. Pantry te dice qué afecta a las versiones exactas de tu equipo y qué versión lo corrige.',
    },
    {
      question: '¿Por qué se llama Pantry?',
      answer:
        'En inglés, pantry es la despensa. Revisarla te dice qué tienes, qué está caducado y qué han retirado del mercado. Ese es el trabajo. El comando es wscanner.',
    },
    {
      question: '¿Funciona en Windows?',
      answer:
        'Todavía no. Hoy Pantry funciona en macOS y Linux. La compatibilidad con Windows está prevista y la demanda marcará la fecha, así que dinos si la necesitas.',
    },
    {
      question: '¿Puede usarlo mi agente de IA?',
      answer:
        'Sí. wscanner --json le da a tu agente resultados estructurados, y wscanner skill imprime una skill que le enseña a clasificar y corregir, y a no ejecutar nunca los pasos que necesitan sudo.',
    },
  ],
  cta: {
    title: 'Revisa tu *despensa*.',
    body: 'Gratis, de código abierto y verificado antes de ejecutarse. Si quieres, lee primero el código. Para eso está.',
  },
};

export default pantryEs;
