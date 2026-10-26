'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ToolResearchCopy } from '@/content/pages/tool-research';
import { cn } from '@/lib/utils';
import styles from './inference-example.module.css';

/** Pause between steps when replaying, in ms. */
const REPLAY_STEP_MS = 1400;

/**
 * The example every panel shows: a tool parameter typed `number | null`, and
 * a model that wrote the number as a string. Illustrative (one member of the
 * type-mismatch failure family), never a captured trace; the card says so.
 */
const SCHEMA = 'value: number | null';
const WRONG_OUTPUT = { before: '{"value": ', wrong: '"7"', after: '}' };
const RIGHT_OUTPUT = { before: '{"value": ', right: '7', after: '}' };

function CodeBlock({
  children,
  dimmed = false,
}: {
  children: React.ReactNode;
  dimmed?: boolean;
}) {
  return (
    <pre
      className={cn(
        'mt-5 overflow-x-auto rounded-lg border border-foreground/10 bg-background/60 px-4 py-4 font-mono text-[13px] leading-[1.8] text-foreground transition-opacity duration-300',
        dimmed && 'opacity-40',
      )}
    >
      <code>{children}</code>
    </pre>
  );
}

function Comment({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground">
      {'// '}
      {children}
    </span>
  );
}

/**
 * "From evidence to an inference change" as a three-step card. Every step's
 * panel is rendered in the same grid cell, so the tallest one sets the height
 * and switching steps never moves the content below it; inactive panels are
 * invisible and hidden from assistive tech. Transitions are opacity and
 * transform only (reduced motion turns them off globally).
 */
export function InferenceExample({
  steps,
  copy,
}: {
  steps: ToolResearchCopy['steps'];
  copy: ToolResearchCopy['example'];
}) {
  const id = useId();
  const [stage, setStage] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    for (const timer of timers.current) clearTimeout(timer);
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const select = (index: number) => {
    clearTimers();
    setStage(index);
  };
  const replay = () => {
    clearTimers();
    setStage(0);
    timers.current = steps
      .slice(1)
      .map((_, index) =>
        setTimeout(() => setStage(index + 1), REPLAY_STEP_MS * (index + 1)),
      );
  };

  const panels = [
    <CodeBlock key="inspect">
      <Comment>{copy.schema}</Comment>
      {'\n'}
      {SCHEMA}
      {'\n\n'}
      <Comment>{copy.output}</Comment>
      {'\n'}
      {WRONG_OUTPUT.before}
      <span className="underline decoration-brand decoration-2 underline-offset-4">
        {WRONG_OUTPUT.wrong}
      </span>
      {WRONG_OUTPUT.after}
      {'\n'}
      <span className="text-brand-ink">
        <span aria-hidden="true">{'         ^ '}</span>
        {copy.flag}
      </span>
    </CodeBlock>,
    <div key="change">
      <CodeBlock dimmed>
        <Comment>{copy.schema}</Comment>
        {'\n'}
        {SCHEMA}
        {'\n\n'}
        <Comment>{copy.output}</Comment>
        {'\n'}
        {WRONG_OUTPUT.before}
        {WRONG_OUTPUT.wrong}
        {WRONG_OUTPUT.after}
      </CodeBlock>
      <p className="mt-4 flex items-center gap-2.5 font-mono text-xs text-brand-ink">
        <span
          aria-hidden="true"
          className={cn(
            'size-2 shrink-0 rounded-full bg-brand',
            stage === 1 && styles.working,
          )}
        />
        {copy.inProgress}
      </p>
    </div>,
    <CodeBlock key="verify">
      <Comment>{copy.schema}</Comment>
      {'\n'}
      {SCHEMA}
      {'\n\n'}
      <Comment>{copy.output}</Comment>
      {'\n'}
      {RIGHT_OUTPUT.before}
      <span className="text-brand-ink">{RIGHT_OUTPUT.right}</span>
      {RIGHT_OUTPUT.after}
      {'\n'}
      <span className="text-brand-ink">
        <span aria-hidden="true">{'         ✓ '}</span>
        {copy.check}
      </span>
    </CodeBlock>,
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/12 bg-card">
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
        <p className="min-w-0 flex-1 label-mono text-brand-ink">{copy.label}</p>
        <Button variant="ghost" size="sm" onClick={replay} className="-mt-1">
          {copy.replay}
        </Button>
      </div>
      <div
        role="group"
        aria-label={copy.controls}
        className="grid grid-cols-3 border-y border-foreground/12"
      >
        {steps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            aria-pressed={stage === index}
            aria-controls={`${id}-panel-${index}`}
            onClick={() => select(index)}
            className={cn(
              'min-h-20 border-r border-foreground/12 px-3 py-3 text-left text-xs leading-relaxed transition-colors last:border-r-0 hover:bg-brand/8 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
              stage === index
                ? 'bg-brand/8 text-foreground'
                : 'text-muted-foreground',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'mb-1 block font-mono',
                stage === index ? 'text-brand-ink' : 'text-muted-foreground',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            {step.title}
          </button>
        ))}
      </div>
      {/* One grid cell; every panel stacks in it so the tallest sets the height. */}
      <div className="grid px-5 py-5">
        {steps.map((step, index) => {
          const active = stage === index;
          return (
            <div
              key={step.title}
              id={`${id}-panel-${index}`}
              aria-hidden={!active}
              data-active={active || undefined}
              className={cn(
                'transition-[opacity,transform] duration-300 ease-out [grid-area:1/1]',
                active
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible translate-y-1 opacity-0',
              )}
            >
              <h4 className="text-lg text-foreground">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              {panels[index]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
