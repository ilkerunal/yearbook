# Digital Yearbook Platform - Frontend

A modern, multilingual web application for creating and managing digital yearbooks with collaborative editing capabilities.

## 🌟 Features

### **Coordinator Dashboard**
- **Multi-language Support**: Full Turkish (default) and English localization
- **Group Management**: Create and manage multiple yearbook groups
- **State-Based Workflow**: Track participant progress with clear visual indicators
- **Page Review System**: Approve submissions or request changes with feedback
- **Cover Editor**: Group-specific cover design with live preview and templates
- **Reports & Analytics**: Comprehensive progress tracking and statistics
- **Settings Management**: Modular personal, security, and notification preferences

### **Participant Editor**
- **Personalized Access**: Unique token-based access to individual yearbook pages
- **WYSIWYG Editor**: Block-based content editor powered by Editor.js
- **Progress Tracking**: Save drafts and submit for coordinator review
- **Multilingual Interface**: Turkish and English language support

### **Internationalization (i18n)**
- **Primary Language**: Turkish (tr) as default
- **Secondary Language**: English (en)
- **Seamless Language Switching**: No page reload required
- **Route-based Locales**: `/tr/coordinator` and `/en/coordinator`
- **SEO-friendly**: Proper hreflang and locale-specific URLs

## 🚀 Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for full type safety
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) for modern i18n
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) for server state management
- **Content Editor**: [Editor.js](https://editorjs.io/) for rich text editing
- **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography

## 📁 Project Structure

```
/frontend
├── /app/[locale]                     # Internationalized App Router
│   ├── /coordinator                  # Coordinator dashboard routes
│   │   ├── /groups                   # Group management
│   │   │   ├── /[groupId]           # Dynamic group routes
│   │   │   │   ├── /cover-editor    # Group-specific cover editor
│   │   │   │   ├── /settings        # Group settings
│   │   │   │   └── page.tsx         # Group details
│   │   │   ├── /new                 # Create new group
│   │   │   └── page.tsx             # Groups listing
│   │   ├── /reports                 # Reports and analytics
│   │   ├── /settings                # Coordinator settings
│   │   └── page.tsx                 # Dashboard
│   ├── /participant                 # Participant editor routes
│   │   ├── /[token]                 # Token-based participant access
│   │   └── page.tsx                 # Participant landing
│   ├── layout.tsx                   # Locale-aware layout
│   └── page.tsx                     # Localized homepage
├── /components                      # Reusable React components
│   ├── /ui                         # Shadcn UI components
│   ├── /layout                     # Layout-specific components
│   ├── /forms                      # Form components with validation
│   └── /shared                     # Shared business components
├── /lib                            # Utilities and configuration
│   ├── /hooks                      # TanStack Query custom hooks
│   ├── /services                   # API service classes
│   ├── /validations                # Zod validation schemas
│   └── /i18n                       # Internationalization config
├── /translations                   # Translation files
│   ├── tr.json                     # Turkish translations
│   └── en.json                     # English translations
├── /types                          # TypeScript type definitions
├── /mock                           # Mock data and API for development
└── /docs                           # Project documentation
```

## 🛠️ Getting Started

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher

### Installation

1. **Clone and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Turkish (default): `http://localhost:3000/tr`
   - English: `http://localhost:3000/en`
   - Auto-redirect: `http://localhost:3000`

### Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run type-check  # TypeScript type checking
```

## 🌍 Internationalization

The application supports full internationalization with:

- **Turkish (tr)** - Primary language and default
- **English (en)** - Secondary language
- **Language Selector** - Available in the top-right header
- **Route-based Locales** - All routes include locale prefix
- **SEO Optimization** - Proper hreflang tags and meta data

### Adding Translations

1. Add new keys to both `/translations/tr.json` and `/translations/en.json`
2. Use the `useTranslations` hook in components:
   ```typescript
   import { useTranslations } from 'next-intl';
   
   function MyComponent() {
     const t = useTranslations('namespace');
     return <h1>{t('title')}</h1>;
   }
   ```

## 📚 Documentation

- **[Development Guidelines](./docs/development-guidelines.md)** - Coding standards and patterns
- **[Technology Stack](./docs/tech-stack.md)** - Detailed technology overview
- **[Component Hierarchy](./docs/component-hierarchy.md)** - Component organization
- **[Internationalization Status](./docs/internationalization-status.md)** - i18n implementation details

## 🔄 Recent Updates

### **Internationalization Implementation** (January 2025)
- ✅ Complete Turkish and English localization
- ✅ All pages and components migrated to use translations
- ✅ Language selector in header
- ✅ Locale-based routing with `/tr` and `/en` prefixes
- ✅ SEO-friendly URL structure

### **Cover Editor Enhancement** (December 2024)
- ✅ Moved from global navigation to group-specific context
- ✅ Live preview with text positioning and templates
- ✅ Background image management

### **Settings Modernization** (December 2024)
- ✅ Modular form components with validation
- ✅ Personal info, security, and notification settings
- ✅ Improved user experience and organization

## 🤝 Development

This project follows modern React and Next.js best practices:

- **Type Safety**: Full TypeScript coverage with strict mode
- **Component Composition**: Reusable, single-responsibility components
- **State Management**: TanStack Query for server state, React hooks for local state
- **Code Quality**: ESLint, Prettier, and consistent code standards
- **Performance**: Automatic code splitting and optimization

## 📄 License

This project is private and proprietary.