"use client"

import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockGroups } from "@/mock"
import { 
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Download,
  Calendar,
  FileText
} from "lucide-react"

export default function ReportsPage() {
  const groups = mockGroups

  // Calculate overall statistics
  const totalGroups = groups.length
  const totalParticipants = groups.reduce((acc, group) => acc + group.participants.length, 0)
  const completedPages = groups.reduce((acc, group) => 
    acc + group.participants.filter(p => p.pageStatus === "Ready for Approval").length, 0
  )
  const pendingReview = groups.reduce((acc, group) => 
    acc + group.participants.filter(p => p.pageStatus === "Submitted for Review").length, 0
  )

  const completionRate = totalParticipants > 0 ? Math.round((completedPages / totalParticipants) * 100) : 0

  return (
    <CoordinatorLayout>
      <PageWrapper maxWidth="full">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">
                Overview of all yearbook projects and progress
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalGroups}</div>
                <p className="text-xs text-muted-foreground">
                  Active yearbook projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalParticipants}</div>
                <p className="text-xs text-muted-foreground">
                  Across all groups
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {completedPages} of {totalParticipants} complete
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingReview}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting review
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Group Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Group Progress Overview
                </CardTitle>
                <CardDescription>
                  Completion status across all groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groups.map((group) => {
                    const stats = {
                      total: group.participants.length,
                      completed: group.participants.filter(p => p.pageStatus === "Ready for Approval").length,
                    }
                    const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

                    return (
                      <div key={group.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium truncate">{group.name}</span>
                          <span className="text-muted-foreground">{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{stats.completed} completed</span>
                          <span>{stats.total} total</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates across all projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">5 pages approved today</p>
                      <p className="text-xs text-gray-500">Across 3 different groups</p>
                    </div>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New group created</p>
                      <p className="text-xs text-gray-500">Roosevelt Elementary - 6th Grade</p>
                    </div>
                    <span className="text-xs text-gray-500">1d ago</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">3 pages submitted for review</p>
                      <p className="text-xs text-gray-500">Westfield High School - Class of 2024</p>
                    </div>
                    <span className="text-xs text-gray-500">2d ago</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">PDF generated successfully</p>
                      <p className="text-xs text-gray-500">Middle School Memories - Class of 2024</p>
                    </div>
                    <span className="text-xs text-gray-500">3d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Group Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Group Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of each group&apos;s progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Group Name</th>
                      <th className="text-left py-3 px-4 font-medium">Participants</th>
                      <th className="text-left py-3 px-4 font-medium">Completed</th>
                      <th className="text-left py-3 px-4 font-medium">Pending Review</th>
                      <th className="text-left py-3 px-4 font-medium">Progress</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group) => {
                      const stats = {
                        total: group.participants.length,
                        completed: group.participants.filter(p => p.pageStatus === "Ready for Approval").length,
                        pending: group.participants.filter(p => p.pageStatus === "Submitted for Review").length,
                      }
                      const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
                      const canGeneratePDF = stats.completed === stats.total && stats.total > 0

                      return (
                        <tr key={group.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium">{group.name}</div>
                            <div className="text-xs text-gray-500">
                              Created {new Date(group.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">{stats.total}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {stats.completed}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-yellow-500" />
                              {stats.pending}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm">{percentage}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {canGeneratePDF ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Ready for PDF
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                In Progress
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}