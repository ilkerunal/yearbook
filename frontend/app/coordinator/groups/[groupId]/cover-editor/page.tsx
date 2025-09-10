"use client"

import { useState } from "react"
import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockGroups } from "@/mock"
import { useUpdateGroup } from "@/lib/hooks/useGroups"
import { 
  ArrowLeft, 
  Upload, 
  Download, 
  Save, 
  Eye,
  Palette,
  Type,
  Image as ImageIcon,
  RotateCcw
} from "lucide-react"
import Link from "next/link"

interface CoverEditorPageProps {
  params: {
    groupId: string
  }
}

export default function CoverEditorPage({ params }: CoverEditorPageProps) {
  const group = mockGroups.find(g => g.id === params.groupId)
  const updateGroupMutation = useUpdateGroup(params.groupId)
  
  const [coverTitle, setCoverTitle] = useState(group?.coverTitle || "")
  const [coverImage, setCoverImage] = useState(group?.coverImage || "")
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 })
  const [fontSize, setFontSize] = useState(48)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  if (!group) {
    return (
      <CoordinatorLayout>
        <PageWrapper>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Group Not Found</h1>
            <Link href="/coordinator/groups">
              <Button>Back to Groups</Button>
            </Link>
          </div>
        </PageWrapper>
      </CoordinatorLayout>
    )
  }

  const handleSave = async () => {
    try {
      await updateGroupMutation.mutateAsync({
        coverTitle,
        coverImage: coverImage || undefined
      })
      setHasUnsavedChanges(false)
    } catch (error) {
      console.error("Failed to save cover:", error)
    }
  }

  const handleImageUpload = () => {
    // Mock image upload - in real app would handle file upload
    const mockImageUrl = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
    setCoverImage(mockImageUrl)
    setHasUnsavedChanges(true)
  }

  const handleTitleChange = (value: string) => {
    setCoverTitle(value)
    setHasUnsavedChanges(true)
  }

  const resetToDefaults = () => {
    setCoverTitle(group.coverTitle || "")
    setCoverImage(group.coverImage || "")
    setTextColor("#FFFFFF")
    setTextPosition({ x: 50, y: 50 })
    setFontSize(48)
    setHasUnsavedChanges(false)
  }

  return (
    <CoordinatorLayout>
      <PageWrapper maxWidth="full">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/coordinator/groups/${group.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Group
                </Button>
              </Link>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cover Editor</h1>
                <p className="text-gray-600 mt-1">{group.name}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={resetToDefaults}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!hasUnsavedChanges || updateGroupMutation.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                {updateGroupMutation.isPending ? "Saving..." : "Save Cover"}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cover Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cover Preview</CardTitle>
                  <CardDescription>
                    See how your yearbook cover will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: "3/4", minHeight: "600px" }}>
                    {/* Background Image */}
                    {coverImage ? (
                      <img 
                        src={coverImage} 
                        alt="Cover background"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
                        <div className="text-white text-center">
                          <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg opacity-75">Upload a background image</p>
                        </div>
                      </div>
                    )}

                    {/* Cover Title Overlay */}
                    {coverTitle && (
                      <div 
                        className="absolute cursor-move select-none"
                        style={{
                          left: `${textPosition.x}%`,
                          top: `${textPosition.y}%`,
                          transform: "translate(-50%, -50%)",
                          color: textColor,
                          fontSize: `${fontSize}px`,
                          fontWeight: "bold",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                          lineHeight: 1.2
                        }}
                      >
                        {coverTitle}
                      </div>
                    )}

                    {/* Design Grid Overlay (optional) */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                      <div className="grid grid-cols-3 grid-rows-3 h-full">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="border border-white border-dashed"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={handleImageUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Change Background
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Design Controls */}
            <div className="space-y-6">
              {/* Title Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Title Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="coverTitle">Cover Title</Label>
                    <Input
                      id="coverTitle"
                      value={coverTitle}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter yearbook title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="fontSize"
                        type="range"
                        min="24"
                        max="72"
                        value={fontSize}
                        onChange={(e) => {
                          setFontSize(Number(e.target.value))
                          setHasUnsavedChanges(true)
                        }}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-600 w-12">{fontSize}px</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={textColor}
                        onChange={(e) => {
                          setTextColor(e.target.value)
                          setHasUnsavedChanges(true)
                        }}
                        className="w-12 h-10 rounded border cursor-pointer"
                      />
                      <Input
                        value={textColor}
                        onChange={(e) => {
                          setTextColor(e.target.value)
                          setHasUnsavedChanges(true)
                        }}
                        placeholder="#FFFFFF"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Position Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Text Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Horizontal Position</Label>
                    <Input
                      type="range"
                      min="10"
                      max="90"
                      value={textPosition.x}
                      onChange={(e) => {
                        setTextPosition(prev => ({ ...prev, x: Number(e.target.value) }))
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Vertical Position</Label>
                    <Input
                      type="range"
                      min="10"
                      max="90"
                      value={textPosition.y}
                      onChange={(e) => {
                        setTextPosition(prev => ({ ...prev, y: Number(e.target.value) }))
                        setHasUnsavedChanges(true)
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 20, y: 20 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Top Left
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 50, y: 20 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Top Center
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 80, y: 20 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Top Right
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 20, y: 50 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Left
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 50, y: 50 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Center
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 80, y: 50 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Right
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 20, y: 80 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Bottom Left
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 50, y: 80 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Bottom Center
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 80, y: 80 })
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Bottom Right
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Background Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {coverImage && (
                    <div className="space-y-2">
                      <Label>Current Background</Label>
                      <img 
                        src={coverImage} 
                        alt="Background preview" 
                        className="w-full h-24 object-cover rounded border"
                      />
                    </div>
                  )}

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Background
                  </Button>

                  <p className="text-xs text-gray-500">
                    Recommended: 1200x1600px (3:4 ratio) for best print quality
                  </p>
                </CardContent>
              </Card>

              {/* Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCoverTitle("Class of 2024")
                        setTextPosition({ x: 50, y: 80 })
                        setTextColor("#FFFFFF")
                        setFontSize(56)
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Classic
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 20, y: 20 })
                        setTextColor("#FFD700")
                        setFontSize(42)
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Modern
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 50, y: 50 })
                        setTextColor("#FF6B6B")
                        setFontSize(48)
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Bold
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setTextPosition({ x: 80, y: 80 })
                        setTextColor("#87CEEB")
                        setFontSize(36)
                        setHasUnsavedChanges(true)
                      }}
                    >
                      Elegant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}