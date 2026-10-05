# LELEK promo site (ST-017-PromoSite)

Presentation website for **LELEK**, a CNC-carved wooden nightjar that sings when you hold the button on its back.
Built with [Astro](https://astro.build) (static output), [three.js](https://threejs.org) for the 3D model and
[Pagefind](https://pagefind.app) for full-text search. No tracking, no external requests: fonts are self-hosted.

Pages: Home, The Bird, Electronics, Parts, Roadmap, Pre-order (disabled), About. Press **Ctrl+K** (or **/**) anywhere to search.

## Run

```bash
npm install
npm run dev        # dev server; Ctrl+K lists pages and sections only
npm run build      # astro build, heading anchors, Pagefind index -> dist/
npm run preview    # serve dist/ with full-text search
```

Needs Node 20+. Deployed at <https://nightjar.gift>; documentation (KNIFES) lives at <https://knifes.nightjar.gift>. Optional build variables: `SITE_URL` (canonical/OG URLs, default nightjar.gift) and `BASE_PATH` (deploy under a sub-path).
`dist/` is plain static files and can go to any host (Vercel, Netlify, GitHub Pages, nginx).

## Where things live

| What | Where |
|---|---|
| All copy that repeats, parts list, prices, milestones, student info, menu | `src/data/site.js` |
| Pre-order switch | `PREORDER_OPEN` in `src/data/site.js` (form is rendered disabled) |
| Pages | `src/pages/*.astro` |
| Search palette | `src/components/Search.astro` |
| 3D viewer | `src/components/ModelViewer.astro` (lazy-loaded) |
| Images | `public/img/*.webp` (breadboard, schematic, PCBs from `ST-017-MOTHERBOARD/docs`; wireframes cropped from `enclosure/Nightjar_build_guide.pdf`) |
| 3D model | `public/models/*.stl`, decimated from `enclosure/stl` by `scripts/decimate_stl.py` |
| Bird silhouette | `src/assets/nightjar-silhouette.svg`, traced from the model by `scripts/silhouette.py` |
| Sound | `public/audio/lelek_churr.mp3` (synthesised placeholder from the board repo) |

## Updating content

Prices and statuses come from `ST-017-MOTHERBOARD/docs/v7_parts.md`, `v8_parts.md` and `wood-selection/`. When those change,
edit `src/data/site.js` (`bom`, `fuse`, `wood`, `milestones`, `status`) and rebuild. Keep the "prototype in progress" wording until a bird exists.
