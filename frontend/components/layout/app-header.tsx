"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Menu } from "lucide-react"

interface AppHeaderProps {
  showNavigation?: boolean
  onMenuClick?: () => void
}

export function AppHeader({ showNavigation = true, onMenuClick }: AppHeaderProps) {
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
          
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl">Digital Yearbook</span>
          </Link>
        </div>

        {showNavigation && (
          <nav className="ml-auto flex items-center gap-4">
            <Link 
              href="/coordinator" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Coordinator
            </Link>
            <Link 
              href="/participant" 
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Participant
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}