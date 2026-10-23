'use client';

import { CheckIcon, LanguagesIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LOCALE_COOKIE,
  localeInfo,
  localizePath,
  locales,
  splitLocale,
  type Locale,
} from '@/i18n/config';
import { useDictionary, useLocale } from '@/i18n/dictionary-provider';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Remembers an explicit choice. The Worker reads this cookie and never
 * redirects someone who has picked a language, English included.
 */
const rememberLocale = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax; secure`;
};

/**
 * Language menu that keeps the current page when switching. Plain anchors,
 * not client navigation: each locale has its own root layout, so the switch
 * is a full page load either way.
 */
export function LanguageSwitcher({
  className,
  showLabel,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { language } = useDictionary();
  const current = useLocale();
  // The build path carries `/en`; the browser path does not. Strip either.
  const { path } = splitLocale(usePathname() ?? '/');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={showLabel ? 'default' : 'icon'}
          className={cn(showLabel && 'gap-2', className)}
          aria-label={showLabel ? undefined : language.label}
          title={language.label}
        >
          <LanguagesIcon className="size-[18px]" aria-hidden />
          {showLabel && <span>{localeInfo[current].label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} asChild>
            <a
              href={localizePath(path, locale)}
              hrefLang={localeInfo[locale].lang}
              lang={localeInfo[locale].lang}
              aria-current={locale === current ? 'true' : undefined}
              onClick={() => {
                rememberLocale(locale);
                trackEvent({
                  category: 'UI',
                  action: 'locale_switch',
                  label: locale,
                  from_locale: current,
                });
              }}
            >
              <CheckIcon
                className={cn('size-4', locale !== current && 'invisible')}
                aria-hidden
              />
              {localeInfo[locale].label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
