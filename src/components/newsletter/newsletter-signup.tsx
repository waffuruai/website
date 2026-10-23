'use client';

import { useDictionary } from '@/i18n/dictionary-provider';

/**
 * Mailing-list signup. Placeholder until the form lands: it renders the
 * heading and copy only, so pages can place it now.
 */
export function NewsletterSignup({ className }: { className?: string }) {
  const { newsletter } = useDictionary();
  return (
    <div className={className}>
      <p className="font-serif text-3xl">{newsletter.heading}</p>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        {newsletter.description}
      </p>
    </div>
  );
}
