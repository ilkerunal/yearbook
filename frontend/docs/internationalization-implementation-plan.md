# Internationalization Implementation Plan

## Overview

This document outlines the comprehensive plan to implement internationalization (i18n) for the Digital Yearbook Platform, supporting Turkish (default) and English languages. The implementation will ensure all hardcoded text is migrated to locale files with a structured, non-repetitive approach.

## Goals

- **Primary Language**: Turkish (tr) as default
- **Secondary Language**: English (en)
- **Complete Coverage**: All hardcoded text migrated to locale files
- **User Experience**: Seamless language switching without page reload
- **Developer Experience**: Clear structure for adding new translations
- **Maintainability**: Organized, hierarchical translation keys

## Technology Stack

### **Next.js 14 App Router Internationalization**
- **Built-in i18n**: Leverage Next.js native internationalization
- **Route-based locales**: `/tr/coordinator` and `/en/coordinator`
- **Automatic locale detection**: Browser preference detection
- **SEO-friendly**: Proper hreflang and locale-specific URLs

### **Translation Library**
- **next-intl**: Modern i18n solution for Next.js App Router
- **Type safety**: TypeScript integration for translation keys
- **Rich formatting**: Support for pluralization, numbers, dates
- **Namespace organization**: Structured translation files

## Project Structure

```
/frontend
├── /app
│   ├── /[locale]                    # NEW - Locale wrapper
│   │   ├── /coordinator             # Moved under locale
│   │   ├── /participant             # Moved under locale
│   │   ├── layout.tsx               # Locale-aware layout
│   │   └── page.tsx                 # Locale-aware homepage
│   ├── layout.tsx                   # Root layout (minimal)
│   └── globals.css                  # Global styles
├── /components
│   ├── /ui
│   │   └── language-selector.tsx    # NEW - Language switcher
│   └── /layout
│       └── app-header.tsx           # UPDATED - Include language selector
├── /lib
│   ├── /i18n                        # NEW - Internationalization
│   │   ├── config.ts                # i18n configuration
│   │   ├── request.ts               # Server-side i18n
│   │   └── client.ts                # Client-side i18n
│   └── /translations               # NEW - Translation files
│       ├── /tr                     # Turkish translations
│       │   ├── common.json         # Common UI elements
│       │   ├── navigation.json     # Navigation items
│       │   ├── coordinator.json    # Coordinator-specific
│       │   ├── participant.json    # Participant-specific
│       │   ├── forms.json          # Form labels and validation
│       │   ├── cover-editor.json   # Cover editor interface
│       │   ├── settings.json       # Settings pages
│       │   └── errors.json         # Error messages
│       └── /en                     # English translations
│           ├── common.json         # (Same structure as Turkish)
│           ├── navigation.json
│           ├── coordinator.json
│           ├── participant.json
│           ├── forms.json
│           ├── cover-editor.json
│           ├── settings.json
│           └── errors.json
├── /types
│   └── translations.ts             # NEW - Translation type definitions
└── middleware.ts                   # NEW - Locale detection middleware
```

## Implementation Phases

### **Phase 1: Core Infrastructure Setup** (Week 1)

#### 1.1 Install Dependencies
```bash
npm install next-intl
npm install -D @types/node
```

#### 1.2 Next.js Configuration
```typescript
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // existing config
};

export default withNextIntl(nextConfig);
```

#### 1.3 Middleware Setup
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' // /tr/coordinator, /en/coordinator
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

#### 1.4 i18n Configuration
```typescript
// lib/i18n/config.ts
export const locales = ['tr', 'en'] as const;
export const defaultLocale = 'tr' as const;

export type Locale = typeof locales[number];

export const localeNames = {
  tr: 'Türkçe',
  en: 'English'
} as const;

export const localeFlags = {
  tr: '🇹🇷',
  en: '🇺🇸'
} as const;
```

### **Phase 2: Translation File Structure** (Week 1-2)

#### 2.1 Translation Namespace Organization

**Common UI Elements** (`common.json`)
```json
{
  "buttons": {
    "save": "Kaydet",
    "cancel": "İptal",
    "delete": "Sil",
    "edit": "Düzenle",
    "create": "Oluştur",
    "submit": "Gönder",
    "back": "Geri",
    "next": "İleri",
    "previous": "Önceki",
    "close": "Kapat",
    "confirm": "Onayla"
  },
  "states": {
    "loading": "Yükleniyor...",
    "saving": "Kaydediliyor...",
    "deleting": "Siliniyor...",
    "updating": "Güncelleniyor...",
    "success": "Başarılı",
    "error": "Hata",
    "warning": "Uyarı"
  },
  "actions": {
    "viewDetails": "Detayları Görüntüle",
    "settings": "Ayarlar",
    "download": "İndir",
    "upload": "Yükle",
    "search": "Ara",
    "filter": "Filtrele",
    "sort": "Sırala"
  }
}
```

**Navigation** (`navigation.json`)
```json
{
  "coordinator": {
    "dashboard": "Panel",
    "groups": "Gruplar",
    "reports": "Raporlar",
    "settings": "Ayarlar"
  },
  "breadcrumbs": {
    "home": "Ana Sayfa",
    "groups": "Gruplar",
    "newGroup": "Yeni Grup",
    "groupDetails": "Grup Detayları",
    "coverEditor": "Kapak Editörü",
    "settings": "Ayarlar"
  }
}
```

**Forms** (`forms.json`)
```json
{
  "labels": {
    "name": "Ad",
    "email": "E-posta",
    "phone": "Telefon",
    "school": "Okul",
    "role": "Rol",
    "password": "Şifre",
    "confirmPassword": "Şifre Tekrarı",
    "coverTitle": "Kapak Başlığı"
  },
  "placeholders": {
    "enterName": "Adınızı girin...",
    "enterEmail": "E-posta adresinizi girin...",
    "searchGroups": "Grupları ara...",
    "enterTitle": "Başlık girin..."
  },
  "validation": {
    "required": "Bu alan zorunludur",
    "invalidEmail": "Geçerli bir e-posta adresi girin",
    "minLength": "En az {min} karakter olmalı",
    "maxLength": "En fazla {max} karakter olmalı",
    "passwordMismatch": "Şifreler eşleşmiyor",
    "invalidPhone": "Geçerli bir telefon numarası girin"
  }
}
```

#### 2.2 Translation Type Safety
```typescript
// types/translations.ts
export interface TranslationKeys {
  common: {
    buttons: Record<string, string>;
    states: Record<string, string>;
    actions: Record<string, string>;
  };
  navigation: {
    coordinator: Record<string, string>;
    breadcrumbs: Record<string, string>;
  };
  forms: {
    labels: Record<string, string>;
    placeholders: Record<string, string>;
    validation: Record<string, string>;
  };
  // ... other namespaces
}
```

### **Phase 3: App Router Restructuring** (Week 2)

#### 3.1 Locale Wrapper Implementation
```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ 
  children, 
  params: { locale } 
}: LocaleLayoutProps) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

#### 3.2 Page Migration Strategy
- Move all existing pages from `/app` to `/app/[locale]`
- Update all internal links to include locale parameter
- Maintain existing component structure

### **Phase 4: Language Selector Component** (Week 2)

#### 4.1 Language Selector Component
```typescript
// components/ui/language-selector.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './button';
import { locales, localeNames, localeFlags } from '@/lib/i18n/config';

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <Button
          key={loc}
          variant={locale === loc ? "default" : "ghost"}
          size="sm"
          onClick={() => handleLanguageChange(loc)}
          className="min-w-[80px]"
        >
          <span className="mr-2">{localeFlags[loc]}</span>
          {localeNames[loc]}
        </Button>
      ))}
    </div>
  );
}
```

#### 4.2 Header Integration
```typescript
// components/layout/app-header.tsx (updated)
import { LanguageSelector } from '@/components/ui/language-selector';

export function AppHeader() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          {/* Logo and navigation */}
        </div>
        
        {/* Language selector in top right */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {/* Other header actions */}
        </div>
      </div>
    </header>
  );
}
```

### **Phase 5: Text Migration Strategy** (Week 3-4)

#### 5.1 Migration Approach
1. **Component-by-Component**: Migrate one component at a time
2. **Namespace Mapping**: Map components to translation namespaces
3. **Search and Replace**: Systematic replacement of hardcoded strings
4. **Translation Hook Usage**: Implement `useTranslations` in components

#### 5.2 Component Migration Pattern
```typescript
// Before (hardcoded)
export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Details</CardTitle>
        <CardDescription>Manage your yearbook group</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>View Details</Button>
        <Button>Settings</Button>
      </CardContent>
    </Card>
  );
}

// After (internationalized)
import { useTranslations } from 'next-intl';

export function GroupCard({ group }: GroupCardProps) {
  const t = useTranslations('coordinator.groups');
  const common = useTranslations('common');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('groupDetails')}</CardTitle>
        <CardDescription>{t('manageDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button>{common('actions.viewDetails')}</Button>
        <Button>{common('actions.settings')}</Button>
      </CardContent>
    </Card>
  );
}
```

#### 5.3 Form Migration Strategy
```typescript
// Form validation with i18n
import { useTranslations } from 'next-intl';

export function PersonalInfoForm() {
  const t = useTranslations('forms');
  
  const schema = z.object({
    name: z.string()
      .min(2, t('validation.minLength', { min: 2 }))
      .max(50, t('validation.maxLength', { max: 50 })),
    email: z.string()
      .email(t('validation.invalidEmail'))
  });

  return (
    <form>
      <Label>{t('labels.name')}</Label>
      <Input placeholder={t('placeholders.enterName')} />
      {/* Form fields */}
    </form>
  );
}
```

### **Phase 6: Content Migration Checklist** (Week 4-5)

#### 6.1 Component Coverage

**Navigation & Layout**
- [ ] Coordinator sidebar navigation
- [ ] App header and breadcrumbs
- [ ] Page wrappers and layouts

**Dashboard & Groups**
- [ ] Coordinator dashboard cards and stats
- [ ] Groups listing page
- [ ] Group details page
- [ ] Create group form
- [ ] Group settings page

**Cover Editor**
- [ ] Cover editor interface
- [ ] Tools and controls
- [ ] Templates and presets
- [ ] Save/export actions

**Settings**
- [ ] Personal information form
- [ ] Security settings form
- [ ] Notification preferences
- [ ] Account overview

**Participant**
- [ ] Participant landing page
- [ ] Editor interface
- [ ] Submission workflow

**Common Elements**
- [ ] Buttons and actions
- [ ] Error messages and states
- [ ] Loading and success messages
- [ ] Confirmation dialogs

#### 6.2 Translation Quality Assurance
- **Native Review**: Turkish translations reviewed by native speakers
- **Context Validation**: Ensure translations make sense in context
- **UI Testing**: Test all UI elements in both languages
- **Length Consideration**: Account for text length differences

### **Phase 7: Advanced Features** (Week 5-6)

#### 7.1 Date and Number Formatting
```typescript
// lib/i18n/formatters.ts
import { useFormatter } from 'next-intl';

export function useLocalizedFormatters() {
  const format = useFormatter();
  
  return {
    date: (date: Date) => format.dateTime(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    currency: (amount: number) => format.number(amount, {
      style: 'currency',
      currency: 'TRY' // Turkish Lira
    }),
    percentage: (value: number) => format.number(value / 100, {
      style: 'percent'
    })
  };
}
```

#### 7.2 Pluralization Support
```json
// translations/tr/coordinator.json
{
  "participants": {
    "count": {
      "zero": "Katılımcı yok",
      "one": "{count} katılımcı",
      "other": "{count} katılımcı"
    }
  }
}
```

#### 7.3 Rich Text Formatting
```typescript
const t = useTranslations('coordinator');

// Usage with rich formatting
t.rich('welcomeMessage', {
  name: user.name,
  strong: (chunks) => <strong>{chunks}</strong>,
  link: (chunks) => <Link href="/help">{chunks}</Link>
});
```

## Testing Strategy

### **Manual Testing**
- [ ] Language switching functionality
- [ ] URL structure (`/tr/coordinator`, `/en/coordinator`)
- [ ] Browser language detection
- [ ] Form validation in both languages
- [ ] Date/number formatting

### **Automated Testing**
- [ ] Translation key coverage tests
- [ ] Missing translation detection
- [ ] Link integrity across locales
- [ ] Component rendering in both languages

### **Performance Testing**
- [ ] Translation bundle size impact
- [ ] Page load times with i18n
- [ ] Memory usage optimization

## Migration Timeline

### **Week 1: Infrastructure**
- Install and configure next-intl
- Set up translation file structure
- Create language selector component
- Implement App Router locale wrapper

### **Week 2: Core Components**
- Migrate navigation and layout components
- Implement header with language selector
- Set up common translation namespaces
- Create translation utility functions

### **Week 3: Major Pages**
- Migrate coordinator dashboard
- Translate groups management pages
- Implement cover editor translations
- Update form components

### **Week 4: Settings & Forms**
- Migrate all settings pages
- Translate form validation messages
- Implement participant pages
- Add error message translations

### **Week 5: Polish & Testing**
- Complete remaining components
- Add pluralization and formatting
- Comprehensive testing
- Translation quality review

### **Week 6: Deployment**
- Production deployment preparation
- SEO optimization for multiple locales
- Performance optimization
- Documentation finalization

## SEO Considerations

### **URL Structure**
- `/tr/coordinator/groups` (Turkish)
- `/en/coordinator/groups` (English)
- Automatic canonical URLs
- Proper hreflang implementation

### **Meta Tags**
```typescript
// Locale-specific metadata
export function generateMetadata({ params: { locale } }) {
  const t = getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        tr: '/tr',
        en: '/en'
      }
    }
  };
}
```

## Deployment Strategy

### **Environment Configuration**
```bash
# Environment variables
NEXT_PUBLIC_DEFAULT_LOCALE=tr
NEXT_PUBLIC_SUPPORTED_LOCALES=tr,en
```

### **Build Optimization**
- Translation file code-splitting
- Locale-specific bundle optimization
- Static generation for locale routes

## Maintenance Guidelines

### **Adding New Translations**
1. Add key to all locale files
2. Update TypeScript definitions
3. Test in both languages
4. Document translation context

### **Translation Updates**
1. Version control translation files
2. Translation review workflow
3. Quality assurance process
4. Rollback procedures

## Success Metrics

### **Technical Metrics**
- [ ] 100% hardcoded text elimination
- [ ] < 200ms language switch time
- [ ] < 5% bundle size increase
- [ ] Zero translation key errors

### **User Experience Metrics**
- [ ] Seamless language switching
- [ ] Consistent UI in both languages
- [ ] Proper text truncation handling
- [ ] Cultural appropriateness

---

**This implementation plan provides a comprehensive roadmap for implementing internationalization with Turkish as the default language and English as secondary support. The structured approach ensures maintainable, scalable, and user-friendly multilingual support.**