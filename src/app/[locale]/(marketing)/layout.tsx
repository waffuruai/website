import { Footer } from '@/components/marketing/footer';
import { Navbar } from '@/components/marketing/navbar';
import { getDictionary, resolveLocale, type LocaleParams } from '@/i18n/server';

/** Marketing chrome: sticky navbar, page content, footer. */
export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const dictionary = await getDictionary(await resolveLocale(params));

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer dictionary={dictionary} />
    </div>
  );
}
