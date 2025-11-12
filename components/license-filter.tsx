'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface LicenseFilterProps {
  onFilterChange: (licenses: string[]) => void;
  locale?: string;
  translations: {
    filterByLicense: string;
    allLicenses: string;
    clearFilter: string;
  };
}

const licenseDescriptions = {
  pl: {
    B: 'Samochód',
    A: 'Motocykl',
    C: 'Ciężarówka',
    D: 'Autobus',
    T: 'Traktor',
    AM: 'Motorower',
    PT: 'Zawodowy',
  },
  en: {
    B: 'Car',
    A: 'Motorcycle',
    C: 'Truck',
    D: 'Bus',
    T: 'Tractor',
    AM: 'Moped',
    PT: 'Professional',
  },
  uk: {
    B: 'Автомобіль',
    A: 'Мотоцикл',
    C: 'Вантажівка',
    D: 'Автобус',
    T: 'Трактор',
    AM: 'Мопед',
    PT: 'Професійний',
  },
  de: {
    B: 'Auto',
    A: 'Motorrad',
    C: 'LKW',
    D: 'Bus',
    T: 'Traktor',
    AM: 'Moped',
    PT: 'Professionell',
  },
};

export function LicenseFilter({ onFilterChange, locale = 'pl', translations }: LicenseFilterProps) {
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const descriptions = licenseDescriptions[locale as keyof typeof licenseDescriptions] || licenseDescriptions.pl;

  const licenseCategories = [
    { id: 'B', name: 'B', description: descriptions.B },
    { id: 'A', name: 'A', description: descriptions.A },
    { id: 'C', name: 'C', description: descriptions.C },
    { id: 'D', name: 'D', description: descriptions.D },
    { id: 'T', name: 'T', description: descriptions.T },
    { id: 'AM', name: 'AM', description: descriptions.AM },
    { id: 'PT', name: 'PT', description: descriptions.PT },
  ];

  const toggleLicense = (licenseId: string) => {
    const newSelection = selectedLicenses.includes(licenseId)
      ? selectedLicenses.filter((id) => id !== licenseId)
      : [...selectedLicenses, licenseId];

    setSelectedLicenses(newSelection);
    onFilterChange(newSelection);
  };

  const clearFilter = () => {
    setSelectedLicenses([]);
    onFilterChange([]);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {translations.filterByLicense}
        </h3>
        {selectedLicenses.length > 0 && (
          <button
            onClick={clearFilter}
            className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            {translations.clearFilter}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {licenseCategories.map((license) => (
          <button
            key={license.id}
            onClick={() => toggleLicense(license.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedLicenses.includes(license.id)
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            <span className="font-bold">{license.name}</span>
            <span className="text-xs opacity-75 ml-1">({license.description})</span>
          </button>
        ))}
      </div>

      {selectedLicenses.length === 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
          {translations.allLicenses}
        </p>
      )}
    </div>
  );
}
