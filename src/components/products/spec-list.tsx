import { ProductSection } from '@/components/products/product-section';
import { SectionHeading } from '@/components/sections/section-heading';
import type { ProductCopy, SpecRow } from '@/content/pages/products/types';
import { cn } from '@/lib/utils';

function Chip({
  label,
  inProgress,
  inProgressLabel,
}: {
  label: string;
  inProgress?: boolean;
  inProgressLabel: string;
}) {
  return (
    <li
      className={cn(
        'rounded-full border px-4 py-2 text-sm',
        inProgress
          ? 'border-foreground/30 text-soft border-dashed'
          : 'border-foreground/16 text-foreground',
      )}
    >
      {label}
      {inProgress && ` · ${inProgressLabel}`}
    </li>
  );
}

function SpecDetail({
  row,
  inProgressLabel,
}: {
  row: SpecRow;
  inProgressLabel: string;
}) {
  return (
    <>
      {row.detail && (
        <p className="text-foreground text-[17px] leading-[1.55]">
          {row.detail}
        </p>
      )}
      {row.chips && (
        <ul className="flex flex-wrap gap-2.5">
          {row.chips.map((chip) => (
            <Chip
              key={chip.label}
              {...chip}
              inProgressLabel={inProgressLabel}
            />
          ))}
        </ul>
      )}
      {row.groups && (
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {row.groups.map((group) => (
            <li key={group.label} className="flex flex-col gap-1">
              <span className="label-mono text-muted-foreground">
                {group.label}
              </span>
              <span className="text-foreground text-[15px] leading-[1.45]">
                {group.text}
                {group.inProgress && (
                  <span className="text-soft"> · {inProgressLabel}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/**
 * The technical specifics as a definition list: a mono term on the left, its
 * detail on the right, hairlines between rows. Chips and groups hold lists
 * (backends, model families) without turning the row into a wall of text.
 */
export function SpecList({
  specs,
  inProgressLabel,
}: {
  specs: ProductCopy['specs'];
  /** Dictionary `common.inProgress`, for chips and groups still in progress. */
  inProgressLabel: string;
}) {
  return (
    <ProductSection id="specs">
      <SectionHeading id="specs" title={specs.heading} intro={specs.intro} />
      <dl className="border-foreground/12 mt-12 border-t md:mt-16">
        {specs.rows.map((row) => (
          <div
            key={row.term}
            className="border-foreground/12 grid gap-3 border-b py-6 md:grid-cols-[minmax(160px,1fr)_minmax(0,3fr)] md:gap-10 md:py-7"
          >
            <dt className="label-mono text-muted-foreground md:pt-1.5">
              {row.term}
            </dt>
            <dd className="flex flex-col gap-4">
              <SpecDetail row={row} inProgressLabel={inProgressLabel} />
            </dd>
          </div>
        ))}
      </dl>
    </ProductSection>
  );
}
