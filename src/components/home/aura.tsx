import { LocalizedLink } from '@/components/localized-link';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import { auraEvidence as evidence, type AuraCopy } from '@/content/pages/aura';

import styles from './aura.module.css';

/** The three stat tiles, built from the public evidence (never typed by hand). */
function tiles(copy: AuraCopy['tiles']) {
  const { turbo4, turbo3, large } = evidence.tiles;
  return [
    {
      key: 'turbo4',
      value: `${turbo4.compression}×`,
      label: copy.turbo4.label,
      detail: `+${turbo4.ppl}% ${copy.turbo4.detail}`,
      source: turbo4.source,
    },
    {
      key: 'turbo3',
      value: `${turbo3.compression}×`,
      label: copy.turbo3.label,
      detail: `+${turbo3.ppl}% ${copy.turbo3.detail}`,
      source: turbo3.source,
    },
    {
      key: 'large',
      value: large.params,
      label: copy.large.label,
      detail: `${large.peakGb} GB ${copy.large.detail} · PPL ${large.ppl}`,
      source: large.source,
    },
  ];
}

/**
 * Renders a step body, turning the one `[bracketed]` phrase (the paper's name
 * in each locale) into an inline link to the TurboQuant paper.
 * e.g. 'the [TurboQuant paper] (Google…' → the <a>TurboQuant paper</a> (Google…
 */
function withPaperLink(body: string) {
  const match = /\[([^\]]+)\]/.exec(body);
  if (!match) return body;
  return (
    <>
      {body.slice(0, match.index)}
      <LocalizedLink
        href={evidence.paperHref}
        className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-brand-ink hover:decoration-brand-ink"
      >
        {match[1]}
      </LocalizedLink>
      {body.slice(match.index + match[0].length)}
    </>
  );
}

/** Public links for a lineage step: the research repos, then the upstream PRs. */
const STEP_LINKS: readonly (readonly {
  label: string;
  href: string;
  stars?: string;
}[])[] = [evidence.links.research, evidence.links.upstream, []];

/**
 * AURA, Waffuru's KV cache compression: where it comes from (our open
 * TurboQuant+ research, adopted upstream), the public numbers from that
 * research with their conditions, how the cache is laid out, and what is
 * different in the Iron and Butter version. No Butter number is shown until
 * it is qualified (see `auraEvidence`).
 *
 * Self-contained: content comes from `src/content/pages/aura.ts`, so the
 * section can move to a product page with one import.
 */
export function Aura({ content }: { content: AuraCopy }) {
  const stats = tiles(content.tiles);
  // 12 compressed blocks, then 3 raw ones: enough to read as a timeline at
  // 375px without the compressed cells collapsing below 10px.
  const compressed = 12;
  const raw = 3;

  return (
    <section
      id="aura"
      aria-labelledby="aura-title"
      className="relative z-[6] mx-auto max-w-site px-site pt-24 pb-12 max-[720px]:pt-16"
    >
      <MonoLabel dot className="mb-6">
        {content.eyebrow}
      </MonoLabel>
      <SectionHeading
        id="aura-title"
        title={content.title}
        intro={content.intro}
        className="mb-12"
      />

      <h3 className="mb-4 label-mono text-muted-foreground">
        {content.lineage.heading}
      </h3>
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-foreground/12 bg-foreground/12 md:grid-cols-3">
        {content.lineage.steps.map((step, index) => (
          <li key={step.kicker} className="flex flex-col gap-3 bg-card p-6">
            <span className="label-mono text-muted-foreground">
              {step.kicker}
            </span>
            <span className="font-serif text-[28px] leading-tight text-foreground">
              {step.title}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {withPaperLink(step.body)}
            </p>
            {STEP_LINKS[index].length > 0 && (
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {STEP_LINKS[index].map((link) => (
                  <li key={link.href}>
                    <LocalizedLink
                      href={link.href}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-foreground/16 px-3.5 font-mono text-xs text-foreground transition-colors hover:border-foreground/40 hover:text-brand-ink"
                    >
                      {link.label}
                      {link.stars && (
                        <span className="text-brand-ink">
                          <span aria-hidden>★ </span>
                          {link.stars}
                          <span className="sr-only"> {content.starsLabel}</span>
                        </span>
                      )}
                      <span aria-hidden className="text-muted-foreground">
                        ↗
                      </span>
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-12 mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="label-mono text-muted-foreground">
          {content.tiles.heading}
        </h3>
        <p className="font-mono text-xs text-muted-foreground">
          {evidence.fork} · {evidence.hardware}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
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
        {content.tiles.scope}
      </p>

      <div className="mt-10 grid overflow-hidden rounded-2xl border border-foreground/12 bg-card lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <figure className="p-6 sm:p-8">
          <figcaption className="mb-6 label-mono text-brand-ink">
            {content.ribbon.label}
          </figcaption>
          <div
            aria-hidden="true"
            className={styles.ribbon}
            style={{ '--ratio': evidence.ribbonRatio } as React.CSSProperties}
          >
            {Array.from({ length: compressed }, (_, i) => (
              <span
                key={`c${i}`}
                className={`${styles.cell} ${styles.compressed}`}
              />
            ))}
            {Array.from({ length: raw }, (_, i) => (
              <span key={`r${i}`} className={`${styles.cell} ${styles.raw}`} />
            ))}
            <span className={`${styles.cursor} wf-blink`} />
          </div>
          <div className="mt-3 flex justify-between gap-4 font-mono text-xs text-soft">
            <span>{content.ribbon.older}</span>
            <span className="text-right">{content.ribbon.recent}</span>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {content.ribbon.note}
          </p>
        </figure>
        <div className="border-t border-foreground/12 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <h3 className="label-mono text-soft">{content.changed.heading}</h3>
          <ul className="mt-4 space-y-3">
            {content.changed.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-foreground"
              >
                <span
                  aria-hidden
                  className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-brand"
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-foreground/12 pt-4 text-xs leading-relaxed text-muted-foreground">
            {content.changed.hybrid}
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-[820px] text-xs leading-relaxed text-muted-foreground">
        {content.footnote}
      </p>
    </section>
  );
}
