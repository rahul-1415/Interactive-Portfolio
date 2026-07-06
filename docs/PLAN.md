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

### Phase 1 — The Ocean & The Ship ⏳ core complete

- [x] GPU Gerstner toon ocean: world-space waves generated from one TS config
      (`src/lib/waves.ts`), posterized 5-band ramp, noise-broken crest foam, banded sun
      glint, manual fog — GLSL is _generated from_ the same constants the CPU samples
- [x] Anime gradient SkyDome (custom shader — drei physical Sky was hazy white, rejected)
- [x] Postprocessing: Bloom (threshold 1.1, mipmap), Vignette, SMAA; antialias/stencil off
- [x] Going Merry compressed 22.3MB → 546KB (meshopt + webp 1024); deterministic
      normalization from measured bbox (length axis = X, origin at keel)
- [x] Kinematic sailing: throttle inertia, speed-scaled rudder authority, bob/pitch/roll
      from 4-point wave sampling; blob shadow grounds the hull
- [x] Damped follow camera (never parented), look-ahead framing
- [x] Perf gate: **60.3fps** desktop, zero console errors
- [ ] Wake/hull foam + sail wind shader (polish pass, later)
- [ ] Touch controls (Phase 3, mobile is tap-to-sail per DESIGN.md)

Fleet compressed & staged in `public/models/`: thousand-sunny 729KB, moby-dick 537KB,
islands 7KB each, straw-hat 143KB. Old 20MB straw-hat duplicate deleted.

### Phase 2 — Islands & Content ⏳ core complete

- [x] Island registry (`src/content/islands.ts`): 6 islands themed per DESIGN.md — The
      Floating Galley (Baratie/experience), Dock District (Water 7/projects, Thousand Sunny
      moored), The Knowledge Tree (Ohara/education), The Press Balloon (publications),
      Fort Meridian (Marineford/certifications), Twin Cape Light (contact)
- [x] Landmark silhouettes from cel-toned primitives + repurposed ship models; emissive
      beacons for bloom; Bangers name boards on billboards
- [x] Proximity → dock prompt (⚓ + island name + E key) → modal; Esc/Set Sail undocks;
      helm locks while docked; soft radial island collision
- [x] All 6 modals data-driven and One Piece-styled: menu card (experience), WANTED
      posters w/ bounties (projects), tomes (education), Grand Line Times broadsheet
      (publications), wax-seal commendations (certifications), signal flags + Vivre Card
      resume (contact)
- [x] Typography system live: Pirata One / Rye / Alfa Slab One / Inter via next/font
- [x] Verified end-to-end: sail → prompt → dock → modal → escape, zero console errors
- [ ] Contact form via EmailJS (currently mailto + socials) — Phase 3
- [ ] Supplemental CC0 dressing assets (palms, barrels, gulls) — polish pass

### Phase 3 — Polish & Resilience ⏳ core complete

- [x] Loading gate: "The Grand Log" chart-loader with real drei useProgress, animated
      progress ship, explicit "Set Sail" click gate, skip-to-log link
- [x] Accessible non-3D fallback at `/log` — all 6 sections server-rendered from the same
      data + renderers (SEO surface, own `<title>`/meta, footer attributions/disclaimer)
- [x] Themed 404 ("Here Be Bugs") returning real 404 status
- [x] EmailJS Den Den Mushi contact form (sleeping→sending→gatcha states); keys imported
      to Netlify env; verified a live send returns success
- [x] Touch: on-screen helm (steer rocker + hold-to-sail throttle), coarse-pointer only
- [x] Adaptive quality: PerformanceMonitor drives DPR with hysteresis; mobile starts lower
      and skips postprocessing; `prefers-reduced-motion` → demand frameloop + killed transitions
- [x] e2e extended: /log content + no-canvas + 404-status assertions (6 tests × 2 viewports)
- [ ] Audio (optional ocean ambience + mute) — deferred to Phase 4 polish
- [ ] Wake foam / sail wind shader — deferred polish

### Phase 4 — Ship It ⏳ complete pending production merge

- [x] Full high-effort code review (15 findings) — all material ones fixed & verified
- [x] Camera framing fix (3/4 hero view; the "dark scene" was the resting cam staring
      into the mainsail, not a color bug)
- [x] Lighthouse on deployed preview: **Perf 70–94 · A11y 100 · Best Practices 100 · SEO 100**
      (see DECISIONS for the realistic WebGL perf budget)
- [x] Cross-viewport visual QA sweep (desktop / tablet / mobile + /log), zero console errors
- [x] OG image + Twitter card + meta polish
- [ ] **Merge `v2` → `main` → production at rahulbabu.netlify.app** (awaiting owner OK —
      this replaces the current live personal site)

### v2.1 — Owner feature round ✅ complete (2026-07-04)

- [x] Straight camera default (Mini Merry player ship) + Cinematic option
- [x] Soldier-dock launch animation from the Thousand Sunny
- [x] Thousand Sunny home-port dashboard modal
- [x] Parchment minimap, Ship's Wheel settings, dock rings + beacons

### v2.2 — Physics, speed & the game layer ✅ complete (2026-07-05)

- [x] Root-cause fix for "phasing through the Sunny": her GLB was fully skinned, so
      three.js rendered her via a frozen skeleton detached from her anchor. Baked all
      skinned GLBs to static geometry (`scripts/bake-skins.mjs`); Moby Dick's stray
      skinned bits stripped
- [x] Solid-world collision (`src/lib/collision.ts`): oriented capsule fitted to the
      Sunny's measured hull + island circles sized to visual beaches; radial resolve =
      natural sliding; scraping bleeds speed; follow camera collides too
- [x] Buoyancy: waterline raised so the Mini Merry rides the swells instead of swamping
- [x] Speed-first defaults: Swift (low) quality for new visitors, DPR 1 start,
      ocean tessellation scaled by quality (61fps measured on low)
- [x] Game layer: 10 treasure barrels (+฿90M), island charting (+฿300M), live bounty
      board with One Piece epithet ladder, sea-chart ✕ marks & visited rings,
      ฿3,000,000,000 full-log total → PIRATE KING finale (persisted)
- [x] Landmarks rebuilt: Baratie-style Floating Galley (fish figurehead, rotunda,
      awnings) and Galley-La working shipyard (dry-dock, ribs, gantry crane, tower);
      moby-dick.glb deleted
- [ ] Wake foam / ambient audio / tap-to-sail — candidate next round

### v2.3 — The living sea & quality-of-life round ✅ complete (2026-07-05)

- [x] Root-cause: ocean uniforms twin-object bug (StrictMode) — sea was frozen at t=0;
      fixed via material-ref updates; waves + buoyancy finally in sync
- [x] Wake foam + bow spray (fragment shader, throttle-scaled)
- [x] Launch camera regression fixed — on-deck opening shot, dolly exempt from collision
- [x] Space replaces E to dock
- [x] Ship-centered rotating minimap (heading-up, view-matched right, rim bearing dots)
- [x] Tap-to-sail autopilot + course banner
- [x] Procedural sea ambience + reward chimes (opt-in, Ship's Wheel)
- [x] Skypiea — hidden sky island for a completed log
- [x] Wanted-poster mugshots (live captures + GitHub OG cards, 16/16)

### v2.4 — Purposeful names, burst & the singing sea ✅ complete (2026-07-05)

- [x] Purposeful island labels + per-island board heights; combined titles when docked
- [x] Click-anywhere (open water) tap-to-sail
- [x] Coup de Burst (Shift, 55 u/s, inexhaustible) + faster base handling
- [x] Skypiea always visible; golden bell reserved for the Pirate King
- [x] Original sea-shanty music + gentler waves; Music/Sound toggles, on by default
- [x] Résumé preview button (PDF iframe + download) in the HUD
- [x] Topical CC0/PDM poster art via Openverse (13) + live captures (3)
- [x] Space to set sail on the gate

### v2.5 — Onigashima, reachable Skypiea & the ship's jukebox ✅ complete (2026-07-05)

- [x] New Skills island: Onigashima (skull landmark, armory modal, /log section, ฿3B kept exact)
- [x] Island labels drop the "Island" suffix
- [x] Skypiea lowered (alt 16) + accessible: Space ascent prompt + recap card
- [x] Space undocks modals (matching the dock key)
- [x] Three original music tracks + off, selectable in the Ship's Wheel
- [x] Press Balloon lowered to a moored-airship height
- [x] Résumé button beside the name

## Content sources (canonical)

- `rahul-babu-data.json` (repo root) — all portfolio data. Edit here only.
- `Resume-Rahul-Latest.pdf` (repo root) — copied to `public/resume/Rahul-Babu-Resume.pdf` at
  scaffold time; re-copy when updated.
- `.env.local` — EmailJS keys (already present); Hygraph keys are obsolete (CMS dropped).
