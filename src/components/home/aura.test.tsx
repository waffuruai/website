import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Aura } from './aura';
import { aura, auraEvidence } from '@/content/pages/aura';
import { locales } from '@/i18n/config';
import { localize } from '@/lib/content';
import { withDictionary } from '@/i18n/test-utils';

/** The only places the section may link to: public repos and merged PRs. */
const PUBLIC_LINKS = [
  'https://arxiv.org/abs/2504.19874',
  'https://github.com/TheTom/turboquant_plus',
  'https://github.com/TheTom/llama-cpp-turboquant',
  'https://github.com/vllm-project/vllm/pull/38479',
  'https://github.com/ml-explore/mlx-swift-lm/pull/232',
];

describe('Aura', () => {
  it('renders the title, the public tiles with their source and the lineage', () => {
    render(withDictionary(<Aura content={aura.en} />));
    const section = screen.getByRole('region', {
      name: 'More context per gigabyte.',
    });
    expect(section.id).toBe('aura');
    expect(within(section).getByText('3.8×')).toBeTruthy();
    expect(within(section).getByText('4.6×')).toBeTruthy();
    expect(within(section).getByText('104B')).toBeTruthy();
    expect(within(section).getByText('+0.23% perplexity vs q8_0')).toBeTruthy();
    expect(within(section).getByText(/74 GB peak memory/)).toBeTruthy();
    // Every tile names its source and conditions.
    expect(
      within(section).getAllByText(/^Source: TurboQuant\+ · turbo[34] · /),
    ).toHaveLength(3);
    expect(
      within(section).getByText(/These are not Butter numbers/),
    ).toBeTruthy();
    expect(within(section).getByText(/Schematic/)).toBeTruthy();
    expect(within(section).getByText(/^In progress:/)).toBeTruthy();
    expect(within(section).getAllByRole('listitem').length).toBeGreaterThan(6);
  });

  it('links only to public repos and PRs, in new tabs, and never to waffuruai', () => {
    render(withDictionary(<Aura content={aura.en} />));
    const links = screen.getAllByRole('link');
    const hrefs = links.map((link) => link.getAttribute('href'));
    expect([...hrefs].sort()).toEqual([...PUBLIC_LINKS].sort());
    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
    expect(document.body.innerHTML).not.toMatch(/github\.com\/waffuruai/);
    expect(document.body.innerHTML).not.toMatch(/ggml-org/);
  });

  it('draws the ribbon from the public ratio, hidden from assistive tech', () => {
    const { container } = render(withDictionary(<Aura content={aura.en} />));
    const ribbon = container.querySelector('[style*="--ratio"]')!;
    expect(ribbon.getAttribute('aria-hidden')).toBe('true');
    expect((ribbon as HTMLElement).style.getPropertyValue('--ratio')).toBe(
      String(auraEvidence.ribbonRatio),
    );
    expect(ribbon.querySelector('.wf-blink')).not.toBeNull();
  });

  it.each(locales)('renders the same numbers in %s', (locale) => {
    const copy = localize(aura, locale);
    render(withDictionary(<Aura content={copy} />, locale));
    expect(screen.getByText('3.8×')).toBeTruthy();
    expect(screen.getByText('104B')).toBeTruthy();
    expect(screen.getByText(copy.footnote)).toBeTruthy();
    expect(screen.getByText(copy.changed.inProgress)).toBeTruthy();
    expect(screen.getAllByRole('link')).toHaveLength(PUBLIC_LINKS.length);
  });
});
