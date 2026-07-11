# Threat Model

## Project Overview

This project is a publicly reachable full-stack TypeScript application that serves daily inspirational quotes. A React/Vite single-page frontend is served by an Express backend, which also exposes public JSON endpoints under `/api`. PostgreSQL access is implemented through Neon serverless and Drizzle ORM. The production deployment is public, while seed scripts, attached assets, and build tooling are not part of the intended runtime surface.

## Assets

- **Application availability** — the main security-sensitive property for this app is keeping the public quote API and static frontend responsive. There is little confidential data, but the service still must resist trivial abuse that could disrupt access.
- **Database integrity** — the quotes and authors stored in PostgreSQL must not be modified or corrupted by unauthenticated users or malformed inputs.
- **Runtime secrets** — `DATABASE_URL` and any deployment environment variables must remain server-side and must not leak through errors or client bundles.
- **Deployment behavior and logs** — server logs and error responses must avoid exposing internal stack traces, connection strings, or other operational details that would help an attacker pivot.

## Trust Boundaries

- **Browser to Express API** — all client requests to `/api/*` cross from an untrusted public browser into the server. Query parameters, paths, and headers are attacker-controlled.
- **Express to PostgreSQL** — the server has direct database access through Neon/Drizzle. Any injection or authorization failure at the API layer would expose or alter database contents.
- **Server to third-party asset hosts** — the frontend references remote background images from Unsplash and author images from Wikimedia. These are user browsers fetching third-party resources, not server-side fetches, but they still create a privacy boundary for end users.
- **Production vs dev-only code** — `server/seed-quotes.ts`, `attached_assets/`, `exports/`, and build configuration files are not production-reachable unless separately executed or miswired into runtime.

## Scan Anchors

- Production entry points: `server/index.ts`, `server/routes.ts`, `server/vite.ts`, `client/src/main.tsx`, `client/src/App.tsx`.
- Highest-risk code areas: public API routes in `server/routes.ts`, DB access in `server/storage.ts` and `server/db.ts`, shared schema/types in `shared/schema.ts`.
- Public surfaces: `/api/quotes/count`, `/api/quotes/all`, `/api/quotes/daily`, and the SPA/static asset routes.
- Authenticated/admin surfaces: none currently implemented in production code.
- Usually ignore as dev-only: `server/seed-quotes.ts`, `attached_assets/`, `exports/`, `vite.config.ts`, `drizzle.config.ts`, and other build-time configs.

## Threat Categories

### Tampering

The server must treat every request parameter as untrusted and must not let public users modify quote data or influence database queries beyond intended filters. All database access must continue to use parameterized ORM expressions rather than string-built SQL, and any future write endpoints must enforce input validation and authorization server-side.

### Information Disclosure

The app does not process accounts or sensitive user content, but it still must avoid leaking secrets, stack traces, or internal error context. API responses and logs must not expose environment variables, raw database errors, or unpublished internal data. Any third-party asset loading must be understood as a browser privacy tradeoff, not mistaken for a server-side data leak.

For this project, ordinary browser requests to intentionally embedded third-party public assets are out of scope unless the application attaches user-specific secrets, identifiers, or sensitive page data to those requests. The current app only embeds static public image URLs and does not use those loads to transmit protected application data.

### Denial of Service

Because the deployment is public and unauthenticated, the main realistic risk is abusive traffic against the small set of quote endpoints or expensive server operations. Public endpoints must avoid unbounded work, large attacker-controlled payloads, or fan-out to fragile upstream services. Future dynamic or write-heavy endpoints would need explicit rate limiting and request-size controls.

### Elevation of Privilege

There are no user roles or admin capabilities in the current production code, so classic privilege escalation is limited. The required guarantee is that future privileged or state-changing functionality must never rely on client-side controls alone and must add server-side authentication and authorization before exposure.
