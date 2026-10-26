import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { QuantizedModels } from './quantized-models';
import {
  quantizedModels,
  quantizedModelsEvidence,
} from '@/content/pages/quantized-models';
import { site } from '@/content/site';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';
import { withDictionary } from '@/i18n/test-utils';

/** The only places the section may link to: our public research and the form. */
const PUBLIC_LINKS = [
  'https://github.com/TheTom/turboquant_plus/blob/main/docs/papers/weight-compression-tq4.md',
  'https://github.com/TheTom/turboquant_plus',
  'https://github.com/TheTom/llama-cpp-turboquant',
  site.urls.earlyAccess,
];

describe('QuantizedModels', () => {
  it('renders the title, the method, the public tiles with their source and the status', () => {
    render(withDictionary(<QuantizedModels content={quantizedModels.en} />));
    const section = screen.getByRole('region', {
      name: 'Smaller models, quantized with care.',
    });
    expect(section.id).toBe('quantized-models');
    expect(within(section).getByText('37%')).toBeTruthy();
    expect(within(section).getByText('41%')).toBeTruthy();
    expect(
      within(section).getAllByText('+1.4% perplexity vs q8_0', {
        exact: false,
      }),
    ).toHaveLength(2);
    // Every tile names its source and conditions.
    expect(
      within(section).getAllByText(/^Source: TurboQuant\+ · Config I/),
    ).toHaveLength(2);
    expect(
      within(section).getByText(
        /Measured with TurboQuant\+ on our llama\.cpp fork/,
      ),
    ).toBeTruthy();
    expect(within(section).getByText(/^Schematic\./)).toBeTruthy();
    expect(within(section).getByText('Coming soon')).toBeTruthy();
    expect(
      within(section).getByText(/The first builds land soon/),
    ).toBeTruthy();
    // The four "how we quantize" points, in order.
    const method = within(section).getAllByRole('listitem').slice(0, 4);
    expect(method.map((item) => item.textContent)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Boundary layers protected'),
      ]),
    );
  });

  it('links only to public research and the early-access form', () => {
    render(withDictionary(<QuantizedModels content={quantizedModels.en} />));
    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect([...hrefs].sort()).toEqual([...PUBLIC_LINKS].sort());
    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
    expect(document.body.innerHTML).not.toMatch(/github\.com\/waffuruai/);
    expect(document.body.innerHTML).not.toMatch(/huggingface/);
    expect(
      screen.getByRole('link', { name: 'Get notified' }).getAttribute('href'),
    ).toBe(site.urls.earlyAccess);
  });

  it('draws the strip with the public boundary count, hidden from assistive tech', () => {
    const { container } = render(
      withDictionary(<QuantizedModels content={quantizedModels.en} />),
    );
    const strip = container.querySelector('figure [aria-hidden="true"]')!;
    expect(strip).not.toBeNull();
    const layers = strip.children;
    expect(layers).toHaveLength(16);
    const bandsOf = (i: number) => layers[i].children.length;
    // Boundary layers are single blocks; middle layers carry three role bands.
    for (let i = 0; i < quantizedModelsEvidence.boundary; i++) {
      expect(bandsOf(i)).toBe(0);
      expect(bandsOf(layers.length - 1 - i)).toBe(0);
    }
    expect(bandsOf(quantizedModelsEvidence.boundary)).toBe(3);
    expect(strip.querySelector('[class*="wf-"]')).toBeNull();
  });

  it.each(locales)('renders the same numbers and links in %s', (locale) => {
    const copy = localize(quantizedModels, locale);
    render(withDictionary(<QuantizedModels content={copy} />, locale));
    expect(screen.getByText('37%')).toBeTruthy();
    expect(screen.getByText('41%')).toBeTruthy();
    expect(screen.getByText(copy.soon.body)).toBeTruthy();
    expect(screen.getByText(copy.soon.tooling)).toBeTruthy();
    expect(screen.getAllByRole('link')).toHaveLength(PUBLIC_LINKS.length);
  });
});
