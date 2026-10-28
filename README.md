# Hello world

This repository intentionally contains **two** minimal “hello world” services so we can validate reusable workflows for both ecosystems:

- **NPM (Node/Express)**: `src/index.js` (port `3000`)
- **Poetry (Python/FastAPI)**: `hello_world/` + `index.py` (port `3001`)

## Docker

- `Dockerfile` builds the **NPM** service image (default)
- `Dockerfile.poetry` builds the **Poetry** service image

Base images use an exact version and a digest, for example `node:24.22.1-trixie-slim@sha256:…`, so git shows which runtime an image is built on. A floating tag such as `node:24-trixie-slim` hides the version, and a patch release behind it only shows up as a new digest. With an exact tag, Renovate raises patch and digest updates (automerged) and keeps minor and major updates for review.

If you pin a digest by hand, use the multi-platform index digest from `docker buildx imagetools inspect <image>:<tag>`, not a single-platform digest, so the image still builds for both amd64 and arm64.

## E2E tests

Playwright can test both services. The config switches target based on `E2E_TARGET`:

- `E2E_TARGET=node` → tests against `http://localhost:3000`
- `E2E_TARGET=python` → tests against `http://localhost:3001`
