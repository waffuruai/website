import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import {
  deriveToolResearch,
  toolResearchEvidence as evidence,
  type ToolResearchCopy,
} from '@/content/pages/tool-research';
import { localeInfo, type Locale } from '@/i18n/config';

import { InferenceExample } from './inference-example';

/** Fills `{name}` placeholders in a copy string. */
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);

/**
 * A frozen research result. Both arms ran the same 144 requests, so the
 * figure leads with cost per correct argument (derived in
 * `deriveToolResearch`, never typed by hand) and keeps the denominator,
 * retention, total tokens and the test conditions visible on the card.
 */
export function ToolResearch({
  content,
  locale = 'en',
}: {
  content: ToolResearchCopy;
  locale?: Locale;
}) {
  const derived = deriveToolResearch(evidence);
  const number = new Intl.NumberFormat(localeInfo[locale].lang);
  const n = (value: number) => number.format(value);

  const bars = [
    {
      label: content.figure.baseline,
      value: derived.baselinePerCorrect,
      candidate: false,
    },
    {
      label: content.figure.candidate,
      value: derived.candidatePerCorrect,
      candidate: true,
    },
  ];
  const arrow = <span className="mx-2 text-brand-ink">→</span>;
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: content.figure.exact,
      value: (
        <>
          {evidence.baseline}
          {arrow}
          {evidence.candidate}
          <span className="text-sm text-muted-foreground">
            {' '}
            / {evidence.requests}
          </span>
        </>
      ),
    },
    {
      label: content.figure.totalTokens,
      value: (
        <>
          {n(evidence.baselineTokens)}
          {arrow}
          {n(evidence.candidateTokens)}
        </>
      ),
    },
    {
      label: content.figure.retained,
      value: `${evidence.retained} / ${evidence.baseline}`,
    },
    {
      label: content.figure.perAdditional,
      value: (
        <>
          ~{n(derived.tokensPerAdditionalCorrect)}
          <span className="text-sm text-muted-foreground">
            {' '}
            {content.figure.unit}
          </span>
        </>
      ),
    },
    {
      label: content.figure.development,
      value: (
        <>
          {evidence.developmentBaseline} / {evidence.developmentRequests}
          {arrow}
          {evidence.developmentCandidate} / {evidence.developmentRequests}
        </>
      ),
    },
  ];

  return (
    <section
      id="tool-reliability"
      aria-labelledby="tool-reliability-title"
      className="relative z-[6] mx-auto max-w-site px-site py-30 max-[720px]:py-18"
    >
      <MonoLabel dot className="mb-6">
        {content.eyebrow}
      </MonoLabel>
      <SectionHeading
        id="tool-reliability-title"
        title={content.title}
        intro={fill(content.intro, {
          more: n(derived.additionalCorrect),
          before: n(derived.baselinePerCorrect),
          after: n(derived.candidatePerCorrect),
        })}
        className="mb-12"
      />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
        <figure className="rounded-2xl border border-foreground/12 bg-card p-6 sm:p-8">
          <figcaption className="mb-8 flex flex-col gap-3">
            <span className="label-mono text-muted-foreground">
              {content.figure.headline}
            </span>
            <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-[clamp(34px,4vw,52px)] leading-none tracking-[-0.06em] text-foreground tabular-nums">
                {n(derived.baselinePerCorrect)}
                {arrow}
                {n(derived.candidatePerCorrect)}
              </span>
              <span className="text-base text-brand-ink">
                {fill(content.figure.fewer, {
                  percent: n(derived.fewerPercent),
                })}
              </span>
            </span>
          </figcaption>
          <div className="flex flex-col gap-6">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-2.5 flex flex-wrap items-end justify-between gap-2">
                  <span className="text-sm text-soft">{bar.label}</span>
                  <span className="font-mono text-lg text-foreground tabular-nums">
                    {n(bar.value)}
                    <span className="text-sm text-muted-foreground">
                      {' '}
                      {content.figure.unit}
                    </span>
                  </span>
                </div>
                <div
                  role="meter"
                  aria-label={bar.label}
                  aria-valuemin={0}
                  aria-valuemax={derived.baselinePerCorrect}
                  aria-valuenow={bar.value}
                  aria-valuetext={`${n(bar.value)} ${content.figure.unit}`}
                  className="h-3 overflow-hidden rounded-sm bg-foreground/6"
                >
                  <div
                    className={`h-full ${bar.candidate ? 'bg-brand' : 'bg-foreground/30'}`}
                    style={{
                      width: `${(bar.value / derived.baselinePerCorrect) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <dl className="mt-8 grid gap-x-6 gap-y-5 border-t border-foreground/12 pt-6 sm:grid-cols-2">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="text-sm text-muted-foreground">{row.label}</dt>
                <dd className="mt-1.5 font-mono text-lg text-foreground tabular-nums">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 border-t border-foreground/12 pt-5 text-xs leading-relaxed text-muted-foreground">
            {content.figure.caption}
          </p>
        </figure>

        <div>
          <h3 className="mb-3 label-mono text-muted-foreground">
            {content.methodTitle}
          </h3>
          <InferenceExample steps={content.steps} copy={content.example} />
        </div>
      </div>

      <div className="mt-10 max-w-[820px] border-l-2 border-brand pl-5">
        <h3 className="label-mono text-soft">{content.wrongTitle}</h3>
        <p className="mt-3 text-base leading-[1.65] text-soft">
          {content.wrongBody}
        </p>
      </div>

      <details className="mt-9 border-y border-foreground/12 py-5">
        <summary className="min-h-11 content-center text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {content.details}
        </summary>
        <div className="grid gap-6 pt-5 pb-3 text-sm leading-[1.7] text-muted-foreground md:grid-cols-2">
          <div>
            <h3 className="mb-3 label-mono text-soft">{content.scopeTitle}</h3>
            <p className="mb-4 text-foreground">
              {evidence.model} · {evidence.hardware} · {evidence.api}
            </p>
            <p>{content.scope}</p>
          </div>
          <div>
            <p>{content.cost}</p>
            <p className="mt-4">{content.limits}</p>
          </div>
        </div>
      </details>
    </section>
  );
}
