import { Accent } from '@/components/sections/accent';
import type { HomeContent, ModelLab } from '@/content/pages/home';
import { cn } from '@/lib/utils';

/** Marquee speed and direction per lane (classes are spelled out for Tailwind). */
const LANES = [
  { duration: '[--marquee-duration:70s]', reverse: false },
  { duration: '[--marquee-duration:85s]', reverse: true },
] as const;

function StatusDot({ inProgress }: { inProgress: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'border-brand-ink size-2 shrink-0 rounded-full border',
        !inProgress && 'bg-brand-ink',
      )}
    />
  );
}

/**
 * One lab. The logo is a mask over `currentColor`, so it follows the theme;
 * status is a filled (supported) or hollow (in progress) dot, spelled out for
 * screen readers.
 */
function ModelCard({
  model,
  legend,
  clone = false,
}: {
  model: ModelLab;
  legend: HomeContent['models']['legend'];
  /** The second copy that makes the loop seamless: hidden from assistive tech. */
  clone?: boolean;
}) {
  const inProgress = model.status === 'in-progress';

  return (
    <li
      aria-hidden={clone || undefined}
      className={cn(
        'bg-card border-foreground/10 flex w-[280px] shrink-0 flex-col gap-5 rounded-lg border p-6',
        // Without motion there is no loop, so the copy is just a duplicate.
        clone && 'motion-reduce:hidden',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          aria-hidden
          className="wf-logo text-foreground size-9"
          style={
            { '--logo': `url(/logos/${model.logo}.svg)` } as React.CSSProperties
          }
        />
        <span className="flex items-center">
          <StatusDot inProgress={inProgress} />
          <span className="sr-only">
            {inProgress ? legend.inProgress : legend.supported}
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-foreground font-serif text-[32px] leading-none">
          {model.lab}
        </span>
        <span className="text-muted-foreground font-mono text-[13px] leading-normal">
          {model.models}
        </span>
      </div>
    </li>
  );
}

/**
 * "Models on the menu.": two lanes of lab cards drifting in opposite
 * directions. Each lane lists its cards twice and scrolls by half its width,
 * so the loop never jumps; the second copy is `aria-hidden`. Hovering a lane
 * pauses it, and with reduced motion the lane is a plain scrollable row.
 */
export function Models({ content }: { content: HomeContent['models'] }) {
  const { title, intro, legend, lanes } = content;

  return (
    <section
      id="models"
      className="relative z-[6] pt-30 pb-10 max-[720px]:pt-18 max-[720px]:pb-4"
    >
      <div className="max-w-site px-site mx-auto mb-14 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <h2 className="heading-section max-w-[900px]">
          <Accent text={title} />
        </h2>
        <div className="flex max-w-[400px] flex-col gap-3.5">
          <p className="text-muted-foreground text-base leading-[1.6]">
            {intro}
          </p>
          <ul
            aria-hidden
            className="text-soft flex gap-5 font-mono text-[11px] tracking-[0.08em] uppercase"
          >
            <li className="flex items-center gap-2">
              <StatusDot inProgress={false} />
              {legend.supported}
            </li>
            <li className="flex items-center gap-2">
              <StatusDot inProgress />
              {legend.inProgress}
            </li>
          </ul>
        </div>
      </div>

      {lanes.map((cards, index) => {
        const lane = LANES[index];
        return (
          <div
            key={index}
            className={cn(
              'wf-lane group motion-reduce:overflow-x-auto',
              index > 0 && 'mt-2',
            )}
          >
            <ul
              className={cn(
                'wf-marquee group-hover:[animation-play-state:paused]',
                lane.duration,
              )}
              data-reverse={lane.reverse ? '' : undefined}
            >
              {[false, true].flatMap((clone) =>
                cards.map((model) => (
                  <ModelCard
                    key={`${clone ? 'copy' : 'card'}-${model.logo}`}
                    model={model}
                    legend={legend}
                    clone={clone}
                  />
                )),
              )}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
