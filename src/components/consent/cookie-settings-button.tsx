'use client';

import { useDictionary } from '@/i18n/dictionary-provider';

/** Footer "Cookie settings" link. Placeholder until the consent panel lands. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { consent } = useDictionary();
  return (
    <button type="button" className={className}>
      {consent.settings}
    </button>
  );
}
