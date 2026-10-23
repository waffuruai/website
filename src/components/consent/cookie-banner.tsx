'use client';

import { XIcon } from 'lucide-react';
import { useEffect } from 'react';

import { ConsentButton, PolicyLink } from '@/components/consent/consent-parts';
import { useConsentValue } from '@/components/consent/use-consent';
import { useDictionary } from '@/i18n/dictionary-provider';
import {
  acceptConsent,
  acknowledgeConsentNotice,
  declineConsent,
  dismissConsentBanner,
  getConsentTier,
  isConsentBannerOpen,
} from '@/lib/consent';

/** True for elements where Escape means something else (clear a field). */
const isEditable = (target: EventTarget | null) =>
  target instanceof Element &&
  target.closest('input, textarea, select, [contenteditable]') !== null;

/**
 * Escape closes the banner unless something else already handled it (a menu
 * or dialog closing calls `preventDefault`) or the visitor is typing.
 */
function useEscapeToDismiss() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        !event.defaultPrevented &&
        !isEditable(event.target)
      ) {
        dismissConsentBanner();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);
}

function Banner() {
  const { consent: t } = useDictionary();
  const tier = useConsentValue(getConsentTier, 'unknown');
  const notice = tier === 'notice';
  useEscapeToDismiss();

  return (
    <div
      role="region"
      aria-label={t.label}
      className="animate-in fade-in-0 slide-in-from-bottom-3 fixed inset-x-0 bottom-0 z-40 duration-300 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[26rem] sm:max-w-[calc(100vw-2.5rem)]"
    >
      <div className="bg-card text-card-foreground border-foreground/12 light:shadow-black/10 flex flex-col gap-3 rounded-t-3xl border-t p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl shadow-black/30 sm:gap-4 sm:rounded-2xl sm:border sm:pb-5">
        <div className="flex items-start justify-between gap-4">
          <p className="label-mono text-soft inline-flex items-center gap-2.5">
            <span
              aria-hidden
              className="bg-brand size-2 shrink-0 rounded-full"
            />
            {t.label}
          </p>
          <button
            type="button"
            aria-label={t.dismiss}
            onClick={dismissConsentBanner}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 -my-3 -mr-3 inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-3"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        </div>
        <p className="text-soft text-sm/6">
          {notice ? t.noticeMessage : t.message} <PolicyLink />
        </p>
        <div className="flex gap-2">
          <ConsentButton
            variant="outline"
            className="flex-1"
            onClick={declineConsent}
          >
            {notice ? t.optOut : t.decline}
          </ConsentButton>
          <ConsentButton
            className="flex-1"
            onClick={notice ? acknowledgeConsentNotice : acceptConsent}
          >
            {notice ? t.ok : t.accept}
          </ConsentButton>
        </div>
      </div>
    </div>
  );
}

/**
 * Cookie banner: a raised card, bottom-left on desktop and full width at the
 * bottom of a phone. It is never an interstitial (the page stays readable
 * and scrollable, and nothing shifts), and it only renders in the browser
 * once the visitor's region is known. Opt-in regions get Accept / Decline;
 * elsewhere it is a notice with OK / Opt out (analytics already applies).
 */
export function CookieBanner() {
  const open = useConsentValue(isConsentBannerOpen, false);
  return open ? <Banner /> : null;
}
