'use client';

import { XIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { ConsentButton, PolicyLink } from '@/components/consent/consent-parts';
import { useConsentValue } from '@/components/consent/use-consent';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useDictionary } from '@/i18n/dictionary-provider';
import {
  closeConsentSettings,
  getSettingsDefaults,
  getSettingsOpener,
  hasGlobalPrivacyControl,
  isConsentSettingsOpen,
  saveConsent,
} from '@/lib/consent';

/** Mounted fresh each time the dialog opens, so the switch starts in sync. */
function SettingsBody() {
  const { consent: t } = useDictionary();
  const id = useId();
  const [analytics, setAnalytics] = useState(
    () => getSettingsDefaults().analytics,
  );
  const gpc = hasGlobalPrivacyControl();

  return (
    <>
      <DialogHeader className="gap-3 pr-8">
        <DialogTitle className="font-serif text-[28px] leading-tight font-normal tracking-tight">
          {t.settings}
        </DialogTitle>
        <DialogDescription className="text-sm/6 text-soft">
          {gpc ? t.gpcNotice : t.settingsDescription} <PolicyLink />
        </DialogDescription>
      </DialogHeader>

      <DialogClose asChild>
        <button
          type="button"
          aria-label={t.dismiss}
          className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <XIcon className="size-4" aria-hidden />
        </button>
      </DialogClose>

      {gpc ? (
        <DialogClose asChild>
          <ConsentButton className="w-full sm:ml-auto sm:w-auto">
            {t.dismiss}
          </ConsentButton>
        </DialogClose>
      ) : (
        <>
          <div className="flex items-start gap-4 rounded-xl border border-foreground/12 p-4">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Label
                htmlFor={id}
                className="text-[15px] leading-snug text-foreground"
              >
                {t.analyticsLabel}
              </Label>
              <p
                id={`${id}-description`}
                className="text-sm/6 text-muted-foreground"
              >
                {t.analyticsDescription}
              </p>
            </div>
            <Switch
              id={id}
              checked={analytics}
              onCheckedChange={setAnalytics}
              aria-describedby={`${id}-description`}
              className="mt-0.5 after:-inset-y-[13px] data-unchecked:border-foreground/35"
            />
          </div>
          <ConsentButton
            className="w-full sm:ml-auto sm:w-auto"
            onClick={() => saveConsent({ analytics })}
          >
            {t.save}
          </ConsentButton>
        </>
      )}
    </>
  );
}

/**
 * "Cookie settings" dialog (opened from the footer): the analytics switch
 * and Save. It starts from what is in effect now and changes nothing until
 * Save. With Global Privacy Control on it explains the signal instead.
 * Radix traps focus, closes on Escape and returns focus to the footer button.
 */
export function CookieSettingsDialog() {
  const open = useConsentValue(isConsentSettingsOpen, false);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) closeConsentSettings();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-2xl p-6 ring-foreground/12 sm:max-w-md"
        // The opener is not a <DialogTrigger> (it lives in the footer), so
        // Radix has nothing to refocus: hand focus back ourselves.
        onCloseAutoFocus={(event) => {
          const opener = getSettingsOpener();
          if (!opener?.isConnected) return;
          event.preventDefault();
          opener.focus();
        }}
      >
        <SettingsBody />
      </DialogContent>
    </Dialog>
  );
}
