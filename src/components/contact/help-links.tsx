import { LocalizedLink } from '@/components/localized-link';
import { SectionHeading } from '@/components/sections/section-heading';
import type { SupportContent } from '@/content/pages/support';

const WEB = /^https?:\/\//i;

/**
 * Four ways to get help on /support, each a whole-card link: the docs, two
 * emails with their subject set and a file (security.txt). Web links open in
 * a new tab, which is announced.
 */
export function HelpLinks({
  title,
  items,
  newTabLabel,
}: SupportContent['links'] & { newTabLabel: string }) {
  return (
    <section
      aria-labelledby="help-links-heading"
      className="mx-auto max-w-site px-site pb-16 md:pb-24"
    >
      <SectionHeading id="help-links-heading" title={title} />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
        {items.map((item) => {
          const newTab = WEB.test(item.href);
          const content = (
            <>
              <span className="flex items-start justify-between gap-4">
                <span className="font-serif text-3xl leading-[1.05] tracking-[-0.01em]">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className="text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  {newTab ? '↗' : '→'}
                </span>
              </span>
              <span className="text-[15px] leading-relaxed text-soft">
                {item.body}
              </span>
              {newTab && <span className="sr-only">{newTabLabel}</span>}
            </>
          );
          const className =
            'group border-foreground/12 bg-card hover:border-foreground/30 flex h-full min-h-11 flex-col gap-3 rounded-3xl border p-6 text-foreground transition-colors hover:text-foreground md:p-7';
          return (
            <li key={item.href}>
              {item.file ? (
                // A file, not a page: it has no locale prefix.
                <a href={item.href} className={className}>
                  {content}
                </a>
              ) : (
                <LocalizedLink href={item.href} className={className}>
                  {content}
                </LocalizedLink>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
