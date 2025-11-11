import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/types';
import { getCategories, getCategory, getQuestionsByCategory } from '@/lib/database';
import { generateQuestionSlug, generateCategorySlug, extractIdFromSlug } from '@/lib/slugify';
import { Metadata } from 'next';

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

  return {
    title: `${category.name} - ${questions.length} Questions | Polish Driving License Test`,
    description: `Practice ${questions.length} driving theory questions in the ${category.name} category. Prepare for your Polish driving license exam.`,
    openGraph: {
      title: `${category.name} - Driving Theory Questions`,
      description: `${questions.length} questions to help you prepare for your driving exam`,
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

  // Get the category and its questions
  const [category, questions] = await Promise.all([
    getCategory(locale as Locale, categoryId),
    getQuestionsByCategory(locale as Locale, categoryId),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <Link
            href={`/${locale}/questions`}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-2 inline-block"
          >
            ← {t.backToQuestions}
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            {category.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {questions.length} {t.questionsInCategory}
          </p>
        </div>
      </div>

      {/* Questions List */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-3">
          {questions.map((question) => (
            <Link
              key={question.id}
              href={`/${locale}/questions/${generateQuestionSlug(question.id, question.question)}`}
              className="block p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Points Badge */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black flex items-center justify-center font-bold">
                  {question.points}
                </div>

                {/* Question Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {question.question}
                  </p>

                  {question.description && (
                    <div
                      className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2 [&_a]:text-blue-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: question.description }}
                    />
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2">
                    {question.license_categories && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-xs rounded">
                        {question.license_categories}
                      </span>
                    )}
                    {question.official_number && (
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded">
                        #{question.official_number}
                      </span>
                    )}
                  </div>

                  {/* Correct Answer Preview */}
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-500">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="font-semibold text-green-700 dark:text-green-400">
                        {['A', 'B', 'C'][question.correct_answer]}:
                      </span>{' '}
                      {question.answers[question.correct_answer]?.answer}
                    </p>
                  </div>
                </div>

                {/* Media Indicator */}
                {question.media && (
                  <div className="flex-shrink-0 w-20 h-20 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                    📷
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
