# Milestone 4: All Project Detail Pages Design

**Goal:** Complete all 8 remaining project detail pages, install Plotly for the Data Analysis chart, build the ScatteredReports component, and fix the hub tile to be non-linkable.

**Approved by user 2026-05-28.**

---

## Hub tile fix
`ProjectTile.astro` gains an optional `href` — when absent, renders `<div>` instead of `<a>`. Hub tile on `/projects` passes no `href`.

---

## New components

### `ThrustChart.astro`
Plotly.js-dist-min chart, dark-themed to match site tokens. Shows representative hybrid-rocket thrust-vs-time curve (sample data, TODO to replace with real telemetry). Rendered via component `<script>` import (Vite-bundled, no React needed).

### `ScatteredReports.astro`
Stack of 3 overlapping, slightly-rotated dark "paper" cards. CSS `transform: rotate()` for stagger. On `:hover` of the container, cards fan out via CSS transitions. Each card has a report title, subtitle, and "OPEN →" link (placeholder `#` hrefs; TODO: replace with real PDF paths in `/public/assets/`). Pure CSS — no JS.

---

## Page content

All pages follow the Test Stand template: **hero band → spec block → metric callouts → the work** (Problem / Approach / Analysis / Result / Reflection). Artifacts without real assets get `TODO` blocks. Taylor Observatory is a shorter single-page treatment (no the-work sections per brief §7.2).

| Page | Key metrics | New component |
|------|------------|---------------|
| Injector Orifice Sizing | 69 orifices · 10.3% error · 35%→10.3% | — |
| Vertical Test Stand | FoS > 2.0 · Ansys validated | — |
| Propulsion Data Analysis | 3 campaigns · 20+ pages · 5,635 lbf-s peak | ThrustChart + ScatteredReports |
| Injector Water Flows | 69 orifices · Pre-hot-fire validation | — |
| Submersible V3 | 16 ft · 35 ft depth · 1/20 prototype | — |
| UAV Gimbal Joint | +1 DoF · 6-DoF singularity eliminated | — |
| Obstacle Avoidance | Arduino · C++ · ultrasonic sensor | — |
| Taylor Observatory | IAU submissions · RASA telescope | — |

---

## Files

| File | Action |
|------|--------|
| `src/components/ProjectTile.astro` | Modify — `href` optional, render `<div>` when absent |
| `src/components/ThrustChart.astro` | Create |
| `src/components/ScatteredReports.astro` | Create |
| `src/pages/projects.astro` | Modify — hub tile loses `href` |
| `src/pages/projects/injector-orifice-sizing.astro` | Replace stub |
| `src/pages/projects/vertical-test-stand.astro` | Replace stub |
| `src/pages/projects/propulsion-data-analysis.astro` | Replace stub |
| `src/pages/projects/injector-water-flows.astro` | Replace stub |
| `src/pages/projects/submersible-v3.astro` | Replace stub |
| `src/pages/projects/uav-gimbal-joint.astro` | Replace stub |
| `src/pages/projects/obstacle-avoidance-robot.astro` | Replace stub |
| `src/pages/projects/taylor-observatory.astro` | Replace stub |
