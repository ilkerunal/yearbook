# Component Hierarchy & Architecture

## Overview

This document outlines the component organization and architecture patterns used in the Digital Yearbook Platform frontend. All components follow TypeScript best practices and support internationalization.

## Component Organization Structure

### 1. Layout Components (`/components/layout`)

```
/layout
├── app-header.tsx              # Main navigation header with language selector
├── coordinator-layout.tsx      # Layout wrapper for coordinator pages
├── coordinator-sidebar.tsx     # Coordinator navigation sidebar
├── page-wrapper.tsx           # Common page layout wrapper with max-width
└── participant-layout.tsx      # Layout wrapper for participant pages
```

**Key Features:**
- **Internationalized navigation**: All menu items use `useTranslations` hook
- **Responsive design**: Mobile-optimized with collapsible sidebar
- **Language selector**: Integrated language switcher in header
- **Consistent spacing**: Standardized padding and margin patterns

### 2. UI Components (`/components/ui`)

*Built with Shadcn/ui and Radix UI primitives*

```
/ui
├── badge.tsx                  # Status indicators and labels
├── button.tsx                 # Button variants (primary, secondary, outline, etc.)
├── card.tsx                   # Content containers with header/content/footer
├── input.tsx                  # Form input fields
├── label.tsx                  # Form labels
└── language-selector.tsx      # Language switching component
```

**Key Features:**
- **Accessibility**: Full ARIA support via Radix UI
- **Theming**: Consistent design system with CSS variables
- **Variant system**: Multiple styles using class-variance-authority
- **TypeScript**: Fully typed props and variants

### 3. Form Components (`/components/forms`)

```
/forms
├── create-group-form.tsx      # Multi-step group creation form
├── notification-settings-form.tsx  # User notification preferences
├── personal-info-form.tsx     # Personal information form
└── security-settings-form.tsx # Password and security settings
```

**Key Features:**
- **React Hook Form**: Performance-optimized form handling
- **Zod validation**: Runtime schema validation with TypeScript inference
- **Internationalization**: All labels, placeholders, and errors are translated
- **Reusability**: Self-contained forms with clear prop interfaces

### 4. Editor Components (`/components/editor`)

```
/editor
├── block-editor.tsx          # Main Editor.js wrapper component
├── image-block.tsx          # Custom image block for yearbook pages
├── text-block.tsx           # Enhanced text block with formatting
└── editor-toolbar.tsx       # Custom toolbar for editing controls
```

**Key Features:**
- **Editor.js integration**: Block-based WYSIWYG editing
- **Custom blocks**: Yearbook-specific content blocks
- **Internationalized UI**: Editor interface supports multiple languages
- **Save/restore**: Persistent draft functionality

### 5. Shared Components (`/components/shared`)

```
/shared
├── group-card.tsx           # Group display card with actions
├── participant-status.tsx   # Participant progress indicator
├── progress-bar.tsx         # Visual progress indicators
├── status-badge.tsx         # Status display with color coding
└── confirmation-dialog.tsx  # Reusable confirmation modals
```

**Key Features:**
- **Business logic**: Domain-specific components with embedded logic
- **Internationalization**: All text content is translatable
- **Consistent styling**: Follows design system patterns
- **Prop interfaces**: Clear, documented APIs

## Architecture Patterns

### 1. **Component Composition**

Components are designed for maximum reusability and composition:

```typescript
// ✅ Good: Composable components
<Card>
  <CardHeader>
    <CardTitle>{t('title')}</CardTitle>
    <CardDescription>{t('description')}</CardDescription>
  </CardHeader>
  <CardContent>
    <GroupForm onSubmit={handleSubmit} />
  </CardContent>
</Card>

// ❌ Avoid: Monolithic components with too many responsibilities
<GroupManagementEverything />
```

### 2. **Internationalization Pattern**

All components use the `useTranslations` hook for text content:

```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('namespace');
  const common = useTranslations('common');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <Button>{common('buttons.save')}</Button>
    </div>
  );
}
```

### 3. **Type Safety Pattern**

Components have clear, documented prop interfaces:

```typescript
interface ComponentProps {
  /** Primary title for the component */
  title: string;
  /** Optional description text */
  description?: string;
  /** Callback when action is completed */
  onComplete?: (result: ResultType) => void;
  /** Loading state */
  isLoading?: boolean;
}

export function Component({ title, description, onComplete, isLoading }: ComponentProps) {
  // Implementation
}
```

### 4. **Error Boundary Pattern**

Components handle errors gracefully with fallback UI:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }: { error: Error }) {
  const t = useTranslations('errors');
  
  return (
    <div className="error-boundary">
      <h2>{t('somethingWentWrong')}</h2>
      <p>{error.message}</p>
    </div>
  );
}

// Usage
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <MyComponent />
</ErrorBoundary>
```

## Component Guidelines

### 1. **File Naming**
- Use kebab-case for file names: `group-card.tsx`
- Component names should be PascalCase: `GroupCard`
- Export as default: `export default function GroupCard()`

### 2. **Import Patterns**
- **External libraries**: Import directly (`import { useState } from "react"`)
- **UI Components**: Use direct imports (`import { Button } from "@/components/ui/button"`)
- **Layout Components**: Use direct imports (`import { PageWrapper } from "@/components/layout/page-wrapper"`)
- **Form Components**: Use direct imports (`import { CreateGroupForm } from "@/components/forms/create-group-form"`)
- **Components within components**: Use relative imports (`import { Button } from "../ui/button"`)

### 3. **Props Interface**
- Define interfaces above the component
- Use JSDoc comments for prop documentation
- Mark optional props with `?`
- Group related props using nested interfaces

### 4. **Hooks Usage**
- Place all hook calls at the top of the component
- Use custom hooks for complex logic
- Follow the rules of hooks consistently

### 5. **Styling Approach**
- Use Tailwind CSS utility classes
- Create custom CSS classes only for complex animations
- Use CSS variables for theme consistency
- Responsive design with mobile-first approach

### 6. **Internationalization Requirements**
- All user-facing text must use translations
- No hardcoded strings in components
- Use appropriate translation namespaces
- Provide context for translators with comments

## Testing Strategy

### **Component Testing**
- **Unit tests**: Test component logic and rendering
- **Integration tests**: Test component interactions
- **Accessibility tests**: Ensure ARIA compliance
- **Internationalization tests**: Verify translation keys work correctly

### **Testing Patterns**
```typescript
// Test translations are working
expect(screen.getByText(/translated.title/)).toBeInTheDocument();

// Test component props
render(<MyComponent title="test" onAction={mockFn} />);
expect(mockFn).toHaveBeenCalledWith(expectedValue);

// Test accessibility
expect(screen.getByRole('button')).toHaveAttribute('aria-label');
```

## Performance Considerations

### **Bundle Optimization**
- Components are lazy-loaded where appropriate
- Dynamic imports for heavy components
- Tree-shaking enabled for unused exports
- Image optimization with Next.js Image component

### **Rendering Performance**
- Avoid unnecessary re-renders with React.memo
- Use useCallback and useMemo appropriately
- Optimize large lists with virtualization
- Debounce user input for search/filter components

---