import { mailto } from '@/content/site';
import type { brand } from './brand';

// TODO(i18n): translate to zh. Keep hrefs, slugs and product names.
const brandZh: (typeof brand)['en'] = {
  seo: {
    title: 'Brand and press kit',
    description:
      'Download the Waffuru waffle mark and see our wordmark, colours, typefaces and motifs, with a few rules for using them. Press contact included.',
    keywords: ['Waffuru logo', 'brand assets', 'press kit'],
  },
  hero: {
    label: 'Brand',
    title: 'Our brand, *ready* to use.',
    lede: 'The waffle mark, the wordmark, colours, type and motifs, with a few rules for using them. Writing about Waffuru? Start here.',
    actions: [
      { label: 'Download the mark', href: '#mark' },
      { label: 'Press contact', href: mailto('Press'), variant: 'outline' },
    ],
  },
  mark: {
    title: 'The *mark*.',
    intro:
      'A waffle with a pat of butter and syrup running down the side. It has a transparent background, so it sits on dark and light grounds alike.',
    darkLabel: 'On dark',
    lightLabel: 'On light',
    alt: 'The Waffuru waffle mark: a waffle with a pat of butter and syrup running down.',
    downloadsLabel: 'Downloads',
    downloadAction: 'Download',
    downloads: [
      {
        label: 'Original',
        detail: 'PNG · 384 × 384 · transparent',
        href: '/brand/waffuru-waffle.png',
        filename: 'waffuru-waffle.png',
      },
      {
        label: 'Web, large',
        detail: 'PNG · 384 × 384 · optimized',
        href: '/img/brand/waffle-384.png',
        filename: 'waffuru-waffle-384.png',
      },
      {
        label: 'Web, small',
        detail: 'PNG · 160 × 160 · optimized',
        href: '/img/brand/waffle-160.png',
        filename: 'waffuru-waffle-160.png',
      },
    ],
  },
  wordmark: {
    title: 'The *wordmark*.',
    intro:
      'The mark, “waffuru” in lowercase serif, and ワッフル, the katakana for waffle, set beside it.',
    darkLabel: 'On dark',
    lightLabel: 'On light',
    namingLabel: 'Naming',
    rules: [
      {
        term: 'Waffuru',
        body: 'Capitalized in running text and headings. The lowercase “waffuru” belongs to the wordmark alone.',
      },
      {
        term: 'Iron, Butter, Waffle, Syrup',
        body: 'The four products, always capitalized and never translated, in every language.',
      },
      {
        term: 'ワッフル',
        body: 'Katakana for “waffle”. It sits beside the wordmark as a nod to the name, and does not replace it in running text.',
      },
      {
        term: 'The waffle mark',
        body: 'Call the picture “the waffle mark”. Waffle with a capital W is our GPU control-plane product.',
      },
    ],
    origin:
      '“Waffuru” is how Japanese says waffles. The name is a nod to a love of manga, a shared love of waffles and a global mission.',
  },
  colour: {
    title: 'The *palette*.',
    intro:
      'Dark roast is the default, with cream type and one gold accent. The light theme swaps the ground and darkens the gold when it is used as text. Copy any hex value.',
    darkLabel: 'Dark (default)',
    lightLabel: 'Light',
    dark: [
      {
        name: 'Roast',
        token: '--roast',
        hex: '#0a0908',
        role: 'The page ground.',
      },
      {
        name: 'Roast raised',
        token: '--roast-raised',
        hex: '#12100e',
        role: 'Cards and raised surfaces.',
      },
      {
        name: 'Cream',
        token: '--cream',
        hex: '#ede8df',
        role: 'Text and primary buttons.',
      },
      {
        name: 'Gold',
        token: '--gold',
        hex: '#e8a33d',
        role: 'The accent: fills, dots and the italic word.',
      },
      {
        name: 'Soft',
        token: '--soft',
        hex: '#d2ccc1',
        role: 'Secondary copy.',
      },
      {
        name: 'Muted',
        token: '--muted-foreground',
        hex: '#aba599',
        role: 'Captions and fine print.',
      },
      {
        name: 'Faint',
        token: '--faint',
        hex: '#8a847a',
        role: 'Decoration only, never text.',
      },
      {
        name: 'Off',
        token: '--off',
        hex: '#2a2622',
        role: 'Unlit LEDs, stamps and bars.',
      },
    ],
    light: [
      {
        name: 'Background',
        token: '--background',
        hex: '#f4efe6',
        role: 'The page ground.',
      },
      {
        name: 'Card',
        token: '--card',
        hex: '#fbf8f2',
        role: 'Cards and raised surfaces.',
      },
      {
        name: 'Ink',
        token: '--foreground',
        hex: '#0a0908',
        role: 'Text and primary buttons.',
      },
      {
        name: 'Gold',
        token: '--brand',
        hex: '#e8a33d',
        role: 'Fills and dots, unchanged from dark.',
      },
      {
        name: 'Brand ink',
        token: '--brand-ink',
        hex: '#8a5514',
        role: 'Gold used as text, darkened to read on light.',
      },
      {
        name: 'Soft',
        token: '--soft',
        hex: '#3b362f',
        role: 'Secondary copy.',
      },
      {
        name: 'Muted',
        token: '--muted-foreground',
        hex: '#5c554b',
        role: 'Captions and fine print.',
      },
      {
        name: 'Off',
        token: '--off',
        hex: '#ddd5c8',
        role: 'Unlit LEDs, stamps and bars.',
      },
    ],
  },
  type: {
    title: 'Three *typefaces*.',
    intro:
      'Instrument Serif sets the headlines, Geist carries the text and Geist Mono labels the details. Chinese, Japanese and Korean pages use each platform’s own fonts.',
    faces: [
      {
        key: 'serif',
        name: 'Instrument Serif',
        role: 'Display',
        use: 'Headlines, the wordmark and the italic accent word.',
        sample: 'Raw math, *pressed* into silicon.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Instrument Serif on GitHub',
          href: 'https://github.com/Instrument/instrument-serif',
        },
      },
      {
        key: 'sans',
        name: 'Geist',
        role: 'Text',
        use: 'Body copy, buttons and interface.',
        sample:
          'GPU kernels, inference, fleet control and memory for the hardware you already own.',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Geist on GitHub',
          href: 'https://github.com/vercel/geist-font',
        },
      },
      {
        key: 'mono',
        name: 'Geist Mono',
        role: 'Labels',
        use: 'Caps labels, indices and code.',
        sample: '01 · Kernels   02 · Serving   03 · Control plane',
        glyphs:
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789',
        source: {
          label: 'Geist Mono on GitHub',
          href: 'https://github.com/vercel/geist-font',
        },
      },
    ],
    licence:
      'All three typefaces are free to use under the SIL Open Font License.',
    licenceLink: {
      label: 'Read the SIL Open Font License',
      href: 'https://openfontlicense.org',
    },
  },
  motifs: {
    title: 'Motifs, in *motion*.',
    intro:
      'Pure CSS, drawn from the products: tiles that glow, a stamp, a melting pat, status lights and a drop of syrup. They stop moving when a visitor’s device asks for reduced motion.',
    items: [
      {
        key: 'tiles',
        name: 'Waffle tiles',
        description: 'A grid of tiles, a few of them glowing gold.',
      },
      {
        key: 'stamps',
        name: 'Stamps',
        description: 'A grid pressed one square at a time. Iron’s motif.',
      },
      {
        key: 'pat',
        name: 'Butter pat',
        description: 'A pat that melts and resets. Butter’s motif.',
      },
      {
        key: 'leds',
        name: 'LEDs',
        description: 'A rack of status lights. Waffle’s motif.',
      },
      {
        key: 'drip',
        name: 'Drip',
        description: 'A drop running down a line. Syrup’s motif.',
      },
    ],
  },
  usage: {
    title: 'House *rules*.',
    intro: 'Short, and mostly common sense.',
    doLabel: 'Do',
    dontLabel: 'Don’t',
    dos: [
      'Write Waffuru with a capital W. Use the lowercase “waffuru” only in the wordmark.',
      'Write Iron, Butter, Waffle and Syrup as shown, in every language.',
      'Give the waffle mark room, on a dark or light ground with enough contrast.',
      'Describe our products as they are: private for now, with early access on request.',
      'Describe hardware support as it is: Metal first, CUDA second, ROCm and Vulkan running but not yet tuned.',
    ],
    donts: [
      'Recolour, outline, rotate, crop or add effects to the mark.',
      'Redraw the wordmark or set it in another typeface.',
      'Translate or shorten product names.',
      'Quote performance numbers we have not published.',
      'Imply a partnership, endorsement or customer relationship that does not exist. Ask us first.',
    ],
  },
  press: {
    title: 'Writing about *us*?',
    body: 'Tell us what you are working on and when it runs. We will send facts, assets or a time to talk.',
    cta: 'Contact press',
  },
};

export default brandZh;
