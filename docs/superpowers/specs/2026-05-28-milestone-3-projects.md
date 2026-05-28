# Milestone 3: Projects Index + Test Stand Detail Page Design

**Goal:** Full Anduril-style mosaic projects index and one complete project detail page (Horizontal Propulsion Test Stand) proving the page template end-to-end.

**Approved by user 2026-05-28.**

---

## Projects Inventory

### Rocket Project cluster (hub + 5 sub-projects)
| Slug | Display Title | Tagline |
|------|--------------|---------|
| `horizontal-propulsion-test-stand` | Horizontal Propulsion Test Stand | Isolating 5,635 lbf-s onto linear rails |
| `injector-orifice-sizing` | Hybrid Injector Orifice Sizing | Two-phase N₂O model, 35% → 10.3% error |
| `vertical-test-stand` | Vertical Test Stand & Tank Mount | Structural validation in Ansys Mechanical |
| `propulsion-data-analysis` | Propulsion Data Analysis | 20+ pages of hydro, cold-flow, static-fire reports |
| `injector-water-flows` | Injector Water Flows | Cold-flow characterization before hot fire |

### Standalone projects
| Slug | Display Title | Tagline |
|------|--------------|---------|
| `submersible-v3` | Submersible V3 | 16-ft neutrally buoyant EVA trainer |
| `uav-gimbal-joint` | UAV Gimbal Joint Design | Eliminating 6-DoF singularity in over-actuated UAV |
| `obstacle-avoidance-robot` | Obstacle Avoidance Embedded System | Ultrasonic sensing, C++, Arduino |
| `taylor-observatory` | Friends of Taylor Observatory | Astrometry, photometry, IAU submissions |

---

## A. Projects Index — Mosaic Layout

**Component:** `ProjectTile.astro` — accepts `{ title, tagline, href, cols?, rows? }`.

**Tile visual:** Dark matte `--surface` background + repeating-linear-gradient grid motif (same as hero, no radial mask — uniform across tile). `overflow: hidden`. On hover: hairline border shifts to `--accent`, `↗` appears bottom-right.

**Content:** Project name bottom-left in `--font-display` bold, tagline below in `--font-label` `--text-35`.

**Grid layout (12 cols):**

```
─── UCLA ROCKET PROJECT (section label + hairline) ───────────────

[ HUB tile — 7 cols, tall ]  [ H. Propulsion Test Stand — 5 cols ]

[ Injector Sizing — 4 ]  [ V. Test Stand — 4 ]  [ Water Flows — 4 ]

[ Propulsion Data Analysis ────────── 12 cols, shorter height ────]

─── STANDALONE (section label + hairline) ────────────────────────

[ Submersible V3 — 4 ]  [ UAV Gimbal Joint — 4 ]  [ Obstacle Avoid — 4 ]

[ Friends of Taylor Observatory ──────── 12 cols, short ──────────]
```

**Hub tile:** Title = "UCLA ROCKET PROJECT", tagline = "5 projects · Propulsion · Structures · Data". Links to `/projects/horizontal-propulsion-test-stand` (lead project). Large, featured treatment: title at `--text-xl`, `--fw-bold`.

**Section markers:** `--font-label` uppercase, `--text-35`, `letter-spacing: 0.10em`, with a full-width hairline rule below. Used above each group.

---

## B. Horizontal Propulsion Test Stand — Detail Page

**Route:** `/projects/horizontal-propulsion-test-stand`

### Section 1 — Hero Band
- Title: `HORIZONTAL PROPULSION TEST STAND` (display, large, uppercase)
- Tagline: `Isolating 5,635 lbf-s onto linear rails — 2 Mojave static fires`
- Background: dark CSS grid motif (same hero pattern)
- Ghosted oversized project name behind title at `--text-15` opacity (Vast pattern)
- Staggered reveal: title then tagline

### Section 2 — Spec Block
Two-column layout (left: spec table, right: TODO block for rotating model).

**Spec table rows** (`SpecTable.astro` — label left, mono value right, hairline dividers):
| Label | Value |
|-------|-------|
| IMPULSE ISOLATED | 5,635 lbf-s |
| FACTOR OF SAFETY | > 2.0 |
| STATIC FIRES | 2 (Mojave, CA) |
| CONFIGURATION | Cantilever, linear rails |
| LOAD METHOD | Hand-calc, bolt/bracket |
| DESIGN TOOL | SolidWorks |

### Section 3 — The Work
Five labeled subsections with short text content + TODO blocks for media:
- **PROBLEM** — text: hybrid motor generates ~5,000+ lbf-s impulse; needed a ground structure to safely isolate thrust load for hot-fire testing without a large permanent stand.
- **APPROACH** — text: SolidWorks cantilever design mounting motor to linear rails; bolts and brackets hand-calculated to FoS > 2.0.
- **ANALYSIS** — TODO blocks: FEA stress contour (Ansys), load-path diagram, hand-calc summary.
- **RESULT** — text: stand validated through 2 static fires at Mojave Air & Space Port.
- **REFLECTION** — text: placeholder for lessons learned.

### Section 4 — Metric Callouts
Three `MetricCallout.astro` components side-by-side, count-up on scroll via IntersectionObserver + inline JS:
- `5,635` / `lbf-s` / `Impulse isolated`
- `2.0` / `Factor of Safety` / `Minimum calculated`
- `2` / `Static fires` / `Mojave, CA`

---

## New Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `ProjectTile.astro` | `title, tagline, href, featured?` | Mosaic tile |
| `SpecTable.astro` | `rows: {label, value}[]` | Label/value spec rows |
| `MetricCallout.astro` | `value, unit, description, prefix?` | Count-up stat |

---

## Files

| File | Action |
|------|--------|
| `src/data/projects.ts` | Create — typed project registry |
| `src/components/ProjectTile.astro` | Create |
| `src/components/SpecTable.astro` | Create |
| `src/components/MetricCallout.astro` | Create |
| `src/pages/projects.astro` | Replace stub with full mosaic |
| `src/pages/projects/horizontal-propulsion-test-stand.astro` | Create |
