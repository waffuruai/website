import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { brand } from '@/content/pages/brand';
import { localize } from '@/lib/content';

/** Custom properties declared in one block of tailwind.css. */
function declarations(css: string, selector: string) {
  const start = css.indexOf(`\n${selector} {`);
  expect(start, `${selector} block`).toBeGreaterThan(-1);
  const body = css.slice(
    css.indexOf('{', start) + 1,
    css.indexOf('\n}', start),
  );
  const values: Record<string, string> = {};
  for (const [, name, value] of body.matchAll(/(--[\w-]+):\s*([^;]+);/g)) {
    values[name] = value.trim();
  }
  return values;
}

/** Vitest runs from the repo root. */
const root = process.cwd();
const css = readFileSync(join(root, 'src/styles/tailwind.css'), 'utf8');
const dark = declarations(css, ':root');
const light = { ...dark, ...declarations(css, '.light') };

/** Follows `var(--other)` references to the final value. */
function resolve(tokens: Record<string, string>, name: string): string {
  const value = tokens[name];
  expect(value, name).toBeDefined();
  const reference = value?.match(/^var\((--[\w-]+)\)$/);
  return reference?.[1] ? resolve(tokens, reference[1]) : (value ?? '');
}

describe('brand palette', () => {
  const { colour } = localize(brand, 'en');

  it.each(colour.dark)(
    'dark $name matches $token in tailwind.css',
    (swatch) => {
      expect(swatch.hex).toBe(resolve(dark, swatch.token).toLowerCase());
    },
  );

  it.each(colour.light)(
    'light $name matches $token in tailwind.css',
    (swatch) => {
      expect(swatch.hex).toBe(resolve(light, swatch.token).toLowerCase());
    },
  );

  it('lists every swatch once per theme', () => {
    for (const group of [colour.dark, colour.light]) {
      const tokens = group.map((swatch) => swatch.token);
      expect(new Set(tokens).size).toBe(tokens.length);
    }
  });
});

describe('brand downloads', () => {
  const { mark } = localize(brand, 'en');

  it('links the original and the two built sizes', () => {
    expect(mark.downloads.map((file) => file.href)).toEqual([
      '/brand/waffuru-waffle.png',
      '/img/brand/waffle-384.png',
      '/img/brand/waffle-160.png',
    ]);
  });

  it('ships the original in public/brand', () => {
    const original = join(root, 'public/brand/waffuru-waffle.png');
    expect(readFileSync(original).subarray(1, 4).toString()).toBe('PNG');
  });
});
