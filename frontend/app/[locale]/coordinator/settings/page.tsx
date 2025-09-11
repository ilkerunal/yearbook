"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { SecuritySettingsForm } from "@/components/forms/security-settings-form"
import { NotificationSettingsForm } from "@/components/forms/notification-settings-form"
import { PersonalInfoFormData, SecuritySettingsFormData, NotificationSettingsFormData } from "@/lib/validations/settings"
import { 
  User, 
  Shield, 
  Palette, 
  Mail
} from "lucide-react"

export default function CoordinatorSettingsPage() {
  const t = useTranslations('coordinator.settings')
  const common = useTranslations('common')
  
  // Mock coordinator data
  const [profile] = useState({
    name: "Jennifer Adams",
    email: "j.adams@westfield.edu",
    phone: "+1 (555) 123-4567",
    school: "Westfield High School",
    role: "Yearbook Coordinator"
  })

  const handlePersonalInfoSubmit = async (data: PersonalInfoFormData) => {
    console.log("Updating personal info:", data)
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleSecuritySubmit = async (data: SecuritySettingsFormData) => {
    console.log("Updating password:", data)
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleNotificationSubmit = async (data: NotificationSettingsFormData) => {
    console.log("Updating notifications:", data)
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <CoordinatorLayout>
      <PageWrapper maxWidth="2xl">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
            <p className="text-gray-600 mt-1">
              {t('description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Settings */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information Form */}
              <PersonalInfoForm 
                onSubmit={handlePersonalInfoSubmit}
                defaultValues={profile}
              />

              {/* Security Settings Form */}
              <SecuritySettingsForm 
                onSubmit={handleSecuritySubmit}
              />

              {/* Notification Settings Form */}
              <NotificationSettingsForm 
                onSubmit={handleNotificationSubmit}
                defaultValues={{
                  emailSubmissions: true,
                  emailApprovals: true,
                  emailReminders: false,
                  pushNotifications: true,
                  weeklyReports: true
                }}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('accountOverview')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-medium">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.role}</p>
                    <Badge variant="secondary" className="mt-2">
                      {t('premiumAccount')}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{common('time.memberSince')}:</span>
                      <span>Jan 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('groupsCreated')}:</span>
                      <span>3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('totalParticipants')}:</span>
                      <span>127</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('quickActions')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    {t('exportData')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    {t('twoFactorAuth')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Palette className="h-4 w-4 mr-2" />
                    {t('customizeTheme')}
                  </Button>
                </CardContent>
              </Card>

              {/* Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('needHelp')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {t('helpDescription')}
                  </p>
                  <Button variant="outline" className="w-full">
                    {t('contactSupport')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}