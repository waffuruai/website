import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { support } from '@/content/pages/support';
import { mailto, site } from '@/content/site';
import { withDictionary } from '@/i18n/test-utils';

import SupportPage, { generateMetadata } from './page';

const params = (locale: string) => Promise.resolve({ locale });

async function renderPage(locale: 'en' | 'ja' = 'en') {
  const page = await SupportPage({ params: params(locale) });
  return render(withDictionary(page, locale));
}

const jsonLd = (container: HTMLElement) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap(
    (script) => {
      const data = JSON.parse(script.textContent ?? 'null');
      return Array.isArray(data) ? data : [data];
    },
  );

const hrefOf = (name: RegExp) =>
  screen.getAllByRole('link', { name })[0].getAttribute('href');

describe('/support', () => {
  it('links both mailboxes and security.txt', async () => {
    await renderPage();
    expect(hrefOf(/Email support/)).toBe(mailto('Support'));
    expect(hrefOf(/Report a security issue/)).toBe(mailto('Security'));
    expect(hrefOf(/security\.txt/)).toBe('/.well-known/security.txt');
  });

  it('leaves the docs out until they are published', async () => {
    await renderPage();
    const docs = screen.queryAllByRole('link', { name: /Read the docs/ });
    expect(docs.length > 0).toBe(site.docsPublished);
  });

  it.skipIf(!site.docsPublished)(
    'announces that the docs open in a new tab',
    async () => {
      await renderPage();
      const docs = screen.getAllByRole('link', { name: /Read the docs/ })[0];
      expect(docs.getAttribute('target')).toBe('_blank');
      expect(docs.getAttribute('rel')).toContain('noopener');
      expect(docs.textContent).toContain('(opens in a new tab)');
    },
  );

  it('does not prefix the security.txt file with a locale', async () => {
    await renderPage('ja');
    expect(hrefOf(/security\.txt/)).toBe('/.well-known/security.txt');
  });

  it('answers every question collapsed in the HTML', async () => {
    const { container } = await renderPage();
    const questions = support.en.faq.map((item) => item.question);
    expect(container.querySelectorAll('details')).toHaveLength(
      questions.length,
    );
    expect(container.querySelector('details[open]')).toBeNull();
    for (const question of questions) {
      expect(screen.getByText(question)).toBeTruthy();
    }
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('covers what the page promises to cover', () => {
    const text = support.en.faq
      .map((item) => `${item.question} ${item.answer}`)
      .join('\n');
    for (const topic of [
      'early access',
      'Metal',
      'CUDA',
      'ROCm',
      'bug',
      'security',
      'stays on your machine',
    ]) {
      expect(text.toLowerCase()).toContain(topic.toLowerCase());
    }
  });

  it('emits FAQPage, WebPage and breadcrumb data for what is shown', async () => {
    const { container } = await renderPage();
    const nodes = jsonLd(container);
    expect(nodes.map((node) => node['@type']).sort()).toEqual([
      'BreadcrumbList',
      'FAQPage',
      'WebPage',
    ]);
    const faq = nodes.find((node) => node['@type'] === 'FAQPage');
    expect(faq?.mainEntity).toHaveLength(support.en.faq.length);
    const page = nodes.find((node) => node['@type'] === 'WebPage');
    expect(page?.url).toBe('https://waffuru.ai/support');
  });

  it('uses the locale’s BCP 47 tag and URL in the data', async () => {
    const { container } = await renderPage('ja');
    const page = jsonLd(container).find((node) => node['@type'] === 'WebPage');
    expect(page?.inLanguage).toBe('ja');
    expect(page?.url).toBe('https://waffuru.ai/ja/support');
  });

  it('sets canonical and hreflang metadata', async () => {
    const metadata = await generateMetadata({ params: params('en') });
    expect(metadata.title).toBe('Support');
    expect(metadata.alternates?.canonical).toBe('/support');
    expect(metadata.alternates?.languages).toMatchObject({
      ko: '/ko/support',
      'x-default': '/support',
    });
  });
});
