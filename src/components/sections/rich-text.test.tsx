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

  it('links markdown-style links to web addresses', () => {
    const { container } = render(
      <p>
        <RichText text="the [Jevons paradox](https://en.wikipedia.org/wiki/Jevons_paradox) at work" />
      </p>,
    );
    const link = container.querySelector('a');
    expect(link?.textContent).toBe('Jevons paradox');
    expect(link?.getAttribute('href')).toBe(
      'https://en.wikipedia.org/wiki/Jevons_paradox',
    );
    expect(container.textContent).toBe('the Jevons paradox at work');
  });

  it('leaves brackets without a web address as text', () => {
    const { container } = render(
      <p>
        <RichText text="see [notes](javascript:alert(1)) and [this]" />
      </p>,
    );
    expect(container.querySelector('a')).toBeNull();
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
