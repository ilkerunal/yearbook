"use client"

import Link from "next/link"
import { useLocale, useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/ui/language-selector"
import { BookOpen, Menu } from "lucide-react"

interface AppHeaderProps {
  showNavigation?: boolean
  onMenuClick?: () => void
}

export function AppHeader({ showNavigation = true, onMenuClick }: AppHeaderProps) {
  const locale = useLocale();
  const t = useTranslations('navigation');

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl">{t('brand')}</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {showNavigation && (
            <nav className="flex items-center gap-4">
              <Link 
                href={`/${locale}/coordinator`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t('coordinator.dashboard')}
              </Link>
              <Link 
                href={`/${locale}/participant`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t('participant.title')}
              </Link>
            </nav>
          )}
          
          {/* Language Selector in top right */}
          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}