"use client"

import { useLocale, useTranslations } from 'next-intl'
import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockGroups } from "@/mock"
import {
  ArrowLeft,
  Users,
  Plus,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Settings,
  ImageIcon
} from "lucide-react"
import Link from "next/link"
import { PageStatus } from "@/types"

interface GroupPageProps {
  params: {
    groupId: string
    locale: string
  }
}

function getStatusBadge(status: PageStatus) {
  switch (status) {
    case "Ready for Approval":
      return <Badge variant="success">Ready for Approval</Badge>
    case "Submitted for Review":
      return <Badge variant="warning">Submitted for Review</Badge>
    case "In Progress":
      return <Badge variant="secondary">In Progress</Badge>
    case "Changes Requested":
      return <Badge variant="destructive">Changes Requested</Badge>
    case "Not Started":
      return <Badge variant="outline">Not Started</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getStatusIcon(status: PageStatus) {
  switch (status) {
    case "Ready for Approval":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "Submitted for Review":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-500" />
    case "Changes Requested":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case "Not Started":
      return <XCircle className="h-4 w-4 text-gray-400" />
    default:
      return <Clock className="h-4 w-4 text-gray-400" />
  }
}

export default function GroupPage({ params }: GroupPageProps) {
  const locale = useLocale()
  const t = useTranslations('coordinator.groups')
  const tDetails = useTranslations('coordinator.groupDetails')
  const group = mockGroups.find(g => g.id === params.groupId)

  if (!group) {
    return (
      <CoordinatorLayout>
        <PageWrapper>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('groupNotFound')}</h1>
            <p className="text-gray-600 mb-6">{t('groupNotFoundDescription')}</p>
            <Link href={`/${locale}/coordinator`}>
              <Button>{t('backToDashboard')}</Button>
            </Link>
          </div>
        </PageWrapper>
      </CoordinatorLayout>
    )
  }

  const stats = {
    total: group.participants.length,
    completed: group.participants.filter(p => p.pageStatus === "Ready for Approval").length,
    pending: group.participants.filter(p => p.pageStatus === "Submitted for Review").length,
    inProgress: group.participants.filter(p => p.pageStatus === "In Progress").length,
    changesRequested: group.participants.filter(p => p.pageStatus === "Changes Requested").length,
    notStarted: group.participants.filter(p => p.pageStatus === "Not Started").length
  }

  const canGeneratePDF = stats.completed === stats.total && stats.total > 0

  return (
    <CoordinatorLayout>
      <PageWrapper maxWidth="full">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href={`/${locale}/coordinator`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToDashboard')}
              </Button>
            </Link>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
              <p className="text-gray-600 mt-1">
                {t('created')} {new Date(group.createdAt).toLocaleDateString()} •
                {t('lastUpdated')} {new Date(group.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={`/${locale}/coordinator/groups/${group.id}/cover-editor`}>
                <Button variant="outline">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {tDetails('actions.editCover')}
                </Button>
              </Link>
              <Link href={`/${locale}/coordinator/groups/${group.id}/settings`}>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  {tDetails('actions.groupSettings')}
                </Button>
              </Link>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {tDetails('actions.addParticipant')}
              </Button>
              {canGeneratePDF && (
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  {tDetails('actions.generatePdf')}
                </Button>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{tDetails('totalParticipants')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-600">{tDetails('completedPages')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-yellow-600">{tDetails('pendingReviews')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-600">{tDetails('inProgressPages')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-600">Changes Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.changesRequested}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Not Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{stats.notStarted}</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ 
                      width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {stats.completed} of {stats.total} participants have completed their pages
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Participants List */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Participants</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage participant pages and review submissions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Filter by Status
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.participants.map((participant) => (
                  <div 
                    key={participant.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(participant.pageStatus)}
                        <div>
                          <h3 className="font-medium">{participant.name}</h3>
                          <p className="text-sm text-gray-600">{participant.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {getStatusBadge(participant.pageStatus)}
                        <p className="text-xs text-gray-500 mt-1">
                          Updated {new Date(participant.updatedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {participant.pageStatus === "Submitted for Review" && (
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        )}
                        
                        {participant.pageContent && (
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        )}

                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {group.participants.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="font-medium mb-2">No participants yet</h3>
                    <p className="text-sm">Add participants to get started with your yearbook.</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Participant
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}