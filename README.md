# G-Click Foundation

Welcome to the **G-Click Foundation** monorepo! This repository contains the complete full-stack infrastructure for the G-Click Foundation web platform, designed with a modern, high-performance tech stack.

## 🚀 Project Overview

G-Click Foundation's platform is built to deliver a premium, visually striking experience for users while providing a robust, database-driven Admin Console for foundation administrators to manage content dynamically.

### Key Features Implemented:
*   **Dynamic Content Management System (CMS):** A fully functional Admin Dashboard to manage Programs, Blog Posts, Educational Tracks, Interactive Labs, News, Resources, and Leadership profiles.
*   **Database Integration:** Seamlessly connected to a PostgreSQL database hosted on Supabase, replacing hardcoded static data with live API endpoints.
*   **Premium Visual Redesign:** A sleek, dark-themed UI featuring glassmorphism, gradient glows, scroll-reveals, and micro-animations to create a state-of-the-art user experience.
*   **Members Directory & Registration:** A comprehensive member onboarding flow that captures critical background info (location, student status, employment) and stores it directly in the database.
*   **Production-Ready Monorepo:** Structured properly with separated `frontend` (React/Vite) and `backend` (Express/Node) directories, complete with deployment configurations.

## 🛠 Tech Stack

*   **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide React (Icons), React Router.
*   **Backend:** Node.js, Express, TypeScript, pg (PostgreSQL Client).
*   **Database:** PostgreSQL (via Supabase).
*   **Hosting Configuration:** Vercel (Frontend via `vercel.json` rewrites) and Render (Backend Express Server).

## 📂 Project Structure

```text
gclick-foundation/
│
├── frontend/             # React (Vite) Application
│   ├── public/           # Static assets (images, icons)
│   ├── src/              # React components, pages, and API helpers
│   ├── vercel.json       # Vercel deployment configuration (API Rewrites)
│   └── package.json      # Frontend dependencies
│
├── backend/              # Node.js Express API Server
│   ├── src/              # API Routes (members, programs, blog, etc.)
│   ├── src/db/           # Database setup and Supabase Client
│   ├── index.ts          # Express Server entry point (with Security/Logging)
│   └── package.json      # Backend dependencies
│
└── package.json          # Root Monorepo configuration
```

## 💻 Getting Started (Local Development)

To run the entire stack locally with a single command:

1.  Ensure you have Node.js installed.
2.  Install the root `concurrently` package:
    ```bash
    npm install
    ```
3.  Install dependencies for both the frontend and backend:
    ```bash
    cd frontend && npm install
    cd ../backend && npm install
    ```
4.  Run the development server from the root directory:
    ```bash
    npm run dev
    ```
    *The frontend will be available at `http://localhost:5173` and the backend API at `http://localhost:4000`.*

---
*For in-depth architectural decisions, deployment instructions, and future roadmaps, please read the `TECHNICAL_GUIDE.md`.*
