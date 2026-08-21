# Portfolio

Three applications in one repository:

| Folder | What it is | Stack | Dev port |
| --- | --- | --- | --- |
| [`frontend/`](frontend/) | The public portfolio site | TanStack Start, React 19, Tailwind v4 | `8080` |
| [`backend/`](backend/) | REST API and content store | Node, Express, MongoDB (Mongoose), JWT | `5000` |
| [`admin/`](admin/) | Panel that manages everything on the site | React 19, Vite, Tailwind v4 | `5174` |

The site content lives in MongoDB. The admin writes it, the backend serves it, and the frontend
reads it during server-side rendering — so what you publish is in the HTML search engines get.

---

## First run

**Requirements:** Node 20+ and a MongoDB you can reach (a local install, or a free MongoDB Atlas
cluster — put its connection string in `backend/.env`).

```bash
# 1. Install everything
npm run install:all

# 2. Configure — copy each example file and edit if the defaults do not suit you
cp backend/.env.example  backend/.env
cp frontend/.env.example frontend/.env
cp admin/.env.example    admin/.env

# 3. Load the existing portfolio content into the database (safe to re-run)
npm run seed

# 4. Start all three apps together
npm run dev
```

| URL | What opens |
| --- | --- |
| http://localhost:8080 | The portfolio site |
| http://localhost:5174 | The admin panel |
| http://localhost:5000/api/health | API health check |

Sign in to the admin with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `backend/.env`. **Change that
password from Settings after your first sign-in.**

Run one app on its own with `npm run dev:backend`, `dev:frontend` or `dev:admin`.

---

## What the admin controls

Everything the public site renders:

- **Profile & SEO** — name, headline, tagline, contact details, social links, the typed roles in the
  hero, the navigation links, the résumé summary, and the page title / description / keywords /
  share image.
- **Skills** — groups and the individual skills with their proficiency levels.
- **Experience, Education, Certifications** — full CRUD.
- **Projects** — title, category, cover image, description, tech stack, feature list, live and repo
  links, plus a "featured" flag.
- **Services** and **Achievements** — the service cards and the headline stat tiles.
- **Messages** — everything submitted through the contact form, with read / archived states.
- **Media** — every uploaded image, reusable by URL.

Each list entry can be reordered with the arrow buttons and hidden from the site without deleting
it. The order and visibility you set are exactly what the frontend renders.

---

## How the three pieces fit together

```
   admin (5174)  ──── JWT ────►  backend (5000)  ◄──── public GET ────  frontend (8080)
   writes content                MongoDB + uploads                      renders the site
```

- `GET /api/content` returns every section — published rows only, already sorted. The frontend
  calls it once per request in the route loader.
- `POST /api/contact` is the only other public write; it is rate limited and lands in the admin
  inbox.
- Everything under `/api/admin/*` requires a bearer token from `POST /api/auth/login`.

**If the API is down the site still renders.** `frontend/src/lib/site-content.ts` ships the original
content compiled into the bundle and falls back to it on any fetch error, so the portfolio never
goes blank. Leaving `VITE_API_URL` empty makes the frontend run entirely on that bundled content.

---

## Configuration

`backend/.env`

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | Where the content is stored |
| `JWT_SECRET` | Signs admin sessions — **must** be a long random string in production |
| `CORS_ORIGINS` | Comma-separated origins allowed to call the API |
| `PUBLIC_URL` | Public base URL of the API, used to build absolute upload URLs |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | The account `npm run seed` creates |

`frontend/.env` → `VITE_API_URL`  ·  `admin/.env` → `VITE_API_URL`, `VITE_SITE_URL`

---

## Deploying

1. **Backend** — deploy `backend/` to any Node host (Render, Railway, Fly, a VPS). Set the env vars
   above, point `MONGODB_URI` at MongoDB Atlas, and run `npm run seed` once. `uploads/` is written
   at runtime, so give it a persistent disk or switch the media controller to object storage.
2. **Frontend** — `npm run build:frontend` emits `.output/` (Nitro, preset `cloudflare-module`).
   Set `VITE_API_URL` to the deployed API before building.
3. **Admin** — `npm run build:admin` emits `admin/dist/`, a static bundle for any host. Set
   `VITE_API_URL` before building, and add the admin's origin to `CORS_ORIGINS` on the backend.

The admin sends `noindex, nofollow`, but it is a public URL — the JWT login is what protects it.
Use a strong password, and put it behind your host's access control if you can.
