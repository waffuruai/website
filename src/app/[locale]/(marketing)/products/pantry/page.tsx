import type { Metadata } from 'next';

import { coverSrc } from '@/components/blog/cover';
import { PantryPage } from '@/components/pantry/pantry-page';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { pantry } from '@/content/pages/pantry/pantry';
import { getDictionary, resolveLocale } from '@/i18n/server';
import { localize } from '@/lib/content';
import { createMetadata } from '@/lib/seo';

type PantryParams = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: PantryParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { seo } = localize(pantry, locale);
  return createMetadata({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    path: pantryFacts.path,
    locale,
    // The launch card: headline, tags and an example scan.
    image: {
      src: coverSrc('blog/introducing-pantry'),
      width: 1200,
      height: 630,
    },
  });
}

/**
 * /products/pantry, our free vulnerability scanner. A static segment, so it
 * wins over `products/[slug]` (the stack); Pantry is not one of the four.
 */
export default async function PantryRoute({
  params,
}: {
  params: PantryParams;
}) {
  const locale = await resolveLocale(params);
  const dictionary = await getDictionary(locale);
  return <PantryPage locale={locale} dictionary={dictionary} />;
}
