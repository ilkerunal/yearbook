# Development Guidelines

## Overview

This document outlines the development principles, folder structure, and component creation patterns for the Digital Yearbook Platform frontend. Following these guidelines ensures consistency, maintainability, and scalability across the codebase.

## Core Development Principles

### 1. **Separation of Concerns**
- **UI Components**: Pure presentation components in `/components/ui`
- **Business Logic**: Custom hooks in `/lib/hooks`
- **Data Services**: Service classes in `/lib/services`
- **Validation**: Zod schemas in `/lib/validations`
- **Types**: TypeScript interfaces in `/types`

### 2. **Type Safety**
- **Everything is typed**: No `any` types allowed
- **Zod schemas**: All forms use Zod for runtime validation
- **Interface definitions**: Clear contracts for all data structures
- **Generic types**: Reusable type patterns where applicable

### 3. **Component Composition**
- **Single responsibility**: Each component has one clear purpose
- **Reusability**: Components are designed for reuse across the app
- **Props interface**: Clear prop interfaces with JSDoc comments
- **Default exports**: Components use default exports for better tree-shaking

### 4. **State Management**
- **Server state**: TanStack Query for all API interactions
- **Local state**: React hooks (useState, useReducer) for component state
- **Form state**: React Hook Form for complex forms
- **Global state**: React Context for cross-component state (minimal usage)

## Folder Structure

```
/frontend
├── /app                          # Next.js App Router pages
│   ├── /coordinator              # Coordinator-specific routes
│   │   ├── /groups               # Group management
│   │   │   ├── /[groupId]        # Dynamic group routes
│   │   │   │   ├── /cover-editor # Cover editor for specific group
│   │   │   │   ├── /cover        # Legacy cover route (deprecated)
│   │   │   │   ├── /settings     # Group settings
│   │   │   │   └── page.tsx      # Group details page
│   │   │   ├── /new              # Create new group
│   │   │   └── page.tsx          # Groups listing
│   │   ├── /reports              # Reports and analytics
│   │   ├── /settings             # Coordinator settings
│   │   └── page.tsx              # Coordinator dashboard
│   ├── /participant              # Participant-specific routes
│   │   ├── /[token]              # Dynamic participant routes
│   │   └── page.tsx              # Participant landing
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── error.tsx                # Error boundary
│   ├── not-found.tsx            # 404 page
│   └── global-error.tsx         # Global error handler
├── /components                   # Reusable components
│   ├── index.ts                 # Single-line import barrel
│   ├── /ui                      # Base UI components (Shadcn)
│   ├── /layout                  # Layout-specific components
│   ├── /forms                   # Form components with validation
│   │   ├── create-group-form.tsx
│   │   ├── personal-info-form.tsx
│   │   ├── security-settings-form.tsx
│   │   └── notification-settings-form.tsx
│   ├── /shared                  # Shared business components
│   ├── /editor                  # Editor.js related components
│   └── providers.tsx            # React Query provider
├── /lib                         # Utilities and configuration
│   ├── /hooks                   # Custom React hooks (TanStack Query)
│   ├── /services                # API service classes
│   ├── /validations             # Zod validation schemas
│   │   ├── group.ts
│   │   └── settings.ts
│   └── utils.ts                 # Utility functions
├── /types                       # TypeScript type definitions
│   └── index.ts                 # Global type exports
├── /mock                        # Mock data and API
│   ├── /data                    # Mock data files
│   ├── /api                     # Mock API implementations
│   └── index.ts                 # Mock exports
└── /docs                        # Documentation
    ├── architecture.md
    ├── tech-stack.md
    ├── development-guidelines.md
    ├── component-hierarchy.md
    ├── frontend-development-plan.md
    └── routes-and-services-implementation.md
```

## Component Creation Patterns

### 1. **UI Components** (`/components/ui`)
Base components from Shadcn UI with consistent patterns:

```typescript
// /components/ui/example.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const exampleVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "default-size",
        sm: "small-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleVariants> {
  // Additional props
}

const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(exampleVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Example.displayName = "Example"

export { Example, exampleVariants }
```

### 2. **Form Components** (`/components/forms`)
Form components using React Hook Form + Zod validation:

```typescript
// /components/forms/example-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { exampleSchema, type ExampleFormData } from "@/lib/validations/example"
import { Button, Input, Label } from "@/components"

interface ExampleFormProps {
  onSubmit: (data: ExampleFormData) => Promise<void>
  onCancel?: () => void
  defaultValues?: Partial<ExampleFormData>
}

export function ExampleForm({ onSubmit, onCancel, defaultValues }: ExampleFormProps) {
  const form = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues,
  })

  const handleSubmit = async (data: ExampleFormData) => {
    try {
      await onSubmit(data)
    } catch (error) {
      // Handle error appropriately
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="field">Field Label</Label>
        <Input
          id="field"
          {...form.register("field")}
          placeholder="Enter value..."
        />
        {form.formState.errors.field && (
          <p className="text-sm text-red-600">
            {form.formState.errors.field.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  )
}
```

### 3. **Service Classes** (`/lib/services`)
API service classes with clear methods:

```typescript
// /lib/services/example.service.ts
import { Example } from "@/types"
import { mockExampleAPI } from "@/mock"

export class ExampleService {
  static async getExamples(): Promise<Example[]> {
    return mockExampleAPI.getExamples()
  }

  static async getExample(id: string): Promise<Example | null> {
    return mockExampleAPI.getExample(id)
  }

  static async createExample(data: Omit<Example, "id" | "createdAt" | "updatedAt">): Promise<Example> {
    return mockExampleAPI.createExample(data)
  }

  static async updateExample(id: string, data: Partial<Example>): Promise<Example> {
    return mockExampleAPI.updateExample(id, data)
  }

  static async deleteExample(id: string): Promise<void> {
    return mockExampleAPI.deleteExample(id)
  }
}
```

### 4. **Custom Hooks** (`/lib/hooks`)
TanStack Query hooks with proper cache management:

```typescript
// /lib/hooks/useExamples.ts
"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Example } from "@/types"
import { ExampleService } from "@/lib/services/example.service"

// Query Keys
export const exampleKeys = {
  all: ['examples'] as const,
  lists: () => [...exampleKeys.all, 'list'] as const,
  details: () => [...exampleKeys.all, 'detail'] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
}

// Fetch all examples
export function useExamples() {
  return useQuery({
    queryKey: exampleKeys.lists(),
    queryFn: () => ExampleService.getExamples(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Fetch single example
export function useExample(id: string) {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: () => ExampleService.getExample(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

// Create example mutation
export function useCreateExample() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: Omit<Example, "id" | "createdAt" | "updatedAt">) =>
      ExampleService.createExample(data),
    onSuccess: (newExample) => {
      // Update cache optimistically
      queryClient.setQueryData<Example[]>(exampleKeys.lists(), (old) => {
        return old ? [...old, newExample] : [newExample]
      })
      
      // Set individual cache
      queryClient.setQueryData(exampleKeys.detail(newExample.id), newExample)
      
      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() })
    },
  })
}
```

### 5. **Validation Schemas** (`/lib/validations`)
Zod schemas for type-safe validation:

```typescript
// /lib/validations/example.ts
import { z } from "zod"

export const exampleSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
  age: z.number()
    .min(1, "Age must be positive")
    .max(120, "Age must be realistic"),
  isActive: z.boolean().default(true),
})

export type ExampleFormData = z.infer<typeof exampleSchema>
```

## Import Patterns

### 1. **Single-Line Component Imports**
Always import from the components barrel file:

```typescript
// ✅ Good
import { Button, Card, Input, Label } from "@/components"

// ❌ Bad
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
```

### 2. **Import Order**
Follow this order for imports:

```typescript
// 1. React and Next.js
import { useState } from "react"
import { useRouter } from "next/navigation"

// 2. Third-party libraries
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// 3. Internal components and utilities
import { Button, Card, Input } from "@/components"
import { useCreateGroup } from "@/lib/hooks/useGroups"
import { createGroupSchema } from "@/lib/validations/group"

// 4. Types
import type { CreateGroupFormData } from "@/types"

// 5. Icons (last)
import { Plus, Save, Loader2 } from "lucide-react"
```

## Styling Guidelines

### 1. **Tailwind CSS Classes**
- Use utility classes for styling
- Follow mobile-first responsive design
- Use design system tokens from globals.css
- Group related classes logically

```typescript
// ✅ Good - grouped and readable
className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"

// ❌ Bad - hard to read
className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow text-sm font-medium text-gray-900"
```

### 2. **Responsive Design**
- Default: Mobile styles
- `sm:` 640px and up
- `md:` 768px and up  
- `lg:` 1024px and up
- `xl:` 1280px and up

## Error Handling

### 1. **Error Boundaries**
Use error boundaries for component-level error handling:

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <ComponentThatMightFail />
</ErrorBoundary>
```

### 2. **Query Error Handling**
Handle errors gracefully in queries:

```typescript
const { data, error, isError, refetch } = useExamples()

if (isError) {
  return <ErrorState error={error} retry={refetch} />
}
```

### 3. **Form Error Handling**
Display validation errors clearly:

```typescript
{form.formState.errors.field && (
  <p className="text-sm text-red-600">
    {form.formState.errors.field.message}
  </p>
)}
```

## Testing Guidelines

### 1. **Component Testing**
- Test user interactions, not implementation details
- Use React Testing Library
- Mock external dependencies
- Test error states and edge cases

### 2. **Hook Testing**
- Test custom hooks in isolation
- Mock API calls consistently
- Test loading, success, and error states

### 3. **Integration Testing**
- Test complete user flows
- Use real data structures
- Test form submission and validation

## Performance Best Practices

### 1. **Code Splitting**
- Lazy load heavy components
- Use dynamic imports for large dependencies
- Split by routes naturally with App Router

### 2. **Image Optimization**
- Use Next.js Image component
- Specify dimensions when possible
- Use appropriate formats (WebP, AVIF)

### 3. **Query Optimization**
- Set appropriate staleTime values
- Use optimistic updates for better UX
- Implement proper cache invalidation

## Accessibility Guidelines

### 1. **Semantic HTML**
- Use proper heading hierarchy (h1 → h2 → h3)
- Use semantic elements (article, section, nav)
- Provide meaningful alt text for images

### 2. **Keyboard Navigation**
- Ensure all interactive elements are keyboard accessible
- Implement proper focus management
- Use skip links for navigation

### 3. **Screen Reader Support**
- Use aria-labels for context
- Provide status announcements for dynamic content
- Test with screen readers

## Recent Architectural Changes

### Cover Editor Integration (December 2024)

**Problem**: The cover editor was originally in the global navigation, making it unclear which group's cover was being edited.

**Solution**: Moved cover editor to be contextual to each group:
- **Removed**: Global cover editor from coordinator sidebar navigation
- **Added**: Cover editor buttons on group cards and group detail pages
- **Created**: Group-specific cover editor route: `/coordinator/groups/[groupId]/cover-editor`

**Benefits**:
- Clear context - users know which group's cover they're editing
- Better UX - access cover editor directly from group management
- Scalable - each group can have its own cover design

### Settings Forms Modularization (December 2024)

**Problem**: Settings page had large inline forms that were hard to maintain and not reusable.

**Solution**: Split settings into modular form components:
- **Created**: `/components/forms/personal-info-form.tsx`
- **Created**: `/components/forms/security-settings-form.tsx`
- **Created**: `/components/forms/notification-settings-form.tsx`
- **Added**: Validation schemas in `/lib/validations/settings.ts`

**Benefits**:
- Reusable form components across the application
- Consistent validation patterns with React Hook Form + Zod
- Easier testing and maintenance
- Better separation of concerns

### Import Strategy

**Circular Dependency Resolution**: 
- Form components import UI components directly from source files
- Barrel exports (`/components/index.ts`) exclude form components to prevent circular dependencies
- UI components are exported through barrel file for single-line imports

```typescript
// ✅ Good - Direct imports in form components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// ✅ Good - Barrel imports in pages
import { Button, Card } from "@/components"
```

## Code Review Checklist

- [ ] Component follows single responsibility principle
- [ ] Props are properly typed with interfaces
- [ ] Error states are handled gracefully
- [ ] Forms use React Hook Form + Zod validation
- [ ] Imports follow the established patterns (direct imports for forms, barrel imports for pages)
- [ ] Responsive design is implemented
- [ ] Accessibility requirements are met
- [ ] Performance best practices are followed
- [ ] Code is properly documented with JSDoc where needed
- [ ] Tests cover main functionality and edge cases
- [ ] Cover editor routes use group-specific paths
- [ ] Settings forms are modular and reusable

These guidelines ensure consistent, maintainable, and scalable code across the Digital Yearbook Platform frontend.