# Occu-Med CaseTrack

A mobile-first PWA prototype for medical readiness case tracking — pre-employment and annual medical exams. Features a macOS-inspired light interface with grouped desktop navigation, a collapsible sidebar, responsive mobile tabs, and the Apple system font on macOS. See docs/apple-design.md for official Apple references and implementation details.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API + frontend server (port 8080)
- `pnpm --filter @workspace/occu-med run build` — rebuild the React frontend (output: `artifacts/occu-med/dist/public/`)
- After rebuilding the frontend, restart the `artifacts/api-server: API Server` workflow to serve the new build
- `pnpm run typecheck` — full typecheck across all packages
- Required env: `SESSION_SECRET`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui + framer-motion + wouter
- Backend: Express 5 (serves both `/api` routes and React static files)
- Data: Case entries added by the user are stored in this browser; no shared case-system connection is configured
- Build: esbuild (api-server), Vite (frontend)

## Where things live

- `artifacts/occu-med/src/` — React app source
- `artifacts/occu-med/src/pages/` — Application screens
- `artifacts/occu-med/src/contexts/AuthContext.tsx` — Auth state (applicant vs admin role, persisted to localStorage)
- `artifacts/occu-med/src/contexts/CaseContext.tsx` — Case state with empty defaults and browser persistence
- `artifacts/occu-med/src/index.css` — Neutral macOS-inspired theme and responsive workspace
- `artifacts/occu-med/public/occu-med-logo.png` — App logo
- `artifacts/api-server/src/app.ts` — Express server (API routes + serves `occu-med/dist/public/` as static)

## Architecture decisions

- The React app is served as a static build through the Express api-server (port 8080) — this avoids Replit's port registration limitation that prevents Vite's dev server from being detected by the workflow health check
- Case data starts empty and is browser-local; no seeded applicant records or live FileMaker connection
- Auth is role-based (applicant / admin) stored in localStorage — for prototype purposes only
- Wouter is used for client-side routing with a base path of "/"

See `docs/occumed-content-sources.md` for source verification, terminology corrections, and operational scope.

## Product

Occu-Med CaseTrack is a medical readiness tracking app for employees undergoing pre-employment or annual physicals. Key features:
- **Applicant portal**: Dashboard with case progress, task checklist, document uploads, messaging, appointment scheduling, eForms (OccuSign), timeline, RDQA explainer, clinic map
- **Admin portal**: Case management, invitation codes, status tracking
- **22 screens** built as a fully navigable prototype

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After editing React source (`artifacts/occu-med/src/`), you must run `pnpm --filter @workspace/occu-med run build` AND restart the api-server workflow for changes to appear
- The `artifacts/occu-med: web` workflow will always show as "failed" — this is expected (port detection limitation in this Replit environment). The app runs through the api-server instead
- The api-server catches all non-`/api` routes and serves `index.html` for SPA routing

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
