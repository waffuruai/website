import { BrandSection } from '@/components/brand/brand-section';
import { ThemePanel } from '@/components/brand/theme-panel';
import { Picture } from '@/components/picture';
import type { BrandContent } from '@/content/pages/brand';
import { site } from '@/content/site';

/** The lockup as in the header: mark, serif lowercase wordmark, katakana. */
function Lockup() {
  return (
    <>
      <Picture
        name="brand/waffle"
        sizes="(min-width: 768px) 96px, 56px"
        alt=""
        imgClassName="size-14 md:size-24"
      />
      <span className="font-serif text-[clamp(48px,8vw,88px)] leading-none tracking-[-0.01em] lowercase">
        waffuru
      </span>
      <span
        lang="ja"
        className="text-[clamp(14px,1.6vw,20px)] tracking-[0.1em] opacity-70"
      >
        {site.kana}
      </span>
    </>
  );
}

/**
 * The wordmark specimen on dark and on light, and the naming rules: how
 * Waffuru, the four products and the katakana are written.
 */
export function WordmarkSection({
  content,
}: {
  content: BrandContent['wordmark'];
}) {
  return (
    <BrandSection id="wordmark" title={content.title} intro={content.intro}>
      <div className="grid gap-5 md:grid-cols-2">
        <ThemePanel theme="dark" label={content.darkLabel}>
          <Lockup />
        </ThemePanel>
        <ThemePanel theme="light" label={content.lightLabel}>
          <Lockup />
        </ThemePanel>
      </div>

      <h3 className="label-mono text-soft mt-12">{content.namingLabel}</h3>
      <dl className="border-foreground/12 divide-foreground/12 mt-4 divide-y border-y">
        {content.rules.map((rule) => (
          <div
            key={rule.term}
            className="grid gap-2 py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-10"
          >
            <dt className="font-serif text-[clamp(26px,2.6vw,34px)] leading-[1.1]">
              {rule.term}
            </dt>
            <dd className="text-muted-foreground text-base leading-[1.6] text-pretty">
              {rule.body}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-soft mt-8 max-w-[640px] text-lg leading-[1.6] text-pretty">
        {content.origin}
      </p>
    </BrandSection>
  );
}
