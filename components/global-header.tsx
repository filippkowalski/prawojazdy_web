'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale } from '@/lib/types';
import { LicenseCategorySelector } from './license-category-selector';
import { Languages, Library, Smartphone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface GlobalHeaderProps {
  locale: Locale;
}

const localeNames = {
  pl: 'Polski',
  en: 'English',
  uk: 'Українська',
  de: 'Deutsch',
};

const navigationLabels = {
  categories: {
    pl: 'Kategorie',
    en: 'Categories',
    uk: 'Категорії',
    de: 'Kategorien',
  },
  downloadApp: {
    pl: 'Pobierz aplikację',
    en: 'Download App',
    uk: 'Завантажити додаток',
    de: 'App herunterladen',
  },
};

export function GlobalHeader({ locale }: GlobalHeaderProps) {
  const pathname = usePathname();
  const otherLocales = (['pl', 'en', 'uk', 'de'] as Locale[]).filter(l => l !== locale);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Check if we're on a questions page (including categories)
  const isQuestionsPage = pathname?.includes('/questions') || pathname?.includes('/categories');

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLangOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo/Brand */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            <span className="text-2xl">🚗</span>
            <span className="hidden sm:inline">
              {locale === 'pl' ? 'Prawo Jazdy' : locale === 'de' ? 'Führerschein' : locale === 'uk' ? 'Водійські права' : 'Driving License'}
            </span>
          </Link>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Navigation Links - Hide when on questions page */}
            {!isQuestionsPage && (
              <Link
                href={`/${locale}/questions`}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Library className="h-4 w-4" />
                <span className="hidden md:inline">{navigationLabels.categories[locale]}</span>
              </Link>
            )}

            {/* Download App Link */}
            <a
              href="https://play.google.com/store/apps/details?id=com.ski.prawojazdy.prawojazdy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Smartphone className="h-4 w-4" />
              <span className="hidden md:inline">{navigationLabels.downloadApp[locale]}</span>
            </a>

            {/* Separator */}
            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700 mx-1"></div>

            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Languages className="h-4 w-4" />
                <span className="hidden sm:inline">{localeNames[locale]}</span>
              </button>

              {/* Language dropdown */}
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50">
                  {otherLocales.map((l) => (
                    <Link
                      key={l}
                      href={`/${l}/questions`}
                      className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 first:rounded-t-lg last:rounded-b-lg transition-colors"
                      onClick={() => setIsLangOpen(false)}
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* License Category Selector - Only show on questions pages */}
            {isQuestionsPage && <LicenseCategorySelector locale={locale} />}
          </div>
        </div>
      </div>
    </header>
  );
}
