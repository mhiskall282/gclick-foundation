# CLAUDE.md — G-Click Foundation Codebase Guide

This file serves as the Single Source of Truth for development guidelines, coding standards, and commands in the G-Click Foundation project.

---

## 1. Stack & Architecture

| Layer | Technology | Guidelines |
|---|---|---|
| **Framework** | Vite + React v18.3.1 | Single-Page Application (SPA). Keep routing client-side. |
| **Language** | TypeScript v5.5.3 | Enforce strict type checking (`tsconfig.json` properties). Avoid `any`. |
| **Styling** | Tailwind CSS v3.4.1 | Custom colors and utility extension mapped in `tailwind.config.js`. |
| **Routing** | React Router DOM v6.22.3 | Use declarative `<Link>` elements. Reset window scroll on transitions. |
| **Icons** | Lucide React | Import individual icons natively to enable tree-shaking. |
| **Forms** | Web3Forms API | Submit via JSON POST request. Secure tokens in environment files. |

---

## 2. Command Reference

Use `npm` as the designated package manager (based on the `package-lock.json` lockfile).

```bash
# Development server
npm run dev

# Lint files using ESLint
npm run lint

# Production build
npm run build

# Preview production bundle locally
npm run preview
```

---

## 3. Directory Conventions

* `src/components/sections/`: Modular UI fold sections composing the landing page.
* `src/pages/`: Page containers (e.g. `HomePage`).
* `src/types/`: Centralized interfaces. Never write inline type descriptions in component parameters.
* `public/images/`: Compressed local image files (WebP/SVG only).

---

## 4. Development Guardrails

### Routing Guardrail
Never add a navigation anchor in `Navbar.tsx` or `CallToAction.tsx` without ensuring a corresponding `<Route>` exists inside the `<Routes>` layout in `src/App.tsx`.

### Security Guardrail
* Never hardcode API keys or secret tokens. 
* Always use `import.meta.env.VITE_...` and register placeholder keys in `.env.example`.

### Performance Guardrail
* All photos must be optimized in WebP format.
* Local images must weigh under **150 KB**. Profile picture blocks must use lazy-loading flags.

### Styling Guardrail
Avoid arbitrary Tailwind classes (e.g., `text-[#ff3300]`). Extend variables inside `tailwind.config.js` and use semantic names.
