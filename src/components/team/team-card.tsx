import { Picture } from '@/components/picture';
import { visibleLinks, type TeamCopy, type TeamMember } from '@/content/team';
import { interpolate } from '@/i18n/config';
import { cn } from '@/lib/utils';

export type TeamCardLabels = {
  /** `{name}` is replaced with the person's name. */
  portraitAlt: string;
  /** `{name}` and `{network}`: the accessible name of a profile link. */
  linkAria: string;
  /** Visible link text per network. */
  linkNames: Record<keyof TeamMember['links'], string>;
};

/**
 * One person, as in the After Hours team section: a square portrait that is
 * muted until hovered (or until a link in the card has focus; on touch
 * screens it is always in colour), a frosted band over the bottom of the photo
 * with the role and a one-line background, then the name in serif, the bio and
 * a row of profile links. Only real URLs render: placeholders stay hidden.
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
    <article className={cn('group/card flex flex-col gap-[18px]', className)}>
      <div className="wf-portrait bg-card relative overflow-hidden rounded-[14px]">
        <Picture
          name={member.photo}
          sizes={sizes}
          priority={priority}
          alt={interpolate(labels.portraitAlt, { name: member.name })}
          className="block"
          imgClassName="block aspect-square w-full object-cover object-[50%_20%] group-hover/card:filter-none group-focus-within/card:filter-none pointer-coarse:filter-none!"
        />
        <div className="border-foreground/15 bg-background/80 absolute inset-x-0 bottom-0 flex flex-col gap-1 border-t px-4 py-3 backdrop-blur-md">
          <p className="label-mono text-foreground">{copy.role}</p>
          <p className="text-soft text-[13px] leading-[1.4] text-pretty">
            {copy.background}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Heading className="font-serif text-[30px] leading-[1.05] font-normal">
          {member.name}
        </Heading>
        <p className="text-muted-foreground text-[15px] leading-[1.55] text-pretty">
          {copy.bio}
        </p>
        {links.length > 0 && (
          <ul role="list" className="-mt-1 flex flex-wrap gap-x-5">
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
                  className="label-mono text-soft hover:text-foreground focus-visible:outline-ring inline-flex min-h-11 items-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {labels.linkNames[network]}
                  <span aria-hidden className="ml-1.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
