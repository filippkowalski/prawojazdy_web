import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/lib/types';
import { getCategories, getAllQuestions } from '@/lib/database';

interface Props {
  params: Promise<{ locale: string }>;
}

const locales: Locale[] = ['pl', 'en', 'uk', 'de'];

/**
 * Generate static params for all supported locales
 */
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

const translations = {
  pl: {
    title: 'Prawo Jazdy - Testy Teoretyczne',
    subtitle: 'Przygotuj się do egzaminu na prawo jazdy z naszą aplikacją',
    description: 'Ponad 3,000 aktualnych pytań egzaminacyjnych. Ucz się w dowolnym miejscu i czasie.',
    features: [
      { title: 'Pytania według kategorii', description: '14+ kategorii tematycznych' },
      { title: 'Egzamin teoretyczny', description: 'Symulacja prawdziwego egzaminu' },
      { title: 'Tryb przetrwania', description: 'Odpowiadaj dopóki nie popełnisz błędu' },
      { title: 'Statystyki', description: 'Śledź swój postęp' },
    ],
    downloadApp: 'Pobierz aplikację mobilną',
    browseQuestions: 'Przeglądaj pytania',
    questionsAvailable: 'pytań dostępnych',
    categoriesAvailable: 'kategorii tematycznych',
  },
  en: {
    title: 'Polish Driving License Tests',
    subtitle: 'Prepare for your driving theory exam with our app',
    description: 'Over 3,000 current exam questions. Learn anywhere, anytime.',
    features: [
      { title: 'Questions by category', description: '14+ thematic categories' },
      { title: 'Theory exam', description: 'Official exam simulation' },
      { title: 'Survival mode', description: 'Answer until you make a mistake' },
      { title: 'Statistics', description: 'Track your progress' },
    ],
    downloadApp: 'Download mobile app',
    browseQuestions: 'Browse questions',
    questionsAvailable: 'questions available',
    categoriesAvailable: 'thematic categories',
  },
  uk: {
    title: 'Польські водійські права - Тести',
    subtitle: 'Підготуйтеся до теоретичного іспиту з нашим додатком',
    description: 'Понад 3,000 актуальних екзаменаційних питань. Навчайтеся будь-де та будь-коли.',
    features: [
      { title: 'Питання за категоріями', description: '14+ тематичних категорій' },
      { title: 'Теоретичний іспит', description: 'Симуляція справжнього іспиту' },
      { title: 'Режим виживання', description: 'Відповідайте, поки не зробите помилку' },
      { title: 'Статистика', description: 'Відстежуйте свій прогрес' },
    ],
    downloadApp: 'Завантажити мобільний додаток',
    browseQuestions: 'Переглянути питання',
    questionsAvailable: 'доступних питань',
    categoriesAvailable: 'тематичних категорій',
  },
  de: {
    title: 'Polnischer Führerschein - Theorietests',
    subtitle: 'Bereiten Sie sich mit unserer App auf die Theorieprüfung vor',
    description: 'Über 3.000 aktuelle Prüfungsfragen. Lernen Sie überall und jederzeit.',
    features: [
      { title: 'Fragen nach Kategorie', description: '14+ thematische Kategorien' },
      { title: 'Theorieprüfung', description: 'Offizielle Prüfungssimulation' },
      { title: 'Überlebensmodus', description: 'Antworten Sie, bis Sie einen Fehler machen' },
      { title: 'Statistiken', description: 'Verfolgen Sie Ihren Fortschritt' },
    ],
    downloadApp: 'Mobile App herunterladen',
    browseQuestions: 'Fragen durchsuchen',
    questionsAvailable: 'verfügbare Fragen',
    categoriesAvailable: 'thematische Kategorien',
  },
};

const localeNames = {
  pl: 'Polski',
  en: 'English',
  uk: 'Українська',
  de: 'Deutsch',
};

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  const t = translations[locale as Locale] || translations.pl;

  // Get question and category counts
  const [categories, questions] = await Promise.all([
    getCategories(locale as Locale),
    getAllQuestions(locale as Locale),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      {/* Language Selector */}
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-end gap-2">
            {(['pl', 'en', 'uk', 'de'] as Locale[]).map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  loc === locale
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
                }`}
              >
                {localeNames[loc]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            {t.title}
          </h1>
          <p className="text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 mb-8">
            {t.subtitle}
          </p>
          <p className="text-lg text-zinc-500 dark:text-zinc-500 mb-12">
            {t.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href={`/${locale}/questions`}
              className="px-8 py-4 bg-zinc-900 text-white rounded-lg font-semibold hover:bg-zinc-800 transition-colors dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
            >
              {t.browseQuestions}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {questions.length.toLocaleString()}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                {t.questionsAvailable}
              </div>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {categories.length}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                {t.categoriesAvailable}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="container mx-auto px-4 py-16 lg:py-24 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            {t.downloadApp}
          </h2>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://apps.apple.com/us/app/polish-driving-license-tests/id6469685187"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-105"
              style={{ height: '80px', display: 'flex', alignItems: 'center' }}
            >
              <Image
                src="/badges/app-store-badge.svg"
                alt="Download on the App Store"
                width={240}
                height={80}
                className="h-[54px] w-auto"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.ski.prawojazdy.prawojazdy"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-105"
              style={{ height: '80px', display: 'flex', alignItems: 'center' }}
            >
              <Image
                src="/badges/google-play-badge.png"
                alt="Get it on Google Play"
                width={240}
                height={80}
                className="h-[80px] w-auto"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-zinc-600 dark:text-zinc-400 text-sm">
            © {new Date().getFullYear()} Prawo Jazdy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
