import Link from "next/link"
import { getTranslations } from 'next-intl/server';
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, BookOpen, ArrowRight } from "lucide-react"

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const t = await getTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <BookOpen className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('metadata.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('metadata.description')}
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            {t('home.chooseRole')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Coordinator Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-2xl">{t('home.coordinator.title')}</CardTitle>
                <CardDescription className="text-lg">
                  {t('home.coordinator.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    {t('home.coordinator.features.manageGroups')}
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    {t('home.coordinator.features.reviewPages')}
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    {t('home.coordinator.features.designCovers')}
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    {t('home.coordinator.features.generatePdf')}
                  </li>
                </ul>
                <Link href={`/${locale}/coordinator`} className="block">
                  <Button className="w-full mt-6" size="lg">
                    {t('home.coordinator.button')}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Participant Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <UserCheck className="h-12 w-12 text-green-600 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-2xl">{t('home.participant.title')}</CardTitle>
                <CardDescription className="text-lg">
                  {t('home.participant.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    {t('home.participant.features.designLayout')}
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    {t('home.participant.features.uploadPhotos')}
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    {t('home.participant.features.writeBio')}
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    {t('home.participant.features.submitReview')}
                  </li>
                </ul>
                <Link href={`/${locale}/participant/demo`} className="block">
                  <Button variant="outline" className="w-full mt-6" size="lg">
                    {t('home.participant.button')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800">
            {t('home.features.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">{t('home.features.collaborative.title')}</h4>
              <p className="text-gray-600">{t('home.features.collaborative.description')}</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">{t('home.features.easyToUse.title')}</h4>
              <p className="text-gray-600">{t('home.features.easyToUse.description')}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">{t('home.features.qualityControl.title')}</h4>
              <p className="text-gray-600">{t('home.features.qualityControl.description')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}