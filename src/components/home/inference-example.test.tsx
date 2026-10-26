import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InferenceExample } from './inference-example';
import { toolResearch } from '@/content/pages/tool-research';

const { steps, example } = toolResearch.en;

const panels = (container: HTMLElement) => [
  ...container.querySelectorAll(
    '[id$="-panel-0"], [id$="-panel-1"], [id$="-panel-2"]',
  ),
];

const activeHeading = (container: HTMLElement) =>
  container.querySelector('[data-active] h4')?.textContent;

describe('InferenceExample', () => {
  it('keeps every step panel in the DOM and switches which one is visible', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <InferenceExample steps={steps} copy={example} />,
    );
    const buttons = steps.map((step) =>
      screen.getByRole('button', { name: new RegExp(step.title) }),
    );
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(panels(container)).toHaveLength(3);
    expect(
      panels(container).map((panel) => panel.getAttribute('aria-hidden')),
    ).toEqual(['false', 'true', 'true']);
    expect(activeHeading(container)).toBe('Inspect the failure');
    expect(screen.getByText('string, expected number')).toBeTruthy();

    buttons[1].focus();
    await user.keyboard('{Enter}');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(activeHeading(container)).toBe('Change the inference path');
    expect(screen.getByText(example.inProgress)).toBeTruthy();
    // Nothing remounts: the same three panels, only the active one changed.
    expect(
      panels(container).map((panel) => panel.getAttribute('aria-hidden')),
    ).toEqual(['true', 'false', 'true']);

    await user.click(buttons[2]);
    expect(activeHeading(container)).toBe('Verify the result');
    expect(screen.getByText('exact value and type')).toBeTruthy();
    expect(screen.getByText(example.label)).toBeTruthy();
  });

  describe('replay', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('cycles the steps on timers and clears them on unmount', () => {
      const { container, unmount } = render(
        <InferenceExample steps={steps} copy={example} />,
      );
      act(() => {
        screen.getByRole('button', { name: example.replay }).click();
      });
      expect(activeHeading(container)).toBe('Inspect the failure');
      act(() => {
        vi.advanceTimersByTime(1400);
      });
      expect(activeHeading(container)).toBe('Change the inference path');
      act(() => {
        vi.advanceTimersByTime(1400);
      });
      expect(activeHeading(container)).toBe('Verify the result');

      act(() => {
        screen.getByRole('button', { name: example.replay }).click();
      });
      expect(vi.getTimerCount()).toBe(2);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});
