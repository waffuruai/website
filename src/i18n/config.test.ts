import { describe, expect, it } from 'vitest';

import {
  interpolate,
  localizePath,
  negotiateLocale,
  readCookie,
  splitLocale,
} from '@/i18n/config';

describe('splitLocale', () => {
  it('splits a locale prefix off', () => {
    expect(splitLocale('/ja/about')).toEqual({ locale: 'ja', path: '/about' });
    expect(splitLocale('/zh')).toEqual({ locale: 'zh', path: '/' });
    expect(splitLocale('/en/blog/x')).toEqual({
      locale: 'en',
      path: '/blog/x',
    });
  });

  it('leaves unprefixed paths alone', () => {
    expect(splitLocale('/about')).toEqual({ locale: null, path: '/about' });
    expect(splitLocale('/japan')).toEqual({ locale: null, path: '/japan' });
  });
});

describe('localizePath', () => {
  it('keeps English unprefixed and prefixes the rest', () => {
    expect(localizePath('/about', 'en')).toBe('/about');
    expect(localizePath('/about', 'fr')).toBe('/fr/about');
    expect(localizePath('/', 'ja')).toBe('/ja');
    expect(localizePath('/', 'en')).toBe('/');
  });

  it('replaces an existing prefix and keeps query and hash', () => {
    expect(localizePath('/es/about?x=1#team', 'zh')).toBe('/zh/about?x=1#team');
    expect(localizePath('/ja/about', 'en')).toBe('/about');
  });

  it('leaves external and anchor links unchanged', () => {
    expect(localizePath('https://docs.waffuru.ai', 'ja')).toBe(
      'https://docs.waffuru.ai',
    );
    expect(localizePath('mailto:hello@waffuru.ai', 'fr')).toBe(
      'mailto:hello@waffuru.ai',
    );
    expect(localizePath('#hiring', 'es')).toBe('#hiring');
  });
});

describe('negotiateLocale', () => {
  it('picks the best supported language by q-weight', () => {
    expect(negotiateLocale('de-DE,ja;q=0.8,fr;q=0.9')).toBe('fr');
    expect(negotiateLocale('zh-TW,zh;q=0.9')).toBe('zh');
    expect(negotiateLocale('es-MX')).toBe('es');
  });

  it('returns null when nothing matches', () => {
    expect(negotiateLocale('de-DE,it;q=0.5')).toBeNull();
    expect(negotiateLocale('ko-KR,ko;q=0.9')).toBe('ko');
    expect(negotiateLocale('')).toBeNull();
    expect(negotiateLocale(null)).toBeNull();
  });

  it('ignores languages with q=0', () => {
    expect(negotiateLocale('ja;q=0, fr;q=0.1')).toBe('fr');
  });
});

describe('helpers', () => {
  it('reads a cookie', () => {
    expect(readCookie('a=1; waffuru-locale=ja; b=2', 'waffuru-locale')).toBe(
      'ja',
    );
    expect(readCookie(undefined, 'waffuru-locale')).toBeUndefined();
  });

  it('interpolates placeholders and leaves unknown ones', () => {
    expect(interpolate('{minutes} min, {x}', { minutes: 4 })).toBe(
      '4 min, {x}',
    );
  });
});
