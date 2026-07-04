# DESIGN.md — "The Grand Log"

## 1. Design Concept

**The Grand Log** is Rahul Babu's portfolio rendered as a single voyage: the visitor takes the helm of a small pirate ship on a cel-shaded anime ocean and sails between six hand-authored islands, each one a chapter of a career — a floating restaurant for work experience, a shipwrights' dock for projects, a colossal library tree for education, a press balloon for publications, a marine fortress for certifications, and a lonely lighthouse for contact. Every surface in the experience is diegetic and drawn from the visual grammar One Piece itself pastiches (wanted posters, Jolly Rogers, nautical charts, transponder snails, log poses) — but all artwork is original CSS/SVG/low-poly, no character likenesses, no official logo lettering, and an "inspired by" disclaimer in the footer. The craft bar is award-site level: authored camera, baked/faked lighting, choreographed loading, tiered performance, and a real mobile design. Nothing in this experience may look like a default — if a component could appear in a template, it gets redesigned until it couldn't.

---

## 2. Visual Identity

### 2.1 Color Tokens (final)

Defined once in `globals.css` as CSS custom properties; the 3D scene reads the same hex values from a shared `theme.ts` constant module so DOM and canvas never drift.

| Token             | Hex       | One Piece source                         | Role                                                                                               |
| ----------------- | --------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `--gl-sky`        | `#60BFF5` | Open-sea anime sky/shallow water         | Sky gradient top, shallow-water shader tint, light wash                                            |
| `--gl-deep`       | `#2E63A4` | Deep Grand Line current / late-arc blues | Primary brand blue: deep-water shader stop, dark surfaces, links on parchment                      |
| `--gl-red`        | `#D70000` | The captain's vest red                   | Primary accent: CTAs, active nav, "EXTRA!" stamps, errors (display sizes only — fails AA for body) |
| `--gl-gold`       | `#FFCE00` | Straw hat / treasure gold                | Secondary accent: bounty numerals, hover highlights, **focus rings**, treasure glow                |
| `--gl-parchment`  | `#EFE0B9` | Wanted-poster paper                      | Card/surface background: posters, charts, newspaper, menus                                         |
| `--gl-sepia`      | `#4B3621` | Faded poster ink                         | Body text + borders on parchment (8.8:1 on parchment — AAA)                                        |
| `--gl-ink`        | `#1A1A1A` | Oda's heavy lineart / flag cloth         | 3D cel-outline color, headings on light, flag backgrounds                                          |
| `--gl-plank`      | `#AF6528` | Ship-deck timber                         | Wood UI chrome: HUD frames, modal borders, pier materials                                          |
| `--gl-alabasta`   | `#D9A441` | Desert-kingdom sand/stone                | Zone accent: Experience island terrain + timeline markers                                          |
| `--gl-teal`       | `#3E9E9E` | Canal-city water                         | Zone accent: Projects island water + card ribbons                                                  |
| `--gl-cloud`      | `#F2F9FF` | Sky-island cloud sea                     | Elevated light surfaces, cloud particles, tooltips                                                 |
| `--gl-vermillion` | `#C63D2F` | Wano torii/washi red                     | Zone accent: visited-state marks on the sea chart; optional Wano-skin section                      |

**Rules:** red and gold are accents, never fields. Body text on parchment is always sepia. The ocean is a two-stop gradient `--gl-sky → --gl-deep`, nothing else.

### 2.2 Typography (final, all Google Fonts, OFL 1.1)

| Font                        | Role                                                                             | Fallback stack                                  |
| --------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Pirata One**              | Site title, island name cards, "DON!!"-adjacent display moments                  | `'Pirata One', 'IM Fell English', serif`        |
| **Rye**                     | "WANTED" header lines, broadside/poster headers                                  | `'Rye', 'Alfa Slab One', serif`                 |
| **Alfa Slab One**           | Bounty numerals (฿), big stats, section headings                                 | `'Alfa Slab One', Georgia, serif`               |
| **Libre Caslon Text (700)** | "DEAD OR ALIVE"-style sub-lines, poster name lines, certificates, Marine notices | `'Libre Caslon Text', 'Times New Roman', serif` |
| **IM Fell English**         | Sea-chart labels, newspaper body, antique flavor copy                            | `'IM Fell English', Georgia, serif`             |
| **Bangers**                 | Manga SFX beats ("DON!!"), achievement pops — _sparingly, ≤400ms moments_        | `'Bangers', Impact, sans-serif`                 |
| **Inter**                   | All long-form readable content in modals (job bullets, project descriptions)     | `Inter, -apple-system, 'Segoe UI', sans-serif`  |

Do **not** use the fan-made "One Piece font" (murky license). The Belly symbol is a tiny original SVG glyph (double-crossed B); `฿` is the text fallback.

### 2.3 Material & Texture Language

- **Parchment** — the primary card surface: `--gl-parchment` base + a single reusable SVG grain/fold-crease overlay (multiply, low opacity), torn-edge masks via `clip-path`/SVG. No stock paper JPEGs.
- **Wood** — HUD frames and modal chrome: `--gl-plank` with a subtle CSS plank-line repeating gradient and `--gl-ink` outline; 3D piers/decks use the same hue in flat cel bands.
- **Rope** — dividers and border ornaments: an original SVG rope-twist pattern used as `border-image`; also frames the sea-chart overlay.
- **Brass/gold** — small hardware only: compass rims, chest clasps, wax-seal buttons in `--gl-gold`/`--gl-alabasta` with a single specular highlight, never gradients-everywhere.
- **Ink** — everything gets a line: 3D meshes get an inverted-hull `#1A1A1A` outline pass; 2D components get 2px ink borders. This shared outline is the signature that unifies DOM and canvas.
- **The swirl** — the Devil-Fruit S-swirl (original SVG) is the site's repeating ornament: loading spinner, section dividers, list bullets, empty states. It is our "brand mark" pattern.

---

## 3. Motif → Surface Map

| UI Surface                              | Motif                         | Implementation notes                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loading screen                          | Grand Line sea chart          | Parchment chart of all six islands drawn in by an animated ink stroke; progress % = drei `useProgress`, lerped so it never chunks or stalls at 99; ends with a **"Set Sail" click gate** (unlocks AudioContext). Diegetic: the chart IS the loader.                                                                                                                   |
| Entrance beat                           | Manga arrival                 | On "Set Sail": chart burns away at the corners → camera already at sea, ship drops with a bob + splash SFX, islands scale in staggered (`back.out`), one-beat "DON!!" title card in Bangers. Teaches "you sail" wordlessly.                                                                                                                                           |
| Primary nav HUD                         | Log Pose                      | Bottom-left glass orb on a leather strap arcing off-screen; needle (CSS-rotated SVG) always points to nearest unvisited island; click opens a radial 6-needle menu. "Log set!" toast on section completion.                                                                                                                                                           |
| Quick nav / deep links                  | Eternal Pose                  | Menu drawer = shelf of six labeled hourglass bottles; clicking auto-sails directly to that island. URLs `/#dock-district` etc. are the shareable Eternal Poses.                                                                                                                                                                                                       |
| Sitemap / overview                      | Sea chart                     | Press `M` or the rolled-map HUD button: 3D ocean cross-fades to the flat parchment chart; visitor's actual route drawn as dotted ink; unvisited islands behind "?" cloud sketches.                                                                                                                                                                                    |
| Section logos / favicons / modal crests | Jolly Roger system            | One original skull silhouette + per-section attribute: necktie (Experience), crossed wrenches (Projects), grad cap (Education), quill pens (Publications), wax-seal ribbon (Certifications), handset (Contact). Cloth flag on each island's mast (vertex-shader wave); flat SVG reused as nav icon + modal header. Visitor's ship flies Rahul's personal Jolly Roger. |
| Project cards                           | WANTED poster                 | Full original poster template: Rye "WANTED", portrait window (screenshot), Libre Caslon "LIVE OR REPO" row (demo/GitHub links), Alfa Slab bounty = impact number. Hover: paper lift + 2° rotation + shadow; click: nail-through-paper pin to fullscreen. Same template generates the hero's own poster.                                                               |
| Hero / about                            | WANTED poster + bounty reveal | The visitor "discovers" Rahul's bounty poster; bounty numerals odometer-roll in.                                                                                                                                                                                                                                                                                      |
| Contact form                            | Den Den Mushi                 | Original SVG snail sleeping beside the form; focus wakes it ("puru puru puru…" typed animation), submit = "gatcha!" + speech-bubble confirmation; validation errors = confused snail face.                                                                                                                                                                            |
| Toasts / notifications                  | Baby Den Den Mushi            | Tiny snail slides in from corner carrying the message on a paper scrap.                                                                                                                                                                                                                                                                                               |
| Resume download                         | Vivre Card                    | Paper scrap pinned in the HUD, gently tugging toward Contact island as you sail; click = paper-flutter + PDF download. Social links tug toward their icons on hover.                                                                                                                                                                                                  |
| Visitor progress                        | Bounty meter                  | HUD bounty starts ฿0; odometer-ticks up per island/poster/easter egg; full exploration generates a shareable "YOUR BOUNTY" poster.                                                                                                                                                                                                                                    |
| Skills grid                             | Devil Fruit encyclopedia      | Each core skill = a distinct original SVG fruit (unique hue + swirl); hover card describes the "power granted."                                                                                                                                                                                                                                                       |
| Spinner / dividers / bullets            | Devil-Fruit swirl             | The S-swirl SVG, everywhere small ornament is needed.                                                                                                                                                                                                                                                                                                                 |
| Buttons                                 | Wax seal + wood               | Primary CTA = red wax-seal circle with embossed Jolly Roger, gold focus ring; secondary = plank button with ink border; press = seal "stamps" down 2px.                                                                                                                                                                                                               |
| Cursor                                  | Compass needle                | Custom SVG cursor: small needle at rest; hoverable 3D objects swap to a pointing spyglass; `cursor: pointer` fallback always set.                                                                                                                                                                                                                                     |
| Scrollbars (modals)                     | Rope & pulley                 | Thin `--gl-plank` track with rope texture, `--gl-sepia` thumb styled as a wooden toggle; native fallback elsewhere.                                                                                                                                                                                                                                                   |
| Modals                                  | Ship's cabin documents        | Parchment sheet inside a wood-and-rope frame; header = section Jolly Roger crest; close button = red wax seal with an ✕ scored in.                                                                                                                                                                                                                                    |
| Settings / quality toggle               | Ship's wheel                  | Deck-HUD wheel icon: graphics tier, sound on/off (persisted), "skip voyage" link.                                                                                                                                                                                                                                                                                     |
| Achievements / transitions              | DON!! impact frames           | Radial speed lines (CSS conic-gradient) + Bangers lettering, strictly ≤400ms, respects `prefers-reduced-motion`.                                                                                                                                                                                                                                                      |
| Easter eggs                             | Barrels & chests              | Floating clickable barrels (fun facts, mini-bounties); one treasure chest per island holding the section's key artifact, gold-glow burst on open.                                                                                                                                                                                                                     |
| 404                                     | Sea-monster margin doodle     | Parchment chart corner labeled "HERE BE BUGS," original sea-monster sketch, Log Pose link home.                                                                                                                                                                                                                                                                       |
| Publications delivery                   | News Coo                      | Low-poly gull drops a rolled newspaper on deck; opens to the broadsheet layout.                                                                                                                                                                                                                                                                                       |
| Footer                                  | Ship's log                    | IM Fell English colophon + "An original fan-inspired work. Not affiliated with Shueisha/Toei." + Sketchfab model attributions.                                                                                                                                                                                                                                        |

---

## 4. Island World Design

Spawn: the ship starts just offshore of the hero islet with a wooden signpost tutorial ("Set sail — hold to steer"). Recommended route is drawn on the sea chart, but all islands are reachable in any order.

| #   | Island (in-site name)   | Inspired by                         | Section        | Visual identity & what the player sees                                                                                                                                                                                                                                                                                        |
| --- | ----------------------- | ----------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | **First Port**          | Shells Town                         | Hero / spawn   | Small, humble harbor town: a few tan-and-blue low-poly buildings, the tutorial signpost, Rahul's WANTED poster nailed to the dock board. Deliberately modest — pushes exploration outward.                                                                                                                                    |
| 1   | **The Floating Galley** | Baratie                             | Experience     | An oval restaurant-ship at anchor: carved fish figurehead, lantern-lit dining decks, warm gold (`--gl-alabasta` zone accent). Docking opens a hand-written **menu card**: each role is a course — position as dish, tenure as "served 20XX–20XX," achievements as ingredients. Career progression = galley to head chef.      |
| 2   | **Dock District**       | Water 7 / Galley-La Dock 1          | Projects       | Tiered canal city, arched bridges, `--gl-teal` water, numbered shipyard gates. Each project = a ship in a numbered drydock (Dock 1 = flagship), its WANTED-poster spec sheet nailed to the gate; shipped projects float launched in the harbor, WIP sits in scaffolding.                                                      |
| 3   | **The Knowledge Tree**  | Ohara                               | Education      | One colossal hollow tree over a lake, warm lamplight through the trunk, spiral shelves. Each degree = a giant leather tome; opening shows institution, years, coursework; honors as gold-leaf bookmarks. Reverent, quiet audio bed.                                                                                           |
| 4   | **The Press Balloon**   | World Economy News Paper / News Coo | Publications   | Not land — a moored hot-air-balloon press ship trailed by gulls. A News Coo drops a rolled broadsheet on your deck; it unrolls into a newspaper page: each paper = a column with headline, venue as masthead, halftone figure, citations as circulation, "read full edition" → DOI/PDF. New items get the red "EXTRA!" stamp. |
| 5   | **Fort Meridian**       | Marineford                          | Certifications | Crescent brick-and-steel fortress, rigid flags-and-cannons iconography, seagull crest. Each certification = a commendation on parchment with wax seal: issuer as "branch," date as "commissioned," verification link as the official stamp, chevrons for level.                                                               |
| 6   | **Twin Cape Light**     | Twin Cape Lighthouse                | Contact        | Lonely red-and-white lighthouse at the world's edge, whale silhouette offshore at dusk tint. Lighting the beacon opens the Den Den Mushi form; social links hang as signal flags; a sent message paints a small promise-mark on the lighthouse wall.                                                                          |
| ★   | **The Sky Reward**      | Skypiea                             | Easter egg     | 100% exploration triggers a Knock-Up Stream launch to a cloud islet (`--gl-cloud` + gold): your final bounty poster + "ring the golden bell" share action. Rewards completionists only.                                                                                                                                       |

Per-island zone grading (Alabasta gold, canal teal, fortress grey-blue, cloud white) recreates the anime's arc-by-arc palette shifts; the ocean and outline ink stay constant so the world reads as one.

---

## 5. Craft Bar

**The meta-rule:** one committed concept (a sailed voyage), an authored camera, everything expensive precomputed, loading choreographed, performance tiered. If a default is visible, we failed.

### Committed techniques

1. **Camera — damped follow + authored docking.** Sailing uses a damped follow-cam (`THREE.MathUtils.damp`, λ≈4, never parented) so speed reads physically. Approaching an island triggers an authored GSAP tween of `camera.position` + target simultaneously (`power3.inOut`, ~1.6s) into a composed vantage; controls disabled in transit. Idle cursor parallax: damped ±2° offset. **No free orbit ships, ever.** Every reachable frame is a composed shot.
2. **Lighting — bake everything, light almost nothing.** Islands: lighting/AO baked in Blender onto UV textures or matcap/toon-ramp materials; one directional light max (for the toon ramp), `<BakeShadows>`, blob-plane shadows under the ship. Zero real-time shadow-mapped dynamic lights. Water needs no lights — its look is the ramp.
3. **Postprocessing — lean and motivated.** `@react-three/postprocessing`: Bloom (`luminanceThreshold: 1.1`, emissive-only — lanterns, treasure glow, lighthouse beacon), Vignette (subtle), SMAA; ToneMapping (ACES) last. Canvas `antialias:false, stencil:false`. No chromatic aberration, no film grain — they serve no concept here. Mobile tier drops Bloom.
4. **Loading & entrance — Act One.** Chart-loader (see §3) with lerped real progress → click gate → world-assembly choreography with sound. The scene never "just appears." Shaders precompiled (`gl.compile` / drei warm-up) before the gate opens so the first sail is stutter-free.
5. **Audio — Howler.js, post-gesture only.** Ambient ocean loop (default low) + interaction ticks. Every SFX pooled in 3–5 variants with randomized playback rate; splash volume scaled by wave impact. Visible ship's-wheel mute toggle, choice persisted. No music autoplay.
6. **Microinteraction floor.** Every raycast-hoverable object responds within one frame (scale pulse + outline + cursor swap). Springy secondary motion: flags wave, the ship's lantern lags against acceleration, barrels bob. Idle ambience always: gulls circling, cloud drift, water sparkle. Zero linear tweens, zero camera cuts.
7. **Mobile — a designed product, not a degradation.** Touch: tap-an-island-to-sail (no virtual joystick pretending to be WASD) + the Log Pose radial as primary nav. DPR clamped harder (max 1.5), bloom/reflections off, simplified water. Plus a visible **"Skip the voyage — plain site"** link (recruiter escape hatch) rendering all content as themed 2D HTML, which doubles as the WebGL-unsupported fallback and the SEO surface.
8. **Content-first routing.** The Log Pose, Eternal Poses, and skip link guarantee any section is ≤2 obvious interactions away. The 3D world is the delivery vehicle for content, never an obstacle to a 30-second scan.
9. **Text strategy.** All readable content = HTML overlay (crisp, selectable, accessible). In-scene text (island name boards, dock numbers) = troika-three-text SDF. Never TextGeometry, never canvas-texture paragraphs.
10. **Housekeeping.** Dispose geometries/textures on scene swaps (idempotent for StrictMode double-invoke); pause rAF on `visibilitychange`; resize handler correct on rotate; `frameloop` drops to demand when a modal fully covers the canvas.

### Banned pitfalls (ship-blockers)

- Raw/default OrbitControls (under-floor camera, void stranding)
- Progress bar that chunks or hangs at 99/100%; blank screen before first paint
- Unclamped DPR; FPS-based quality switching without hysteresis
- Unlit-grey GLTF look / wrong color space; real-time shadow maps on static geometry
- Z-fighting at the shoreline (offset the water plane; polygonOffset on decals)
- Frame drops during camera tweens (lazy shader compilation, setState inside `useFrame`)
- "Use WASD" shown on a touchscreen; no WebGL fallback
- Autoplaying audio; one SFX repeated identically
- Whole-frame milky bloom (threshold < 1 under tone mapping)
- > 15MB payload; memory climbing across navigation; canvas distortion on rotate

---

## 6. Asset Plan

**Verdict: keep and optimize the existing One Piece fan models — they ARE the theme. Do not replace them with generic pirate ships.** Supplement with CC0 only where authenticity doesn't matter. Total 3D payload target: **<12MB (from ~57MB today)**; initial scene <2MB.

| Asset                                                                        | Call                                                                                                                 | Target / URL                                                                                                                                                                                                | License                                                                                                           |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `goingMerry/` (21MB)                                                         | **Keep + compress** → hero player ship                                                                               | `npx @gltf-transform/cli optimize scene.gltf going-merry.glb --compress meshopt --texture-compress webp --texture-size 1024` → target **≤3MB**                                                              | CC BY 4.0 (Anex, Sketchfab) — attribute in footer; fan-art IP risk accepted for personal non-commercial portfolio |
| `thusand_sunny/` (10MB)                                                      | **Keep + compress** → moored showcase ship at Dock District                                                          | Same pipeline → target **≤1.5MB**. If it compresses poorly, swap to Tigerar1's 28k-tri model (sketchfab.com/3d-models/thousand-sunny-ship-59b59a3fb0c04113af5520bce3534a20, **CC BY-SA** — note ShareAlike) | CC BY 4.0                                                                                                         |
| `one_piece_straw_hat_2_years` (20MB)                                         | **Delete.** Use the existing 144KB `public/assets/straw-hat.glb`                                                     | —                                                                                                                                                                                                           | —                                                                                                                 |
| Moby Dick model                                                              | Keep + same compression pass if used as background silhouette                                                        | ≤1MB                                                                                                                                                                                                        | as-tagged                                                                                                         |
| Island vegetation                                                            | **Download:** Quaternius Ultimate Stylized Nature — quaternius.com/packs/ultimatestylizednature.html                 | toon look matches the ocean                                                                                                                                                                                 | CC0                                                                                                               |
| Docks, barrels, chests, rocks, cannons                                       | **Download:** Kenney Pirate Kit — kenney.nl/assets/pirate-kit (GLTF works directly)                                  | dressing for all islands                                                                                                                                                                                    | CC0                                                                                                               |
| Distant horizon ships                                                        | **Download:** Quaternius Ships — quaternius.com/packs/ships.html                                                     | 2–3 instanced silhouettes                                                                                                                                                                                   | CC0                                                                                                               |
| Seagulls / News Coo base                                                     | **Download:** poly.pizza/m/6Tpj_vcWP3f (alt: poly.pizza/m/0WRzrtCIIRp); add an original postman cap for the News Coo | CC BY 3.0 (attribute)                                                                                                                                                                                       |
| Day sky HDRI                                                                 | **Download:** dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/kloofendal_48d_partly_cloudy_puresky_2k.hdr (2k only)     | env light + anime sky                                                                                                                                                                                       | CC0                                                                                                               |
| Sunset sky (Twin Cape / transitions)                                         | **Download:** dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/qwantani_sunset_puresky_2k.hdr                            | CC0                                                                                                                                                                                                         |
| Water normals                                                                | **Download:** raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg                       | detail normals for the ocean                                                                                                                                                                                | MIT                                                                                                               |
| Shore foam                                                                   | **Download:** ambientcg.com/get?file=Foam001_1K-JPG.zip                                                              | hull/shoreline foam mask                                                                                                                                                                                    | CC0                                                                                                               |
| Shallow caustics                                                             | **Download:** opengameart.org/content/caustic-textures                                                               | animated shallow-water shimmer                                                                                                                                                                              | CC0                                                                                                               |
| All 2D art (posters, Jolly Rogers, snail, fruits, swirl, chart, Belly glyph) | **Author original SVG in-repo** — never traced from official art                                                     | `src/assets/svg/`                                                                                                                                                                                           | Original                                                                                                          |

Pipeline rules: every GLB through gltf-transform (meshopt), decoders served from `/public` (not CDN), power-of-two textures, KTX2 for the heaviest sets, all 3D files in `public/` (never imported through the JS graph — Netlify function size limit).

---

## 7. Tech Notes

### 7.1 Install (exact versions, July 2026)

```
next@16.2.10  react@19.2.7  react-dom@19.2.7
three@0.185.1  @types/three@0.185.x
@react-three/fiber@9.6.1  @react-three/drei@10.7.7  @react-three/postprocessing@3.0.4
zustand@5.0.14  maath@0.10.8  tunnel-rat@0.1.2  gsap  howler
typescript@6.0.3  eslint@10.6.0 (flat config)  eslint-config-next@16.2.10
devDependencies: leva@0.10.1  r3f-perf@7.2.3  vitest@4.1.9  @react-three/test-renderer@9.x  @playwright/test@1.61.1
```

Non-negotiable pairings: fiber 9 + drei 10 + React 19 (fiber 8/drei 9 break on React 19). zustand v5: use `useShallow` for multi-field selectors. leva/r3f-perf gated behind `NODE_ENV !== 'production'`.

### 7.2 Netlify gotchas (respect all)

- Do **not** add `@netlify/plugin-nextjs` to package.json — it's auto-injected (currently 5.15.12); leave unpinned for security patches.
- Pin `NODE_VERSION = "22"` in `[build.environment]` (Next 16 needs ≥20.9; old sites silently sit on stale defaults).
- Leave `output` **unset** in next.config; `publish = ".next"`. Never `standalone`/`export`.
- Keep middleware minimal/Node-compatible — Next 16 builds can pass locally then fail at Netlify's edge-bundling step.
- Never let a darwin-only `@next/swc-*` land as a real dependency (this repo already hit this — commit `081f5a0`); regenerate lockfile with npm ≥10.
- All GLB/KTX2/HDR in `public/` (CDN-served), never through the JS import graph (250MB function limit).
- `next build --webpack` is the escape hatch if Turbopack bundling fails opaquely.
- Keep `next` patch-current (middleware-bypass CVE class recurs).

### 7.3 Canonical R3F v9 + App Router mounting pattern

```
app/layout.tsx (Server) ── renders <SceneShell /> + {children}
components/canvas/SceneShell.tsx ('use client'):
  const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <ChartPoster /> })
  // ssr:false is a build error in Server Components on Next 15/16 — this client wrapper is the fix
components/canvas/Scene.tsx ('use client'): one persistent <Canvas dpr={[1, 2]}> with <r3f.Out />
src/tunnel.ts: export const r3f = tunnel()   // tunnel-rat: pages render <r3f.In>{islands}</r3f.In>
src/stores/scene-store.ts: module-level zustand create() — imported by both DOM UI and Canvas
```

Rules: `<ChartPoster />` (static chart image) is the LCP element, never a blank canvas. Inside `useFrame`, read the store via `useSceneStore.getState()`/`subscribe` — never hooks-per-frame. `next/navigation` hooks stay DOM-side; pass callbacks into the Canvas via props/zustand (contexts don't cross the reconciler root). Dispose logic idempotent (StrictMode double-invoke). drei `<Html>` for HUD anchored to 3D points.

### 7.4 Ocean shader (final choice)

**Custom `shaderMaterial` toon ocean, built from the Codrops stylized-water recipe** — https://tympanus.net/codrops/2025/03/04/creating-stylized-water-effects-with-react-three-fiber/ — as the skeleton (vertex-displaced plane, banded two-color ramp `--gl-sky → --gl-deep`, animated noise foam caps), with **depth-based shoreline foam rings** ported from the Roystan/three.js-discourse toon-water approach (https://discourse.threejs.org/t/toon-water-shader-with-depth-based-fog-and-intersection-foam/35978) so every island gets the anime foam contour. Buoyancy for the ship reuses the same wave function CPU-side (sbcode Gerstner `getWaveInfo` pattern: https://sbcode.net/threejs/gerstnerwater/). Plane ≤256×256 segments; wave _detail_ lives in fragment-shader normals (waternormals.jpg), not geometry. Wind-Waker white contour lines (Nathan Gordon's analysis) are the stretch-goal polish pass.

### 7.5 Performance budget

| Metric             | Budget                                                                                                | Enforcement                                                      |
| ------------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Frame rate         | 60fps mid-tier laptop; 30fps floor mobile                                                             | r3f-perf (dev), `<PerformanceMonitor>` (prod)                    |
| Draw calls         | <100 mobile / <200 desktop                                                                            | drei `<Instances>`/merged statics; ocean = 1 call                |
| Triangles          | ≤200k mobile / ≤500k desktop                                                                          | gltf-transform reports in CI                                     |
| First-load JS      | <450KB gz landing route                                                                               | scene behind `ssr:false` dynamic import; per-module drei imports |
| LCP                | <2.5s on 4G                                                                                           | static chart poster paints before bundle                         |
| 3D payload         | <2MB initial scene, <12MB total                                                                       | meshopt + webp/KTX2 pipeline                                     |
| GPU texture memory | <150MB mobile                                                                                         | KTX2, 1024² default / 2048² hero-only, POT + mips                |
| DPR                | clamp `[1, 2]` desktop, `[1, 1.5]` mobile; PerformanceMonitor steps 2→1.5→1 with hysteresis           | `setDpr(0.5 + 1.5 * factor)` pattern                             |
| Lights             | ≤1 directional (toon ramp), 0 shadow-mapped dynamic                                                   | baked AO + blob shadows                                          |
| Post stack         | Bloom (threshold 1.1) + Vignette + SMAA only; mobile: none                                            | quality tier from PerformanceMonitor                             |
| Idle               | `frameloop='demand'` when modal covers scene / tab hidden                                             | `visibilitychange` handler                                       |
| CI                 | Playwright canvas smoke test (readPixels non-black) + Lighthouse budget assertions on deploy previews | Netlify deploy-preview workflow                                  |
