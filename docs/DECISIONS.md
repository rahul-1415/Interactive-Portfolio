# Decision Log — Interactive Portfolio v2

> Why things are the way they are. Append-only; newest first.

## 2026-07-04 — Foundation decisions

| Decision         | Choice                                                              | Why                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework        | **Next.js 16.2** (latest stable)                                    | Current stable with mature Netlify runtime support (plugin 5.15); App Router; fallback plan is `next@15.5` backport tag if Netlify build misbehaves |
| React            | **19.2**                                                            | Required peer of R3F v9                                                                                                                             |
| 3D               | **R3F 9.6 + three 0.185 + drei 10 + @react-three/postprocessing 3** | Current stable line; drei 10 pairs with fiber 9                                                                                                     |
| TypeScript       | **5.9.3, not 6.0**                                                  | TS 6 is too new for parts of the ecosystem (typescript-eslint etc.); revisit later                                                                  |
| Physics          | **None (Rapier dropped)**                                           | Ship is kinematic: samples the same wave function as the ocean shader for bob/pitch/roll; ~2MB WASM saved; nothing needs real collision             |
| CMS              | **Dropped Hygraph/Apollo → local typed JSON**                       | Content changes rarely; removes secrets, runtime GraphQL, and a deploy failure class. `rahul-babu-data.json` at repo root is canonical              |
| E2E              | **Playwright only (Cypress dropped)**                               | One E2E tool; it's the one Claude can drive via MCP for visual iteration                                                                            |
| Package manager  | **npm (yarn dropped)**                                              | Simplest with Netlify + npm ci in CI; lockfile now committed (was gitignored in yarn era)                                                           |
| Commit hooks     | **husky + lint-staged only**                                        | Old commitlint dropped — descriptive messages enforced by convention; hooks stay fast (no tests pre-commit)                                         |
| Node             | **24 (pinned via .nvmrc + netlify.toml)**                           | Matches local dev; current LTS                                                                                                                      |
| Rebuild location | **`v2` branch, same repo**                                          | Netlify branch deploys give free previews; old site stays live on `main`; trivial rollback                                                          |
| Ship model       | **Keep Going Merry / Thousand Sunny fan models, compress hard**     | Authentic to the One Piece theme (research may supersede); 21MB Going Merry must reach <2MB via gltf-transform draco+ktx2                           |

## 2026-07-04 — Phase 4: Lighthouse baseline & budget

Measured on the deployed preview (`v2--rahulbabu.netlify.app`, mobile Lighthouse 13.4):

| Category       | Score                                                          |
| -------------- | -------------------------------------------------------------- |
| Performance    | **70** (FCP 0.9s · LCP 2.7s · TBT 1.6s · CLS 0.006 · TTI 6.9s) |
| Accessibility  | **100**                                                        |
| Best Practices | **100**                                                        |
| SEO            | **100**                                                        |

- **Realistic perf budget for this app is ~65+, not the 85 originally penciled in.** A
  full-screen WebGL experience with a continuous rAF loop, shader compilation, and a GLB
  parse on load is inherently capped by Lighthouse's throttled-CPU model (award-winning 3D
  sites typically score 30–50). The perf-sensitive/crawler path is the fast `/log` page.
- Biggest win: idling the render loop (`frameloop='demand'`) behind the Set Sail gate took
  Performance 39 → 70 (TBT 28s → 1.6s, TTI 33s → 6.9s) by freeing the main thread pre-sail.
- Chose **not** to add a blocking Lighthouse CI gate — it would be flaky against a
  runtime-throttled 3D scene. The scores above are the tracked baseline; re-check on major
  scene changes.

## Standing rules (from Rahul)

- Never include Claude as co-author in commits.
- Commit + push after each working milestone; branch before big visual experiments.
- Original One Piece theming in all design — never generic AI-generated-looking design.
- Keep `docs/` current as work proceeds.

## 2026-07-05 — v2.2 decisions

- **Bake skinned GLBs to static geometry offline** (`scripts/bake-skins.mjs`) rather than
  patching normalizeModel or re-binding skeletons at runtime. Skinned props were pure
  liability: three.js ignores the mesh node transform for skinned meshes, `clone(true)`
  doesn't rebind skeletons (the Sunny rendered via the original scene's frozen bones at
  the world origin), `Box3.setFromObject` measures bind pose, and a static ship paid 84k
  verts of skinning every frame. Baking preserved the rendered look byte-for-byte.
  Rule going forward: **no skinned models in the fleet** — bake or strip on import.
- **Collision = analytic shapes, not mesh colliders.** One oriented capsule for the
  Sunny (fitted from the baked verts' min-area rect: 52.2×26 @ ~4°) + circles at
  1.3× landRadius for islands. Radial position-resolve gives sliding for free; no
  physics engine dependency for a boat that only needs "don't pass through things".
  The follow camera resolves against the same field (target clamp + final hard resolve).
- **Default quality is Swift (low)** per owner: speed first. DPR 1, no postprocessing,
  144-seg ocean. Auto/Grand are opt-in in the Ship's Wheel; saved choices respected.
- **Game economy tuned to canon**: island +฿300M, barrel +฿90M, full log exactly
  ฿3,000,000,000 (an Emperor's bounty) → PIRATE KING. Epithet thresholds follow the
  Supernova → Emperor ladder. Progress in localStorage `grand-log-progress`; the crown
  banner shows once (persisted `crowned`).
- **Procedural landmarks over downloaded assets** for the Baratie and Galley-La yard:
  matches the cel-toned world, keeps payload at zero extra KB, avoids license/attribution
  overhead, and reads more "original One Piece" than any stock model. moby-dick.glb
  deleted (it rendered as a dark blob and its two skinned parts were frozen debris).

## 2026-07-05 — v2.3 decisions

- **Never pass-and-forget a uniforms object.** React 19 StrictMode double-invokes
  useMemo; R3F can leave the material holding the twin copy. All per-frame uniform
  writes go through `materialRef.current.uniforms` (see Ocean.tsx) — this bug kept
  the entire ocean frozen at t=0 without a single console error.
- **drei `<Text>` (and any suspending loader) must mount inside the scene's Suspense
  boundary** — Skypiea outside it wedged the canvas only for visitors with a
  completed log, the worst kind of state-dependent breakage.
- **Minimap is ship-centered and heading-up**, and chart-right equals _view_-right,
  not world +X: the chase camera looks down +Z, so world X is mirrored on screen.
  A north-up chart is "correct" cartography but reads inverted in play.
- **Dock key is Space** (was E) per owner preference; keydown handler ignores form
  fields and focused buttons and preventDefaults only when it actually docks.
- **Audio is synthesized, not shipped**: brown-noise sea + oscillator chimes keep
  the payload at 0 bytes and sidestep licensing; opt-in with the AudioContext
  primed inside the toggle's click gesture.
- **Poster mugshots are static jpegs in public/posters/** (live captures + GitHub
  OG cards), regenerated by hand when projects change — no runtime dependency on
  external image hosts.
