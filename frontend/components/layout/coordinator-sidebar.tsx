"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings
} from "lucide-react"

interface SidebarItem {
  href: string
  labelKey: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface CoordinatorSidebarProps {
  className?: string
}

export function CoordinatorSidebar({ className }: CoordinatorSidebarProps) {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('navigation.coordinator')

  const sidebarItems: SidebarItem[] = [
    {
      href: `/${locale}/coordinator`,
      labelKey: "dashboard",
      icon: LayoutDashboard
    },
    {
      href: `/${locale}/coordinator/groups`,
      labelKey: "groups",
      icon: Users
    },
    {
      href: `/${locale}/coordinator/reports`,
      labelKey: "reports",
      icon: FileText
    },
    {
      href: `/${locale}/coordinator/settings`,
      labelKey: "settings",
      icon: Settings
    }
  ]

  return (
    <div className={cn("flex h-full w-64 flex-col bg-gray-50 border-r", className)}>
      <div className="flex-1 space-y-1 p-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href ||
              (item.href !== `/${locale}/coordinator` && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                {t(item.labelKey)}
                {item.badge && (
                  <span className="ml-auto rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}