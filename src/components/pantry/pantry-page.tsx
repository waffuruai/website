import { CommandBlock } from '@/components/pantry/command-block';
import { PantryFlow } from '@/components/pantry/pantry-flow';
import { LocalizedLink } from '@/components/localized-link';
import { ProductSection } from '@/components/products/product-section';
import { JsonLd } from '@/components/seo/json-ld';
import { CtaCard } from '@/components/sections/cta-card';
import { Faq } from '@/components/sections/faq';
import { MonoLabel } from '@/components/sections/mono-label';
import { PageHero } from '@/components/sections/page-hero';
import { SectionHeading } from '@/components/sections/section-heading';
import { pantryFacts } from '@/content/pages/pantry/facts';
import { pantry } from '@/content/pages/pantry/pantry';
import { pantrySources } from '@/content/pages/pantry/types';
import { mailto, site } from '@/content/site';
import type { Cta } from '@/content/types';
import { localizePath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { localize } from '@/lib/content';
import { breadcrumbs, softwareApplication } from '@/lib/json-ld';
import { isPublishedPath } from '@/lib/launch';
import { cn } from '@/lib/utils';

/** The links that sit under a section or card: mono caps, gold arrow. */
function ArrowLink({ href, children }: { href: string; children: string }) {
  return (
    <LocalizedLink
      href={href}
      className="inline-flex min-h-11 items-center gap-2 label-mono text-[12px] text-brand-ink hover:text-foreground"
    >
      {children}
      <span aria-hidden>→</span>
    </LocalizedLink>
  );
}

/** Raised cards with a serif title and a short body. */
function CardGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={cn(
        'mt-12 grid gap-4 sm:grid-cols-2 md:mt-16',
        columns === 3 && 'lg:grid-cols-3',
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-card p-6 md:p-8"
        >
          <h3 className="font-serif text-[26px] leading-[1.1] tracking-[-0.01em]">
            {item.title}
          </h3>
          <p className="text-[15px] leading-[1.6] text-muted-foreground">
            {item.body}
          </p>
        </li>
      ))}
    </ul>
  );
}

/**
 * /products/pantry: our free, open-source vulnerability scanner. Hero with
 * the install call to action, the Install → Scan → Cache → Fix sequence,
 * three ways to install (each verifies the release), what it checks, why it
 * can be trusted, who uses it, the FAQ and the closing card. Commands and
 * transcripts come from `facts.ts`; copy from `pantry.ts`.
 */
export function PantryPage({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const copy = localize(pantry, locale);
  const { nav } = dictionary;
  const facts = pantryFacts;
  const path = localizePath(facts.path, locale);

  const actions: Cta[] = [
    { label: copy.hero.primary, href: '#install' },
    { label: copy.hero.secondary, href: facts.post, variant: 'outline' },
  ];

  return (
    <>
      <PageHero
        label={copy.hero.label}
        title={copy.hero.title}
        lede={copy.hero.lede}
        actions={actions}
        className="pb-12 md:pb-16"
      >
        <div className="wf-rise flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <ArrowLink href={facts.repo}>{copy.hero.source}</ArrowLink>
          <p className="text-[15px] text-muted-foreground">
            {copy.hero.windows}{' '}
            <a
              href={mailto('Pantry on Windows')}
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              {copy.hero.windowsLink}
            </a>
          </p>
        </div>
      </PageHero>

      <ProductSection id="how-it-works">
        <SectionHeading
          id="how-it-works"
          title={copy.how.title}
          intro={copy.how.intro}
        />
        <PantryFlow copy={copy.how} transcripts={facts.transcripts} />
      </ProductSection>

      <ProductSection id="install" className="scroll-mt-24">
        <SectionHeading
          id="install"
          title={copy.install.title}
          intro={copy.install.intro}
        />
        <ol className="mt-12 flex flex-col gap-4 md:mt-16">
          {copy.install.methods.map((method, index) => {
            const link = {
              mise: facts.packslip,
              script: `${facts.releases}/latest/download/install.sh`,
              verify: facts.installGuide,
            }[method.id];
            return (
              <li
                key={method.id}
                className={cn(
                  'grid min-w-0 gap-6 rounded-2xl border bg-card p-6 md:p-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-10',
                  index === 0 ? 'border-brand/50' : 'border-foreground/10',
                )}
              >
                <div className="flex flex-col gap-3">
                  <MonoLabel dot={index === 0} className="text-[11px]">
                    {method.label}
                  </MonoLabel>
                  <h3 className="font-serif text-[28px] leading-[1.05]">
                    {method.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-muted-foreground">
                    {method.body}
                  </p>
                  {link && method.link && (
                    <ArrowLink href={link}>{method.link}</ArrowLink>
                  )}
                </div>
                <CommandBlock
                  label={method.title}
                  command={facts.install[method.id]}
                  className="min-w-0 self-center"
                />
              </li>
            );
          })}
        </ol>
        <div className="mt-10 flex max-w-[640px] flex-col gap-4">
          <p className="text-[15px] text-soft">{copy.install.then}</p>
          <CommandBlock label={facts.command} command={facts.firstRun} />
        </div>
      </ProductSection>

      <ProductSection id="checks">
        <SectionHeading
          id="checks"
          title={copy.checks.title}
          intro={copy.checks.intro}
        />
        <CardGrid items={copy.checks.items} />
      </ProductSection>

      <ProductSection id="sources">
        <SectionHeading
          id="sources"
          title={copy.sources.title}
          intro={copy.sources.intro}
        />
        <ul className="mt-12 grid gap-x-12 gap-y-px border-y border-foreground/10 md:mt-16 md:grid-cols-2">
          {pantrySources.map((source) => (
            <li
              key={source}
              className="flex flex-col gap-2 border-b border-foreground/10 py-6 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
            >
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                {facts.sources[source].map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-serif text-[24px] leading-tight text-foreground underline decoration-foreground/25 underline-offset-4 hover:decoration-brand"
                  >
                    {link.label}
                    <span aria-hidden className="text-[15px] text-brand-ink">
                      ↗
                    </span>
                  </a>
                ))}
              </p>
              <p className="text-[15px] leading-[1.6] text-muted-foreground">
                {copy.sources.items[source]}
              </p>
            </li>
          ))}
        </ul>
      </ProductSection>

      <ProductSection id="trust">
        <SectionHeading
          id="trust"
          title={copy.trust.title}
          intro={copy.trust.intro}
        />
        <CardGrid items={copy.trust.items} />
      </ProductSection>

      <ProductSection id="uses">
        <SectionHeading
          id="uses"
          title={copy.uses.title}
          intro={copy.uses.intro}
        />
        <ul className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-3">
          {copy.uses.items.map((item, index) => (
            <li
              key={item.title}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-foreground/10 bg-card p-6 md:p-8"
            >
              <h3 className="font-serif text-[28px] leading-[1.05]">
                {item.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-muted-foreground">
                {item.body}
              </p>
              <CommandBlock
                label={item.title}
                command={facts.uses[index]}
                className="mt-auto"
              />
            </li>
          ))}
        </ul>
      </ProductSection>

      <Faq heading={dictionary.common.faqHeading} items={copy.faq} />

      <CtaCard
        title={copy.cta.title}
        body={copy.cta.body}
        actions={[
          { label: copy.hero.primary, href: '#install' },
          { label: copy.hero.source, href: facts.repo, variant: 'outline' },
        ]}
      >
        <ArrowLink href={facts.post}>{copy.hero.secondary}</ArrowLink>
      </CtaCard>

      <JsonLd
        data={[
          {
            ...softwareApplication({
              name: facts.name,
              description: copy.seo.description,
              path,
              category: 'SecurityApplication',
              operatingSystem: facts.platforms.join(', '),
            }),
            isAccessibleForFree: true,
            license: `https://spdx.org/licenses/${facts.license}.html`,
            codeRepository: facts.repo,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          breadcrumbs([
            { name: site.name, path: localizePath('/', locale) },
            ...(isPublishedPath('/products')
              ? [
                  {
                    name: nav.products,
                    path: localizePath('/products', locale),
                  },
                ]
              : []),
            { name: facts.name, path },
          ]),
        ]}
      />
    </>
  );
}
