
Backend Technology Stack
This document provides a detailed overview of the technologies and libraries used in the backend of the Digital Yearbook Platform.

1. Core Framework and Language
.NET 8.0: A powerful, cross-platform, and high-performance framework for building scalable web applications and APIs. C# is the primary language used.

2. Database and Authentication
Supabase: An open-source Firebase alternative that provides a PostgreSQL database, real-time subscriptions, and a robust authentication system. We use it for:

Database: PostgreSQL for storing group and participant data.

Authentication: Supabase Auth for managing user sessions and access control.

3. PDF Generation
PuppeteerSharp: A .NET port of the popular Puppeteer library. It controls a headless Chromium browser instance to convert HTML from the frontend's editor into a high-quality, print-ready PDF. This ensures pixel-perfect fidelity between the participant's view and the final document.

4. Key Libraries and Packages
Dapper: A lightweight object-relational mapper (ORM) for efficient and fast data access to the PostgreSQL database.

MediatR: An in-process messaging library that helps implement the CQRS (Command Query Responsibility Segregation) and Mediator design patterns. This keeps the codebase organized and decoupled.

FluentValidation: A popular .NET library for building strongly-typed validation rules for our API requests and data models.

Swashbuckle: A tool to generate Swagger/OpenAPI documentation for our API endpoints, making it easy to test and integrate with the frontend.
