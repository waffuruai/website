import { CopyButton } from '@/components/blog/copy-button';
import { cn } from '@/lib/utils';

/**
 * A shell command (or a few lines of them) on a raised card with a copy
 * button: the header names it, the body is Geist Mono. Long lines wrap with
 * a hanging indent under their prompt instead of scrolling; Copy still copies
 * each command whole.
 */
export function CommandBlock({
  label,
  command,
  className,
}: {
  /** Names the block for the copy button and assistive tech. */
  label: string;
  command: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-foreground/10 bg-background',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-4 py-2 font-mono text-xs text-muted-foreground">
        <span>{label}</span>
        <CopyButton text={command} label={label} />
      </div>
      <pre
        tabIndex={0}
        role="region"
        aria-label={label}
        className="px-4 py-4 font-mono text-[13px] leading-[1.7] [overflow-wrap:anywhere] break-words whitespace-pre-wrap text-foreground"
      >
        <code>
          {command.split('\n').map((line, index) => (
            <span key={index} className="block pl-[2ch] -indent-[2ch]">
              <span aria-hidden className="text-brand-ink select-none">
                ${' '}
              </span>
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
