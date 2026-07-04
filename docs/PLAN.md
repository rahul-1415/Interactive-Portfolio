# Project Plan — Interactive Portfolio v2

> One Piece-inspired interactive 3D portfolio. Sail a ship across the Grand Line between
> islands; each island opens a portfolio section. Owner: Rahul Babu.
> This file is the living plan — updated whenever scope or sequencing changes.

## Guiding rules

- **Deployable from day one.** Every phase ends with a green build deployed to a Netlify preview.
- **Original One Piece design everywhere** — no generic AI-generated look. See `DESIGN.md`.
- **Commit + push after every working milestone.** Branch before big visual experiments.
- **Verify visually**: Playwright screenshots at desktop/tablet/mobile + three.js devtools MCP
  inspection before calling anything done.

## Phases

### Phase 0 — Foundation ⏳ in progress

- [x] `v2` branch created; old app razed (old site stays live on `main`)
- [x] Scaffold: Next 16.2 + React 19.2 + R3F v9.6 + three 0.185 + drei 10 + postprocessing 3
- [x] Tooling: TypeScript 5.9 strict, ESLint 10 (flat), Prettier, husky + lint-staged
- [x] Tests: Vitest (content invariants) + Playwright (smoke, desktop + mobile)
- [x] Typed content module reading `rahul-babu-data.json` (repo root = single source of truth)
- [x] Placeholder ocean scene (CPU low-poly waves, anime gradient sky dome, fog, camera bob)
- [x] `npm install` + typecheck + lint + test + build all green locally
- [x] Design bible synthesized from research → `DESIGN.md` ("The Grand Log")
- [x] GitHub Actions CI green
- [x] Netlify deploy preview of `v2` live → **https://v2--rahulbabu.netlify.app**
- [x] Milestone commit + push

**Phase 0 complete (2026-07-04).**

### Phase 1 — The Ocean & The Ship

- [ ] GPU Gerstner-wave stylized ocean shader (anime water, not realistic) — replaces placeholder
- [ ] Sky/lighting pass: HDRI or drei Sky tuned for saturated One Piece daylight
- [ ] Postprocessing stack: tone mapping, selective bloom, vignette
- [ ] Ship: optimized Going Merry (gltf-transform compress 21MB → target <2MB) riding the waves
      (kinematic — samples the same wave function as the shader; bob/pitch/roll)
- [ ] Helm controls: WASD/arrows + touch joystick; inertia + turn easing
- [ ] Camera rig: follow-cam with easing, framing tuned per viewport
- [ ] Perf gate: 60fps desktop / 30fps+ mobile-sim, no console errors

### Phase 2 — Islands & Content

- [ ] Island registry: 6 islands (Experience, Projects, Education, Publications,
      Certifications, Contact) themed per DESIGN.md location mapping
- [ ] Asset pipeline: compress existing models; source supplemental CC0 assets per DESIGN.md
- [ ] Proximity detection → HUD prompt → modal opens (wanted-poster / log-book styled)
- [ ] All modals data-driven from `rahul-babu-data.json`
- [ ] Resume download (public/resume/Rahul-Babu-Resume.pdf) + contact via EmailJS

### Phase 3 — Polish & Resilience

- [ ] Loading choreography with real progress (drei useProgress) — themed
- [ ] Adaptive quality: DPR scaling, reduced geometry tier for mobile, demand frameloop when idle
- [ ] `prefers-reduced-motion` support
- [ ] Accessible non-3D fallback page with all content (doubles as SEO surface)
- [ ] Audio (optional, off by default): ocean ambience with a themed toggle
- [ ] 404 page (themed)

### Phase 4 — Ship It

- [ ] Lighthouse budget in CI (perf ≥ 85 desktop, accessibility ≥ 95)
- [ ] Cross-viewport visual QA sweep (Playwright screenshots reviewed)
- [ ] OG image + meta polish
- [ ] Full code review pass
- [ ] Merge `v2` → `main` → production at rahulbabu.netlify.app

## Content sources (canonical)

- `rahul-babu-data.json` (repo root) — all portfolio data. Edit here only.
- `Resume-Rahul-Latest.pdf` (repo root) — copied to `public/resume/Rahul-Babu-Resume.pdf` at
  scaffold time; re-copy when updated.
- `.env.local` — EmailJS keys (already present); Hygraph keys are obsolete (CMS dropped).
