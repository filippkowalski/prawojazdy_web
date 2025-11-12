'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, BookOpen, Target, Trophy } from 'lucide-react';
import {
  detectPlatform,
  getAppStoreUrl,
  isBottomSheetDismissed,
  dismissBottomSheet,
  type Platform,
} from '@/lib/platform-detection';
import { Locale } from '@/lib/types';

const translations = {
  pl: {
    title: 'Pobierz Prawo Jazdy dla',
    description: 'Ćwicz testy na prawo jazdy z ponad 3000 pytań i przygotuj się do egzaminu',
    downloadButton: 'Pobierz aplikację',
    features: {
      learn: 'Ucz się',
      practice: 'Ćwicz',
      pass: 'Zdaj',
    },
    footer: 'Ponad 3000 pytań • Wsparcie wielu języków',
  },
  en: {
    title: 'Get Prawo Jazdy for',
    description: 'Practice driving theory tests with 3,000+ questions and prepare for your exam',
    downloadButton: 'Download App',
    features: {
      learn: 'Learn',
      practice: 'Practice',
      pass: 'Pass',
    },
    footer: '3,000+ questions • Multi-language support',
  },
  uk: {
    title: 'Завантажити Prawo Jazdy для',
    description: 'Практикуйте тести теорії водіння з понад 3000 питань і готуйтесь до іспиту',
    downloadButton: 'Завантажити додаток',
    features: {
      learn: 'Вчитися',
      practice: 'Практикувати',
      pass: 'Скласти',
    },
    footer: 'Понад 3000 питань • Підтримка багатьох мов',
  },
  de: {
    title: 'Prawo Jazdy herunterladen für',
    description: 'Übe Führerscheintheorie-Tests mit über 3000 Fragen und bereite dich auf deine Prüfung vor',
    downloadButton: 'App herunterladen',
    features: {
      learn: 'Lernen',
      practice: 'Üben',
      pass: 'Bestehen',
    },
    footer: 'Über 3000 Fragen • Mehrsprachige Unterstützung',
  },
};

export function AppDownloadBottomSheet() {
  const pathname = usePathname();
  const [platform, setPlatform] = useState<Platform>('other');
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Extract locale from pathname (e.g., /en/questions -> 'en')
  const locale = (pathname?.split('/')[1] as Locale) || 'pl';
  const t = translations[locale] || translations.pl;

  useEffect(() => {
    const info = detectPlatform();
    setPlatform(info.platform);

    const isDismissed = isBottomSheetDismissed();

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('[AppDownloadBottomSheet] Init:', {
        platform: info.platform,
        browser: info.browser,
        shouldShowBanner: info.shouldShowBanner,
        isBottomSheetDismissed: isDismissed,
        willShow: info.shouldShowBanner && !isDismissed,
      });
    }

    // Show bottom sheet if platform requires it and hasn't been dismissed
    if (info.shouldShowBanner && !isDismissed) {
      // Delay showing the bottom sheet slightly for better UX
      const timer = setTimeout(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[AppDownloadBottomSheet] Showing bottom sheet');
        }
        setIsVisible(true);
        // Trigger animation after mount
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, 1500); // Show after 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    dismissBottomSheet();
    setIsAnimating(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleGetApp = () => {
    const url = getAppStoreUrl(platform, 'bottomsheet');
    window.location.href = url;
    dismissBottomSheet();
  };

  if (!isVisible) {
    return null;
  }

  const platformName = platform === 'android' ? 'Android' : 'iOS';

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleDismiss}
      />

      {/* Bottom sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[101] bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
        </div>

        <div className="px-6 pb-8 pt-4">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 p-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center text-center">
            {/* App Icon */}
            <img
              src="/app-icon-192.png"
              alt="Polish Driving License Tests"
              className="w-20 h-20 rounded-2xl shadow-lg mb-4"
            />

            {/* Title */}
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {t.title} {platformName}
            </h3>

            {/* Description */}
            <p className="text-zinc-600 dark:text-zinc-400 text-base mb-6 max-w-sm">
              {t.description}
            </p>

            {/* Features */}
            <div className="flex items-center justify-center gap-6 mb-6 text-sm">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{t.features.learn}</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{t.features.practice}</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{t.features.pass}</span>
              </div>
            </div>

            {/* Download button */}
            <button
              onClick={handleGetApp}
              className="w-full max-w-sm px-6 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-lg font-semibold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-lg"
            >
              {t.downloadButton}
            </button>

            {/* Footer note */}
            <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-4">
              {t.footer}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
