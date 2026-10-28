import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AboutPage, {
  generateMetadata,
} from '@/app/[locale]/(marketing)/about/page';
import { withDictionary } from '@/i18n/test-utils';

const params = Promise.resolve({ locale: 'en' });

async function renderPage() {
  return render(withDictionary(await AboutPage({ params })));
}

describe('About page', () => {
  it('leads with the mission as the only h1', async () => {
    await renderPage();
    const h1 = screen.getAllByRole('heading', { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0]?.textContent).toBe('Democratize access to intelligence.');
    expect(h1[0]?.querySelector('em')?.textContent).toBe('intelligence');
  });

  it('says what the name means, with the katakana', async () => {
    await renderPage();
    expect(screen.getByText(/how the Japanese say waffles/)).toBeTruthy();
    expect(screen.getByText('ワッフル').getAttribute('lang')).toBe('ja');
  });

  it('has the sections in order, with ordered headings', async () => {
    await renderPage();
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual([
      'Why we build.',
      'What we believe.',
      'What we value.',
      'The people behind it.',
      'Put on an apron.',
      'Try it early.',
    ]);
  });

  it('numbers the seven theses and grids the fourteen values', async () => {
    await renderPage();
    const beliefs = screen.getByRole('region', { name: 'What we believe.' });
    const theses = within(beliefs).getAllByRole('listitem');
    expect(theses).toHaveLength(7);
    expect(theses[0]?.textContent).toContain('01');
    expect(theses[6]?.textContent).toContain('07');

    const values = screen.getByRole('region', { name: 'What we value.' });
    expect(values.querySelectorAll('dt')).toHaveLength(14);
  });

  it('teases the team page with five portraits', async () => {
    await renderPage();
    const teaser = screen.getByRole('region', {
      name: 'The people behind it.',
    });
    expect(within(teaser).getAllByRole('img')).toHaveLength(5);
    expect(
      within(teaser)
        .getByRole('link', { name: /Meet the team/ })
        .getAttribute('href'),
    ).toBe('/about/team');
  });

  it('has the hiring anchor and both ways to reach us', async () => {
    const { container } = await renderPage();
    expect(container.querySelector('#hiring')).not.toBeNull();
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('mailto:hello@waffuru.ai?subject=Hiring');
    expect(hrefs).toContain('mailto:hello@waffuru.ai?subject=Sales');
    expect(hrefs).toContain('#hiring');
  });

  it('emits AboutPage and BreadcrumbList structured data', async () => {
    const { container } = await renderPage();
    const data = [
      ...container.querySelectorAll('script[type="application/ld+json"]'),
    ]
      .map((script) => JSON.parse(script.textContent ?? '{}'))
      .flat();
    expect(data.map((item) => item['@type'])).toEqual([
      'AboutPage',
      'BreadcrumbList',
    ]);
    expect(
      data[1].itemListElement.map((i: { item: string }) => i.item),
    ).toEqual(['https://waffuru.ai/', 'https://waffuru.ai/about']);
  });

  it('sets metadata with keywords and a canonical URL', async () => {
    const metadata = await generateMetadata({ params });
    expect(metadata.keywords).toContain('Waffuru mission');
    expect(metadata.alternates?.canonical).toBe('/about');
    expect(metadata.title).toBe(
      'Our mission: democratize access to intelligence',
    );
  });
});
