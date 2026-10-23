import { describe, expect, it } from 'vitest';

import { locales } from '@/i18n/config';

/*
 * Every `Localized<T>` export in src/content must exist in every locale with
 * the same shape as English, and translators must not change what isn't
 * prose: links, slugs, ids, image keys, statuses. Product, platform and lab
 * names are allowed to stay English (they are never translated).
 */

type Tree = unknown;

const modules = import.meta.glob<Record<string, unknown>>(
  ['./**/*.ts', '!./**/*.test.ts', '!./**/*.{es,fr,zh,ja,ko}.ts'],
  { eager: true },
);

/** `Localized<T>` exports: objects keyed by `en` plus other locales. */
const localized = Object.entries(modules).flatMap(([file, module]) =>
  Object.entries(module)
    .filter(
      ([, value]) =>
        typeof value === 'object' &&
        value !== null &&
        'en' in value &&
        Object.keys(value).every((key) =>
          (locales as readonly string[]).includes(key),
        ),
    )
    .map(([name, value]) => ({
      id: `${file.slice(2)}#${name}`,
      entry: value as Record<string, Tree>,
    })),
);

/** Keys whose values are identifiers or links, never prose. */
const FIXED_KEYS = new Set([
  'href',
  'slug',
  'id',
  'logo',
  'photo',
  'image',
  'path',
  'kind',
  'variant',
  'status',
  'subject',
  'index',
  'language',
  'tier',
  'backend',
]);

const isLink = (value: string) => /^(\/|https?:|mailto:|#)/.test(value);

/** Walks two trees in step, reporting shape and fixed-value differences. */
function compare(en: Tree, other: Tree, path: string, problems: string[]) {
  if (Array.isArray(en)) {
    if (!Array.isArray(other) || other.length !== en.length) {
      problems.push(`${path}: expected an array of ${en.length}`);
      return;
    }
    en.forEach((item, i) => compare(item, other[i], `${path}[${i}]`, problems));
    return;
  }
  if (typeof en === 'object' && en !== null) {
    if (typeof other !== 'object' || other === null) {
      problems.push(`${path}: expected an object`);
      return;
    }
    const enKeys = Object.keys(en).sort();
    const otherKeys = Object.keys(other).sort();
    if (enKeys.join() !== otherKeys.join()) {
      problems.push(`${path}: keys ${otherKeys} ≠ ${enKeys}`);
      return;
    }
    for (const key of enKeys) {
      const a = (en as Record<string, Tree>)[key];
      const b = (other as Record<string, Tree>)[key];
      if (FIXED_KEYS.has(key) && typeof a === 'string' && a !== b) {
        problems.push(`${path}.${key}: "${String(b)}" must stay "${a}"`);
        continue;
      }
      compare(a, b, `${path}.${key}`, problems);
    }
    return;
  }
  if (typeof en !== typeof other) {
    problems.push(`${path}: expected ${typeof en}`);
  } else if (typeof en === 'string' && isLink(en) && en !== other) {
    problems.push(`${path}: link "${String(other)}" must stay "${en}"`);
  } else if (typeof en === 'number' && en !== other) {
    problems.push(`${path}: number ${String(other)} must stay ${en}`);
  }
}

describe('localized content', () => {
  it('finds the content modules', () => {
    expect(localized.length).toBeGreaterThan(10);
  });

  describe.each(localized)('$id', ({ entry }) => {
    it.each(locales.filter((locale) => locale !== 'en'))(
      '%s matches the English shape and keeps links',
      (locale) => {
        expect(entry[locale], `${locale} missing`).toBeDefined();
        const problems: string[] = [];
        compare(entry.en, entry[locale], locale, problems);
        expect(problems).toEqual([]);
      },
    );
  });
});
