/**
 * Utility functions for HTML content processing
 */

/**
 * Fix HTML links in descriptions/explanations to point to our reference pages
 * Converts: <a href="znaki_ostrzegawcze.html#4">
 * To: <a href="/pl/references/znaki_ostrzegawcze#4">
 */
export function fixHtmlLinks(html: string, locale: string): string {
  if (!html) return html;

  // Replace relative .html links with absolute paths to our reference pages
  return html.replace(
    /href="([a-z0-9_]+)\.html(#[a-z0-9.]+)?"/gi,
    (match, filename, anchor) => {
      const anchorPart = anchor || '';
      return `href="/${locale}/references/${filename}${anchorPart}"`;
    }
  );
}
