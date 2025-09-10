# Project Blueprint: Interview Feedback Quality Assessor

This document outlines the comprehensive plan for developing the "Interview Feedback Quality Assessor" web application. It serves as a guide for a solo developer or an AI coding agent, detailing the architecture, technology stack, and a sprint-by-sprint plan for execution.

## Phase 1: High-Level Architectural Decisions

### 1.1. Architecture Pattern Selection

*   **Decision:** Modular Monolith
*   **Rationale:** The project, as defined in the PRD, is a single-purpose application with a straightforward, linear user workflow. A monolithic architecture is the most efficient choice for a solo developer, minimizing deployment complexity and maximizing development speed. The "modular" aspect will be achieved by organizing the code into distinct, domain-driven modules (e.g., `authentication`, `feedback_processing`) to ensure a clean and maintainable structure. There are no technical requirements in the PRD, such as extreme scaling needs or disparate runtime environments, that would justify the overhead of a microservices architecture.

### 1.2. Technology Stack Selection

The technology stack is chosen based on modern best practices, developer productivity, and performance. All versions are the latest stable releases as of September 2025.

*   **Frontend Framework & UI:**
    *   **Framework:** Next.js
    *   **Version:** ~15.5
    *   **Rationale:** Next.js provides a powerful and flexible framework for building modern React applications. Its App Router will be used for its improved data fetching and layout capabilities, which is ideal for this project's simple, view-based structure.
    *   **UI Components:** shadcn/ui
    *   **Version:** Latest (CLI ~3.2.1)
    *   **Rationale:** shadcn/ui offers a set of accessible and unstyled components that are copied directly into the project. This approach avoids being locked into a specific design system and allows for rapid UI development that can be easily customized to the project's needs.

*   **Backend Runtime & Framework:**
    *   **Runtime:** Python
    *   **Version:** ~3.12 (Stable LTS)
    *   **Rationale:** Python's readability, extensive libraries, and strong community support make it a solid foundation for the backend.
    *   **Framework:** FastAPI
    *   **Version:** ~0.116.1
    *   **Rationale:** FastAPI is a high-performance web framework for Python that is easy to learn and use. Its automatic interactive documentation (Swagger UI) and Pydantic-based data validation will significantly speed up development and testing of the API.

*   **Primary Database:**
    *   **Database:** MongoDB Atlas (Free Tier)
    *   **Rationale:** A NoSQL document database like MongoDB provides the flexibility needed for the application's data, which is primarily semi-structured text. It maps naturally to Python and JavaScript objects, simplifying data access. The free tier of MongoDB Atlas is sufficient for development and early-stage production.

### 1.3. Core Infrastructure & Services (Local Development Focus)

*   **Local Development:** The project will be run using simple command-line instructions (`npm run dev` for frontend, `uvicorn main:app --reload` for backend). No containerization (Docker, etc.) is needed for the MVP.
*   **File Storage:** For handling `.doc`, `.docx`, and `.txt` uploads, a simple local file system storage will be used. A designated, git-ignored directory (`./uploads`) will be created at the root of the backend project.
*   **Job Queues:** Not required for the MVP as all processing is synchronous.
*   **Authentication:** A library-based approach with JWTs (JSON Web Tokens) will be implemented. This is a lightweight and standard method for securing APIs within a monolithic application.
*   **NLP Library:** The `spaCy` library will be used for Natural Language Processing to parse the raw feedback text. It's a powerful, open-source library that can be run locally.
*   **External Services:** None are required for the MVP.

### 1.4. Integration and API Strategy

*   **API Style:** REST. All APIs will be versioned from the start (e.g., `/api/v1/...`).
*   **Standard Formats:**
    *   **Success Response:** `{ "status": "success", "data": { ... } }`
    *   **Error Response:** `{ "status": "error", "message": "Error description" }`

## Phase 2: Detailed Module Architecture

The application will be broken down into logical, domain-driven modules within the monolith.

### 2.1. Module Identification

*   **Backend Modules:**
    *   `UserModule`: Manages user registration, login, and profile data.
    *   `FeedbackModule`: Handles feedback submission, parsing, structuring, and storage.
    *   `CoreModule`: Contains shared utilities, configurations, and database connection logic.
*   **Frontend Modules:**
    *   `AuthModule`: Contains pages and components for login and registration.
    *   `FeedbackModule`: Contains the main feedback submission page and the interactive structured form.
    *   `SharedModule`: Contains shared UI components (e.g., buttons, inputs), layout components, and utility functions.

### 2.2. Module Responsibilities and Contracts

*   **UserModule (Backend):**
    *   **Responsibilities:** Owns user authentication logic. Manages the `users` collection in the database.
    *   **Interface Contract:** Exposes endpoints like `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, and `GET /api/v1/users/me`.
*   **FeedbackModule (Backend):**
    *   **Responsibilities:** Owns the core business logic of parsing and structuring feedback. Manages the `feedback_sessions` collection.
    *   **Interface Contract:** Exposes endpoints like `POST /api/v1/feedback/submit`.
*   **AuthModule (Frontend):**
    *   **Responsibilities:** Manages the UI for user authentication. Handles client-side state for the logged-in user.
    *   **Interface Contract:** Provides pages for `/login` and `/register`.
*   **FeedbackModule (Frontend):**
    *   **Responsibilities:** Manages the UI for the entire feedback submission and structuring workflow.
    *   **Interface Contract:** Provides the main `/` page for submission and a results page (e.g., `/feedback/[sessionId]`) for the interactive form.

### 2.3. Key Module Design

*   **Backend Folder Structure:**
    ```
    backend/
    ├── app/
    │   ├── api/
    │   │   ├── v1/
    │   │   │   ├── endpoints/
    │   │   │   │   ├── auth.py
    │   │   │   │   └── feedback.py
    │   │   │   └── routes.py
    │   ├── core/
    │   │   ├── config.py
    │   │   └── db.py
    │   ├── models/
    │   │   ├── user.py
    │   │   └── feedback.py
    │   ├── schemas/
    │   │   ├── user.py
    │   │   └── feedback.py
    │   └── services/
    │       ├── auth_service.py
    │       └── feedback_service.py
    ├── main.py
    ├── requirements.txt
    └── .env
    ```
*   **Frontend Folder Structure (Next.js App Router):**
    ```
    frontend/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── register/
    │   │       └── page.tsx
    │   ├── (main)/
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── api/
    │   ├── components/
    │   │   ├── shared/
    │   │   └── ui/ (shadcn/ui components)
    │   └── lib/
    ├── globals.css
    └── tailwind.config.js
    ```

## Phase 3: Tactical Sprint-by-Sprint Plan

The development is broken down into tactical sprints. Each sprint delivers a complete, end-to-end, testable feature.

### Sprint S0: Project Foundation & Setup

*   **Project Context:** This project is to build a web application called 'Interview Feedback Quality Assessor', a platform to standardize and improve interview feedback collection.
*   **Goal:** To establish a fully configured, runnable project skeleton on the local machine, with all necessary credentials and basic styling configured, enabling rapid feature development in subsequent sprints.
*   **Tasks:**
    1.  **Developer Onboarding & Repository Setup:**
        *   Ask the developer for the URL of their new, empty GitHub repository for this project.
    2.  **Collect Secrets & Configuration:**
        *   Ask the user to provide the connection string for their MongoDB Atlas free-tier cluster.
        *   Ask the user for the primary and secondary color hex codes for the UI theme.
    3.  **Project Scaffolding:**
        *   Create a monorepo structure with `frontend` and `backend` directories.
        *   Initialize a Git repository.
        *   Create a comprehensive `.gitignore` file at the root.
    4.  **Backend Setup (Python/FastAPI):**
        *   Set up a Python virtual environment inside the `backend` directory.
        *   Install FastAPI, Uvicorn, Pydantic, python-dotenv, pymongo, and other core dependencies.
        *   Create a basic file structure: `main.py`, `requirements.txt`.
        *   Create `backend/.env.example` and `backend/.env`. Populate `backend/.env` with the `DATABASE_URL`.
    5.  **Frontend Setup (Next.js & shadcn/ui):**
        *   Scaffold the frontend application using `create-next-app` in the `frontend` directory.
        *   Use the `npx shadcn-ui@latest init` command to initialize shadcn/ui.
        *   Configure the `tailwind.config.js` file with the primary and secondary colors provided by the user.
        *   Create `frontend/.env.example` and `frontend/.env` for any client-side environment variables.
    6.  **Documentation:**
        *   Create a `README.md` file at the project root.
        *   Populate it with the project context, technology stack, and setup instructions.
    7.  **"Hello World" Verification:**
        *   **Backend:** Create a `/api/v1/health` endpoint that returns `{"status": "ok"}`. Implement the initial database connection logic to MongoDB Atlas, ensuring it connects on startup.
        *   **Frontend:** Create a basic page that fetches data from the backend's `/api/v1/health` endpoint and displays the status.
        *   **User Test:** Ask the user to run the frontend and backend and verify that the "Status: ok" message appears on the web page, and the backend console shows a successful database connection.
    8.  **Final Commit:**
        *   After the user confirms the "Hello World" test is successful, stage all the created files.
        *   Confirm with the user that it's okay to make the first push to the repository.
        *   Commit the initial project structure and push to the `main` branch on GitHub.
*   **Verification Criteria:** The developer can clone the repository, run `pip install -r requirements.txt` and `uvicorn main:app --reload` in the backend, run `npm install` and `npm run dev` in the frontend, and see a "Status: ok" message on the frontend. The backend application successfully connects to the MongoDB Atlas database on startup. All code is on the `main` branch of the provided GitHub repository.

### Sprint S1: User Authentication & Profiles

*   **Project Context:** This sprint builds the foundational user authentication system, which is critical for all personalized features.
*   **Previous Sprint's Accomplishments:** Sprint S0 established a local development environment. The Next.js frontend and FastAPI backend are running and can communicate. A connection to MongoDB Atlas is established.
*   **Goal:** To implement a complete, secure user registration and login system using JWTs.
*   **Relevant Requirements & User Stories:** FR-005
*   **Tasks:**
    1.  **Database Model:**
        *   Define a Pydantic model for the `User` collection in the backend (e.g., `id`, `email`, `hashed_password`, `createdAt`).
    2.  **Backend: Registration Logic:**
        *   Add `passlib` and `python-jose` to `requirements.txt` for password hashing and JWTs.
        *   Implement the `POST /api/v1/auth/register` endpoint. It should take an email and password, hash the password, and create a new user in the database.
        *   **User Test:** Ask the user to test this endpoint using an API client (like Insomnia/Postman) and verify the new user appears correctly in the MongoDB Atlas collection with a hashed password.
    3.  **Backend: Login Logic:**
        *   Implement the `POST /api/v1/auth/login` endpoint. It should verify credentials and return a JWT access token.
        *   **User Test:** Ask the user to test this endpoint with both correct and incorrect credentials.
    4.  **Backend: Protected Route:**
        *   Create authentication middleware/dependency in FastAPI to validate JWTs.
        *   Create a protected endpoint `GET /api/v1/users/me` that requires a valid token and returns the current user's data.
        *   **User Test:** Ask the user to test this endpoint with and without a valid token.
    5.  **Frontend: UI Pages:**
        *   Using shadcn/ui components (Input, Button, Card), build the UI for a login page and a register page.
        *   Build a placeholder profile page.
        *   **User Test:** Ask the user to review the pages in the browser and confirm the look and feel.
    6.  **Frontend: State & API Integration:**
        *   Set up global state management for the user session (e.g., using React Context).
        *   Implement client-side forms with validation for login and registration that call the backend endpoints.
        *   Implement logic to store the JWT in `localStorage` and update the global state upon successful login.
        *   Implement logic to protect the profile page from unauthenticated access (redirect to `/login`).
        *   The profile page should fetch and display the user's email from the `/api/v1/users/me` endpoint.
        *   **User Test:** Ask the user to perform a full end-to-end test: register, log in, be taken to the protected profile page, see their email, and log out.
    7.  **Final Commit:**
        *   After the user confirms all functionality is working, confirm with the user that the sprint is complete.
        *   Commit all changes with a descriptive message (e.g., "feat: implement user authentication") and push the `main` branch to GitHub.
*   **Verification Criteria:** A user can register, log in, view a protected profile page, and log out. Unauthenticated users are redirected from protected pages. User data is correctly stored and secured in MongoDB.

### Sprint S2: Core Feedback Processing Workflow

*   **Project Context:** This sprint implements the core value proposition of the application: submitting raw feedback and getting a structured, editable form in return.
*   **Previous Sprint's Accomplishments:** A complete user authentication system is in place. Users can register, log in, and access protected routes.
*   **Goal:** To allow an authenticated user to submit feedback (via text paste or file upload), have it parsed by the backend, and then displayed in an interactive form.
*   **Relevant Requirements & User Stories:** FR-001, FR-002, FR-003
*   **Tasks:**
    1.  **Backend: File Upload & Parsing Logic:**
        *   Add `python-docx` and `spacy` to `requirements.txt`.
        *   Implement the `POST /api/v1/feedback/submit` endpoint. It should accept both a JSON payload with raw text and a file upload.
        *   Implement a `FeedbackService` that reads the text from the input (raw or from file).
        *   Use `spaCy` to perform basic Named Entity Recognition (NER) to extract entities like names, dates, etc.
        *   Implement logic to map extracted entities to the structured form fields.
        *   Save the raw input and the parsed JSON data into a new `feedback_sessions` collection in MongoDB, linked to the user.
        *   The endpoint should return the newly created feedback session object, including the parsed data.
        *   **User Test:** Ask the user to test the endpoint with sample feedback text and a sample `.docx` file, and verify the returned JSON contains the expected parsed data.
    2.  **Frontend: Feedback Submission UI:**
        *   Create the main feedback submission page.
        *   Use shadcn/ui components to build a text area for pasting text and a file input for uploads.
        *   Implement the API call to the `POST /api/v1/feedback/submit` endpoint.
        *   On a successful response, redirect the user to a dynamic page for the interactive form (e.g., `/feedback/[sessionId]`).
        *   **User Test:** Ask the user to test the UI by pasting text and uploading a file, and confirm they are redirected upon successful submission.
    3.  **Frontend: Interactive Structured Form:**
        *   Create the dynamic page `app/(main)/feedback/[sessionId]/page.tsx`.
        *   This page should fetch the feedback session data from the backend based on the `sessionId`.
        *   Build the form using shadcn/ui components, populating the fields with the fetched data.
        *   Clearly highlight the fields that are mandatory but were not filled by the parser.
        *   **User Test:** Ask the user to verify that the form is correctly populated with the data from the previous step.
    4.  **Frontend: Form Completion (No-Save MVP):**
        *   For the MVP, the user can fill in the form, but the changes will not be saved back to the database. The primary goal is to get the data ready for export in the next sprint.
        *   **User Test:** Ask the user to fill in the missing fields and confirm the UI works as expected.
    5.  **Final Commit:**
        *   After the user confirms all functionality is working, commit all changes and push to GitHub.
*   **Verification Criteria:** An authenticated user can submit feedback via text or file, and is then presented with a structured form where the system has made a best effort to parse and pre-fill the data.

### Sprint S3: Feedback Export

*   **Project Context:** This sprint completes the core user workflow by allowing the user to export their finalized feedback.
*   **Previous Sprint's Accomplishments:** Users can submit and view their parsed feedback in a structured form.
*   **Goal:** To enable users to export the completed feedback form as a PDF or Word document.
*   **Relevant Requirements & User Stories:** FR-004
*   **Tasks:**
    1.  **Backend: Export Logic:**
        *   Add libraries for PDF and Word document generation (e.g., `reportlab` for PDF, `python-docx` for writing).
        *   Create a new endpoint `GET /api/v1/feedback/{session_id}/export?format=pdf`.
        *   This endpoint will take the structured data from the user's form submission (passed in the request body of a POST, or fetched from DB if we decide to save), format it into a clean document, and return it as a file stream.
        *   Implement the same for `?format=docx`.
        *   **User Test:** Ask the user to test the endpoints directly to verify that they download correctly formatted files.
    2.  **Frontend: Export UI:**
        *   On the interactive form page, add "Export as PDF" and "Export as Word" buttons.
        *   When a button is clicked, gather all the current data from the form fields.
        *   Make a `POST` request to a new endpoint like `/api/v1/feedback/export` sending the final form data, and have the backend return the file.
        *   Implement the logic to handle the file download in the browser.
        *   **User Test:** Ask the user to perform the full end-to-end flow: submit feedback, fill in the form, and click the export buttons. Verify the downloaded documents contain the final, user-edited data.
    3.  **Final Commit:**
        *   After the user confirms the export functionality is working, commit all changes and push to GitHub.
*   **Verification Criteria:** A user can export their completed and edited feedback form into both PDF and `.docx` formats, and the downloaded files accurately reflect the data in the form.