# Admin

The panel that manages every section of the portfolio. React 19 + Vite + Tailwind v4, talking to the
backend over REST with a JWT bearer token.

```bash
cp .env.example .env    # VITE_API_URL, VITE_SITE_URL
npm install
npm run dev             # http://localhost:5174
```

Sign in with the account `npm run seed` created in the backend, then change the password from
**Settings**.

## Pages

| Route | What it manages |
| --- | --- |
| `/` | Dashboard — section counts and the latest messages |
| `/profile` | Identity, contact details, typed roles, nav links, résumé summary, SEO |
| `/sections/:section` | The seven list sections — skills, experience, education, certifications, projects, services, achievements |
| `/messages` | Contact-form inbox with search, filters and archiving |
| `/media` | Uploaded images, reusable by URL |
| `/settings` | Account, password, and which API this panel is pointed at |

## How the section pages work

All seven list sections are one component. `src/lib/sections.ts` describes each one — its API
endpoint, the fields it has, and how a row is summarised — and `src/pages/CollectionPage.tsx`
renders the list, the create/edit dialog and the delete confirmation from that description.

Adding a field to a section is a single entry in that config; `src/components/editors/FormFields.tsx`
already knows how to render each field type:

| `type` | Editor |
| --- | --- |
| `text` `url` `email` `tel` | Single-line input |
| `textarea` | Multi-line input |
| `stringList` | Reorderable list of short strings — tech tags, typed roles |
| `bulletList` | Same, with multi-line rows — responsibilities, features |
| `skills` | Name + 0–100 level rows |
| `navItems` | Label + href pairs |
| `image` | Upload to the media library, or paste a URL |
| `switch` | Boolean toggle |

Every list row can be reordered with the arrow buttons — that writes straight to the section's
`/reorder` endpoint — and hidden from the public site with the eye button without deleting it.

## Theming

Light and dark, toggled from the sidebar footer (and from the corner of the login screen). The
choice is saved in `localStorage` under `portfolio-admin-theme`; with nothing saved the panel
follows the operating system. A small script in `index.html` sets the class before the first paint,
so there is no flash of the wrong theme on reload.

The neutral ramp in `src/index.css` is named by role rather than by darkness, because the two themes
invert it:

| Token | Used for |
| --- | --- |
| `page` | page background |
| `panel` | cards, sidebar, dialogs |
| `raised` | hover and chip fills |
| `line` | borders and dividers |
| `muted` | least prominent text |
| `subtle` | secondary text |
| `fg` | primary text |

`@theme` holds the light values and `html.dark` swaps all of them, so components use plain
`bg-panel` / `text-muted` with no `dark:` variant. Use `dark:` only for fixed palette colours
(red, amber, emerald) that no variable covers.

```bash
npm run check:contrast   # re-reads index.css, fails if any pair drops below WCAG AA 4.5:1
```

## Notes

- The token lives in `localStorage`; any `401` from any request clears the session immediately.
- The panel sends `noindex, nofollow`, but the URL is public — the login is what protects it.
- `npm run build` emits a static bundle in `dist/`. Set `VITE_API_URL` before building, and add the
  admin's deployed origin to `CORS_ORIGINS` on the backend.
