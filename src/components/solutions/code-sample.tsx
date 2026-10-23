import { SectionOpener } from '@/components/solutions/section-opener';
import type { CodeSample as CodeSampleContent } from '@/content/pages/solutions/types';

/**
 * A real kernel in the After Hours code card (file name on the left, the
 * language on the right), with the "Emits" strip from the home hero under
 * it. Plain text: no client-side highlighter.
 */
export function CodeSample({
  id,
  label,
  sample,
}: {
  id: string;
  label: string;
  sample: CodeSampleContent;
}) {
  return (
    <section
      aria-labelledby={id}
      className="mx-auto max-w-site px-site pt-[72px] md:pt-[120px]"
    >
      <SectionOpener
        id={id}
        label={label}
        title={sample.title}
        intro={sample.intro}
      />
      <figure className="max-w-[880px] overflow-hidden rounded-2xl border border-foreground/10 bg-card">
        <figcaption className="flex justify-between gap-3 border-b border-foreground/10 px-[22px] py-4 font-mono text-xs text-muted-foreground">
          <span>{sample.filename}</span>
          <span>{sample.language}</span>
        </figcaption>
        <pre
          tabIndex={0}
          className="overflow-x-auto px-4 py-5 font-mono text-xs leading-[1.75] text-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring md:px-6 md:py-7 md:text-sm"
        >
          <code>{sample.code}</code>
        </pre>
      </figure>
      <p className="mt-10 flex max-w-[880px] flex-wrap gap-x-7 gap-y-2 border-t border-foreground/12 pt-7 label-mono text-muted-foreground">
        <span>{sample.emitsLabel} →</span>
        {sample.emits.map((target) => (
          <span key={target} className="text-foreground">
            {target}
          </span>
        ))}
        <span aria-hidden className="wf-blink text-brand-ink">
          ▍
        </span>
      </p>
    </section>
  );
}
