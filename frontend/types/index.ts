export interface Group {
  id: string
  name: string
  coverImage?: string
  coverTitle?: string
  participants: Participant[]
  createdAt: string
  updatedAt: string
}

export interface Participant {
  id: string
  name: string
  email: string
  accessLink: string
  pageStatus: PageStatus
  pageContent?: PageContent
  groupId: string
  createdAt: string
  updatedAt: string
}

export type PageStatus = 
  | "Not Started"
  | "In Progress"
  | "Submitted for Review"
  | "Changes Requested"
  | "Ready for Approval"

export interface PageContent {
  id: string
  participantId: string
  content: EditorContent
  images: string[]
  bio: string
  quote: string
  createdAt: string
  updatedAt: string
}

export interface EditorContent {
  time: number
  blocks: EditorBlock[]
  version: string
}

export interface EditorBlock {
  id: string
  type: string
  data: Record<string, any>
}