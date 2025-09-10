# Routes and Services Implementation Plan

## Phase 1: Route Structure Creation

### Coordinator Routes
- [x] **Dashboard** (`/coordinator`) - ✅ Already implemented
- [x] **Groups List** (`/coordinator/groups`) - ✅ Completed - Full groups listing with search/filters
- [x] **Group Details** (`/coordinator/groups/[groupId]`) - ✅ Already implemented  
- [x] **Create Group** (`/coordinator/groups/new`) - ✅ Completed - Multi-step group creation form
- [x] **Group Settings** (`/coordinator/groups/[groupId]/settings`) - ✅ Completed - Comprehensive settings page
- [x] **Cover Editor** (`/coordinator/groups/[groupId]/cover-editor`) - ✅ **UPDATED** - Moved from global nav to group-specific context
- [x] **Legacy Cover Route** (`/coordinator/groups/[groupId]/cover`) - ⚠️ **DEPRECATED** - Replaced by cover-editor
- [ ] **Review Page** (`/coordinator/groups/[groupId]/review/[participantId]`) - Review participant submission
- [x] **Reports** (`/coordinator/reports`) - ✅ Completed - Basic reports page
- [x] **Settings** (`/coordinator/settings`) - ✅ **COMPLETED** - Modular settings with separate form components

### Participant Routes
- [x] **Access Portal** (`/participant`) - ✅ Already implemented
- [x] **Editor** (`/participant/[token]`) - ✅ Already implemented
- [ ] **Preview Mode** (`/participant/[token]/preview`) - Read-only preview

### API Routes (if needed for mock)
- [ ] **Groups API** (`/api/groups`) - RESTful group endpoints
- [ ] **Participants API** (`/api/participants`) - Participant management
- [ ] **Upload API** (`/api/upload`) - File upload handling

## Phase 2: Service Layer Implementation

### Core Services Structure
```
/lib/services/
├── groups.service.ts          # Group CRUD operations
├── participants.service.ts    # Participant management
├── content.service.ts         # Page content operations
├── auth.service.ts           # Authentication (future)
├── upload.service.ts         # File upload handling
└── pdf.service.ts            # PDF generation
```

### Query Hooks Structure
```
/lib/hooks/
├── useGroups.ts              # Groups data hooks
├── useParticipants.ts        # Participants data hooks
├── useContent.ts             # Content management hooks
├── useReviews.ts             # Review system hooks
└── useUpload.ts              # File upload hooks
```

### Service Features per Entity

#### Groups Service
- [x] `useGroups()` - ✅ Fetch all groups with pagination
- [x] `useGroup(id)` - ✅ Fetch single group with participants
- [x] `useCreateGroup()` - ✅ Create new group mutation
- [x] `useUpdateGroup(id)` - ✅ Update group details mutation
- [x] `useDeleteGroup(id)` - ✅ Delete group mutation
- [x] `useGroupStats(id)` - ✅ Group statistics and progress

#### Participants Service  
- [x] `useParticipants(groupId)` - ✅ Fetch group participants
- [x] `useParticipant(id)` - ✅ Fetch single participant
- [x] `useParticipantByToken(token)` - ✅ Access by token
- [x] `useAddParticipant(groupId)` - ✅ Add participant mutation
- [x] `useUpdateParticipant(id)` - ✅ Update participant mutation
- [x] `useRemoveParticipant(id)` - ✅ Remove participant mutation

#### Content Service
- [x] `useParticipantContent(participantId)` - ✅ Fetch page content
- [x] `useUpdateContent(participantId)` - ✅ Update content mutation
- [x] `useAutoSave(participantId)` - ✅ Auto-save functionality
- [x] `useSubmitForReview(participantId)` - ✅ Submit page mutation

#### Review Service
- [x] `useReviewQueue(groupId)` - ✅ Pending reviews
- [x] `useApprovePage(participantId)` - ✅ Approve page mutation
- [x] `useRequestChanges(participantId)` - ✅ Request changes mutation
- [x] `useReviewHistory(participantId)` - ✅ Review history

#### Upload Service
- [ ] `useUploadImage()` - Image upload mutation
- [ ] `useDeleteImage()` - Image deletion mutation
- [ ] `useImageGallery(participantId)` - User's images

#### PDF Service
- [ ] `useGeneratePDF(groupId)` - Generate PDF mutation
- [ ] `usePDFStatus(groupId)` - Generation status
- [ ] `useDownloadPDF(groupId)` - Download link

## Phase 3: Integration Tasks

### Form Integration
- [ ] Create group form with validation
- [ ] Add participant form with validation  
- [ ] Cover editor form integration
- [ ] Review feedback form

### Error Handling
- [ ] Global error boundary setup
- [ ] Query error handling patterns
- [ ] Toast notification system
- [ ] Offline/retry mechanisms

### Loading States
- [ ] Skeleton loading components
- [ ] Progressive loading indicators
- [ ] Optimistic updates

### Performance
- [ ] Query key management
- [ ] Cache invalidation strategies
- [ ] Background refetching
- [ ] Prefetching critical data

## Implementation Priority

### High Priority (Immediate)
1. Complete basic route structure
2. Implement Groups and Participants services
3. Create form components with validation
4. Add basic error handling

### Medium Priority
1. Content and Review services
2. Upload functionality
3. PDF generation
4. Advanced UI states

### Low Priority (Polish)
1. Advanced caching strategies
2. Offline support
3. Performance optimizations
4. Analytics integration

## Success Criteria

- [ ] All routes render without errors
- [ ] Services return proper TypeScript types
- [ ] Mock data integration working
- [ ] Forms validate and submit
- [ ] Error states display properly
- [ ] Loading states are smooth
- [ ] Navigation flows work end-to-end

## Testing Strategy

- [ ] Service layer unit tests
- [ ] Component integration tests
- [ ] User flow testing
- [ ] Error scenario testing
- [ ] Performance testing