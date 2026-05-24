# G-Click Foundation Codebase Agent Guidelines

This document outlines the core agent responsibilities and development processes for the G-Click Foundation codebase.

---

## 1. Development Principles

1. **Vite SPA Focus**: Keep client-side routes aligned with `src/App.tsx`. Do not write Node.js server dependencies or Next.js code.
2. **TypeScript Integrity**: Always write type-safe code. Never use `any` or disable warnings without justification.
3. **Tailwind Styling Enforcements**: Extend styling options using the theme definition in `tailwind.config.js` to ensure visual consistency.
4. **Performance Conscious**: Keep local image sizes below 150 KB and convert profile pictures to WebP format.

---

## 2. Pre-Commit Verification Checklist

Before pushing any changes or concluding tasks:
- [ ] Run `npm run lint` and verify zero errors.
- [ ] Run `npm run build` and ensure compilation completes successfully.
- [ ] Verify that all route configurations match clickable anchors (e.g., links to `/programs/:id` are supported).
- [ ] Confirm Web3Forms tokens and other credentials are not exposed in the client-side JavaScript.
- [ ] Test mobile responsiveness (hamburger menu triggers and text wraps).
