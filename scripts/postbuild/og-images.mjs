import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import sharp from 'sharp';

import { builtPages } from './pages.mjs';
import { OG_LOCALES, SITE, SITE_URL } from './site.mjs';

/**
 * Share cards: one 1200x630 PNG per built page in each locale that renders
 * its own text, written to `out/og/<locale>/<slug>.png` (the path
 * `ogImagePath` in src/lib/seo.ts advertises; the home page is `index`).
 *
 * The card is an SVG in Tom's palette, rasterised by sharp, with the waffle
 * mark composited on top. librsvg cannot load our woff2 fonts, so type is set
 * in system stacks that sit close to Instrument Serif and Geist, and lines are
 * wrapped with a conservative width estimate because the real glyph widths
 * vary by machine.
 */

export const CARD = { width: 1200, height: 630 };
/** The most a card may weigh; the build fails past it. */
export const MAX_BYTES = 300 * 1024;

const GROUND = '#0A0908';
const CREAM = '#EDE8DF';
const SOFT = '#D2CCC1';
const MUTED = '#ABA599';
const GOLD = '#E8A33D';

const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const SANS = "Geist, 'Helvetica Neue', Arial, sans-serif";
const MONO =
  "'Geist Mono', ui-monospace, 'SF Mono', Menlo, 'DejaVu Sans Mono', monospace";

const PAD = 72;
/** Right edge of the text column; the waffle and tiles own the rest. */
const TEXT_WIDTH = 740;
const MARK = 288;

/* Text measuring ------------------------------------------------------------ */

/** An estimate of a glyph's advance, as a fraction of the font size. */
function advance(char) {
  if (char === ' ') return 0.29;
  if ("iIjl.,:;!|'`’()[]/-·".includes(char)) return 0.29;
  if ('ft'.includes(char)) return 0.34;
  if ('mw'.includes(char)) return 0.84;
  if ('MW@%'.includes(char)) return 0.94;
  if (/[0-9]/.test(char)) return 0.57;
  if (/\p{Lu}/u.test(char)) return 0.7;
  return 0.56;
}

/** Estimated width of `text` at `size` px, with a margin for font variance. */
export const measure = (text, size, family = SANS) =>
  [...text].reduce((total, char) => total + advance(char), 0) *
  size *
  (family === SERIF ? 1.05 : 1.02);

/** Greedy word wrap to `width` px; over-long text ends in an ellipsis. */
export function wrap(text, { size, width, maxLines, family = SANS }) {
  const lines = [];
  let line = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (!line || measure(candidate, size, family) <= width) line = candidate;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last.length > 1 && measure(`${last}…`, size, family) > width) {
    last = last.replace(/\s*\S+$/, '') || last.slice(0, -1);
  }
  kept[maxLines - 1] = `${last.replace(/[\s,.;:]+$/, '')}…`;
  return kept;
}

/* SVG ------------------------------------------------------------------------ */

const escapeXml = (text) =>
  text
    // Characters XML 1.0 cannot carry at all.
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** A stable 32-bit hash (FNV-1a), so a card's lit tiles never change. */
function hash(text) {
  let h = 0x811c9dc5;
  for (const char of text) {
    h ^= char.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

const TILE = 56;
const TILES_FROM = 520;

/** Where the waffle mark sits (tiles behind it stay plain). */
const markBox = () => ({
  left: CARD.width - PAD - MARK + 14,
  top: CARD.height - MARK - 56,
  size: MARK,
});

/** A few gold-washed tiles in the grid, chosen from the text. */
function hotTiles(seed) {
  const box = markBox();
  const cols = Math.ceil((CARD.width - TILES_FROM) / TILE);
  const rows = Math.ceil(CARD.height / TILE);
  const picked = new Set();
  let state = hash(seed) || 1;
  while (picked.size < 7) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const col = 4 + (state % (cols - 4));
    const row = (state >>> 12) % rows;
    const x = TILES_FROM + col * TILE;
    const y = row * TILE;
    const underMark =
      x + TILE > box.left &&
      x < box.left + box.size &&
      y + TILE > box.top &&
      y < box.top + box.size;
    if (!underMark) picked.add(`${col}:${row}`);
  }
  return [...picked].map((cell, index) => {
    const [col, row] = cell.split(':').map(Number);
    const opacity = [0.1, 0.16, 0.24][index % 3];
    return `<rect x="${TILES_FROM + col * TILE + 2}" y="${row * TILE + 2}" width="${TILE - 4}" height="${TILE - 4}" rx="4" fill="${GOLD}" fill-opacity="${opacity}"/>`;
  });
}

const TITLE_SIZES = [104, 92, 80, 70, 62, 56];
const TITLE_TOP = 168;
const DESC_SIZE = 29;
const DESC_LEADING = 41;
/** Nothing but the footer may sit below this. */
const BODY_BOTTOM = 528;

/**
 * Picks the biggest title size that wraps to at most three lines and still
 * leaves room for as much of the description as it needs (two lines under a
 * three-line title, otherwise three).
 */
export function layout(title, description) {
  const needed = wrap(description, {
    size: DESC_SIZE,
    width: TEXT_WIDTH,
    maxLines: 99,
  }).length;

  let fallback;
  for (const size of TITLE_SIZES) {
    const lines = wrap(title, {
      size,
      width: TEXT_WIDTH,
      maxLines: 3,
      family: SERIF,
    });
    const fits =
      lines.every((line) => measure(line, size, SERIF) <= TEXT_WIDTH) &&
      !lines.at(-1).endsWith('\u2026');
    const leading = Math.round(size * 1.04);
    const descTop = TITLE_TOP + lines.length * leading + 30;
    const room = Math.floor((BODY_BOTTOM - descTop) / DESC_LEADING);
    const want = Math.min(needed, lines.length >= 3 ? 2 : 3);
    fallback = { size, lines, leading, descTop, descLines: Math.max(1, room) };
    if (fits && room >= want) {
      return { ...fallback, descLines: want };
    }
  }
  return fallback;
}

/** The card as SVG; the waffle mark is composited on top afterwards. */
export function cardSvg({ title, description }) {
  const cleanTitle = title.replace(/\s+/g, ' ').trim() || SITE.name;
  const cleanDescription = description.replace(/\s+/g, ' ').trim();
  const {
    size,
    lines,
    leading,
    descTop,
    descLines: descCount,
  } = layout(cleanTitle, cleanDescription);
  const descSize = DESC_SIZE;
  const descLeading = DESC_LEADING;
  const descLines = wrap(cleanDescription, {
    size: descSize,
    width: TEXT_WIDTH,
    maxLines: descCount,
  });
  const titleTop = TITLE_TOP;

  const titleText = lines
    .map((line, index) => {
      const y = titleTop + index * leading + Math.round(size * 0.8);
      const last = index === lines.length - 1;
      // The final word takes the accent, as `<em>` does in the site headings.
      const at = last ? line.lastIndexOf(' ') + 1 : line.length;
      const head = escapeXml(line.slice(0, at));
      const tail = escapeXml(line.slice(at));
      return last
        ? `<text x="${PAD}" y="${y}">${head}<tspan fill="${GOLD}" font-style="italic">${tail}</tspan></text>`
        : `<text x="${PAD}" y="${y}">${head}</text>`;
    })
    .join('');

  const descText = descLines
    .map(
      (line, index) =>
        `<text x="${PAD}" y="${descTop + index * descLeading + 28}">${escapeXml(line)}</text>`,
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${CARD.height}" viewBox="0 0 ${CARD.width} ${CARD.height}">
<defs>
<pattern id="tiles" width="${TILE}" height="${TILE}" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="${TILE - 4}" height="${TILE - 4}" rx="4" fill="none" stroke="${CREAM}" stroke-opacity="0.09"/></pattern>
<linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${GROUND}" stop-opacity="1"/><stop offset="0.5" stop-color="${GROUND}" stop-opacity="0.96"/><stop offset="0.82" stop-color="${GROUND}" stop-opacity="0"/></linearGradient>
<radialGradient id="glow" cx="0.855" cy="0.72" r="0.34"><stop offset="0" stop-color="${GOLD}" stop-opacity="0.2"/><stop offset="1" stop-color="${GOLD}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${CARD.width}" height="${CARD.height}" fill="${GROUND}"/>
<rect x="${TILES_FROM}" width="${CARD.width - TILES_FROM}" height="${CARD.height}" fill="url(#tiles)"/>
${hotTiles(title + description).join('\n')}
<rect width="${CARD.width}" height="${CARD.height}" fill="url(#fade)"/>
<rect width="${CARD.width}" height="${CARD.height}" fill="url(#glow)"/>
<text x="${PAD}" y="102" font-family="${SERIF}" font-size="44" fill="${CREAM}" letter-spacing="-0.5">waffuru</text>
<g font-family="${SERIF}" font-size="${size}" fill="${CREAM}" letter-spacing="${(-size * 0.015).toFixed(1)}">${titleText}</g>
<g font-family="${SANS}" font-size="${descSize}" fill="${SOFT}">${descText}</g>
<circle cx="${PAD + 5}" cy="${CARD.height - 62}" r="5" fill="${GOLD}"/>
<text x="${PAD + 24}" y="${CARD.height - 54}" font-family="${MONO}" font-size="24" fill="${MUTED}" letter-spacing="1">${new URL(SITE_URL).host}</text>
</svg>`;
}

/* Rendering ------------------------------------------------------------------ */

/** The waffle mark, resized once for every card. */
export const loadMark = (root) =>
  sharp(join(root, 'assets/brand/waffle.png'))
    .resize(MARK, MARK)
    .png()
    .toBuffer();

/** Renders one card to PNG bytes (deterministic for the same input). */
export function renderCard({ title, description }, mark) {
  const box = markBox();
  return sharp(Buffer.from(cardSvg({ title, description })), { density: 72 })
    .composite([{ input: mark, left: box.left, top: box.top }])
    .png({ palette: true, colours: 128, dither: 0.6, effort: 10 })
    .toBuffer();
}

/** `og/<locale>/<slug>.png`, matching `ogImagePath` (home is `index`). */
export const ogFileFor = ({ locale, path }) =>
  `og/${locale}${path === '/' ? '/index' : path}.png`;

/** Writes a share card for every built page in the locales that have one. */
export async function writeOgImages({ root, out }) {
  const mark = await loadMark(root);
  const pages = await builtPages(out, { locales: OG_LOCALES });
  const queue = [...pages];
  const worker = async () => {
    for (let page = queue.shift(); page; page = queue.shift()) {
      const png = await renderCard(page, mark);
      const file = ogFileFor(page);
      if (png.length > MAX_BYTES) {
        throw new Error(
          `${file} is ${Math.round(png.length / 1024)} KB (limit ${MAX_BYTES / 1024} KB)`,
        );
      }
      await mkdir(dirname(join(out, file)), { recursive: true });
      await writeFile(join(out, file), png);
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
}
