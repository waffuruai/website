import type { Metadata } from 'next';

import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';
import { createMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { meta } = await getDictionary(locale);
  return {
    ...createMetadata({
      description: meta.defaultDescription,
      path: '/',
      locale,
    }),
    title: { absolute: meta.defaultTitle },
  };
}

/** Home. Placeholder until the After Hours port lands. */
export default async function HomePage({ params }: { params: LocaleParams }) {
  const { meta } = await getDictionary(await resolveLocale(params));
  return (
    <section className="max-w-site px-site mx-auto py-32">
      <h1 className="heading-hero">
        Raw math, <em>pressed</em> into silicon.
      </h1>
      <p className="text-soft mt-8 max-w-[520px] text-[19px] leading-[1.55]">
        {meta.defaultDescription}
      </p>
    </section>
  );
}
