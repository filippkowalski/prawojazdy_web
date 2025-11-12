import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/types';
import { getCategories, getCategory, getQuestionsByCategory } from '@/lib/database';
import { generateQuestionSlug, generateCategorySlug, extractIdFromSlug } from '@/lib/slugify';
import { Metadata } from 'next';
import { QuestionMediaThumbnail } from '@/components/question-media-thumbnail';
import { CategoryQuestionsClient } from '@/components/category-questions-client';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const locales: Locale[] = ['pl', 'en', 'uk', 'de'];

const translations = {
  pl: {
    backToQuestions: 'Powrót do wszystkich pytań',
    questionsInCategory: 'pytań w tej kategorii',
    points: 'pkt',
  },
  en: {
    backToQuestions: 'Back to all questions',
    questionsInCategory: 'questions in this category',
    points: 'pts',
  },
  uk: {
    backToQuestions: 'Повернутися до всіх питань',
    questionsInCategory: 'питань у цій категорії',
    points: 'балів',
  },
  de: {
    backToQuestions: 'Zurück zu allen Fragen',
    questionsInCategory: 'Fragen in dieser Kategorie',
    points: 'Pkt',
  },
};

/**
 * Generate static params for all categories in all locales
 */
export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    const categories = await getCategories(locale);

    for (const category of categories) {
      params.push({
        locale,
        slug: generateCategorySlug(category.id, category.name),
      });
    }
  }

  console.log(`Generating ${params.length} category pages...`);
  return params;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const categoryId = extractIdFromSlug(slug);
  const category = await getCategory(locale as Locale, categoryId);

  if (!category) {
    return { title: 'Category not found' };
  }

  const questions = await getQuestionsByCategory(locale as Locale, categoryId);

  const metaTranslations = {
    pl: {
      titleSuffix: 'pytań | Egzamin na prawo jazdy',
      descriptionTemplate: (count: number, name: string) =>
        `Ćwicz ${count} pytań egzaminacyjnych w kategorii ${name}. Przygotuj się do egzaminu na prawo jazdy 2025.`,
      ogTitle: 'Pytania egzaminacyjne',
      ogDescription: (count: number) =>
        `${count} pytań, które pomogą Ci przygotować się do egzaminu na prawo jazdy`,
    },
    en: {
      titleSuffix: 'Questions | Driving License Test',
      descriptionTemplate: (count: number, name: string) =>
        `Practice ${count} driving theory questions in the ${name} category. Prepare for your driving license exam 2025.`,
      ogTitle: 'Driving Theory Questions',
      ogDescription: (count: number) =>
        `${count} questions to help you prepare for your driving exam`,
    },
    uk: {
      titleSuffix: 'питань | Екзамен на водійські права',
      descriptionTemplate: (count: number, name: string) =>
        `Практикуйте ${count} екзаменаційних питань у категорії ${name}. Підготуйтеся до іспиту на водійські права 2025.`,
      ogTitle: 'Екзаменаційні питання',
      ogDescription: (count: number) =>
        `${count} питань, які допоможуть вам підготуватися до екзамену на водійські права`,
    },
    de: {
      titleSuffix: 'Fragen | Führerscheinprüfung',
      descriptionTemplate: (count: number, name: string) =>
        `Üben Sie ${count} Theoriefragen in der Kategorie ${name}. Bereiten Sie sich auf die Führerscheinprüfung 2025 vor.`,
      ogTitle: 'Theorie-Prüfungsfragen',
      ogDescription: (count: number) =>
        `${count} Fragen, die Ihnen bei der Vorbereitung auf Ihre Fahrprüfung helfen`,
    },
  };

  const meta = metaTranslations[locale as Locale] || metaTranslations.pl;

  return {
    title: `${category.name} - ${questions.length} ${meta.titleSuffix}`,
    description: meta.descriptionTemplate(questions.length, category.name),
    openGraph: {
      title: `${category.name} - ${meta.ogTitle}`,
      description: meta.ogDescription(questions.length),
      type: 'website',
      locale: locale,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = translations[locale as Locale] || translations.pl;

  // Extract category ID from slug
  const categoryId = extractIdFromSlug(slug);

  // Get the category and ALL its questions (no filtering here)
  const [category, allQuestions] = await Promise.all([
    getCategory(locale as Locale, categoryId),
    getQuestionsByCategory(locale as Locale, categoryId),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <CategoryQuestionsClient
      locale={locale as Locale}
      category={category}
      questions={allQuestions}
      translations={t}
    />
  );
}
