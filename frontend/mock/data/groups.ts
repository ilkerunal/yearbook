import { Group, Participant, PageContent } from "@/types"

export const mockPageContent: PageContent = {
  id: "content-1",
  participantId: "participant-1",
  content: {
    time: 1672531200000,
    blocks: [
      {
        id: "block-1",
        type: "header",
        data: {
          text: "My Senior Year Journey",
          level: 2
        }
      },
      {
        id: "block-2", 
        type: "paragraph",
        data: {
          text: "This year has been absolutely incredible! From late-night study sessions to unforgettable memories with friends, I couldn't have asked for a better way to end high school."
        }
      },
      {
        id: "block-3",
        type: "image",
        data: {
          file: {
            url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop"
          },
          caption: "Graduation day with my best friends"
        }
      },
      {
        id: "block-4",
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Captain of the debate team",
            "Volunteer at local animal shelter", 
            "Part-time job at the bookstore",
            "Member of the drama club"
          ]
        }
      }
    ],
    version: "2.28.2"
  },
  images: [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  ],
  bio: "Future computer science major at State University. Passionate about technology, debate, and helping animals. Can't wait to see what the future holds!",
  quote: "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-20T14:45:00Z"
}

export const mockParticipants: Participant[] = [
  {
    id: "participant-1",
    name: "Alice Johnson",
    email: "alice.johnson@school.edu",
    accessLink: "https://yearbook.example.com/participant/abc123",
    pageStatus: "Ready for Approval",
    pageContent: mockPageContent,
    groupId: "group-1",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-20T14:45:00Z"
  },
  {
    id: "participant-2", 
    name: "Bob Smith",
    email: "bob.smith@school.edu",
    accessLink: "https://yearbook.example.com/participant/def456",
    pageStatus: "Submitted for Review",
    pageContent: {
      ...mockPageContent,
      id: "content-2",
      participantId: "participant-2",
      bio: "Aspiring musician and math enthusiast. Lead guitarist in the school band and captain of the math team.",
      quote: "Music is the universal language of mankind. - Henry Wadsworth Longfellow"
    },
    groupId: "group-1",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z"
  },
  {
    id: "participant-3",
    name: "Carol Davis",
    email: "carol.davis@school.edu", 
    accessLink: "https://yearbook.example.com/participant/ghi789",
    pageStatus: "In Progress",
    groupId: "group-1",
    createdAt: "2024-01-10T09:30:00Z",
    updatedAt: "2024-01-15T11:00:00Z"
  },
  {
    id: "participant-4",
    name: "David Wilson",
    email: "david.wilson@school.edu",
    accessLink: "https://yearbook.example.com/participant/jkl012", 
    pageStatus: "Changes Requested",
    pageContent: {
      ...mockPageContent,
      id: "content-4",
      participantId: "participant-4",
      bio: "Star athlete and honor student. Varsity basketball team captain and National Honor Society member.",
      quote: "Champions aren't made in the gyms. Champions are made from something deep inside - desire, dream, vision."
    },
    groupId: "group-1",
    createdAt: "2024-01-10T09:45:00Z",
    updatedAt: "2024-01-22T08:30:00Z"
  },
  {
    id: "participant-5",
    name: "Emma Brown",
    email: "emma.brown@school.edu",
    accessLink: "https://yearbook.example.com/participant/mno345",
    pageStatus: "Not Started",
    groupId: "group-1", 
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z"
  }
]

export const mockGroups: Group[] = [
  {
    id: "group-1",
    name: "Westfield High School - Class of 2024",
    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    coverTitle: "Forever Eagles - Class of 2024",
    participants: mockParticipants,
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-22T08:30:00Z"
  },
  {
    id: "group-2",
    name: "Roosevelt Elementary - 6th Grade Graduation",
    coverImage: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop",
    coverTitle: "Growing Together - 6th Grade Class", 
    participants: [],
    createdAt: "2024-02-01T08:00:00Z",
    updatedAt: "2024-02-01T08:00:00Z"
  }
]