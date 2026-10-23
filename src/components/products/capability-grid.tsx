import { ProductSection } from '@/components/products/product-section';
import { SectionHeading } from '@/components/sections/section-heading';
import type { ProductCopy } from '@/content/pages/products/types';
import { cn } from '@/lib/utils';

/** What the product does, as raised cards (only facts from the brief). */
export function CapabilityGrid({
  capabilities,
}: {
  capabilities: ProductCopy['capabilities'];
}) {
  const { heading, intro, items } = capabilities;
  return (
    <ProductSection id="capabilities">
      <SectionHeading id="capabilities" title={heading} intro={intro} />
      <ul
        className={cn(
          'mt-12 grid gap-4 sm:grid-cols-2 md:mt-16',
          items.length % 3 === 0 && 'lg:grid-cols-3',
        )}
      >
        {items.map((item) => (
          <li
            key={item.title}
            className="border-foreground/10 bg-card flex flex-col gap-3 rounded-2xl border p-6 md:p-8"
          >
            <h3 className="font-serif text-[28px] leading-[1.05] tracking-[-0.01em]">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-[15px] leading-[1.6]">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </ProductSection>
  );
}
