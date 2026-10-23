import { Accent } from '@/components/sections/accent';
import { LocalizedLink } from '@/components/localized-link';
import { legalCopy } from '@/content/legal';
import type { Heading } from '@/lib/headings';
import { formatPolicyDate, type Policy } from '@/lib/legal';

/** Contents need at least this many `##` headings to be worth showing. */
export const TOC_MIN_HEADINGS = 3;

/**
 * Typography for long-form legal text: the typography plugin's `prose`, with
 * its colours pointed at our tokens (so both themes work) and serif headings.
 */
const PROSE = [
  'prose max-w-none text-[17px] leading-[1.7]',
  '[--tw-prose-body:var(--soft)] [--tw-prose-lead:var(--soft)]',
  '[--tw-prose-headings:var(--foreground)] [--tw-prose-bold:var(--foreground)]',
  '[--tw-prose-links:var(--foreground)] [--tw-prose-quotes:var(--foreground)]',
  '[--tw-prose-code:var(--foreground)] [--tw-prose-counters:var(--muted-foreground)]',
  '[--tw-prose-bullets:var(--muted-foreground)] [--tw-prose-captions:var(--muted-foreground)]',
  '[--tw-prose-hr:var(--border)] [--tw-prose-quote-borders:var(--border)]',
  '[--tw-prose-th-borders:var(--border)] [--tw-prose-td-borders:var(--border)]',
  'prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-[-0.01em]',
  'prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[clamp(32px,4vw,44px)] prose-h2:leading-[1.05]',
  'prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-2xl',
  'prose-a:underline prose-a:decoration-foreground/35 prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:decoration-foreground',
  'prose-strong:font-medium',
  'prose-li:my-1.5 prose-li:marker:text-muted-foreground',
  'prose-th:text-foreground prose-th:font-medium prose-td:align-top',
].join(' ');

function TableOfContents({
  headings,
  className,
}: {
  headings: Heading[];
  className?: string;
}) {
  return (
    <nav aria-label={legalCopy.onThisPage} className={className}>
      <ol className="flex flex-col">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-soft hover:text-foreground inline-flex min-h-11 items-center text-[15px] leading-snug transition-colors lg:min-h-9 lg:py-1"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** The title's last word is the gold italic accent: "Terms of *use*". */
function accentLastWord(title: string) {
  const index = title.lastIndexOf(' ');
  return index === -1
    ? title
    : `${title.slice(0, index)} *${title.slice(index + 1)}*`;
}

/**
 * Layout for a legal policy (the default export of each policy's MDX).
 * Policies are English-only legal text, so the article is `lang="en"` in
 * every locale. With three or more `##` headings a contents list shows:
 * a sticky sidebar on large screens, a collapsible `<details>` on small ones.
 */
export function PolicyLayout({
  policy,
  headings = [],
  children,
}: {
  policy: Policy;
  headings?: Heading[];
  children: React.ReactNode;
}) {
  const showToc = headings.length >= TOC_MIN_HEADINGS;

  return (
    <div
      data-section="policy"
      className={
        showToc
          ? 'max-w-site px-site mx-auto pt-16 pb-12 md:pt-24 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16'
          : 'max-w-site px-site mx-auto pt-16 pb-12 md:pt-24'
      }
    >
      <article lang="en" className="max-w-[760px] min-w-0">
        <header className="flex flex-col gap-6">
          <LocalizedLink
            href="/legal"
            className="label-mono text-soft hover:text-foreground inline-flex min-h-11 w-fit items-center gap-2"
          >
            <span aria-hidden="true">←</span>
            {legalCopy.allLegal}
          </LocalizedLink>
          <h1 className="heading-section text-[clamp(44px,6vw,80px)]">
            <Accent text={accentLastWord(policy.title)} />
          </h1>
          <p className="label-mono text-muted-foreground">
            {legalCopy.lastUpdated}{' '}
            <time dateTime={policy.date}>{formatPolicyDate(policy.date)}</time>
          </p>
        </header>
        {showToc && (
          <details className="border-foreground/12 bg-card mt-10 rounded-2xl border px-5 py-1 lg:hidden">
            <summary className="label-mono text-soft flex min-h-11 cursor-pointer items-center">
              {legalCopy.onThisPage}
            </summary>
            <TableOfContents headings={headings} className="pb-3" />
          </details>
        )}
        <div className={`${PROSE} mt-12`} data-mdx-content>
          {children}
        </div>
      </article>
      {showToc && (
        <aside lang="en" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="label-mono text-muted-foreground mb-3">
              {legalCopy.onThisPage}
            </p>
            <TableOfContents
              headings={headings}
              className="border-foreground/12 max-h-[calc(100dvh-10rem)] overflow-y-auto border-l pl-5"
            />
          </div>
        </aside>
      )}
    </div>
  );
}
