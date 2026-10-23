import { LocalizedLink } from '@/components/localized-link';
import { MonoLabel } from '@/components/sections/mono-label';
import { ProductMotif } from '@/components/solutions/product-motif';
import { SectionOpener } from '@/components/solutions/section-opener';
import type {
  ProductInfo,
  ProductKey,
  StackFitItem,
} from '@/content/pages/solutions/types';

/**
 * "How the stack fits": the products that matter to this buyer, in the
 * After Hours stack-row layout (hairline rows, index + serif name on the
 * left, the need and how it is met in the middle, a CSS motif on the right).
 * Each row links to its product page.
 */
export function StackFit({
  id,
  label,
  title,
  intro,
  items,
  products,
}: {
  id: string;
  label: string;
  title: string;
  intro: string;
  items: StackFitItem[];
  products: Record<ProductKey, ProductInfo>;
}) {
  return (
    <section
      aria-labelledby={id}
      className="max-w-site px-site mx-auto pt-[72px] md:pt-[120px]"
    >
      <SectionOpener id={id} label={label} title={title} intro={intro} />
      <ol className="border-foreground/12 border-t">
        {items.map((item) => {
          const product = products[item.product];
          return (
            <li
              key={item.product}
              className="group border-foreground/12 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 gap-y-8 border-b py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] lg:items-center lg:gap-x-12 lg:py-12"
            >
              <div className="flex flex-col gap-3.5 lg:col-start-1 lg:row-start-1">
                <MonoLabel as="span" className="text-muted-foreground">
                  {product.index} · {product.role}
                </MonoLabel>
                <h3 className="group-hover:text-brand-ink font-serif text-[56px] leading-[0.9] tracking-[-0.02em] transition-colors duration-[400ms] lg:text-[76px]">
                  {product.name}
                </h3>
              </div>
              <div className="col-start-2 row-start-1 hidden justify-end min-[390px]:flex lg:col-start-3">
                <ProductMotif product={item.product} />
              </div>
              <div className="col-span-2 flex flex-col gap-3.5 lg:col-span-1 lg:col-start-2 lg:row-start-1">
                <p className="text-foreground text-2xl leading-[1.3] text-balance">
                  {item.need}
                </p>
                <p className="text-muted-foreground max-w-[60ch] text-[17px] leading-[1.6] text-pretty">
                  {item.body}
                </p>
                <LocalizedLink
                  href={product.href}
                  className="label-mono text-foreground hover:text-brand-ink focus-visible:outline-ring decoration-foreground/35 -mt-1 inline-flex min-h-11 items-center gap-2 self-start rounded-sm underline underline-offset-[6px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {product.linkLabel}
                  <span aria-hidden>→</span>
                </LocalizedLink>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
