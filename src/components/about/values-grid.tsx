import { SectionHeading } from '@/components/sections/section-heading';
import type { AboutContent } from '@/content/pages/about';

/**
 * "What we value": a compact grid of the values, each a name in serif and one
 * line under it. A description list, since every value is a term and its
 * meaning.
 */
export function ValuesGrid({ content }: { content: AboutContent['values'] }) {
  return (
    <section
      id="values"
      aria-labelledby="values-title"
      className="max-w-site px-site mx-auto py-[72px] md:py-[120px]"
    >
      <SectionHeading
        id="values-title"
        title={content.title}
        intro={content.intro}
      />
      <dl className="mt-12 grid gap-x-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-4">
        {content.items.map((value) => (
          <div key={value.name} className="border-foreground/12 border-t py-6">
            <dt className="font-serif text-[clamp(26px,2.4vw,32px)] leading-[1.05]">
              {value.name}
            </dt>
            <dd className="text-muted-foreground mt-3 text-[15px] leading-[1.55] text-pretty">
              {value.line}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
