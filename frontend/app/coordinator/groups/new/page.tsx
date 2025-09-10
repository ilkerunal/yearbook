"use client"

import { CoordinatorLayout } from "@/components/layout/coordinator-layout"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { Button } from "@/components/ui/button"
import { CreateGroupForm } from "@/components/forms/create-group-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateGroupPage() {
  return (
    <CoordinatorLayout>
      <PageWrapper maxWidth="2xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/coordinator/groups">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Groups
              </Button>
            </Link>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Group</h1>
            <p className="text-gray-600 mt-1">
              Set up a new yearbook group and invite participants
            </p>
          </div>

          <CreateGroupForm />
        </div>
      </PageWrapper>
    </CoordinatorLayout>
  )
}