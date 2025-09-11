"use client"

import Link from "next/link"
import { useLocale, useTranslations } from 'next-intl'
import { AppHeader } from "@/components/layout/app-header"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCheck, ArrowLeft, ExternalLink } from "lucide-react"

export default function ParticipantAccessPage() {
  const locale = useLocale()
  const t = useTranslations('participant.access')
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <AppHeader />
      
      <PageWrapper>
        <div className="max-w-md mx-auto pt-12">
          <Link href={`/${locale}`} className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToHome')}
          </Link>

          <Card>
            <CardHeader className="text-center">
              <UserCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">{t('title')}</CardTitle>
              <p className="text-gray-600">
                {t('description')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="accessLink">{t('accessLinkLabel')}</Label>
                <Input
                  id="accessLink"
                  placeholder={t('accessLinkPlaceholder')}
                  className="text-center"
                />
                <p className="text-xs text-gray-500">
                  {t('accessLinkHelp')}
                </p>
              </div>

              <Button className="w-full">
                {t('accessButton')}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  {t('noAccessLink')}
                </p>
                <p className="text-xs text-gray-500">
                  {t('contactCoordinator')}
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-600 mb-4">{t('tryDemo')}</p>
                <Link href={`/${locale}/participant/demo`}>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t('viewDemo')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    </div>
  )
}