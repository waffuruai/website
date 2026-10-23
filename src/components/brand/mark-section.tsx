import { BrandSection } from '@/components/brand/brand-section';
import { ThemePanel } from '@/components/brand/theme-panel';
import { Picture } from '@/components/picture';
import type { BrandContent } from '@/content/pages/brand';

/**
 * The waffle mark on dark and on light, with its downloads. The files are
 * static assets, so the links are plain anchors with `download` (a localized
 * link would prefix them with the locale).
 */
export function MarkSection({ content }: { content: BrandContent['mark'] }) {
  return (
    <BrandSection id="mark" title={content.title} intro={content.intro}>
      <div className="grid gap-5 md:grid-cols-2">
        {(['dark', 'light'] as const).map((theme) => (
          <ThemePanel
            key={theme}
            theme={theme}
            label={theme === 'dark' ? content.darkLabel : content.lightLabel}
          >
            <Picture
              name="brand/waffle"
              sizes="(min-width: 768px) 192px, 160px"
              // One description is enough; the second panel repeats the picture.
              alt={theme === 'dark' ? content.alt : ''}
              imgClassName="size-40 md:size-48"
            />
          </ThemePanel>
        ))}
      </div>

      <h3 className="label-mono text-soft mt-12">{content.downloadsLabel}</h3>
      <ul
        role="list"
        className="border-foreground/12 divide-foreground/12 mt-4 divide-y border-y"
      >
        {content.downloads.map((file) => (
          <li
            key={file.href}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[17px] font-medium">{file.label}</span>
              <span className="text-muted-foreground font-mono text-[13px]">
                {file.detail}
              </span>
            </div>
            <a
              href={file.href}
              download={file.filename}
              aria-label={`${content.downloadAction} ${file.label}`}
              className="label-mono text-foreground hover:text-brand-ink focus-visible:outline-ring inline-flex min-h-11 items-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {content.downloadAction}
              <span aria-hidden className="ml-1.5">
                ↓
              </span>
            </a>
          </li>
        ))}
      </ul>
    </BrandSection>
  );
}
