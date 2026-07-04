# Setup & Tooling — Interactive Portfolio v2

## Run it

```bash
nvm use            # Node 24 (.nvmrc)
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script                            | What                                 |
| --------------------------------- | ------------------------------------ |
| `npm run dev` / `build` / `start` | Next.js                              |
| `npm run typecheck`               | `tsc --noEmit` (strict)              |
| `npm run lint` / `lint:fix`       | ESLint 10 flat config                |
| `npm run test` / `test:watch`     | Vitest — content invariants + units  |
| `npm run test:e2e`                | Playwright (boots dev server itself) |
| `npm run format`                  | Prettier                             |

## Environment (`.env.local`)

- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` / `_SERVICE_ID` / `_TEMPLATE_ID` — contact form (present)
- Hygraph vars from v1 are obsolete; safe to delete.

## Deploy

- Netlify project `rahulbabu` (already linked via `netlify link`).
- `main` → production (old site until v2 merges). `v2` branch → branch deploy preview.
- `netlify deploy --build` for manual previews; `netlify status` to inspect.

## Agent tooling (Claude)

- **Playwright MCP** — drives the browser, screenshots, console errors.
- **threejs-devtools MCP** — live scene inspection/tuning; bridge proxies
  `localhost:9222 → localhost:3000`, so open the app via port 9222 while dev server runs.
- **gltf-transform / gltfjsx** (global CLIs) — model compression & typed R3F components.
- **gh CLI** — repo, PRs, CI runs.

## Asset pipeline

Source models live in `public/assets/` (One Piece fan models: Going Merry, Thousand Sunny,
Moby Dick, straw hats, islands). Before any model ships in a scene:

```bash
gltf-transform optimize input.gltf output.glb --compress draco --texture-compress webp
npx gltfjsx output.glb --types --transform   # typed R3F component
```

Targets: Going Merry < 2MB, total 3D payload < 8MB, textures KTX2/WebP.
