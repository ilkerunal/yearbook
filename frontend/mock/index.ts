// Central mock API exports
export { mockGroupsAPI, mockParticipantsAPI, mockReviewAPI } from "./api/groups"
export { mockAuthAPI, permissions } from "./api/auth"
export { mockGroups, mockParticipants, mockPageContent } from "./data/groups"

export type { CoordinatorAuth, ParticipantAuth, AuthUser } from "./api/auth"

// Feature flags for development
export const mockConfig = {
  enableMockDelay: true,
  enableMockErrors: false, // Set to true to test error handling
  defaultCoordinatorLogin: {
    email: "j.adams@westfield.edu",
    password: "password123"
  },
  defaultParticipantToken: "abc123"
}