# Development Setup Guide

## Prerequisites

Before starting development, ensure you have the following installed:

### **Required Software**
- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** for version control
- **Code Editor** (VS Code recommended)

### **Recommended VS Code Extensions**
- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript Importer** - Auto import management
- **Auto Rename Tag** - HTML/JSX tag renaming
- **Bracket Pair Colorization** - Visual bracket matching

## Initial Setup

### 1. **Clone and Setup Project**
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Verify installation
npm run type-check
```

### 2. **Environment Configuration**
The project uses environment variables for configuration:

```bash
# Create .env.local file (optional)
touch .env.local
```

**Available Environment Variables:**
```bash
# .env.local (optional)
NEXT_PUBLIC_DEFAULT_LOCALE=tr
NEXT_PUBLIC_SUPPORTED_LOCALES=tr,en
```

### 3. **Start Development Server**
```bash
# Start the development server
npm run dev

# Server will be available at:
# - Turkish (default): http://localhost:3000/tr
# - English: http://localhost:3000/en
# - Auto-redirect: http://localhost:3000
```

## Development Workflow

### **Available Scripts**
```bash
# Development
npm run dev           # Start development server with hot reload
npm run build         # Build for production
npm run start         # Start production server (after build)

# Code Quality
npm run lint          # Run ESLint checks
npm run type-check    # TypeScript type checking

# Debugging
npm run lint -- --fix # Auto-fix ESLint issues
```

### **Project Structure Navigation**
```
/frontend
├── /app/[locale]/              # Internationalized pages
│   ├── /coordinator/           # Coordinator dashboard routes
│   └── /participant/           # Participant editor routes
├── /components/                # Reusable components
│   ├── /ui/                   # Basic UI components
│   ├── /layout/               # Layout components
│   ├── /forms/                # Form components
│   └── /shared/               # Business logic components
├── /lib/                      # Utilities and configuration
│   ├── /hooks/                # Custom React hooks
│   ├── /services/             # API service classes
│   ├── /validations/          # Zod schemas
│   └── /i18n/                 # Internationalization config
├── /translations/             # Translation files
│   ├── tr.json                # Turkish translations
│   └── en.json                # English translations
├── /types/                    # TypeScript definitions
└── /mock/                     # Mock data for development
```

## Development Guidelines

### **Code Standards**
- **TypeScript**: All files must be properly typed
- **ESLint**: Follow the configured linting rules
- **Prettier**: Code formatting is enforced
- **Naming**: Use kebab-case for files, PascalCase for components

### **Component Development**
```typescript
// Good component structure
import { useTranslations } from 'next-intl';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  const t = useTranslations('namespace');
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onAction}>{t('action')}</button>
    </div>
  );
}
```

### **Internationalization**
- **Always use translations**: No hardcoded text in components
- **Namespace organization**: Use appropriate translation namespaces
- **Both languages**: Test components in both Turkish and English

```typescript
// Translation usage
const t = useTranslations('coordinator.dashboard');
const common = useTranslations('common');

return (
  <div>
    <h1>{t('title')}</h1>
    <Button>{common('buttons.save')}</Button>
  </div>
);
```

### **Form Development**
```typescript
// Form with validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mySchema } from '@/lib/validations/my-schema';

export default function MyForm() {
  const t = useTranslations('forms');
  
  const form = useForm({
    resolver: zodResolver(mySchema),
    defaultValues: { ... }
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Label>{t('labels.name')}</Label>
      <Input {...form.register('name')} />
    </form>
  );
}
```

## Debugging & Troubleshooting

### **Common Issues**

#### **Translation Keys Not Found**
```bash
# Check console for warnings like:
# "Translation key 'missing.key' not found"

# Solution: Add the key to both tr.json and en.json
{
  "missing": {
    "key": "Your translation here"
  }
}
```

#### **TypeScript Errors**
```bash
# Run type checking
npm run type-check

# Common fixes:
# 1. Add proper types to component props
# 2. Import missing types
# 3. Update interface definitions
```

#### **ESLint Errors**
```bash
# Check linting issues
npm run lint

# Auto-fix most issues
npm run lint -- --fix
```

#### **Build Failures**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint
```

### **Development Tips**

#### **Hot Reload Issues**
If hot reload stops working:
```bash
# Restart the development server
npm run dev
```

#### **Translation Testing**
- Test components in both languages using the header language selector
- Use browser DevTools to check for missing translation warnings
- Verify URL changes when switching languages

#### **Mock Data**
The project uses mock data for development:
```typescript
// Located in /mock/data/
import { mockGroups } from '@/mock';

// Use in components for development
const groups = mockGroups;
```

#### **Component Testing**
```typescript
// Manual testing checklist:
// ✅ Component renders correctly
// ✅ Translations work in both languages
// ✅ Form validation works
// ✅ Error states handled
// ✅ Loading states shown
// ✅ Mobile responsive
```

## Performance & Optimization

### **Development Performance**
- **Use React DevTools** for component debugging
- **Monitor bundle size** with build analysis
- **Check for unnecessary re-renders** with profiler
- **Optimize imports** to avoid large bundles

### **Build Optimization**
```bash
# Analyze bundle size
npm run build

# Check for unused dependencies
# Review package.json regularly
```

## Git Workflow

### **Branching Strategy**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: your descriptive commit message"

# Push branch
git push origin feature/your-feature-name
```

### **Commit Message Format**
```bash
# Follow conventional commits
feat: add new component
fix: resolve translation issue  
docs: update development guide
style: format code with prettier
refactor: improve component structure
```

## Testing Strategy

### **Manual Testing Checklist**
- [ ] **Functionality**: All features work as expected
- [ ] **Internationalization**: Both Turkish and English work correctly
- [ ] **Responsive**: Mobile and desktop layouts
- [ ] **Accessibility**: Keyboard navigation and screen readers
- [ ] **Error Handling**: Graceful error states
- [ ] **Performance**: Fast loading and smooth interactions

### **Browser Testing**
Test in major browsers:
- [ ] **Chrome** (latest 2 versions)
- [ ] **Firefox** (latest 2 versions)
- [ ] **Safari** (latest 2 versions)
- [ ] **Edge** (latest 2 versions)

## Deployment Preparation

### **Pre-deployment Checklist**
```bash
# 1. Type checking
npm run type-check

# 2. Linting
npm run lint

# 3. Build test
npm run build

# 4. Translation completeness
# Check both tr.json and en.json for missing keys

# 5. Manual testing
# Test critical user flows in both languages
```

---

## Quick Reference

### **Key Commands**
```bash
npm run dev              # Start development
npm run build            # Production build
npm run type-check       # TypeScript check
npm run lint            # ESLint check
```

### **Important Paths**
```bash
/app/[locale]/          # All pages
/components/            # Reusable components
/translations/          # tr.json, en.json
/lib/                   # Utilities, hooks, services
```

### **URLs**
```bash
http://localhost:3000/tr    # Turkish version
http://localhost:3000/en    # English version
http://localhost:3000       # Auto-redirect
```

*Last updated: January 2025*