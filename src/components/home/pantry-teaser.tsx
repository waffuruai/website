import { PillLink } from '@/components/sections/pill-link';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import styles from '@/components/pantry/pantry-flow.module.css';
import type { HomeContent } from '@/content/pages/home';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { cn } from '@/lib/utils';

/**
 * Pantry on the home page: what it does in one paragraph and three points,
 * the two ways in, and the scan itself typing out in a terminal (an example,
 * captioned as one). The Pantry page has the full Install → Fix sequence.
 */
export function PantryTeaser({ content }: { content: HomeContent['pantry'] }) {
  const lines = pantryFacts.transcripts.scan;
  return (
    <section
      id="pantry"
      aria-labelledby="pantry-title"
      className="relative z-[6] mx-auto max-w-site px-site py-20 md:py-30"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <MonoLabel dot>{content.label}</MonoLabel>
          <SectionHeading id="pantry-title" title={content.title} />
          <p className="max-w-[520px] text-[17px] leading-[1.6] text-soft">
            {content.body}
          </p>
          <ul className="flex flex-col gap-2.5">
            {content.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[15px] text-foreground"
              >
                <span
                  aria-hidden
                  className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-brand"
                />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-4">
            <PillLink href={`${pantryFacts.path}#install`}>
              {content.primary}
            </PillLink>
            <PillLink href={pantryFacts.path} variant="outline">
              {content.secondary}
            </PillLink>
          </div>
        </div>

        <figure className="flex min-w-0 flex-col gap-3">
          <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-card">
            <div className="flex items-center gap-2 border-b border-foreground/10 px-[22px] py-4 font-mono text-xs text-muted-foreground">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-off" />
                <span className="size-2.5 rounded-full bg-off" />
                <span className="size-2.5 rounded-full bg-off" />
              </span>
              {pantryFacts.command}
            </div>
            <pre
              tabIndex={0}
              aria-label={content.caption}
              className="overflow-x-auto px-4 py-5 font-mono text-[12px] leading-[1.75] text-soft sm:px-6 sm:text-[13px]"
            >
              <code>
                {lines.map((line, index) => (
                  <span
                    key={index}
                    className={cn(
                      'block',
                      styles.line,
                      line.startsWith('$') && 'text-foreground',
                      /^\s*[✗⚠]/.test(line) && 'text-brand-ink',
                    )}
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    {line}
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <figcaption className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
            {content.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
