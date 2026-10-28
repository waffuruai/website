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
  /** Usually a string; a node when part of it is a link. */
  lede?: React.ReactNode;
  actions?: Cta[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'mx-auto flex max-w-site flex-col gap-8 px-site pt-16 pb-20 md:pt-28 md:pb-28',
        className,
      )}
    >
      {label && (
        <MonoLabel dot className="wf-rise">
          {label}
        </MonoLabel>
      )}
      <h1 className="wf-rise max-w-[1100px] heading-page">
        <Accent text={title} />
      </h1>
      {lede && (
        <p className="wf-rise max-w-[640px] text-[19px] leading-[1.55] text-pretty text-soft">
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
