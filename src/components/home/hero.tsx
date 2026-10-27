import { Accent } from '@/components/sections/accent';
import { MonoLabel } from '@/components/sections/mono-label';
import { PillLink } from '@/components/sections/pill-link';
import type { HomeContent } from '@/content/pages/home';
import type { Cta } from '@/content/types';

import { HeroTiles } from './hero-tiles';

/**
 * The home hero: the tile floor, the eyebrow, the H1 (the page's LCP, so
 * nothing heavy sits above it), the lede, the two actions and the backends
 * Iron emits. Everything animates with CSS only.
 */
export function Hero({
  content,
  primary,
}: {
  content: HomeContent['hero'];
  /** "Request early access": label from the dictionary, href from `site`. */
  primary: Cta;
}) {
  const { eyebrow, title, lede, secondary, emits } = content;

  return (
    <section className="relative flex min-h-[min(900px,100svh)] flex-col justify-end pt-32 max-[720px]:min-h-0 max-[720px]:pt-28">
      <HeroTiles />

      <div className="relative z-[6] mx-auto flex w-full max-w-site flex-col gap-9 px-site pb-18 max-[720px]:gap-7 max-[720px]:pb-12">
        <MonoLabel dot className="wf-rise gap-3">
          {eyebrow}
        </MonoLabel>

        <h1 className="wf-rise max-w-[1200px] heading-hero">
          <Accent text={title} />
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="wf-rise max-w-[520px] text-[19px] leading-[1.55] text-pretty text-soft">
            {lede}
          </p>
          <div className="flex flex-wrap items-center gap-6 max-[720px]:w-full max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:gap-[18px]">
            <PillLink href={primary.href}>{primary.label}</PillLink>
            <a
              href={secondary.href}
              className="inline-flex min-h-11 items-center gap-2 label-mono text-soft transition-colors hover:text-foreground max-[720px]:justify-center"
            >
              {secondary.label} <span aria-hidden>↓</span>
            </a>
          </div>
        </div>

        <p className="flex flex-wrap gap-7 border-t border-foreground/12 pt-7 label-mono text-muted-foreground">
          <span>
            {emits.label} <span aria-hidden>→</span>
          </span>
          {emits.targets.map((target) => (
            <span key={target} className="text-foreground">
              {target}
            </span>
          ))}
          <span aria-hidden className="wf-blink text-brand-ink">
            ▍
          </span>
        </p>
      </div>
    </section>
  );
}
