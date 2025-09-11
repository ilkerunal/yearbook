"use client"

import { useTranslations, useLocale } from 'next-intl'
import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockGroups } from "@/mock"
import {
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  BookOpen,
  Download
} from "lucide-react"
import Link from "next/link"

export default function CoordinatorDashboard() {
  const t = useTranslations('coordinator.dashboard')
  const locale = useLocale()
  const groups = mockGroups

  // Calculate stats
  const totalParticipants = groups.reduce((acc, group) => acc + group.participants.length, 0)
  const completedPages = groups.reduce((acc, group) =>
    acc + group.participants.filter(p => p.pageStatus === "Ready for Approval").length, 0
  )
  const pendingReview = groups.reduce((acc, group) =>
    acc + group.participants.filter(p => p.pageStatus === "Submitted for Review").length, 0
  )
  const inProgress = groups.reduce((acc, group) =>
    acc + group.participants.filter(p => p.pageStatus === "In Progress").length, 0
  )

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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('createNewGroup')}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('stats.totalGroups')}</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{groups.length}</div>
                <p className="text-xs text-muted-foreground">
                  {t('stats.activeProjects')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('stats.totalParticipants')}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalParticipants}</div>
                <p className="text-xs text-muted-foreground">
                  {t('stats.acrossAllGroups')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('stats.pendingReview')}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingReview}</div>
                <p className="text-xs text-muted-foreground">
                  {t('stats.pagesAwaitingReview')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t('stats.completed')}</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedPages}</div>
                <p className="text-xs text-muted-foreground">
                  {t('stats.readyForFinalPdf')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>{t('recentActivity.title')}</CardTitle>
              <CardDescription>
                {t('recentActivity.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Alice Johnson submitted her page for review</p>
                    <p className="text-xs text-gray-500">Westfield High School - Class of 2024 • 2 hours ago</p>
                  </div>
                  <Badge variant="success">{t('recentActivity.newSubmission')}</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Bob Smith updated his page content</p>
                    <p className="text-xs text-gray-500">Westfield High School - Class of 2024 • 5 hours ago</p>
                  </div>
                  <Badge variant="secondary">{t('recentActivity.updated')}</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">David Wilson needs to address feedback</p>
                    <p className="text-xs text-gray-500">Westfield High School - Class of 2024 • 1 day ago</p>
                  </div>
                  <Badge variant="warning">{t('recentActivity.actionNeeded')}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Groups Overview */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{t('groups.title')}</h2>
              <Button variant="outline">{t('groups.viewAllGroups')}</Button>
            </div>
            
            <div className="grid gap-6">
              {groups.map((group) => {
                const groupStats = {
                  total: group.participants.length,
                  completed: group.participants.filter(p => p.pageStatus === "Ready for Approval").length,
                  pending: group.participants.filter(p => p.pageStatus === "Submitted for Review").length,
                  inProgress: group.participants.filter(p => p.pageStatus === "In Progress").length,
                  notStarted: group.participants.filter(p => p.pageStatus === "Not Started").length
                }

                const canGeneratePDF = groupStats.completed === groupStats.total && groupStats.total > 0

                return (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{group.name}</CardTitle>
                          <CardDescription>
                            {groupStats.total} {t('groups.participants')} • {t('groups.created')} {new Date(group.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {canGeneratePDF && (
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              {t('groups.generatePdf')}
                            </Button>
                          )}
                          <Link href={`/${locale}/coordinator/groups/${group.id}`}>
                            <Button variant="outline" size="sm">
                              {t('groups.manage')}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{t('groups.progress')}</span>
                            <span>{groupStats.total > 0 ? Math.round((groupStats.completed / groupStats.total) * 100) : 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all"
                              style={{ 
                                width: `${groupStats.total > 0 ? (groupStats.completed / groupStats.total) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-wrap gap-2">
                          {groupStats.completed > 0 && (
                            <Badge variant="success" className="text-xs">
                              {groupStats.completed} {t('groups.completed')}
                            </Badge>
                          )}
                          {groupStats.pending > 0 && (
                            <Badge variant="warning" className="text-xs">
                              {groupStats.pending} {t('groups.pendingReview')}
                            </Badge>
                          )}
                          {groupStats.inProgress > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {groupStats.inProgress} {t('groups.inProgress')}
                            </Badge>
                          )}
                          {groupStats.notStarted > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {groupStats.notStarted} {t('groups.notStarted')}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}