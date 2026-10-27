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
  const levels = greedy.levels;
  // One column per measured concurrency level, each cell T0 over T0.7; each
  // row says how it was aggregated (see `speculativeEvidence`). The paired
  // optimization gain is a separate trial and stays in the gain panel.
  const pair = (
    format: (level: (typeof levels)[number]) => string,
  ): [string, string][] =>
    levels.map((level, index) => [
      format(level),
      format(sampled.levels[index]),
    ]);
  const rows: [string, [string, string][], string, string][] = [
    [
      content.metrics.burst,
      pair((level) => level.burst.toFixed(1)),
      content.unit,
      content.aggregation.burst,
    ],
    [
      content.metrics.lane,
      pair((level) => level.lane.toFixed(1)),
      content.unit,
      content.aggregation.perRequest,
    ],
    [
      content.metrics.concurrentTtft,
      pair((level) => level.ttft.toFixed(2)),
      's',
      content.aggregation.ttft,
    ],
    [
      content.metrics.concurrentTtftP90,
      pair((level) => level.ttftP90.toFixed(2)),
      's',
      content.aggregation.ttft,
    ],
    [
      content.metrics.prefill,
      pair((level) => level.prefill.toLocaleString('en-US')),
      content.unit,
      content.aggregation.prefill,
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
                    <span className="mt-0.5 block text-xs">
                      {content.metrics.requests} →
                    </span>
                  </th>
                  {levels.map((level) => (
                    <th
                      key={level.requests}
                      scope="col"
                      className="pb-3 pl-2 text-right align-bottom font-mono text-xs font-normal text-muted-foreground tabular-nums"
                    >
                      {level.requests}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, values, unit, aggregation]) => (
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
                    {values.map(([greedyValue, sampledValue], index) => (
                      <td
                        key={levels[index].requests}
                        className="py-3 pl-2 text-right align-top font-mono text-xs whitespace-nowrap text-foreground tabular-nums"
                      >
                        {[greedyValue, sampledValue].map((value, line) => (
                          <span
                            key={line}
                            className={
                              line === 0
                                ? 'block'
                                : 'mt-0.5 block text-muted-foreground'
                            }
                          >
                            {value}
                            {index === values.length - 1 ? (
                              <span className="ml-1 text-muted-foreground">
                                {unit}
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </td>
                    ))}
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
