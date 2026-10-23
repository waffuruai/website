import { Accent } from '@/components/sections/accent';
import type { CodeToken, HomeContent, TuneLevel } from '@/content/pages/home';
import { cn } from '@/lib/utils';

/** Syntax colours, all from tokens so both themes keep their contrast. */
const TOKEN_CLASS: Record<NonNullable<CodeToken['kind']>, string> = {
  comment: 'text-muted-foreground',
  keyword: 'text-foreground',
  function: 'text-brand-ink',
};

/**
 * How each tier reads: label colour, how many of the three bars are lit, and
 * the pulse along its track (faster = tuned further; the classes are spelled
 * out so Tailwind can see them).
 */
const LEVELS: Record<
  TuneLevel,
  { label: string; bar: string; lit: number; pulse: string }
> = {
  primary: {
    label: 'text-brand-ink',
    bar: 'bg-brand-ink',
    lit: 3,
    pulse: 'bg-brand-ink [animation-duration:1.4s]',
  },
  secondary: {
    label: 'text-foreground',
    bar: 'bg-foreground',
    lit: 2,
    pulse: 'bg-foreground [animation-duration:2.4s]',
  },
  runs: {
    label: 'text-soft',
    bar: 'bg-muted-foreground',
    lit: 1,
    pulse: 'bg-faint [animation-duration:4.6s]',
  },
};

function Tier({ tier }: { tier: HomeContent['kernel']['tiers'][number] }) {
  const level = LEVELS[tier.level];

  return (
    <li className="flex flex-col gap-3.5 border-t border-foreground/10 py-6 last:border-b">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h4 className="text-[22px] text-foreground">{tier.name}</h4>
        <span
          className={cn('flex items-center gap-2.5 label-mono', level.label)}
        >
          {tier.label}
          <span aria-hidden className="flex gap-[3px]">
            {[0, 1, 2].map((bar) => (
              <span
                key={bar}
                className={cn(
                  'h-1.5 w-3.5 rounded-[1px]',
                  bar < level.lit ? level.bar : 'bg-off',
                )}
              />
            ))}
          </span>
        </span>
      </div>
      <span
        aria-hidden
        className="relative block h-px overflow-hidden bg-foreground/12"
      >
        <span className={cn('wf-pulse', level.pulse)} />
      </span>
      <p className="text-base leading-[1.55] text-muted-foreground">
        {tier.note}
      </p>
    </li>
  );
}

/**
 * "You write this. Iron writes the rest.": a real kernel on the left, the
 * backends it lowers to (and how well each is tuned) on the right, and the
 * hardware it runs on underneath.
 */
export function KernelCode({ content }: { content: HomeContent['kernel'] }) {
  const { title, code, tuned, tiers, runsOn } = content;

  return (
    <section className="relative z-[6] mx-auto max-w-site px-site py-30 max-[720px]:pt-18 max-[720px]:pb-10">
      <h2 className="mb-14 heading-section">
        <Accent text={title} />
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(520px,100%),1fr))] items-stretch gap-8">
        <figure className="overflow-hidden rounded-lg border border-foreground/10 bg-card">
          <figcaption className="flex justify-between gap-3 border-b border-foreground/8 px-[22px] py-4 font-mono text-xs text-muted-foreground">
            <span>{code.file}</span>
            <span>{code.label}</span>
          </figcaption>
          <pre
            tabIndex={0}
            className="overflow-x-auto px-6 py-7 font-mono text-sm leading-[1.75] text-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring max-[720px]:px-4 max-[720px]:py-5 max-[720px]:text-xs"
          >
            <code>
              {code.tokens.map((token, index) =>
                token.kind ? (
                  <span key={index} className={TOKEN_CLASS[token.kind]}>
                    {token.text}
                  </span>
                ) : (
                  token.text
                ),
              )}
            </code>
          </pre>
        </figure>

        <div className="flex flex-col">
          <div className="flex justify-between gap-4 pb-4 text-muted-foreground">
            <h3 className="label-mono">{tuned.title}</h3>
            <span className="label-mono max-[720px]:hidden">{tuned.note}</span>
          </div>
          <ul>
            {tiers.map((tier) => (
              <Tier key={tier.name} tier={tier} />
            ))}
          </ul>
        </div>
      </div>

      <div
        role="group"
        aria-labelledby="runs-on"
        className="mt-14 flex flex-wrap items-center gap-3"
      >
        <span id="runs-on" className="mr-2 label-mono text-muted-foreground">
          {runsOn.label}
        </span>
        {runsOn.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-foreground/16 px-4 py-2.5 text-sm text-foreground"
          >
            {item}
          </span>
        ))}
        <span className="rounded-full border border-dashed border-foreground/30 px-4 py-2.5 text-sm text-soft">
          {runsOn.pending}
        </span>
      </div>
    </section>
  );
}
