import Link from 'next/link';
import { Locale } from '@/lib/types';
import { getCategories, getQuestionsByCategory } from '@/lib/database';
import { generateQuestionSlug, generateCategorySlug } from '@/lib/slugify';
import { fixHtmlLinks } from '@/lib/html-utils';

interface Props {
  params: Promise<{ locale: string }>;
}

const translations = {
  pl: {
    title: 'Wszystkie pytania',
    backToHome: 'Powrót do strony głównej',
    questions: 'pytań',
    viewAll: 'Zobacz wszystkie',
  },
  en: {
    title: 'All questions',
    backToHome: 'Back to home',
    questions: 'questions',
    viewAll: 'View all',
  },
  uk: {
    title: 'Всі питання',
    backToHome: 'Повернутися на головну',
    questions: 'питань',
    viewAll: 'Переглянути всі',
  },
  de: {
    title: 'Alle Fragen',
    backToHome: 'Zurück zur Startseite',
    questions: 'Fragen',
    viewAll: 'Alle anzeigen',
  },
};

export default async function QuestionsIndexPage({ params }: Props) {
  const { locale } = await params;
  const t = translations[locale as Locale] || translations.pl;

  // Get all categories with their questions
  const categories = await getCategories(locale as Locale);

  // Get question count for each category
  const categoriesWithQuestions = await Promise.all(
    categories.map(async (category) => {
      const questions = await getQuestionsByCategory(locale as Locale, category.id);
      return {
        category,
        questions: questions.slice(0, 5), // Show first 5 questions
        totalCount: questions.length,
      };
    })
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <Link
            href={`/${locale}`}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-2 inline-block"
          >
            ← {t.backToHome}
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t.title}
          </h1>
        </div>
      </div>

      {/* Categories and Questions */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {categoriesWithQuestions.map(({ category, questions, totalCount }) => (
            <div key={category.id} className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {category.name}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {totalCount} {t.questions}
                  </p>
                </div>
                <Link
                  href={`/${locale}/categories/${generateCategorySlug(category.id, category.name)}`}
                  className="px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  {t.viewAll} →
                </Link>
              </div>

              {/* Question List */}
              <div className="space-y-3">
                {questions.map((question) => (
                  <Link
                    key={question.id}
                    href={`/${locale}/questions/${generateQuestionSlug(question.id, question.question)}`}
                    className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {question.points}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-900 dark:text-zinc-50 font-medium line-clamp-2">
                          {question.question}
                        </p>
                        {question.description && (
                          <div
                            className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-1 [&_a]:text-blue-600 [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: fixHtmlLinks(question.description, locale as string) }}
                          />
                        )}
                      </div>
                      {question.media && (
                        <div className="flex-shrink-0 w-16 h-16 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs text-zinc-500">
                          Media
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Show More Link */}
              {totalCount > 5 && (
                <Link
                  href={`/${locale}/categories/${generateCategorySlug(category.id, category.name)}`}
                  className="block text-center mt-4 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  + {totalCount - 5} more {t.questions}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
