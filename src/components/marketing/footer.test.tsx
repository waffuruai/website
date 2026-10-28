import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { buildInfo } from '@/generated/build-info';
import en from '@/i18n/dictionaries/en';
import { withDictionary } from '@/i18n/test-utils';

import { Footer } from './footer';

describe('Footer', () => {
  it('prints the site version between the copyright and Made with', () => {
    const { container } = render(withDictionary(<Footer dictionary={en} />));
    const version = `v${buildInfo.version} (${buildInfo.commit} ${buildInfo.date})`;
    const text = container.textContent ?? '';
    expect(text).toContain(version);
    expect(text.indexOf('Waffuru AI Inc.')).toBeLessThan(text.indexOf(version));
    expect(text.indexOf(version)).toBeLessThan(text.indexOf('Made with'));
  });
});
