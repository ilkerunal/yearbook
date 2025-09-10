Backend Architecture
This document describes the architectural design and principles of the Digital Yearbook Platform's backend.

1. Architectural Pattern
The backend follows a clean architecture or onion architecture pattern. The core idea is to separate the application's business logic from external concerns like the database or the web framework.

Domain Layer (Core): Contains the core business logic, domain models (e.g., Group, Participant), and interfaces for services. This layer is independent of any external libraries.

Application Layer (Services): Implements the domain interfaces and orchestrates the business logic. This layer handles use cases and interacts with repositories.

Infrastructure Layer (Data): Manages external concerns like data access (Supabase/PostgreSQL) and external API calls.

Presentation Layer (API): The API controllers that handle HTTP requests and responses. They interact with the application layer to fulfill requests.

2. Service Interactions
Authentication
Supabase Authentication handles user registration, login, and session management.

The API validates the JWT token provided by Supabase in the request headers to secure endpoints.

Data Flow
Request: The Next.js frontend sends an authenticated request (e.g., to create a new group) to the .NET API.

API Controller: The controller receives the request, validates the input using FluentValidation, and passes a command to the application layer (using MediatR).

Service/Handler: A dedicated handler in the application layer processes the command, uses a repository to interact with the PostgreSQL database (via Dapper), and executes the business logic.

Response: The result is sent back to the API controller, which returns an HTTP response to the frontend.

PDF Generation Workflow
Frontend Request: The coordinator triggers the PDF generation by sending a request to the backend. The request includes the final, combined HTML content for the entire yearbook.

PDF Service: The PdfService receives the HTML content and uses PuppeteerSharp to launch a headless Chromium browser instance.

Rendering: PuppeteerSharp renders the HTML, CSS, and images in a true browser environment, ensuring all fonts and layouts are preserved.

File Creation: The rendered page is saved as a high-quality PDF file.

Storage: The PDF is uploaded to a cloud storage solution (e.g., Supabase Storage or an external provider like AWS S3).

Response: The API returns the URL of the generated PDF file to the frontend, which the coordinator can then download.