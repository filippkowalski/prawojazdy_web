import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/types';
import * as fs from 'fs';
import * as path from 'path';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string; page: string }>;
}

const locales: Locale[] = ['pl', 'en', 'uk', 'de'];

const availablePages = [
  'kierowanie_ruchem',
  'kodeks1', 'kodeks2', 'kodeks3', 'kodeks4', 'kodeks5',
  'kodeks6', 'kodeks7', 'kodeks8', 'kodeks9', 'kodeks10',
  'kodeks11', 'kodeks12', 'kodeks13', 'kodeks14', 'kodeks15',
  'kodeks16', 'kodeks17', 'kodeks18', 'kodeks19', 'kodeks20',
  'kodeks21', 'kodeks22', 'kodeks23', 'kodeks24', 'kodeks25', 'kodeks26',
  'przepisy_ogolne',
  'sygnaly_swietlne',
  'znaki_drogowe_poziome',
  'znaki_informacyjne',
  'znaki_inne',
  'znaki_kierunku_miejscowosci',
  'znaki_kolejowe',
  'znaki_nakazu',
  'znaki_ostrzegawcze',
  'znaki_uzupelniajace',
  'znaki_zakazu',
];

const pageTitles: Record<string, string> = {
  'kierowanie_ruchem': 'Kierowanie ruchem',
  'przepisy_ogolne': 'Przepisy ogólne',
  'sygnaly_swietlne': 'Sygnały świetlne',
  'znaki_drogowe_poziome': 'Znaki drogowe poziome',
  'znaki_informacyjne': 'Znaki informacyjne',
  'znaki_inne': 'Znaki inne',
  'znaki_kierunku_miejscowosci': 'Znaki kierunku i miejscowości',
  'znaki_kolejowe': 'Znaki kolejowe',
  'znaki_nakazu': 'Znaki nakazu',
  'znaki_ostrzegawcze': 'Znaki ostrzegawcze',
  'znaki_uzupelniajace': 'Znaki uzupełniające',
  'znaki_zakazu': 'Znaki zakazu',
};

for (let i = 1; i <= 26; i++) {
  pageTitles[`kodeks${i}`] = `Kodeks drogowy - Część ${i}`;
}

const translations = {
  pl: {
    backToQuestions: 'Powrót do pytań',
    trafficRegulations: 'Przepisy ruchu drogowego',
  },
  en: {
    backToQuestions: 'Back to questions',
    trafficRegulations: 'Traffic Regulations',
  },
  uk: {
    backToQuestions: 'Повернутися до питань',
    trafficRegulations: 'Правила дорожнього руху',
  },
  de: {
    backToQuestions: 'Zurück zu Fragen',
    trafficRegulations: 'Verkehrsregeln',
  },
};

/**
 * Generate static params for all reference pages
 */
export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    for (const page of availablePages) {
      params.push({
        locale,
        page,
      });
    }
  }

  console.log(`Generating ${params.length} reference pages...`);
  return params;
}

/**
 * Generate metadata
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params;
  const title = pageTitles[page] || page;

  return {
    title: `${title} | Polish Driving License Test`,
    description: `Traffic regulations reference: ${title}`,
  };
}

/**
 * Extract content from HTML file
 */
function getPageContent(page: string): string | null {
  try {
    const htmlPath = path.join(process.cwd(), 'public', 'references', `${page}.html`);

    if (!fs.existsSync(htmlPath)) {
      return null;
    }

    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Extract content between <body> tags
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (!bodyMatch) {
      return html; // Return full HTML if no body tag
    }

    let content = bodyMatch[1];

    // Extract just the page content (skip wrapper divs)
    const textMatch = content.match(/<div class="text">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/i);
    if (textMatch) {
      content = textMatch[1];
    }

    // Fix image paths to point to /references/
    content = content.replace(/src="image\//g, 'src="/references/image/');

    return content;
  } catch (error) {
    console.error(`Error reading page ${page}:`, error);
    return null;
  }
}

export default async function ReferencePage({ params }: Props) {
  const { locale, page } = await params;
  const t = translations[locale as Locale] || translations.pl;

  if (!availablePages.includes(page)) {
    notFound();
  }

  const content = getPageContent(page);

  if (!content) {
    notFound();
  }

  const title = pageTitles[page] || page;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <Link
            href={`/${locale}/questions`}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-2 inline-block"
          >
            ← {t.backToQuestions}
          </Link>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-1">
            {t.trafficRegulations}
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-zinc-200 dark:border-zinc-800">
          <div
            className="prose prose-zinc dark:prose-invert max-w-none
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-6
              [&_p]:mb-3 [&_p]:leading-relaxed
              [&_strong]:font-semibold [&_strong]:text-zinc-900 dark:[&_strong]:text-zinc-50
              [&_a]:text-blue-600 [&_a]:underline dark:[&_a]:text-blue-400
              [&_img]:mx-auto [&_img]:my-4
              [&_.znak]:text-center [&_.znak]:my-6
              [&_.znak_first]:text-center [&_.znak_first]:my-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
