import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RichText } from './rich-text';

describe('RichText', () => {
  it('bolds doubled-star words and leaves the rest as text', () => {
    const { container } = render(
      <p>
        <RichText text="faster, cheaper and **yours**: kernels" />
      </p>,
    );
    expect(container.textContent).toBe('faster, cheaper and yours: kernels');
    expect(container.querySelector('strong')?.textContent).toBe('yours');
  });

  it('leaves single stars and plain text alone', () => {
    const { container } = render(
      <p>
        <RichText text="a *word* and 2 ** 3" />
      </p>,
    );
    expect(container.querySelector('strong')).toBeNull();
    expect(container.textContent).toBe('a *word* and 2 ** 3');
  });
});
