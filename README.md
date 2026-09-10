# Hello world

This repository contains two npm workspaces and a Poetry service so we can validate reusable workflows for multiple images and ecosystems:

- **Portal (Node/Express)**: `portal/src/index.js` (port `3000`)
- **Worker (Node/TypeScript)**: `worker/src/index.ts` (exits successfully)
- **Poetry (Python/FastAPI)**: `hello_world/` + `index.py` (port `3001`)

## Docker

- `portal/Dockerfile` builds the **Portal** service image
- `worker/Dockerfile` builds the **Worker** image
- `Dockerfile.poetry` builds the **Poetry** service image

## E2E tests

Playwright can test both services. The config switches target based on `E2E_TARGET`:

- `E2E_TARGET=node` → tests against `http://localhost:3000`
- `E2E_TARGET=python` → tests against `http://localhost:3001`
