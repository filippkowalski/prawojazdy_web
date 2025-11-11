# Polish Driving License Test - SEO Web Application

Static website with **13,568+ pre-generated question pages** optimized for search engines. Built to rank in Google for Polish driving license test questions.

## 📊 Quick Stats

- **Total Pages:** 13,700+ static HTML pages
- **Questions:** 3,392 questions × 4 languages = 13,568 pages
- **Categories:** 30 categories × 4 languages = 120 pages
- **Languages:** Polish, English, Ukrainian, German
- **Build Time:** ~5 minutes
- **SEO Score:** 100% (all pages pre-rendered HTML)

## 🚀 Quick Start

```bash
# Development
npm install
npm run dev

# Build static site (generates all 13,700 pages)
npm run build

# Build + generate sitemap
npm run build:full
```

## 📝 Documentation

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete technical documentation, architecture, how everything works
- **[SEO_STRATEGY.md](./SEO_STRATEGY.md)** - SEO goals, strategy, thought process, and guidelines
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Cloudflare Pages deployment guide

## 🔄 Updating Questions Database

When you update questions/explanations in the Flutter app databases:

1. **Copy new databases:**
   ```bash
   cp ../prawojazdy_flutter/assets/database_*.db public/databases/
   ```

2. **Rebuild site:**
   ```bash
   npm run build:full
   ```
   This regenerates all 13,568 question pages with updated content.

3. **Deploy:**
   ```bash
   # Via Git (automatic)
   git add .
   git commit -m "Update questions database"
   git push

   # Or direct upload
   wrangler pages deploy out --project-name=prawo-jazdy
   ```

That's it! Next.js automatically regenerates all pages during build.

## 🎯 SEO Features

### URL Structure
✅ **SEO-friendly URLs with question text:**
- `/pl/questions/123-co-oznacza-ten-znak-drogowy/`
- `/en/questions/456-what-is-the-speed-limit-in-residential/`

### Each Page Includes:
- ✅ Pre-rendered static HTML (perfect for Google)
- ✅ Question, all answers, correct answer highlighted
- ✅ Detailed explanation
- ✅ Meta tags (title, description, Open Graph)
- ✅ Language alternates (hreflang)
- ✅ Internal linking (previous/next, category)
- ✅ Sitemap.xml (13,700+ URLs)
- ✅ robots.txt

## 📁 Project Structure

```
/web
├── app/
│   ├── [locale]/                    # pl, en, uk, de
│   │   ├── page.tsx                # Landing page
│   │   ├── questions/
│   │   │   ├── page.tsx           # Question index
│   │   │   └── [slug]/page.tsx    # Individual question (13,568 pages)
│   │   └── categories/
│   │       └── [slug]/page.tsx    # Category page (120 pages)
│
├── lib/
│   ├── database.ts                 # SQLite query functions
│   ├── slugify.ts                  # Generate SEO-friendly URLs
│   └── types.ts                    # TypeScript types
│
├── public/
│   ├── databases/                  # SQLite files (4 languages)
│   ├── robots.txt                  # SEO robots file
│   └── sitemap.xml                 # Auto-generated sitemap
│
└── scripts/
    └── generate-sitemap.ts         # Sitemap generation
```

## 🛠️ How Page Generation Works

### Build Process (No Separate Script Needed!)

```bash
npm run build
```

**What happens:**
1. Next.js calls `generateStaticParams()` in each dynamic route
2. For questions: reads all 3,392 questions × 4 locales from SQLite databases
3. Generates slug for each question: `{id}-{slugified-question-text}`
4. Pre-renders 13,568 static HTML pages
5. Outputs to `out/` directory

### Key Files:
- **`app/[locale]/questions/[slug]/page.tsx`** - Question template + `generateStaticParams()`
- **`app/[locale]/categories/[slug]/page.tsx`** - Category template + `generateStaticParams()`
- **`lib/database.ts`** - Queries SQLite to get all questions
- **`lib/slugify.ts`** - Converts question text to URL slug

### Example Flow:
```typescript
// 1. generateStaticParams() fetches all questions
const questions = await getAllQuestionsWithAnswers('pl');
// Returns 3,392 questions

// 2. Generate slug for each
questions.map(q => ({
  slug: generateQuestionSlug(q.id, q.question)
  // e.g., "123-co-oznacza-ten-znak-drogowy"
}));

// 3. Next.js renders static HTML for each
// Result: 3,392 HTML files in out/pl/questions/
```

## 🔧 Tech Stack

- **Next.js 16** - Static Site Generation (SSG)
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - Component library
- **SQL.js** - SQLite in Node.js (build time only)
- **Cloudflare Pages** - Hosting & CDN

## 📈 SEO Strategy Summary

**Goal:** Rank #1 in Google when users search for specific Polish driving test questions.

**How:**
- Every question is a standalone SEO-optimized page
- Question text in URL (e.g., `/co-oznacza-ten-znak/`)
- Full answer + explanation visible to Google
- Internal linking between related questions
- Sitemap with all 13,568 URLs
- Fast loading (static HTML on CDN)

See **[SEO_STRATEGY.md](./SEO_STRATEGY.md)** for complete strategy and thought process.

## 🚀 Deployment

**Cloudflare Pages (Recommended):**
```bash
# Connect GitHub repo (auto-deploys on push)
Build command: npm run build:full
Output directory: out
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed deployment guide.

## 🔄 Maintenance

### When to Rebuild:
- ✅ Updated question text
- ✅ Added new explanations
- ✅ Modified descriptions
- ✅ Changed correct answers
- ✅ Added/removed questions

### What Doesn't Require Rebuild:
- ❌ Mobile app UI changes
- ❌ User progress data
- ❌ Analytics updates

## 📞 Support

For issues:
1. Check build logs: `npm run build 2>&1 | tee build.log`
2. Review [DOCUMENTATION.md](./DOCUMENTATION.md)
3. Check Next.js static export docs

---

**Version:** 1.0.0
**Last Updated:** November 2024
**Questions Database Version:** 2 (2025 Official Questions)
