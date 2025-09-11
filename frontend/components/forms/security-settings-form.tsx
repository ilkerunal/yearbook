"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from 'next-intl'
import { securitySettingsSchema, type SecuritySettingsFormData } from "@/lib/validations/settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Label, Input } from ".."
import { Save, Loader2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface SecuritySettingsFormProps {
  onSubmit: (data: SecuritySettingsFormData) => Promise<void>
  isLoading?: boolean
}

export function SecuritySettingsForm({ onSubmit, isLoading = false }: SecuritySettingsFormProps) {
  const t = useTranslations('coordinator.settings')
  const common = useTranslations('common')
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<SecuritySettingsFormData>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const handleSubmit = async (data: SecuritySettingsFormData) => {
    try {
      await onSubmit(data)
      form.reset()
    } catch (error) {
      console.error("Failed to update password:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('securitySettings')}</CardTitle>
        <CardDescription>
          {t('securityDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">{common('fields.currentPassword')} *</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                {...form.register("currentPassword")}
                placeholder={common('placeholders.enterCurrentPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {form.formState.errors.currentPassword && (
              <p className="text-sm text-red-600">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">{common('fields.newPassword')} *</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...form.register("newPassword")}
                placeholder={common('placeholders.enterNewPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {form.formState.errors.newPassword && (
              <p className="text-sm text-red-600">
                {form.formState.errors.newPassword.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {common('validation.passwordRequirements')}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{common('fields.confirmPassword')} *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...form.register("confirmPassword")}
                placeholder={common('placeholders.confirmNewPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-800">
              {t('securityTip')}
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
                  {t('updatePassword')}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}