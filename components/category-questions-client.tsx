'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { Locale } from '@/lib/types';
import { generateQuestionSlug } from '@/lib/slugify';
import { QuestionMediaThumbnail } from '@/components/question-media-thumbnail';
import { getSavedLicenseCategoriesClient, filterQuestionsByLicense } from '@/lib/license-filter';
import { getCategoryIcon } from '@/lib/category-icons';

interface Question {
  id: number;
  question: string;
  description: string | null;
  points: number;
  media: string | null;
  license_categories: string | null;
  correct_answer: number;
  official_number: number | string | null;
  answers: Array<{ answer: string }>;
}

interface Category {
  id: number;
  name: string;
}

interface Translations {
  backToQuestions: string;
  questionsInCategory: string;
  points: string;
}

interface CategoryQuestionsClientProps {
  locale: Locale;
  category: Category;
  questions: Question[];
  translations: Translations;
}

export function CategoryQuestionsClient({
  locale,
  category,
  questions: allQuestions,
  translations: t,
}: CategoryQuestionsClientProps) {
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);

  // Load saved license categories from cookies on mount
  useEffect(() => {
    const savedCategories = getSavedLicenseCategoriesClient();
    if (savedCategories.length > 0) {
      setSelectedLicenses(savedCategories);
    }
  }, []);

  // Listen for license category changes from the global selector
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCategories = getSavedLicenseCategoriesClient();
      setSelectedLicenses(savedCategories);
    };

    // Listen for custom event when license categories change
    window.addEventListener('licenseCategoriesChanged', handleStorageChange);
    return () => window.removeEventListener('licenseCategoriesChanged', handleStorageChange);
  }, []);

  // Filter questions based on selected licenses
  const questions = useMemo(() => {
    return filterQuestionsByLicense(allQuestions, selectedLicenses);
  }, [allQuestions, selectedLicenses]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <Link
            href={`/${locale}/questions`}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 inline-block"
          >
            ← {t.backToQuestions}
          </Link>
          <div className="flex items-start gap-4">
            {/* Category Icon */}
            {(() => {
              const IconComponent = getCategoryIcon(category.id);
              return IconComponent ? (
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                </div>
              ) : null;
            })()}
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {category.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {questions.length} {t.questionsInCategory}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="space-y-3">
          {questions.map((question) => (
            <Link
              key={question.id}
              href={`/${locale}/questions/${generateQuestionSlug(question.id, question.question)}`}
              className="block p-4 md:p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Points Badge */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black flex items-center justify-center font-bold">
                  {question.points}
                </div>

                {/* Question Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {question.question}
                  </p>

                  {question.description && (
                    <div
                      className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2 [&_a]:text-blue-600 [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: question.description }}
                    />
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
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

                {/* Media Thumbnail */}
                {question.media && (
                  <QuestionMediaThumbnail media={question.media} size="md" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
