import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import BrandPage, {
  generateMetadata,
} from '@/app/[locale]/(marketing)/brand/page';
import { withDictionary } from '@/i18n/test-utils';

const params = Promise.resolve({ locale: 'en' });

async function renderPage() {
  return render(withDictionary(await BrandPage({ params })));
}

describe('Brand page', () => {
  it('has one h1 and the press-kit sections in order', async () => {
    await renderPage();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual([
      'The mark.',
      'The wordmark.',
      'The palette.',
      'Three typefaces.',
      'Motifs, in motion.',
      'House rules.',
      'Writing about us?',
    ]);
  });

  it('offers the mark as downloads that are not localized', async () => {
    await renderPage();
    for (const [name, href, filename] of [
      ['Download Original', '/brand/waffuru-waffle.png', 'waffuru-waffle.png'],
      [
        'Download Web, large',
        '/img/brand/waffle-384.png',
        'waffuru-waffle-384.png',
      ],
      [
        'Download Web, small',
        '/img/brand/waffle-160.png',
        'waffuru-waffle-160.png',
      ],
    ] as const) {
      const link = screen.getByRole('link', { name });
      expect(link.getAttribute('href')).toBe(href);
      expect(link.getAttribute('download')).toBe(filename);
    }
  });

  it('shows the wordmark, the katakana and the naming rules', async () => {
    const { container } = await renderPage();
    expect(screen.getAllByText('waffuru')).toHaveLength(2);
    expect(container.querySelectorAll('[lang="ja"]').length).toBeGreaterThan(0);
    expect(screen.getByText('Iron, Butter, Waffle, Syrup')).toBeTruthy();
  });

  it('gives every swatch a copy button', async () => {
    await renderPage();
    // Gold is the same value in both themes, so it has two buttons.
    expect(
      screen.getAllByRole('button', { name: 'Copy #e8a33d' }),
    ).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Copy #8a5514' })).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(16);
  });

  it('notes the typeface licence', async () => {
    await renderPage();
    expect(
      screen.getByRole('link', { name: /SIL Open Font License/ }),
    ).toBeTruthy();
  });

  it('runs all five motifs live in CSS', async () => {
    const { container } = await renderPage();
    const motifs = container.querySelector('#motifs');
    expect(motifs?.querySelectorAll('.wf-cell')).toHaveLength(16);
    expect(motifs?.querySelectorAll('.wf-stamp')).toHaveLength(16);
    expect(motifs?.querySelector('.wf-pat')).not.toBeNull();
    expect(motifs?.querySelectorAll('.wf-led')).toHaveLength(12);
    expect(motifs?.querySelector('.wf-drop')).not.toBeNull();
    expect(motifs?.querySelectorAll('h3')).toHaveLength(5);
  });

  it('puts press contact one click away', async () => {
    await renderPage();
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    expect(
      hrefs.filter((href) => href === 'mailto:hello@waffuru.ai?subject=Press'),
    ).toHaveLength(2);
  });

  it('emits WebPage and BreadcrumbList structured data', async () => {
    const { container } = await renderPage();
    const data = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ]
      .map((script) => JSON.parse(script.textContent ?? '{}'))
      .flat();
    expect(data.map((item) => item['@type'])).toEqual([
      'WebPage',
      'BreadcrumbList',
    ]);
  });

  it('sets metadata with keywords', async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.keywords).toEqual([
      'Waffuru logo',
      'brand assets',
      'press kit',
    ]);
    expect(metadata.alternates?.canonical).toBe('/brand');
  });
});
