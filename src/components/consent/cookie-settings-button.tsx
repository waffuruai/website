'use client';

import { useDictionary } from '@/i18n/dictionary-provider';
import { openConsentSettings } from '@/lib/consent';

/** Footer "Cookie settings" control: opens the settings dialog. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { consent } = useDictionary();
  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      onClick={(event) => openConsentSettings(event.currentTarget)}
    >
      {consent.settings}
    </button>
  );
}
