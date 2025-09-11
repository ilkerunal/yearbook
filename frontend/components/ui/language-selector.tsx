'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './button';
import { locales, localeNames, localeFlags } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
      {locales.map((loc) => (
        <Button
          key={loc}
          variant="ghost"
          size="sm"
          onClick={() => handleLanguageChange(loc)}
          className={cn(
            "min-w-[70px] h-8 text-xs font-medium transition-all",
            locale === loc 
              ? "bg-white shadow-sm text-gray-900" 
              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
          )}
        >
          <span className="mr-1.5">{localeFlags[loc]}</span>
          {localeNames[loc]}
        </Button>
      ))}
    </div>
  );
}