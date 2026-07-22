# Running the new React/Next.js + Express/MongoDB app locally

This is a separate, new build living in `apps/api` (backend) and `apps/web`
(frontend). The original static site in `public/` is untouched and still
what's live on Vercel.

## First-time setup
```
npm install
```
(installs both `apps/api` and `apps/web` via npm workspaces)

## Run both apps
```
npm run dev
```
- API: http://localhost:4000 (auto-seeds sample products into an in-memory
  MongoDB on first boot — no database installation needed)
- Frontend: **http://localhost:3000** ← open this one in your browser

## Notes
- No `MONGODB_URI` needs to be set for local dev — `apps/api` automatically
  spins up an in-memory MongoDB. When you're ready to go live, set
  `MONGODB_URI` in `apps/api/.env` to a real MongoDB Atlas connection string
  and the same code will use it instead.
- Firebase Auth (login/signup) uses the same project already configured for
  the current live site.
