import { LocalizedLink } from '@/components/localized-link';
import { Accent } from '@/components/sections/accent';
import { MonoLabel } from '@/components/sections/mono-label';
import { PillLink } from '@/components/sections/pill-link';
import type { HomeContent } from '@/content/pages/home';
import { pantryFacts } from '@/content/pages/pantry/facts';
import type { Cta } from '@/content/types';
import { isPublishedPath } from '@/lib/launch';

import { HeroTiles } from './hero-tiles';

/**
 * The home hero: the tile floor, the launch pill (Pantry), the eyebrow, the
 * H1 (the page's LCP, so nothing heavy sits above it), the lede and the two
 * actions. Everything animates with CSS only.
 */
export function Hero({
  content,
  primary,
}: {
  content: HomeContent['hero'];
  /** "Request early access": label from the dictionary, href from `site`. */
  primary: Cta;
}) {
  const { eyebrow, title, lede, launch, secondary } = content;

  return (
    <section className="relative flex min-h-[min(860px,100svh)] flex-col justify-end pt-21 max-[720px]:min-h-0 max-[720px]:pt-19">
      <HeroTiles />

      <div className="relative z-[6] mx-auto flex w-full max-w-site flex-col gap-9 px-site pb-18 max-[720px]:gap-7 max-[720px]:pb-12">
        {isPublishedPath(pantryFacts.path) && (
          <LocalizedLink
            href={pantryFacts.path}
            className="wf-rise group inline-flex w-fit max-w-full items-center gap-3 rounded-full border border-brand/70 bg-brand/20 py-1.5 pr-4 pl-1.5 text-[14px] text-foreground backdrop-blur-sm transition-colors hover:border-brand hover:bg-brand/30"
          >
            <span className="rounded-full bg-foreground px-2.5 py-0.5 label-mono text-[11px] text-background">
              {launch.label}
            </span>
            <span className="truncate">{launch.text}</span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </LocalizedLink>
        )}

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
      </div>
    </section>
  );
}
