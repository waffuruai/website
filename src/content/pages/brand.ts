import { mailto } from '@/content/site';
import type { Cta, Localized, Seo } from '@/content/types';
import brandEs from './brand.es';
import brandFr from './brand.fr';
import brandZh from './brand.zh';
import brandJa from './brand.ja';
import brandKo from './brand.ko';

/*
 * Brand and press kit copy. English is the source of truth. Hex values are
 * shown as text for people to copy; `brand.test.ts` checks each one against
 * the tokens in `src/styles/tailwind.css`, so they cannot drift.
 * Use `*word*` in headings for the gold italic accent.
 */

export type Swatch = {
  name: string;
  /** The CSS custom property in `tailwind.css` this value comes from. */
  token: string;
  hex: string;
  role: string;
};

export type Download = {
  label: string;
  detail: string;
  /** A static file, linked as a plain `<a download>` (never localized). */
  href: string;
  filename: string;
};

export type NamingRule = { term: string; body: string };

export type TypeFace = {
  key: 'serif' | 'sans' | 'mono';
  name: string;
  role: string;
  use: string;
  /** `*word*` marks the gold italic accent in the serif specimen. */
  sample: string;
  glyphs: string;
  source: { label: string; href: string };
};

export type MotifKey =
  'jar' | 'shelf' | 'tiles' | 'whisk' | 'drips' | 'pat' | 'stamps' | 'leds';

export type BrandContent = {
  seo: Seo;
  hero: { label: string; title: string; lede: string; actions: Cta[] };
  mark: {
    title: string;
    intro: string;
    darkLabel: string;
    lightLabel: string;
    alt: string;
    downloadsLabel: string;
    downloadAction: string;
    downloads: Download[];
  };
  wordmark: {
    title: string;
    intro: string;
    darkLabel: string;
    lightLabel: string;
    namingLabel: string;
    rules: NamingRule[];
    origin: string;
  };
  colour: {
    title: string;
    intro: string;
    darkLabel: string;
    lightLabel: string;
    dark: Swatch[];
    light: Swatch[];
  };
  type: {
    title: string;
    intro: string;
    faces: TypeFace[];
    licence: string;
    licenceLink: { label: string; href: string };
  };
  motifs: {
    title: string;
    intro: string;
    items: { key: MotifKey; name: string; description: string }[];
  };
  usage: {
    title: string;
    intro: string;
    doLabel: string;
    dontLabel: string;
    dos: string[];
    donts: string[];
  };
  press: { title: string; body: string; cta: string };
};

export const brand: Localized<BrandContent> = {
  en: {
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
          term: 'Iron, Butter, Syrup, Whisk',
          body: 'The four products, always capitalized and never translated, in every language.',
        },
        {
          term: 'ワッフル',
          body: 'Katakana for “waffle”. It sits beside the wordmark as a nod to the name, and does not replace it in running text.',
        },
        {
          term: 'The waffle mark',
          body: 'Call the picture “the waffle mark”.',
        },
      ],
      origin:
        '“Waffuru” is how the Japanese say waffles. The name is a nod to our respect for Japanese culture and deep history, a shared love of waffles and a global mission.',
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
            'Kernels, inference, a control plane, memory and an agent harness, for hardware you own or rent.',
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
        'Pure CSS, drawn from the products, top of the stack down: two options for Pantry, tiles that glow, a whisk, syrup drips, melting butter, a press, and status lights. They stop moving when a visitor’s device asks for reduced motion.',
      items: [
        {
          key: 'jar',
          name: 'Sealed jar',
          description:
            'A lid twisting shut and a gold seal pressing on: checked before it runs. One option for Pantry.',
        },
        {
          key: 'shelf',
          name: 'Shelf check',
          description:
            'A scan down the shelves, and the one jar past its date swapped for a fresh one. One option for Pantry.',
        },
        {
          key: 'tiles',
          name: 'Waffle tiles',
          description: 'A grid of tiles, a few of them glowing gold.',
        },
        {
          key: 'whisk',
          name: 'Whisk',
          description:
            'Wire loops spinning in a bowl, folding gold into the mix. Whisk’s motif.',
        },
        {
          key: 'drips',
          name: 'Drips',
          description:
            'Syrup gathering and dripping, every drop a data point. Syrup’s motif.',
        },
        {
          key: 'pat',
          name: 'Melting butter',
          description:
            'A pat melting into a slick pool that greases the works. Butter’s motif.',
        },
        {
          key: 'stamps',
          name: 'Press',
          description: 'A press coming down one row at a time. Iron’s motif.',
        },
        {
          key: 'leds',
          name: 'LEDs',
          description:
            'A rack of status lights, held for a product still in the works.',
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
        'Write Iron, Butter, Syrup and Whisk as shown, in every language.',
        'Give the waffle mark room, on a dark or light ground with enough contrast.',
        'Describe our products as they are: private for now, with early access on request.',
        'Describe hardware support as it is: Metal primary, CUDA being tuned, ROCm and Vulkan coming soon (they run, not tuned yet).',
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
  },
  es: brandEs,
  fr: brandFr,
  zh: brandZh,
  ja: brandJa,
  ko: brandKo,
};
