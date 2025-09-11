# Technology Stack

## Overview

The Digital Yearbook Platform frontend is built using modern web technologies focused on type safety, performance, and developer experience.

## Core Framework

### **Next.js 14.2.32**
- **App Router**: Modern routing with nested layouts and server components
- **TypeScript**: Full type safety throughout the application
- **File-based routing**: Intuitive route organization with locale support
- **Build optimization**: Automatic code splitting and optimization
- **Internationalization**: Built-in i18n support with route-based locales

## UI & Styling

### **Tailwind CSS**
- **Utility-first**: Rapid UI development with utility classes
- **Responsive design**: Mobile-first approach with breakpoint system
- **Custom configuration**: Tailored design system with custom colors and spacing
- **JIT compilation**: Just-in-time compilation for optimal bundle size

### **Shadcn/UI Components**
- **Design System**: Consistent, accessible UI components
- **Customizable**: Built with Radix UI primitives
- **Copy-paste**: Components are owned by the project, not a dependency
- **Tailwind integration**: Seamless styling with utility classes

### **Lucide React Icons**
- **Modern icons**: Clean, consistent icon library
- **Tree-shakable**: Only import icons that are used
- **Customizable**: Easy to style and size

## State Management

### **TanStack Query (React Query)**
- **Server state**: Efficient data fetching, caching, and synchronization
- **Optimistic updates**: Immediate UI updates with rollback on failure
- **Background refetching**: Keep data fresh automatically
- **Cache management**: Intelligent cache invalidation and updates

### **React Hook Form**
- **Form management**: Performant forms with minimal re-renders
- **Validation integration**: Works seamlessly with Zod schemas
- **Developer experience**: Simple API with excellent TypeScript support
- **Performance**: Uncontrolled components for optimal performance

## Internationalization

### **next-intl**
- **Modern i18n**: Built for Next.js App Router with full SSR support
- **Type safety**: TypeScript integration for translation keys
- **Rich formatting**: Support for pluralization, numbers, dates, and variables
- **Namespace organization**: Structured translation files with nested keys
- **Locale routing**: Automatic URL handling for `/tr` and `/en` routes
- **SEO optimization**: Proper hreflang tags and locale-specific meta data

## Validation & Type Safety

### **Zod**
- **Runtime validation**: Type-safe schema validation
- **TypeScript integration**: Automatic type inference from schemas
- **Form validation**: Integrated with React Hook Form
- **API validation**: Validate API responses and requests

### **TypeScript**
- **Static typing**: Catch errors at compile time
- **IDE support**: Enhanced autocomplete and refactoring
- **Interface definitions**: Clear contracts between components
- **Generic types**: Reusable type patterns

## Development Tools

### **ESLint**
- **Code quality**: Enforce coding standards and best practices
- **Next.js integration**: Optimized rules for Next.js applications
- **Custom rules**: Project-specific linting rules

### **Prettier**
- **Code formatting**: Consistent code style across the team
- **Auto-formatting**: Format on save for consistent style
- **Integration**: Works with ESLint for comprehensive code quality

## Package Management

### **npm**
- **Dependency management**: Reliable package installation and management
- **Lock file**: Ensures consistent installations across environments
- **Scripts**: Automated build, test, and development tasks

## File Structure Organization

### **Modular Architecture**
```
/frontend
├── /app/[locale]     # Internationalized Next.js App Router
├── /components       # Reusable UI components
├── /lib             # Utilities, hooks, services, i18n config
├── /translations    # Translation files (tr.json, en.json)
├── /types           # TypeScript type definitions  
├── /mock            # Mock data for development
└── /docs            # Project documentation
```

### **Component Patterns**
- **UI Components**: `/components/ui` - Base design system components
- **Layout Components**: `/components/layout` - Application layout structure
- **Form Components**: `/components/forms` - Reusable form components with validation
- **Shared Components**: `/components/shared` - Business logic components

## Data Layer

### **Mock API Layer**
- **Development**: Full mock API for frontend development
- **Realistic delays**: Simulates real API response times
- **Error simulation**: Test error handling and edge cases
- **TypeScript**: Fully typed mock responses

### **Service Layer**
- **API abstraction**: Clean interface for data operations
- **Service classes**: Organized by domain (Groups, Participants, Content)
- **Error handling**: Consistent error handling patterns
- **Type safety**: Fully typed service methods

## Build & Development

### **Development Server**
- **Hot reload**: Instant updates during development
- **Fast refresh**: Preserve component state during updates
- **TypeScript compilation**: Real-time type checking

### **Build Process**
- **Static generation**: Pre-rendered pages for optimal performance
- **Code splitting**: Automatic bundle optimization
- **Tree shaking**: Remove unused code for smaller bundles
- **Asset optimization**: Automatic image and asset optimization

## Testing Strategy

### **Current Setup**
- **TypeScript compilation**: Catch type errors at build time
- **ESLint**: Static code analysis for quality assurance
- **Manual testing**: Comprehensive user flow testing

### **Future Testing Stack** (Planned)
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **Cypress**: End-to-end testing
- **MSW**: Mock service worker for API testing

## Version Requirements

### **Node.js & npm**
- **Node.js**: ^18.0.0 (LTS recommended)
- **npm**: ^9.0.0

### **Key Dependencies**
```json
{
  "next": "14.2.32",
  "next-intl": "^4.3.7",
  "@tanstack/react-query": "^5.51.23", 
  "react-hook-form": "^7.52.2",
  "zod": "^3.23.8",
  "tailwindcss": "^3.4.7",
  "typescript": "^5.5.4",
  "@editorjs/editorjs": "^2.30.6"
}
```

## Browser Support

### **Target Browsers**
- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions  
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions

### **Features Used**
- **ES2020+**: Modern JavaScript features
- **CSS Grid**: Advanced layout capabilities
- **Flexbox**: Flexible component layouts
- **CSS Custom Properties**: Dynamic theming support

## Performance Considerations

### **Bundle Optimization**
- **Code splitting**: Route-based and component-based splitting
- **Tree shaking**: Eliminate unused code
- **Dynamic imports**: Load components on demand
- **Image optimization**: Next.js automatic image optimization

### **Caching Strategy**
- **TanStack Query**: Intelligent data caching
- **Next.js caching**: Static and dynamic content caching
- **Browser caching**: Optimal cache headers

## Security

### **Client-side Security**
- **TypeScript**: Prevent runtime type errors
- **Input validation**: Zod schemas validate all user input
- **XSS prevention**: React's built-in XSS protection
- **CSRF protection**: Next.js built-in CSRF protection

## Deployment

### **Build Targets**
- **Static export**: Can be deployed to any static hosting
- **Vercel**: Optimized for Vercel deployment
- **Node.js server**: Can run on any Node.js hosting

### **Environment Configuration**
- **Environment variables**: Secure configuration management
- **Build-time optimization**: Environment-specific builds
- **Asset optimization**: Automatic asset compression and optimization

---

## Recent Additions (January 2025)

### **Internationalization Stack**
- **next-intl**: Modern i18n library with App Router support
- **Route-based locales**: `/tr` (Turkish) and `/en` (English) prefixes
- **Translation management**: Structured JSON files with namespace organization
- **Type safety**: Full TypeScript support for translation keys
- **SEO optimization**: Automatic hreflang and meta tag generation

### **Enhanced Validation**
- **Form validation**: Extended Zod schemas for multilingual forms
- **Error handling**: Localized error messages and validation feedback
- **Input sanitization**: Enhanced security with locale-aware validation

---

*Last updated: January 2025*
*For the most current dependency versions, refer to package.json*