import { SectionHeading } from '@/components/sections/section-heading';
import type { AboutContent } from '@/content/pages/about';

/**
 * "What we value": a compact, numbered grid of the values: a mono index left
 * of each name in serif, and one line under the name. A description list, since every
 * value is a term and its meaning.
 */
export function ValuesGrid({ content }: { content: AboutContent['values'] }) {
  return (
    <section
      id="values"
      aria-labelledby="values-title"
      className="mx-auto max-w-site px-site py-[72px] md:py-[120px]"
    >
      <SectionHeading
        id="values-title"
        title={content.title}
        intro={content.intro}
      />
      <dl className="mt-12 grid gap-x-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-4">
        {content.items.map((value, index) => (
          <div key={value.name} className="border-t border-foreground/12 py-6">
            <dt className="flex items-baseline gap-3">
              <span
                aria-hidden
                className="w-7 shrink-0 label-mono text-brand-ink"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-serif text-[clamp(26px,2.4vw,32px)] leading-[1.05]">
                {value.name}
              </span>
            </dt>
            <dd className="mt-3 pl-10 text-[15px] leading-[1.55] text-pretty text-muted-foreground">
              {value.line}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
