import { cn } from '@/lib/utils';

/**
 * A square-ish stage that shows something on the dark ground or the light
 * one, whichever theme the visitor is in. The light panel re-scopes the
 * tokens with `.light`. The dark panel uses the roast and cream primitives
 * directly, because `.light` on `<html>` would otherwise turn its semantic
 * tokens light too.
 */
export function ThemePanel({
  theme,
  label,
  className,
  children,
}: {
  theme: 'dark' | 'light';
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={cn(
        'flex min-h-[280px] flex-col justify-between gap-8 rounded-2xl border p-5 md:p-6',
        theme === 'light'
          ? 'light border-foreground/12 bg-background text-foreground'
          : 'border-foreground/12 bg-(--roast) text-(--cream)',
        className,
      )}
    >
      <figcaption className="label-mono opacity-70">{label}</figcaption>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {children}
      </div>
    </figure>
  );
}
