'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { Locale } from '@/lib/types';
import { generateQuestionSlug, generateCategorySlug } from '@/lib/slugify';
import { fixHtmlLinks } from '@/lib/html-utils';
import { QuestionMediaThumbnail } from '@/components/question-media-thumbnail';
import { TableOfContents } from '@/components/table-of-contents';
import { LicenseFilter } from '@/components/license-filter';
import { getSavedLicenseCategoriesClient, filterQuestionsByLicense } from '@/lib/license-filter';
import { getCategoryIcon } from '@/lib/category-icons';

interface Question {
  id: number;
  question: string;
  description: string | null;
  points: number;
  media: string | null;
  license_categories: string | null;
}

interface Category {
  id: number;
  name: string;
}

interface CategoryWithQuestions {
  category: Category;
  questions: Question[];
  totalCount: number;
}

interface Translations {
  title: string;
  backToHome: string;
  questions: string;
  viewAll: string;
  filterByLicense: string;
  allLicenses: string;
  clearFilter: string;
}

interface QuestionsClientViewProps {
  locale: Locale;
  categoriesData: CategoryWithQuestions[];
  translations: Translations;
}

export function QuestionsClientView({
  locale,
  categoriesData,
  translations: t,
}: QuestionsClientViewProps) {
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
  const filteredCategoriesData = useMemo(() => {
    if (selectedLicenses.length === 0) {
      // No filter, show first 5 questions per category
      return categoriesData.map(({ category, questions, totalCount }) => ({
        category,
        questions: questions.slice(0, 5),
        totalCount,
      }));
    }

    // Filter questions that match ANY of the selected licenses
    return categoriesData
      .map(({ category, questions, totalCount }) => {
        const filteredQuestions = questions.filter((q: Question) => {
          if (!q.license_categories) return false;
          const categories = q.license_categories.split(',');
          return selectedLicenses.some(license => categories.includes(license));
        });

        return {
          category,
          questions: filteredQuestions.slice(0, 5),
          totalCount: filteredQuestions.length,
        };
      })
      .filter(({ totalCount }) => totalCount > 0); // Only show categories with matching questions
  }, [categoriesData, selectedLicenses]);

  // Prepare data for table of contents
  const tocCategories = filteredCategoriesData.map(({ category, totalCount }) => ({
    id: category.id,
    name: category.name,
    questionCount: totalCount,
  }));

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

      {/* Main Content with Sidebar Layout */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar TOC (Desktop) */}
          <aside className="lg:w-64 xl:w-72 flex-shrink-0">
            <TableOfContents categories={tocCategories} locale={locale} />
          </aside>

          {/* Categories and Questions */}
          <div className="flex-1 min-w-0">
            {/* License Filter */}
            <LicenseFilter
              onFilterChange={setSelectedLicenses}
              locale={locale}
              translations={{
                filterByLicense: t.filterByLicense,
                allLicenses: t.allLicenses,
                clearFilter: t.clearFilter,
              }}
            />

            <div className="space-y-8 md:space-y-12">
              {filteredCategoriesData.map(({ category, questions, totalCount }) => (
                <div
                  key={category.id}
                  id={`category-${category.id}`}
                  className="scroll-mt-24 bg-white dark:bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-200 dark:border-zinc-800"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div className="flex items-start gap-3">
                      {/* Category Icon */}
                      {(() => {
                        const IconComponent = getCategoryIcon(category.id);
                        return IconComponent ? (
                          <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        ) : null;
                      })()}
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                          {category.name}
                        </h2>
                        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                          {totalCount} {t.questions}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/${locale}/categories/${generateCategorySlug(category.id, category.name)}`}
                      className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap"
                    >
                      {t.viewAll} →
                    </Link>
                  </div>

                  {/* Question List */}
                  <div className="space-y-3">
                    {questions.map((question: Question) => (
                      <Link
                        key={question.id}
                        href={`/${locale}/questions/${generateQuestionSlug(question.id, question.question)}`}
                        className="block p-3 md:p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs md:text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            {question.points}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm md:text-base text-zinc-900 dark:text-zinc-50 font-medium line-clamp-2">
                              {question.question}
                            </p>
                            {question.description && (
                              <div
                                className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-1 [&_a]:text-blue-600 [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: fixHtmlLinks(question.description, locale as string) }}
                              />
                            )}
                          </div>
                          {question.media && (
                            <QuestionMediaThumbnail media={question.media} size="sm" />
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
      </div>
    </div>
  );
}
