import { BrandSection } from '@/components/brand/brand-section';
import { Accent } from '@/components/sections/accent';
import type { BrandContent, TypeFace } from '@/content/pages/brand';
import { cn } from '@/lib/utils';

/** Each face sets its own name and sample, so the specimen is live. */
const FACE_STYLES: Record<TypeFace['key'], { name: string; sample: string }> = {
  serif: {
    name: 'font-serif text-[clamp(34px,3.4vw,44px)] leading-none',
    sample:
      'font-serif text-[clamp(40px,6vw,88px)] leading-[0.98] tracking-[-0.02em] text-balance',
  },
  sans: {
    name: 'font-sans text-[clamp(26px,2.6vw,34px)] leading-none font-medium',
    sample: 'font-sans text-[clamp(20px,2.4vw,30px)] leading-[1.4] text-pretty',
  },
  mono: {
    name: 'font-mono text-[clamp(24px,2.4vw,32px)] leading-none',
    sample:
      'font-mono text-[clamp(14px,1.8vw,22px)] leading-[1.7] tracking-[0.08em] uppercase',
  },
};

/** The three typefaces as live specimens, with the licence note. */
export function TypeSection({ content }: { content: BrandContent['type'] }) {
  return (
    <BrandSection id="type" title={content.title} intro={content.intro}>
      <ul role="list" className="flex flex-col gap-5">
        {content.faces.map((face) => (
          <li
            key={face.key}
            className="border-foreground/12 bg-card flex flex-col gap-8 rounded-3xl border p-6 md:p-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <h3 className={cn(FACE_STYLES[face.key].name)}>{face.name}</h3>
              <p className="label-mono text-muted-foreground">{face.role}</p>
            </div>
            <p className={FACE_STYLES[face.key].sample}>
              <Accent text={face.sample} />
            </p>
            <div className="border-foreground/12 flex flex-col gap-4 border-t pt-6">
              <p
                aria-hidden
                className={cn(
                  'text-muted-foreground text-[15px] leading-[1.6] break-words',
                  face.key === 'serif' && 'font-serif text-[22px]',
                  face.key === 'sans' && 'font-sans',
                  face.key === 'mono' && 'font-mono text-[13px]',
                )}
              >
                {face.glyphs}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-1">
                <p className="text-soft text-[15px] leading-[1.55]">
                  {face.use}
                </p>
                <a
                  href={face.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono text-soft hover:text-foreground focus-visible:outline-ring inline-flex min-h-11 items-center rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {face.source.label}
                  <span aria-hidden className="ml-1.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-soft mt-8 max-w-[640px] text-base leading-[1.6]">
        {content.licence}{' '}
        <a
          href={content.licenceLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-brand-ink focus-visible:outline-ring inline-flex min-h-11 items-center rounded-sm underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {content.licenceLink.label}
          <span aria-hidden className="ml-1">
            ↗
          </span>
        </a>
      </p>
    </BrandSection>
  );
}
