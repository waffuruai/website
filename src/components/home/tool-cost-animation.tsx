'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ToolResearchCopy } from '@/content/pages/tool-research';
import styles from './tool-cost-animation.module.css';

type Evidence = {
  baseline: number;
  candidate: number;
  requests: number;
  baselineTokens: number;
  candidateTokens: number;
};

/** A counterfactual cost budget; it never changes the measured accuracy. */
export function workflowTokenScenario(
  candidateTokens: number,
  repairs: number,
) {
  return candidateTokens - repairs * 1000;
}

export function ToolCostAnimation({
  copy,
  baselineLabel,
  candidateLabel,
  evidence,
}: {
  copy: ToolResearchCopy['animation'];
  baselineLabel: string;
  candidateLabel: string;
  evidence: Evidence;
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const [repairs, setRepairs] = useState(0);
  const [replay, setReplay] = useState(0);
  const estimate = workflowTokenScenario(evidence.candidateTokens, repairs);
  const difference = estimate - evidence.baselineTokens;
  const number = (value: number) => value.toLocaleString('en-US');
  const tracks = [
    {
      label: copy.accuracy,
      max: evidence.requests,
      before: evidence.baseline,
      after: evidence.candidate,
      format: (n: number) =>
        `${n} / ${evidence.requests} · ${((n / evidence.requests) * 100).toFixed(1)}%`,
    },
    {
      label: copy.tokens,
      max: evidence.candidateTokens,
      before: evidence.baselineTokens,
      after: evidence.candidateTokens,
      format: number,
    },
  ];

  return (
    <div
      ref={root}
      className="mt-10 rounded-2xl border border-foreground/12 bg-card p-6 sm:p-8"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-serif text-3xl text-foreground">{copy.title}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setReplay(replay + 1)}
        >
          {copy.replay}
        </Button>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-6 label-mono text-brand-ink">{copy.measured}</p>
          <div key={replay} className="space-y-7">
            {tracks.map((track) => (
              <div key={track.label}>
                <p className="mb-3 text-sm text-soft">{track.label}</p>
                {[
                  {
                    label: baselineLabel,
                    value: track.before,
                    candidate: false,
                  },
                  {
                    label: candidateLabel,
                    value: track.after,
                    candidate: true,
                  },
                ].map((row) => (
                  <div key={row.label} className="mb-3">
                    <div className="mb-2 flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                      <span>{row.label}</span>
                      <span className="font-mono text-foreground tabular-nums">
                        {track.format(row.value)}
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="h-2 overflow-hidden rounded-sm bg-foreground/6"
                    >
                      <div
                        className={`${styles.grow} h-full origin-left ${row.candidate ? 'bg-brand' : 'bg-foreground/30'}`}
                        style={{
                          width: `${(row.value / track.max) * 100}%`,
                          animationDelay: row.candidate ? '250ms' : '0ms',
                          animationName:
                            visible || replay > 0 ? undefined : 'none',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-foreground/12 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
          <p className="mb-4 label-mono text-brand-ink">{copy.scenario}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {copy.assumption}
          </p>
          <label
            htmlFor={id}
            className="mt-6 mb-3 flex justify-between gap-3 text-sm text-soft"
          >
            {copy.repairs}
            <span className="font-mono text-foreground">{repairs}</span>
          </label>
          <input
            id={id}
            type="range"
            min="0"
            max="30"
            step="1"
            value={repairs}
            onChange={(event) => setRepairs(Number(event.target.value))}
            className="h-8 w-full accent-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          />
          <div
            aria-hidden="true"
            className="mt-4 h-3 overflow-hidden rounded-sm bg-foreground/6"
          >
            <div
              className="h-full bg-brand transition-[width] duration-700 ease-out"
              style={{
                width: `${(estimate / evidence.candidateTokens) * 100}%`,
              }}
            />
          </div>
          <dl
            aria-live="polite"
            aria-atomic="true"
            className="mt-5 grid gap-4 sm:grid-cols-2"
          >
            <div>
              <dt className="text-xs text-muted-foreground">{copy.estimate}</dt>
              <dd className="mt-2 font-mono text-2xl text-foreground tabular-nums">
                {number(estimate)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {copy.difference}
              </dt>
              <dd className="mt-2 font-mono text-2xl text-brand-ink tabular-nums">
                {difference > 0 ? '+' : ''}
                {number(difference)}
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {copy.boundary}
          </p>
        </div>
      </div>
    </div>
  );
}
