# Technical Guide & Documentation

This guide provides technical insights into the architecture, deployment strategies, and pending features of the G-Click Foundation platform.

## 🏗 Architecture & Design Decisions

### 1. Monorepo Strategy
We chose a pseudo-monorepo structure using a root `package.json` with `concurrently` to run both the frontend and backend simultaneously in development. This keeps the codebase unified while allowing independent deployments for production (Vercel for Frontend, Render for Backend).

### 2. The API Proxy (Vercel Rewrites vs. Vite Proxy)
To avoid CORS issues and hardcoding full URLs in the frontend code, we utilize a proxy pattern:
*   **Local Development:** `frontend/vite.config.ts` proxies all `/api/*` requests to `http://localhost:4000`.
*   **Production Deployment:** `frontend/vercel.json` intercepts all `/api/*` requests and rewrites them to your live Render backend URL.
*   **Frontend Helper:** We also implemented an optional `frontend/src/lib/api.ts` utility that reads `VITE_API_URL` from the `.env` file for highly customized API targeting.

### 3. Backend Resiliency
The Node.js Express server is built for production environments:
*   **Helmet:** Injected into `index.ts` to automatically secure HTTP headers against XSS and sniffing attacks.
*   **Morgan:** Configured for request logging, which is essential for diagnosing live traffic issues on Render.
*   **Global Error Handler:** A catch-all middleware intercepts untrapped errors and returns a sanitized `500 Internal Server Error` JSON object, preventing the Node process from crashing and leaking stack traces.

### 4. Database Setup & Seeding
We migrated away from static React arrays to a live PostgreSQL database.
*   **No ORM Overhead:** We utilized the raw `pg` client and `@supabase/supabase-js` for lightweight, fast queries.
*   **Row Level Security (RLS):** By default, Supabase enabled RLS on table creation, which blocked public API reads. We successfully bypassed this by executing an explicit script to disable RLS for the public-facing content tables (Programs, Blog, etc.) so that unauthenticated visitors can view the site data.

---

## 🚀 Deployment Instructions

### Deploying the Backend (Render)
1. Connect your GitHub repository to Render.
2. Create a new **Web Service**.
3. **Root Directory:** Set this strictly to `backend`.
4. **Build Command:** `npm install && npm run build` (This ensures TypeScript compiles to JavaScript).
5. **Start Command:** `npm start`
6. **Environment Variables:** Ensure you add your `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in the Render dashboard.

### Deploying the Frontend (Vercel)
1. Connect your GitHub repository to Vercel.
2. **Root Directory:** Set this strictly to `frontend`.
3. Vercel will automatically detect Vite and run `npm run build`.
4. **Environment Variables:** No variables are strictly required since `vercel.json` handles the routing, but you MUST update `frontend/vercel.json` with your live Render backend URL before deploying!

---

## 📋 What's Left? (Pending Features & Roadmap)

While the core functionality and CMS are fully operational, the following modules require attention in the next iteration:

### 1. The Donation Module
*   **Status:** Pending.
*   **Details:** We postponed the donation integration to prioritize core features. This will require setting up Paystack or a similar payment gateway webhook endpoint (`/api/webhooks/paystack`) to record successful donations into the `sponsorship_log` table.

### 2. Admin Authentication (JWT Authorization)
*   **Status:** Partially Implemented.
*   **Details:** The `AdminDashboard` currently relies on frontend `sessionStorage` for login protection. While this hides the UI, the backend API endpoints (e.g., `POST /api/programs`, `DELETE /api/tracks`) are fully open. 
*   **Action Required:** We need to implement a JWT (JSON Web Token) middleware in Express. When the admin logs in, the backend should issue a token, and the frontend must attach this token as a `Bearer` header to all `POST/PUT/DELETE` requests.

### 3. Image Upload System
*   **Status:** Needs Enhancement.
*   **Details:** Currently, adding images via the Admin Dashboard requires pasting an external URL (e.g., an Unsplash link). 
*   **Action Required:** Implement Multer in the Express backend and configure a Supabase Storage bucket so administrators can directly upload images from their computer to the server.

### 4. Bulk User Upload via Excel/CSV
*   **Status:** Pending.
*   **Details:** You requested the ability to upload an Excel sheet to bulk-add members, and to export them as PDF/Excel. The `xlsx` library is installed in the frontend, but the UI component and parser logic need to be built to feed the existing `POST /api/members/bulk` endpoint.
