"use client"

import { ParticipantLayout } from "@/components/layout/participant-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockParticipants } from "@/mock"
import { 
  Save,
  Eye,
  Send,
  Image as ImageIcon,
  Type,
  Quote,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react"

interface ParticipantPageProps {
  params: {
    token: string
  }
}

function getStatusInfo(status: string) {
  switch (status) {
    case "Ready for Approval":
      return {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />,
        badge: <Badge variant="success">Ready for Approval</Badge>,
        description: "Your page has been approved and is ready for the final yearbook!"
      }
    case "Submitted for Review":
      return {
        icon: <Clock className="h-4 w-4 text-yellow-500" />,
        badge: <Badge variant="warning">Submitted for Review</Badge>,
        description: "Your page is being reviewed by the coordinator. You'll be notified of any changes needed."
      }
    case "In Progress":
      return {
        icon: <Clock className="h-4 w-4 text-blue-500" />,
        badge: <Badge variant="secondary">In Progress</Badge>,
        description: "Continue working on your page and submit it when you're ready for review."
      }
    case "Changes Requested":
      return {
        icon: <AlertCircle className="h-4 w-4 text-red-500" />,
        badge: <Badge variant="destructive">Changes Requested</Badge>,
        description: "The coordinator has requested some changes. Please review the feedback and update your page."
      }
    case "Not Started":
      return {
        icon: <Clock className="h-4 w-4 text-gray-400" />,
        badge: <Badge variant="outline">Not Started</Badge>,
        description: "Get started by adding your bio, photos, and memories to create your yearbook page."
      }
    default:
      return {
        icon: <Clock className="h-4 w-4 text-gray-400" />,
        badge: <Badge variant="outline">{status}</Badge>,
        description: "Continue working on your page."
      }
  }
}

export default function ParticipantPage({ params }: ParticipantPageProps) {
  // For demo purposes, we'll use the first participant
  // In reality, this would be matched by the token
  const participant = mockParticipants[0]

  if (!participant) {
    return (
      <ParticipantLayout>
        <PageWrapper>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Token Invalid</h1>
            <p className="text-gray-600 mb-6">
              The access link you used is invalid or has expired. Please contact your coordinator for a new link.
            </p>
          </div>
        </PageWrapper>
      </ParticipantLayout>
    )
  }

  const statusInfo = getStatusInfo(participant.pageStatus)
  const isReadOnly = participant.pageStatus === "Submitted for Review" || participant.pageStatus === "Ready for Approval"

  return (
    <ParticipantLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <PageWrapper maxWidth="full">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {participant.name}
                </h1>
                <p className="text-gray-600 mt-1">
                  Create your personalized yearbook page
                </p>
              </div>
              <div className="flex items-center gap-4">
                {statusInfo.badge}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  {!isReadOnly && (
                    <>
                      <Button variant="outline" size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save Draft
                      </Button>
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Submit for Review
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </PageWrapper>
        </div>

        <PageWrapper maxWidth="full">
          <div className="py-8 space-y-8">
            {/* Status Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  {statusInfo.icon}
                  <div>
                    <h3 className="font-medium">Page Status</h3>
                    <p className="text-sm text-gray-600">{statusInfo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Editor Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Type className="h-5 w-5" />
                      Personal Bio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {participant.pageContent?.bio ? (
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {participant.pageContent.bio}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="font-medium mb-2">Add Your Bio</h3>
                        <p className="text-sm">Tell your story! Share your achievements, interests, and what makes you unique.</p>
                        {!isReadOnly && (
                          <Button className="mt-4" variant="outline">
                            Write Your Bio
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quote Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Quote className="h-5 w-5" />
                      Favorite Quote
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {participant.pageContent?.quote ? (
                      <blockquote className="text-lg italic text-gray-700 border-l-4 border-blue-500 pl-4">
                        &ldquo;{participant.pageContent.quote}&rdquo;
                      </blockquote>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Quote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="font-medium mb-2">Add Your Favorite Quote</h3>
                        <p className="text-sm">Share an inspiring quote that represents you or your journey.</p>
                        {!isReadOnly && (
                          <Button className="mt-4" variant="outline">
                            Add Quote
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Content Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Story</CardTitle>
                    <p className="text-sm text-gray-600">
                      Use the editor below to add photos, text, and memories to your yearbook page.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {participant.pageContent?.content.blocks && participant.pageContent.content.blocks.length > 0 ? (
                      <div className="space-y-4">
                        {participant.pageContent.content.blocks.map((block, index) => (
                          <div key={block.id} className="border rounded-lg p-4">
                            {block.type === "header" && (
                              <h2 className="text-xl font-semibold">{block.data.text}</h2>
                            )}
                            {block.type === "paragraph" && (
                              <p className="text-gray-700 leading-relaxed">{block.data.text}</p>
                            )}
                            {block.type === "image" && block.data.file?.url && (
                              <div className="text-center">
                                <img 
                                  src={block.data.file.url} 
                                  alt={block.data.caption || "Page image"}
                                  className="max-w-full h-auto rounded-lg mx-auto"
                                />
                                {block.data.caption && (
                                  <p className="text-sm text-gray-600 mt-2 italic">{block.data.caption}</p>
                                )}
                              </div>
                            )}
                            {block.type === "list" && (
                              <ul className="list-disc list-inside space-y-1">
                                {block.data.items?.map((item: string, i: number) => (
                                  <li key={i} className="text-gray-700">{item}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <h3 className="font-medium mb-2">Start Building Your Page</h3>
                        <p className="text-sm mb-6">
                          Add photos, text blocks, and memories to create your unique yearbook page.
                        </p>
                        {!isReadOnly && (
                          <div className="flex justify-center gap-3">
                            <Button variant="outline">
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Add Photo
                            </Button>
                            <Button variant="outline">
                              <Type className="h-4 w-4 mr-2" />
                              Add Text
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Help Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Getting Started</h4>
                      <p className="text-xs text-gray-600">
                        Begin by writing your bio and adding a favorite quote, then use the editor to add photos and memories.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Photo Tips</h4>
                      <p className="text-xs text-gray-600">
                        Upload high-quality photos (at least 300 DPI) for the best print results.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Review Process</h4>
                      <p className="text-xs text-gray-600">
                        Once submitted, your coordinator will review your page and may request changes before final approval.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Photo Gallery */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Photo Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {participant.pageContent?.images && participant.pageContent.images.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {participant.pageContent.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">No photos uploaded yet</p>
                        {!isReadOnly && (
                          <Button size="sm" variant="outline" className="mt-2">
                            Upload Photos
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    </ParticipantLayout>
  )
}