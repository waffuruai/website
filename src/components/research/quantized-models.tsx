import { LocalizedLink } from '@/components/localized-link';
import { MonoLabel } from '@/components/sections/mono-label';
import { PillLink } from '@/components/sections/pill-link';
import { SectionHeading } from '@/components/sections/section-heading';
import {
  quantizedModelsEvidence as evidence,
  type QuantizedModelsCopy,
} from '@/content/pages/quantized-models';
import { site } from '@/content/site';

import styles from './quantized-models.module.css';

/** The two evidence tiles, built from the public numbers (never typed by hand). */
function tiles(copy: QuantizedModelsCopy['tiles']) {
  const { weights, stacked } = evidence.tiles;
  return [
    {
      key: 'weights',
      value: `${weights.reduction}%`,
      label: copy.weights.label,
      detail: `+${weights.ppl}% ${copy.weights.detail}`,
      source: weights.source,
    },
    {
      key: 'stacked',
      value: `${stacked.reduction}%`,
      label: copy.stacked.label,
      detail: `+${stacked.ppl}% ${copy.stacked.detail}`,
      source: stacked.source,
    },
  ];
}

/**
 * Teaser for the quantized models we are preparing: how we quantize (the
 * policy from our open TurboQuant+ weight research), two public numbers from
 * that research with their conditions, a schematic of where precision goes,
 * and an honest "coming soon" with a way to be notified. No released-model
 * number is shown until one exists (see `quantizedModelsEvidence`).
 *
 * Self-contained: content comes from `src/content/pages/quantized-models.ts`,
 * so the section can move between pages with one import (it sits on Butter).
 */
export function QuantizedModels({ content }: { content: QuantizedModelsCopy }) {
  const stats = tiles(content.tiles);
  // 16 layers reads as a strip at 375px without the role bands collapsing.
  const layers = 16;
  const { boundary } = evidence;
  const isBoundary = (i: number) => i < boundary || i >= layers - boundary;

  return (
    <section
      id="quantized-models"
      aria-labelledby="quantized-models-title"
      className="relative z-[6] mx-auto max-w-site px-site pt-24 pb-12 max-[720px]:pt-16"
    >
      <MonoLabel dot className="mb-6">
        {content.eyebrow}
      </MonoLabel>
      <SectionHeading
        id="quantized-models-title"
        title={content.title}
        intro={content.intro}
        className="mb-12"
      />

      <div className="grid gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="rounded-2xl border border-foreground/12 bg-card p-6 sm:p-8">
          <h3 className="label-mono text-muted-foreground">
            {content.method.heading}
          </h3>
          <ol className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {content.method.items.map((item, index) => (
              <li key={item.title} className="flex gap-3">
                <span className="font-mono text-xs leading-6 text-brand-ink tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="rounded-2xl border border-foreground/12 bg-card p-6 sm:p-8">
          <figcaption className="label-mono text-brand-ink">
            {content.strip.label}
          </figcaption>
          <div aria-hidden="true" className={`${styles.strip} mt-6`}>
            {Array.from({ length: layers }, (_, i) =>
              isBoundary(i) ? (
                <span
                  key={i}
                  className={`${styles.layer} ${styles.boundary}`}
                />
              ) : (
                <span key={i} className={styles.layer}>
                  <span className={`${styles.band} ${styles.attention}`} />
                  <span className={`${styles.band} ${styles.ffnRead}`} />
                  <span className={`${styles.band} ${styles.ffnDown}`} />
                </span>
              ),
            )}
          </div>
          <div className="mt-3 flex justify-between gap-4 font-mono text-xs text-soft">
            <span>{content.strip.first}</span>
            <span className="text-right">{content.strip.last}</span>
          </div>
          <ul className="mt-5 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <span
                aria-hidden
                className={`${styles.swatch} ${styles.swatchBoundary}`}
              />
              {content.strip.legend.boundary}
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden
                className={`${styles.swatch} ${styles.attention}`}
              />
              {content.strip.legend.attention}
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden
                className={`${styles.swatch} ${styles.ffnRead}`}
              />
              {content.strip.legend.ffnRead}
            </li>
            <li className="flex items-center gap-2">
              <span
                aria-hidden
                className={`${styles.swatch} ${styles.ffnDown}`}
              />
              {content.strip.legend.ffnDown}
            </li>
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {content.strip.note}
          </p>
        </figure>
      </div>

      <div className="mt-12 mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="label-mono text-muted-foreground">
          {content.tiles.heading}
        </h3>
        <p className="font-mono text-xs text-muted-foreground">
          {evidence.fork} · {evidence.hardware}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {stats.map((tile) => (
          <div
            key={tile.key}
            className="flex flex-col rounded-2xl border border-foreground/12 bg-card p-6 sm:p-7"
          >
            <p className="mb-3 font-mono text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.06em] text-foreground tabular-nums">
              {tile.value}
            </p>
            <p className="text-sm leading-snug text-soft">{tile.label}</p>
            <p className="mt-2 font-mono text-xs text-brand-ink tabular-nums">
              {tile.detail}
            </p>
            <p className="mt-auto border-t border-foreground/12 pt-4 text-xs leading-relaxed text-muted-foreground">
              {content.tiles.source}: TurboQuant+ · {tile.source}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {content.tiles.scope}{' '}
        <LocalizedLink
          href={evidence.paperHref}
          className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-brand-ink hover:decoration-brand-ink"
        >
          {content.tiles.paper}
        </LocalizedLink>
      </p>

      <div className="mt-10 flex flex-col justify-between gap-6 rounded-2xl border border-foreground/12 bg-card p-6 sm:p-8 md:flex-row md:items-end md:gap-12">
        <div className="max-w-[640px]">
          <h3 className="label-mono text-brand-ink">{content.soon.heading}</h3>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            {content.soon.body}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {content.soon.tooling}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {evidence.links.map((link) => (
              <li key={link.href}>
                <LocalizedLink
                  href={link.href}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-foreground/16 px-3.5 font-mono text-xs text-foreground transition-colors hover:border-foreground/40 hover:text-brand-ink"
                >
                  {link.label}
                  <span aria-hidden className="text-muted-foreground">
                    ↗
                  </span>
                </LocalizedLink>
              </li>
            ))}
          </ul>
        </div>
        <PillLink
          href={site.urls.earlyAccess}
          variant="outline"
          className="md:shrink-0"
        >
          {content.soon.cta}
        </PillLink>
      </div>
    </section>
  );
}
