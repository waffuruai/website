import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { locales } from '@/i18n/config';
import { withDictionary } from '@/i18n/test-utils';

import SecurityPolicyPage, { generateMetadata } from './page';

const params = (locale: string) => Promise.resolve({ locale });

async function renderPage(locale: 'en' | 'ja' = 'en') {
  const page = await SecurityPolicyPage();
  return render(withDictionary(page, locale));
}

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) => {
      const data = JSON.parse(script.textContent ?? 'null');
      return Array.isArray(data) ? data : [data];
    },
  );

describe('/security', () => {
  it('renders the policy as an English article with its contents', async () => {
    const { container } = await renderPage();
    const article = container.querySelector('article');
    expect(article?.getAttribute('lang')).toBe('en');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Vulnerability disclosure policy',
    );
    expect(article?.querySelectorAll('h2').length).toBeGreaterThanOrEqual(3);
    expect(
      container.querySelector('aside')?.querySelectorAll('a[href^="#"]').length,
    ).toBe(article?.querySelectorAll('h2').length);
    expect(article?.querySelector('time')?.getAttribute('datetime')).toBe(
      '2026-10-31',
    );
  });

  it('promises the same address and deadlines as security.txt and the repos', async () => {
    const { container } = await renderPage();
    const text = container.querySelector('article')?.textContent ?? '';
    const hrefs = [...container.querySelectorAll('article a')].map((link) =>
      link.getAttribute('href'),
    );
    expect(hrefs).toContain('mailto:security@waffuru.ai?subject=Security');
    expect(hrefs).toContain('/.well-known/security.txt');
    for (const promise of [
      '3 business days',
      '10 business days',
      '14 days',
      '30 days',
      '90 days',
      '180 days',
      'at our discretion',
    ]) {
      expect(text).toContain(promise);
    }
  });

  it('keeps its internal links in the visitor’s locale and leads back to support', async () => {
    const { container } = await renderPage('ja');
    const hrefs = [...container.querySelectorAll('a')].map((link) =>
      link.getAttribute('href'),
    );
    expect(hrefs).toContain('/ja/support');
    expect(hrefs).toContain('/ja/legal/privacy');
    // A file, not a page: no locale prefix.
    expect(hrefs).toContain('/.well-known/security.txt');
  });

  it('describes the page, with the English URL as its address', async () => {
    const { container } = await renderPage('ja');
    const nodes = jsonLd(container);
    expect(nodes.map((node) => node['@type'])).toEqual([
      'WebPage',
      'BreadcrumbList',
    ]);
    expect(nodes[0].url).toBe('https://waffuru.ai/security');
    expect(
      nodes[1].itemListElement.map((item: { name: string }) => item.name),
    ).toEqual(['Waffuru', 'Vulnerability disclosure policy']);
  });

  it('points canonical and x-default at the English URL in every locale', async () => {
    for (const locale of locales) {
      const metadata = await generateMetadata({ params: params(locale) });
      expect(metadata.title).toBe('Vulnerability disclosure policy');
      expect(metadata.alternates?.canonical).toBe('/security');
      expect(metadata.alternates?.languages).toEqual({
        'x-default': '/security',
      });
    }
  });
});
