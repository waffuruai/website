import type { Metadata } from 'next';

import { NotFoundContent } from '@/app/[locale]/(marketing)/not-found-content';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { locales } from '@/i18n/config';

/*
 * The 404 page, once per locale. Static export only writes real 404 pages
 * from a prerendered route, so this catch-all prerenders `/<locale>/404`
 * (out/<locale>/404.html); Cloudflare serves the nearest 404.html for any
 * unknown path, and the postbuild copies the English one to out/404.html.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale, rest: ['404'] }));
}

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { notFound } = await getDictionary(await resolveLocale(params));
  return {
    title: notFound.title,
    description: notFound.description,
    robots: { index: false, follow: true },
  };
}

export default async function CatchAllNotFound({
  params,
}: {
  params: LocaleParams;
}) {
  const dictionary = await getDictionary(await resolveLocale(params));
  return <NotFoundContent dictionary={dictionary} />;
}
