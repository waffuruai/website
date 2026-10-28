import { describe, expect, it } from 'vitest';

import { plainText } from './markup';

describe('plainText', () => {
  it('keeps the words and drops bold and link markup', () => {
    expect(
      plainText(
        'Google’s [TurboQuant](https://research.google/blog/x/) and **yours**',
      ),
    ).toBe('Google’s TurboQuant and yours');
  });

  it('leaves plain text and non-web links alone', () => {
    expect(plainText('a *word* and [this](javascript:x)')).toBe(
      'a *word* and [this](javascript:x)',
    );
  });
});
