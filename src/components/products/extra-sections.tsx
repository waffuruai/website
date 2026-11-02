import { ProductSection } from '@/components/products/product-section';
import { SectionHeading } from '@/components/sections/section-heading';
import type { ExtraSection } from '@/content/pages/products/types';

/** Turns the first mention of each linked term into a new-tab link. */
function withLinks(
  text: string | undefined,
  links: ExtraSection['links'],
  used: Set<string>,
) {
  if (!text || !links?.length) return text;
  const parts: React.ReactNode[] = [];
  let rest = text;
  for (;;) {
    const next = links
      .filter((link) => !used.has(link.label) && rest.includes(link.label))
      .sort((a, b) => rest.indexOf(a.label) - rest.indexOf(b.label))[0];
    if (!next) break;
    const at = rest.indexOf(next.label);
    used.add(next.label);
    parts.push(rest.slice(0, at));
    parts.push(
      <a
        key={next.label}
        href={next.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {next.label}
      </a>,
    );
    rest = rest.slice(at + next.label.length);
  }
  parts.push(rest);
  return parts;
}

/**
 * Product-specific sections (Butter: agent harness compatibility, model
 * quirks handled at the server). A compact two-column list of short items,
 * denser than the capability cards, with an optional caveat line under it.
 */
export function ExtraSections({ sections }: { sections: ExtraSection[] }) {
  return (
    <>
      {sections.map((section) => {
        const used = new Set<string>();
        return (
          <ProductSection key={section.id} id={section.id}>
            <SectionHeading
              id={section.id}
              title={section.heading}
              intro={withLinks(section.intro, section.links, used)}
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
                    {withLinks(item.body, section.links, used)}
                  </p>
                </li>
              ))}
            </ul>
            {section.note && (
              <p className="mt-8 max-w-[760px] text-sm leading-[1.6] text-soft">
                {withLinks(section.note, section.links, used)}
              </p>
            )}
          </ProductSection>
        );
      })}
    </>
  );
}
