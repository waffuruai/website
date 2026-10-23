import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Faq } from '@/components/sections/faq';

const items = [
  { question: 'Does it run on my Mac?', answer: 'Yes, Metal is primary.' },
  { question: 'Is it open source?', answer: 'Not yet.' },
];

describe('Faq', () => {
  it('renders every answer in the HTML, collapsed', () => {
    const { container } = render(<Faq heading="Questions" items={items} />);
    expect(screen.getByRole('heading', { name: 'Questions' })).toBeTruthy();
    expect(container.querySelectorAll('details')).toHaveLength(2);
    expect(container.querySelector('details[open]')).toBeNull();
    expect(container.textContent).toContain('Yes, Metal is primary.');
  });

  it('emits FAQPage structured data matching the visible questions', () => {
    const { container } = render(<Faq heading="Questions" items={items} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.textContent ?? '{}');
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity.map((q: { name: string }) => q.name)).toEqual(
      items.map((item) => item.question),
    );
  });

  it('renders nothing without questions', () => {
    const { container } = render(<Faq heading="Questions" items={[]} />);
    expect(container.innerHTML).toBe('');
  });
});
