import { Picture } from '@/components/picture';
import { SocialIcon } from '@/components/social-icon';
import { CountryFlag } from '@/components/team/country-flag';
import {
  visibleLinks,
  type Country,
  type TeamCopy,
  type TeamMember,
} from '@/content/team';
import { interpolate } from '@/i18n/config';
import { cn } from '@/lib/utils';

export type TeamCardLabels = {
  /** `{name}` is replaced with the person's name. */
  portraitAlt: string;
  /** `{name}` and `{network}`: the accessible name of a profile link. */
  linkAria: string;
  /** Visible link text per network. */
  linkNames: Record<keyof TeamMember['links'], string>;
  /** Country names for the flag beside each name. */
  countries: Record<Country, string>;
};

/**
 * One person: a square portrait, muted until hovered (or until a link in the
 * card has focus; on touch screens it is always in colour), then the name in
 * serif, the role in gold, the bio and a row of profile icons pinned to the
 * bottom of the card, so the icons line up across a row of cards. Hovering
 * the card raises the one-line background over the foot of the photo; touch
 * screens skip it, since the bio says the same at length. Only real URLs
 * render: placeholders stay hidden.
 */
export function TeamCard({
  member,
  copy,
  labels,
  sizes,
  headingLevel: Heading = 'h2',
  priority = false,
  className,
}: {
  member: TeamMember;
  copy: TeamCopy;
  labels: TeamCardLabels;
  /** The `sizes` attribute for the portrait: how wide the card renders. */
  sizes: string;
  headingLevel?: 'h2' | 'h3';
  priority?: boolean;
  className?: string;
}) {
  const links = visibleLinks(member);

  return (
    <article
      className={cn('group/card flex h-full flex-col gap-[18px]', className)}
    >
      <div className="wf-portrait relative overflow-hidden rounded-[14px] bg-card">
        <Picture
          name={member.photo}
          sizes={sizes}
          priority={priority}
          alt={interpolate(labels.portraitAlt, { name: member.name })}
          className="block"
          imgClassName="block aspect-square w-full object-cover object-[50%_20%] group-hover/card:filter-none group-focus-within/card:filter-none pointer-coarse:filter-none!"
        />
        <p className="absolute inset-x-0 bottom-0 translate-y-full border-t border-foreground/15 bg-background/80 px-4 py-3 text-[13px] leading-[1.4] text-pretty text-soft opacity-0 backdrop-blur-md transition duration-300 ease-out group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100 motion-reduce:transition-none pointer-coarse:hidden">
          {copy.background}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-3">
          <Heading className="font-serif text-[30px] leading-[1.05] font-normal">
            {member.name}
          </Heading>
          <CountryFlag
            country={member.country}
            label={labels.countries[member.country]}
          />
        </div>
        <p className="label-mono text-brand-ink">{copy.role}</p>
        <p className="mt-1 text-[15px] leading-[1.55] text-pretty text-muted-foreground">
          {copy.bio}
        </p>
        {links.length > 0 && (
          <ul role="list" className="mt-auto -ml-[13px] flex pt-1">
            {links.map(([network, href]) => (
              <li key={network}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={interpolate(labels.linkAria, {
                    name: member.name,
                    network: labels.linkNames[network],
                  })}
                  className="inline-flex size-11 items-center justify-center rounded-sm text-soft transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <SocialIcon network={network} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
