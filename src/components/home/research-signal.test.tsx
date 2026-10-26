import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ToolResearch } from './tool-research';
import { toolResearch } from '@/content/pages/tool-research';
import { withDictionary } from '@/i18n/test-utils';

describe('research signal weave', () => {
  it('explains each stage through keyboard controls while leaving measured evidence intact', async () => {
    const user = userEvent.setup();
    render(withDictionary(<ToolResearch content={toolResearch.en} />));
    const inspect = screen.getByRole('button', {
      name: /Inspect the failure/,
    });
    const change = screen.getByRole('button', {
      name: /Change the inference path/,
    });
    const verify = screen.getByRole('button', { name: /Verify the result/ });
    expect(inspect.getAttribute('aria-pressed')).toBe('true');
    expect(
      screen.getByRole('heading', { name: 'Inspect the failure' }),
    ).toBeTruthy();
    expect(
      screen.queryByRole('heading', { name: 'Change the inference path' }),
    ).toBeNull();
    change.focus();
    await user.keyboard('{Enter}');
    expect(change.getAttribute('aria-pressed')).toBe('true');
    expect(inspect.getAttribute('aria-pressed')).toBe('false');
    expect(
      screen.getByRole('heading', { name: 'Change the inference path' }),
    ).toBeTruthy();
    expect(
      screen.queryByRole('heading', { name: 'Inspect the failure' }),
    ).toBeNull();
    await user.click(verify);
    expect(
      screen.getByRole('heading', { name: 'Verify the result' }),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Replay signal' }));
    expect(verify.getAttribute('aria-pressed')).toBe('true');
    expect(
      screen.getAllByRole('meter').map((m) => m.getAttribute('aria-valuenow')),
    ).toEqual(['36', '56']);
    expect(screen.getByText(/not a neuron activation capture/)).toBeTruthy();
  });
});
