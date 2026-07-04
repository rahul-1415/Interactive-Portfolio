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

## Standing rules (from Rahul)

- Never include Claude as co-author in commits.
- Commit + push after each working milestone; branch before big visual experiments.
- Original One Piece theming in all design — never generic AI-generated-looking design.
- Keep `docs/` current as work proceeds.
