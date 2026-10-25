import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accent, plainText } from '@/components/sections/accent';

describe('Accent', () => {
  it('turns *starred* words into the italic accent', () => {
    const { container } = render(
      <h1>
        <Accent text="Raw math, *pressed* into silicon." />
      </h1>,
    );
    expect(container.querySelector('em')?.textContent).toBe('pressed');
    expect(container.textContent).toBe('Raw math, pressed into silicon.');
  });

  it('renders line breaks and leaves stray asterisks alone', () => {
    const { container } = render(
      <h2>
        <Accent text={'You write this.\n*Iron writes the rest.*'} />
      </h2>,
    );
    expect(container.querySelectorAll('br')).toHaveLength(1);
    expect(container.querySelector('em')?.textContent).toBe(
      'Iron writes the rest.',
    );
    const { container: plain } = render(<Accent text="2 * 3 = 6" />);
    expect(plain.querySelector('em')).toBeNull();
  });

  it('strips markers for plain contexts', () => {
    expect(plainText('Raw math, *pressed*\ninto silicon.')).toBe(
      'Raw math, pressed into silicon.',
    );
  });
});
