

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
  * **Cover Editor:** A dedicated interface for designing the yearbook's cover.
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
|-- /app                   # Next.js app router pages
|   |-- /coordinator       # Coordinator dashboard routes
|   |-- /participant       # Participant editor routes
|   |-- /api               # Next.js API routes (if any)
|-- /components            # Reusable React components
|   |-- /ui                # Shadcn UI components
|   |-- /editor            # Custom Editor.js blocks and editor component
|   |-- /forms             # Form components using React Hook Form
|-- /lib                   # Utility functions and React Query setup
|   |-- /hooks             # Custom hooks
|   |-- /utils.ts          # General utilities
|   |-- /queryClient.ts    # React Query client setup
|-- /styles                # Tailwind CSS configuration
|-- /types                 # TypeScript type definitions
|-- next.config.js
|-- tsconfig.json
|-- package.json
|-- README.md
```

This structured `README.md` clearly defines the project's purpose, technology stack, features, and how to get started. It serves as an excellent starting point for any developer joining the project.