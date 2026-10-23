import { Accent } from '@/components/sections/accent';
import { cn } from '@/lib/utils';

/**
 * Section opener as on the After Hours page: a serif H2 on the left (accent
 * word allowed) and a short muted intro to its right, wrapping under it on
 * narrow screens.
 */
export function SectionHeading({
  title,
  intro,
  id,
  className,
}: {
  title: string;
  intro?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-x-12 gap-y-6',
        className,
      )}
    >
      <h2 id={id} className="heading-section max-w-[900px]">
        <Accent text={title} />
      </h2>
      {intro && (
        <p className="text-muted-foreground max-w-[400px] text-base leading-[1.6]">
          {intro}
        </p>
      )}
    </div>
  );
}
