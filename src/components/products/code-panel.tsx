import {
  highlight,
  type CodeLanguage,
  type TokenRole,
} from '@/components/products/code-highlight';
import { cn } from '@/lib/utils';

/** Token roles map to semantic colours, so both themes keep their contrast. */
const ROLE_CLASS: Record<TokenRole, string> = {
  muted: 'text-muted-foreground',
  strong: 'text-foreground',
  accent: 'text-brand-ink',
  plain: '',
};

/**
 * The After Hours code panel: raised card, a header bar with the file name on
 * the left and the language label on the right, then the source in Geist
 * Mono. Rendered on the server; nothing here runs in the browser.
 */
export function CodePanel({
  filename,
  label,
  language,
  source,
  caption,
  className,
}: {
  filename: string;
  label: string;
  language: CodeLanguage;
  source: string;
  caption?: string;
  className?: string;
}) {
  const lines = highlight(source, language);

  return (
    <figure className={cn('flex flex-col gap-4', className)}>
      <div className="border-foreground/10 bg-card overflow-hidden rounded-2xl border">
        <div className="border-foreground/10 text-muted-foreground flex justify-between gap-3 border-b px-[22px] py-4 font-mono text-xs">
          <span>{filename}</span>
          <span>{label}</span>
        </div>
        <pre
          // Wide lines scroll inside the panel, so it must be keyboard-reachable.
          tabIndex={0}
          role="region"
          aria-label={`${filename}, ${label}`}
          className="text-soft overflow-x-auto px-4 py-5 font-mono text-[12px] leading-[1.75] sm:px-6 sm:py-7 sm:text-[14px]"
        >
          <code>
            {lines.map((line, index) => (
              <span key={index}>
                {line.map((token, tokenIndex) => (
                  <span
                    key={tokenIndex}
                    className={ROLE_CLASS[token.role] || undefined}
                  >
                    {token.text}
                  </span>
                ))}
                {index < lines.length - 1 && '\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
      {caption && (
        <figcaption className="text-muted-foreground text-sm leading-[1.5]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
