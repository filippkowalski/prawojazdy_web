'use client';

import { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import { getCategoryIcon } from '@/lib/category-icons';

interface Category {
  id: number;
  name: string;
  questionCount: number;
}

interface TableOfContentsProps {
  categories: Category[];
  locale: string;
}

const translations = {
  pl: 'Spis treści',
  en: 'Table of Contents',
  uk: 'Зміст',
  de: 'Inhaltsverzeichnis',
};

export function TableOfContents({ categories, locale }: TableOfContentsProps) {
  const title = translations[locale as keyof typeof translations] || translations.pl;
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('category-', '');
            setActiveId(parseInt(id));
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    categories.forEach((category) => {
      const element = document.getElementById(`category-${category.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollToCategory = (categoryId: number) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="hidden lg:block">
        <div className="sticky top-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <List className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
              </h2>
            </div>

            <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeId === category.id
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {IconComponent && (
                        <IconComponent className={`flex-shrink-0 w-4 h-4 ${
                          activeId === category.id
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-zinc-400 dark:text-zinc-600'
                        }`} />
                      )}
                      <span className="truncate flex-1 text-xs leading-relaxed">
                        {category.name}
                      </span>
                      <span className="flex-shrink-0 text-xs text-zinc-500 dark:text-zinc-500 font-normal">
                        {category.questionCount}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
    </div>
  );
}
