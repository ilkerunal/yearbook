
## MVP Product Definition: The Digital Yearbook Platform (Final)

This document outlines the final scope for our Minimum Viable Product (MVP), incorporating the state-based workflow to manage the creation process. Our goal is to build a streamlined, state-aware platform that transforms yearbook creation from a manual task into a manageable digital project.

### MVP Goals

•⁠  ⁠*Primary Goal:* Enable a *group coordinator* to design a unique yearbook cover, and empower *participants* to create personalized pages, with a transparent workflow that tracks the status of each page from creation to completion. The platform will then automatically combine all approved content into a single, print-ready PDF file.
•⁠  ⁠*Target User:* A single group (e.g., a high school graduating group or a university department).
•⁠  ⁠*Key Value Proposition:* Transform a manual, chaotic process into a streamlined, automated, and digital one with added customization and clear progress tracking.

---

### Technical & Architectural Guidelines

The project will follow a *mono-repository* structure with distinct ⁠ frontend ⁠ and ⁠ backend ⁠ folders.

•⁠  ⁠*Frontend:* Built with *Next.js*.
•⁠  ⁠*Backend:* The choice of technology for the backend is *TBD*, but it should be chosen for its speed and scalability. Node.js or Python (FastAPI/Django) are strong candidates for rapid development.
•⁠  ⁠*Documentation:* Each folder will have its own ⁠ README.md ⁠ file, in addition to a high-level ⁠ README.md ⁠ at the repository root.

---

### MVP Milestones & Deliverables

#### Milestone 1: Core User Flow & Data Collection

This milestone focuses on the fundamental data input and generation engine, now integrated with a state-based workflow.

•⁠  ⁠*Deliverable 1.1: Backend API for User Management & State Tracking*
    * A simple backend API with endpoints to:
        * Create a *group*.
        * Add *participants* and generate unique access links.
        * Manage the state of each participant's page (⁠ Not Started ⁠, ⁠ In Progress ⁠, ⁠ Submitted for Review ⁠, ⁠ Changes Requested ⁠, ⁠ Ready for Approval ⁠).
    * *Tangible Outcome:* A Postman/Swagger collection with working API endpoints that can create and update the state of a page.

•⁠  ⁠*Deliverable 1.2: Participant Page Editor (Frontend)*
    * A single Next.js page that a *participant* can access via their unique link.
    * This page will feature a *WYSIWYG* (What You See Is What You Get) editor with a state-aware UI.
    * The editor will include:
        * An image upload component.
        * Text areas for bios and quotes.
        * A "Submit for Review" button that changes the page's state.
        * A read-only view when the state is ⁠ Submitted for Review ⁠.
    * *Tangible Outcome:* A fully functional page editor where a participant can create and submit their content.

#### Milestone 2: Cover Editor & PDF Generation

This milestone adds customization and automates the final output.

•⁠  ⁠*Deliverable 2.1: Cover Editor (Frontend)*
    * A dedicated Next.js page for the *group coordinator* to design the yearbook's cover.
    * The editor will allow the coordinator to upload a high-resolution image and add a title text.
    * *Tangible Outcome:* A functional web page where the coordinator can design and save the yearbook cover to the backend.

•⁠  ⁠*Deliverable 2.2: Automated PDF Generation Engine (Backend)*
    * A backend service that takes all approved content (⁠ Ready for Approval ⁠ state) and the cover design.
    * The service must use a library (e.g., Puppeteer, PDFKit) to render the cover and each participant's page, ensuring the final PDF matches the user's design choices.
    * The service will then combine the cover and all individual pages into a single, print-ready PDF document.
    * *Tangible Outcome:* A backend API endpoint (⁠ /api/groups/{id}/generate-pdf ⁠) that, when called, creates a complete PDF file and stores it.

•⁠  ⁠*Deliverable 2.3: Coordinator Dashboard (Frontend)*
    * A Next.js page for the *group coordinator* that displays a list of all participants and their page status (e.g., "In Progress," "Submitted for Review"). 
    * The dashboard will include a "Review" button that opens a page for coordinator review.
    * The review page will have "Approve" (sets state to ⁠ Ready for Approval ⁠) and "Request Changes" (sets state to ⁠ Changes Requested ⁠) buttons.
    * The "Generate Yearbook PDF" button will only become active when all pages are in the ⁠ Ready for Approval ⁠ state.
    * *Tangible Outcome:* A functional web page that allows the coordinator to manage the entire workflow and generate the final PDF.

#### Milestone 3: Polishing & Deployment

This final milestone makes the MVP presentable and accessible to a pilot group.

•⁠  ⁠*Deliverable 3.1: User-Friendly UI & Basic Styling*
    * Apply basic CSS styling to all pages to make them visually appealing and easy to use.
    * Ensure the platform is *responsive* on mobile devices.
    * *Tangible Outcome:* A simple, clean user interface across the application.

•⁠  ⁠*Deliverable 3.2: Production Deployment*
    * Set up a hosting environment (e.g., Vercel for frontend, Heroku/DigitalOcean for backend).
    * Deploy the MVP to a live URL.
    * *Tangible Outcome:* A publicly accessible website URL for a pilot group to test the platform.

