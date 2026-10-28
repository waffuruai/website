import { RichText } from '@/components/sections/rich-text';
import { SectionHeading } from '@/components/sections/section-heading';
import type { AboutContent } from '@/content/pages/about';

/**
 * "What we believe": the seven theses as a numbered list. A mono index, the
 * claim in serif and the one or two sentences that back it up; stacked on
 * phones, three columns from tablet up.
 */
export function ThesesList({ content }: { content: AboutContent['beliefs'] }) {
  return (
    <section
      id="beliefs"
      aria-labelledby="beliefs-title"
      className="mx-auto max-w-site px-site py-[72px] md:py-[120px]"
    >
      <SectionHeading
        id="beliefs-title"
        title={content.title}
        intro={content.intro}
      />
      <ol
        role="list"
        className="mt-12 divide-y divide-foreground/12 border-y border-foreground/12 md:mt-16"
      >
        {content.theses.map((thesis, index) => (
          <li
            key={thesis.statement}
            className="grid gap-3 py-8 md:grid-cols-[72px_minmax(0,1.25fr)_minmax(0,1fr)] md:gap-10 md:py-10"
          >
            <span className="label-mono text-brand-ink md:pt-3">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-serif text-[clamp(28px,3vw,42px)] leading-[1.08] tracking-[-0.01em] text-balance">
              {thesis.statement}
            </p>
            <p className="text-base leading-[1.6] text-pretty text-muted-foreground md:pt-2">
              <RichText text={thesis.body} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
