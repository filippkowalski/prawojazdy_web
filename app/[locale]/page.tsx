'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/types';
import { BookOpen, Trophy, Target, CheckCircle2 } from 'lucide-react';
import { use } from 'react';

interface Props {
  params: Promise<{ locale: string }>;
}

const locales: Locale[] = ['pl', 'en', 'uk', 'de'];

// Background images for animated showcase
const drivingImages = [
  "/landing/road_signs_bg.png",
  "/landing/categories_bg.png",
  "/landing/exam_bg.png",
  "/landing/before_exam_bg.png",
  "/landing/road_rules_bg.png",
  "/landing/saved_bg.png",
  "/landing/survival_bg.png",
  "/landing/wrong_bg.png",
  "/landing/random_bg.png",
];

const translations = {
  pl: {
    badge: 'Oficjalne pytania 2025',
    title: 'Zdaj na prawo jazdy',
    subtitle: 'za pierwszym razem',
    description: 'Przygotuj się do egzaminu na prawo jazdy z ponad 3,000 oficjalnych pytań. Ucz się w dowolnym miejscu i czasie.',
    cta: 'Przeglądaj pytania',
    downloadApp: 'Pobierz aplikację',
    or: 'lub',
    features: {
      learn: 'Ucz się',
      learnDesc: '3,392 oficjalnych pytań',
      practice: 'Ćwicz',
      practiceDesc: 'Symulacje egzaminu',
      pass: 'Zdaj',
      passDesc: 'Śledź postęp',
    },
    stats: {
      questions: '3,392',
      questionsLabel: 'Oficjalnych pytań 2025',
      categories: '30+',
      categoriesLabel: 'Kategorii tematycznych',
      languages: '4',
      languagesLabel: 'Języków dostępnych',
    },
  },
  en: {
    badge: 'Official 2025 Questions',
    title: 'Pass your driving test',
    subtitle: 'on the first try',
    description: 'Prepare for your Polish driving license exam with 3,000+ official questions. Learn anywhere, anytime.',
    cta: 'Browse questions',
    downloadApp: 'Download App',
    or: 'or',
    features: {
      learn: 'Learn',
      learnDesc: '3,392 official questions',
      practice: 'Practice',
      practiceDesc: 'Exam simulations',
      pass: 'Pass',
      passDesc: 'Track progress',
    },
    stats: {
      questions: '3,392',
      questionsLabel: 'Official 2025 Questions',
      categories: '30+',
      categoriesLabel: 'Topic Categories',
      languages: '4',
      languagesLabel: 'Languages Available',
    },
  },
  uk: {
    badge: 'Офіційні питання 2025',
    title: 'Здай на права',
    subtitle: 'з першого разу',
    description: 'Підготуйся до іспиту на водійські права з понад 3,000 офіційних питань. Навчайся будь-де та будь-коли.',
    cta: 'Переглянути питання',
    downloadApp: 'Завантажити додаток',
    or: 'або',
    features: {
      learn: 'Вчитися',
      learnDesc: '3,392 офіційних питань',
      practice: 'Практикувати',
      practiceDesc: 'Симуляції іспиту',
      pass: 'Скласти',
      passDesc: 'Відстежувати прогрес',
    },
    stats: {
      questions: '3,392',
      questionsLabel: 'Офіційні питання 2025',
      categories: '30+',
      categoriesLabel: 'Тематичних категорій',
      languages: '4',
      languagesLabel: 'Доступних мов',
    },
  },
  de: {
    badge: 'Offizielle Fragen 2025',
    title: 'Bestehe deine Fahrprüfung',
    subtitle: 'beim ersten Versuch',
    description: 'Bereite dich auf die polnische Führerscheinprüfung mit über 3.000 offiziellen Fragen vor. Lerne überall und jederzeit.',
    cta: 'Fragen durchsuchen',
    downloadApp: 'App herunterladen',
    or: 'oder',
    features: {
      learn: 'Lernen',
      learnDesc: '3.392 offizielle Fragen',
      practice: 'Üben',
      practiceDesc: 'Prüfungssimulationen',
      pass: 'Bestehen',
      passDesc: 'Fortschritt verfolgen',
    },
    stats: {
      questions: '3.392',
      questionsLabel: 'Offizielle Fragen 2025',
      categories: '30+',
      categoriesLabel: 'Themenkategorien',
      languages: '4',
      languagesLabel: 'Verfügbare Sprachen',
    },
  },
};

const localeNames = {
  pl: 'Polski',
  en: 'English',
  uk: 'Українська',
  de: 'Deutsch',
};

export default function LocaleHomePage({ params }: Props) {
  const { locale } = use(params);
  const t = translations[locale as Locale] || translations.pl;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        {/* Animated grid background */}
        <div className="absolute inset-0 overflow-hidden opacity-60 dark:opacity-40">
          {/* Row 1 - Moving right */}
          <div className="flex gap-4 py-2 animate-scroll-right">
            {[...drivingImages.slice(0, 3), ...drivingImages.slice(0, 3), ...drivingImages.slice(0, 3)].map((img, i) => (
              <div
                key={`row1-${i}`}
                className="relative h-32 w-48 flex-shrink-0 rounded-xl overflow-hidden"
                style={{ transform: `rotate(${[2, -3, 1, -2, 3, -1, 2, -3, 1][i % 9]}deg)` }}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            ))}
          </div>

          {/* Row 2 - Moving left */}
          <div className="flex gap-4 py-2 animate-scroll-left">
            {[...drivingImages.slice(3, 6), ...drivingImages.slice(3, 6), ...drivingImages.slice(3, 6)].map((img, i) => (
              <div
                key={`row2-${i}`}
                className="relative h-32 w-48 flex-shrink-0 rounded-xl overflow-hidden"
                style={{ transform: `rotate(${[-2, 3, -1, 2, -3, 1, -2, 3, -1][i % 9]}deg)` }}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            ))}
          </div>

          {/* Row 3 - Moving right slow */}
          <div className="flex gap-4 py-2 animate-scroll-right-slow">
            {[...drivingImages.slice(6, 9), ...drivingImages.slice(0, 3), ...drivingImages.slice(6, 9)].map((img, i) => (
              <div
                key={`row3-${i}`}
                className="relative h-32 w-48 flex-shrink-0 rounded-xl overflow-hidden"
                style={{ transform: `rotate(${[3, -2, 2, -1, 3, -3, 1, -2, 2][i % 9]}deg)` }}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            ))}
          </div>

          {/* Row 4 - Moving left slow */}
          <div className="flex gap-4 py-2 animate-scroll-left-slow">
            {[...drivingImages.slice(2, 5), ...drivingImages.slice(2, 5), ...drivingImages.slice(2, 5)].map((img, i) => (
              <div
                key={`row4-${i}`}
                className="relative h-32 w-48 flex-shrink-0 rounded-xl overflow-hidden"
                style={{ transform: `rotate(${[-1, 2, -3, 3, -2, 1, -3, 2, -1][i % 9]}deg)` }}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white/90 dark:from-zinc-950/60 dark:via-zinc-950/70 dark:to-zinc-950/90" />

        {/* Language Selector - Above Content */}
        <div className="absolute top-0 right-0 z-20 p-4">
          <div className="flex gap-2">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  loc === locale
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black shadow-lg'
                    : 'bg-white/80 text-zinc-700 hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-900 backdrop-blur-sm'
                }`}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="container relative mx-auto flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center md:px-6 md:py-32">
          <div className="mx-auto max-w-4xl space-y-6 md:space-y-10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg rounded-3xl px-6 py-12 md:px-12 md:py-16 shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50">
            {/* Badge */}
            <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-zinc-900 dark:text-zinc-100">{t.badge}</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 md:space-y-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50">
                {t.title}{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">{t.subtitle}</span>
                  <span className="absolute -bottom-2 left-0 h-3 w-full -rotate-1 bg-yellow-400/40 dark:bg-yellow-500/30" />
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 px-4">
                {t.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 pt-2 md:pt-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="https://apps.apple.com/us/app/polish-driving-license-tests/id6469685187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Image
                    src="/badges/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={180}
                    height={60}
                    className="h-[54px] w-auto"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ski.prawojazdy.prawojazdy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-105"
                >
                  <Image
                    src="/badges/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={180}
                    height={60}
                    className="h-[70px] w-auto"
                  />
                </a>
              </div>

              {/* Divider */}
              <div className="relative w-full max-w-xs">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/95 dark:bg-zinc-900/95 px-3 text-zinc-500 dark:text-zinc-500">{t.or}</span>
                </div>
              </div>

              {/* Browse Questions Button */}
              <Link
                href={`/${locale}/questions`}
                className="px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-lg font-semibold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:scale-105 shadow-lg"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 md:gap-12">
            {/* Learn */}
            <div className="group space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 transition-all group-hover:scale-110 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{t.features.learn}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.features.learnDesc}
              </p>
            </div>

            {/* Practice */}
            <div className="group space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-900/20 transition-all group-hover:scale-110 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30">
                <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{t.features.practice}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.features.practiceDesc}
              </p>
            </div>

            {/* Pass */}
            <div className="group space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 dark:bg-green-900/20 transition-all group-hover:scale-110 group-hover:bg-green-100 dark:group-hover:bg-green-900/30">
                <Trophy className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{t.features.pass}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.features.passDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {/* Questions */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
            <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
              {t.stats.questions}
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 font-medium">
              {t.stats.questionsLabel}
            </div>
          </div>

          {/* Categories */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
            <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
              {t.stats.categories}
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 font-medium">
              {t.stats.categoriesLabel}
            </div>
          </div>

          {/* Languages */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
            <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
              {t.stats.languages}
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 font-medium">
              {t.stats.languagesLabel}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-zinc-600 dark:text-zinc-400 text-sm">
            © {new Date().getFullYear()} Prawo Jazdy. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
