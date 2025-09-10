

## **1. Technology Stack**

This project is built using modern and robust technologies to ensure a fast, scalable, and maintainable application.

  * **Framework:** [Next.js](https://nextjs.org/)
  * **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
  * **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  * **Form Management:** [React Hook Form](https://react-hook-form.com/)
  * **Data Validation:** [Zod](https://zod.dev/)
  * **Data Fetching:** [React Query (TanStack Query)](https://tanstack.com/query/latest)
  * **Content Editor:** [Editor.js](https://editorjs.io/)
  * **Language:** [TypeScript](https://www.typescriptlang.org/)

-----

## **2. Core Features**

### **Coordinator Dashboard**

  * **Group Management:** The coordinator can view a list of all participants in their group.
  * **State-Based Workflow:** A clear visual representation of each participant's page status (`Not Started`, `In Progress`, `Submitted for Review`, `Changes Requested`, `Ready for Approval`).
  * **Page Review:** The coordinator can review a submitted page and either approve it or request changes with comments.
  * **Cover Editor:** A group-specific interface for designing each yearbook's cover with live preview, text customization, and templates.
  * **Settings Management:** Modular settings with personal information, security, and notification preferences.
  * **PDF Generation:** A button to trigger the final PDF compilation and download the file once all pages are approved.

### **Participant Editor**

  * **Personalized Page:** Participants access a unique, private page to create their yearbook entry.
  * **WYSIWYG Editor:** A block-based editor powered by **Editor.js** that allows participants to add and arrange text and images.
  * **Content Management:** Participants can save their progress and submit their page for review.
  * **Read-Only View:** The page becomes read-only after submission until the coordinator requests changes.

-----

## **3. Getting Started**

### **Prerequisites**

  * [Node.js](https://nodejs.org/) (version 18 or higher)
  * [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Installation**

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### **Running the Development Server**

1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Open your browser and visit: `http://localhost:3000`

-----

## **4. Project Structure**

```
/frontend
|-- /app                          # Next.js App Router pages
|   |-- /coordinator              # Coordinator dashboard routes
|   |   |-- /groups               # Group management
|   |   |   |-- /[groupId]        # Dynamic group routes
|   |   |   |   |-- /cover-editor # Group-specific cover editor
|   |   |   |   |-- /settings     # Group settings
|   |   |   |   |-- page.tsx      # Group details
|   |   |   |-- /new              # Create new group
|   |   |   |-- page.tsx          # Groups listing
|   |   |-- /reports              # Reports and analytics
|   |   |-- /settings             # Coordinator settings
|   |   |-- page.tsx              # Dashboard
|   |-- /participant              # Participant editor routes
|   |   |-- /[token]              # Dynamic participant routes
|   |   |-- page.tsx              # Participant landing
|   |-- layout.tsx               # Root layout
|   |-- page.tsx                 # Homepage
|-- /components                   # Reusable React components
|   |-- index.ts                 # Barrel exports for single-line imports
|   |-- /ui                      # Shadcn UI components
|   |-- /layout                  # Layout-specific components
|   |-- /forms                   # Form components with validation
|   |   |-- create-group-form.tsx
|   |   |-- personal-info-form.tsx
|   |   |-- security-settings-form.tsx
|   |   |-- notification-settings-form.tsx
|   |-- /editor                  # Editor.js related components
|   |-- /shared                  # Shared business components
|   |-- providers.tsx            # React Query provider
|-- /lib                         # Utilities and configuration
|   |-- /hooks                   # TanStack Query custom hooks
|   |-- /services                # API service classes
|   |-- /validations             # Zod validation schemas
|   |-- utils.ts                 # Utility functions
|   |-- queryClient.ts           # React Query client setup
|-- /types                       # TypeScript type definitions
|-- /mock                        # Mock data and API for development
|   |-- /data                    # Mock data files
|   |-- /api                     # Mock API implementations
|-- /docs                        # Project documentation
|   |-- development-guidelines.md
|   |-- tech-stack.md
|   |-- recent-changes-december-2024.md
|-- next.config.mjs
|-- tsconfig.json
|-- package.json
|-- README.md
```

## **5. Recent Updates (December 2024)**

### **Cover Editor Improvements**
- Moved from global navigation to group-specific context
- Added cover editor buttons on group cards and detail pages
- Enhanced with live preview, text positioning, and template system

### **Settings Modernization**
- Split monolithic settings into modular form components
- Added comprehensive validation with Zod schemas
- Improved user experience with better layout and organization

### **Architecture Enhancements**
- Resolved circular dependency issues
- Established clear import patterns
- Updated documentation and development guidelines

For detailed information about recent changes, see `/docs/recent-changes-december-2024.md`

This structured `README.md` clearly defines the project's purpose, technology stack, features, and how to get started. It serves as an excellent starting point for any developer joining the project.