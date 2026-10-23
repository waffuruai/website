import { LocalizedLink } from '@/components/localized-link';
import { Accent } from '@/components/sections/accent';
import { TileDeco } from '@/components/sections/tile-deco';

/**
 * An audience card on the overview: raised surface, a corner of waffle
 * tiles, the audience in serif type, one line, and the products that
 * audience uses. The whole card is the link.
 */
export function SolutionCard({
  href,
  title,
  summary,
  products,
}: {
  href: string;
  /** Use `*word*` for the gold italic accent. */
  title: string;
  summary: string;
  /** Product names this audience uses (never translated). */
  products: string[];
}) {
  return (
    <LocalizedLink
      href={href}
      className="group border-foreground/10 bg-card hover:border-foreground/30 focus-visible:outline-ring relative flex h-full min-h-[280px] flex-col justify-between gap-12 overflow-hidden rounded-2xl border p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 md:p-8"
    >
      <TileDeco
        size={4}
        hot={[
          [0, 2],
          [1, 3],
        ]}
        className="pointer-events-none absolute -top-8 -right-8 w-[150px] rotate-12 opacity-30 transition-opacity group-hover:opacity-70"
      />
      <div className="relative flex max-w-[34rem] flex-col gap-4">
        <h3 className="heading-section text-[clamp(36px,4vw,56px)] leading-[1]">
          <Accent text={title} />
        </h3>
        <p className="text-soft text-base leading-[1.6] text-pretty">
          {summary}
        </p>
      </div>
      <div className="label-mono text-muted-foreground relative flex items-center justify-between gap-4">
        <span>{products.join(' · ')}</span>
        <span
          aria-hidden
          className="text-foreground text-base transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </LocalizedLink>
  );
}
