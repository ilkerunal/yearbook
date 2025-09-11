"use client"

import { useTranslations } from 'next-intl'
import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { mockGroups } from "@/mock"
import { ArrowLeft, Save, Trash2, Users, Link as LinkIcon } from "lucide-react"
import Link from "next/link"

interface GroupSettingsPageProps {
  params: {
    locale: string
    groupId: string
  }
}

export default function GroupSettingsPage({ params }: GroupSettingsPageProps) {
  const t = useTranslations('coordinator.groupDetails')
  const common = useTranslations('common')
  const errors = useTranslations('errors')
  
  const group = mockGroups.find(g => g.id === params.groupId)

  if (!group) {
    return (
      <CoordinatorLayout>
        <PageWrapper>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{errors('groupNotFound')}</h1>
            <Link href={`/${params.locale}/coordinator/groups`}>
              <Button>{errors('backToGroups')}</Button>
            </Link>
          </div>
        </PageWrapper>
      </CoordinatorLayout>
    )
  }

  return (
    <CoordinatorLayout>
      <PageWrapper maxWidth="2xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href={`/${params.locale}/coordinator/groups/${group.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToGroup')}
              </Button>
            </Link>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('groupSettings')}</h1>
            <p className="text-gray-600 mt-1">{group.name}</p>
          </div>

          <div className="space-y-8">
            {/* Basic Settings */}
            <Card>
              <CardHeader>
                <CardTitle>{t('basicInformation')}</CardTitle>
                <CardDescription>
                  {t('updateGroupInfo')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="groupName">{t('groupName')}</Label>
                  <Input id="groupName" defaultValue={group.name} />
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    {t('saveChanges')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Participant Management */}
            <Card>
              <CardHeader>
                <CardTitle>{t('participantManagement')}</CardTitle>
                <CardDescription>
                  {t('participantManagementDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{t('currentParticipants')}</h3>
                    <p className="text-sm text-gray-600">{group.participants.length} {t('totalParticipants')}</p>
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    {t('addParticipants')}
                  </Button>
                </div>

                <div className="space-y-3">
                  {group.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        <div className="text-sm text-gray-600">{participant.email}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          participant.pageStatus === "Ready for Approval" ? "success" :
                          participant.pageStatus === "Submitted for Review" ? "warning" :
                          participant.pageStatus === "In Progress" ? "secondary" :
                          participant.pageStatus === "Changes Requested" ? "destructive" :
                          "outline"
                        }>
                          {participant.pageStatus}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="h-4 w-4 mr-2" />
                          {t('copyLink')}
                        </Button>
                        <Button variant="ghost" size="sm">
                          {t('remove')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cover Settings */}
            <Card>
              <CardHeader>
                <CardTitle>{t('coverDesign')}</CardTitle>
                <CardDescription>
                  {t('coverDesignDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coverTitle">{t('coverTitle')}</Label>
                  <Input id="coverTitle" defaultValue={group.coverTitle || ""} />
                </div>
                
                {group.coverImage && (
                  <div className="space-y-2">
                    <Label>{t('currentCoverImage')}</Label>
                    <img 
                      src={group.coverImage} 
                      alt="Current cover" 
                      className="h-32 w-auto rounded-lg border"
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Link href={`/${params.locale}/coordinator/groups/${group.id}/cover-editor`}>
                    <Button variant="outline">
                      {t('editCoverDesign')}
                    </Button>
                  </Link>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    {t('saveCoverSettings')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* PDF Generation */}
            <Card>
              <CardHeader>
                <CardTitle>{t('pdfGeneration')}</CardTitle>
                <CardDescription>
                  {t('pdfGenerationDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">{t('generationStatus')}</h4>
                  <p className="text-sm text-blue-800">
                    {group.participants.filter(p => p.pageStatus === "Ready for Approval").length} {t('of')} {group.participants.length} {t('pagesReadyForPdf')}.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    disabled={group.participants.some(p => p.pageStatus !== "Ready for Approval")}
                  >
                    {t('generatePdfNow')}
                  </Button>
                  <Button variant="outline">
                    {t('downloadPreviousPdf')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700">{t('dangerZone')}</CardTitle>
                <CardDescription>
                  {t('irreversibleActions')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-red-700">{t('deleteGroup')}</h4>
                    <p className="text-sm text-gray-600">
                      {t('deleteGroupDesc')}
                    </p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('deleteGroup')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}