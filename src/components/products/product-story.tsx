import { ProductSection } from '@/components/products/product-section';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import type {
  ProductCopy,
  ProductsShared,
} from '@/content/pages/products/types';

/**
 * Problem to outcome, with the reader as the protagonist: what stood in the
 * way on the left, what they can do now on the right.
 */
export function ProductStory({
  story,
  shared,
}: {
  story: ProductCopy['story'];
  shared: Pick<ProductsShared, 'storyProblemLabel' | 'storyOutcomeLabel'>;
}) {
  return (
    <ProductSection id="story">
      <SectionHeading id="story" title={story.heading} />
      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
        <div className="border-foreground/12 flex flex-col gap-5 border-t pt-8">
          <MonoLabel>{shared.storyProblemLabel}</MonoLabel>
          <p className="text-soft text-xl leading-[1.45] text-pretty md:text-[22px]">
            {story.problem}
          </p>
        </div>
        <div className="border-foreground/12 bg-card flex flex-col gap-6 rounded-2xl border p-6 md:p-10">
          <MonoLabel dot>{shared.storyOutcomeLabel}</MonoLabel>
          <p className="text-foreground text-xl leading-[1.4] text-pretty md:text-2xl">
            {story.outcome}
          </p>
          <ul className="border-foreground/10 flex flex-col border-t">
            {story.outcomes.map((item) => (
              <li
                key={item}
                className="border-foreground/10 text-muted-foreground flex gap-4 border-b py-4 text-base leading-[1.55] last:border-b-0"
              >
                <span aria-hidden className="text-brand-ink font-mono">
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProductSection>
  );
}
