import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Picture } from '@/components/picture';

describe('Picture', () => {
  it('exposes a described image to assistive tech', () => {
    render(<Picture name="brand/waffle" alt="The waffle mark" sizes="40px" />);

    const img = screen.getByRole('img', { name: 'The waffle mark' });
    expect(img.hasAttribute('aria-hidden')).toBe(false);
  });

  it('hides a decorative image (empty alt) from assistive tech', () => {
    const { container } = render(
      <Picture name="brand/waffle" alt="" sizes="40px" />,
    );

    expect(container.querySelector('img')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });
});
