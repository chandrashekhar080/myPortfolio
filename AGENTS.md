# Agent notes

## Layout

Three apps, no workspace hoisting — each has its own `package.json`, lockfile and `node_modules`,
and is installed separately (`npm run install:all` from the root does all three).

- `frontend/` — the public site (TanStack Start).
- `backend/` — Express + Mongoose REST API. Plain JavaScript, ESM, no build step.
- `admin/` — Vite + React admin panel (TypeScript).

## Content

The database is the source of truth. `GET /api/content` returns every section, published rows only,
already sorted by the manual `order` field the admin sets.

- Sections read content through `useContent()` (`frontend/src/lib/content-context.tsx`), never by
  importing data directly. The provider is mounted in `frontend/src/routes/index.tsx`, whose loader
  fetches the content during SSR.
- `frontend/src/data/portfolio.ts` is now **only** the offline fallback, assembled into
  `fallbackContent` in `frontend/src/lib/site-content.ts`. Editing it changes what renders when the
  API is unreachable — it does not change the live site. Real content edits go through the admin.
- `frontend/src/lib/resume.ts` builds the résumé from the same `SiteContent` object, passed in as an
  argument.
- `backend/src/seed/seedData.js` is generated from `portfolio.ts` and is only the baseline
  `npm run seed` writes into an empty database.

## Adding a field to a section

Four places, in this order:

1. `backend/src/models/<Model>.js` — the schema field.
2. `backend/src/validators/schemas.js` — the matching zod field (the API strips anything not listed).
3. `admin/src/lib/sections.ts` — add it to that section's `fields` and `defaults`; the form and the
   list row are generated from this config, so no new admin component is needed.
4. `frontend/src/lib/site-content.ts` — the type, and the fallback value if one is needed.

Adding a whole new section means a new model, a `resourceRouter(...)` line in
`backend/src/routes/adminRoutes.js`, an entry in `contentController.js`, and one entry in the
admin's `sections` array.

## Conventions

- One component per page section in `frontend/src/components/portfolio/`.
- Design tokens (colours, gradients, glass surfaces) are defined in `frontend/src/styles.css` — use
  `glass`, `bg-gradient-brand`, `shadow-glow` and the `--primary` / `--accent` variables rather than
  raw colour values, so light and dark mode both keep working.
- The admin has its own light/dark palette in `admin/src/index.css`. The neutral ramp is named by
  role — `page`, `panel`, `raised`, `line`, `muted`, `subtle`, `fg` — and `@theme` holds the light
  values while `html.dark` swaps every one of them, so components need no `dark:` variant. Reach for
  `dark:` only for fixed palette colours (red, amber, emerald) that cannot be themed by a variable.
  After touching the palette run `npm --prefix admin run check:contrast`, which re-reads
  `index.css` and fails if any text/surface pair drops below WCAG AA.
- Backend responses are always `{ success, message?, data, meta? }`; errors go through
  `ApiError` and the single handler in `backend/src/middleware/error.js`.
- Anything the admin can empty needs a guard on the frontend — an admin may delete every row in a
  section.

## Checks

- Frontend: `npm --prefix frontend exec tsc -- --noEmit` and `npm run build:frontend`.
- Admin: `npm --prefix admin run typecheck` and `npm run build:admin`.
- Backend: `node --check` on changed files; `npm run seed` against a scratch database to verify a
  schema change end to end.

ESLint reports pre-existing CRLF/prettier noise across the frontend, so treat only new rule
violations as signal.
