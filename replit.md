# Daily Quote App

A full-stack daily quote web application built with React, TypeScript, and Node.js/Express, backed by PostgreSQL.

## GitHub Repository

**URL:** https://github.com/bsoneil15/daily-quote-app

The project is connected to GitHub via an SSH deploy key. To push changes to GitHub from the Replit shell:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Pushes go to the `main` branch and will appear as commits on the GitHub profile.

**Auto-push on deploy:** The deployment build command (`[deployment] build` in `.replit`) automatically runs `git push origin main` after a successful `npm run build`. If the git push fails (e.g. SSH unavailable or nothing new to push), a warning is logged and the deployment continues — build failures still fail the deployment as expected.

## Architecture

- **Frontend:** React + TypeScript (Vite), TailwindCSS, shadcn/ui
- **Backend:** Node.js + Express, Drizzle ORM
- **Database:** PostgreSQL (Replit-managed)
- **Session:** express-session with PostgreSQL session store

## Project Structure

```
client/          # React frontend (Vite)
server/          # Express API server
shared/          # Shared types and schemas
scripts/         # Utility scripts
```

## Development

```bash
npm run dev      # Start development server (frontend + backend)
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Session signing secret |

## User Preferences

- Keep code organized with clear separation between client/server/shared
- Use TypeScript throughout
- Follow existing Tailwind + shadcn/ui patterns for UI components
