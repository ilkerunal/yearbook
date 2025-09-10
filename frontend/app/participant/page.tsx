import Link from "next/link"
import { AppHeader } from "@/components/layout/app-header"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserCheck, ArrowLeft, ExternalLink } from "lucide-react"

export default function ParticipantAccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <AppHeader />
      
      <PageWrapper>
        <div className="max-w-md mx-auto pt-12">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <Card>
            <CardHeader className="text-center">
              <UserCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Participant Access</CardTitle>
              <p className="text-gray-600">
                Enter your access link or token to create your yearbook page
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="accessLink">Access Link or Token</Label>
                <Input
                  id="accessLink"
                  placeholder="Enter your access link or token..."
                  className="text-center"
                />
                <p className="text-xs text-gray-500">
                  This should have been provided by your coordinator
                </p>
              </div>

              <Button className="w-full">
                Access My Page
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Don&apos;t have an access link?
                </p>
                <p className="text-xs text-gray-500">
                  Contact your yearbook coordinator to get your personalized access link.
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-600 mb-4">Try the demo:</p>
                <Link href="/participant/demo">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Demo Participant Page
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