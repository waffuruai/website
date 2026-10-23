import { LocalizedLink } from '@/components/localized-link';
import { ProductSection } from '@/components/products/product-section';
import { SectionHeading } from '@/components/sections/section-heading';
import { audienceHrefs } from '@/content/pages/products/facts';
import {
  audienceKeys,
  type ProductsOverviewCopy,
} from '@/content/pages/products/types';
import type { Dictionary } from '@/i18n/dictionaries/en';

/** "Who it's for": one card per solutions page, with the reader's job. */
export function AudienceCards({
  audience,
  nav,
}: {
  audience: ProductsOverviewCopy['audience'];
  /** Dictionary `nav`; supplies each solution's name. */
  nav: Dictionary['nav'];
}) {
  return (
    <ProductSection id="audience">
      <SectionHeading
        id="audience"
        title={audience.heading}
        intro={audience.intro}
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
        {audienceKeys.map((key) => (
          <li key={key}>
            <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/30 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-ring md:p-8">
              <h3 className="font-serif text-[30px] leading-[1.05] tracking-[-0.01em] transition-colors group-hover:text-brand-ink">
                <LocalizedLink
                  href={audienceHrefs[key]}
                  className="after:absolute after:inset-0 after:content-[''] hover:text-inherit focus-visible:outline-none"
                >
                  {nav.items[key].label}
                </LocalizedLink>
              </h3>
              <p className="text-[15px] leading-[1.6] text-muted-foreground">
                {audience.items[key]}
              </p>
              <span
                aria-hidden
                className="mt-auto pt-2 font-mono text-soft transition-colors group-hover:text-foreground"
              >
                →
              </span>
            </article>
          </li>
        ))}
      </ul>
    </ProductSection>
  );
}
