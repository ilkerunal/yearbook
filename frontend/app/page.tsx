import Link from "next/link"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, BookOpen, ArrowRight } from "lucide-react"

export default function Home() {
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
            Digital Yearbook Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform yearbook creation from a manual, chaotic process into a streamlined, 
            automated, and digital one with added customization and clear progress tracking.
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Choose Your Role
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Coordinator Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-2xl">Coordinator Dashboard</CardTitle>
                <CardDescription className="text-lg">
                  Manage yearbook projects and coordinate with participants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    Create and manage yearbook groups
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    Review and approve participant pages
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    Design custom covers
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500" />
                    Generate final PDF yearbooks
                  </li>
                </ul>
                <Link href="/coordinator" className="block">
                  <Button className="w-full mt-6" size="lg">
                    Access Coordinator Dashboard
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
                <CardTitle className="text-2xl">Participant Editor</CardTitle>
                <CardDescription className="text-lg">
                  Create your personalized yearbook page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    Design your personal page layout
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    Upload photos and memories
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    Write your bio and favorite quotes
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    Submit for coordinator review
                  </li>
                </ul>
                <Link href="/participant/demo" className="block">
                  <Button variant="outline" className="w-full mt-6" size="lg">
                    Try Participant Editor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800">
            Key Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Collaborative</h4>
              <p className="text-gray-600">Multiple participants can work on their pages simultaneously</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Easy to Use</h4>
              <p className="text-gray-600">Intuitive editors make page creation simple and fun</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Quality Control</h4>
              <p className="text-gray-600">Review and approval system ensures high-quality results</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}