import localFont from 'next/font/local';

/*
 * The After Hours faces, self-hosted (SIL OFL, licences in src/fonts). Only
 * Instrument Serif roman and Geist are preloaded: they set the hero. The
 * italic (accent words) and Geist Mono (labels) load on first use.
 */
export const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/instrument-serif-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

/** Same family name as the roman, so `<em>` in a heading picks it up. */
export const instrumentSerifItalic = localFont({
  src: [
    {
      path: '../fonts/instrument-serif-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif-italic',
  display: 'swap',
  preload: false,
});

export const geist = localFont({
  src: '../fonts/geist-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-geist',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

export const geistMono = localFont({
  src: '../fonts/geist-mono-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'monospace'],
});
