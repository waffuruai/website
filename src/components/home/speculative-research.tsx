import { LocalizedLink } from '@/components/localized-link';
import { MonoLabel } from '@/components/sections/mono-label';
import { SectionHeading } from '@/components/sections/section-heading';
import {
  speculativeEvidence as evidence,
  type SpeculativeResearchCopy,
} from '@/content/pages/speculative-research';
import { SpeculativeResults } from './speculative-results';

/** Outcome first; the native implementation and reproducible scope are one disclosure away. */
export function SpeculativeResearch({
  content,
}: {
  content: SpeculativeResearchCopy;
}) {
  const rows = [
    [
      content.singleTitle,
      `${evidence.greedy.single} / ${evidence.sampled.single}`,
      content.unit,
    ],
    [
      content.metrics.prefill,
      `${evidence.greedy.prefill} / ${evidence.sampled.prefill}`,
      content.unit,
    ],
    [
      content.metrics.singleTtft,
      `${evidence.greedy.ttft.toFixed(2)} / ${evidence.sampled.ttft.toFixed(2)}`,
      's',
    ],
    [
      content.burstTitle,
      `${evidence.greedy.burst} / ${evidence.sampled.burst}`,
      content.unit,
    ],
    [
      content.metrics.lane,
      `${evidence.greedy.lane} / ${evidence.sampled.lane}`,
      content.unit,
    ],
    [
      content.metrics.concurrentTtft,
      `${evidence.greedy.concurrentTtft.toFixed(2)} / ${evidence.sampled.concurrentTtft.toFixed(2)}`,
      's',
    ],
  ];
  return (
    <section
      id="native-inference"
      aria-labelledby="native-inference-title"
      className="relative z-[6] mx-auto max-w-site px-site pt-24 pb-12 max-[720px]:pt-18"
    >
      <MonoLabel dot className="mb-6">
        {content.eyebrow}
      </MonoLabel>
      <SectionHeading
        id="native-inference-title"
        title={content.title}
        intro={content.intro}
        className="mb-10"
      />
      <SpeculativeResults content={content} evidence={evidence} />
      <details className="mt-8 border-y border-foreground/12 py-5">
        <summary className="min-h-11 content-center text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
          {content.details}
        </summary>
        <ol className="mt-7 grid gap-x-10 md:grid-cols-2">
          {content.steps.map((step, index) => (
            <li key={step.title} className="border-t border-foreground/12 py-5">
              <span className="label-mono text-brand-ink">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-xl text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{content.method}</p>
            <p>{content.cost}</p>
            <p>{content.qualification}</p>
          </div>
          <div className="min-w-0">
            <table className="w-full text-left text-sm">
              <caption className="mb-4 text-left label-mono text-soft">
                {content.metrics.comparison} · T0 / T0.7
              </caption>
              <thead>
                <tr className="border-b border-foreground/12">
                  <th
                    scope="col"
                    className="pb-3 font-normal text-muted-foreground"
                  >
                    {content.metrics.metric}
                  </th>
                  <th
                    scope="col"
                    className="pb-3 text-right font-normal text-muted-foreground"
                  >
                    T0 / T0.7
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, value, unit]) => (
                  <tr key={label} className="border-b border-foreground/8">
                    <th scope="row" className="py-3 pr-3 font-normal text-soft">
                      {label}
                    </th>
                    <td className="py-3 text-right font-mono text-xs text-foreground tabular-nums">
                      {value}
                      <span className="ml-1 text-muted-foreground">{unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-sm text-soft">{content.sources}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {evidence.sources.map((source) => (
                <li key={source.href}>
                  <LocalizedLink
                    href={source.href}
                    className="inline-block min-h-11 content-center text-sm text-brand-ink underline"
                  >
                    {source.label}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </section>
  );
}
