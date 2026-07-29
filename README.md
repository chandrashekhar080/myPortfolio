# Shivani Patel — Portfolio

Personal portfolio site for Shivani Patel, React.js frontend developer based in Indore, India.

## Tech stack

- **React 19** with **TanStack Start** and **TanStack Router** (SSR)
- **Tailwind CSS v4** with a custom glass / gradient design system
- **Motion** for scroll and entrance animations
- **TypeScript**, **Vite 8**, **Nitro** (Cloudflare module preset)

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

The dev server runs on http://localhost:8080 (Vite picks the next free port if it is taken).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Production build into `.output/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Project structure

```
src/
  assets/                 project cover images
  components/portfolio/   one component per page section
  data/portfolio.ts       all site content (profile, skills, experience, projects)
  lib/resume.ts           builds the print-ready résumé from portfolio data
  routes/                 TanStack Router routes
  styles.css              design tokens and utilities
```

Content lives in `src/data/portfolio.ts` — editing that file updates the site sections
**and** the downloadable résumé.
