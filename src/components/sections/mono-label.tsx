import { cn } from '@/lib/utils';

/**
 * Mono caps label, optionally led by the 8px gold dot (the hero's "Four
 * products" line) or an index ("01 · Kernels").
 */
export function MonoLabel({
  children,
  dot = false,
  className,
  as: Tag = 'p',
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
  as?: 'p' | 'span' | 'div';
}) {
  return (
    <Tag
      className={cn(
        'inline-flex items-start gap-2.5 label-mono text-soft',
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className="mt-[0.3em] size-2 shrink-0 rounded-full bg-brand"
        />
      )}
      {children}
    </Tag>
  );
}
