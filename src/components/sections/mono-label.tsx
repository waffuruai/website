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
        'label-mono text-soft inline-flex items-center gap-2.5',
        className,
      )}
    >
      {dot && (
        <span aria-hidden className="bg-brand size-2 shrink-0 rounded-full" />
      )}
      {children}
    </Tag>
  );
}
