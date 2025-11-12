import { Locale } from '@/lib/types';
import { notFound } from 'next/navigation';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';

const locales: Locale[] = ['pl', 'en', 'uk', 'de'];

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <GlobalFooter locale={locale as Locale} />
    </div>
  );
}
