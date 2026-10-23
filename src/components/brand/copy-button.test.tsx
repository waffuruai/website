import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CopyButton } from '@/components/brand/copy-button';
import { withDictionary } from '@/i18n/test-utils';

function stubClipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
}

describe('CopyButton', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('is named by what it shows', () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined));
    render(withDictionary(<CopyButton value="#e8a33d" />));
    expect(screen.getByRole('button', { name: 'Copy #e8a33d' })).toBeTruthy();
  });

  it('copies the value, says so, then resets', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    render(withDictionary(<CopyButton value="#e8a33d" />));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(writeText).toHaveBeenCalledWith('#e8a33d');
    expect(screen.getByRole('button', { name: 'Copied #e8a33d' })).toBeTruthy();
    expect(screen.getByRole('status').textContent).toBe('Copied');

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByRole('button', { name: 'Copy #e8a33d' })).toBeTruthy();
    expect(screen.getByRole('status').textContent).toBe('');
  });

  it('stays quiet when the clipboard refuses', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    render(withDictionary(<CopyButton value="#e8a33d" />));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(screen.getByRole('button', { name: 'Copy #e8a33d' })).toBeTruthy();
    expect(screen.getByRole('status').textContent).toBe('');
  });

  it('uses the dictionary of the active locale', () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined));
    render(withDictionary(<CopyButton value="#0a0908" />, 'fr'));
    expect(screen.getByRole('button').textContent).not.toContain('Copy ');
  });
});
