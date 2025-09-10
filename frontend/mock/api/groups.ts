import { Group, Participant, PageContent, PageStatus } from "@/types"
import { mockGroups, mockParticipants } from "../data/groups"

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockGroupsAPI = {
  // Get all groups
  async getGroups(): Promise<Group[]> {
    await delay(500)
    return mockGroups
  },

  // Get specific group by ID
  async getGroup(id: string): Promise<Group | null> {
    await delay(300)
    return mockGroups.find(group => group.id === id) || null
  },

  // Create new group
  async createGroup(groupData: Omit<Group, "id" | "createdAt" | "updatedAt" | "participants">): Promise<Group> {
    await delay(800)
    const newGroup: Group = {
      ...groupData,
      id: `group-${Date.now()}`,
      participants: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockGroups.push(newGroup)
    return newGroup
  },

  // Update group cover
  async updateGroupCover(groupId: string, coverData: { coverImage?: string; coverTitle?: string }): Promise<Group> {
    await delay(600)
    const group = mockGroups.find(g => g.id === groupId)
    if (!group) throw new Error("Group not found")
    
    Object.assign(group, coverData, { updatedAt: new Date().toISOString() })
    return group
  },

  // Generate PDF (mock)
  async generatePDF(groupId: string): Promise<{ url: string }> {
    await delay(3000) // Simulate longer processing time
    return { url: `https://yearbook.example.com/downloads/${groupId}.pdf` }
  }
}

export const mockParticipantsAPI = {
  // Get participants for a group
  async getParticipants(groupId: string): Promise<Participant[]> {
    await delay(400)
    return mockParticipants.filter(p => p.groupId === groupId)
  },

  // Get specific participant
  async getParticipant(participantId: string): Promise<Participant | null> {
    await delay(300)
    return mockParticipants.find(p => p.id === participantId) || null
  },

  // Add participant to group
  async addParticipant(groupId: string, participantData: Omit<Participant, "id" | "createdAt" | "updatedAt" | "accessLink" | "groupId">): Promise<Participant> {
    await delay(700)
    const newParticipant: Participant = {
      ...participantData,
      id: `participant-${Date.now()}`,
      accessLink: `https://yearbook.example.com/participant/${Date.now()}`,
      groupId,
      pageStatus: "Not Started",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockParticipants.push(newParticipant)
    
    // Add to group
    const group = mockGroups.find(g => g.id === groupId)
    if (group) {
      group.participants.push(newParticipant)
      group.updatedAt = new Date().toISOString()
    }
    
    return newParticipant
  },

  // Update participant page status
  async updateParticipantStatus(participantId: string, status: PageStatus): Promise<Participant> {
    await delay(400)
    const participant = mockParticipants.find(p => p.id === participantId)
    if (!participant) throw new Error("Participant not found")
    
    participant.pageStatus = status
    participant.updatedAt = new Date().toISOString()
    return participant
  },

  // Update participant page content
  async updateParticipantContent(participantId: string, content: Partial<PageContent>): Promise<Participant> {
    await delay(800)
    const participant = mockParticipants.find(p => p.id === participantId)
    if (!participant) throw new Error("Participant not found")
    
    if (participant.pageContent) {
      Object.assign(participant.pageContent, content, { updatedAt: new Date().toISOString() })
    } else {
      participant.pageContent = {
        id: `content-${Date.now()}`,
        participantId,
        content: { time: Date.now(), blocks: [], version: "2.28.2" },
        images: [],
        bio: "",
        quote: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...content
      }
    }
    
    participant.updatedAt = new Date().toISOString()
    if (participant.pageStatus === "Not Started") {
      participant.pageStatus = "In Progress"
    }
    
    return participant
  },

  // Submit page for review
  async submitForReview(participantId: string): Promise<Participant> {
    await delay(500)
    return this.updateParticipantStatus(participantId, "Submitted for Review")
  }
}

export const mockReviewAPI = {
  // Approve participant page
  async approvePage(participantId: string): Promise<Participant> {
    await delay(400)
    return mockParticipantsAPI.updateParticipantStatus(participantId, "Ready for Approval")
  },

  // Request changes to participant page
  async requestChanges(participantId: string, feedback?: string): Promise<Participant> {
    await delay(400)
    // In a real app, we'd store the feedback
    console.log(`Feedback for ${participantId}:`, feedback)
    return mockParticipantsAPI.updateParticipantStatus(participantId, "Changes Requested")
  }
}