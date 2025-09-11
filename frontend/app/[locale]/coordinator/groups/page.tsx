"use client"

import { useLocale, useTranslations } from 'next-intl'
import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockGroups } from "@/mock"
import {
  Plus,
  Search,
  Users,
  Calendar,
  MoreHorizontal,
  Eye,
  Settings,
  Download,
  ImageIcon
} from "lucide-react"
import Link from "next/link"

export default function GroupsPage() {
  const locale = useLocale()
  const t = useTranslations('coordinator.groups')
  const groups = mockGroups

  return (
    <CoordinatorLayout>
      <PageWrapper maxWidth="full">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
              <p className="text-gray-600 mt-1">
                {t('description')}
              </p>
            </div>
            <Link href={`/${locale}/coordinator/groups/new`}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('createNewGroup')}
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder={t('searchPlaceholder')}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('filterByDate')}
                </Button>
                <Button variant="outline">
                  {t('filterByStatus')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Groups Grid */}
          <div className="grid gap-6">
            {groups.map((group) => {
              const stats = {
                total: group.participants.length,
                completed: group.participants.filter(p => p.pageStatus === "Ready for Approval").length,
                pending: group.participants.filter(p => p.pageStatus === "Submitted for Review").length,
                inProgress: group.participants.filter(p => p.pageStatus === "In Progress").length,
                notStarted: group.participants.filter(p => p.pageStatus === "Not Started").length
              }

              const progressPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
              const canGeneratePDF = stats.completed === stats.total && stats.total > 0

              return (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{group.name}</CardTitle>
                          {canGeneratePDF && (
                            <Badge variant="success" className="text-xs">
                              {t('readyForPdf')}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {stats.total} {t('participants')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {t('created')} {new Date(group.createdAt).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Progress Section */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{t('progress')}</span>
                        <span className="text-gray-600">{progressPercentage}% {t('complete')}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      
                      {/* Status Breakdown */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{stats.completed}</div>
                          <div className="text-gray-600">{t('completed')}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-yellow-600">{stats.pending}</div>
                          <div className="text-gray-600">{t('pendingReview')}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{stats.inProgress}</div>
                          <div className="text-gray-600">{t('inProgress')}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-600">{stats.notStarted}</div>
                          <div className="text-gray-600">{t('notStarted')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        {t('lastUpdated')} {new Date(group.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/${locale}/coordinator/groups/${group.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            {t('viewDetails')}
                          </Button>
                        </Link>
                        <Link href={`/${locale}/coordinator/groups/${group.id}/cover-editor`}>
                          <Button variant="outline" size="sm">
                            <ImageIcon className="h-4 w-4 mr-2" />
                            {t('editCover')}
                          </Button>
                        </Link>
                        <Link href={`/${locale}/coordinator/groups/${group.id}/settings`}>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            {t('groupSettings')}
                          </Button>
                        </Link>
                        {canGeneratePDF && (
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            {t('downloadPdf')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Empty State */}
          {groups.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">{t('noGroups')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('noGroupsDescription')}
                </p>
                <Link href={`/${locale}/coordinator/groups/new`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('createNewGroup')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}