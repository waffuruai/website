import { LocalizedLink } from '@/components/localized-link';
import { cn } from '@/lib/utils';

const VARIANTS = {
  /** Cream pill on dark (ink on cream in light mode): the main action. */
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground',
  /** Hairline pill, as on the header's "Request access". */
  outline:
    'border border-foreground/28 text-foreground hover:border-foreground/60 hover:text-foreground',
} as const;

/**
 * The After Hours pill button as a link: 52px tall, 15px medium label, an
 * optional trailing arrow. Internal hrefs are localized; external ones open
 * in a new tab (see `LocalizedLink`).
 */
export function PillLink({
  href,
  children,
  variant = 'primary',
  arrow = true,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  arrow?: boolean;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href' | 'children'>) {
  return (
    <LocalizedLink
      href={href}
      className={cn(
        'inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-7 text-center text-[15px] font-medium text-balance transition-colors',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
      {arrow && <span aria-hidden>→</span>}
    </LocalizedLink>
  );
}
