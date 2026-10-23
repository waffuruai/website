import { LocalizedLink } from '@/components/localized-link';
import { Picture } from '@/components/picture';
import { localize } from '@/lib/content';
import { getMember, teamCopy } from '@/content/team';
import { interpolate, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { formatPostDate } from '@/lib/blog';
import { cn } from '@/lib/utils';

/** The team member behind a post's `author` slug; a typo fails the build. */
export function getAuthor(slug: string, locale: Locale) {
  const member = getMember(slug);
  if (!member)
    throw new Error(`Unknown blog author "${slug}" (see src/content/team.ts)`);
  const copy = localize(teamCopy, locale)[slug] ?? teamCopy.en[slug];
  return { member, role: copy?.role };
}

/**
 * Photo, "By Name" (linking to the team page), role, and optionally the date
 * and reading time. `sm` is the compact line on cards.
 */
export function AuthorByline({
  author,
  locale,
  blog,
  date,
  readingMinutes,
  size = 'md',
  className,
}: {
  /** Team slug, e.g. `eric-kryski`. */
  author: string;
  locale: Locale;
  blog: Dictionary['blog'];
  /** ISO date. */
  date?: string;
  readingMinutes?: number;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const { member, role } = getAuthor(author, locale);
  const small = size === 'sm';
  const details = [
    role,
    date && (
      <time key="date" dateTime={date}>
        {formatPostDate(date, locale)}
      </time>
    ),
    readingMinutes &&
      interpolate(blog.readingTime, { minutes: readingMinutes }),
  ].filter(Boolean);

  return (
    <div
      className={cn('flex items-center gap-3', className)}
      data-author={member.slug}
    >
      <Picture
        name={member.photo}
        alt=""
        sizes={small ? '28px' : '48px'}
        className={cn(
          'shrink-0 overflow-hidden rounded-full border border-foreground/10',
          small ? 'size-7' : 'size-12',
        )}
        imgClassName="size-full object-cover"
      />
      <div className="flex min-w-0 flex-col text-sm">
        <span className="font-medium text-foreground">
          <LocalizedLink
            href="/about/team"
            className="underline-offset-4 hover:text-brand-ink hover:underline"
          >
            {interpolate(blog.by, { author: member.name })}
          </LocalizedLink>
        </span>
        {!small && details.length > 0 && (
          <span className="text-muted-foreground">
            {details.map((detail, index) => (
              <span key={index}>
                {index > 0 && ' · '}
                {detail}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
