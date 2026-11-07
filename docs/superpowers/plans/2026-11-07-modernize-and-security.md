# Modernize it-tools Fork & Close Security Gaps — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring the it-tools fork up to current, secure versions (frontend deps + Docker base image) while preserving all tool functionality and keeping the Docker image buildable.

**Architecture:** Incremental upgrade in phases. First fix OS-level CVEs by bumping Docker base images (done). Then bump Node/tooling. Then minor/patch dep updates (low risk). Then major dep updates in grouped batches, fixing breakages. Finally verify unit tests, typecheck, lint, build, and Docker build.

**Tech Stack:** Vue 3, Vite, TypeScript, pnpm, naive-ui, monaco-editor, tiptap, unocss, vitest, playwright. Docker: node:22-alpine, nginx.

**Spec:** none (user request via conversation).

## Global Constraints

- Preserve all existing tool functionality (no feature removal).
- Docker image must remain buildable (multi-arch amd64/arm64).
- Use latest stable, secure versions.
- Simplify/adjust code when an upgrade breaks something, but keep behavior.
- All unit tests must pass; typecheck and lint must pass; production build must succeed.

## Review Focus

- Vue 3.5 reactivity/teleport changes breaking component tests.
- Vite 5/6 ESM/CJS interop and plugin API changes.
- vitest 1→2/3 config and jsdom environment changes.
- TypeScript 5.2→5.6 strictness surfacing new errors.
- naive-ui / monaco-editor / tiptap major API changes.
- PWA service worker regeneration.

---

### Task 1: Docker CVE fix (base image bump) — DONE

**Files:** Dockerfile

- [x] Bump node:lts-alpine → node:22-alpine3.24
- [x] Bump nginx:stable-alpine → nginx:1.30-alpine
- [x] Add pnpm@9 pin in build stage
- [x] Verify docker build succeeds

### Task 2: Node/tooling + CI alignment — DONE

**Files:** .nvmrc, .github/workflows/*.yml

- [x] .nvmrc → 22
- [x] CI workflows node-version 20 → 22

### Task 3: Minor/patch dependency updates

**Files:** package.json, pnpm-lock.yaml

- [ ] Run `pnpm update` (minor/patch within ranges) for all deps.
- [ ] Run build + unit tests to confirm nothing broke.
- [ ] Commit.

### Task 4: Major update — Vue core ecosystem

**Files:** package.json + src/** (as needed)

Packages: vue ^3.5, vue-router ^4.5, pinia ^2.3, vue-i18n ^10, @vueuse/core ^12, @vueuse/head ^2, @vueuse/router ^11, @vitejs/plugin-vue ^5, vue-tsc ^2, @vue/compiler-sfc ^3.5, @vue/runtime-dom ^3.5, @vue/test-utils ^2.4, @intlify/unplugin-vue-i18n ^4.

- [ ] Bump versions in package.json.
- [ ] pnpm install.
- [ ] Fix type errors / build errors.
- [ ] Run unit tests; fix failures.
- [ ] Commit.

### Task 5: Major update — Build tooling

**Files:** package.json + vite.config.ts + tsconfig*.json + eslint config

Packages: vite ^6 (or ^5), vitest ^2 (or ^3), typescript ^5.6, eslint ^9, @antfu/eslint-config ^3, unocss ^0.65→^66, unplugin-auto-import ^0.18, unplugin-vue-components ^0.27, vite-plugin-pwa ^0.21, vite-plugin-vue-markdown ^0.26, vite-svg-loader ^5, @vitejs/plugin-vue-jsx ^4, jsdom ^25, @types/node ^22, @tsconfig/node22.

- [ ] Bump versions.
- [ ] Migrate eslint to flat config if needed (eslint 9).
- [ ] Migrate vitest config if needed.
- [ ] Fix vite config for v5/v6 plugin API.
- [ ] pnpm install, build, tests.
- [ ] Commit.

### Task 6: Major update — UI libraries

**Files:** package.json + src/**

Packages: naive-ui ^2.40, monaco-editor ^0.52, @tiptap/* ^2.11, @tabler/icons-vue ^3.40, @vicons/* (keep), vue-shadow-dom (check), vuedraggable (check).

- [ ] Bump versions.
- [ ] Fix API breakages in components using these libs.
- [ ] Build + tests.
- [ ] Commit.

### Task 7: Major update — Utils & remaining

**Files:** package.json + src/**

Packages: date-fns ^3 (or ^4), mathjs ^13, marked ^13, markdown-it (keep), crypto-js (keep), bcryptjs (keep), lodash (keep), ua-parser-js ^2, jwt-decode ^4, js-base64 (keep), fuse.js (keep), etc.

Note: date-fns v3→v4 has breaking changes (ESM). mathjs v12+. marked v10→v13. ua-parser-js v1→v2.

- [ ] Bump versions.
- [ ] Fix breakages.
- [ ] Build + tests.
- [ ] Commit.

### Task 8: Final verification

- [ ] pnpm lint
- [ ] pnpm typecheck
- [ ] pnpm test:unit
- [ ] pnpm build
- [ ] docker build (multi-stage) succeeds
- [ ] Smoke test: run container, curl /

### Task 9: Playwright E2E (optional, if time)

- [ ] Update @playwright/test.
- [ ] Run e2e tests.

---

## Execution notes

- After each task, run `pnpm build` and `pnpm test:unit` before committing.
- If a major update is too disruptive, document and skip with a note, keeping functionality.
- Prefer keeping versions that are "latest stable" but if a major breaks too much, pin to a working major and note.
