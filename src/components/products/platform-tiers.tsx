import { ProductSection } from '@/components/products/product-section';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import type {
  PlatformTier,
  ProductCopy,
  ProductsShared,
  TierLevel,
} from '@/content/pages/products/types';
import { cn } from '@/lib/utils';

/**
 * How each tier looks: filled bars say how tuned it is, and the pulse runs
 * slower the less tuned it is. Colour is never the only signal: the tier is
 * also spelled out as a word.
 */
const LEVELS: Record<
  TierLevel,
  { bars: number; text: string; fill: string; pulse: string; duration: string }
> = {
  primary: {
    bars: 3,
    text: 'text-brand-ink',
    fill: 'bg-brand',
    pulse: 'bg-brand',
    duration: '1.4s',
  },
  secondary: {
    bars: 2,
    text: 'text-foreground',
    fill: 'bg-foreground',
    pulse: 'bg-foreground',
    duration: '2.4s',
  },
  runs: {
    bars: 1,
    text: 'text-soft',
    fill: 'bg-soft',
    pulse: 'bg-faint',
    duration: '4.6s',
  },
};

function Tier({
  tier,
  label,
}: {
  tier: PlatformTier;
  /** The tier word ("Primary"), translated. */
  label: string;
}) {
  const level = LEVELS[tier.level];
  return (
    <li className="border-foreground/10 flex flex-col gap-4 border-t pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-[22px] leading-tight">{tier.platform}</h3>
        <span
          className={cn('label-mono flex items-center gap-2.5', level.text)}
        >
          {label}
          <span aria-hidden className="flex gap-[3px]">
            {[0, 1, 2].map((bar) => (
              <span
                key={bar}
                className={cn(
                  'h-1.5 w-3.5 rounded-[1px]',
                  bar < level.bars ? level.fill : 'bg-off',
                )}
              />
            ))}
          </span>
        </span>
      </div>
      <span
        aria-hidden
        className="bg-foreground/12 relative block h-px overflow-hidden"
      >
        <span
          className={cn('wf-pulse', level.pulse)}
          style={{ animationDuration: level.duration }}
        />
      </span>
      <p className="text-muted-foreground text-base leading-[1.55]">
        {tier.note}
      </p>
    </li>
  );
}

/**
 * Hardware tiers (Metal primary, CUDA secondary, ROCm and Vulkan "runs, not
 * tuned yet") in the home page's vocabulary, plus the "runs on" machines.
 */
export function PlatformTiers({
  platforms,
  shared,
  inProgressLabel,
}: {
  platforms: NonNullable<ProductCopy['platforms']>;
  shared: Pick<ProductsShared, 'tierLabels' | 'tierLegend' | 'runsOn'>;
  /** Dictionary `common.inProgress`. */
  inProgressLabel: string;
}) {
  const { runsOn } = shared;
  return (
    <ProductSection id="platforms">
      <SectionHeading
        id="platforms"
        title={platforms.heading}
        intro={platforms.intro}
      />
      <ul className="mt-12 grid gap-x-10 gap-y-8 md:mt-16 md:grid-cols-3">
        {platforms.tiers.map((tier) => (
          <Tier
            key={tier.platform}
            tier={tier}
            label={shared.tierLabels[tier.level]}
          />
        ))}
      </ul>
      <p className="label-mono text-muted-foreground mt-6">
        {shared.tierLegend}
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3">
        <MonoLabel>{runsOn.label}</MonoLabel>
        <ul className="flex flex-wrap gap-3">
          {runsOn.items.map((item) => (
            <li
              key={item.label}
              className={cn(
                'rounded-full border px-4 py-2.5 text-sm',
                item.inProgress
                  ? 'border-foreground/30 text-soft border-dashed'
                  : 'border-foreground/16 text-foreground',
              )}
            >
              {item.label}
              {item.inProgress && ` · ${inProgressLabel}`}
            </li>
          ))}
        </ul>
      </div>
    </ProductSection>
  );
}
