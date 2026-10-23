import { LocalizedLink } from '@/components/localized-link';
import type { Dictionary } from '@/i18n/dictionaries/en';

/** "That page has melted away": the branded 404 body, in the page's locale. */
export function NotFoundContent({ dictionary }: { dictionary: Dictionary }) {
  const { notFound } = dictionary;
  return (
    <section className="mx-auto flex max-w-site flex-col items-start gap-8 px-site py-32">
      <p className="label-mono text-muted-foreground">404</p>
      <h1 className="max-w-4xl heading-page">{notFound.title}</h1>
      <p className="max-w-lg text-lg text-soft">{notFound.description}</p>
      <LocalizedLink
        href="/"
        className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-primary px-7 text-[15px] font-medium text-primary-foreground hover:text-primary-foreground"
      >
        {notFound.home} →
      </LocalizedLink>
    </section>
  );
}
