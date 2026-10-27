import type { StackFlowCopy } from '@/content/types';
import { cn } from '@/lib/utils';

import styles from './stack-flow.module.css';

/**
 * The stack as a working path, not a list: a request drops from you through
 * each layer to the hardware, the answer climbs back, and the outcomes light
 * when it arrives. Everything sits inside a dashed "your hardware" boundary;
 * the cloud waits outside with no line to it. CSS only, on a loop; reduced
 * motion shows the finished frame with every layer lit.
 */
export function StackFlow({
  copy,
  className,
}: {
  copy: StackFlowCopy;
  className?: string;
}) {
  const layers = copy.layers.length;
  return (
    <figure
      className={cn('flex flex-col gap-4', className)}
      style={{ '--layers': layers } as React.CSSProperties}
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
        <div className="relative rounded-3xl border border-dashed border-foreground/35 p-4 pt-9 md:p-6 md:pt-10">
          <p className="absolute top-3 left-4 label-mono text-[11px] text-muted-foreground md:left-6">
            {copy.boundary}
          </p>

          <div className="relative flex flex-col items-stretch">
            <div className="relative z-[1] w-fit rounded-full border border-foreground/20 bg-card px-5 py-2 text-[14px] font-medium text-foreground">
              {copy.you}
            </div>

            <div className="relative mt-3 pl-7">
              {/* The path the request and the answer travel. */}
              <span aria-hidden className={styles.rail} />
              <span aria-hidden className={styles.request} />
              <span aria-hidden className={styles.answer} />

              <ol className="relative flex flex-col gap-2">
                {copy.layers.map((layer, index) => (
                  <li
                    key={layer.role}
                    className={cn(
                      'relative grid grid-cols-[minmax(0,1fr)] items-center gap-1 rounded-2xl border border-foreground/10 bg-card px-4 py-3 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4 md:px-5',
                      styles.layer,
                    )}
                    style={{ '--i': index } as React.CSSProperties}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="font-serif text-[22px] leading-none text-foreground">
                        {layer.role}
                      </span>
                      {layer.name && (
                        <span className="label-mono text-[10px] text-brand-ink">
                          {layer.name}
                        </span>
                      )}
                    </span>
                    <span className="text-[14px] leading-snug text-muted-foreground">
                      {layer.line}
                    </span>
                  </li>
                ))}
                <li
                  className={cn(
                    'relative flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-background px-4 py-3',
                    styles.layer,
                  )}
                  style={{ '--i': layers } as React.CSSProperties}
                >
                  {copy.hardware.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-md border border-foreground/15 px-2.5 py-1 font-mono text-[12px] text-soft"
                    >
                      {chip}
                    </span>
                  ))}
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl border border-foreground/10 px-4 py-3 text-center">
            <span
              aria-hidden
              className="absolute top-1/2 -left-4 hidden h-px w-4 bg-foreground/20 lg:block"
            />
            <p className="text-[14px] text-soft line-through decoration-foreground/40">
              {copy.outside.title}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {copy.outside.note}
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {copy.outcomes.map((outcome, index) => (
              <li
                key={outcome}
                className={cn(
                  'flex items-center gap-2.5 rounded-full border border-foreground/10 px-4 py-2 text-[14px] text-foreground',
                  styles.outcome,
                )}
                style={{ '--i': index } as React.CSSProperties}
              >
                <span aria-hidden className="size-2 rounded-full bg-brand" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="sr-only">{copy.caption}</figcaption>
    </figure>
  );
}
