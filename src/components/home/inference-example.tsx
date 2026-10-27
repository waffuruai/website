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

/**
 * The code block grows to fill whatever height the card has (`flex-1`), so
 * the step card can match the figure card beside it without a dead zone.
 */
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
        'mt-5 flex flex-1 flex-col overflow-x-auto rounded-lg border border-foreground/10 bg-background/60 px-4 py-4 font-mono text-[13px] leading-[1.8] text-foreground transition-opacity duration-300',
        dimmed && 'opacity-40',
      )}
    >
      {/* Rows spread over the block's height at desktop and sit at their
          natural spacing on phones. */}
      <code className="flex flex-1 flex-col justify-evenly gap-4">
        {children}
      </code>
    </pre>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <span className="block">{children}</span>;
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
 * "From evidence to an inference change" as a three-step card, styled as the
 * twin of the figure card beside it: same container, a mono label on top, a
 * hairline-separated tab row, and a caption at the bottom. Every step's
 * panel is rendered in the same grid cell, so the tallest one sets the height
 * and switching steps never moves the content below it; inactive panels are
 * invisible and hidden from assistive tech. Transitions are opacity and
 * transform only (reduced motion turns them off globally).
 */
export function InferenceExample({
  title,
  steps,
  copy,
}: {
  title: string;
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

  const schema = (
    <Row>
      <Comment>{copy.schema}</Comment>
      {'\n'}
      {SCHEMA}
    </Row>
  );
  const panels = [
    <CodeBlock key="inspect">
      {schema}
      <Row>
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
      </Row>
    </CodeBlock>,
    <div key="change" className="flex flex-1 flex-col">
      <CodeBlock dimmed>
        {schema}
        <Row>
          <Comment>{copy.output}</Comment>
          {'\n'}
          {WRONG_OUTPUT.before}
          {WRONG_OUTPUT.wrong}
          {WRONG_OUTPUT.after}
        </Row>
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
      {schema}
      <Row>
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
      </Row>
    </CodeBlock>,
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-foreground/12 bg-card p-6 sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <h3 className="min-w-0 label-mono text-muted-foreground">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={replay}
          className="-mt-2 -mr-2.5 text-soft"
        >
          {copy.replay}
        </Button>
      </div>
      <div
        role="group"
        aria-label={copy.controls}
        className="-mx-3 grid grid-cols-3 border-y border-foreground/12"
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
      {/* One grid cell; every panel stacks in it so the tallest sets the
          height, and the cell grows to fill the card. */}
      <div className="grid flex-1 py-6">
        {steps.map((step, index) => {
          const active = stage === index;
          return (
            <div
              key={step.title}
              id={`${id}-panel-${index}`}
              aria-hidden={!active}
              data-active={active || undefined}
              className={cn(
                'flex flex-col transition-[opacity,transform] duration-300 ease-out [grid-area:1/1]',
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
      <p className="mt-auto border-t border-foreground/12 pt-5 text-xs leading-relaxed text-muted-foreground">
        {copy.label}
      </p>
    </div>
  );
}
