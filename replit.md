# Occu-Med CaseTrack

A mobile-first PWA prototype for medical readiness case tracking — pre-employment and annual medical exams. Features a dark macOS Tahoe liquid-glass UI with the Occu-Med branding.

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
- Data: All mock data via localStorage — no real backend calls from the React app
- Build: esbuild (api-server), Vite (frontend)

## Where things live

- `artifacts/occu-med/src/` — React app source
- `artifacts/occu-med/src/pages/` — All 22 screens
- `artifacts/occu-med/src/contexts/AuthContext.tsx` — Auth state (applicant vs admin role, persisted to localStorage)
- `artifacts/occu-med/src/data/mockData.ts` — All mock data
- `artifacts/occu-med/src/index.css` — Dark navy liquid-glass theme
- `artifacts/occu-med/public/occu-med-logo.png` — App logo
- `artifacts/api-server/src/app.ts` — Express server (API routes + serves `occu-med/dist/public/` as static)

## Architecture decisions

- The React app is served as a static build through the Express api-server (port 8080) — this avoids Replit's port registration limitation that prevents Vite's dev server from being detected by the workflow health check
- All app data is mock/localStorage only — fully portable, no real DB or API calls from the frontend
- Auth is role-based (applicant / admin) stored in localStorage — for prototype purposes only
- Wouter is used for client-side routing with a base path of "/"

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
