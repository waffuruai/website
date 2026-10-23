import { ProductLinkCard } from '@/components/products/product-link-card';
import { ProductSection } from '@/components/products/product-section';
import { PillLink } from '@/components/sections/pill-link';
import { SectionHeading } from '@/components/sections/section-heading';
import type { ProductSummary } from '@/content/pages/products';
import type { ProductCopy } from '@/content/pages/products/types';

/** "Works with the rest of the stack": the other three layers, linked. */
export function StackLinks({
  stack,
  others,
  learnMoreLabel,
  allProductsLabel,
}: {
  stack: ProductCopy['stack'];
  others: ProductSummary[];
  /** Dictionary `common.learnMore`. */
  learnMoreLabel: string;
  /** Dictionary `nav.allProducts`. */
  allProductsLabel: string;
}) {
  return (
    <ProductSection id="stack-links">
      <SectionHeading
        id="stack-links"
        title={stack.heading}
        intro={stack.intro}
      />
      <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
        {others.map((product) => (
          <li key={product.slug}>
            <ProductLinkCard
              product={product}
              learnMoreLabel={learnMoreLabel}
            />
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <PillLink href="/products" variant="outline">
          {allProductsLabel}
        </PillLink>
      </div>
    </ProductSection>
  );
}
