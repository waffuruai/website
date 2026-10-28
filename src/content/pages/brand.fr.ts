import { mailto } from '@/content/site';
import type { brand } from './brand';

const brandFr: (typeof brand)['en'] = {
  seo: {
    title: 'Charte de marque et kit presse',
    description:
      'Téléchargez le logo gaufre de Waffuru et découvrez notre logotype, nos couleurs, nos polices et nos motifs, avec quelques règles d’usage. Contact presse inclus.',
    keywords: ['logo Waffuru', 'identité visuelle', 'kit presse'],
  },
  hero: {
    label: 'Marque',
    title: 'Notre marque, *prête* à l’emploi.',
    lede: 'Le logo gaufre, le logotype, les couleurs, la typographie et les motifs, avec quelques règles pour les utiliser. Vous écrivez sur Waffuru ? Commencez ici.',
    actions: [
      { label: 'Télécharger le logo', href: '#mark' },
      { label: 'Contact presse', href: mailto('Press'), variant: 'outline' },
    ],
  },
  mark: {
    title: 'Le *logo*.',
    intro:
      'Une gaufre avec une noix de beurre et du sirop qui coule sur le côté. Le fond est transparent : elle se pose aussi bien sur un fond sombre que sur un fond clair.',
    darkLabel: 'Sur fond sombre',
    lightLabel: 'Sur fond clair',
    alt: 'Le logo gaufre de Waffuru : une gaufre avec une noix de beurre et du sirop qui coule.',
    downloadsLabel: 'Téléchargements',
    downloadAction: 'Télécharger',
    downloads: [
      {
        label: 'Original',
        detail: 'PNG · 384 × 384 · transparent',
        href: '/brand/waffuru-waffle.png',
        filename: 'waffuru-waffle.png',
      },
      {
        label: 'Web, grand format',
        detail: 'PNG · 384 × 384 · optimisé',
        href: '/img/brand/waffle-384.png',
        filename: 'waffuru-waffle-384.png',
      },
      {
        label: 'Web, petit format',
        detail: 'PNG · 160 × 160 · optimisé',
        href: '/img/brand/waffle-160.png',
        filename: 'waffuru-waffle-160.png',
      },
    ],
  },
  wordmark: {
    title: 'Le *logotype*.',
    intro:
      'Le logo, « waffuru » en minuscules serif, et ワッフル, la transcription de « waffle » en katakana, placée à côté.',
    darkLabel: 'Sur fond sombre',
    lightLabel: 'Sur fond clair',
    namingLabel: 'Dénomination',
    rules: [
      {
        term: 'Waffuru',
        body: 'Avec une majuscule dans le texte courant et les titres. Le « waffuru » en minuscules appartient au seul logotype.',
      },
      {
        term: 'Iron, Butter, Syrup, Whisk',
        body: 'Les quatre produits, toujours avec une majuscule et jamais traduits, dans toutes les langues.',
      },
      {
        term: 'ワッフル',
        body: 'Katakana de « waffle ». Il accompagne le logotype en clin d’œil au nom, sans le remplacer dans le texte courant.',
      },
      {
        term: 'Le logo gaufre',
        body: 'Appelez l’image « le logo gaufre ».',
      },
    ],
    origin:
      '« Waffuru » est la façon dont le japonais dit gaufres. Le nom est un clin d’œil à l’amour du manga, à un amour partagé des gaufres et à une mission mondiale.',
  },
  colour: {
    title: 'La *palette*.',
    intro:
      'La torréfaction foncée est la base par défaut, avec une typographie crème et un seul accent doré. Le thème clair inverse le fond et assombrit l’or lorsqu’il sert de texte. Copiez n’importe quelle valeur hexadécimale.',
    darkLabel: 'Sombre (par défaut)',
    lightLabel: 'Clair',
    dark: [
      {
        name: 'Torréfaction',
        token: '--roast',
        hex: '#0a0908',
        role: 'Le fond de la page.',
      },
      {
        name: 'Torréfaction relevée',
        token: '--roast-raised',
        hex: '#12100e',
        role: 'Cartes et surfaces en relief.',
      },
      {
        name: 'Crème',
        token: '--cream',
        hex: '#ede8df',
        role: 'Texte et boutons principaux.',
      },
      {
        name: 'Or',
        token: '--gold',
        hex: '#e8a33d',
        role: 'L’accent : aplats, points et le mot en italique.',
      },
      {
        name: 'Doux',
        token: '--soft',
        hex: '#d2ccc1',
        role: 'Texte secondaire.',
      },
      {
        name: 'Atténué',
        token: '--muted-foreground',
        hex: '#aba599',
        role: 'Légendes et mentions en petits caractères.',
      },
      {
        name: 'Pâle',
        token: '--faint',
        hex: '#8a847a',
        role: 'Décoration uniquement, jamais du texte.',
      },
      {
        name: 'Éteint',
        token: '--off',
        hex: '#2a2622',
        role: 'LED éteintes, tampons et barres inactifs.',
      },
    ],
    light: [
      {
        name: 'Fond',
        token: '--background',
        hex: '#f4efe6',
        role: 'Le fond de la page.',
      },
      {
        name: 'Carte',
        token: '--card',
        hex: '#fbf8f2',
        role: 'Cartes et surfaces en relief.',
      },
      {
        name: 'Encre',
        token: '--foreground',
        hex: '#0a0908',
        role: 'Texte et boutons principaux.',
      },
      {
        name: 'Or',
        token: '--brand',
        hex: '#e8a33d',
        role: 'Aplats et points, identiques au thème sombre.',
      },
      {
        name: 'Encre de marque',
        token: '--brand-ink',
        hex: '#8a5514',
        role: 'L’or utilisé comme texte, assombri pour rester lisible sur fond clair.',
      },
      {
        name: 'Doux',
        token: '--soft',
        hex: '#3b362f',
        role: 'Texte secondaire.',
      },
      {
        name: 'Atténué',
        token: '--muted-foreground',
        hex: '#5c554b',
        role: 'Légendes et mentions en petits caractères.',
      },
      {
        name: 'Éteint',
        token: '--off',
        hex: '#ddd5c8',
        role: 'LED éteintes, tampons et barres inactifs.',
      },
    ],
  },
  type: {
    title: 'Trois *polices*.',
    intro:
      'Instrument Serif compose les titres, Geist porte le texte et Geist Mono étiquette les détails. Les pages en chinois, en japonais et en coréen utilisent les polices propres à chaque plateforme.',
    faces: [
      {
        key: 'serif',
        name: 'Instrument Serif',
        role: 'Titrage',
        use: 'Titres, logotype et mot d’accent en italique.',
        sample: 'Des maths brutes, *pressées* dans le silicium.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Instrument Serif sur GitHub',
          href: 'https://github.com/Instrument/instrument-serif',
        },
      },
      {
        key: 'sans',
        name: 'Geist',
        role: 'Texte',
        use: 'Texte courant, boutons et interface.',
        sample:
          'Kernels GPU, inférence, pilotage de flotte et mémoire pour le matériel que vous possédez déjà.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Geist sur GitHub',
          href: 'https://github.com/vercel/geist-font',
        },
      },
      {
        key: 'mono',
        name: 'Geist Mono',
        role: 'Étiquettes',
        use: 'Étiquettes en capitales, index et code.',
        sample: '01 · Kernels   02 · Serving   03 · Plan de contrôle',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Geist Mono sur GitHub',
          href: 'https://github.com/vercel/geist-font',
        },
      },
    ],
    licence:
      'Les trois polices sont libres d’utilisation sous la licence SIL Open Font.',
    licenceLink: {
      label: 'Lire la licence SIL Open Font',
      href: 'https://openfontlicense.org',
    },
  },
  motifs: {
    title: 'Des motifs en *mouvement*.',
    intro:
      'Du CSS pur, tiré des produits : des alvéoles qui s’illuminent, un tampon, une noix de beurre qui fond, des voyants d’état et une goutte de sirop. Tout s’immobilise quand l’appareil du visiteur demande de réduire les animations.',
    items: [
      {
        key: 'tiles',
        name: 'Alvéoles de gaufre',
        description:
          'Une grille d’alvéoles, dont quelques-unes brillent en or.',
      },
      {
        key: 'stamps',
        name: 'Tampons',
        description: 'Une grille pressée case par case. Le motif d’Iron.',
      },
      {
        key: 'pat',
        name: 'Noix de beurre',
        description: 'Une noix qui fond puis se reforme. Le motif de Butter.',
      },
      {
        key: 'leds',
        name: 'LED',
        description: 'Une baie de voyants d’état. Le motif de Syrup.',
      },
      {
        key: 'drip',
        name: 'Goutte',
        description:
          'Une goutte qui coule le long d’une ligne. Le motif de Whisk.',
      },
    ],
  },
  usage: {
    title: 'Les *règles* de la maison.',
    intro: 'Courtes, et surtout de bon sens.',
    doLabel: 'À faire',
    dontLabel: 'À ne pas faire',
    dos: [
      'Écrivez Waffuru avec un W majuscule. N’utilisez « waffuru » en minuscules que dans le logotype.',
      'Écrivez Iron, Butter, Syrup et Whisk tels quels, dans toutes les langues.',
      'Laissez de l’espace autour du logo gaufre, sur un fond sombre ou clair avec assez de contraste.',
      'Décrivez nos produits tels qu’ils sont : privés pour l’instant, avec un accès anticipé sur demande.',
      'Décrivez la prise en charge matérielle telle qu’elle est : Metal en premier, CUDA en second, ROCm et Vulkan fonctionnent mais ne sont pas encore optimisés.',
    ],
    donts: [
      'Recolorer, détourer, pivoter ou rogner le logo, ou y ajouter des effets.',
      'Redessiner le logotype ou le composer dans une autre police.',
      'Traduire ou abréger les noms de produits.',
      'Citer des chiffres de performance que nous n’avons pas publiés.',
      'Suggérer un partenariat, une recommandation ou une relation client qui n’existe pas. Demandez-nous d’abord.',
    ],
  },
  press: {
    title: 'Vous écrivez sur *nous* ?',
    body: 'Dites-nous sur quoi vous travaillez et pour quand. Nous vous enverrons des faits, des ressources ou un créneau pour en parler.',
    cta: 'Contacter la presse',
  },
};

export default brandFr;
