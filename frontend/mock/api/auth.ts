// Mock authentication and authorization

export interface CoordinatorAuth {
  id: string
  name: string
  email: string
  role: "coordinator"
  groupIds: string[]
}

export interface ParticipantAuth {
  id: string
  name: string
  email: string
  role: "participant"
  participantId: string
  groupId: string
}

export type AuthUser = CoordinatorAuth | ParticipantAuth

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock users
const mockCoordinator: CoordinatorAuth = {
  id: "coord-1",
  name: "Ms. Jennifer Adams",
  email: "j.adams@westfield.edu",
  role: "coordinator",
  groupIds: ["group-1", "group-2"]
}

const mockParticipantUser: ParticipantAuth = {
  id: "user-1",
  name: "Alice Johnson", 
  email: "alice.johnson@school.edu",
  role: "participant",
  participantId: "participant-1",
  groupId: "group-1"
}

export const mockAuthAPI = {
  // Simulate coordinator login
  async loginCoordinator(email: string, password: string): Promise<CoordinatorAuth> {
    await delay(800)
    if (email === "j.adams@westfield.edu" && password === "password123") {
      return mockCoordinator
    }
    throw new Error("Invalid credentials")
  },

  // Simulate participant access via link
  async accessParticipantPage(token: string): Promise<ParticipantAuth> {
    await delay(600)
    // In reality, token would be validated against database
    if (token === "abc123") {
      return mockParticipantUser
    }
    throw new Error("Invalid or expired access link")
  },

  // Get current user (from stored session/token)
  async getCurrentUser(): Promise<AuthUser | null> {
    await delay(200)
    // Mock: return coordinator by default for demo
    // In reality, this would check stored JWT/session
    return mockCoordinator
  },

  // Logout
  async logout(): Promise<void> {
    await delay(300)
    // Clear stored session/token
  }
}

// Mock permissions
export const permissions = {
  canViewGroup(user: AuthUser, groupId: string): boolean {
    if (user.role === "coordinator") {
      return user.groupIds.includes(groupId)
    }
    return user.groupId === groupId
  },

  canEditGroup(user: AuthUser, groupId: string): boolean {
    return user.role === "coordinator" && user.groupIds.includes(groupId)
  },

  canReviewPages(user: AuthUser, groupId: string): boolean {
    return user.role === "coordinator" && user.groupIds.includes(groupId)
  },

  canEditParticipantPage(user: AuthUser, participantId: string): boolean {
    if (user.role === "coordinator") return true
    return user.role === "participant" && user.participantId === participantId
  }
}