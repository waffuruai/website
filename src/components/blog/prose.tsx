import { cn } from '@/lib/utils';

/**
 * The typography plugin's palette is fixed greys, which vanish on the dark
 * theme. These map it onto the site tokens, so it follows light and dark with
 * no `prose-invert`.
 */
const themeVars = [
  '[--tw-prose-body:var(--soft)]',
  '[--tw-prose-lead:var(--soft)]',
  '[--tw-prose-headings:var(--foreground)]',
  '[--tw-prose-bold:var(--foreground)]',
  '[--tw-prose-links:var(--brand-ink)]',
  '[--tw-prose-counters:var(--muted-foreground)]',
  '[--tw-prose-bullets:var(--muted-foreground)]',
  '[--tw-prose-hr:var(--border)]',
  '[--tw-prose-quotes:var(--foreground)]',
  '[--tw-prose-quote-borders:var(--brand)]',
  '[--tw-prose-captions:var(--muted-foreground)]',
  '[--tw-prose-kbd:var(--foreground)]',
  '[--tw-prose-code:var(--foreground)]',
  '[--tw-prose-th-borders:var(--border)]',
  '[--tw-prose-td-borders:var(--border)]',
];

/**
 * Long-form article body on the typography plugin: Geist body copy, serif
 * headings, gold links, mono inline code. Code blocks opt out (`not-prose`,
 * see `CodeFrame`) and carry their own frame.
 */
export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'prose prose-lg max-w-none break-words',
        // Serif headings with the heading scale of the inner pages.
        'prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.02em] prose-headings:text-balance',
        'prose-h2:mt-16 prose-h2:mb-5 prose-h2:text-[clamp(32px,4.4vw,44px)] prose-h2:leading-[1.05]',
        'prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-[clamp(24px,3vw,30px)] prose-h3:leading-[1.15]',
        // The After Hours accent: an italic word in a heading (`## Why *now*`).
        '[&_:is(h2,h3)_em]:[font-family:var(--font-instrument-serif-italic),var(--font-serif)] [&_:is(h2,h3)_em]:text-brand-ink',
        'prose-p:leading-[1.7] prose-p:text-pretty',
        // Links: gold, underlined.
        'prose-a:font-medium prose-a:underline prose-a:decoration-brand-ink/40 prose-a:underline-offset-4 hover:prose-a:decoration-brand-ink',
        'prose-strong:font-medium',
        'prose-li:marker:text-muted-foreground',
        // Inline code: a quiet pill, no backticks.
        'prose-code:rounded-md prose-code:bg-foreground/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
        'prose-blockquote:border-l-brand prose-blockquote:font-serif prose-blockquote:text-[1.35em] prose-blockquote:font-normal prose-blockquote:not-italic',
        'prose-img:mx-auto prose-img:my-8 prose-img:h-auto prose-img:rounded-xl prose-hr:my-12',
        'prose-figure:my-8 prose-figcaption:text-center',
        '[&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none',
        themeVars,
        className,
      )}
      {...props}
    />
  );
}
