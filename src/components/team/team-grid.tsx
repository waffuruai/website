import { TeamCard, type TeamCardLabels } from '@/components/team/team-card';
import { team, teamCopy } from '@/content/team';
import { localize } from '@/lib/content';
import type { Locale } from '@/i18n/config';

/**
 * How wide a portrait renders, so the browser picks the right size from the
 * srcset: a quarter of the 1360px container from 1100px (where the longest
 * title still fits on one line), half of it from 701px, and one column
 * (capped at 420px) below that.
 */
export const TEAM_CARD_SIZES =
  '(min-width: 1100px) calc((min(100vw, 1360px) - 140px) / 4), (min-width: 1025px) calc((100vw - 100px) / 2), (min-width: 701px) calc((100vw - 84px) / 2), min(100vw - 40px, 420px)';

/**
 * The team cards: four across on desktop, two on tablet, one on phones,
 * with a short last row centred. Order and content come from
 * `src/content/team.ts`.
 */
export function TeamGrid({
  locale,
  labels,
}: {
  locale: Locale;
  labels: TeamCardLabels;
}) {
  const copy = localize(teamCopy, locale);

  return (
    <ul role="list" className="flex flex-wrap justify-center gap-5">
      {team.map((member) => {
        const memberCopy = copy[member.slug];
        if (!memberCopy) return null;
        return (
          <li
            key={member.slug}
            className="w-full max-w-[420px] min-[701px]:w-[calc((100%-20px)/2)] min-[701px]:max-w-none min-[1100px]:w-[calc((100%-60px)/4)]"
          >
            <TeamCard
              member={member}
              copy={memberCopy}
              labels={labels}
              sizes={TEAM_CARD_SIZES}
            />
          </li>
        );
      })}
    </ul>
  );
}
