"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { notificationSettingsSchema, type NotificationSettingsFormData } from "@/lib/validations/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save, Loader2 } from "lucide-react"

interface NotificationSettingsFormProps {
  onSubmit: (data: NotificationSettingsFormData) => Promise<void>
  defaultValues?: Partial<NotificationSettingsFormData>
  isLoading?: boolean
}

export function NotificationSettingsForm({ onSubmit, defaultValues, isLoading = false }: NotificationSettingsFormProps) {
  const form = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailSubmissions: true,
      emailApprovals: true,
      emailReminders: true,
      pushNotifications: false,
      weeklyReports: true,
      ...defaultValues,
    },
  })

  const handleSubmit = async (data: NotificationSettingsFormData) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error("Failed to update notification settings:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Choose which notifications you&apos;d like to receive
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailSubmissions" className="text-sm font-normal">
                    New Page Submissions
                  </Label>
                  <p className="text-xs text-gray-500">
                    Get notified when participants submit new pages
                  </p>
                </div>
                <input
                  id="emailSubmissions"
                  type="checkbox"
                  {...form.register("emailSubmissions")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailApprovals" className="text-sm font-normal">
                    Page Approvals
                  </Label>
                  <p className="text-xs text-gray-500">
                    Get notified when pages are approved or need changes
                  </p>
                </div>
                <input
                  id="emailApprovals"
                  type="checkbox"
                  {...form.register("emailApprovals")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailReminders" className="text-sm font-normal">
                    Deadline Reminders
                  </Label>
                  <p className="text-xs text-gray-500">
                    Get reminders about upcoming deadlines
                  </p>
                </div>
                <input
                  id="emailReminders"
                  type="checkbox"
                  {...form.register("emailReminders")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weeklyReports" className="text-sm font-normal">
                    Weekly Reports
                  </Label>
                  <p className="text-xs text-gray-500">
                    Receive weekly progress summaries
                  </p>
                </div>
                <input
                  id="weeklyReports"
                  type="checkbox"
                  {...form.register("weeklyReports")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Push Notifications</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications" className="text-sm font-normal">
                  Browser Notifications
                </Label>
                <p className="text-xs text-gray-500">
                  Receive instant notifications in your browser
                </p>
              </div>
              <input
                id="pushNotifications"
                type="checkbox"
                {...form.register("pushNotifications")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You can always change these settings later. Email notifications
              help you stay on top of your yearbook&apos;s progress.
            </p>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting || isLoading}
            >
              {form.formState.isSubmitting || isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}