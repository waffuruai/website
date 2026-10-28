import { LocalizedLink } from '@/components/localized-link';
import { ProductSection } from '@/components/products/product-section';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import type { ProductSummary } from '@/content/pages/products';
import type { ProductsOverviewCopy } from '@/content/pages/products/types';

/**
 * "Use one, or all four": what each product does by itself, then what the
 * four do together. Products run from the metal up (Iron to Whisk), the order
 * you would adopt them in.
 */
export function UseOneOrAll({
  together,
  products,
}: {
  together: ProductsOverviewCopy['together'];
  /** Bottom of the stack first. */
  products: ProductSummary[];
}) {
  return (
    <ProductSection id="together">
      <SectionHeading
        id="together"
        title={together.heading}
        intro={together.intro}
      />
      <div className="mt-12 flex flex-col gap-5 md:mt-16">
        <MonoLabel>{together.aloneLabel}</MonoLabel>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.slug}>
              <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/30 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-ring">
                <p className="label-mono text-muted-foreground">
                  {product.index} · {product.layer}
                </p>
                <h3 className="font-serif text-[40px] leading-none tracking-[-0.02em] transition-colors group-hover:text-brand-ink">
                  <LocalizedLink
                    href={product.path}
                    className="after:absolute after:inset-0 after:content-[''] hover:text-inherit focus-visible:outline-none"
                  >
                    {product.name}
                  </LocalizedLink>
                </h3>
                <p className="text-base leading-[1.55] text-soft">
                  {together.alone[product.slug]}
                </p>
              </article>
            </li>
          ))}
        </ul>
        <div className="grid gap-6 rounded-2xl border border-foreground/12 bg-card p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-14 md:p-10">
          <div className="flex flex-col gap-4">
            <MonoLabel dot>{together.allLabel}</MonoLabel>
            <p className="flex flex-wrap gap-x-3 font-serif text-[clamp(32px,4vw,52px)] leading-[1.05] tracking-[-0.01em]">
              {products.map((product, index) => (
                <span key={product.slug} className="whitespace-nowrap">
                  {index > 0 && (
                    <span aria-hidden className="mr-3 text-brand-ink">
                      +
                    </span>
                  )}
                  {product.name}
                </span>
              ))}
            </p>
          </div>
          <p className="text-lg leading-[1.55] text-pretty text-soft">
            {together.all}
          </p>
        </div>
      </div>
    </ProductSection>
  );
}
