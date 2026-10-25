import { Check, X } from 'lucide-react';

import { BrandSection } from '@/components/brand/brand-section';
import type { BrandContent } from '@/content/pages/brand';

function RuleList({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: 'do' | 'dont';
}) {
  const Icon = tone === 'do' ? Check : X;
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-foreground/12 bg-card p-6 md:p-10">
      <h3 className="font-serif text-[clamp(34px,3.4vw,44px)] leading-none">
        {label}
      </h3>
      <ul role="list" className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3.5">
            <Icon
              aria-hidden
              strokeWidth={2.25}
              className={
                tone === 'do'
                  ? 'mt-1 size-5 shrink-0 text-success'
                  : 'mt-1 size-5 shrink-0 text-destructive'
              }
            />
            <span className="text-base leading-[1.6] text-pretty text-soft">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Usage do and don't, side by side (stacked on phones). */
export function UsageSection({ content }: { content: BrandContent['usage'] }) {
  return (
    <BrandSection id="usage" title={content.title} intro={content.intro}>
      <div className="grid gap-5 md:grid-cols-2">
        <RuleList label={content.doLabel} items={content.dos} tone="do" />
        <RuleList label={content.dontLabel} items={content.donts} tone="dont" />
      </div>
    </BrandSection>
  );
}
