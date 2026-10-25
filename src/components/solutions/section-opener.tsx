import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import { cn } from '@/lib/utils';

/**
 * A section's opener: a mono label, then the serif H2 with its short intro
 * beside it (SectionHeading). Every solutions section starts this way.
 */
export function SectionOpener({
  label,
  title,
  intro,
  id,
  className,
}: {
  label: string;
  /** Use `*word*` for the gold italic accent. */
  title: string;
  intro?: string;
  /** Id of the H2, for `aria-labelledby` on the section. */
  id: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-10 flex flex-col gap-6 md:mb-14', className)}>
      <MonoLabel>{label}</MonoLabel>
      <SectionHeading id={id} title={title} intro={intro} />
    </div>
  );
}
