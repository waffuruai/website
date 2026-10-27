import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { postLocales } from '@/generated/blog-locales';
import { withDictionary } from '@/i18n/test-utils';

import { linkLocale, LocalizedLink } from './localized-link';

describe('LocalizedLink', () => {
  it('keeps the visitor in their language', () => {
    render(
      withDictionary(<LocalizedLink href="/about">About</LocalizedLink>, 'es'),
    );
    expect(screen.getByRole('link').getAttribute('href')).toBe('/es/about');
  });

  it('sends a post with no translation to its English page', () => {
    const [slug] = Object.entries(postLocales).find(
      ([, locales]) => !locales.includes('es'),
    ) ?? [undefined];
    if (!slug) return;
    render(
      withDictionary(
        <LocalizedLink href={`/blog/${slug}`}>Post</LocalizedLink>,
        'es',
      ),
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe(`/blog/${slug}`);
    expect(link.getAttribute('hreflang')).toBe('en');
  });
});

describe('linkLocale', () => {
  it('only overrides the locale for posts not written in it', () => {
    expect(linkLocale('/about', 'ja')).toBe('ja');
    expect(linkLocale('/blog', 'ja')).toBe('ja');
    expect(linkLocale('/blog/feed.xml', 'ja')).toBe('ja');
    expect(linkLocale('/blog/no-such-post', 'ja')).toBe('ja');
    for (const [slug, locales] of Object.entries(postLocales)) {
      expect(linkLocale(`/blog/${slug}#top`, 'ko')).toBe(
        locales.includes('ko') ? 'ko' : 'en',
      );
    }
  });
});
