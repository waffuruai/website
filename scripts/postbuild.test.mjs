// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

/*
 * postbuild.mjs runs its steps when imported, so the order that matters is
 * checked from its source.
 */
const source = await readFile(
  fileURLToPath(new URL('./postbuild.mjs', import.meta.url)),
  'utf8',
);
const steps = [...source.matchAll(/^\s+\['([^']+)', \w+\],$/gm)].map(
  (match) => match[1],
);

describe('postbuild steps', () => {
  it('writes the markdown mirrors before llms.txt concatenates them', () => {
    expect(steps.indexOf('markdown mirrors')).toBeGreaterThan(-1);
    expect(steps.indexOf('markdown mirrors')).toBeLessThan(
      steps.indexOf('llms.txt'),
    );
  });

  it('prunes unlaunched pages before anything mirrors, lists or draws them', () => {
    const prune = steps.indexOf('unlaunched pages');
    expect(prune).toBeGreaterThan(steps.indexOf('reserved installer paths'));
    for (const later of ['markdown mirrors', 'llms.txt', 'share images']) {
      expect(prune).toBeLessThan(steps.indexOf(later));
    }
  });

  it('checks internal links last', () => {
    expect(steps.at(-1)).toBe('internal links');
  });

  it('keeps the steps that were there before', () => {
    expect(steps).toEqual(
      expect.arrayContaining(['404 page', 'reserved installer paths']),
    );
    expect(steps).toEqual(
      expect.arrayContaining([
        'markdown mirrors',
        'llms.txt',
        'share images',
        'well-known files',
      ]),
    );
  });
});
