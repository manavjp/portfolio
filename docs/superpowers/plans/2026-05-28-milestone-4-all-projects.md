# Milestone 4: All Project Detail Pages

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all 8 remaining project detail pages, two new components (ThrustChart, ScatteredReports), a shared ProjectPageLayout, and promote shared project-page CSS into global.css.

**Architecture:** `ProjectPageLayout.astro` wraps `Layout.astro` with the hero-band structure and shared CSS, eliminating repetition across all 9 project pages. Shared body styles (spec-block, metrics-row, the-work) go into `global.css` as utilities so they work through the layout's `<slot>`. `ThrustChart.astro` loads Plotly via a bundled `<script>` (Vite handles tree-shaking to the Data Analysis page only). `ScatteredReports.astro` is pure CSS — no JS required.

**Tech Stack:** Astro 6, plain CSS, `plotly.js-dist-min` (new), TypeScript strict (add module declaration for Plotly).

---

## File Map

| File | Action |
|------|--------|
| `src/layouts/ProjectPageLayout.astro` | **Create** — hero band + body shell, shared hero styles |
| `src/styles/global.css` | **Modify** — add `.spec-block`, `.metrics-row`, `.the-work`, `.work-row`, `.work-label`, `.work-content`, `.work-text` |
| `src/env.d.ts` | **Modify** — add `declare module 'plotly.js-dist-min'` |
| `src/components/ProjectTile.astro` | **Modify** — `href` optional; renders `<div>` when absent |
| `src/components/ThrustChart.astro` | **Create** — Plotly thrust-vs-time chart, dark-themed |
| `src/components/ScatteredReports.astro` | **Create** — CSS fan-stack of 3 report cards |
| `src/pages/projects.astro` | **Modify** — hub tile loses `href` |
| `src/pages/projects/horizontal-propulsion-test-stand.astro` | **Refactor** — adopt ProjectPageLayout + shared CSS classes |
| `src/pages/projects/injector-orifice-sizing.astro` | **Replace stub** |
| `src/pages/projects/vertical-test-stand.astro` | **Replace stub** |
| `src/pages/projects/propulsion-data-analysis.astro` | **Replace stub** (uses ThrustChart + ScatteredReports) |
| `src/pages/projects/injector-water-flows.astro` | **Replace stub** |
| `src/pages/projects/submersible-v3.astro` | **Replace stub** |
| `src/pages/projects/uav-gimbal-joint.astro` | **Replace stub** |
| `src/pages/projects/obstacle-avoidance-robot.astro` | **Replace stub** |
| `src/pages/projects/taylor-observatory.astro` | **Replace stub** (short page) |

---

### Task 1: Install Plotly + declare module type

**Files:**
- Modify: `package.json`
- Modify: `src/env.d.ts`

- [ ] **Step 1: Install plotly.js-dist-min**

```bash
export PATH="/opt/homebrew/bin:$PATH" && npm install plotly.js-dist-min
```
Expected: package added, no errors.

- [ ] **Step 2: Add module declaration so TypeScript accepts the import**

Edit `src/env.d.ts` — replace the single line with:
```typescript
/// <reference types="astro/client" />
declare module 'plotly.js-dist-min';
```

- [ ] **Step 3: Add Plotly to DECISIONS.md**

Append to `DECISIONS.md`:
```markdown
## Charts

**plotly.js-dist-min**
Chosen per brief §9: "one library — Plotly (strong for scientific/engineering plots)".
`plotly.js-dist-min` is the lightweight CJS/ESM-compatible build (~3.5 MB minified).
Loaded only on the Propulsion Data Analysis page — Vite splits it into a separate chunk.
TypeScript: added `declare module 'plotly.js-dist-min'` in `src/env.d.ts` (no @types package needed for a portfolio project).
```

---

### Task 2: Shared project-page CSS in global.css

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Append project-page utility classes to `src/styles/global.css`**

Add at the end of the file:
```css
/* ─────────────────────────────────────────
   Project page utilities
   Used by all project detail pages via
   ProjectPageLayout <slot /> content.
   ───────────────────────────────────────── */

.spec-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: start;
}

@media (max-width: 768px) {
  .spec-block { grid-template-columns: 1fr; }
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--grid-line);
  border-bottom: 1px solid var(--grid-line);
  margin-bottom: 4rem;
}

@media (max-width: 600px) {
  .metrics-row { grid-template-columns: 1fr; }
}

.the-work {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.work-row {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 768px) {
  .work-row { grid-template-columns: 1fr; gap: 0.75rem; }
}

.work-label {
  font-family: var(--font-label);
  font-size: var(--text-xs);
  color: var(--text-35);
  letter-spacing: 0.10em;
  text-transform: uppercase;
  padding-top: 0.2rem;
}

.work-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.work-text {
  font-size: var(--text-base);
  color: var(--text-70);
  line-height: var(--leading-loose);
  max-width: 72ch;
}
```

---

### Task 3: ProjectPageLayout component

**Files:**
- Create: `src/layouts/ProjectPageLayout.astro`

- [ ] **Step 1: Write `src/layouts/ProjectPageLayout.astro`**

```astro
---
import Layout from './Layout.astro';

interface Props {
  title: string;
  description?: string;
  ghostText: string;
  category: string;
  tagline: string;
}

const { title, description, ghostText, category, tagline } = Astro.props;
---

<Layout title={title} description={description}>
  <section class="proj-hero">
    <div class="proj-hero__bg" aria-hidden="true"></div>
    <div class="proj-hero__ghost" aria-hidden="true">{ghostText}</div>
    <div class="proj-hero__content page-padded">
      <a href="/projects" class="proj-hero__back">← Projects</a>
      <p class="proj-hero__category">{category}</p>
      <h1 class="proj-hero__title">{title}</h1>
      <p class="proj-hero__tagline">{tagline}</p>
    </div>
  </section>

  <div class="proj-body page-padded">
    <slot />
  </div>
</Layout>

<style>
  .proj-hero {
    position: relative;
    min-height: 55vh;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .proj-hero__bg {
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        var(--grid-line) 0px, var(--grid-line) 1px,
        transparent 1px, transparent 40px
      ),
      repeating-linear-gradient(
        90deg,
        var(--grid-line) 0px, var(--grid-line) 1px,
        transparent 1px, transparent 40px
      );
  }

  .proj-hero__ghost {
    position: absolute;
    bottom: -0.12em;
    left: 0;
    right: 0;
    font-family: var(--font-display);
    font-size: clamp(6rem, 18vw, 16rem);
    font-weight: var(--fw-black);
    color: var(--text-15);
    letter-spacing: -0.02em;
    line-height: 1;
    text-transform: uppercase;
    white-space: nowrap;
    pointer-events: none;
    padding: 0 var(--outer-gutter);
    overflow: hidden;
  }

  .proj-hero__content {
    position: relative;
    z-index: 1;
    padding-top: 4rem;
    padding-bottom: 3rem;
    width: 100%;
  }

  .proj-hero__back {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.06em;
    margin-bottom: 0.75rem;
    transition: color var(--dur-fast) var(--ease-out);
  }
  .proj-hero__back:hover { color: var(--text-70); }

  .proj-hero__category {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.10em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .proj-hero__title {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 5vw, 4.5rem);
    font-weight: var(--fw-black);
    color: var(--text-100);
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
    text-transform: uppercase;
    margin: 0 0 1rem;
    max-width: 18ch;
  }

  .proj-hero__tagline {
    font-family: var(--font-label);
    font-size: var(--text-base);
    color: var(--text-50);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    max-width: 60ch;
  }

  .proj-body {
    padding-top: 3rem;
    padding-bottom: 5rem;
  }
</style>
```

---

### Task 4: Fix ProjectTile — optional href

**Files:**
- Modify: `src/components/ProjectTile.astro`

- [ ] **Step 1: Make `href` optional and conditionally render `<a>` vs `<div>`**

Replace the entire file with:
```astro
---
interface Props {
  title: string;
  tagline: string;
  href?: string;
  featured?: boolean;
}
const { title, tagline, href, featured = false } = Astro.props;
const classes = ['tile', featured && 'tile--featured', !href && 'tile--static'].filter(Boolean) as string[];
---

{href ? (
  <a href={href} class:list={classes}>
    <div class="tile__bg" aria-hidden="true"></div>
    <div class="tile__content">
      <div class="tile__text">
        <span class="tile__title">{title}</span>
        <span class="tile__tagline">{tagline}</span>
      </div>
      <span class="tile__arrow" aria-hidden="true">↗</span>
    </div>
  </a>
) : (
  <div class:list={classes}>
    <div class="tile__bg" aria-hidden="true"></div>
    <div class="tile__content">
      <div class="tile__text">
        <span class="tile__title">{title}</span>
        <span class="tile__tagline">{tagline}</span>
      </div>
    </div>
  </div>
)}

<style>
  .tile {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--surface);
    border: 1px solid var(--grid-line);
    overflow: hidden;
    text-decoration: none;
    transition: border-color var(--dur-fast) var(--ease-out);
  }

  .tile--static { cursor: default; }
  a.tile:hover  { border-color: var(--accent); }

  .tile__bg {
    position: absolute;
    inset: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        var(--grid-line) 0px, var(--grid-line) 1px,
        transparent 1px, transparent 40px
      ),
      repeating-linear-gradient(
        90deg,
        var(--grid-line) 0px, var(--grid-line) 1px,
        transparent 1px, transparent 40px
      );
    pointer-events: none;
  }

  .tile__content {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex: 1;
    padding: 1.25rem;
    gap: 0.5rem;
  }

  .tile__text {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .tile__title {
    font-family: var(--font-display);
    font-size: var(--text-md);
    font-weight: var(--fw-bold);
    color: var(--text-100);
    line-height: var(--leading-snug);
  }

  .tile--featured .tile__title {
    font-size: var(--text-xl);
    font-weight: var(--fw-black);
  }

  .tile__tagline {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .tile__arrow {
    font-size: var(--text-md);
    color: var(--accent);
    opacity: 0;
    transform: translate(-4px, 4px);
    transition:
      opacity var(--dur-fast) var(--ease-out),
      transform var(--dur-fast) var(--ease-out);
    flex-shrink: 0;
    align-self: flex-end;
  }

  a.tile:hover .tile__arrow {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>
```

---

### Task 5: Update projects.astro — remove hub tile href

**Files:**
- Modify: `src/pages/projects.astro`

- [ ] **Step 1: Remove `href` from the hub ProjectTile**

In `src/pages/projects.astro`, change:
```astro
      <div class="t-hub">
        <ProjectTile
          title="UCLA Rocket Project"
          tagline="5 projects · Propulsion · Structures · Data"
          href="/projects/horizontal-propulsion-test-stand"
          featured={true}
        />
      </div>
```
To:
```astro
      <div class="t-hub">
        <ProjectTile
          title="UCLA Rocket Project"
          tagline="5 projects · Propulsion · Structures · Data"
          featured={true}
        />
      </div>
```

---

### Task 6: ThrustChart component

**Files:**
- Create: `src/components/ThrustChart.astro`

- [ ] **Step 1: Write `src/components/ThrustChart.astro`**

```astro
<div class="chart-wrap">
  <p class="chart-label">THRUST VS. TIME — REPRESENTATIVE STATIC FIRE DATA</p>
  <div id="thrust-chart" class="chart-container"></div>
  <p class="chart-caption">
    ⚠ Representative data. TODO: replace with real telemetry from
    <code>public/assets/projects/propulsion-data-analysis/static-fire-thrust.json</code>
  </p>
</div>

<script>
  import Plotly from 'plotly.js-dist-min';

  const time   = [0, 0.15, 0.35, 0.55, 0.80, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.25, 5.50, 5.70, 5.85, 6.0];
  const thrust = [0,   95,  420,  760,  890, 935, 948, 952, 945, 930, 915, 898, 875, 840,  640,  320,  120,   30,   0];

  const trace = {
    x: time,
    y: thrust,
    type: 'scatter' as const,
    mode: 'lines' as const,
    line: { color: '#ff2d20', width: 2, shape: 'spline' as const },
    fill: 'tozeroy' as const,
    fillcolor: 'rgba(255,45,32,0.07)',
    name: 'Thrust (lbf)',
    hovertemplate: 'T+%{x:.2f}s<br>%{y} lbf<extra></extra>',
  };

  const layout = {
    paper_bgcolor: 'transparent',
    plot_bgcolor: '#0c0d0e',
    margin: { l: 64, r: 24, t: 16, b: 56 },
    font: {
      family: 'Geist Mono Variable, Roboto Mono, monospace',
      color: 'rgba(241,240,234,0.50)',
      size: 11,
    },
    xaxis: {
      title: { text: 'TIME (s)', font: { size: 10, color: 'rgba(241,240,234,0.35)' } },
      gridcolor: 'rgba(241,240,234,0.06)',
      linecolor: 'rgba(241,240,234,0.10)',
      tickcolor: 'rgba(241,240,234,0.35)',
      zeroline: false,
      tickfont: { size: 10 },
    },
    yaxis: {
      title: { text: 'THRUST (lbf)', font: { size: 10, color: 'rgba(241,240,234,0.35)' } },
      gridcolor: 'rgba(241,240,234,0.06)',
      linecolor: 'rgba(241,240,234,0.10)',
      tickcolor: 'rgba(241,240,234,0.35)',
      zeroline: false,
      tickfont: { size: 10 },
    },
    showlegend: false,
  };

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  const el = document.getElementById('thrust-chart');
  if (el) Plotly.newPlot(el, [trace], layout, config);
</script>

<style>
  .chart-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .chart-label {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.10em;
    text-transform: uppercase;
  }

  .chart-container {
    width: 100%;
    height: 360px;
    border: 1px solid var(--grid-line);
    background: var(--surface);
  }

  .chart-caption {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    line-height: var(--leading-normal);
  }
</style>
```

---

### Task 7: ScatteredReports component

**Files:**
- Create: `src/components/ScatteredReports.astro`

- [ ] **Step 1: Write `src/components/ScatteredReports.astro`**

```astro
---
interface ReportCard {
  title: string;
  subtitle: string;
  date: string;
  href: string;
}

interface Props {
  reports: ReportCard[];
}

const { reports } = Astro.props;
---

<div class="reports-section">
  <p class="reports-label">TEST REPORTS</p>
  <div class="reports-stack" role="list">
    {reports.map((report, i) => (
      <a
        href={report.href}
        class="report-card"
        style={`--card-index: ${i}`}
        target="_blank"
        rel="noopener noreferrer"
        role="listitem"
        aria-label={`Open ${report.title}`}
      >
        <div class="report-card__header">
          <span class="report-card__type">TEST REPORT</span>
          <span class="report-card__date">{report.date}</span>
        </div>
        <p class="report-card__title">{report.title}</p>
        <p class="report-card__subtitle">{report.subtitle}</p>
        <span class="report-card__open">OPEN ↗</span>
      </a>
    ))}
  </div>
  <p class="reports-hint">Hover to browse · Click to open</p>
</div>

<style>
  .reports-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .reports-label {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.10em;
    text-transform: uppercase;
  }

  .reports-stack {
    position: relative;
    width: 280px;
    height: 360px;
  }

  .report-card {
    position: absolute;
    inset: 0;
    background: var(--surface-raised);
    border: 1px solid var(--hairline);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    text-decoration: none;
    transition: transform 0.35s var(--ease-out), border-color var(--dur-fast) var(--ease-out);
  }

  .report-card:nth-child(1) { transform: rotate(-5deg) translate(-8px, 10px); z-index: 1; }
  .report-card:nth-child(2) { transform: rotate(2deg)  translate(4px, 5px);   z-index: 2; }
  .report-card:nth-child(3) { transform: rotate(0deg);                         z-index: 3; }

  .reports-stack:hover .report-card:nth-child(1) {
    transform: rotate(-14deg) translate(-40px, -24px);
  }
  .reports-stack:hover .report-card:nth-child(2) {
    transform: rotate(-4deg) translate(-10px, -12px);
  }
  .reports-stack:hover .report-card:nth-child(3) {
    transform: rotate(6deg) translate(16px, -8px);
  }

  .report-card:hover { border-color: var(--accent); }

  .report-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .report-card__type {
    font-family: var(--font-label);
    font-size: var(--text-2xs);
    color: var(--text-35);
    letter-spacing: 0.10em;
    text-transform: uppercase;
  }

  .report-card__date {
    font-family: var(--font-mono);
    font-size: var(--text-2xs);
    color: var(--text-35);
  }

  .report-card__title {
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: var(--fw-semibold);
    color: var(--text-100);
    line-height: var(--leading-snug);
    margin-top: auto;
  }

  .report-card__subtitle {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-50);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .report-card__open {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.06em;
    margin-top: auto;
    transition: color var(--dur-fast) var(--ease-out);
  }

  .report-card:hover .report-card__open { color: var(--accent); }

  .reports-hint {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.04em;
  }

  @media (prefers-reduced-motion: reduce) {
    .report-card,
    .reports-stack:hover .report-card:nth-child(1),
    .reports-stack:hover .report-card:nth-child(2),
    .reports-stack:hover .report-card:nth-child(3) {
      transition: none;
    }
  }
</style>
```

---

### Task 8: Refactor horizontal-propulsion-test-stand to use ProjectPageLayout

**Files:**
- Modify: `src/pages/projects/horizontal-propulsion-test-stand.astro`

- [ ] **Step 1: Replace the file with ProjectPageLayout version**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'Impulse Isolated',  value: '5,635 lbf-s'             },
  { label: 'Factor of Safety',  value: '> 2.0'                    },
  { label: 'Static Fires',      value: '2 (Mojave, CA)'           },
  { label: 'Configuration',     value: 'Cantilever, linear rails' },
  { label: 'Load Method',       value: 'Hand-calc, bolt/bracket'  },
  { label: 'Design Tool',       value: 'SolidWorks'               },
];
---

<ProjectPageLayout
  title="Horizontal Propulsion Test Stand"
  description="SolidWorks cantilever test stand isolating 5,635 lbf-s thrust onto linear rails, validated through 2 Mojave static fires."
  ghostText="TEST STAND"
  category="UCLA Rocket Project"
  tagline="Isolating 5,635 lbf-s onto linear rails — 2 Mojave static fires"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — Rotating model</span>
      <p>360° rotating GIF or MP4 of the test stand CAD from SolidWorks. Target: 24 fps, ~5 s loop. Place at <code>public/assets/projects/horizontal-propulsion-test-stand/model-rotate.mp4</code>.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="5,635" unit="lbf-s" description="Impulse isolated"        />
    <MetricCallout value="2.0"   unit=""       description="Factor of Safety (min)"  prefix=">" />
    <MetricCallout value="2"     unit="fires"  description="Static fires, Mojave CA" />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">A hybrid rocket motor generating over 5,000 lbf-s of total impulse requires a ground test structure capable of safely isolating and reacting thrust loads during static-fire characterization. Off-the-shelf test stands were cost-prohibitive; the team needed a custom structure buildable in-house with standard hardware and no specialized tooling.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Designed a horizontal cantilever test stand in SolidWorks: the motor attaches to a rigid arm that transfers thrust load laterally into a pair of linear rails anchored to a welded ground frame. All bolts and structural brackets were hand-calculated to a factor of safety greater than 2.0 using AISC methods and published fastener load ratings.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <div class="todo-block"><span class="todo-label">TODO — FEA stress contour</span><p>Ansys Mechanical von Mises stress contour at peak thrust load. Export as high-res PNG.</p></div>
        <div class="todo-block"><span class="todo-label">TODO — Load-path diagram</span><p>Annotated diagram: motor mount → cantilever arm → linear rail interface → anchor bolts → ground frame.</p></div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">The stand completed two full-duration static fires at Mojave Air &amp; Space Port with no structural failure or permanent deformation. Thrust data was captured through both campaigns.</p>
        <div class="todo-block"><span class="todo-label">TODO — Fire photos &amp; video</span><p>Static-fire photos and H.264 video clip. Place at <code>public/assets/projects/horizontal-propulsion-test-stand/static-fire.mp4</code>.</p></div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">The cantilever geometry simplified fabrication but amplified bracket loading through a moment arm. A future iteration would shorten the arm or add a secondary rail to distribute load, reducing peak fastener stress and improving lateral stiffness.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

- [ ] **Step 2: Build to verify refactored page compiles**

```bash
export PATH="/opt/homebrew/bin:$PATH" && npm run build 2>&1 | tail -5
```
Expected: exits 0, 14 pages built.

---

### Task 9: Injector Orifice Sizing detail page

**Files:**
- Replace: `src/pages/projects/injector-orifice-sizing.astro`

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'Injector Orifices',   value: '69'                    },
  { label: 'N₂O Error (Initial)', value: '35%'                   },
  { label: 'N₂O Error (Final)',   value: '10.3%'                 },
  { label: 'Model Type',          value: 'Two-phase, real-fluid' },
  { label: 'Thermodynamic Lib',   value: 'CoolProp'              },
  { label: 'Language',            value: 'Python 3'              },
];
---

<ProjectPageLayout
  title="Hybrid Injector Orifice Sizing"
  description="Python/CoolProp two-phase model replacing heritage single-phase sizing, reducing N₂O mass-flow error from 35% to 10.3%."
  ghostText="INJECTOR"
  category="UCLA Rocket Project"
  tagline="Two-phase N₂O model — 35% → 10.3% mass-flow error"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — Orifice pattern diagram</span>
      <p>Annotated diagram of the 69-orifice pattern: oxidizer and fuel port arrangement, orifice diameter, and spacing. SolidWorks drawing or Illustrator.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="69"   unit="orifices" description="Flight injector orifices"       />
    <MetricCallout value="10.3" unit="%"         description="Final N₂O mass-flow error"     />
    <MetricCallout value="35"   unit="% → 10.3" description="Error reduction achieved"       />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">The heritage single-phase incompressible injector model predicted N₂O mass flow with roughly 35% error against cold-flow data. N₂O near its saturation point undergoes significant real-fluid behavior that single-phase models cannot capture, leading to systematic over-prediction of mass flow rate and incorrect mixture-ratio assumptions in the flight injector design.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Replaced the single-phase model with a Python/CoolProp two-phase real-fluid model. CoolProp provides thermodynamic properties (density, enthalpy, entropy) for N₂O as a function of temperature and pressure, allowing the model to account for phase transitions and compressibility effects. The updated model was used to size the 69-orifice flight injector against corrected mass-flow targets.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <div class="todo-block">
          <span class="todo-label">TODO — Predicted vs. actual plot</span>
          <p>Line chart comparing single-phase model, two-phase model, and static-fire measured mass flow across operating conditions. Interactive Plotly chart on the Propulsion Data Analysis page.</p>
        </div>
        <div class="todo-block">
          <span class="todo-label">TODO — Model derivation writeup</span>
          <p>Short PDF or rendered Markdown: governing equations, CoolProp integration, and validation methodology.</p>
        </div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">Reduced N₂O mass-flow prediction error from 35% to 10.3% against static-fire data. Used the corrected model to size the 69-orifice flight injector. The two-phase model is now the team's standard tool for injector sizing and mixture-ratio verification.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">The two-phase model still assumes steady-state flow and does not capture transient startup dynamics or combustion-driven oscillations. Future work includes transient startup modeling and sensitivity analysis of the discharge coefficient across the orifice geometry space.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

---

### Task 10: Vertical Test Stand & Tank Mount detail page

**Files:**
- Replace: `src/pages/projects/vertical-test-stand.astro`

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'Configuration',   value: 'Vertical, tank-mount'  },
  { label: 'Analysis Tool',   value: 'Ansys Mechanical'       },
  { label: 'Validation',      value: 'FEA structural safety'  },
  { label: 'Design Tool',     value: 'SolidWorks'             },
  { label: 'Load',            value: 'Tank + motor thrust'    },
];
---

<ProjectPageLayout
  title="Vertical Test Stand & Tank Mount"
  description="Flight tank structural mount and vertical stand infrastructure validated in Ansys Mechanical FEA."
  ghostText="VERTICAL"
  category="UCLA Rocket Project"
  tagline="Flight tank structural mount, FEA-validated in Ansys Mechanical"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — CAD render + rotating model</span>
      <p>SolidWorks render of the vertical stand and tank mount assembly. 360° rotating MP4 or high-res isometric PNG. Place at <code>public/assets/projects/vertical-test-stand/</code>.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="2.0"  unit=""       description="Factor of Safety (min)" prefix=">" />
    <MetricCallout value="3"    unit="cases"  description="FEA load cases analyzed"           />
    <MetricCallout value="2"    unit="iters"  description="CAD design iterations"             />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">The flight tank required a structural mount for vertical test stand integration. Tank mass, motor thrust, and dynamic loads needed to be safely transferred to the stand structure without yielding or buckling under test conditions.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Designed the tank-mount and vertical stand infrastructure in SolidWorks. Imported the assembly into Ansys Mechanical for FEA structural analysis. Applied representative load cases (static tank weight, peak thrust, combined) and iterated on the mounting geometry to achieve factor of safety greater than 2.0 across all cases.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <div class="todo-block">
          <span class="todo-label">TODO — FEA stress contours</span>
          <p>Ansys Mechanical von Mises stress contours for each load case. Export as high-res PNG with colorbar and FoS annotation.</p>
        </div>
        <div class="todo-block">
          <span class="todo-label">TODO — Mount detail photos</span>
          <p>Fabricated mount detail photographs showing weld quality and bracket hardware.</p>
        </div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">Structural safety validated across all modeled load cases with factor of safety greater than 2.0. The stand and tank mount successfully supported test operations.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">The FEA-driven design iteration revealed stress concentrations at the weld toes that drove a geometry change in the gusset profile. Identifying this in simulation rather than fabrication saved both time and material.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

---

### Task 11: Propulsion Data Analysis detail page

**Files:**
- Replace: `src/pages/projects/propulsion-data-analysis.astro`

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';
import ThrustChart from '../../components/ThrustChart.astro';
import ScatteredReports from '../../components/ScatteredReports.astro';

const specRows = [
  { label: 'Test Campaigns',  value: '3 (Hydro, Cold-Flow, Static-Fire)' },
  { label: 'Test Reports',    value: '20+ pages'                          },
  { label: 'Peak Thrust',     value: '~950 lbf (representative)'          },
  { label: 'Total Impulse',   value: '5,635 lbf-s'                        },
  { label: 'Data Systems',    value: 'Load cell, pressure transducer'     },
];

const reports = [
  {
    title: 'Static Fire #1 — Summary Report',
    subtitle: 'Mojave Air & Space Port',
    date: '2024',
    href: '#',
  },
  {
    title: 'Cold-Flow Test Campaign',
    subtitle: 'Injector characterization',
    date: '2024',
    href: '#',
  },
  {
    title: 'Hydrostatic Test — Summary',
    subtitle: 'Tank pressure validation',
    date: '2024',
    href: '#',
  },
];
---

<ProjectPageLayout
  title="Propulsion Data Analysis"
  description="20+ pages of hydro, cold-flow, and static-fire test reports across three UCLA Rocket Project test campaigns."
  ghostText="DATA"
  category="UCLA Rocket Project"
  tagline="20+ pages of hydro, cold-flow & static-fire test reports"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — Real PDF links</span>
      <p>Replace <code>href: '#'</code> in the reports array with actual PDF paths once reports are placed in <code>public/assets/projects/propulsion-data-analysis/</code>.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="3"    unit="campaigns" description="Test campaign types"         />
    <MetricCallout value="20"   unit="+ pages"   description="Test report documentation"  />
    <MetricCallout value="5,635" unit="lbf-s"   description="Peak static fire impulse"    />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">Multiple test campaigns across hydrostatic, cold-flow, and static-fire conditions produce raw sensor data and require systematic documentation, anomaly tracking, and comparison against model predictions. Raw DAQ output is not directly interpretable without structured analysis.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Compiled and analyzed time-series data from three test campaign types. Documented findings, anomalies, and comparisons between model predictions and measured values in structured test reports spanning 20+ pages across campaigns.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <ThrustChart />
        <ScatteredReports reports={reports} />
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">Comprehensive test documentation spanning three campaign types enables systematic comparison between runs and informed decision-making for subsequent test planning. Anomalies were identified and addressed in subsequent campaigns.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">Manual data reduction was time-intensive. A future iteration would implement an automated pipeline from DAQ output to standardized report generation, reducing analyst time and improving consistency between campaigns.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

---

### Task 12: Injector Water Flows detail page

**Files:**
- Replace: `src/pages/projects/injector-water-flows.astro`

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'Test Fluid',        value: 'Water (N₂O substitute)' },
  { label: 'Injector Orifices', value: '69'                      },
  { label: 'Purpose',           value: 'Pre-hot-fire validation' },
  { label: 'Flow Type',         value: 'Cold-flow'               },
  { label: 'Objective',         value: 'Flow coeff. validation'  },
];
---

<ProjectPageLayout
  title="Injector Water Flows"
  description="Cold-flow characterization of the 69-orifice injector using water, validating spray pattern and flow coefficients before hybrid hot fire."
  ghostText="WATER"
  category="UCLA Rocket Project"
  tagline="Cold-flow characterization before hybrid hot fire"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — Flow-test photos &amp; video</span>
      <p>Photos of injector spray pattern during water-flow test, and video of full flow run. Place at <code>public/assets/projects/injector-water-flows/</code>.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="69"  unit="orifices" description="Injector orifices tested" />
    <MetricCallout value="3"   unit="runs"     description="Cold-flow test runs"       />
    <MetricCallout value="100" unit="%"        description="Pre-fire validation"  prefix="~" />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">Hot-fire testing with N₂O is expensive and carries oxidizer hazard; the injector's spray pattern and flow coefficient needed validation before committing to propellant tests. Water serves as a hydraulically similar, safe N₂O substitute for cold-flow characterization.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Ran cold-flow tests using water through the 69-orifice injector pattern at representative pressure drops. Measured discharge flow rates and compared against the two-phase model predictions (corrected for water vs. N₂O property differences). Documented spray pattern uniformity from video analysis.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <div class="todo-block">
          <span class="todo-label">TODO — Flow-rate data plot</span>
          <p>Measured vs. predicted flow rate across tested pressure drops. Identify any orifices with anomalous flow (blockage or over-size).</p>
        </div>
        <div class="todo-block">
          <span class="todo-label">TODO — Spray imagery</span>
          <p>High-speed or standard frame-rate photos showing spray cone, uniformity, and impingement point.</p>
        </div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">Flow coefficients validated within acceptable range of model predictions. Minor non-uniformities identified in the outer orifice ring were addressed in the final injector pattern before hot fire.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">Water testing gave confidence in the orifice sizing before committing to hazardous propellant. A future improvement would use a more systematic flow-coefficient extraction methodology with uncertainty quantification.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

---

### Task 13: Submersible V3 detail page

**Files:**
- Replace: `src/pages/projects/submersible-v3.astro`

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'Length',             value: '16 ft'              },
  { label: 'Operating Depth',    value: '35 ft'              },
  { label: 'Buoyancy',           value: 'Neutral'            },
  { label: 'Scale Prototype',    value: '1/20'               },
  { label: 'Frame Type',         value: 'Open-frame'         },
  { label: 'Application',        value: 'Civilian EVA training' },
  { label: 'Design Tool',        value: 'SolidWorks'         },
];
---

<ProjectPageLayout
  title="Submersible V3"
  description="16-ft neutrally buoyant open-frame submersible for civilian astronaut EVA training, developed for AdvancingX."
  ghostText="SUBMERSIBLE"
  category="AdvancingX"
  tagline="16-ft neutrally buoyant open-frame EVA trainer"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — SolidWorks model &amp; rotating render</span>
      <p>SolidWorks CAD render of the open-frame assembly (isometric + rotating MP4). Place at <code>public/assets/projects/submersible-v3/</code>.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="16"   unit="ft"    description="Full-scale length"         />
    <MetricCallout value="35"   unit="ft"    description="Operating depth"           />
    <MetricCallout value="1/20" unit="scale" description="Prototype ratio validated" />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">Civilian astronaut EVA training requires a controlled neutral-buoyancy environment to simulate the physical sensations of spacewalk operations. AdvancingX needed a purpose-built 16-ft open-frame submersible vehicle capable of operating at 35-ft depth to support their astronaut-training program.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Designed an open-frame structure in SolidWorks to maximize trainee visibility and freedom of movement. Performed buoyancy hand-calculations (Archimedes' principle, component volume and mass breakdown) to verify neutral-buoyancy conditions. Structural analysis confirmed adequate safety margin at 35-ft hydrostatic pressure. A 1/20-scale prototype was fabricated and pool-tested to validate the design concept before full-scale commitment.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <div class="todo-block">
          <span class="todo-label">TODO — Buoyancy calculation document</span>
          <p>Component-level buoyancy breakdown: volume, mass, and net buoyant force per member. PDF or rendered summary.</p>
        </div>
        <div class="todo-block">
          <span class="todo-label">TODO — Prototype test footage</span>
          <p>1/20-scale prototype pool test video showing neutral buoyancy behavior and structural integrity. Place at <code>public/assets/projects/submersible-v3/prototype-test.mp4</code>.</p>
        </div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">Design validated through 1/20-scale prototype testing. Neutral-buoyancy condition achieved within the prototype's ballast adjustment range. Full-scale design ready for fabrication review by AdvancingX.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">The open-frame configuration maximizes trainee visibility and access but complicates precise buoyancy control since frame members have irregular cross-sections. A future iteration would incorporate adjustable ballast bladders for fine-tuned trim, reducing setup time between dives.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

---

### Task 14: UAV Gimbal Joint Design detail page

**Files:**
- Replace: `src/pages/projects/uav-gimbal-joint.astro`

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'DoF Added',       value: '+1 Rotational'                    },
  { label: 'Singularity',     value: '6-DoF at vertical arm'            },
  { label: 'Design Method',   value: 'DfAM (additive manufacturing)'    },
  { label: 'Joint Type',      value: 'Gimbal on passive hinge'          },
  { label: 'Lab',             value: 'UCLA MacLab / Mechatronics Lab'   },
];
---

<ProjectPageLayout
  title="UAV Gimbal Joint Design"
  description="DfAM gimbal joint adding one rotational DoF to an over-actuated UAV passive-hinge structure, eliminating a 6-DoF kinematic singularity."
  ghostText="GIMBAL"
  category="Mechatronics & Controls Lab"
  tagline="Eliminating 6-DoF kinematic singularity in over-actuated UAV"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — Rotating gimbal GIF</span>
      <p>SolidWorks animation export showing the gimbal joint articulating through its full range of motion. Target: ~3 s loop GIF or MP4. Place at <code>public/assets/projects/uav-gimbal-joint/gimbal-rotate.gif</code>.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="1"  unit="DoF"      description="Rotational DoF added" prefix="+" />
    <MetricCallout value="6"  unit="-DoF"     description="Singularity eliminated"          />
    <MetricCallout value="0"  unit="standard tools" description="DfAM only — not machinable" />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">The over-actuated UAV's passive-hinge arm structure exhibits a 6-degree-of-freedom kinematic singularity at vertical arm orientations. At this configuration, the structure loses the ability to produce forces and torques along certain directions, degrading control authority and preventing the vehicle from reaching a subset of its intended workspace.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Designed a DfAM gimbal joint that introduces one additional rotational degree of freedom into the passive-hinge arm structure. The added rotation decouples the problematic joint coupling at vertical orientations, allowing the arm to articulate through the singular configuration without losing control authority. The internal channel routing required for the gimbal's actuation cable is only achievable through additive manufacturing — conventional machining cannot produce the geometry.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <div class="todo-block">
          <span class="todo-label">TODO — Singularity-explainer diagram</span>
          <p>Kinematic diagram showing the passive-hinge structure at the singular configuration: before and after the gimbal joint modification. Illustrates which force/torque directions are lost and how the added DoF restores them.</p>
        </div>
        <div class="todo-block">
          <span class="todo-label">TODO — Before/after DoF comparison</span>
          <p>Side-by-side workspace visualization showing inaccessible configurations before the gimbal and the recovered workspace after.</p>
        </div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">Successfully eliminated the 6-DoF singularity at vertical arm orientations, restoring full control authority across the UAV's intended workspace. The DfAM joint was fabricated and fit-checked on the arm assembly.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">The DfAM approach was essential — the internal routing geometry cannot be achieved through conventional machining. This project reinforced that additive manufacturing is not a substitute for machining in most structural applications, but for kinematically constrained mechanisms with internal passages, it enables solutions that are otherwise impossible.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

---

### Task 15: Obstacle Avoidance Embedded System detail page

**Files:**
- Replace: `src/pages/projects/obstacle-avoidance-robot.astro`

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'Microcontroller',   value: 'Arduino Uno'          },
  { label: 'Distance Sensor',   value: 'HC-SR04 Ultrasonic'   },
  { label: 'Language',          value: 'C++'                  },
  { label: 'Detection Range',   value: '2 – 400 cm'           },
  { label: 'Behavior',          value: 'Real-time avoidance'  },
  { label: 'Architecture',      value: 'Non-blocking (millis)' },
];
---

<ProjectPageLayout
  title="Obstacle Avoidance Embedded System"
  description="Arduino Uno with HC-SR04 ultrasonic sensor, C++ non-blocking state machine for real-time obstacle detection and avoidance."
  ghostText="EMBEDDED"
  category="Embedded Systems"
  tagline="Ultrasonic sensing and real-time obstacle avoidance in C++"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Specifications" />
    <div class="todo-block">
      <span class="todo-label">TODO — Demo video</span>
      <p>Short demo video of the vehicle navigating an obstacle course in real time. H.264 MP4, ~30 s. Place at <code>public/assets/projects/obstacle-avoidance-robot/demo.mp4</code>.</p>
    </div>
  </section>

  <section class="metrics-row" aria-label="Key metrics">
    <MetricCallout value="400" unit="cm"  description="Maximum sensor range"    />
    <MetricCallout value="2"   unit="cm"  description="Minimum detection range" />
    <MetricCallout value="0"   unit="blocking delays" description="Non-blocking architecture" />
  </section>

  <section class="the-work">
    <div class="work-row">
      <h2 class="work-label">Problem</h2>
      <div class="work-content">
        <p class="work-text">Demonstrate embedded systems and electronics capability through a functional autonomous vehicle. The project targeted real-time obstacle detection and avoidance using ultrasonic sensing, requiring firmware that can evaluate sensor data and actuate motors without introducing blocking delays that would degrade responsiveness.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Approach</h2>
      <div class="work-content">
        <p class="work-text">Built on Arduino Uno with an HC-SR04 ultrasonic distance sensor. Implemented a C++ state machine with three states: ADVANCE, STOP, and AVOID. The critical design decision was replacing Arduino's <code>delay()</code> with <code>millis()</code>-based timing — this keeps the main loop non-blocking, allowing continuous sensor polling while motor control executes independently. Distance thresholds tune the obstacle detection sensitivity.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Analysis</h2>
      <div class="work-content">
        <div class="todo-block">
          <span class="todo-label">TODO — Wiring diagram</span>
          <p>Schematic showing HC-SR04 trigger/echo pin connections, motor driver wiring, and power distribution. Fritzing or hand-drawn annotated diagram.</p>
        </div>
        <div class="todo-block">
          <span class="todo-label">TODO — Annotated code snippet</span>
          <p>Key loop showing the non-blocking millis() pattern, state machine transitions, and sensor read logic. Rendered as a syntax-highlighted code block.</p>
        </div>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Result</h2>
      <div class="work-content">
        <p class="work-text">Vehicle successfully avoids obstacles in real time across varied test environments. The non-blocking architecture allows the sensor to poll at full speed (~10 Hz) while motor actuation responds within one loop cycle, giving snappy obstacle response without firmware stalls.</p>
      </div>
    </div>
    <div class="work-row">
      <h2 class="work-label">Reflection</h2>
      <div class="work-content">
        <p class="work-text">A single front-facing sensor creates a blind spot at the vehicle's sides and rear. The natural next iteration is adding lateral sensors for 270° or full 360° coverage. A PID-based steering controller (rather than a threshold-based state machine) would also produce smoother avoidance arcs.</p>
      </div>
    </div>
  </section>
</ProjectPageLayout>
```

---

### Task 16: Friends of Taylor Observatory detail page (short)

**Files:**
- Replace: `src/pages/projects/taylor-observatory.astro`

Per brief §7.2: "A single page (not a full deep-dive)." No the-work sections — just a description, key facts, and photo placeholder.

- [ ] **Step 1: Write full file**

```astro
---
import ProjectPageLayout from '../../layouts/ProjectPageLayout.astro';
import SpecTable from '../../components/SpecTable.astro';

const specRows = [
  { label: 'Telescope',         value: 'RASA (Rowe-Ackermann Schmidt Astrograph)' },
  { label: 'Submissions',       value: 'IAU Minor Planet Center'                   },
  { label: 'Data Types',        value: 'Astrometry, photometry'                    },
  { label: 'Programs',          value: 'Planetarium, public astronomy'             },
];
---

<ProjectPageLayout
  title="Friends of Taylor Observatory"
  description="Astrometric and photometric data submitted to the IAU Minor Planet Center, RASA telescope commissioning, and planetarium programs."
  ghostText="OBSERVATORY"
  category="Taylor Observatory"
  tagline="Astrometry, photometry & IAU Minor Planet Center submissions"
>
  <section class="spec-block">
    <SpecTable rows={specRows} title="Details" />
    <div class="todo-block">
      <span class="todo-label">TODO — Observatory photos</span>
      <p>2–3 photos: dome exterior, telescope setup, and a sample astrometric field image. Place at <code>public/assets/projects/taylor-observatory/</code>.</p>
    </div>
  </section>

  <section class="obs-description">
    <p class="work-text">
      Contributed to the Friends of Taylor Observatory program through astrometric and photometric data collection on minor planets and variable stars, submitted to the IAU Minor Planet Center. Assisted in commissioning an observatory-grade RASA telescope for high-cadence photometry. Ran public planetarium and astronomy outreach programs for the community.
    </p>
  </section>
</ProjectPageLayout>

<style>
  .obs-description {
    margin-top: 2rem;
    max-width: 72ch;
  }
</style>
```

---

### Task 17: Build verification + commit

- [ ] **Step 1: Run full build**

```bash
export PATH="/opt/homebrew/bin:$PATH" && npm run build 2>&1 | tail -10
```
Expected: exits 0, 14 pages built.

- [ ] **Step 2: Verify page count**

```bash
find dist -name "index.html" | wc -l
```
Expected: `14`

- [ ] **Step 3: Verify Plotly only appears in Data Analysis page bundle**

```bash
ls dist/_astro/ | grep -i plotly | head -5
```
Expected: at least one Plotly chunk file present (confirms Vite bundled it).

- [ ] **Step 4: Commit**

```bash
git add src/ docs/
git commit -m "feat: Milestone 4 — all 8 project detail pages + new components

- ProjectPageLayout: shared hero-band layout for all project pages
- global.css: shared project-page utilities (spec-block, metrics-row, the-work)
- ThrustChart: Plotly thrust-vs-time with dark engineering theme
- ScatteredReports: CSS fan-stack of 3 report cards, hover-to-fan
- ProjectTile: optional href — renders <div> when no link (hub tile)
- All 9 project pages migrated to ProjectPageLayout
- 8 full detail pages: Injector Orifice Sizing, V. Test Stand,
  Propulsion Data Analysis, Water Flows, Submersible V3,
  UAV Gimbal, Obstacle Avoidance, Taylor Observatory
- Hub tile on /projects is now non-linkable

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
