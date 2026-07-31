# Hello world

[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/digicatapult/hello-world/badge)](https://scorecard.dev/viewer/?uri=github.com/digicatapult/hello-world)

This repository intentionally contains **two** minimal “hello world” services so we can validate reusable workflows for both ecosystems:

- **NPM (Node/Express)**: `src/index.js` (port `3000`)
- **Poetry (Python/FastAPI)**: `hello_world/` + `index.py` (port `3001`)

## Docker

- `Dockerfile` builds the **NPM** service image (default)
- `Dockerfile.poetry` builds the **Poetry** service image

## E2E tests

Playwright can test both services. The config switches target based on `E2E_TARGET`:

- `E2E_TARGET=node` → tests against `http://localhost:3000`
- `E2E_TARGET=python` → tests against `http://localhost:3001`
