# AWS App 1 Backend

Node.js and Express backend for AWS App 1. It exposes the versioned A2RP API and serves the production build of the sibling `aws-app1-frontend` project.

## Requirements

- Node.js 18 or newer
- npm
- A production frontend build at `../aws-app1-frontend/build` to serve the web UI

## Setup and run

```bash
npm install
npm start
```

For development with automatic restart, use `npm run dev`. The server uses `PORT` when provided and otherwise listens on `1198`.

Copy `.env.example` to `.env` if useful, then load it through your runtime or deployment platform. This application does not automatically load `.env` files.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Service health check |
| `GET` | `/api/v1/a2rp` | Returns A2RP information |

Example:

```bash
curl http://localhost:1198/api/v1/a2rp
```

```json
{
  "success": true,
  "message": "a2rp: an Ashish Ranjan presentation"
}
```

Unknown `/api/*` endpoints return a JSON `404`. Other GET requests are handled by the React single-page application.

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `1198` | HTTP listening port |
| `CORS_ORIGIN` | `*` | One origin or a comma-separated allowlist |

Set `CORS_ORIGIN` explicitly in production, for example `https://example.com,https://www.example.com`.

## Validation

```bash
npm run check
```


## License

MIT

## Author

**Ashish Ranjan**  
Full-Stack Web Developer

## Links

- Portfolio: [ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [github.com/a2rp](https://github.com/a2rp)
- CodePen: [codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [facebook.com/theash.ashish](https://www.facebook.com/theash.ashish/)
- YouTube: [Ashish Ranjan on YouTube](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- [Support the project](https://a2rp-donation-page.netlify.app/)
- [Buy Me a Coffee](https://buymeacoffee.com/a2rp)
- [Patreon](https://www.patreon.com/a2rp)
