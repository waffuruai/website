import type { Metadata, Viewport } from 'next';

import {
  geist,
  geistMono,
  instrumentSerif,
  instrumentSerifItalic,
} from '@/app/fonts';
import { CookieBanner } from '@/components/consent/cookie-banner';
import { CookieSettingsDialog } from '@/components/consent/cookie-settings-dialog';
import { Analytics } from '@/components/providers/analytics';
import { Providers } from '@/components/providers/providers';
import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/content/site';
import { localeInfo } from '@/i18n/config';
import { DictionaryProvider } from '@/i18n/dictionary-provider';
import {
  getDictionary,
  localeParams,
  resolveLocale,
  type LocaleParams,
} from '@/i18n/server';
import { organization, website } from '@/lib/json-ld';
import { cn } from '@/lib/utils';
import '@/styles/tailwind.css';

// Only the five locales exist; anything else under [locale] is a 404.
export const dynamicParams = false;
export const generateStaticParams = localeParams;

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { meta } = await getDictionary(await resolveLocale(params));
  return {
    metadataBase: new URL(site.url),
    title: { template: '%s · Waffuru', default: meta.defaultTitle },
    description: meta.defaultDescription,
    applicationName: site.name,
    icons: {
      icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.webmanifest',
    alternates: {
      types: { 'application/rss+xml': '/blog/feed.xml' },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#0a0908',
  colorScheme: 'dark light',
};

/** Root layout: one per locale, so `<html lang>` always matches the page. */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);

  return (
    <html
      lang={localeInfo[locale].lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        instrumentSerif.variable,
        instrumentSerifItalic.variable,
        geist.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-dvh">
        <Providers>
          <DictionaryProvider locale={locale} dictionary={dictionary}>
            {children}
            <Analytics />
            <CookieBanner />
            <CookieSettingsDialog />
          </DictionaryProvider>
        </Providers>
        <JsonLd data={[organization(), website(localeInfo[locale].lang)]} />
      </body>
    </html>
  );
}
