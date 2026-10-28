import { mailto } from '@/content/site';
import type { brand } from './brand';

const brandEs: (typeof brand)['en'] = {
  seo: {
    title: 'Marca y kit de prensa',
    description:
      'Descarga la marca del waffle de Waffuru y consulta el wordmark, los colores, las tipografías y los motivos, con reglas de uso. Incluye contacto de prensa.',
    keywords: ['logotipo de Waffuru', 'recursos de marca', 'kit de prensa'],
  },
  hero: {
    label: 'Marca',
    title: 'Nuestra marca, *lista* para usar.',
    lede: 'La marca del waffle, el wordmark, los colores, la tipografía y los motivos, con unas pocas reglas para usarlos. ¿Escribes sobre Waffuru? Empieza aquí.',
    actions: [
      { label: 'Descargar la marca', href: '#mark' },
      {
        label: 'Contacto de prensa',
        href: mailto('Press'),
        variant: 'outline',
      },
    ],
  },
  mark: {
    title: 'La *marca*.',
    intro:
      'Un waffle con una porción de mantequilla y jarabe resbalando por un lado. Tiene fondo transparente, así que funciona igual sobre fondos oscuros y claros.',
    darkLabel: 'Sobre oscuro',
    lightLabel: 'Sobre claro',
    alt: 'La marca del waffle de Waffuru: un waffle con una porción de mantequilla y jarabe resbalando.',
    downloadsLabel: 'Descargas',
    downloadAction: 'Descargar',
    downloads: [
      {
        label: 'Original',
        detail: 'PNG · 384 × 384 · transparente',
        href: '/brand/waffuru-waffle.png',
        filename: 'waffuru-waffle.png',
      },
      {
        label: 'Web, grande',
        detail: 'PNG · 384 × 384 · optimizado',
        href: '/img/brand/waffle-384.png',
        filename: 'waffuru-waffle-384.png',
      },
      {
        label: 'Web, pequeña',
        detail: 'PNG · 160 × 160 · optimizado',
        href: '/img/brand/waffle-160.png',
        filename: 'waffuru-waffle-160.png',
      },
    ],
  },
  wordmark: {
    title: 'El *wordmark*.',
    intro:
      'La marca, “waffuru” en minúsculas con serifa y ワッフル, el katakana de “waffle”, a su lado.',
    darkLabel: 'Sobre oscuro',
    lightLabel: 'Sobre claro',
    namingLabel: 'Nombres',
    rules: [
      {
        term: 'Waffuru',
        body: 'Con mayúscula inicial en el texto corrido y en los titulares. La forma en minúsculas “waffuru” pertenece solo al wordmark.',
      },
      {
        term: 'Iron, Butter, Syrup, Whisk',
        body: 'Los cuatro productos, siempre con mayúscula inicial y nunca traducidos, en todos los idiomas.',
      },
      {
        term: 'ワッフル',
        body: 'Katakana de “waffle”. Acompaña al wordmark como guiño al nombre y no lo sustituye en el texto corrido.',
      },
      {
        term: 'La marca del waffle',
        body: 'Llama a la imagen “la marca del waffle”.',
      },
    ],
    origin:
      '“Waffuru” es como se dice waffles en japonés. El nombre es un guiño al amor por el manga, a un cariño compartido por los waffles y a una misión global.',
  },
  colour: {
    title: 'La *paleta*.',
    intro:
      'El tueste oscuro es el tema por defecto, con texto crema y un único acento dorado. El tema claro cambia el fondo y oscurece el dorado cuando se usa como texto. Copia cualquier valor hex.',
    darkLabel: 'Oscuro (por defecto)',
    lightLabel: 'Claro',
    dark: [
      {
        name: 'Tueste',
        token: '--roast',
        hex: '#0a0908',
        role: 'El fondo de la página.',
      },
      {
        name: 'Tueste elevado',
        token: '--roast-raised',
        hex: '#12100e',
        role: 'Tarjetas y superficies elevadas.',
      },
      {
        name: 'Crema',
        token: '--cream',
        hex: '#ede8df',
        role: 'Texto y botones principales.',
      },
      {
        name: 'Dorado',
        token: '--gold',
        hex: '#e8a33d',
        role: 'El acento: rellenos, puntos y la palabra en cursiva.',
      },
      {
        name: 'Suave',
        token: '--soft',
        hex: '#d2ccc1',
        role: 'Texto secundario.',
      },
      {
        name: 'Atenuado',
        token: '--muted-foreground',
        hex: '#aba599',
        role: 'Pies de foto y letra pequeña.',
      },
      {
        name: 'Tenue',
        token: '--faint',
        hex: '#8a847a',
        role: 'Solo decoración, nunca texto.',
      },
      {
        name: 'Apagado',
        token: '--off',
        hex: '#2a2622',
        role: 'LED, sellos y barras apagados.',
      },
    ],
    light: [
      {
        name: 'Fondo',
        token: '--background',
        hex: '#f4efe6',
        role: 'El fondo de la página.',
      },
      {
        name: 'Tarjeta',
        token: '--card',
        hex: '#fbf8f2',
        role: 'Tarjetas y superficies elevadas.',
      },
      {
        name: 'Tinta',
        token: '--foreground',
        hex: '#0a0908',
        role: 'Texto y botones principales.',
      },
      {
        name: 'Dorado',
        token: '--brand',
        hex: '#e8a33d',
        role: 'Rellenos y puntos, igual que en oscuro.',
      },
      {
        name: 'Tinta de marca',
        token: '--brand-ink',
        hex: '#8a5514',
        role: 'El dorado usado como texto, oscurecido para leerse sobre fondo claro.',
      },
      {
        name: 'Suave',
        token: '--soft',
        hex: '#3b362f',
        role: 'Texto secundario.',
      },
      {
        name: 'Atenuado',
        token: '--muted-foreground',
        hex: '#5c554b',
        role: 'Pies de foto y letra pequeña.',
      },
      {
        name: 'Apagado',
        token: '--off',
        hex: '#ddd5c8',
        role: 'LED, sellos y barras apagados.',
      },
    ],
  },
  type: {
    title: 'Tres *tipografías*.',
    intro:
      'Instrument Serif compone los titulares, Geist lleva el texto y Geist Mono etiqueta los detalles. Las páginas en chino, japonés y coreano usan las fuentes propias de cada plataforma.',
    faces: [
      {
        key: 'serif',
        name: 'Instrument Serif',
        role: 'Titulares',
        use: 'Titulares, el wordmark y la palabra en cursiva del acento.',
        sample: 'Matemática pura, *prensada* en silicio.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Instrument Serif en GitHub',
          href: 'https://github.com/Instrument/instrument-serif',
        },
      },
      {
        key: 'sans',
        name: 'Geist',
        role: 'Texto',
        use: 'Texto corrido, botones e interfaz.',
        sample:
          'Kernels, inferencia, un plano de control, memoria y un harness de agentes, para hardware propio o alquilado.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Geist en GitHub',
          href: 'https://github.com/vercel/geist-font',
        },
      },
      {
        key: 'mono',
        name: 'Geist Mono',
        role: 'Etiquetas',
        use: 'Etiquetas en mayúsculas, índices y código.',
        sample: '01 · Kernels   02 · Serving   03 · Plano de control',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Geist Mono en GitHub',
          href: 'https://github.com/vercel/geist-font',
        },
      },
    ],
    licence:
      'Las tres tipografías son de uso libre bajo la SIL Open Font License.',
    licenceLink: {
      label: 'Leer la SIL Open Font License',
      href: 'https://openfontlicense.org',
    },
  },
  motifs: {
    title: 'Motivos, en *movimiento*.',
    intro:
      'CSS puro, tomado de los productos, de arriba abajo del stack: dos opciones para Pantry, casillas que brillan, un batidor, gotas de jarabe, mantequilla que se derrite, una prensa y luces de estado. Dejan de moverse cuando el dispositivo del visitante pide reducir el movimiento.',
    items: [
      {
        key: 'jar',
        name: 'Tarro sellado',
        description:
          'Una tapa que se enrosca y un sello dorado: verificado antes de ejecutarse. Una opción para Pantry.',
      },
      {
        key: 'shelf',
        name: 'Revisión de estantes',
        description:
          'Un escaneo por los estantes, y el único tarro caducado cambiado por uno nuevo. Una opción para Pantry.',
      },
      {
        key: 'tiles',
        name: 'Casillas de waffle',
        description: 'Una cuadrícula de casillas, algunas brillando en dorado.',
      },
      {
        key: 'whisk',
        name: 'Batidor',
        description:
          'Varillas que giran en un bol e incorporan oro a la mezcla. El motivo de Whisk.',
      },
      {
        key: 'drips',
        name: 'Goteo',
        description:
          'Jarabe que se acumula y gotea; cada gota, un dato. El motivo de Syrup.',
      },
      {
        key: 'pat',
        name: 'Mantequilla derretida',
        description:
          'Una porción que se derrite en un charco brillante y lo engrasa todo. El motivo de Butter.',
      },
      {
        key: 'stamps',
        name: 'Prensa',
        description: 'Una prensa que baja fila por fila. El motivo de Iron.',
      },
      {
        key: 'leds',
        name: 'LED',
        description:
          'Un rack de luces de estado, reservado para un producto que aún está en camino.',
      },
    ],
  },
  usage: {
    title: 'Reglas de la *casa*.',
    intro: 'Breves y, sobre todo, de sentido común.',
    doLabel: 'Sí',
    dontLabel: 'No',
    dos: [
      'Escribir Waffuru con W mayúscula. Usar “waffuru” en minúsculas solo en el wordmark.',
      'Escribir Iron, Butter, Syrup y Whisk tal como aparecen, en todos los idiomas.',
      'Dar espacio a la marca del waffle, sobre un fondo oscuro o claro con contraste suficiente.',
      'Describir nuestros productos como son: privados por ahora, con acceso anticipado bajo solicitud.',
      'Describir el soporte de hardware como es: primero Metal, después CUDA; ROCm y Vulkan funcionan, pero aún sin afinar.',
    ],
    donts: [
      'Cambiar el color, perfilar, girar, recortar o añadir efectos a la marca.',
      'Redibujar el wordmark o componerlo en otra tipografía.',
      'Traducir o abreviar los nombres de los productos.',
      'Citar cifras de rendimiento que no hayamos publicado.',
      'Insinuar una alianza, un aval o una relación de cliente que no existe. Pregúntanos antes.',
    ],
  },
  press: {
    title: '¿Escribes sobre *nosotros*?',
    body: 'Cuéntanos en qué estás trabajando y para cuándo lo publicas. Te enviaremos datos, recursos o un momento para hablar.',
    cta: 'Contactar con prensa',
  },
};

export default brandEs;
