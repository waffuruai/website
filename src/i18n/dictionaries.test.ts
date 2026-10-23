import { describe, expect, it } from 'vitest';

import en from '@/i18n/dictionaries/en';
import es from '@/i18n/dictionaries/es';
import fr from '@/i18n/dictionaries/fr';
import ja from '@/i18n/dictionaries/ja';
import zh from '@/i18n/dictionaries/zh';

const translations = { es, fr, zh, ja };

/** Every leaf key path, e.g. `nav.items.iron.label`. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null) return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

function leaves(value: unknown): unknown[] {
  if (typeof value !== 'object' || value === null) return [value];
  return Object.values(value).flatMap(leaves);
}

const get = (dictionary: unknown, path: string) =>
  path
    .split('.')
    .reduce<unknown>(
      (node, key) => (node as Record<string, unknown>)[key],
      dictionary,
    ) as string;

const placeholders = (text: string) =>
  [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('dictionaries', () => {
  const english = keyPaths(en).sort();

  it.each(Object.entries(translations))(
    '%s has exactly the English keys',
    (_, dictionary) => {
      expect(keyPaths(dictionary).sort()).toEqual(english);
    },
  );

  it.each(Object.entries({ en, ...translations }))(
    '%s has only non-empty strings',
    (_, dictionary) => {
      for (const leaf of leaves(dictionary)) {
        expect(typeof leaf).toBe('string');
        expect((leaf as string).trim()).not.toBe('');
      }
    },
  );

  it.each(Object.entries(translations))(
    '%s keeps every {placeholder}',
    (locale, dictionary) => {
      for (const path of english) {
        expect(
          placeholders(get(dictionary, path)),
          `${locale} ${path}`,
        ).toEqual(placeholders(get(en, path)));
      }
    },
  );

  it.each(Object.entries(translations))(
    '%s actually translates most strings',
    (_, dictionary) => {
      const source = leaves(en);
      const same = leaves(dictionary).filter((leaf, i) => leaf === source[i]);
      // Product names (Iron, Butter, …) and a few cognates stay the same.
      expect(same.length / source.length).toBeLessThan(0.2);
    },
  );
});
