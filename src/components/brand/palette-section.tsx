import { BrandSection } from '@/components/brand/brand-section';
import { CopyButton } from '@/components/brand/copy-button';
import type { BrandContent, Swatch } from '@/content/pages/brand';

function SwatchGroup({
  label,
  swatches,
}: {
  label: string;
  swatches: Swatch[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="label-mono text-soft">{label}</h3>
      <ul
        role="list"
        className="grid gap-x-5 gap-y-8 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {swatches.map((swatch) => (
          <li key={swatch.token} className="flex flex-col gap-3">
            {/* The hex comes from content (checked against tailwind.css in
                brand.test.ts), so the chip shows the value, not today's theme. */}
            <div
              aria-hidden
              className="h-24 rounded-xl border border-foreground/15"
              style={{ backgroundColor: swatch.hex }}
            />
            <div className="flex flex-col gap-1">
              <span className="text-[17px] font-medium">{swatch.name}</span>
              <span className="text-[14px] leading-[1.45] text-pretty text-muted-foreground">
                {swatch.role}
              </span>
              <code className="font-mono text-[12px] text-muted-foreground">
                {swatch.token}
              </code>
            </div>
            <CopyButton value={swatch.hex} className="self-start" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The dark and light palettes as swatches, each with a copy-hex button. */
export function PaletteSection({
  content,
}: {
  content: BrandContent['colour'];
}) {
  return (
    <BrandSection id="colour" title={content.title} intro={content.intro}>
      <div className="flex flex-col gap-16">
        <SwatchGroup label={content.darkLabel} swatches={content.dark} />
        <SwatchGroup label={content.lightLabel} swatches={content.light} />
      </div>
    </BrandSection>
  );
}
