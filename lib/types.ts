/**
 * Database and application types
 */

export type Locale = 'pl' | 'en' | 'uk' | 'de';

export interface Answer {
  id: number;
  question_id: number;
  answer: string;
  position: number; // 0 = A, 1 = B, 2 = C
}

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  category_id: number;
  media: string | null;
  question: string;
  points: number; // 1, 2, or 3
  description: string | null;
  explanation: string | null;
  correct_answer: number; // position (0, 1, 2)
  type: string; // "AB" or "ABC"
  official_number: number | null;
  license_categories: string | null; // comma-separated: "A,B,C"
}

export interface QuestionWithAnswers extends Question {
  answers: Answer[];
  category: Category;
}

export interface QuestionWithSlug extends QuestionWithAnswers {
  slug: string; // SEO-friendly URL slug
}

export interface CategoryWithQuestions extends Category {
  questions: QuestionWithSlug[];
  questionCount: number;
}

/**
 * Props for question pages
 */
export interface QuestionPageParams {
  locale: Locale;
  slug: string; // format: "[id]-[slugified-question]"
}

export interface CategoryPageParams {
  locale: Locale;
  slug: string; // format: "[id]-[slugified-category]"
}

/**
 * SEO Metadata
 */
export interface QuestionMetadata {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    type: 'article';
    locale: string;
    alternateLocales: string[];
  };
  alternates: {
    canonical: string;
    languages: Record<Locale, string>;
  };
}
