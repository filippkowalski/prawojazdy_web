'use client';

import Link from 'next/link';
import { Locale } from '@/lib/types';

interface TermsContentProps {
  locale: Locale;
  translations: any;
}

export function TermsContent({ locale, translations: t }: TermsContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section1.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section1.content}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section2.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {t.section2.content1}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
          {t.section2.list.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
          {t.section2.content2}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section3.title}
        </h2>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">{t.section3.warning}</p>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {t.section3.warningText}
          </p>
        </div>

        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
          {t.section3.subtitle1}
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {t.section3.content1}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
          {t.section3.protectedList.map((item: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>

        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
          {t.section3.subtitle2}
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {t.section3.content2}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
          {t.section3.prohibitedList.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
          {t.section3.subtitle3}
        </h3>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section3.content3}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section4.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {t.section4.content}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
          {t.section4.list.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section5.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {t.section5.content}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
          {t.section5.list.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section6.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section6.content}{' '}
          <Link href={`/${locale}/privacy`} className="text-blue-600 dark:text-blue-400 hover:underline">
            {t.section6.privacyLink}
          </Link>
          {t.section6.content2}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section7.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          <strong>{t.section7.content1}</strong>
        </p>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section7.content2}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section8.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section8.content}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section9.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {t.section9.content1}
        </p>
        <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
          {t.section9.list.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
          {t.section9.content2}{' '}
          <a href="mailto:bobbyfischer77@icloud.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            bobbyfischer77@icloud.com
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section10.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section10.content}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section11.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section11.content}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section12.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section12.content}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section13.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section13.content}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {t.section14.title}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {t.section14.content}
        </p>
        <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <p className="text-sm mb-2">
            <strong>{t.section14.companyName}</strong>
          </p>
          <p className="text-sm">
            {t.section14.email}:{' '}
            <a href="mailto:bobbyfischer77@icloud.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              bobbyfischer77@icloud.com
            </a>
          </p>
        </div>
      </section>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          {t.copyright}
        </p>
      </div>
    </div>
  );
}
