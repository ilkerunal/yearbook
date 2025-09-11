"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from 'next-intl'
import { personalInfoSchema, type PersonalInfoFormData } from "@/lib/validations/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, Loader2 } from "lucide-react"

interface PersonalInfoFormProps {
  onSubmit: (data: PersonalInfoFormData) => Promise<void>
  defaultValues?: Partial<PersonalInfoFormData>
  isLoading?: boolean
}

export function PersonalInfoForm({ onSubmit, defaultValues, isLoading = false }: PersonalInfoFormProps) {
  const t = useTranslations('coordinator.settings')
  const common = useTranslations('common')
  
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      school: "",
      role: "",
      ...defaultValues,
    },
  })

  const handleSubmit = async (data: PersonalInfoFormData) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error("Failed to update personal information:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('personalInformation')}</CardTitle>
        <CardDescription>
          {t('personalInfoDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{common('fields.fullName')} *</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder={common('placeholders.enterFullName')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{common('fields.email')} *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder={common('placeholders.enterEmail')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{common('fields.phone')}</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder={common('placeholders.enterPhone')}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">{common('fields.school')}/{common('fields.organization')} *</Label>
            <Input
              id="school"
              {...form.register("school")}
              placeholder={common('placeholders.enterSchool')}
            />
            {form.formState.errors.school && (
              <p className="text-sm text-red-600">
                {form.formState.errors.school.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">{common('fields.role')}/Unvan *</Label>
            <Input
              id="role"
              {...form.register("role")}
              placeholder={common('placeholders.enterRole')}
            />
            {form.formState.errors.role && (
              <p className="text-sm text-red-600">
                {form.formState.errors.role.message}
              </p>
            )}
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
                  {t('saveChanges')}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}