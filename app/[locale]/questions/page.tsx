import Link from 'next/link';
import { Metadata } from 'next';
import { Locale } from '@/lib/types';
import { generateQuestionSlug, generateCategorySlug } from '@/lib/slugify';
import { getCategories, getQuestionsByCategory } from '@/lib/database';
import { QuestionsClientView } from '@/components/questions-client-view';

interface Props {
  params: Promise<{ locale: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const metaData = {
    pl: {
      title: 'Wszystkie pytania egzaminacyjne na prawo jazdy 2025',
      description: 'Przeglądaj wszystkie oficjalne pytania egzaminacyjne na prawo jazdy 2025. Filtruj według kategorii (B, A, C, D, T, AM, PT) i ćwicz za darmo.',
    },
    en: {
      title: 'All Driving License Test Questions 2025',
      description: 'Browse all official driving license test questions for 2025. Filter by category (B, A, C, D, T, AM, PT) and practice for free.',
    },
    uk: {
      title: 'Всі екзаменаційні питання на водійські права 2025',
      description: 'Перегляньте всі офіційні екзаменаційні питання на водійські права 2025. Фільтруйте за категорією (B, A, C, D, T, AM, PT) та практикуйте безкоштовно.',
    },
    de: {
      title: 'Alle Führerschein-Prüfungsfragen 2025',
      description: 'Durchsuchen Sie alle offiziellen Führerschein-Prüfungsfragen für 2025. Filtern Sie nach Klasse (B, A, C, D, T, AM, PT) und üben Sie kostenlos.',
    },
  };

  const meta = metaData[locale as Locale] || metaData.pl;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: locale,
    },
  };
}

const translations = {
  pl: {
    title: 'Wszystkie pytania',
    backToHome: 'Powrót do strony głównej',
    questions: 'pytań',
    viewAll: 'Zobacz wszystkie',
    filterByLicense: 'Filtruj według kategorii prawa jazdy',
    allLicenses: 'Pokazuje pytania dla wszystkich kategorii',
    clearFilter: 'Wyczyść',
  },
  en: {
    title: 'All questions',
    backToHome: 'Back to home',
    questions: 'questions',
    viewAll: 'View all',
    filterByLicense: 'Filter by license category',
    allLicenses: 'Showing questions for all categories',
    clearFilter: 'Clear',
  },
  uk: {
    title: 'Всі питання',
    backToHome: 'Повернутися на головну',
    questions: 'питань',
    viewAll: 'Переглянути всі',
    filterByLicense: 'Фільтр за категорією прав',
    allLicenses: 'Показано питання для всіх категорій',
    clearFilter: 'Очистити',
  },
  de: {
    title: 'Alle Fragen',
    backToHome: 'Zurück zur Startseite',
    questions: 'Fragen',
    viewAll: 'Alle anzeigen',
    filterByLicense: 'Nach Führerscheinklasse filtern',
    allLicenses: 'Zeigt Fragen für alle Klassen',
    clearFilter: 'Löschen',
  },
};

// Server component - fetches ALL data and passes to client component for filtering
export default async function QuestionsIndexPage({ params }: Props) {
  const { locale } = await params;
  const t = translations[locale as Locale] || translations.pl;

  // Fetch ALL data server-side (no filtering here)
  const categories = await getCategories(locale as Locale);
  const categoriesWithQuestions = await Promise.all(
    categories.map(async (category) => {
      const questions = await getQuestionsByCategory(locale as Locale, category.id);

      return {
        category,
        questions,
        totalCount: questions.length,
      };
    })
  );

  return (
    <QuestionsClientView
      locale={locale as Locale}
      categoriesData={categoriesWithQuestions}
      translations={t}
    />
  );
}
