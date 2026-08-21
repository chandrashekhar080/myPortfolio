# Backend

Express + Mongoose REST API. It stores the portfolio content, serves it to the public site and
backs the admin panel. Plain JavaScript (ESM) — no build step.

```bash
cp .env.example .env    # then edit MONGODB_URI and JWT_SECRET
npm install
npm run seed            # loads the original portfolio content (safe to re-run)
npm run dev             # http://localhost:5000
```

`npm run seed:fresh` wipes each collection first — use it to reset the content to the baseline.

## Layout

```
src/
  config/      env parsing and the Mongo connection
  models/      one Mongoose model per section, plus User, Message and Media
  middleware/  auth (JWT), zod validation, multipart upload, error handling
  controllers/ request handlers; crudController.js is shared by every list section
  routes/      public routes, /api/auth, and /api/admin behind requireAuth
  validators/  the zod schemas every write is checked against
  seed/        seedData.js, generated from the frontend's original content file
```

## Responses

Success is always `{ success: true, message?, data, meta? }`; failure is
`{ success: false, message, details? }` where `details` maps a field name to its error. Documents
are serialised with `id`, never `_id`, and passwords are never included.

## Endpoints

### Public

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness check |
| `GET` | `/api/content` | Every section, published rows only, sorted |
| `GET` | `/api/projects/:slug` | One published project |
| `POST` | `/api/contact` | Contact form — 5 per hour per IP |

### Auth

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/api/auth/login` | `{ email, password }` → `{ token, user }`; 10 attempts / 15 min |
| `POST` | `/api/auth/logout` | Clears the cookie |
| `GET` | `/api/auth/me` | The signed-in user |
| `PATCH` | `/api/auth/account` | Change name and email |
| `PATCH` | `/api/auth/password` | Change password, returns a fresh token |

### Admin — every route needs `Authorization: Bearer <token>`

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/admin/stats` | Section counts and the latest messages |
| `GET` `PUT` | `/api/admin/profile` | The singleton profile, nav links and SEO |
| — | `/api/admin/{skills,experience,education,certifications,projects,services,achievements}` | See below |
| `GET` | `/api/admin/messages` | `?status=&q=&page=&limit=` |
| `GET` `PATCH` `DELETE` | `/api/admin/messages/:id` | `GET` also marks the message read |
| `GET` `POST` `DELETE` | `/api/admin/media[/:id]` | `POST` is multipart, field name `file` |

Each list section exposes the same set:

| Method | Path |
| --- | --- |
| `GET` | `/` — all rows, sorted by `order` |
| `POST` | `/` — new row, appended to the end |
| `PATCH` | `/reorder` — `{ ids: [...] }` in the new order |
| `GET` `PUT` `PATCH` `DELETE` | `/:id` — `PUT` replaces, `PATCH` accepts a partial body |

## Notes

- Writes are validated with zod and `req.body` is **replaced** by the parsed result, so a client
  cannot set fields the schema does not list.
- `order` drives the public sort; `published: false` hides a row from `/api/content` without
  deleting it.
- Uploads are stored on disk under `uploads/` and referenced relatively, then returned as absolute
  URLs built from `PUBLIC_URL`. On a host with an ephemeral filesystem, mount a disk there or move
  the media controller to object storage.
- The server refuses to start in production while `JWT_SECRET` is still the placeholder value.
