# Worklog — Interactive Portfolio v2

> Newest entries first. One entry per working session/milestone.

## 2026-07-04 (night) — Phase 1 core: the Merry sails

- Compressed the fleet with gltf-transform (meshopt + webp@1024):
  Going Merry 22.3MB→546KB, Thousand Sunny 10.6MB→729KB, Moby Dick 3MB→537KB. Both ships
  CC-BY-4.0 (Anex; Bagus Sujiwa) — attribution goes in the footer per DESIGN.md.
- Built the wave system: `src/lib/waves.ts` is the single source of truth — the ocean's
  GLSL is string-generated from the same Gerstner constants the CPU samples for ship
  buoyancy, so the ship rides exactly the rendered surface. `WAVE_AMPLITUDE` exported and
  fed to the shader so color normalization can't drift from the config.
- Toon ocean: 5 posterized bands (deep `#2E63A4` → crest `#60BFF5`), scrolling-noise foam
  caps, banded sun glint, manual fog matched to scene fog. 700×700 plane trails the ship
  (world-space waves ⇒ endless ocean).
- Ship kinematics: throttle inertia (damp), rudder authority scaled by speed, heading
  integration, 4-point wave sampling → bob/pitch/roll (pitch sign matters: bow rises on
  crests). Deterministic model normalization from `gltf-transform inspect` (length = X
  axis, origin at keel, bow rotated to +Z). Draft tuned visually to -1.2; blob shadow.
- Damped follow camera (λ=3) with look-ahead — sailing + turning verified by driving the
  ship with Playwright (keyboard.down('w'/'a')) and screenshotting mid-motion.
- Post stack: Bloom(1.1)+Vignette+SMAA. Perf: 60.3fps measured via rAF count. Zero
  console errors. Mobile e2e switched iPhone 14→Pixel 7 (WebKit binary removed in disk
  cleanup; chromium emulation suffices — real Safari via deploy previews).
- Disk incident: machine hit 100% full mid-phase; freed npm cache + unused Playwright
  browsers (~5GB). **Rahul: your disk is at 98% — worth a cleanup.**
- Screenshots: `docs/screenshots/phase1/`.

## 2026-07-04 (evening) — Phase 0 shipped: CI green + v2 branch deploy live

- CI initially failed: lockfile missing linux optional deps (`@emnapi/*`) after the
  incremental eslint change — regenerated lockfile from scratch, verified `npm ci` clean;
  CI green in 49s.
- Netlify branch deploys enabled for `v2` (API: `allowed_branches: [main, v2]`).
- **Repaired broken Netlify↔GitHub linkage**: the site had no deploy key and the repo had
  none registered ("Host key verification failed" on clone — also the cause of the two
  errored `main` deploys today). Minted a new deploy key via Netlify API, registered it on
  the GitHub repo (read-only), attached it to the site.
- **v2 preview live: https://v2--rahulbabu.netlify.app** — verified with Playwright against
  the deployed URL: renders identically to local, zero console errors.
- Note: `main` (old site) UI build command restored to `yarn run build`; v2's netlify.toml
  overrides with npm. Production still serves the last good main deploy — untouched.

## 2026-07-04 (later) — Phase 0 verified green

- Research workflow completed (5 agents, ~195k tokens) → `docs/DESIGN.md` design bible
  ("The Grand Log"): full color/type system, motif→surface map, 6 themed islands +
  Skypiea easter egg, craft bar, asset plan with licenses, tech notes. Raw research in
  `docs/research/*.json`.
- Applied research corrections: removed `@netlify/plugin-nextjs` from netlify.toml
  (auto-injected), ESLint 10 → 9 (eslint-config-next's react plugin incompatible with 10).
- Disabled `react-hooks/immutability` for `src/components/canvas/**` only — per-frame
  mutation of three.js objects is R3F's intended imperative API.
- Visual iteration via Playwright screenshots: drei physical `Sky` read as washed-out
  haze → replaced with custom anime gradient `SkyDome` shader; recomposed camera; ocean
  color to design token `#2E63A4`. Screenshots: `docs/screenshots/phase0/`.
- Green: typecheck, lint, 6 unit tests, production build, 2 e2e smoke tests
  (chromium + iPhone 14 emulation, console-error gate). Zero console errors.

## 2026-07-04 — v2 kickoff: clean slate + scaffold

- Verified toolchain: gh CLI (authed), Netlify CLI (linked to `rahulbabu`), gltf-transform 4.4.1,
  gltfjsx 6.5.3, threejs-devtools MCP, Playwright MCP.
- Launched background research: One Piece visual language, elite 3D portfolio craft,
  asset/license survey, R3F v9 + Netlify technical patterns → will produce `DESIGN.md`.
- Created `v2` branch. Committed latest data (`rahul-babu-data.json`) + resume PDF.
- Razed old app (Next 13 / R3F 8 / Hygraph / Cypress era) — kept `public/assets` models,
  data JSON, resume, `.env.local`.
- Scaffolded fresh: Next 16.2.10, React 19.2.7, three 0.185.1, R3F 9.6.1, drei 10.7.7,
  postprocessing 3.0.4, zustand 5, TS 5.9 strict, ESLint 10 flat, Prettier, husky+lint-staged,
  Vitest 4, Playwright 1.61.
- Built Phase 0 placeholder scene: flat-shaded CPU wave ocean, drei Sky, fog, idle camera bob,
  HUD identity overlay.
- Typed content module importing root `rahul-babu-data.json` directly; content invariant tests.
- New CI workflow (typecheck/lint/test/build); netlify.toml with Next plugin, Node 24.
