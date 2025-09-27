# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: Prashikshan Prototype (React + Vite + Tailwind)

Commands

- Install dependencies
  - npm install
  - Prereq: Node.js v16+ (see README.md)
- Start dev server
  - npm run dev
  - Vite serves at http://localhost:5173 by default
- Build for production
  - npm run build
  - Output goes to dist/
- Preview built app locally
  - npm run preview
- Lint source
  - npm run lint

Architecture overview

- Tooling and configuration
  - Vite with @vitejs/plugin-react (vite.config.js). No custom aliases or base path.
  - Tailwind CSS with a custom primary color palette and animations (tailwind.config.js). Core styles and utility components live in src/index.css (container, section padding, button styles, modal classes).
  - PostCSS configured for tailwindcss and autoprefixer (postcss.config.js).
  - ESM project (type: module) using React 18.

- Entry and routing
  - index.html loads /src/main.jsx which mounts <App /> inside React.StrictMode.
  - App.jsx wraps the router with an AuthProvider and defines three routes:
    - / → HomePage
    - /guide → InternshipGuide
    - /faculty-demo → FacultyDemo (gated in-UI by role: 'faculty').

- State, auth, and persistence
  - Global auth via React Context (src/contexts/AuthContext.jsx):
    - login(), logout(), isLoggedIn(), hasRole().
    - Persists the current user in localStorage under prashikshan_user.
  - LocalStorage-backed data utilities (src/utils/helpers.js):
    - storage: safe JSON get/set/remove wrappers.
    - applicationStorage: CRUD over prashikshan_applications.
    - logbookStorage: CRUD over prashikshan_logbook (includes updateEntryStatus).
    - generateSeedData(): initializes demo entries if empty; called once by HomePage.

- UI composition and data flow
  - HomePage composes major sections (Navbar, Hero, RoleCards, Features, HowItWorks, IndustryBenefits, Footer). On mount it calls generateSeedData() to ensure demo data exists.
  - Navbar manages mobile menu state, smooth scrolling for in-page links, and the LoginModal. If a user is logged in with role 'faculty', a Dashboard button links to /faculty-demo.
  - LoginModal collects role/email/password (+ institution/company for non-student roles); on submit it validates and calls login() (no backend; pure prototype flow).
  - FacultyDemo reads entries from logbookStorage and can approve/reject; if no entries exist, it seeds from mockLogbookEntries (src/data/mockData.js). Uses framer-motion for animations and role-gated access via useAuth().
  - Display content (features, how-it-works steps, nav items, testimonials) is sourced from src/data/mockData.js.

Testing

- No test runner/configuration or npm test script is present. Add a test setup (e.g., Vitest/Jest) before expecting test commands.

Deployment notes (from README)

- SPA routing requires redirects for static hosts (e.g., Netlify). Vercel auto-detects Vite.
- Build: npm run build → dist/ is the deployable artifact.

Package manager and versions

- This repo uses npm (package-lock.json committed). Use npm install locally.
- Node.js v16+ is required.

When to update this file

- Update commands if scripts change (e.g., add test scripts or lint:fix).
- Document new routes, global providers, or storage keys if the app grows.
