# AWS App 1 Backend Documentation

## Architecture

The application has three layers:

1. `index.js` starts the HTTP server and handles graceful shutdown.
2. `src/app.js` configures middleware, health checks, API routing, static files, and errors.
3. `src/v1` contains versioned API routes and controllers.

The backend expects this layout when serving the frontend:

```text
parent-directory/
|-- aws-app1-backend/
`-- aws-app1-frontend/
    `-- build/
```

The frontend path is resolved from the source file location, so it does not depend on the shell's working directory.

## Request lifecycle

Requests are processed in this order:

1. CORS headers and request body parsing.
2. `GET /health`.
3. Versioned routes under `/api/v1`.
4. JSON `404` handling for unmatched `/api/*` requests.
5. Static frontend assets.
6. React SPA fallback for other GET requests.
7. Central error handler.

JSON and URL-encoded request bodies are limited to 1 MB.

## API reference

### `GET /health`

Returns `200 OK` while the process can serve HTTP requests.

```json
{
  "success": true,
  "status": "ok"
}
```

### `GET /api/v1/a2rp`

Returns `200 OK` with the A2RP description.

```json
{
  "success": true,
  "message": "a2rp: an Ashish Ranjan presentation"
}
```

### API errors

An unknown API endpoint returns `404 Not Found`:

```json
{
  "success": false,
  "message": "API endpoint not found"
}
```

Unexpected server errors return `500 Internal Server Error` without exposing internal details.

## Environment variables

### `PORT`

Optional listening port. It defaults to `1198` when missing or invalid.

### `CORS_ORIGIN`

Optional comma-separated origin allowlist. Whitespace is trimmed. If unset, all origins are allowed for backward compatibility.

```text
CORS_ORIGIN=https://example.com,https://admin.example.com
```

Set this explicitly in production.

## Frontend integration

Build the frontend before starting a combined deployment:

```bash
cd ../aws-app1-frontend
npm install
npm run build
cd ../aws-app1-backend
npm install
npm start
```

If the frontend build is absent, API endpoints still work, but non-API browser routes return an error.

## Deployment checklist

- Use a supported Node.js LTS release.
- Set `PORT` when required by the hosting provider.
- Restrict `CORS_ORIGIN` to trusted frontend domains.
- Generate `aws-app1-frontend/build` before starting the backend.
- Use `GET /health` for platform health checks.
- Run `npm run check` during CI.
- Terminate with `SIGTERM` or `SIGINT` for graceful shutdown.

## Adding an API route

Create or update a router under `src/v1`, then mount it in `src/v1/routes/index.js`. Keep API responses JSON-based and ensure unmatched API URLs continue to reach the API `404` handler.
