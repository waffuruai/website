import { LocalizedLink } from '@/components/localized-link';
import { SectionHeading } from '@/components/sections/section-heading';
import type { HomeContent } from '@/content/pages/home';

/** "Why we're cooking.": three beliefs, then the announcement and theses. */
export function Beliefs({ content }: { content: HomeContent['beliefs'] }) {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative z-[6] mx-auto max-w-site px-site py-20 md:py-30"
    >
      <SectionHeading
        id="why-title"
        title={content.title}
        intro={content.intro}
      />
      <ol className="mt-12 grid gap-10 border-t border-foreground/10 pt-10 md:mt-16 md:grid-cols-3 md:gap-8">
        {content.items.map((item, index) => (
          <li key={item.title} className="flex flex-col gap-3">
            <span className="label-mono text-[11px] text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="font-serif text-[30px] leading-[1.05]">
              {item.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-muted-foreground">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
        {content.links.map((link) => (
          <LocalizedLink
            key={link.href}
            href={link.href}
            className="inline-flex min-h-11 items-center gap-2 label-mono text-[12px] text-brand-ink hover:text-foreground"
          >
            {link.label}
            <span aria-hidden>→</span>
          </LocalizedLink>
        ))}
      </div>
    </section>
  );
}
