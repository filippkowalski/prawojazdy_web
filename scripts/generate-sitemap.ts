/**
 * Generate sitemap.xml for all static pages
 * Run this after build: npm run generate-sitemap
 */

import * as fs from 'fs';
import * as path from 'path';
import { getAllQuestionsWithAnswers, getCategories } from '../lib/database';
import { generateQuestionSlug, generateCategorySlug } from '../lib/slugify';
import { Locale } from '../lib/types';

const BASE_URL = 'https://www.prawojazdy.co';
const locales: Locale[] = ['pl', 'en', 'uk', 'de'];

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

async function generateSitemap() {
  const urls: SitemapUrl[] = [];
  const lastmod = new Date().toISOString().split('T')[0];

  // Add homepage redirects
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod,
    changefreq: 'weekly',
    priority: 1.0,
  });

  // Add locale homepages
  for (const locale of locales) {
    urls.push({
      loc: `${BASE_URL}/${locale}/`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.9,
    });

    // Add questions index
    urls.push({
      loc: `${BASE_URL}/${locale}/questions/`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.8,
    });

    // Add all category pages
    const categories = await getCategories(locale);
    for (const category of categories) {
      const slug = generateCategorySlug(category.id, category.name);
      urls.push({
        loc: `${BASE_URL}/${locale}/categories/${slug}/`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.7,
      });
    }

    // Add all question pages
    const questions = await getAllQuestionsWithAnswers(locale);
    for (const question of questions) {
      const slug = generateQuestionSlug(question.id, question.question);
      urls.push({
        loc: `${BASE_URL}/${locale}/questions/${slug}/`,
        lastmod,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap to public directory (will be copied to out/ during build)
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');

  console.log(`✓ Generated sitemap with ${urls.length} URLs`);
  console.log(`  Saved to: ${sitemapPath}`);
}

// Run the script
generateSitemap()
  .then(() => {
    console.log('✓ Sitemap generation complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('✗ Sitemap generation failed:', error);
    process.exit(1);
  });
