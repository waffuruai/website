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
  const { greedy, sampled } = evidence;
  // Each row says how it was aggregated: the single-stream rows are medians
  // of three runs, the burst row pools three runs, the per-request rows are
  // per-request statistics across those runs (see `speculativeEvidence`).
  const rows: [string, string, string, string][] = [
    [
      content.singleTitle,
      `${greedy.single} / ${sampled.single}`,
      content.unit,
      content.aggregation.single,
    ],
    [
      content.metrics.prefill,
      `${greedy.prefill} / ${sampled.prefill}`,
      content.unit,
      content.aggregation.single,
    ],
    [
      content.metrics.singleTtft,
      `${greedy.ttft.toFixed(2)} / ${sampled.ttft.toFixed(2)}`,
      's',
      content.aggregation.single,
    ],
    [
      content.burstTitle,
      `${greedy.burst} / ${sampled.burst}`,
      content.unit,
      content.aggregation.burst,
    ],
    [
      content.metrics.lane,
      `${greedy.lane} / ${sampled.lane}`,
      content.unit,
      content.aggregation.perRequest,
    ],
    [
      content.metrics.concurrentTtft,
      `${greedy.concurrentTtft.toFixed(2)} / ${sampled.concurrentTtft.toFixed(2)}`,
      's',
      content.aggregation.perRequest,
    ],
    [
      content.metrics.concurrentTtftP90,
      `${greedy.concurrentTtftP90.toFixed(1)} / ${sampled.concurrentTtftP90.toFixed(1)}`,
      's',
      content.aggregation.perRequest,
    ],
  ];
  return (
    <section
      id="native-inference"
      aria-labelledby="native-inference-title"
      className="relative z-[6] mx-auto max-w-site px-site pt-30 pb-12 max-[720px]:pt-18"
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
                {rows.map(([label, value, unit, aggregation]) => (
                  <tr key={label} className="border-b border-foreground/8">
                    <th
                      scope="row"
                      className="py-3 pr-3 align-top font-normal text-soft"
                    >
                      {label}
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {content.metrics.aggregation}: {aggregation}
                      </span>
                    </th>
                    <td className="py-3 text-right align-top font-mono text-xs whitespace-nowrap text-foreground tabular-nums">
                      {value}
                      <span className="ml-1 text-muted-foreground">{unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </section>
  );
}
