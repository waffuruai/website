import { LocalizedLink } from '@/components/localized-link';
import { SectionHeading } from '@/components/sections/section-heading';
import type { HomeContent } from '@/content/pages/home';
import { isPublishedPath } from '@/lib/launch';

/**
 * Who the stack is for, in four cards, each one outcome. A card links to its
 * solutions page once that section launches; until then it stands alone.
 */
export function Audiences({ content }: { content: HomeContent['audiences'] }) {
  return (
    <section
      id="who"
      aria-labelledby="who-title"
      className="relative z-[6] mx-auto max-w-site px-site py-20 md:py-30"
    >
      <SectionHeading
        id="who-title"
        title={content.title}
        intro={content.intro}
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {content.items.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-card p-6 md:p-7"
          >
            <h3 className="font-serif text-[28px] leading-[1.05]">
              {item.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-muted-foreground">
              {item.body}
            </p>
            {item.href && isPublishedPath(item.href) && (
              <LocalizedLink
                href={item.href}
                className="mt-auto inline-flex min-h-11 items-center gap-2 label-mono text-[12px] text-brand-ink hover:text-foreground"
              >
                {content.linkLabel}
                <span className="sr-only">: {item.title}</span>
                <span aria-hidden>→</span>
              </LocalizedLink>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
