import { Picture } from '@/components/picture';
import { Accent } from '@/components/sections/accent';
import { PillLink } from '@/components/sections/pill-link';
import type { AboutContent } from '@/content/pages/about';
import { team } from '@/content/team';
import { interpolate } from '@/i18n/config';

/**
 * A nod to the team page: every portrait, small, in one row and a "Meet the
 * team" link. The portraits are muted until hovered, like the team cards.
 */
export function TeamTeaser({
  content,
}: {
  content: AboutContent['teamTeaser'];
}) {
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="mx-auto max-w-site px-site py-[72px] md:py-[120px]"
    >
      <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-16">
        <div className="flex max-w-[560px] flex-col gap-6">
          <h2 id="team-title" className="heading-section">
            <Accent text={content.title} />
          </h2>
          <p className="text-[19px] leading-[1.55] text-pretty text-soft">
            {content.body}
          </p>
          <PillLink href="/about/team" variant="outline" className="self-start">
            {content.cta}
          </PillLink>
        </div>
        <ul
          role="list"
          className="grid gap-2 md:w-[min(520px,50%)] md:gap-3"
          style={{
            gridTemplateColumns: `repeat(${team.length}, minmax(0, 1fr))`,
          }}
        >
          {team.map((member) => (
            <li key={member.slug}>
              <Picture
                name={member.photo}
                sizes="(min-width: 768px) 125px, 22vw"
                alt={interpolate(content.portraitAlt, { name: member.name })}
                className="wf-portrait block"
                imgClassName="block aspect-square w-full rounded-xl object-cover object-[50%_20%] pointer-coarse:filter-none! md:rounded-2xl"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
