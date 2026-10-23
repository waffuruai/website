'use client';

import { useEffect, useRef, useState } from 'react';

import { useDictionary } from '@/i18n/dictionary-provider';
import { cn } from '@/lib/utils';

/** How long "Copied" stays before the button resets. */
const RESET_MS = 1600;

/**
 * Shows a value (a hex colour) and copies it to the clipboard on click. It
 * reads "Copy #0a0908" (the visible text is the accessible name). The label
 * flips to "Copied" for a moment, and a polite live region announces it to
 * screen readers. Where the clipboard is unavailable the value is still
 * on screen to select, so a failed copy is silent.
 */
export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { common } = useDictionary();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_MS);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          'inline-flex min-h-11 items-center gap-3 rounded-full border border-foreground/16 px-4 transition-colors hover:border-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          className,
        )}
      >
        <span
          className={cn(
            'label-mono',
            copied ? 'text-brand-ink' : 'text-muted-foreground',
          )}
        >
          {copied ? common.copied : common.copy}
        </span>{' '}
        <span className="font-mono text-[13px]">{value}</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? common.copied : ''}
      </span>
    </>
  );
}
