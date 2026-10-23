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
      className="fixed inset-x-0 bottom-0 z-40 animate-in duration-300 fade-in-0 slide-in-from-bottom-3 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[26rem] sm:max-w-[calc(100vw-2.5rem)]"
    >
      <div className="flex flex-col gap-3 rounded-t-3xl border-t border-foreground/12 bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-card-foreground shadow-2xl shadow-black/30 sm:gap-4 sm:rounded-2xl sm:border sm:pb-5 light:shadow-black/10">
        <div className="flex items-start justify-between gap-4">
          <p className="inline-flex items-center gap-2.5 label-mono text-soft">
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full bg-brand"
            />
            {t.label}
          </p>
          <button
            type="button"
            aria-label={t.dismiss}
            onClick={dismissConsentBanner}
            className="-my-3 -mr-3 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <XIcon className="size-4" aria-hidden />
          </button>
        </div>
        <p className="text-sm/6 text-soft">
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
