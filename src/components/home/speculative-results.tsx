'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import type {
  SpeculativeResearchCopy,
  speculativeEvidence,
} from '@/content/pages/speculative-research';
import styles from './speculative-results.module.css';

type Evidence = typeof speculativeEvidence;

/**
 * The measured cards (absolute throughput, with the per-user experience on
 * the burst card), then the paired optimization gain under its own heading
 * so the two kinds of number never read as one.
 */
export function SpeculativeResults({
  content,
  evidence,
}: {
  content: SpeculativeResearchCopy;
  evidence: Evidence;
}) {
  const [mode, setMode] = useState<'greedy' | 'sampled'>('greedy');
  const [replay, setReplay] = useState(0);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const result = evidence[mode];
  const cards = [
    {
      label: content.singleTitle,
      value: result.single.toFixed(1),
      unit: content.unit,
      scope: content.singleScope,
      highlight: false,
      rows: [
        {
          label: content.metrics.prefill,
          value: `${result.prefill} ${content.unit}`,
        },
        {
          label: content.ttft,
          value: `${result.ttft.toFixed(2)} s`,
        },
      ],
    },
    {
      label: content.burstTitle,
      value: result.burst.toFixed(1),
      unit: content.unit,
      scope: content.burstScope,
      highlight: true,
      rows: [
        {
          label: content.perRequest,
          value: `${result.lane.toFixed(1)} ${content.unit}`,
        },
        {
          label: `${content.ttft} ${content.p50} / ${content.p90}`,
          value: `${result.concurrentTtft.toFixed(1)} s / ${result.concurrentTtftP90.toFixed(1)} s`,
        },
      ],
    },
  ];
  return (
    <div ref={root}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          {evidence.model}
          <br />
          {evidence.hardware}
        </p>
        <div
          role="group"
          aria-label={content.metrics.sampling}
          className="flex flex-wrap gap-2 rounded-xl border border-foreground/12 bg-card p-1.5"
        >
          {(['greedy', 'sampled'] as const).map((value) => (
            <Button
              key={value}
              size="lg"
              variant={mode === value ? 'default' : 'ghost'}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {content[value]}
            </Button>
          ))}
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="grid gap-3 md:grid-cols-2"
      >
        {cards.map((card) => (
          <div
            key={card.label}
            className={`flex flex-col rounded-2xl border p-6 sm:p-7 ${card.highlight ? 'border-brand/40 bg-brand/6' : 'border-foreground/12 bg-card'}`}
          >
            <h3 className="text-sm text-soft">{card.label}</h3>
            <p className="mt-7 mb-4 flex flex-wrap items-baseline gap-2 font-mono text-[clamp(38px,4.5vw,60px)] leading-none tracking-[-0.06em] text-foreground tabular-nums">
              {card.value}
              <span className="text-base tracking-normal text-brand-ink">
                {card.unit}
              </span>
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {card.scope}
            </p>
            <dl className="mt-auto grid gap-2 border-t border-foreground/12 pt-5 text-sm">
              {card.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                >
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-mono text-sm text-foreground tabular-nums">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <h3 className="mt-12 mb-4 label-mono text-muted-foreground">
        {content.gainHeading}
      </h3>
      <div className="overflow-hidden rounded-2xl border border-foreground/12 bg-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/12 px-6 py-5 sm:px-8">
          <p className="label-mono text-brand-ink">{content.illustration}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setVisible(true);
              setReplay(replay + 1);
            }}
          >
            {content.replay}
          </Button>
        </div>
        <div
          key={`${mode}-${replay}`}
          className={`${visible ? styles.ready : ''} grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]`}
        >
          <div className="p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)_20px_minmax(0,1fr)] items-center gap-2 sm:gap-4"
            >
              <div>
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: evidence.concurrency }, (_, i) => (
                    <span
                      key={i}
                      className={`${styles.lane} flex aspect-square items-center justify-center rounded border border-brand/25 bg-brand/10 font-mono text-xs text-brand-ink`}
                      style={{ animationDelay: `${i < 8 ? 0 : 1.3}s` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  ))}
                </div>
                <p className="mt-4 min-h-10 text-center text-xs leading-relaxed text-soft">
                  {content.privateLanes}
                </p>
              </div>
              <span className="pb-14 text-center text-brand-ink">→</span>
              <div>
                <div
                  className={`${styles.verifier} flex aspect-square items-center justify-center rounded-2xl border border-brand/50 bg-brand/8 p-3`}
                >
                  <div className="grid w-full grid-cols-4 gap-1.5">
                    {Array.from({ length: 8 }, (_, i) => (
                      <span key={i} className="h-5 rounded-sm bg-brand/60" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 min-h-10 text-center text-xs leading-relaxed text-soft">
                  {content.sharedVerify}
                </p>
              </div>
              <span className="pb-14 text-center text-brand-ink">→</span>
              <div>
                <div className="flex aspect-square flex-col justify-center gap-2">
                  {Array.from({ length: 3 }, (_, i) => (
                    <span
                      key={i}
                      className={`${styles.token} h-5 rounded-sm bg-brand`}
                      style={{ animationDelay: `${1 + i * 0.3}s` }}
                    />
                  ))}
                </div>
                <p className="mt-4 min-h-10 text-center text-xs leading-relaxed text-soft">
                  {content.committed}
                </p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              {content.diagramNote}
            </p>
          </div>
          <div className="border-t border-foreground/12 p-6 sm:p-8 lg:border-t-0 lg:border-l">
            <h4 className="text-sm text-soft">{content.gainTitle}</h4>
            <p className="mt-4 flex flex-wrap items-baseline gap-2 font-mono text-[clamp(34px,3.5vw,48px)] leading-none tracking-[-0.06em] text-foreground tabular-nums">
              +{result.gain.toFixed(2)}
              <span className="text-base tracking-normal text-brand-ink">
                %
              </span>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {content.gainScope}
            </p>
            <h3 className="mt-7 font-serif text-3xl leading-tight text-foreground">
              {content.activeTitle}
            </h3>
            <dl className="mt-6 space-y-5">
              {[
                {
                  label: content.before,
                  value: result.before,
                  candidate: false,
                },
                { label: content.after, value: result.after, candidate: true },
              ].map((row) => (
                // dt/dd must be direct children of the row div (axe
                // `definition-list` / `dlitem`); the bar is a second dd.
                <div
                  key={row.label}
                  className="flex flex-wrap items-baseline justify-between gap-x-2"
                >
                  <dt className="text-sm text-muted-foreground">{row.label}</dt>
                  <dd className="font-mono text-xl text-foreground tabular-nums">
                    {row.value.toFixed(2)}{' '}
                    <span className="text-xs text-muted-foreground">
                      {content.unit}
                    </span>
                  </dd>
                  <dd
                    aria-hidden="true"
                    className="mt-2 h-2 basis-full overflow-hidden rounded-sm bg-foreground/6"
                  >
                    <div
                      className={`${styles.bar} h-full origin-left ${row.candidate ? 'bg-brand' : 'bg-foreground/30'}`}
                      style={{
                        width: `${(row.value / 250) * 100}%`,
                        animationDelay: row.candidate ? '400ms' : '0ms',
                      }}
                    />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              {content.activeScope}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
