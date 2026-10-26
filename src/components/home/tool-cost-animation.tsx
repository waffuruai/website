'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [replay, setReplay] = useState(0);
  const addedTokens = evidence.candidateTokens - evidence.baselineTokens;
  const overheadPercent = (
    (addedTokens / evidence.baselineTokens) *
    100
  ).toFixed(1);
  const number = (value: number) => value.toLocaleString('en-US');
  const tracks = [
    {
      label: copy.accuracy,
      accuracy: true,
      summary: `+${evidence.candidate - evidence.baseline} ${copy.accuracyGain}`,
      max: evidence.requests,
      before: evidence.baseline,
      after: evidence.candidate,
      format: (n: number) =>
        `${n} / ${evidence.requests} · ${((n / evidence.requests) * 100).toFixed(1)}%`,
    },
    {
      label: copy.tokens,
      accuracy: false,
      summary: `+${number(addedTokens)} (+${overheadPercent}%) ${copy.tokenOverhead}`,
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
      <p className="mb-6 label-mono text-muted-foreground">{copy.measured}</p>
      <div key={replay} className="grid gap-8 md:grid-cols-2">
        {tracks.map((track) => (
          <div key={track.label}>
            <p className="mb-4 text-sm text-soft">{track.label}</p>
            {[
              { label: baselineLabel, value: track.before, candidate: false },
              { label: candidateLabel, value: track.after, candidate: true },
            ].map((row) => (
              <div key={row.label} className="mb-4">
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
                    className={`${styles.grow} h-full origin-left ${row.candidate && track.accuracy ? 'bg-brand' : row.candidate ? 'bg-foreground/60' : 'bg-foreground/30'}`}
                    style={{
                      width: `${(row.value / track.max) * 100}%`,
                      animationDelay: row.candidate ? '250ms' : '0ms',
                      animationName: visible || replay > 0 ? undefined : 'none',
                    }}
                  />
                </div>
              </div>
            ))}
            <p
              className={`mt-5 font-mono text-sm tabular-nums ${track.accuracy ? 'text-brand-ink' : 'text-foreground'}`}
            >
              {track.summary}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-foreground/12 pt-5 text-sm leading-relaxed text-muted-foreground">
        {copy.boundary}
      </p>
    </div>
  );
}
