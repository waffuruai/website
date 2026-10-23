import { MonoLabel } from '@/components/sections/mono-label';
import { SectionOpener } from '@/components/solutions/section-opener';
import type {
  HardwareStatus,
  SolutionsShared,
} from '@/content/pages/solutions/types';
import { cn } from '@/lib/utils';

/** Bars lit, colours and pulse speed for each tier (the design's key). */
const STATUS: Record<
  HardwareStatus,
  { text: string; bar: string; lit: number; pulse: string; duration: string }
> = {
  primary: {
    text: 'text-brand-ink',
    bar: 'bg-brand',
    lit: 3,
    pulse: 'bg-brand',
    duration: '1.4s',
  },
  secondary: {
    text: 'text-foreground',
    bar: 'bg-foreground',
    lit: 2,
    pulse: 'bg-foreground',
    duration: '2.4s',
  },
  runs: {
    text: 'text-soft',
    bar: 'bg-muted-foreground',
    lit: 1,
    pulse: 'bg-faint',
    duration: '4.6s',
  },
};

/**
 * The honest note: early access, closed source, which hardware is tuned
 * and which only runs. The page's own notes sit on the left; the shared
 * hardware tiers (Metal primary, CUDA secondary, ROCm and Vulkan run) and
 * the "Runs on" chips sit on the right and below.
 */
export function WhereWeAre({
  id,
  label,
  title,
  lede,
  notes,
  hardware,
}: {
  id: string;
  label: string;
  title: string;
  lede: string;
  notes: string[];
  hardware: SolutionsShared['hardware'];
}) {
  return (
    <section
      aria-labelledby={id}
      className="mx-auto max-w-site px-site pt-[72px] md:pt-[120px]"
    >
      <SectionOpener id={id} label={label} title={title} intro={lede} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <MonoLabel as="p" className="text-muted-foreground">
            {hardware.notesLabel}
          </MonoLabel>
          <ul className="flex flex-col gap-5">
            {notes.map((note) => (
              <li
                key={note}
                className="flex gap-3.5 text-base leading-[1.6] text-pretty text-soft"
              >
                <span
                  aria-hidden
                  className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand"
                />
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <MonoLabel as="p" className="pb-4 text-muted-foreground">
            {hardware.tiersLabel}
          </MonoLabel>
          <ul>
            {hardware.tiers.map((tier) => {
              const status = STATUS[tier.status];
              return (
                <li
                  key={tier.name}
                  className="flex flex-col gap-3.5 border-t border-foreground/10 py-6 last:border-b"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <span className="text-[22px] text-foreground">
                      {tier.name}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-2.5 label-mono',
                        status.text,
                      )}
                    >
                      {tier.statusLabel}
                      <span aria-hidden className="flex gap-[3px]">
                        {[0, 1, 2].map((bar) => (
                          <span
                            key={bar}
                            className={cn(
                              'h-1.5 w-3.5 rounded-[1px]',
                              bar < status.lit ? status.bar : 'bg-off',
                            )}
                          />
                        ))}
                      </span>
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="relative block h-px overflow-hidden bg-foreground/12"
                  >
                    <span
                      className={cn('wf-pulse', status.pulse)}
                      style={{ animationDuration: status.duration }}
                    />
                  </span>
                  <span className="text-base leading-[1.55] text-muted-foreground">
                    {tier.note}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-14 flex flex-wrap items-center gap-3">
        <MonoLabel as="span" className="mr-2 text-muted-foreground">
          {hardware.runsOnLabel}
        </MonoLabel>
        {hardware.runsOn.map((chip) => (
          <span
            key={chip.label}
            className={cn(
              'rounded-full border px-4 py-2.5 text-sm',
              chip.inProgress
                ? 'border-dashed border-foreground/30 text-soft'
                : 'border-foreground/16 text-foreground',
            )}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </section>
  );
}
