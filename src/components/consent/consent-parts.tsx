'use client';

import { LocalizedLink } from '@/components/localized-link';
import { useDictionary } from '@/i18n/dictionary-provider';
import { cn } from '@/lib/utils';

const VARIANTS = {
  /** Cream pill on dark (ink on cream in light mode): the main action. */
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  /** Hairline pill, as on the header's "Request access". */
  outline:
    'border border-foreground/28 text-foreground hover:border-foreground/60',
} as const;

/** The After Hours pill at consent scale: 44px tall, 15px medium label. */
export function ConsentButton({
  variant = 'primary',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  variant?: keyof typeof VARIANTS;
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-full px-6 text-[15px] font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}

/** Link to the cookie policy, shared by the banner and the settings panel. */
export function PolicyLink() {
  const { consent: t } = useDictionary();
  return (
    <LocalizedLink
      href="/legal/cookies"
      className="text-foreground underline decoration-foreground/40 hover:decoration-foreground"
    >
      {t.policyLink}
    </LocalizedLink>
  );
}
