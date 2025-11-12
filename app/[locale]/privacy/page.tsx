import Link from 'next/link';
import { Locale } from '@/lib/types';
import { Metadata } from 'next';
import { Shield } from 'lucide-react';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles = {
    pl: 'Polityka Prywatności - Prawo Jazdy',
    en: 'Privacy Policy - Driving License',
    uk: 'Політика конфіденційності - Водійські права',
    de: 'Datenschutzrichtlinie - Führerschein',
  };

  return {
    title: titles[locale as Locale] || titles.pl,
  };
}

const translations = {
  pl: {
    backToHome: 'Powrót do strony głównej',
    lastUpdated: 'Ostatnia aktualizacja',
    developer: 'Deweloper',
    contact: 'Kontakt',
  },
  en: {
    backToHome: 'Back to home',
    lastUpdated: 'Last Updated',
    developer: 'Developer',
    contact: 'Contact',
  },
  uk: {
    backToHome: 'Повернутися на головну',
    lastUpdated: 'Останнє оновлення',
    developer: 'Розробник',
    contact: 'Контакт',
  },
  de: {
    backToHome: 'Zurück zur Startseite',
    lastUpdated: 'Zuletzt aktualisiert',
    developer: 'Entwickler',
    contact: 'Kontakt',
  },
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const t = translations[locale as Locale] || translations.pl;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <Link
            href={`/${locale}`}
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-4 inline-block"
          >
            ← {t.backToHome}
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Privacy Policy
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t.lastUpdated}: December 12, 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <div className="mb-8 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <p className="text-sm mb-2">
                <strong>{t.developer}:</strong> Nomadic Studio
              </p>
              <p className="text-sm">
                <strong>{t.contact}:</strong>{' '}
                <a href="mailto:bobbyfischer77@icloud.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  bobbyfischer77@icloud.com
                </a>
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Introduction
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Nomadic Studio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how the Prawo Jazdy application and website (collectively, "the Service") collects, uses, and protects information
                when you use our driving license test preparation platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Personal Information
              </h3>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">✓ No Personal Data Collection</p>
                <p className="text-sm text-green-800 dark:text-green-200">
                  We do <strong>not collect or store any personal or sensitive data</strong> that can directly identify you,
                  such as names, email addresses, phone numbers, or government-issued identification.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Usage Data (Anonymous Analytics)
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                We collect anonymous, aggregated data to improve the Service, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
                <li>App usage patterns and feature interactions</li>
                <li>Quiz and practice test statistics (non-identifiable)</li>
                <li>Device information (type, operating system, language preference)</li>
                <li>Crash reports and error logs for debugging</li>
                <li>General geographic region (country-level only)</li>
              </ul>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Local Data Storage
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Your study progress, bookmarked questions, quiz answers, and preferences are stored <strong>locally on your device</strong>.
                This data is not transmitted to our servers and remains under your control. You can delete this data at any time
                by clearing the app's storage or uninstalling the application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Third-Party Services
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                To provide and improve the Service, we use the following third-party platforms. Each service has its own
                privacy policy and may collect data according to their terms:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Firebase Analytics</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    <strong>Purpose:</strong> User interaction insights and app performance monitoring
                  </p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    <strong>Data Collected:</strong> Anonymous usage statistics, crash data, device information
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://firebase.google.com/support/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Firebase Privacy Policy →
                    </a>
                  </p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Google AdMob</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    <strong>Purpose:</strong> Display advertisements to support free access
                  </p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    <strong>Data Collected:</strong> Advertising ID, device information, ad interaction data
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://support.google.com/admob/answer/6128543"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      AdMob Privacy Policy →
                    </a>
                  </p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Mixpanel</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    <strong>Purpose:</strong> Behavioral analysis and feature optimization
                  </p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                    <strong>Data Collected:</strong> Anonymous event tracking, user journey analytics
                  </p>
                  <p className="text-sm">
                    <a
                      href="https://mixpanel.com/legal/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Mixpanel Privacy Policy →
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                How We Use Information
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                The anonymous data we collect is used to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>Improve app functionality and user experience</li>
                <li>Identify and fix technical issues and bugs</li>
                <li>Understand which features are most valuable to users</li>
                <li>Optimize content and question difficulty</li>
                <li>Display relevant advertisements to support free access</li>
                <li>Analyze usage trends to guide development priorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Data Sharing and Disclosure
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your information. Data is only shared with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                <li><strong>Third-party service providers</strong> listed above, for operational purposes</li>
                <li><strong>Legal authorities</strong> if required by law or to protect our rights</li>
                <li><strong>Business successors</strong> in the event of a merger, acquisition, or asset sale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Your Privacy Rights
              </h2>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Advertising Preferences
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                You can manage personalized advertising through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
                <li><strong>iOS:</strong> Settings → Privacy → Advertising → Limit Ad Tracking</li>
                <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
              </ul>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Data Deletion
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                Since we don't collect personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>Local device data can be cleared through app settings or by uninstalling</li>
                <li>Third-party services have their own data retention policies (see links above)</li>
                <li>Anonymous analytics data cannot be traced back to individual users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Children's Privacy
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                The Service is intended for users preparing for driving licenses (typically 16+ years old). We do not
                knowingly collect personal information from children under 13. If you believe we have inadvertently collected
                such information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Security
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We implement industry-standard security measures to protect data processed by third-party services.
                However, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute
                security but continuously work to protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Data Retention
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                <strong>Local device data:</strong> Retained until you delete the app or clear its storage
                <br />
                <strong>Anonymous analytics:</strong> Retained according to third-party service policies (typically 14-26 months)
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                International Data Transfers
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Third-party services may process data in countries outside Poland, including the United States. These
                transfers are subject to appropriate safeguards and comply with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                We may update this Privacy Policy periodically. Changes will be posted with an updated "Last Updated" date.
                Continued use of the Service after changes constitutes acceptance of the revised policy. We encourage you
                to review this policy regularly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                Contact Us
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact:
              </p>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <p className="text-sm mb-2">
                  <strong>Nomadic Studio</strong>
                </p>
                <p className="text-sm">
                  Email:{' '}
                  <a href="mailto:bobbyfischer77@icloud.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    bobbyfischer77@icloud.com
                  </a>
                </p>
              </div>
            </section>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                By using Prawo Jazdy, you acknowledge that you have read and understood this Privacy Policy
                and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
