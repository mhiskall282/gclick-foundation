# Technical Guide & Documentation

This guide provides deep technical insights into the architecture, database configurations, optimization settings, and administrative operations of the G-Click Foundation platform.

---

## 🏗️ Architecture & Core Components

### 1. Monorepo & Dev Server Structure
The repository is structured as a full-stack monorepo:
*   **Root Folder:** Holds configuration files and runs a combined development environment (`npm run dev`) via the `concurrently` package.
*   **`/frontend`:** A standalone React 18, Vite, and TypeScript SPA styled with a custom dark obsidian and neon pink theme.
*   **`/backend`:** A standalone Node.js and Express API server written in TypeScript that connects to Supabase.

### 2. API Proxy Routing & Deployments
To handle CORS and route requests clean of absolute domains, we deploy a proxy pattern:
*   **Local Development:** Vite's dev server (`/frontend/vite.config.ts`) proxies `/api/*` directly to `http://localhost:4000`.
*   **Production Deployment:** Both `frontend/vercel.json` and the root `vercel.json` rewrite `/api/:path*` directly to your live Render backend URL (`https://gclick-foundation.onrender.com/api/:path*`). All other SPA routes fall back to `/index.html`.
*   **URL Path Sanitizer:** To avoid double slash route mismatches (which result in `404 Not Found` HTML responses), the helper `getApiUrl` (`/frontend/src/lib/api.ts`) strips trailing slashes from the environment's `VITE_API_URL` and normalizes paths.

---

## 🔒 Security & Authentication

### 1. JWT Middleware & Authorization Headers
Every modifying action (`POST`, `PUT`, `DELETE`) on the backend is protected by the `verifyToken` middleware (`/backend/src/middleware/auth.ts`). 
*   **Authentication Flow:** Administrators log in at `/admin/login`, which returns a signed JSON Web Token (JWT) on success.
*   **Headers:** The frontend stores this token in `localStorage`. Every CMS component executes queries using the `fetchApi` wrapper, which automatically injects the token as an `Authorization: Bearer <token>` header.
*   **Root Credentials:** Root access credentials are configured in the backend `.env` file under `ADMIN_EMAIL` and `ADMIN_PASSWORD` (currently set to your requested `Mhiskall9090`).

### 2. Administrative User Management (Sub-Admins)
The Root Admin can create additional sub-admin accounts dynamically via the **Admin Users** console.
*   New accounts are stored in the `admin_users` table in your Supabase database.
*   Passwords are hashed securely with a 10-round `bcrypt` salt before insertion.

---

## 💾 Database Configuration & RLS

We connect directly to your PostgreSQL database hosted on Supabase:
*   **pg client & pooler:** Raw client connections are established using the pooler URL.
*   **Row Level Security (RLS):** Because the backend environment is configured with a Supabase public publishable key (`sb_publishable_...`), Supabase RLS is enforced.
*   **Disabled RLS Tables:** To allow database mutations (such as member registration and sub-admin creation) to succeed without violating RLS rules, Row Level Security has been explicitly disabled on the following tables using root PostgreSQL commands:
    ```sql
    ALTER TABLE programs DISABLE ROW LEVEL SECURITY;
    ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
    ALTER TABLE leadership DISABLE ROW LEVEL SECURITY;
    ALTER TABLE educational_tracks DISABLE ROW LEVEL SECURITY;
    ALTER TABLE interactive_labs DISABLE ROW LEVEL SECURITY;
    ALTER TABLE news DISABLE ROW LEVEL SECURITY;
    ALTER TABLE resources DISABLE ROW LEVEL SECURITY;
    ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
    ALTER TABLE members DISABLE ROW LEVEL SECURITY;
    ```

---

## ⚡ Performance & Page-Speed Settings

To guarantee lightning-fast visual loads and prevent page rendering freezes on mobile devices, we implemented the following optimizations:

### 1. Session-Caching Splash Screen
*   The Cyberpunk Splash Screen checks the browser's `sessionStorage` for a `'splashShown'` flag. 
*   First-time visitors see a fast `1200ms` branding animation that actively wakes up the Render backend in the background.
*   Repeat page clicks, internal routing, or refreshes bypass the splash screen completely (`0ms` load block).

### 2. GPU-Optimized CSS Transitions
*   Removed heavy `filter: blur(6px)` and `scale(0.97)` styling from scroll-reveal animations (`reveal-on-scroll`). GPU rendering of blurs causes significant frame-rate lag on mobile viewports.
*   Shortened scroll reveal durations from `0.65s` to `0.3s` for a faster, snappy animation response.
*   Added a layout-settling scroll dispatcher and a **3-second safety failsafe** in `ScrollToHash` to force-reveal all page elements even if the browser's native `IntersectionObserver` halts.

---

## 📝 Administrative Features

### 1. Direct Image Uploads (Multer to Supabase Storage)
Administrators do not need to paste external image links. They can upload files directly from their machine:
*   Backend endpoint `POST /api/upload` intercepts file uploads using `multer`.
*   Uploads are stored in your Supabase bucket named `images` and return a public access URL.

### 2. Excel Import/Export & PDF Reports
*   **Import:** Excel and CSV rosters can be uploaded on the **Members Directory** tab, parsed on the client using `xlsx`, and bulk-saved to `/api/members/bulk`.
*   **Export:** Roster databases can be downloaded instantly as structured Excel spreadsheets.
*   **PDF Roster:** Beautiful, printable PDF member summaries are compiled on-demand using `jsPDF` and `jspdf-autotable`.
