"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Label } from ".."
import { createGroupSchema, type CreateGroupFormData } from "@/lib/validations/group"
import { useCreateGroup } from "@/lib/hooks/useGroups"
import { Upload, X, Plus, Save, Loader2 } from "lucide-react"

interface CreateGroupFormProps {
  onSuccess?: (groupId: string) => void
  onCancel?: () => void
}

export function CreateGroupForm({ onSuccess, onCancel }: CreateGroupFormProps) {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('coordinator.forms.createGroup')
  const createGroupMutation = useCreateGroup()
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)

  const form = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      coverTitle: "",
      coverImage: "",
      participants: [{ name: "", email: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  })

  const handleImageUpload = () => {
    // Mock image upload - in real app would handle file upload
    const mockImageUrl = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
    setCoverImagePreview(mockImageUrl)
    form.setValue("coverImage", mockImageUrl)
  }

  const onSubmit = async (data: CreateGroupFormData) => {
    try {
      const newGroup = await createGroupMutation.mutateAsync({
        name: data.name,
        coverTitle: data.coverTitle || undefined,
        coverImage: data.coverImage || undefined,
      })

      if (onSuccess) {
        onSuccess(newGroup.id)
      } else {
        router.push(`/${locale}/coordinator/groups/${newGroup.id}`)
      }
    } catch (error) {
      console.error("Failed to create group:", error)
      // Error handling could be improved with toast notifications
    }
  }

  const addParticipant = () => {
    append({ name: "", email: "" })
  }

  const removeParticipant = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t('basicInfo.title')}</CardTitle>
          <CardDescription>
            {t('basicInfo.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">{t('fields.groupNameRequired')}</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder={t('placeholders.groupName')}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Cover Design */}
      <Card>
        <CardHeader>
          <CardTitle>{t('coverDesign.title')}</CardTitle>
          <CardDescription>
            {t('coverDesign.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coverTitle">{t('fields.coverTitle')}</Label>
            <Input
              id="coverTitle"
              {...form.register("coverTitle")}
              placeholder={t('placeholders.coverTitle')}
            />
            {form.formState.errors.coverTitle && (
              <p className="text-sm text-red-600">{form.formState.errors.coverTitle.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t('fields.coverImage')}</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              {coverImagePreview ? (
                <div className="relative">
                  <img 
                    src={coverImagePreview} 
                    alt="Cover preview" 
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setCoverImagePreview(null)
                      form.setValue("coverImage", "")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">
                    {t('coverDesign.uploadText')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t('coverDesign.fileInfo')}
                  </p>
                  <Button type="button" variant="outline" className="mt-4" onClick={handleImageUpload}>
                    {t('coverDesign.chooseFile')}
                  </Button>
                </div>
              )}
            </div>
            {form.formState.errors.coverImage && (
              <p className="text-sm text-red-600">{form.formState.errors.coverImage.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card>
        <CardHeader>
          <CardTitle>{t('participants.title')}</CardTitle>
          <CardDescription>
            {t('participants.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`participants.${index}.name`}>{t('fields.name')}</Label>
                <Input
                  id={`participants.${index}.name`}
                  {...form.register(`participants.${index}.name`)}
                  placeholder={t('placeholders.fullName')}
                />
                {form.formState.errors.participants?.[index]?.name && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.participants[index]?.name?.message}
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor={`participants.${index}.email`}>{t('fields.email')}</Label>
                <Input
                  id={`participants.${index}.email`}
                  type="email"
                  {...form.register(`participants.${index}.email`)}
                  placeholder={t('placeholders.email')}
                />
                {form.formState.errors.participants?.[index]?.email && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.participants[index]?.email?.message}
                  </p>
                )}
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="mt-7"
                  onClick={() => removeParticipant(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {form.formState.errors.participants?.root && (
            <p className="text-sm text-red-600">{form.formState.errors.participants.root.message}</p>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={addParticipant}
            className="w-full"
            disabled={fields.length >= 50}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('participants.addAnother')}
          </Button>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Not:</strong> {t('participants.note')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline"
          onClick={onCancel || (() => router.back())}
        >
          {t('actions.cancel')}
        </Button>
        <div className="flex gap-3">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              // Save as draft logic could be implemented here
              console.log("Saving as draft:", form.getValues())
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            {t('actions.saveAsDraft')}
          </Button>
          <Button 
            type="submit"
            disabled={createGroupMutation.isPending}
          >
            {createGroupMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('actions.creating')}
              </>
            ) : (
              t('actions.createGroup')
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}