# HornaAI — Website, Student Portal & Admin Dashboard

MERN stack: **MongoDB · Express · React (Vite) · Node.js**, styled with **Tailwind CSS**.

```
HornAI/
├── backend/     Express + Mongoose REST API (auth, content, forms, portal, admin CRUD)
├── frontend/    React 18 + Vite + Tailwind + React Router + Framer Motion
└── shared/      content.js — single source of site content (seed data + offline fallback)
```

## Quick start

Requirements: Node 18+ and MongoDB running locally (or a MongoDB Atlas URI).

```bash
# 1. API
cd backend
cp .env.example .env        # then set a long random JWT_SECRET
npm install
npm run seed                # loads content + demo accounts (wipes existing data!)
npm run dev                 # http://localhost:5000

# 2. Website
cd ../frontend
npm install
npm run dev                 # http://localhost:5173 (proxies /api to :5000)
```

Demo accounts created by the seed (change before any public deployment):

| Role    | Email                 | Password     |
|---------|-----------------------|--------------|
| Admin   | admin@hornaai.com     | Admin123!    |
| Student | student@hornaai.com   | Student123!  |

## What's included

**Public website**: Home (hero, stats, about, services, training, learning journey, projects, why us, students, testimonials, partners, blog, FAQ, CTA, contact), About, Services (per-service benefits, process, technologies), Training (search + level/format filters), Program detail (curriculum, requirements, instructor, certificate, FAQ, sticky Enroll Now → application form), Projects and project detail, Blog and article pages, Contact, Start a Project (file upload → success screen), Privacy, Terms, 404.

**Student Portal** (`/portal`): dashboard, my courses with progress, upcoming classes, assignments (submit links), certificates, announcements, profile and password change. Auth screens: login, register, forgot password, reset password.

**Admin Dashboard** (`/admin`, admin role only): overview counts and recent activity, plus full create/edit/delete, search, pagination and inline status changes for students, instructors, users, programs, enrollments, classes, assignments, certificates, announcements, applications, contact messages, project requests, projects, blog posts, testimonials, partners and homepage statistics.

## Architecture notes

- **CMS-ready content.** Public pages read from the API. If the API is unreachable they fall back to `shared/content.js`, so the marketing site still renders. After seeding, edit everything from the admin dashboard.
- **Adding an admin-managed collection**: add a Mongoose model, add one entry to `RESOURCES` in `backend/src/controllers/adminController.js`, and add one entry to `frontend/src/pages/admin/resources.js` (columns + form fields). No new pages are needed.
- **Auth**: JWT (Bearer token) with bcrypt-hashed passwords and role-based guards (`protect`, `authorize('admin')`). Public registration always creates a `student`. Auth and form endpoints are rate-limited.
- **Validation**: on the client (`useForm` + `rules`) and on the server (`validate` middleware + Mongoose). Server field errors are mapped back onto the form fields.
- **Code splitting**: the homepage is in the main bundle; every other page, the portal and the admin load on demand.

## Placeholder content — replace before launch

Nothing here claims real clients, awards or results. These items are placeholders and are labelled as such on the site:

- Statistics (25+, 500+, 10+, 15+), marked `isPlaceholder`, editable in **Admin → Statistics**
- Testimonials, partner logos and team or instructor profiles
- Projects, which are *concept projects* (`isSample: true`) until real case studies are approved
- Blog article bodies, the About page story, and the Privacy and Terms text (have these reviewed legally)
- Contact details (`+252 XXX XXX XXX`), in `shared/content.js` → `site`
- Imagery: programs, projects and posts use generated on-brand covers. Set an `image` URL in the admin to use real photography.

## Production checklist

- Set `NODE_ENV=production`, a strong `JWT_SECRET`, `MONGO_URI` (e.g. Atlas) and `CLIENT_URL` (your site's origin).
- Connect an email provider in `authController.forgotPassword`. In development the reset link is logged and shown on screen.
- Move uploads from local disk (`backend/uploads`, currently served publicly under `/uploads`) to object storage with signed URLs.
- `cd frontend && npm run build`, then deploy `dist/` (set `VITE_API_URL` if the API is on another origin).
