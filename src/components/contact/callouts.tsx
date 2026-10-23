import { PillLink } from '@/components/sections/pill-link';
import { SectionHeading } from '@/components/sections/section-heading';
import { mailto } from '@/content/site';
import type { ContactContent } from '@/content/pages/contact';

/**
 * The "pick a door" grid on /contact: one card per topic, each a short line
 * and an email link whose subject is already set (`mailto()`). No form: a
 * message goes straight to a person's inbox.
 */
export function Callouts({
  title,
  intro,
  emailLabel,
  items,
}: ContactContent['callouts']) {
  return (
    <section
      aria-labelledby="callouts-heading"
      className="max-w-site px-site mx-auto pb-16 md:pb-24"
    >
      <SectionHeading id="callouts-heading" title={title} intro={intro} />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.subject}
            className="border-foreground/12 bg-card flex flex-col gap-4 rounded-3xl border p-6 md:p-8"
          >
            <h3 className="font-serif text-4xl leading-none tracking-[-0.01em]">
              {item.title}
            </h3>
            <p className="text-soft mb-4 text-base leading-[1.6]">
              {item.body}
            </p>
            <PillLink
              href={mailto(item.subject)}
              variant="outline"
              className="mt-auto self-start"
            >
              {emailLabel}
              <span className="sr-only">: {item.title}</span>
            </PillLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
