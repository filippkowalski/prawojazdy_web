import Link from 'next/link';
import { Locale } from '@/lib/types';

interface GlobalFooterProps {
  locale: Locale;
}

const footerLabels = {
  pl: {
    termsOfService: 'Regulamin',
    privacyPolicy: 'Polityka prywatności',
    copyright: '© 2025 Prawo Jazdy. Wszelkie prawa zastrzeżone.',
  },
  en: {
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    copyright: '© 2025 Driving License. All rights reserved.',
  },
  uk: {
    termsOfService: 'Умови використання',
    privacyPolicy: 'Політика конфіденційності',
    copyright: '© 2025 Водійські права. Всі права захищені.',
  },
  de: {
    termsOfService: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    copyright: '© 2025 Führerschein. Alle Rechte vorbehalten.',
  },
};

export function GlobalFooter({ locale }: GlobalFooterProps) {
  const labels = footerLabels[locale];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Links */}
          <div className="flex items-center gap-4 text-sm">
            <Link
              href={`/${locale}/terms`}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {labels.termsOfService}
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <Link
              href={`/${locale}/privacy`}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {labels.privacyPolicy}
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            {labels.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
