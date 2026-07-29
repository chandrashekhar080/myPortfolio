# Agent notes

## Content

All site content lives in `src/data/portfolio.ts` — profile, skills, experience, education and
projects. `src/lib/resume.ts` builds the downloadable résumé from the same data, so adding a
project or job there updates both the page and the résumé. Don't hard-code content in components.

## Conventions

- One component per page section in `src/components/portfolio/`.
- Design tokens (colours, gradients, glass surfaces) are defined in `src/styles.css` — use
  `glass`, `bg-gradient-brand`, `shadow-glow` and the `--primary` / `--accent` variables rather
  than raw colour values, so light and dark mode both keep working.
- Project cover art is in `src/assets/`, composed at roughly 2.4:1 to match the card slot.

## Checks

Run `npx tsc --noEmit` and `npm run build` before calling a change done. ESLint currently reports
pre-existing CRLF/prettier noise across the repo, so treat only new rule violations as signal.
