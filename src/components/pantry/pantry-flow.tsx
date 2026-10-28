'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { pantryFacts } from '@/content/pages/pantry/facts';
import type { PantryContent, PantryStep } from '@/content/pages/pantry/types';
import { cn } from '@/lib/utils';

import styles from './pantry-flow.module.css';

/** How long each step stays up while the sequence plays. */
export const STEP_MS = 7000;

/** How a transcript line reads: a command, a comment, a verdict or output. */
function lineKind(line: string) {
  if (line.startsWith('$ ')) return 'command';
  if (line.startsWith('# ')) return 'comment';
  if (/^\s*[✗⚠]/.test(line)) return 'flag';
  if (/^\s*✓/.test(line)) return 'pass';
  return 'output';
}

const LINE_CLASS = {
  command: 'text-foreground',
  comment: 'text-muted-foreground',
  flag: 'text-brand-ink',
  pass: 'text-foreground',
  output: 'text-soft',
} as const;

/**
 * Install → Scan → Cache → Fix. The steps are a tab list; the terminal plays
 * the selected step's transcript line by line, and the flow under it shows
 * where data goes at that step. It plays through on its own once on screen,
 * holds while a mouse is over it, pauses with the button, and stops when
 * someone picks a step. With reduced motion it never plays on its own and
 * nothing animates.
 */
export function PantryFlow({
  copy,
  transcripts,
}: {
  copy: PantryContent['how'];
  transcripts: Record<PantryStep, readonly string[]>;
}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [held, setHeld] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const steps = copy.steps;
  const step = steps[active];

  // Start playing the first time the sequence is on screen, unless the
  // visitor asked for less motion.
  useEffect(() => {
    const node = root.current;
    if (!node || !('IntersectionObserver' in window)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || held) return;
    const timer = setTimeout(
      () => setActive((index) => (index + 1) % steps.length),
      STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [playing, held, active, steps.length]);

  const choose = (index: number) => {
    setPlaying(false);
    setActive(index);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next: number | undefined;
    if (event.key in keys) {
      next = (active + keys[event.key] + steps.length) % steps.length;
    } else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  };

  const panelId = `${id}-panel`;
  const lines = transcripts[step.id];

  return (
    <div
      ref={root}
      className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setHeld(true);
      }}
      onPointerLeave={() => setHeld(false)}
    >
      <div className="flex flex-col gap-4">
        <div
          role="tablist"
          aria-label={copy.stepsLabel}
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex flex-col"
        >
          {steps.map((item, index) => {
            const selected = index === active;
            return (
              <div
                key={item.id}
                className={cn(
                  'relative border-l-2 py-4 pl-5 transition-colors',
                  selected ? 'border-brand' : 'border-foreground/10',
                )}
              >
                <button
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => choose(index)}
                  className="flex w-full flex-col items-start gap-1 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="label-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, '0')} · {item.label}
                  </span>
                  <span
                    className={cn(
                      'font-serif text-[26px] leading-[1.1] transition-colors md:text-[30px]',
                      selected ? 'text-foreground' : 'text-soft',
                    )}
                  >
                    {item.title}
                  </span>
                </button>
                <p
                  className={cn(
                    'mt-3 max-w-[460px] text-[15px] leading-[1.6] text-muted-foreground',
                    !selected && 'hidden',
                  )}
                >
                  {item.body}
                </p>
                {selected && playing && !held && (
                  <span
                    aria-hidden
                    key={`progress-${active}`}
                    className={styles.progress}
                    style={{ animationDuration: `${STEP_MS}ms` }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="inline-flex w-fit items-center gap-2 rounded-full px-1 label-mono text-[11px] text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          {playing ? (
            <Pause aria-hidden className="size-3.5" />
          ) : (
            <Play aria-hidden className="size-3.5" />
          )}
          {playing ? copy.pause : copy.play}
        </button>
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${id}-tab-${step.id}`}
        className="flex min-w-0 flex-col gap-4"
      >
        <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-card">
          <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-[22px] py-4 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-off" />
                <span className="size-2.5 rounded-full bg-off" />
                <span className="size-2.5 rounded-full bg-off" />
              </span>
              {pantryFacts.command}
            </span>
            <span>{step.label}</span>
          </div>
          <pre
            tabIndex={0}
            aria-label={`${copy.stepsLabel}: ${step.label}`}
            className="min-h-[300px] overflow-x-auto px-4 py-5 font-mono text-[12px] leading-[1.75] sm:px-6 sm:py-6 sm:text-[13px]"
          >
            <code key={step.id}>
              {lines.map((line, index) => {
                const kind = lineKind(line);
                return (
                  <span
                    key={index}
                    className={cn('block', styles.line, LINE_CLASS[kind])}
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    {kind === 'command' ? (
                      <>
                        <span className="text-brand-ink">$</span>
                        {line.slice(1)}
                      </>
                    ) : (
                      line || ' '
                    )}
                  </span>
                );
              })}
            </code>
          </pre>
        </div>

        <ol
          key={`flow-${step.id}`}
          aria-label={step.title}
          className={cn('flex items-stretch', styles.flow)}
        >
          {step.flow.map((stop, index) => (
            <li
              key={stop}
              className={cn(
                'relative flex min-h-14 flex-1 items-center justify-center rounded-xl border px-2 py-2 text-center text-[12px] leading-snug sm:px-3 sm:text-[13px]',
                index === 1
                  ? 'border-brand/50 bg-brand/10 text-foreground'
                  : 'border-foreground/10 bg-card text-soft',
                styles.stop,
              )}
              style={{ '--i': index } as React.CSSProperties}
            >
              {stop}
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">{step.note}</p>
        <p className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
          {copy.caption}
        </p>
      </div>
    </div>
  );
}
