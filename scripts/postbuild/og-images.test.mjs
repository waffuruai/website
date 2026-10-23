// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';
import { afterEach, describe, expect, it } from 'vitest';

import { ogImagePath } from '../../src/lib/seo';
import {
  CARD,
  MAX_BYTES,
  cardSvg,
  layout,
  loadMark,
  measure,
  ogFileFor,
  renderCard,
  wrap,
  writeOgImages,
} from './og-images.mjs';
import { pageHtml, tempDirs } from './test-utils.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const dirs = tempDirs();
afterEach(() => dirs.cleanup());

describe('wrap', () => {
  const options = { size: 30, width: 400, maxLines: 3 };

  it('breaks lines to the width, never inside a word', () => {
    const lines = wrap(
      'Raw math pressed into high performance silicon',
      options,
    );
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.join(' ')).toBe(
      'Raw math pressed into high performance silicon',
    );
    for (const line of lines)
      expect(measure(line, 30)).toBeLessThanOrEqual(400);
  });

  it('ends in an ellipsis when it runs out of lines', () => {
    const lines = wrap(
      'one two three four five six seven eight nine ten eleven twelve',
      { ...options, maxLines: 2 },
    );
    expect(lines).toHaveLength(2);
    expect(lines[1].endsWith('…')).toBe(true);
    expect(measure(lines[1], 30)).toBeLessThanOrEqual(400);
  });

  it('keeps a single over-long word on its own line', () => {
    expect(wrap('Supercalifragilisticexpialidocious', options)).toEqual([
      'Supercalifragilisticexpialidocious',
    ]);
  });
});

describe('layout', () => {
  it('shrinks a long title instead of overflowing three lines', () => {
    const short = layout('About', 'Who we are.');
    const long = layout(
      'Solutions for AI model and inference companies and everything else in between',
      'Serve models without Python on the hardware you already own, and see every GPU.',
    );
    expect(long.lines.length).toBeLessThanOrEqual(3);
    expect(long.size).toBeLessThan(short.size);
  });
});

describe('cardSvg', () => {
  it('escapes XML in the title and description', () => {
    const svg = cardSvg({
      title: 'Iron & <Butter> "kernels"',
      description: `Tom's \u0001 notes <script>alert(1)</script>`,
    });
    expect(svg).not.toContain('<script');
    expect(svg).not.toContain('\u0001');
    expect(svg).toContain('&amp;');
    expect(svg).toContain('&lt;Butter&gt;');
    expect(svg).toContain('&quot;kernels&quot;');
    expect(svg).toContain('Tom&#39;s');
  });

  it('puts the last word of the title in the accent colour', () => {
    expect(cardSvg({ title: 'About us', description: 'x' })).toMatch(
      /About <tspan fill="#E8A33D" font-style="italic">us<\/tspan>/,
    );
  });

  it('falls back to the brand name for an empty title', () => {
    expect(cardSvg({ title: ' ', description: 'x' })).toContain(
      'Waffuru</tspan>',
    );
  });

  it('is deterministic', () => {
    const card = { title: 'Same', description: 'Same card, same tiles.' };
    expect(cardSvg(card)).toBe(cardSvg({ ...card }));
    expect(cardSvg(card)).not.toBe(
      cardSvg({ title: 'Other', description: '' }),
    );
  });
});

describe('renderCard', () => {
  it('renders a 1200x630 PNG under the size limit, the same every time', async () => {
    const mark = await loadMark(ROOT);
    const card = {
      title: 'Introducing Waffuru',
      description:
        'Why we are building kernels, serving, a control plane and memory for the hardware you already own.',
    };
    const first = await renderCard(card, mark);
    const second = await renderCard(card, mark);
    expect(first.equals(second)).toBe(true);
    expect(first.length).toBeLessThanOrEqual(MAX_BYTES);
    const meta = await sharp(first).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual([
      'png',
      CARD.width,
      CARD.height,
    ]);
  });

  it('draws text and the mark (not a blank card)', async () => {
    const mark = await loadMark(ROOT);
    const png = await renderCard(
      { title: 'Iron kernels', description: 'Four backends.' },
      mark,
    );
    // The title is cream type on the dark ground. (If this fails on a
    // machine with no system fonts, install any serif and sans font.)
    const title = await sharp(png)
      .extract({ left: 72, top: 168, width: 600, height: 120 })
      .stats();
    expect(title.channels[0].max).toBeGreaterThan(200);
    // The waffle's gold sits in the lower right.
    const { channels } = await sharp(png)
      .extract({ left: 900, top: 340, width: 220, height: 200 })
      .stats();
    expect(channels[0].mean).toBeGreaterThan(channels[2].mean * 1.5);
  });
});

describe('ogFileFor', () => {
  it('matches the path ogImagePath advertises', () => {
    for (const [path, locale] of [
      ['/', 'en'],
      ['/', 'es'],
      ['/about', 'fr'],
      ['/products/iron', 'en'],
      ['/blog/introducing-waffuru', 'es'],
    ]) {
      expect(`/${ogFileFor({ path, locale })}`).toBe(ogImagePath(path, locale));
    }
  });
});

describe('writeOgImages', () => {
  it('writes a card per built page in en, es and fr', async () => {
    const out = await dirs.make({
      'en.html': pageHtml({ title: 'Waffuru', description: 'Home.' }),
      'es.html': pageHtml({ lang: 'es', title: 'Waffuru' }),
      'fr/about.html': pageHtml({ lang: 'fr', title: 'À propos · Waffuru' }),
      'en/about/team.html': pageHtml({ title: 'Team · Waffuru' }),
      'ja.html': pageHtml({ lang: 'ja' }),
      'ko/about.html': pageHtml({ lang: 'ko' }),
      'zh/404.html': pageHtml(),
      'en/404.html': pageHtml(),
    });
    await writeOgImages({ root: ROOT, out });
    const written = (
      await Promise.all(
        [
          'og/en/index.png',
          'og/es/index.png',
          'og/fr/about.png',
          'og/en/about/team.png',
        ].map(async (file) => (await readFile(join(out, file))).length),
      )
    ).every((size) => size > 1000 && size <= MAX_BYTES);
    expect(written).toBe(true);
    for (const file of [
      'og/ja/index.png',
      'og/ko/about.png',
      'og/en/404.png',
    ]) {
      await expect(readFile(join(out, file))).rejects.toThrow();
    }
  });
});
