import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { locales } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

import PolicyPage, { generateMetadata, generateStaticParams } from './page';

const SLUGS = ['terms', 'privacy', 'cookies'] as const;

const params = (locale: string, slug: string) =>
  Promise.resolve({ locale, slug });

async function renderPage(locale: 'en' | 'ja', slug: string) {
  const page = await PolicyPage({ params: params(locale, slug) });
  return render(withDictionary(page, locale));
}

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) => {
      const data = JSON.parse(script.textContent ?? 'null');
      return Array.isArray(data) ? data : [data];
    },
  );

describe('/legal/[slug]', () => {
  it('builds every policy in every locale, and only those', async () => {
    const built = await generateStaticParams();
    expect(built).toHaveLength(locales.length * SLUGS.length);
    for (const locale of locales) {
      for (const slug of SLUGS) {
        expect(built).toContainEqual({ locale, slug });
      }
    }
  });

  it.each(SLUGS)(
    'renders %s as an English article with its contents',
    async (slug) => {
      const { container } = await renderPage('en', slug);
      const article = container.querySelector('article');
      expect(article?.getAttribute('lang')).toBe('en');
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(article?.querySelectorAll('h2').length).toBeGreaterThanOrEqual(3);
      // The sidebar contents list every ## heading of the text.
      const aside = container.querySelector('aside');
      expect(aside?.querySelectorAll('a[href^="#"]').length).toBe(
        article?.querySelectorAll('h2').length,
      );
      expect(article?.querySelector('time')?.getAttribute('datetime')).toBe(
        '2026-10-26',
      );
    },
  );

  it.each(locales)(
    'renders the English text in %s without a 404',
    async (locale) => {
      const { container } = await renderPage(locale as 'en' | 'ja', 'privacy');
      expect(container.querySelector('article')?.getAttribute('lang')).toBe(
        'en',
      );
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
        'Privacy policy',
      );
    },
  );

  it('keeps links inside the policy in the visitor’s locale', async () => {
    const { container } = await renderPage('ja', 'terms');
    const hrefs = [...container.querySelectorAll('article a')].map((link) =>
      link.getAttribute('href'),
    );
    expect(hrefs).toContain('/ja/legal/privacy');
    expect(hrefs).toContain('/ja/legal/cookies');
    expect(hrefs).toContain('/ja/support');
    expect(hrefs).toContain('mailto:hello@waffuru.ai');
  });

  it('opens web links in a new tab', async () => {
    const { container } = await renderPage('en', 'cookies');
    const link = container.querySelector(
      'article a[href="https://globalprivacycontrol.org"]',
    );
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noopener');
  });

  it('describes the page, with the English URL as its address', async () => {
    const { container } = await renderPage('ja', 'terms');
    const nodes = jsonLd(container);
    expect(nodes.map((node) => node['@type'])).toEqual([
      'WebPage',
      'BreadcrumbList',
    ]);
    expect(nodes[0].url).toBe('https://waffuru.ai/legal/terms');
    expect(
      nodes[1].itemListElement.map((item: { name: string }) => item.name),
    ).toEqual(['Waffuru', 'Legal', 'Terms of use']);
  });

  it('points canonical and x-default at the English URL in every locale', async () => {
    for (const locale of locales) {
      const metadata = await generateMetadata({
        params: params(locale, 'privacy'),
      });
      expect(metadata.title).toBe('Privacy policy');
      expect(metadata.alternates?.canonical).toBe('/legal/privacy');
      expect(metadata.alternates?.languages).toEqual({
        'x-default': '/legal/privacy',
      });
      expect(metadata.openGraph).toMatchObject({
        url: '/legal/privacy',
        locale: 'en_US',
      });
    }
  });

  it('is a 404 for anything that is not a published policy', async () => {
    expect(await generateMetadata({ params: params('en', 'nope') })).toEqual(
      {},
    );
    // `notFound()` throws in Next; the test setup stubs it.
    await expect(
      PolicyPage({ params: params('en', 'nope') }),
    ).rejects.toThrow();
    expect(vi.mocked(notFound)).toHaveBeenCalled();
  });
});
