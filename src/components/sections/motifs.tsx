import type { CSSProperties } from 'react';

import { cn } from '@/lib/utils';

/*
 * The product motifs, drawn by the classes in motifs.css: Pantry's sealed jar
 * and shelf check (two options), Iron's press, Butter's melting pat, Syrup's
 * drips and Whisk's whisk. `sm` fits a stack
 * row or card, `md` the brand gallery, `lg` a product page's hero.
 * Decorative and CSS-only: callers hide them from assistive tech.
 */
export type MotifSize = 'sm' | 'md' | 'lg';

type MotifProps = { size: MotifSize; className?: string };

/** Custom properties for the motif classes, as an inline style. */
const vars = (values: Record<string, string | number>) =>
  values as CSSProperties;

/** The jar's width per size, in pixels. */
const JAR = { sm: 40, md: 72, lg: 110 } as const;

/** Pantry, option one: a lid twisting shut, then a gold seal pressed on. */
export function PantryJar({ size, className }: MotifProps) {
  return (
    <div
      className={cn('wf-jar', className)}
      style={vars({ '--jar': `${JAR[size]}px` })}
    >
      <span className="wf-jar-body">
        <span className="wf-label" />
        <span className="wf-seal" />
      </span>
      <span className="wf-lid" />
    </div>
  );
}

const SHELVES = {
  sm: { jars: 4, can: 9, box: 'h-[72px] w-[108px]' },
  md: { jars: 4, can: 16, box: 'h-[132px] w-[150px]' },
  lg: { jars: 5, can: 22, box: 'h-[210px] w-[240px]' },
} as const;

/** Jar heights, as a share of the shelf, so no two neighbours match. */
const CAN_HEIGHTS = [0.62, 0.78, 0.54, 0.7, 0.6] as const;

/** Pantry, option two: a scan down the shelves, an expired jar replaced. */
export function PantryShelf({ size, className }: MotifProps) {
  const { jars, can, box } = SHELVES[size];
  return (
    <div
      className={cn('wf-shelves', box, className)}
      style={vars({ '--can': `${can}px` })}
    >
      {[0, 1, 2].map((shelf) => (
        <div
          key={shelf}
          className="wf-shelf"
          style={vars({ '--shelf': shelf })}
        >
          {Array.from({ length: jars }, (_, i) => (
            <span
              key={i}
              className="wf-can"
              data-expired={shelf === 1 && i === 2 ? '' : undefined}
              style={{
                height: `${CAN_HEIGHTS[(i + shelf * 2) % CAN_HEIGHTS.length]! * 100}%`,
              }}
            />
          ))}
        </div>
      ))}
      <span className="wf-scan" />
    </div>
  );
}

const PRESS = {
  sm: { side: 4, grid: 'w-24 gap-1.5' },
  md: { side: 4, grid: 'w-[116px] gap-1.5' },
  lg: { side: 6, grid: 'w-[220px] gap-2' },
} as const;

/** Iron: a press coming down one row at a time, top to bottom. */
export function IronPress({ size, className }: MotifProps) {
  const { side, grid } = PRESS[size];
  return (
    <div
      className={cn('grid', grid, className)}
      style={{
        gridTemplateColumns: `repeat(${side}, minmax(0, 1fr))`,
        ...vars({ '--rows': side }),
      }}
    >
      {Array.from({ length: side * side }, (_, i) => (
        <div
          key={i}
          className="wf-stamp"
          style={vars({ '--row': Math.floor(i / side) })}
        />
      ))}
    </div>
  );
}

/** The pat's width per size, in pixels. */
const PAT = { sm: 40, md: 60, lg: 84 } as const;

/** Butter: a pat melting into a slick pool, a glint running across it. */
export function ButterMelt({ size, className }: MotifProps) {
  return (
    <div
      className={cn('wf-butter', className)}
      style={vars({ '--pat': `${PAT[size]}px` })}
    >
      <span className="wf-pool" />
      <span className="wf-pat" />
      <span className="wf-glint" />
      <span className="wf-glint" style={{ animationDelay: '0.8s' }} />
    </div>
  );
}

/** Strand length (px at `md`), bar height (%) and cycle (s), per stream. */
const STREAMS = [
  { len: 12, h: 24, d: 3.4 },
  { len: 20, h: 40, d: 4.2 },
  { len: 9, h: 30, d: 3.0 },
  { len: 16, h: 50, d: 3.8 },
  { len: 24, h: 34, d: 4.6 },
  { len: 11, h: 46, d: 3.2 },
  { len: 18, h: 28, d: 4.0 },
  { len: 14, h: 38, d: 3.6 },
  { len: 22, h: 44, d: 4.4 },
] as const;

const SYRUP = {
  sm: { streams: 6, box: 'h-[72px] w-[120px]', scale: 0.6 },
  md: { streams: 7, box: 'h-[132px] w-[200px]', scale: 1 },
  lg: { streams: 9, box: 'h-[210px] w-[240px]', scale: 1.4 },
} as const;

/** Syrup: strands that gather and drip, each drop lighting up a bar. */
export function SyrupDrips({ size, className }: MotifProps) {
  const { streams, box, scale } = SYRUP[size];
  return (
    <div className={cn('wf-syrup', box, className)}>
      {STREAMS.slice(0, streams).map((stream, i) => (
        <div
          key={i}
          className="wf-stream"
          style={vars({
            '--len': `${Math.round(stream.len * scale)}px`,
            '--h': `${stream.h}%`,
            '--d': `${stream.d}s`,
            '--delay': `${-((i * 1.37) % stream.d).toFixed(2)}s`,
          })}
        >
          <span className="wf-strand" />
          <span className="wf-fall" />
          <span className="wf-bar" />
        </div>
      ))}
    </div>
  );
}

/** How much of the `lg` drawing each size keeps. */
const WHISK = { sm: 0.34, md: 0.6, lg: 1 } as const;

/** Orbit (share of the bowl), half a lap (s), phase (s), resting place. */
const MIX_INS = [
  { r: 0.9, t: 1.4, delay: 0, s: -0.6 },
  { r: 0.6, t: 1.1, delay: -0.5, s: 0.5 },
  { r: 0.75, t: 1.7, delay: -1.1, s: 0.95 },
] as const;

/** Whisk: wire loops spinning in a bowl, gold mix-ins circling through. */
export function WhiskSpin({ size, className }: MotifProps) {
  const px = (n: number) => `${Math.round(n * WHISK[size])}px`;
  return (
    <div
      className={cn('wf-whisk', className)}
      style={{ width: px(240), height: px(220) }}
    >
      <span
        className="wf-handle"
        style={{ width: px(10), height: px(76), marginLeft: px(-5) }}
      />
      <div
        className="wf-whisk-head"
        style={{
          top: px(64),
          width: px(84),
          height: px(128),
          marginLeft: px(-42),
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="wf-loop" style={vars({ '--i': i })} />
        ))}
      </div>
      <span className="wf-bowl" style={{ height: px(84) }} />
      {MIX_INS.map((mix, i) => (
        <span
          key={i}
          className="wf-mix"
          style={{
            bottom: px(24),
            ...vars({
              '--r': px(96 * mix.r),
              '--t': `${mix.t}s`,
              '--delay': `${mix.delay}s`,
              '--s': mix.s,
              '--dot': px(12),
            }),
          }}
        />
      ))}
    </div>
  );
}
