import { Children, isValidElement, type ReactElement } from 'react';

import { CopyButton } from '@/components/blog/copy-button';
import { textOf } from '@/lib/headings';
import { cn } from '@/lib/utils';

import './code-block.css';

type Part = ReactElement<Record<string, unknown>>;

const isPart = (child: unknown): child is Part =>
  isValidElement<Record<string, unknown>>(child);

/**
 * `<pre>` in MDX: scrolls inside itself, never the page. A highlighted block
 * (`data-theme`, from rehype-pretty-code) is framed by `MdxFigure`; a plain
 * fence that the highlighter did not touch is framed here, so every code
 * block has the same header and Copy button.
 */
export function Pre({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'pre'>) {
  const pre = (
    <pre
      tabIndex={0}
      className={cn(
        'm-0 overflow-x-auto bg-transparent py-5 font-mono text-[12px] leading-[1.75] text-soft outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:py-7 sm:text-[14px]',
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
  if ('data-theme' in props) return pre;

  const code = Children.toArray(children).find(isPart);
  const language = /(?:^|\s)language-(\S+)/.exec(
    String(code?.props.className ?? ''),
  )?.[1];
  return (
    <CodeFrame language={language ?? 'text'} code={textOf(children)}>
      {pre}
    </CodeFrame>
  );
}

/**
 * Header bar and frame for a highlighted block, as on Iron's kernel code
 * panel: file name on the left (the language when there is none), language
 * and a Copy button on the right.
 */
export function CodeFrame({
  title,
  language,
  code,
  caption,
  children,
}: {
  title?: string;
  language?: string;
  /** Plain text for the Copy button. */
  code: string;
  caption?: React.ReactNode;
  children: React.ReactNode;
}) {
  const name = title ?? language;
  return (
    <figure
      data-code-block=""
      aria-label={title}
      className="not-prose my-8 overflow-hidden rounded-2xl border border-foreground/10 bg-card text-card-foreground"
    >
      <div className="flex items-center justify-between gap-4 border-b border-foreground/8 px-4 py-3.5 font-mono text-xs text-muted-foreground sm:px-[22px]">
        <span className="min-w-0 truncate" data-code-title="">
          {name}
        </span>
        <span className="flex shrink-0 items-center gap-4">
          {title && language && (
            <span className="label-mono" data-code-language="">
              {language}
            </span>
          )}
          <CopyButton text={code} label={name} />
        </span>
      </div>
      {children}
      {caption && (
        <figcaption className="border-t border-foreground/8 px-4 py-3 text-sm text-muted-foreground sm:px-[22px]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * `<figure>` in MDX. rehype-pretty-code wraps every highlighted block in one
 * (`data-rehype-pretty-code-figure`) holding an optional title, the `<pre>`
 * and an optional caption; those become a `CodeFrame`. Any other figure is
 * passed through untouched.
 */
export function MdxFigure({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'figure'>) {
  if (!('data-rehype-pretty-code-figure' in props)) {
    return <figure {...props}>{children}</figure>;
  }

  const parts = Children.toArray(children).filter(isPart);
  const title = parts.find(
    (part) => 'data-rehype-pretty-code-title' in part.props,
  );
  const caption = parts.find(
    (part) => 'data-rehype-pretty-code-caption' in part.props,
  );
  const pre = parts.find(
    (part) => 'data-theme' in part.props && part !== title && part !== caption,
  );
  if (!pre) return <figure {...props}>{children}</figure>;

  const language = pre.props['data-language'];
  return (
    <CodeFrame
      title={title ? textOf(title.props.children) : undefined}
      language={typeof language === 'string' ? language : undefined}
      code={textOf(pre.props.children)}
      caption={caption?.props.children as React.ReactNode}
    >
      {pre}
    </CodeFrame>
  );
}
