import { Accent } from '@/components/sections/accent';
import { MonoLabel } from '@/components/sections/mono-label';
import type { Cta } from '@/content/types';
import { cn } from '@/lib/utils';

import { PillLink } from './pill-link';

/**
 * The top of an inner page: mono label with the gold dot, a serif H1 with
 * an accent word (`*word*`), a lede and up to two actions. Same rhythm as
 * the home hero, without the tile grid.
 */
export function PageHero({
  label,
  title,
  lede,
  actions = [],
  className,
  children,
}: {
  label?: string;
  /** Use `*word*` for the gold italic accent. */
  title: string;
  lede?: string;
  actions?: Cta[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'max-w-site px-site mx-auto flex flex-col gap-8 pt-16 pb-20 md:pt-28 md:pb-28',
        className,
      )}
    >
      {label && (
        <MonoLabel dot className="wf-rise">
          {label}
        </MonoLabel>
      )}
      <h1 className="heading-page wf-rise max-w-[1100px]">
        <Accent text={title} />
      </h1>
      {lede && (
        <p className="wf-rise text-soft max-w-[640px] text-[19px] leading-[1.55] text-pretty">
          {lede}
        </p>
      )}
      {actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-4">
          {actions.map((action, index) => (
            <PillLink
              key={action.href}
              href={action.href}
              variant={
                action.variant === 'outline' || index > 0
                  ? 'outline'
                  : 'primary'
              }
            >
              {action.label}
            </PillLink>
          ))}
        </div>
      )}
      {children}
    </section>
  );
}
