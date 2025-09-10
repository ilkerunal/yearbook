import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <BookOpen className="h-16 w-16 text-blue-600" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                404
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <Link href="/coordinator" className="block">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">
              Common pages you might be looking for:
            </p>
            <div className="space-y-2 text-sm">
              <Link href="/coordinator/groups" className="block text-blue-600 hover:text-blue-800">
                • View All Groups
              </Link>
              <Link href="/coordinator/groups/new" className="block text-blue-600 hover:text-blue-800">
                • Create New Group
              </Link>
              <Link href="/participant" className="block text-blue-600 hover:text-blue-800">
                • Participant Access
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}