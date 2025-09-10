# Interview Feedback Quality Assessor

This project is a web application designed to standardize and improve the quality of interview feedback collection. It takes in raw text or `.doc` files containing interviewer notes, parses the contents, and reformats them into a structured, fillable form.

## Technology Stack

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
*   **Backend:** Python, FastAPI, MongoDB
*   **NLP:** spaCy

## Local Development Setup

### Prerequisites

*   Node.js (v18 or later)
*   Python (v3.10 or later)
*   MongoDB Atlas account (free tier)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```
3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Create a `.env` file and add your MongoDB connection string:
    ```bash
    echo "DATABASE_URL='your-mongodb-connection-string'" > .env
    ```
5.  Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

The application should now be running at `http://localhost:3000`.