"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('coordinator.settings')
  const common = useTranslations('common')
  
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
        <CardTitle>{t('notificationPreferences')}</CardTitle>
        <CardDescription>
          {t('notificationDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">Email {t('notificationPreferences')}</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailSubmissions" className="text-sm font-normal">
                    {t('notifications.emailSubmissions')}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t('notifications.emailSubmissionsDesc')}
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
                    {t('notifications.emailApprovals')}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t('notifications.emailApprovalsDesc')}
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
                    {t('notifications.emailReminders')}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t('notifications.emailRemindersDesc')}
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
                    {t('notifications.weeklyReports')}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t('notifications.weeklyReportsDesc')}
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
            <h4 className="text-sm font-medium text-gray-900 mb-3">{t('notifications.pushNotifications')}</h4>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications" className="text-sm font-normal">
                  {t('notifications.pushNotifications')}
                </Label>
                <p className="text-xs text-gray-500">
                  {t('notifications.pushNotificationsDesc')}
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
              {t('notifications.note')}
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
                  {common('status.updating')}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t('savePreferences')}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}