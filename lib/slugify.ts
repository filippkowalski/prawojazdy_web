/**
 * Utility functions for generating SEO-friendly URL slugs
 */

import slugifyLib from 'slugify';

/**
 * Slugify configuration for multi-language support
 * Handles Polish, English, Ukrainian, and German characters
 */
const SLUGIFY_OPTIONS = {
  lower: true,
  strict: true,
  remove: /[*+~.()'"!:@]/g, // Remove special characters
  locale: 'pl', // Default locale
};

/**
 * Maximum length for slug text (before ID is added)
 */
const MAX_SLUG_LENGTH = 70;

/**
 * Generate a slug from text
 * Handles multi-language characters and truncates long text
 */
export function generateSlug(text: string): string {
  // Truncate text if too long
  let truncated = text;
  if (text.length > MAX_SLUG_LENGTH) {
    // Try to truncate at last word boundary
    truncated = text.substring(0, MAX_SLUG_LENGTH);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > MAX_SLUG_LENGTH * 0.7) {
      // Only use word boundary if it's not too far back
      truncated = truncated.substring(0, lastSpace);
    }
  }

  // Generate slug
  return slugifyLib(truncated, SLUGIFY_OPTIONS);
}

/**
 * Generate a question slug in format: [id]-[question-slug]
 * Example: 123-co-oznacza-ten-znak-drogowy
 */
export function generateQuestionSlug(id: number, questionText: string): string {
  const slug = generateSlug(questionText);
  return `${id}-${slug}`;
}

/**
 * Generate a category slug in format: [id]-[category-slug]
 * Example: 5-znaki-drogowe
 */
export function generateCategorySlug(id: number, categoryName: string): string {
  const slug = generateSlug(categoryName);
  return `${id}-${slug}`;
}

/**
 * Extract ID from a slug
 * Example: "123-co-oznacza-ten-znak" -> 123
 */
export function extractIdFromSlug(slug: string): number {
  const match = slug.match(/^(\d+)-/);
  if (!match) {
    throw new Error(`Invalid slug format: ${slug}`);
  }
  return parseInt(match[1], 10);
}

/**
 * Parse a full slug path into locale and ID
 * Example: "/pl/questions/123-co-oznacza-ten-znak" -> { locale: 'pl', id: 123 }
 */
export function parseSlugPath(path: string): { locale: string; id: number } {
  const parts = path.split('/').filter(Boolean);
  if (parts.length < 3) {
    throw new Error(`Invalid path format: ${path}`);
  }

  const locale = parts[0];
  const slug = parts[2];
  const id = extractIdFromSlug(slug);

  return { locale, id };
}

/**
 * Generate full URL path for a question
 * Example: generateQuestionPath('pl', 123, 'Co oznacza ten znak?') -> '/pl/questions/123-co-oznacza-ten-znak'
 */
export function generateQuestionPath(locale: string, id: number, questionText: string): string {
  const slug = generateQuestionSlug(id, questionText);
  return `/${locale}/questions/${slug}`;
}

/**
 * Generate full URL path for a category
 * Example: generateCategoryPath('pl', 5, 'Znaki drogowe') -> '/pl/categories/5-znaki-drogowe'
 */
export function generateCategoryPath(locale: string, id: number, categoryName: string): string {
  const slug = generateCategorySlug(id, categoryName);
  return `/${locale}/categories/${slug}`;
}
