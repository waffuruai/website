import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CopyButton } from '@/components/blog/copy-button';
import ja from '@/i18n/dictionaries/ja';
import { withDictionary } from '@/i18n/test-utils';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const COMMAND = 'curl -fsSL https://waffuru.ai/iron/install.sh | sh';

describe('CopyButton', () => {
  it('copies the code and announces "Copied"', async () => {
    const user = userEvent.setup();
    render(withDictionary(<CopyButton text={COMMAND} label="install.sh" />));

    const button = screen.getByRole('button', { name: 'Copy install.sh' });
    // Nothing is announced until something happens.
    expect(screen.getByRole('status').textContent).toBe('');

    await user.click(button);

    expect(await navigator.clipboard.readText()).toBe(COMMAND);
    expect(screen.getByRole('status').textContent).toBe('Copied');
    expect(screen.getByRole('button', { name: 'Copied install.sh' })).toBe(
      button,
    );
  });

  it('goes back to "Copy" after a moment', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(withDictionary(<CopyButton text={COMMAND} />));

    await user.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe('Copied'),
    );

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
    expect(screen.getByRole('status').textContent).toBe('');
  });

  it('does not claim success when the clipboard refuses', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new Error('denied'),
    );
    render(withDictionary(<CopyButton text={COMMAND} />));

    await user.click(screen.getByRole('button', { name: 'Copy' }));

    expect(screen.getByRole('status').textContent).toBe('');
    expect(screen.getByRole('button', { name: 'Copy' })).toBeTruthy();
  });

  it('uses the page language for its labels', async () => {
    const user = userEvent.setup();
    render(withDictionary(<CopyButton text={COMMAND} />, 'ja'));

    await user.click(screen.getByRole('button', { name: ja.common.copy }));

    expect(screen.getByRole('status').textContent).toBe(ja.common.copied);
  });
});
