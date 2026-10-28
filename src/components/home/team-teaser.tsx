import { Picture } from '@/components/picture';
import { PillLink } from '@/components/sections/pill-link';
import { SectionHeading } from '@/components/sections/section-heading';
import type { HomeContent } from '@/content/pages/home';
import { CountryFlag } from '@/components/team/country-flag';
import { team, type Country, type TeamCopy } from '@/content/team';

/**
 * "Who's in the kitchen.": the five portraits with name and role, and a link
 * to the full team page. Portraits are muted until hovered. No bios here.
 */
export function TeamTeaser({
  content,
  copy,
  countries,
}: {
  content: HomeContent['team'];
  /** The localized `teamCopy`, keyed by slug. */
  copy: Record<string, TeamCopy>;
  /** Country names for the flag beside each name (`dictionary.countries`). */
  countries: Record<Country, string>;
}) {
  return (
    <section className="relative z-[6] mx-auto max-w-site px-site pt-30 pb-10 max-[720px]:pt-18">
      <SectionHeading
        title={content.title}
        intro={content.intro}
        className="mb-14"
      />

      <ul className="flex flex-wrap justify-center gap-5">
        {team.map((member) => (
          <li
            key={member.slug}
            className="wf-portrait flex basis-full gap-4 min-[721px]:basis-[calc((100%-40px)/3)] min-[721px]:flex-col min-[721px]:gap-[18px] min-[1025px]:basis-[calc((100%-80px)/5)]"
          >
            <div className="w-24 shrink-0 overflow-hidden rounded-[14px] bg-card min-[721px]:w-full">
              <Picture
                name={member.photo}
                alt={content.portraitAlt.replace('{name}', member.name)}
                sizes="(min-width: 1025px) 240px, (min-width: 721px) 33vw, 96px"
                className="block"
                imgClassName="aspect-square w-full object-cover object-[50%_20%]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <h3 className="font-serif text-2xl leading-[1.05] text-foreground min-[721px]:text-[30px]">
                  {member.name}
                </h3>
                <CountryFlag
                  country={member.country}
                  label={countries[member.country]}
                />
              </div>
              <p className="text-[15px] leading-[1.55] text-muted-foreground">
                {copy[member.slug]?.role}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <PillLink href={content.link.href} variant="outline">
          {content.link.label}
        </PillLink>
      </div>
    </section>
  );
}
