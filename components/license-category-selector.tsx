'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, Check } from 'lucide-react';
import { Locale } from '@/lib/types';

interface LicenseCategorySelectorProps {
  locale: Locale;
  onCategoryChange?: (categories: string[]) => void;
}

const licenseDescriptions = {
  pl: {
    all: 'Wszystkie kategorie',
    B: 'Kat. B - Samochód',
    A: 'Kat. A - Motocykl',
    C: 'Kat. C - Ciężarówka',
    D: 'Kat. D - Autobus',
    T: 'Kat. T - Traktor',
    AM: 'Kat. AM - Motorower',
    PT: 'Kat. PT - Zawodowy',
  },
  en: {
    all: 'All categories',
    B: 'Cat. B - Car',
    A: 'Cat. A - Motorcycle',
    C: 'Cat. C - Truck',
    D: 'Cat. D - Bus',
    T: 'Cat. T - Tractor',
    AM: 'Cat. AM - Moped',
    PT: 'Cat. PT - Professional',
  },
  uk: {
    all: 'Всі категорії',
    B: 'Кат. B - Автомобіль',
    A: 'Кат. A - Мотоцикл',
    C: 'Кат. C - Вантажівка',
    D: 'Кат. D - Автобус',
    T: 'Кат. T - Трактор',
    AM: 'Кат. AM - Мопед',
    PT: 'Кат. PT - Професійний',
  },
  de: {
    all: 'Alle Klassen',
    B: 'Kl. B - Auto',
    A: 'Kl. A - Motorrad',
    C: 'Kl. C - LKW',
    D: 'Kl. D - Bus',
    T: 'Kl. T - Traktor',
    AM: 'Kl. AM - Moped',
    PT: 'Kl. PT - Professionell',
  },
};

const categories = ['B', 'A', 'C', 'D', 'T', 'AM', 'PT'];

export function LicenseCategorySelector({ locale, onCategoryChange }: LicenseCategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const descriptions = licenseDescriptions[locale] || licenseDescriptions.pl;

  // Load from cookies on mount
  useEffect(() => {
    const savedCategories = document.cookie
      .split('; ')
      .find(row => row.startsWith('license_categories='))
      ?.split('=')[1];

    if (savedCategories) {
      const parsed = JSON.parse(decodeURIComponent(savedCategories));
      setSelectedCategories(parsed);
      onCategoryChange?.(parsed);
    }
  }, [onCategoryChange]);

  const toggleCategory = (category: string) => {
    let newSelection: string[];

    if (selectedCategories.includes(category)) {
      newSelection = selectedCategories.filter(c => c !== category);
    } else {
      newSelection = [...selectedCategories, category];
    }

    setSelectedCategories(newSelection);

    // Save to cookies (1 year expiry)
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `license_categories=${encodeURIComponent(JSON.stringify(newSelection))}; expires=${expires.toUTCString()}; path=/`;

    onCategoryChange?.(newSelection);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('licenseCategoriesChanged'));
  };

  const clearSelection = () => {
    setSelectedCategories([]);
    document.cookie = 'license_categories=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    onCategoryChange?.([]);

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('licenseCategoriesChanged'));
  };

  const getDisplayText = () => {
    if (selectedCategories.length === 0) {
      return descriptions.all;
    }
    if (selectedCategories.length === 1) {
      return descriptions[selectedCategories[0] as keyof typeof descriptions];
    }
    return `${selectedCategories.length} ${locale === 'pl' ? 'kategorie' : locale === 'de' ? 'Klassen' : 'categories'}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
      >
        <GraduationCap className="h-4 w-4" />
        <span className="hidden sm:inline">{getDisplayText()}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 py-2">
            <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                {locale === 'pl' ? 'Wybierz kategorię' : locale === 'de' ? 'Klasse wählen' : locale === 'uk' ? 'Оберіть категорію' : 'Select category'}
              </p>
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
                >
                  {locale === 'pl' ? 'Wyczyść' : locale === 'de' ? 'Löschen' : locale === 'uk' ? 'Очистити' : 'Clear'}
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-between transition-colors"
                  >
                    <span className={isSelected ? 'text-zinc-900 dark:text-zinc-50 font-medium' : 'text-zinc-600 dark:text-zinc-400'}>
                      {descriptions[category as keyof typeof descriptions]}
                    </span>
                    {isSelected && (
                      <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedCategories.length === 0 && (
              <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-500">
                  {locale === 'pl'
                    ? 'Wyświetlane wszystkie pytania'
                    : locale === 'de'
                    ? 'Alle Fragen werden angezeigt'
                    : locale === 'uk'
                    ? 'Показані всі питання'
                    : 'Showing all questions'}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
