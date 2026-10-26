'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { ToolResearchCopy } from '@/content/pages/tool-research';
import styles from './research-signal.module.css';

/** A deterministic, waffle-like neural weave. Geometry is illustrative, never model telemetry. */
function point(column: number, row: number, layer: number) {
  const x = 330 + (column - 5.5) * 35 + (row - 3) * 23;
  const y =
    168 +
    (row - 3) * 17 -
    (column - 5.5) * 6 +
    Math.sin(column * 0.46 + row * 0.5) * 22 +
    (layer - 1) * 43;
  return { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
}
const layers = [0, 1, 2].map((layer) => ({
  rows: Array.from({ length: 7 }, (_, row) =>
    Array.from({ length: 12 }, (_, column) => point(column, row, layer)),
  ),
  columns: Array.from({ length: 12 }, (_, column) =>
    Array.from({ length: 7 }, (_, row) => point(column, row, layer)),
  ),
  signal: Array.from({ length: 12 }, (_, column) =>
    point(column, 3 + Math.sin(column * 0.75 + layer) * 1.8, layer),
  ),
}));
const coordinates = (points: { x: number; y: number }[]) =>
  points.map((p) => `${p.x},${p.y}`).join(' ');

export function ResearchSignal({
  steps,
  copy,
}: {
  steps: ToolResearchCopy['steps'];
  copy: ToolResearchCopy['neural'];
}) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [replay, setReplay] = useState(0);
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

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-2xl border border-foreground/12 bg-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5">
        <p className="label-mono text-brand-ink">{copy.label}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setVisible(true);
            setReplay(replay + 1);
          }}
        >
          {copy.replay}
        </Button>
      </div>
      <div
        key={`${stage}-${replay}`}
        className={visible ? styles.awake : undefined}
      >
        <svg
          viewBox="0 0 660 335"
          fill="none"
          aria-hidden="true"
          focusable="false"
          className="block w-full text-brand-ink"
        >
          <defs>
            <radialGradient id={`${id}-halo`}>
              <stop stopColor="currentColor" stopOpacity=".12" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse
            cx="330"
            cy="180"
            rx="300"
            ry="145"
            fill={`url(#${id}-halo)`}
          />
          <g
            className="text-foreground/8"
            stroke="currentColor"
            strokeWidth=".7"
          >
            <path d="M30 280H630M30 55H630M52 32V303M608 32V303" />
            <path d="M30 272v16m-8-8h16M630 47v16m-8-8h16" />
          </g>
          {layers.map((layer, index) => (
            <g
              key={index}
              className={styles.layer}
              opacity={index === stage ? 1 : 0.26}
            >
              <g
                stroke="currentColor"
                strokeWidth=".7"
                opacity={index === stage ? 0.42 : 0.32}
              >
                {[...layer.rows, ...layer.columns].map((line, i) => (
                  <polyline key={i} points={coordinates(line)} />
                ))}
              </g>
              {layer.rows.flatMap((row, j) =>
                row.map((p, i) => (
                  <circle
                    key={`${i}-${j}`}
                    cx={p.x}
                    cy={p.y}
                    r={(i + j + index) % 4 === 0 ? 2 : 1.1}
                    fill="currentColor"
                    opacity={index === stage ? 0.65 : 0.35}
                  />
                )),
              )}
              {index === stage && (
                <>
                  <polyline
                    points={coordinates(layer.signal)}
                    stroke="currentColor"
                    strokeWidth="12"
                    opacity=".08"
                    strokeLinejoin="round"
                  />
                  <polyline
                    className={styles.trace}
                    points={coordinates(layer.signal)}
                    pathLength="1"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  {layer.signal
                    .filter((_, i) => i % 2 === 0)
                    .map((p, i) => (
                      <g
                        key={i}
                        className={styles.neuron}
                        style={{
                          animationDelay: `${i * 0.18}s`,
                          transformOrigin: `${p.x}px ${p.y}px`,
                        }}
                      >
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="9"
                          stroke="currentColor"
                          opacity=".28"
                        />
                        <circle cx={p.x} cy={p.y} r="3.4" fill="currentColor" />
                      </g>
                    ))}
                </>
              )}
            </g>
          ))}
          {[2, 5, 8].map((column, i) => {
            const a = point(column, i + 2, 0);
            const b = point(column, i + 2, 2);
            return (
              <path
                key={column}
                d={`M${a.x},${a.y} C${a.x - 35},${a.y + 40} ${b.x + 35},${b.y - 40} ${b.x},${b.y}`}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 5"
                opacity=".24"
              />
            );
          })}
          <g stroke="currentColor" opacity=".45">
            <path d="M24 166H63M597 166H636" />
            <circle cx="24" cy="166" r="3" />
            <circle cx="636" cy="166" r="3" />
          </g>
        </svg>
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
            aria-controls={`${id}-explanation`}
            onClick={() => {
              setVisible(true);
              setStage(index);
            }}
            className={`min-h-20 border-r border-foreground/12 px-3 py-3 text-left text-xs leading-relaxed transition-colors last:border-r-0 hover:bg-brand/8 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring ${stage === index ? 'bg-brand/8 text-foreground' : 'text-muted-foreground'}`}
          >
            <span
              aria-hidden="true"
              className={`mb-1 block font-mono ${stage === index ? 'text-brand-ink' : 'text-muted-foreground'}`}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            {step.title}
          </button>
        ))}
      </div>
      <div
        id={`${id}-explanation`}
        aria-live="polite"
        aria-atomic="true"
        className="px-5 pt-5"
      >
        {steps.map((step, index) => (
          <div key={step.title} hidden={stage !== index}>
            <h4 className="text-lg text-foreground">{step.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        ))}
      </div>
      <p className="px-5 pt-4 pb-5 text-xs leading-relaxed text-muted-foreground">
        {copy.note}
      </p>
    </div>
  );
}
