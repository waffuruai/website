'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useDictionary } from '@/i18n/dictionary-provider';
import { cn } from '@/lib/utils';

/** How long "Copied" stays up before the button resets. */
const RESET_MS = 2000;

/**
 * Copies a code block to the clipboard. The label flips to "Copied" and a
 * polite live region announces it, so screen reader users get the same
 * confirmation. Needs the Clipboard API (secure contexts); without it the
 * click does nothing rather than claiming success.
 */
export function CopyButton({
  text,
  label,
  className,
}: {
  text: string;
  /** Names the block ("unary.rs") so several buttons on a page differ. */
  label?: string;
  className?: string;
}) {
  const { common } = useDictionary();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_MS);
  }

  const state = copied ? common.copied : common.copy;
  const Icon = copied ? Check : Copy;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={label ? `${state} ${label}` : undefined}
        className={cn(
          '-my-1 -mr-2 inline-flex h-8 items-center gap-1.5 rounded-md px-2 label-mono text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          copied && 'text-brand-ink hover:text-brand-ink',
          className,
        )}
      >
        <Icon aria-hidden className="size-3.5" />
        <span>{state}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? common.copied : ''}
      </span>
    </>
  );
}
