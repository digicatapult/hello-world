# Hello world

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

## Merge queue

This repository is the canary for merge queue versioning. It does **not** use the `synchronise-*-version` workflows. A pull request carries only a `v:` label stating the intent to bump; the version number is computed and committed on `main` after merge.

The reason is that a version written onto a branch is an absolute number, so two approved pull requests compute the same one. The second to reach the queue fails the version check and is evicted, and recovering it means another bump, which dismisses its approval. Deferring the number to merge time makes the gate order independent.

How it fits together:

| File | Role |
| --- | --- |
| `version-label.yml` | Gates a pull request on carrying exactly one `v:` label. Replaces the old `check-version` job. |
| `apply-version.yml` | Computes and commits the version on `main` after merge. |
| `release.yml` | Releases the version commit rather than the merge commit. |
| `test.yml` | Provides the required checks, and must trigger on `merge_group`. |

A merge therefore produces **two** runs on `main`: the merge commit, where `apply-version` pushes a `chore(release):` version commit; then that version commit, where `apply-version` is skipped and `release.yml` runs. The commit prefix guard is what stops the two triggering each other. They must agree on it.

The version commit is pushed with the bot GitHub App token rather than `GITHUB_TOKEN`, because `GITHUB_TOKEN` pushes do not trigger workflows and the version commit is exactly what needs to be built and released. The App must be allowed to push to `main`.

### Renovate

`renovate.json` holds four overrides inline, pending promotion to a shared preset in `digicatapult/renovate-config`:

| Setting | Why |
| --- | --- |
| `bumpVersion: null` | The base preset has Renovate write the version onto its own branch, which reintroduces the collision above. |
| `addLabels: ["v:patch"]` | The base preset applies no `v:` labels, so every Renovate pull request would fail the gate. |
| `platformAutomerge: true` | Renovate supports merge queues only when this is true, since GitHub does the enqueueing. Already the default; set explicitly because it is load bearing. Needs "Allow auto-merge" on the repository. |
| `rebaseWhen: "automerging"` | The base preset's `behind-base-branch` rebases every open pull request whenever `main` moves, which is wasted CI under a queue and evicts anything enqueued. `automerging` limits that to pull requests actually automerging. |

Note that Renovate's branch automerge (`automergeType: branch`) can never work behind a merge queue. This repository uses `pr`, so it is unaffected.

Full design writeup, including the prerequisites that need repository admin: [Merge Queue for testbed-portal](https://digicatapult.atlassian.net/wiki/spaces/EN/pages/4058546180).
