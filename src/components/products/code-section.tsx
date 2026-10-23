import { CodePanel } from '@/components/products/code-panel';
import { ProductSection } from '@/components/products/product-section';
import { Accent } from '@/components/sections/accent';
import type { CodeSample, ProductCopy } from '@/content/pages/products/types';

/** Heading and a short explanation on the left, the code panel on the right. */
export function CodeSection({
  copy,
  sample,
}: {
  copy: NonNullable<ProductCopy['code']>;
  sample: CodeSample;
}) {
  return (
    <ProductSection id="code">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="flex flex-col gap-6">
          <h2 id="code" className="heading-section text-[clamp(40px,5vw,72px)]">
            <Accent text={copy.heading} />
          </h2>
          {copy.intro && (
            <p className="text-muted-foreground max-w-[460px] text-base leading-[1.6]">
              {copy.intro}
            </p>
          )}
        </div>
        <CodePanel
          filename={sample.filename}
          label={sample.label}
          language={sample.language}
          source={sample.source}
          caption={copy.caption}
        />
      </div>
    </ProductSection>
  );
}
