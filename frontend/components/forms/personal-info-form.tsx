"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your basic information and contact details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Enter your full name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="Enter your email address"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="Enter your phone number"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">School/Organization *</Label>
            <Input
              id="school"
              {...form.register("school")}
              placeholder="Enter your school or organization"
            />
            {form.formState.errors.school && (
              <p className="text-sm text-red-600">
                {form.formState.errors.school.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role/Title *</Label>
            <Input
              id="role"
              {...form.register("role")}
              placeholder="Enter your role or title"
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
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}