import { Locale } from '@/lib/types';
import { notFound } from 'next/navigation';

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

  return children;
}
