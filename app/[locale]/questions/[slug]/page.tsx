import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/types';
import { getAllQuestionsWithAnswers, getQuestionWithAnswers } from '@/lib/database';
import { generateQuestionSlug, extractIdFromSlug, generateCategorySlug } from '@/lib/slugify';
import { Metadata } from 'next';
import InteractiveQuestion from '@/components/InteractiveQuestion';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const locales: Locale[] = ['pl', 'en', 'uk', 'de'];

const translations = {
  pl: {
    backToQuestions: 'Powrót do pytań',
    backToCategory: 'Powrót do kategorii',
    correctAnswer: 'Poprawna odpowiedź',
    explanation: 'Wyjaśnienie',
    description: 'Opis',
    points: 'pkt',
    categories: 'Kategorie prawa jazdy',
    previousQuestion: 'Poprzednie pytanie',
    nextQuestion: 'Następne pytanie',
    officialNumber: 'Numer urzędowy',
    selectAnswer: 'Wybierz odpowiedź',
    correctFeedback: 'Poprawnie!',
    incorrectFeedback: 'Niepoprawnie',
  },
  en: {
    backToQuestions: 'Back to questions',
    backToCategory: 'Back to category',
    correctAnswer: 'Correct answer',
    explanation: 'Explanation',
    description: 'Description',
    points: 'pts',
    categories: 'License categories',
    previousQuestion: 'Previous question',
    nextQuestion: 'Next question',
    officialNumber: 'Official number',
    selectAnswer: 'Select answer',
    correctFeedback: 'Correct!',
    incorrectFeedback: 'Incorrect',
  },
  uk: {
    backToQuestions: 'Повернутися до питань',
    backToCategory: 'Повернутися до категорії',
    correctAnswer: 'Правильна відповідь',
    explanation: 'Пояснення',
    description: 'Опис',
    points: 'балів',
    categories: 'Категорії посвідчення',
    previousQuestion: 'Попереднє питання',
    nextQuestion: 'Наступне питання',
    officialNumber: 'Офіційний номер',
    selectAnswer: 'Виберіть відповідь',
    correctFeedback: 'Правильно!',
    incorrectFeedback: 'Неправильно',
  },
  de: {
    backToQuestions: 'Zurück zu Fragen',
    backToCategory: 'Zurück zur Kategorie',
    correctAnswer: 'Richtige Antwort',
    explanation: 'Erklärung',
    description: 'Beschreibung',
    points: 'Pkt',
    categories: 'Führerscheinklassen',
    previousQuestion: 'Vorherige Frage',
    nextQuestion: 'Nächste Frage',
    officialNumber: 'Offizielle Nummer',
    selectAnswer: 'Antwort wählen',
    correctFeedback: 'Richtig!',
    incorrectFeedback: 'Falsch',
  },
};

/**
 * Generate static params for all questions in all locales
 */
export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    const questions = await getAllQuestionsWithAnswers(locale);

    for (const question of questions) {
      params.push({
        locale,
        slug: generateQuestionSlug(question.id, question.question),
      });
    }
  }

  console.log(`Generating ${params.length} question pages...`);
  return params;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const questionId = extractIdFromSlug(slug);
  const question = await getQuestionWithAnswers(locale as Locale, questionId);

  if (!question) {
    return { title: 'Question not found' };
  }

  // Truncate question for meta description
  const shortQuestion = question.question.length > 160
    ? question.question.substring(0, 157) + '...'
    : question.question;

  const correctAnswerText = question.answers[question.correct_answer]?.answer || '';

  return {
    title: `${question.question} | Polish Driving License Test`,
    description: `${shortQuestion} Correct answer: ${correctAnswerText}`,
    openGraph: {
      title: question.question,
      description: shortQuestion,
      type: 'article',
      locale: locale,
    },
  };
}

export default async function QuestionPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = translations[locale as Locale] || translations.pl;

  // Extract question ID from slug
  const questionId = extractIdFromSlug(slug);

  // Get the question with answers
  const question = await getQuestionWithAnswers(locale as Locale, questionId);

  if (!question) {
    notFound();
  }

  // Get all questions for navigation
  const allQuestions = await getAllQuestionsWithAnswers(locale as Locale);
  const currentIndex = allQuestions.findIndex((q) => q.id === questionId);
  const previousQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 text-sm">
            <Link
              href={`/${locale}/questions`}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {t.backToQuestions}
            </Link>
            <span className="text-zinc-400">/</span>
            <Link
              href={`/${locale}/categories/${generateCategorySlug(question.category.id, question.category.name)}`}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              {question.category.name}
            </Link>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-900 dark:text-zinc-50">#{question.id}</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Metadata Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-sm rounded-full font-semibold">
            {question.points} {t.points}
          </span>
          {question.license_categories && (
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-sm rounded-full">
              {question.license_categories}
            </span>
          )}
          {question.official_number && (
            <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm rounded-full">
              {t.officialNumber}: {question.official_number}
            </span>
          )}
        </div>

        {/* Interactive Question Component */}
        <InteractiveQuestion
          question={question}
          translations={{
            correctAnswer: t.correctAnswer,
            explanation: t.explanation,
            description: t.description,
            selectAnswer: t.selectAnswer,
            correctFeedback: t.correctFeedback,
            incorrectFeedback: t.incorrectFeedback,
          }}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          {previousQuestion ? (
            <Link
              href={`/${locale}/questions/${generateQuestionSlug(previousQuestion.id, previousQuestion.question)}`}
              className="flex-1 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors text-left"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-1">
                ← {t.previousQuestion}
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 line-clamp-2">
                {previousQuestion.question}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextQuestion ? (
            <Link
              href={`/${locale}/questions/${generateQuestionSlug(nextQuestion.id, nextQuestion.question)}`}
              className="flex-1 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors text-right"
            >
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-1">
                {t.nextQuestion} →
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 line-clamp-2">
                {nextQuestion.question}
              </p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Category Link */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/categories/${generateCategorySlug(question.category.id, question.category.name)}`}
            className="inline-block px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            {t.backToCategory}: {question.category.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
