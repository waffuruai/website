import { Accent } from '@/components/sections/accent';
import { MonoLabel } from '@/components/sections/mono-label';
import { PillLink } from '@/components/sections/pill-link';
import type { HiringContent } from '@/content/pages/about';
import { mailto } from '@/content/site';

/**
 * "Pull up a chair." Who we want and a button that emails hiring. It is the
 * anchor for `/about#hiring` (the Careers link), so it carries the id, and it
 * is reused on the team page. An open layout with a hairline on top, so it
 * reads differently from the raised call-to-action card that follows it.
 */
export function HiringCallout({ content }: { content: HiringContent }) {
  return (
    <section
      id="hiring"
      aria-labelledby="hiring-title"
      className="max-w-site px-site mx-auto py-12 md:py-20"
    >
      <div className="border-foreground/12 grid gap-10 border-t pt-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16 md:pt-16">
        <div className="flex flex-col gap-6">
          <MonoLabel dot>{content.label}</MonoLabel>
          <h2 id="hiring-title" className="heading-section">
            <Accent text={content.title} />
          </h2>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            {content.lines.map((line) => (
              <p
                key={line}
                className="text-soft text-[19px] leading-[1.55] text-pretty"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <p className="label-mono text-muted-foreground">
              {content.skillsLabel}
            </p>
            <ul role="list" className="flex flex-wrap gap-2.5">
              {content.skills.map((skill) => (
                <li
                  key={skill}
                  className="border-foreground/16 text-foreground rounded-full border px-4 py-2.5 text-[14px]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <PillLink href={mailto('Hiring')} className="self-start">
            {content.cta}
          </PillLink>
        </div>
      </div>
    </section>
  );
}
