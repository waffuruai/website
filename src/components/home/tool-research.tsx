import { LocalizedLink } from '@/components/localized-link';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import {
  toolResearchEvidence as evidence,
  type ToolResearchCopy,
} from '@/content/pages/tool-research';

/** A frozen research result, with its denominator, retention and costs intact. */
export function ToolResearch({ content }: { content: ToolResearchCopy }) {
  const rows = [
    { label: content.baseline, count: evidence.baseline, candidate: false },
    { label: content.candidate, count: evidence.candidate, candidate: true },
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
        intro={content.intro}
        className="mb-12"
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
        <figure className="rounded-2xl border border-foreground/12 bg-card p-6 sm:p-8">
          <figcaption className="mb-8 flex flex-col gap-3">
            <span className="label-mono text-muted-foreground">
              {content.resultTitle}
            </span>
            <span className="font-serif text-[clamp(30px,4vw,44px)] leading-[1.1] text-foreground">
              {content.gain}
            </span>
          </figcaption>
          <div className="flex flex-col gap-7">
            {rows.map((row) => (
              <div key={row.label}>
                <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                  <span className="text-sm text-soft">{row.label}</span>
                  <span className="font-mono text-xl text-foreground tabular-nums">
                    {row.count}
                    <span className="text-sm text-muted-foreground">
                      {' '}
                      / {evidence.requests}
                    </span>
                  </span>
                </div>
                <div
                  role="meter"
                  aria-label={row.label}
                  aria-valuemin={0}
                  aria-valuemax={evidence.requests}
                  aria-valuenow={row.count}
                  aria-valuetext={`${row.count} / ${evidence.requests}`}
                  className="h-3 overflow-hidden rounded-sm bg-foreground/6"
                >
                  <div
                    className={`h-full ${row.candidate ? 'bg-brand' : 'bg-foreground/30'}`}
                    style={{
                      width: `${(row.count / evidence.requests) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-right font-mono text-xs text-muted-foreground">
            {content.denominator}
          </p>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {evidence.model} · {evidence.hardware} · {evidence.api}
          </p>
          <dl className="mt-7 grid gap-6 border-t border-foreground/12 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">
                {content.retained}
              </dt>
              <dd className="mt-2 font-mono text-xl text-foreground tabular-nums">
                {evidence.retained} / {evidence.baseline}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">
                {content.development}
              </dt>
              <dd className="mt-2 font-mono text-xl text-foreground tabular-nums">
                {evidence.developmentBaseline} / {evidence.developmentRequests}
                <span aria-hidden className="mx-2 text-brand-ink">
                  →
                </span>
                <span className="sr-only"> → </span>
                {evidence.developmentCandidate} / {evidence.developmentRequests}
              </dd>
            </div>
          </dl>
        </figure>

        <div>
          <h3 className="mb-3 label-mono text-muted-foreground">
            {content.methodTitle}
          </h3>
          <ol>
            {content.steps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-5 border-t border-foreground/12 py-5"
              >
                <span
                  aria-hidden
                  className="pt-1 font-mono text-xs text-brand-ink"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="mb-2 text-xl text-foreground">{step.title}</h4>
                  <p className="text-sm leading-[1.65] text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-l-2 border-brand pl-5 text-base leading-[1.65] text-soft">
            {content.implication}
          </p>
        </div>
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
            <p className="mt-4">{content.method}</p>
          </div>
          <div>
            <p>{content.cost}</p>
            <p className="mt-4">{content.limits}</p>
            <LocalizedLink
              href={evidence.sourceHref}
              className="mt-5 inline-block min-h-11 content-center text-brand-ink underline"
            >
              {content.source}
            </LocalizedLink>
            <p className="mt-2 text-xs">{content.sourceNote}</p>
          </div>
        </div>
      </details>
    </section>
  );
}
