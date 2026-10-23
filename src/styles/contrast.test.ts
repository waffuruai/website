// @vitest-environment node
import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

/*
 * WCAG contrast for the text tokens in both themes, read straight from
 * tailwind.css so a palette change can't quietly make copy unreadable.
 * Body text needs 4.5:1 (AA); `faint` is decorative only and is not checked.
 */

const css = readFileSync(new URL('./tailwind.css', import.meta.url), 'utf8');

/** Custom properties declared in the first block opened by `selector {`. */
function block(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`no ${selector} block`);
  const body = css.slice(start, css.indexOf('\n}', start));
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
      name,
      value.trim(),
    ]),
  );
}

const root = block(':root');
const light = { ...root, ...block('.light') };

/** Resolves `var(--x)` chains to a hex colour. */
function resolve(tokens: Record<string, string>, name: string): string {
  let value = tokens[name];
  for (let i = 0; value?.startsWith('var(') && i < 5; i += 1) {
    value = tokens[value.slice(6, -1)];
  }
  if (!value?.startsWith('#')) throw new Error(`--${name} is not a hex colour`);
  return value;
}

function luminance(hex: string): number {
  const channels = hex
    .slice(1)
    .match(/../g)!
    .map((pair) => parseInt(pair, 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const AA = 4.5;
const TEXT = ['foreground', 'soft', 'muted-foreground', 'brand-ink'];
const SURFACES = ['background', 'card'];

describe.each([
  ['dark', root],
  ['light', light],
])('%s theme', (_, tokens) => {
  it.each(TEXT.flatMap((text) => SURFACES.map((surface) => [text, surface])))(
    '%s on %s meets AA',
    (text, surface) => {
      const ratio = contrast(resolve(tokens, text), resolve(tokens, surface));
      expect(ratio).toBeGreaterThanOrEqual(AA);
    },
  );

  it('primary button text meets AA', () => {
    expect(
      contrast(
        resolve(tokens, 'primary-foreground'),
        resolve(tokens, 'primary'),
      ),
    ).toBeGreaterThanOrEqual(AA);
  });
});
