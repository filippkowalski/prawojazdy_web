/**
 * Get saved license categories from cookies (client-side only)
 * Must be called from a client component or useEffect
 */
export function getSavedLicenseCategoriesClient(): string[] {
  if (typeof window === 'undefined') return [];

  const savedCategories = document.cookie
    .split('; ')
    .find(row => row.startsWith('license_categories='))
    ?.split('=')[1];

  if (!savedCategories) {
    return [];
  }

  try {
    return JSON.parse(decodeURIComponent(savedCategories));
  } catch {
    return [];
  }
}

/**
 * Filter questions based on license categories
 */
export function filterQuestionsByLicense<T extends { license_categories: string | null }>(
  questions: T[],
  selectedCategories: string[]
): T[] {
  // If no categories selected, return all questions
  if (selectedCategories.length === 0) {
    return questions;
  }

  // Filter questions that match ANY of the selected categories
  return questions.filter(question => {
    if (!question.license_categories) return false;

    const questionCategories = question.license_categories.split(',').map(c => c.trim());
    return selectedCategories.some(selected => questionCategories.includes(selected));
  });
}
