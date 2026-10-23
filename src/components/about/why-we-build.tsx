import { SectionHeading } from '@/components/sections/section-heading';
import { TileDeco } from '@/components/sections/tile-deco';
import type { AboutContent } from '@/content/pages/about';
import { cn } from '@/lib/utils';

/**
 * "Why we build": the story in a few short paragraphs (the first one set
 * large as the lead), beside a raised card with the two constraints we hold
 * ourselves to.
 */
export function WhyWeBuild({ content }: { content: AboutContent['why'] }) {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="max-w-site px-site mx-auto py-[72px] md:py-[120px]"
    >
      <SectionHeading
        id="why-title"
        title={content.title}
        intro={content.intro}
      />
      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-20">
        <div className="flex flex-col gap-6">
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={cn(
                'text-pretty',
                index === 0
                  ? 'font-serif text-[clamp(30px,3.6vw,52px)] leading-[1.08] tracking-[-0.01em]'
                  : 'text-soft max-w-[620px] text-lg leading-[1.6]',
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="border-foreground/12 bg-card relative flex flex-col gap-6 self-start overflow-hidden rounded-3xl border p-8 md:p-10">
          <TileDeco
            size={4}
            hot={[[1, 2]]}
            className="pointer-events-none absolute -top-10 -right-10 w-[160px] rotate-12 opacity-30"
          />
          <h3 className="label-mono text-soft relative">
            {content.constraintsLabel}
          </h3>
          <ol role="list" className="relative flex flex-col">
            {content.constraints.map((constraint, index) => (
              <li
                key={constraint}
                className="border-foreground/12 flex gap-5 border-t py-6 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span
                  aria-hidden
                  className="label-mono text-brand-ink pt-2 whitespace-nowrap"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.1] text-balance">
                  {constraint}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
