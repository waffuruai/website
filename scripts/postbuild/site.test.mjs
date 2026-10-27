// @vitest-environment node
import { describe, expect, it } from 'vitest';

import { site } from '../../src/content/site';
import {
  defaultLocale,
  localeInfo,
  localizePath,
  locales,
} from '../../src/i18n/config';
import { sectionRoutes } from '../../src/lib/launch';
import { ogImagePath } from '../../src/lib/seo';
import {
  DEFAULT_LOCALE,
  LAUNCHED,
  LOCALES,
  LOCALE_LANG,
  SECTION_ROUTES,
  OG_LOCALES,
  SITE,
  SITE_URL,
  localizedPath,
  markdownPath,
  publicUrl,
} from './site.mjs';

describe('site facts', () => {
  it('match src/content/site.ts', () => {
    expect(SITE_URL).toBe(site.url);
    expect(SITE).toEqual({
      name: site.name,
      mission: site.mission,
      description: site.description,
      earlyAccessUrl: site.urls.earlyAccess,
      email: site.emails.hello,
    });
  });

  it('match the launch sections in site.ts and launch.ts', () => {
    expect(LAUNCHED).toEqual(site.launched);
    expect(SECTION_ROUTES).toEqual(sectionRoutes);
  });

  it('match src/i18n/config.ts', () => {
    expect(DEFAULT_LOCALE).toBe(defaultLocale);
    expect(LOCALES).toEqual([...locales]);
    expect(LOCALE_LANG).toEqual(
      Object.fromEntries(locales.map((code) => [code, localeInfo[code].lang])),
    );
  });

  it('localizes paths like localizePath', () => {
    for (const path of ['/', '/about', '/blog/hello', '/legal/terms']) {
      for (const locale of locales) {
        expect(localizedPath(path, locale)).toBe(localizePath(path, locale));
      }
    }
  });

  it('renders cards in the locales seo.ts gives their own card', () => {
    const own = locales.filter(
      (locale) => ogImagePath('/x', locale) === `/og/${locale}/x.png`,
    );
    expect(OG_LOCALES).toEqual(own);
  });

  it('builds public URLs and markdown paths', () => {
    expect(publicUrl('/')).toBe('https://waffuru.ai');
    expect(publicUrl('/about')).toBe('https://waffuru.ai/about');
    expect(publicUrl('/', 'ja')).toBe('https://waffuru.ai/ja');
    expect(publicUrl('/about', 'es')).toBe('https://waffuru.ai/es/about');
    expect(markdownPath('/')).toBe('/index.md');
    expect(markdownPath('/about')).toBe('/about.md');
  });
});
