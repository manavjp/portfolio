# Manav Patel — Portfolio Website Build Brief

> A build spec for Claude Code. Read top to bottom before writing any code. It defines *what* to build, *how* it should feel, and *how the project is organized*. Everything here is decided unless a value is explicitly bracketed as `[TBD]`.

---

## 0. How to use this file

1. This is the source of truth. If it conflicts with a default assumption, this file wins.
2. Don't start from a template. Build the design system in Section 4 first (tokens, type, color, motion), then assemble pages.
3. Work in milestones (Section 11); pause for review after each.
4. Keep a short `DECISIONS.md` logging any non-obvious implementation choice (specific font file, library version, etc.) with a one-line rationale.

---

## 1. Goal

A portfolio site for an aerospace engineering student that is visually striking and engineering-themed, and that does the one thing a resume and LinkedIn cannot: **show the actual engineering work** — the data, the analysis, the CAD, the iterations, the photos — not just bullet points.

---

## 2. North star: the portfolio is NOT the resume

The most important constraint in this brief. The resume answers *"what did he do?"* The portfolio answers *"how does he think, and can he prove it?"*

Every project should expose what a one-line resume bullet has to compress away:

| Resume bullet (compressed) | What the portfolio shows instead |
|---|---|
| "reduced N₂O mass-flow error from 35% to 10.3%" | The actual injector model, the plot of predicted vs. static-fire data, the assumptions, why single-phase failed |
| "isolated 5,635 lbf-s thrust onto linear rails, FoS > 2.0" | The CAD render, the FEA stress contour, the hand-calc reasoning, photos from the Mojave fires |
| "eliminated a 6-DoF singularity in an over-actuated UAV" | The DfAM gimbal joint, a kinematic diagram of the singularity, the before/after degrees of freedom |
| "16-ft neutrally buoyant submersible" | The SolidWorks model, buoyancy hand-calcs, the scale-prototype test footage |

**Hard rule:** never let a project page be a paragraph of prose. Each one runs *problem → approach → analysis (with real artifacts) → result → what I'd do differently.* If a project page has no artifact (plot / photo / render / diagram), it isn't done.

---

## 3. Audience and tone

- **Audience:** recruiters and engineers at aerospace / hard-tech companies (propulsion, test, UAV, space hardware).
- **Tone:** technical, confident, precise. Engineering-themed but *designed* — not a wall of CAD screenshots. Closer to a well-art-directed aerospace/defense-tech site than a personal blog.
- **Win condition:** a hiring engineer lands on a project, sees a real plot or FEA contour with sound reasoning around it, and thinks *"this person actually does the work."*

---

## 4. Design direction

### 4.1 Aesthetic concept

Commit to one cohesive direction — no generic AI-portfolio aesthetics (no purple-gradient-on-white, no Inter/Roboto defaults, no cookie-cutter card grid). The flavor is **industrial / technical / instrumentation**: mission control, test-stand telemetry, engineering drawings, defense-tech minimalism. Precision over decoration.

**Theme is dark — space-black / matte.** Deep, matte, near-black base; light text; sparing accent; matte finish throughout. No glossy gradients, no bright white surfaces.

**Layout backbone — persistent left sidebar.** A fixed left-hand navigation rail stays visible while content scrolls on the right. Nav items stacked top; a quiet availability status and contact link anchored near the bottom of the rail. Built on a 12-column grid with generous outer gutters.

### 4.2 Reference sites — principles to extract

Pull *principles and parameters* from these; write original code. Do not copy markup, fonts, brand colors, copy, or imagery.

**anduril.com — primary visual reference.**
- Dark, high-contrast, bold type, dramatic full-bleed imagery, restrained palette, generous outer gutters, projects shown as large clearly-legible tiles with minimal description (name + short tagline only).
- Extracted parameters: matte near-black base `#010101` (not pure black); white / warm off-white text (`#f1f0ea`) with muted warm grays (`#b0b0a9`, `#565654`); exactly one sharp accent used sparingly; a strict **12-column grid** for the whole layout including the project mosaic; a wide-weight neo-grotesque display face paired with a squared technical/mono face; tight negative tracking on headlines, positive tracking on small labels; smooth scroll + scroll-sequenced reveals + an animated number "roller"; thin top header (logo left, nav center, utilities right) that frosts on scroll.
- **Project-card pattern (adopt directly):** full-bleed media tiles in an asymmetric mosaic on the 12-col grid; each tile labeled bottom-left with a bold name + short tagline, with a small ↗ on hover. No paragraphs on the index.

**spacex.com — primary reference for project detail pages.**
- The vehicle pages are the model: a rotating model of the hardware beside a technical description and a real spec table.
- Extracted parameters: `D-DIN` for headings + a mono (`Roboto Mono`) for spec values; all headings uppercase, bold, `letter-spacing:.02em`, line-height ~95%, hero headline very large; **spec-table pattern** = rows of label (left) + mono value (right) separated by thin hairline dividers; centered `max-width:1400px` container; full-viewport panels with text positioned over full-bleed media; staggered on-load reveal (headline → subhead → CTA).
- **Top-right utility slot** holds the availability status pill (see Section 5).

**palantir.com — structure and motion (it is light-themed; take structure, not color).**
- A clean, straightforward way of listing products: each is a row with a short description + a screenshot + the product name set as oversized background type, numbered `/01`, `/02`.
- **Page transitions:** a sweep-and-flash between routes — a matte panel sweeps across, the monogram/wordmark flashes briefly, then the next page reveals. Fast (~400–600ms).

**vastspace.com — closest analog to this site (one entity presenting hardware + specs). Light-themed; take structure, not color.**
- **Clickable component hotspots:** small square markers ("chic boxes") overlaid on a hardware render; clicking one reveals what that component is. Implement as HTML markers positioned over a **static annotated render** (no 3D needed) — perfect for an exploded/cutaway view of the test stand, submersible frame, or injector.
- **Ghosted oversized title behind the model:** a giant, very-low-opacity version of the project name sits behind the rotating model (Vast does this with "Haven-1", "Haven-2", "ISS"). Use this behind each project's rotating model.
- **Corner mono spec readout:** mono technical readouts placed in the corners around the model (CREW / DIAMETER / MASS …), with a faint dotted orbit-ring framing it. Reinforces the SpaceX spec pattern; position spec rows around the model.
- **Image-slideshow slider:** a row of thin tick marks where the active position grows into a larger **square** — a distinctive gallery progress indicator. Use this as the gallery/slideshow nav, with the active square in the peach-red accent.

**jasminewilson.com — personal-portfolio structure.**
- The persistent left-hand sidebar nav (clean, always visible) and the green-dot availability status. Resume is a link only, never on-site content.
- Avoid: its white theme, its paragraph-heavy hero, and any personal/headshot photography (see content rule, Section 5).

### 4.3 Typography

Two-layer system that combines the Anduril and SpaceX looks (Anduril leads the display layer):

- **Display / headlines → Anduril-style neo-grotesque.** Big, confident, tight negative tracking (~−0.01rem). Use **Helvetica Now Display** if the file is available, otherwise the near-identical free **Geist** or **Hanken Grotesk**.
- **Technical layer (labels, section markers, spec rows) → SpaceX-style.** Uppercase **D-DIN** (free) for labels and section markers + a **mono** for numeric spec values (**Geist Mono**, **Roboto Mono**, or **JetBrains Mono**). Small labels uppercase with `letter-spacing:.02em`.
- **Mono usage:** every numeric spec, axis label, figure caption, the status pill, and small-caps section markers — this is what makes the data read as instrumentation.
- Define the type scale as tokens; root ~14–16px with rem scaling.

### 4.4 Color

CSS variables only. Matte finish throughout, high contrast, no glossy gradients.

- `--bg: #010101` — matte near-black base (not pure `#000`).
- `--surface:` slightly lifted matte dark (`#0c0d0e`–`#121414`) for cards/panels — no white surfaces.
- **Text via an opacity ladder:** one off-white exposed at steps — `--text-100/90/70/50/35/15` — rather than many separate grays. Base off-white can be warm (`#f1f0ea`).
- `--grid-line:` very-low-opacity warm gray for engineering-drawing grid lines, hairlines, and spec-table dividers.
- `--accent: #ff6f61` — a bright "anime" peach-red, used **very sparingly**. Primary use: a thin top page-load / route-change progress bar. Otherwise only minimal touches — the status-pill dot, a single hover/active state, the active nav marker, and the active square in the gallery slider. Never fill large areas with it.

### 4.5 Motion & atmosphere

- **Smooth scroll:** Lenis (subtle); respect `prefers-reduced-motion`.
- **Scroll-sequenced reveals:** one well-orchestrated reveal per section, not constant motion. CSS / Intersection Observer is fine.
- **Animated number rollers:** count-up stats tied to viewport entry — "1,500+", "5,635 lbf-s", "35% → 10.3%", "FoS > 2.0", "69 orifices".
- **Staggered hero reveal:** on load, headline rises + fades in (~.75s), subhead follows (~.5s delay), CTA last (~1s delay). One choreographed entrance, then quiet.
- **Page transitions:** the Palantir sweep-and-flash between routes (~400–600ms); use Astro View Transitions.
- **Rotating-model treatment:** hardware shown as a slow **pre-rendered rotating GIF/MP4** beside the specs — not interactive 3D.
- **Ghosted title:** oversized, very-low-opacity project name behind the rotating model (Vast).
- **Header:** frosts / shifts opacity on scroll.
- **Atmosphere:** subtle engineering-drawing grid lines, faint blueprint/graph-paper texture, fine hairline rules, a faint dotted orbit-ring framing models.
- Keep it performant; respect `prefers-reduced-motion` everywhere.

---

## 5. Information architecture

**Navigation:** persistent left sidebar rail on every page. Items: Home / Projects / About / Skills / Contact. **Resume is a link/PDF download only** — never an on-site content section. A quiet status line + contact link sit near the bottom of the rail.

**Top-right status pill:** in the slot SpaceX uses for its launch countdown, place an availability pill — a small green dot + "OPEN TO OPPORTUNITIES" in mono, subtle pulse on the dot. The one persistent piece of status on the site.

- **Home / Hero** — minimal, not a paragraph. A few strong words (name + a tight 3–6 word positioning line, e.g. "Propulsion · Test · Aerospace") and/or a strong visual element. No photo of the owner. Lean on type, negative space, and a subtle engineering motif. One primary CTA → Projects.
- **Projects** (the centerpiece) — index of deep-dive case studies as an **Anduril-style asymmetric mosaic** on the 12-col grid: full-bleed media tiles, bold name + short tagline bottom-left, ↗ on hover. Present the five Rocket Project items as a cluster (a hub tile or a labeled group). Surface this high in the nav.
- **Project detail pages** — one per project (Section 7).
- **About** — short, technical, about the work and the approach. Not a resume reprint, not a personal bio with a headshot.
- **Skills** — concise, grouped (Design / Software / Manufacturing).
- **Resume** — link/PDF download only, clearly secondary.
- **Contact** — email, LinkedIn.

> **Content rule (hard):** no photographs of the owner anywhere on the site. Imagery is renders, FEA, plots, hardware, and test photos only.

---

## 6. Signature features

Starred features are v1 priorities.

- ⭐ **Interactive data visualizations** — real plots (injector predicted-vs-actual mass flow, thrust curves, test data) via a charting library, crisp and optionally hover-interactive — not static screenshots.
- ⭐ **Spec sheet + rotating-model GIF (SpaceX pattern)** — each project pairs a rotating model GIF/MP4 of the hardware with a spec table (label left, mono value right, hairline rows). Reference: the SpaceX "STARSHIP OVERVIEW" / "RAPTOR ENGINES" pages — rotating render on one side, technical description + spec rows on the other.
- ⭐ **Clickable component hotspots (Vast)** — square markers overlaid on a static annotated render; clicking reveals what each component is. HTML markers over an image; no 3D.
- ⭐ **Animated metric callouts** — count-up stats tied to scroll.
- ⭐ **Engineering figure treatment** — FEA contours, CAD renders, and diagrams as first-class figures with captions, units, and annotations.
- ⭐ **Scattered-reports component** — test reports shown as a stack of ~3 overlapping, slightly-rotated "paper" cards (each showing a report cover), as if tossed on a desk. Hover fans/lifts them; click opens the full report (PDF in a modal or new tab). Home for the 20+ pages of hydro/cold-flow/static-fire summaries; lives on the Propulsion Data Analysis project.
- ⭐ **Image gallery / slideshow** — with the Vast-style tick-mark slider whose active position grows into a square (active square in the peach-red accent). Supports print-iteration galleries, build photos, and before/after comparisons.
- **Video embeds** — Mojave static-fire footage, prototype tests.
- **Technical writeups / process notes** — short narrative on the *why*, not just the *what*.
- **No user-rotatable 3D** — models are pre-rendered rotating GIFs/MP4s from SolidWorks/Creo. Skip Three.js / model-viewer / GLB entirely.

---

## 7. Projects

### 7.1 Project-page template (use for every project)

1. **Hero band** — project name (large) + one-line tagline, over a full-bleed render/photo or the rotating model, with an oversized ghosted project name behind it (Vast). Staggered reveal on load.
2. **Spec block** — a rotating model GIF/MP4 on one side; on the other, a short technical description (2–4 sentences) + a spec table (label-left / mono-value-right / hairline rows). Mono spec readouts may also be placed in the corners around the model, framed by a faint dotted orbit-ring. Where useful, layer clickable component hotspots over a static annotated render.
3. **The work** — *problem → approach → analysis → result → reflection*, carried by real artifacts: interactive plots, FEA contours, annotated renders, galleries, video. No artifact-free pages.
4. **Metric callouts** — a few animated count-up stats from the specs.

Example spec rows (confirm exact values before publishing):
- *Horizontal test stand* — IMPULSE ISOLATED 5,635 lbf-s · FACTOR OF SAFETY > 2.0 · STATIC FIRES 2 (Mojave)
- *Injector orifice sizing* — INJECTOR ORIFICES 69 · N₂O MASS-FLOW ERROR 35% → 10.3% · MODEL two-phase (CoolProp)
- *Submersible V3* — LENGTH 16 ft · OPERATING DEPTH 35 ft · BUOYANCY neutral · PROTOTYPE SCALE 1/20
- *Arduino car* — SENSOR ultrasonic · MCU Arduino · BEHAVIOR obstacle avoidance

### 7.2 Project list

Five of these are UCLA Rocket Project work — present them as a Rocket Project cluster (a hub with sub-cases). The rest are standalone.

**A. UCLA Rocket Project — Propulsion (cluster)**

1. **Horizontal Cantilever Test Stand** — SolidWorks cantilever stand isolating 5,635 lbf-s thrust onto linear rails; bolts/brackets hand-calced to FoS > 2.0; validated through 2 Mojave static fires. *Artifacts: CAD render / rotating model, load-path diagram, fire photos/video.*
2. **Vertical Test Stand / Flight Tank Mount** — tank-mount + vertical stand infrastructure; structural safety validated in Ansys Mechanical (FEA). *Artifacts: CAD, FEA stress contours, mount detail.*
3. **Hybrid Injector Orifice Sizing** — Python/CoolProp two-phase injector model replacing heritage single-phase incompressible sizing; cut N₂O mass-flow error 35% → 10.3% against static-fire data; sized the 69-orifice flight injector. *Artifacts: predicted-vs-actual plot (interactive), orifice-pattern diagram, model writeup. Data-richest — lead the cluster with this.*
4. **Propulsion Data Analysis** — 20+ pages of test summary reports across hydro, cold-flow, and static fires (data + anomalies). Uses the Scattered-Reports component. *Artifacts: report covers + full PDFs, key data plots.*
5. **Injector Water Flows** — cold-flow / water-flow characterization of the injector to validate spray and flow behavior before hot fire. *Artifacts: flow-test photos/video, flow-rate data, spray imagery.*

**B. Standalone projects**

6. **Submersible V3 — Human Spaceflight EVA Training** (AdvancingX) — 16-ft neutrally buoyant open-frame submersible for civilian astronaut EVA training; SolidWorks model, buoyancy hand-calcs, structural analysis to 35-ft operating depth; 1/20-scale prototype tested. *Artifacts: CAD / rotating model, buoyancy calcs, prototype test footage.*
7. **Drone Research** (UCLA Mechatronics & Controls Lab, MacLab) — DfAM gimbal joint adding a rotational DoF to the passive-hinge structure of an over-actuated UAV, eliminating a 6-DoF singularity at vertical arm orientations. *Artifacts: SolidWorks gimbal (rotating GIF), singularity-explainer diagram/animation.*
8. **Robot Arduino Car w/ Distance Sensor** — Arduino car with an ultrasonic distance sensor for obstacle detection/avoidance; shows embedded + C++/electronics range beyond CAD/propulsion. *Artifacts: build photos, demo video, wiring diagram, code snippet.*
9. **Friends of Taylor Observatory** — a single page (not a full deep-dive): astrometric & photometric data submitted to the IAU Minor Planet Center, commissioning an observatory-grade RASA telescope, and running planetarium/public-astronomy programs. *Artifacts: a few photos + a short writeup.*

---

## 8. Asset organization

```
/public/assets/
  /projects/
    /rocket-horizontal-test-stand/    (CAD renders, load diagrams, fire photos, video)
    /rocket-vertical-stand-tankmount/ (CAD, FEA contours)
    /rocket-injector-sizing/          (predicted-vs-actual plots, orifice diagrams)
    /rocket-data-analysis/            (report covers + full PDFs, data plots)
    /rocket-injector-water-flows/     (flow video, flow data, spray imagery)
    /submersible-v3/                  (CAD, buoyancy calcs, prototype footage)
    /drone-research/                  (gimbal CAD, singularity diagram)
    /arduino-distance-car/            (build photos, demo video, wiring, code)
    /taylor-observatory/              (a few photos)
  /hero/
  /resume/                            (Manav_Patel.pdf)
```

- Keep originals; generate web-optimized derivatives (compressed images, rotating-model GIFs/MP4s) into `/public/assets/`.
- Caption every figure with what it is + units.

---

## 9. Tech stack

GitHub Pages serves static files only, so the site builds to fully static output. Cloudflare handles domain/DNS. Everything planned (Lenis, animations, charts, the report modal, rotating GIFs, hotspots) runs client-side, so static hosting is no constraint.

- **Framework: Astro.** Ships zero JS by default, adds interactive islands only where needed (charts, report stack, hotspots, gallery), has first-class Markdown/MDX for project writeups, built-in View Transitions for the page sweep, and deploys to GitHub Pages cleanly. Astro components + TypeScript, React islands where interactivity is needed.
- **Styling:** plain CSS with the Section 4 token variables (or Tailwind with a custom token layer). Theme entirely via CSS variables.
- **Motion:** Lenis + CSS/Intersection Observer; Astro View Transitions for the page sweep; a small JS counter for the number rollers.
- **Charts:** one library — Plotly (strong for scientific/engineering plots), Observable Plot, or Recharts. Loaded as an island only on pages that need it.
- **Models:** rotating GIF/MP4 assets only; no 3D libraries.
- **Content:** one MDX file per project so specs + writeups are easy to edit.
- **Reports:** static PDFs in `/public`, opened by the Scattered-Reports component.

### 9.1 Deploy (GitHub Pages + Cloudflare)
- Build Astro to `dist/`; deploy via a GitHub Actions workflow (`withastro/action`). Keep it deployable from milestone 1.
- Set Astro `site` to the custom domain; `base: '/'` for a root domain (or `'/repo/'` if ever served from `user.github.io/repo`).
- Add a `CNAME` file in `/public` with the custom domain.
- Cloudflare DNS: point apex/`www` at GitHub Pages (the four GH Pages A records + a `www` CNAME to `<user>.github.io`). If proxied (orange cloud), set SSL/TLS to **Full** to avoid redirect loops.
- **Domain: `manav-patel.com`** (apex). Set Astro `site: 'https://manav-patel.com'`, put `manav-patel.com` in the `CNAME` file, and point Cloudflare DNS at GitHub Pages (handle `www` → apex redirect in Cloudflare if desired).

## 10. Quality bar & conventions

- Responsive (mobile → desktop); accessible (semantic HTML, alt text on every figure, keyboard nav, `prefers-reduced-motion`).
- Fast: optimize images, lazy-load heavy media, target Lighthouse 90+.
- No dead/placeholder pages shipped — use a visible `TODO` block, not lorem ipsum, where content is pending.
- Original code only; no copied assets or markup from reference sites.
- **Confidentiality:** publish only cleared content. Do not reference the Reynolds Systems work (or its clients) anywhere on the site. Confirm any sensitive performance numbers, contract names, or partner names are cleared before publishing.

---

## 11. Build milestones (review after each)

1. **Foundation** — repo, Astro, design tokens (color/type/spacing/motion), base layout + left rail + status pill, deployable empty shell on GitHub Pages.
2. **Home / hero** — the visual hook and positioning line.
3. **Projects index + one full project** (lead with Injector Orifice Sizing or Horizontal Test Stand) — prove the project-page template end-to-end with real artifacts and an interactive plot.
4. **Remaining project pages** + the Rocket Project cluster.
5. **About + Skills + Resume link + Contact.**
6. **Polish pass** — page transitions, number rollers, hotspots, gallery slider, atmosphere, responsive QA, accessibility, performance.

---

### Owner quick-reference (for About / footer)

Manav Patel · B.S. Aerospace Engineering, UCLA (exp. Jun 2028) · manavjpatel@ucla.edu · (707) 920-3855 · linkedin.com/in/manavjp · U.S. Citizen
Core: propulsion test, additive/DfAM, CAD (SolidWorks, Creo, NX), FEA (Ansys), Python/CoolProp, GD&T.
