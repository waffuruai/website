import { ProductSection } from '@/components/products/product-section';
import { SectionHeading } from '@/components/sections/section-heading';
import type { ExtraSection } from '@/content/pages/products/types';

/**
 * Product-specific sections (Butter: agent harness compatibility, model
 * quirks handled at the server). A compact two-column list of short items,
 * denser than the capability cards, with an optional caveat line under it.
 */
export function ExtraSections({ sections }: { sections: ExtraSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <ProductSection key={section.id} id={section.id}>
          <SectionHeading
            id={section.id}
            title={section.heading}
            intro={section.intro}
          />
          <ul className="mt-12 grid gap-x-12 border-t border-foreground/10 md:mt-16 md:grid-cols-2">
            {section.items.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-2 border-b border-foreground/10 py-6"
              >
                <h3 className="font-serif text-[24px] leading-[1.1] tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.6] text-muted-foreground">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          {section.note && (
            <p className="mt-8 max-w-[760px] text-sm leading-[1.6] text-soft">
              {section.note}
            </p>
          )}
        </ProductSection>
      ))}
    </>
  );
}
