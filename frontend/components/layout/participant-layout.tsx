"use client"

import { AppHeader } from "./app-header"

interface ParticipantLayoutProps {
  children: React.ReactNode
}

export function ParticipantLayout({ children }: ParticipantLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader showNavigation={false} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}