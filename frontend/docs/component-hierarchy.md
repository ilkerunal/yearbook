# Component Hierarchy & Architecture

## Component Organization

### 1. Layout Components (`/components/layout`)
```
/layout
├── app-header.tsx             # Main navigation header
├── coordinator-sidebar.tsx    # Coordinator navigation sidebar  
├── page-wrapper.tsx          # Common page layout wrapper
├── mobile-menu.tsx           # Mobile navigation menu
└── footer.tsx                # Site footer
```

### 2. UI Components (`/components/ui`) 
*Shadcn UI components - already configured*
```
/ui
├── button.tsx               # Button variants
├── card.tsx                 # Card layouts
├── input.tsx                # Form inputs
├── select.tsx               # Dropdown selects
├── dialog.tsx               # Modal dialogs
├── toast.tsx                # Notifications
├── badge.tsx                # Status badges
├── progress.tsx             # Progress indicators
├── skeleton.tsx             # Loading skeletons
└── table.tsx                # Data tables
```

### 3. Form Components (`/components/forms`)
```
/forms
├── group-create-form.tsx     # Create new group
├── participant-add-form.tsx  # Add participant to group
├── cover-editor-form.tsx     # Cover design form
├── login-form.tsx            # Coordinator login
├── participant-access-form.tsx # Participant access by token
└── form-field.tsx            # Reusable form field wrapper
```

### 4. Dashboard Components (`/components/dashboard`)
```
/dashboard
├── group-card.tsx            # Group overview card
├── participant-list.tsx      # Participants table/list
├── status-badge.tsx          # Page status indicator
├── status-filter.tsx         # Filter by status
├── activity-feed.tsx         # Recent activity
├── stats-summary.tsx         # Dashboard statistics
├── quick-actions.tsx         # Quick action buttons
└── pdf-generator.tsx         # PDF generation interface
```

### 5. Participant Components (`/components/participant`)
```
/participant
├── page-editor.tsx           # Main editor component
├── editor-toolbar.tsx        # Editor action buttons
├── content-preview.tsx       # Read-only content preview
├── bio-editor.tsx            # Bio text editor
├── quote-editor.tsx          # Quote text editor
├── image-gallery.tsx         # Image upload/gallery
├── submit-review-dialog.tsx  # Submit for review modal
└── status-indicator.tsx      # Current page status
```

### 6. Editor Components (`/components/editor`)
```
/editor
├── yearbook-editor.tsx       # Main Editor.js wrapper
├── editor-blocks/            # Custom Editor.js blocks
│   ├── header-block.tsx     # Custom header block
│   ├── paragraph-block.tsx  # Custom paragraph block
│   ├── image-block.tsx      # Custom image block
│   ├── list-block.tsx       # Custom list block
│   └── quote-block.tsx      # Custom quote block
├── editor-config.tsx         # Editor.js configuration
├── block-toolbar.tsx         # Custom block toolbar
└── editor-utils.ts           # Editor helper functions
```

### 7. Review Components (`/components/review`)
```
/review
├── review-layout.tsx         # Side-by-side review layout
├── participant-preview.tsx   # Participant page preview
├── review-actions.tsx        # Approve/request changes
├── comment-system.tsx        # Review comments
├── review-history.tsx        # Previous review history
├── feedback-form.tsx         # Feedback input form
└── bulk-review.tsx           # Bulk action interface
```

### 8. Shared Components (`/components/shared`)
```
/shared
├── loading-spinner.tsx       # Loading indicator
├── error-boundary.tsx        # Error boundary wrapper
├── empty-state.tsx           # Empty state illustration
├── confirmation-dialog.tsx   # Confirmation modal
├── image-upload.tsx          # Image upload component
├── status-timeline.tsx       # Status change timeline
├── search-filter.tsx         # Search and filter bar
└── pagination.tsx            # Table pagination
```

## Hooks Organization (`/lib/hooks`)

### 1. Data Hooks
```typescript
// Group management
useGroups()                   // Fetch all groups
useGroup(id)                  // Fetch single group
useCreateGroup()              // Create group mutation
useUpdateGroup()              // Update group mutation

// Participant management  
useParticipants(groupId)      // Fetch group participants
useParticipant(id)            // Fetch single participant
useAddParticipant()           // Add participant mutation
useUpdateParticipantStatus()  // Update status mutation
useUpdateParticipantContent() // Update content mutation

// Review system
useReviewActions()            // Approve/request changes
useReviewHistory(participantId) // Review history

// PDF generation
useGeneratePDF()              // Generate PDF mutation
```

### 2. UI Hooks
```typescript
useAuth()                     // Authentication state
useToast()                    // Toast notifications
useLocalStorage()             // Local storage state
useDebounce()                 // Debounced values
useMediaQuery()               // Responsive breakpoints
useOnClickOutside()           // Click outside handler
```

### 3. Editor Hooks
```typescript
useEditor()                   // Editor.js instance
useAutoSave()                 // Auto-save content
useEditorBlocks()             // Block management
useImageUpload()              // Image upload handling
```

## Page Components Structure

### 1. Landing Page (`/app/page.tsx`)
```typescript
export default function HomePage() {
  return (
    <PageWrapper>
      <HeroSection />
      <RoleSelection />
      <FeatureHighlights />
    </PageWrapper>
  )
}
```

### 2. Coordinator Dashboard (`/app/coordinator/page.tsx`)
```typescript
export default function CoordinatorDashboard() {
  const { data: groups } = useGroups()
  
  return (
    <CoordinatorLayout>
      <DashboardHeader />
      <StatsummaryData />
      <GroupsList groups={groups} />
      <QuickActions />
    </CoordinatorLayout>
  )
}
```

### 3. Group Management (`/app/coordinator/[groupId]/page.tsx`)
```typescript
export default function GroupPage({ params }: { params: { groupId: string } }) {
  const { data: group } = useGroup(params.groupId)
  
  return (
    <CoordinatorLayout>
      <GroupHeader group={group} />
      <ParticipantsList participants={group?.participants} />
      <GroupActions groupId={params.groupId} />
    </CoordinatorLayout>
  )
}
```

### 4. Participant Editor (`/app/participant/[token]/page.tsx`)
```typescript
export default function ParticipantEditor({ params }: { params: { token: string } }) {
  const { data: participant } = useParticipantByToken(params.token)
  
  return (
    <ParticipantLayout>
      <EditorHeader participant={participant} />
      <YearbookEditor 
        content={participant?.pageContent}
        onSave={handleSave}
      />
      <EditorActions participant={participant} />
    </ParticipantLayout>
  )
}
```

## State Management Strategy

### 1. Server State (React Query)
```typescript
// Query keys organization
export const queryKeys = {
  groups: ['groups'] as const,
  group: (id: string) => ['groups', id] as const,
  participants: (groupId: string) => ['participants', groupId] as const,
  participant: (id: string) => ['participants', id] as const,
}

// Query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})
```

### 2. Authentication Context
```typescript
interface AuthContext {
  user: AuthUser | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  accessParticipantPage: (token: string) => Promise<void>
  isLoading: boolean
}
```

### 3. UI State Context
```typescript
interface UIContext {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}
```

## Error Handling Strategy

### 1. Error Boundaries
```typescript
// Component-level error boundaries
<ErrorBoundary fallback={<ErrorFallback />}>
  <Dashboard />
</ErrorBoundary>

// Page-level error boundaries  
<ErrorBoundary fallback={<PageError />}>
  <ParticipantEditor />
</ErrorBoundary>
```

### 2. API Error Handling
```typescript
// React Query error handling
const { data, error, isError } = useGroups()

if (isError) {
  return <ErrorState error={error} retry={refetch} />
}
```

### 3. Form Validation
```typescript
// Zod schema validation
const participantSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
})

// React Hook Form integration
const form = useForm<ParticipantFormData>({
  resolver: zodResolver(participantSchema)
})
```

This component hierarchy provides a scalable, maintainable architecture that aligns with the MVP requirements while setting up for future enhancements.