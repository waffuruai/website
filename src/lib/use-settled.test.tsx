import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useSettled } from '@/lib/use-settled';

function Probe() {
  return <p>{useSettled(4000) ? 'settled' : 'waiting'}</p>;
}

const setReadyState = (state: DocumentReadyState) =>
  Object.defineProperty(document, 'readyState', {
    configurable: true,
    get: () => state,
  });

describe('useSettled', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setReadyState('complete');
  });

  afterEach(() => {
    vi.useRealTimers();
    setReadyState('complete');
  });

  it('waits for the timeout when nobody interacts', () => {
    render(<Probe />);
    expect(screen.getByText('waiting')).toBeTruthy();
    act(() => void vi.advanceTimersByTime(3999));
    expect(screen.getByText('waiting')).toBeTruthy();
    act(() => void vi.advanceTimersByTime(1));
    expect(screen.getByText('settled')).toBeTruthy();
  });

  it('settles at once when the visitor interacts', () => {
    render(<Probe />);
    act(() => void window.dispatchEvent(new Event('pointermove')));
    expect(screen.getByText('settled')).toBeTruthy();
  });

  it('defaults to two seconds', () => {
    function Default() {
      return <p>{useSettled() ? 'settled' : 'waiting'}</p>;
    }
    render(<Default />);
    act(() => void vi.advanceTimersByTime(1999));
    expect(screen.getByText('waiting')).toBeTruthy();
    act(() => void vi.advanceTimersByTime(1));
    expect(screen.getByText('settled')).toBeTruthy();
  });

  it('asks `allow` once it settles and stays false when refused', () => {
    const allow = vi.fn(() => false);
    function Gated() {
      return <p>{useSettled(2000, allow) ? 'settled' : 'waiting'}</p>;
    }
    render(<Gated />);
    expect(allow).not.toHaveBeenCalled();
    act(() => void vi.advanceTimersByTime(2000));
    expect(allow).toHaveBeenCalledTimes(1);
    expect(screen.getByText('waiting')).toBeTruthy();
    act(() => void window.dispatchEvent(new Event('pointermove')));
    expect(allow).toHaveBeenCalledTimes(1);
    expect(screen.getByText('waiting')).toBeTruthy();
  });

  it('ignores interaction and time until the page has loaded', () => {
    setReadyState('loading');
    render(<Probe />);
    act(() => {
      window.dispatchEvent(new Event('pointermove'));
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByText('waiting')).toBeTruthy();

    act(() => void window.dispatchEvent(new Event('load')));
    act(() => void window.dispatchEvent(new Event('scroll')));
    expect(screen.getByText('settled')).toBeTruthy();
  });
});
