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
      className="max-w-site px-site mx-auto pt-[72px] md:pt-[120px]"
    >
      <SectionOpener
        id={id}
        label={label}
        title={sample.title}
        intro={sample.intro}
      />
      <figure className="border-foreground/10 bg-card max-w-[880px] overflow-hidden rounded-2xl border">
        <figcaption className="border-foreground/10 text-muted-foreground flex justify-between gap-3 border-b px-[22px] py-4 font-mono text-xs">
          <span>{sample.filename}</span>
          <span>{sample.language}</span>
        </figcaption>
        <pre
          tabIndex={0}
          className="text-soft focus-visible:outline-ring overflow-x-auto px-4 py-5 font-mono text-xs leading-[1.75] focus-visible:outline-2 focus-visible:-outline-offset-2 md:px-6 md:py-7 md:text-sm"
        >
          <code>{sample.code}</code>
        </pre>
      </figure>
      <p className="label-mono text-muted-foreground border-foreground/12 mt-10 flex max-w-[880px] flex-wrap gap-x-7 gap-y-2 border-t pt-7">
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
