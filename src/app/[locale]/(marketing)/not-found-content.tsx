import { LocalizedLink } from '@/components/localized-link';
import type { Dictionary } from '@/i18n/dictionaries/en';

/** "That page has melted away": the branded 404 body, in the page's locale. */
export function NotFoundContent({ dictionary }: { dictionary: Dictionary }) {
  const { notFound } = dictionary;
  return (
    <section className="max-w-site px-site mx-auto flex flex-col items-start gap-8 py-32">
      <p className="label-mono text-muted-foreground">404</p>
      <h1 className="heading-page max-w-4xl">{notFound.title}</h1>
      <p className="text-soft max-w-lg text-lg">{notFound.description}</p>
      <LocalizedLink
        href="/"
        className="bg-primary text-primary-foreground hover:text-primary-foreground inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-7 text-[15px] font-medium"
      >
        {notFound.home} →
      </LocalizedLink>
    </section>
  );
}
