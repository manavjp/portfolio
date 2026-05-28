# Milestone 3: Projects Index + Test Stand Detail Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the projects stub with a full Anduril-style asymmetric mosaic and build the Horizontal Propulsion Test Stand detail page (hero, spec table, the-work sections, metric callouts).

**Architecture:** Three reusable components (`ProjectTile`, `SpecTable`, `MetricCallout`) live in `src/components/`. `projects.astro` assembles the mosaic with hardcoded tile layout using CSS grid column spans. The detail page lives at `src/pages/projects/horizontal-propulsion-test-stand.astro`; all other project routes get minimal stubs to prevent 404s. No new npm deps.

**Tech Stack:** Astro 6, plain CSS grid, IntersectionObserver + vanilla JS (MetricCallout count-up), no charting library this milestone.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/ProjectTile.astro` | Create | Mosaic tile: grid bg, name/tagline bottom-left, ↗ on hover |
| `src/components/SpecTable.astro` | Create | Label-left / mono-value-right spec rows with hairline dividers |
| `src/components/MetricCallout.astro` | Create | Count-up stat: large number + unit + description |
| `src/pages/projects.astro` | Replace | Full mosaic: Rocket cluster + Standalone section |
| `src/pages/projects/horizontal-propulsion-test-stand.astro` | Create | Full detail page |
| `src/pages/projects/injector-orifice-sizing.astro` | Create | Stub |
| `src/pages/projects/vertical-test-stand.astro` | Create | Stub |
| `src/pages/projects/propulsion-data-analysis.astro` | Create | Stub |
| `src/pages/projects/injector-water-flows.astro` | Create | Stub |
| `src/pages/projects/submersible-v3.astro` | Create | Stub |
| `src/pages/projects/uav-gimbal-joint.astro` | Create | Stub |
| `src/pages/projects/obstacle-avoidance-robot.astro` | Create | Stub |
| `src/pages/projects/taylor-observatory.astro` | Create | Stub |

---

### Task 1: ProjectTile component

**Files:**
- Create: `src/components/ProjectTile.astro`

- [ ] **Step 1: Write `src/components/ProjectTile.astro`**

```astro
---
interface Props {
  title: string;
  tagline: string;
  href: string;
  featured?: boolean;
}
const { title, tagline, href, featured = false } = Astro.props;
---

<a href={href} class:list={['tile', { 'tile--featured': featured }]}>
  <div class="tile__bg" aria-hidden="true"></div>
  <div class="tile__content">
    <div class="tile__text">
      <span class="tile__title">{title}</span>
      <span class="tile__tagline">{tagline}</span>
    </div>
    <span class="tile__arrow" aria-hidden="true">↗</span>
  </div>
</a>

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

  .tile:hover { border-color: var(--accent); }

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

  .tile:hover .tile__arrow {
    opacity: 1;
    transform: translate(0, 0);
  }
</style>
```

---

### Task 2: SpecTable component

**Files:**
- Create: `src/components/SpecTable.astro`

- [ ] **Step 1: Write `src/components/SpecTable.astro`**

```astro
---
interface SpecRow {
  label: string;
  value: string;
}
interface Props {
  rows: SpecRow[];
  title?: string;
}
const { rows, title } = Astro.props;
---

<div class="spec-table-wrap">
  {title && <h3 class="spec-table-title">{title}</h3>}
  <table class="spec-table" aria-label={title ?? 'Project specifications'}>
    <tbody>
      {rows.map(row => (
        <tr class="spec-row">
          <td class="spec-label">{row.label}</td>
          <td class="spec-value">{row.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<style>
  .spec-table-title {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.10em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .spec-table {
    width: 100%;
    border-collapse: collapse;
  }

  .spec-row {
    border-bottom: 1px solid var(--grid-line);
  }

  .spec-row:first-child {
    border-top: 1px solid var(--grid-line);
  }

  .spec-label {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-50);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.875rem 0;
    width: 55%;
    vertical-align: middle;
  }

  .spec-value {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-100);
    padding: 0.875rem 0;
    text-align: right;
    vertical-align: middle;
  }
</style>
```

---

### Task 3: MetricCallout component

**Files:**
- Create: `src/components/MetricCallout.astro`

- [ ] **Step 1: Write `src/components/MetricCallout.astro`**

```astro
---
interface Props {
  value: string;
  unit: string;
  description: string;
  prefix?: string;
}
const { value, unit, description, prefix = '' } = Astro.props;
---

<div class="metric">
  <div class="metric__number">
    {prefix && <span class="metric__prefix">{prefix}</span>}
    <span class="metric__value" data-target={value}>{value}</span>
    {unit && <span class="metric__unit">{unit}</span>}
  </div>
  <p class="metric__description">{description}</p>
</div>

<script>
  function animateCountUp(el: HTMLElement) {
    const raw = el.dataset.target ?? '';
    const numeric = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(numeric)) return;

    const hasComma = raw.includes(',');
    const decimals = (raw.split('.')[1] ?? '').length;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numeric * eased;
      let display = current.toFixed(decimals);
      if (hasComma) {
        display = Number(display).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
      }
      el.textContent = display;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll<HTMLElement>('.metric__value[data-target]').forEach(el => {
    observer.observe(el);
  });
</script>

<style>
  .metric {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .metric__number {
    display: flex;
    align-items: baseline;
    gap: 0.375rem;
    flex-wrap: wrap;
  }

  .metric__prefix {
    font-family: var(--font-mono);
    font-size: var(--text-xl);
    color: var(--text-50);
    line-height: 1;
  }

  .metric__value {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--fw-bold);
    color: var(--text-100);
    letter-spacing: -0.02em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }

  .metric__unit {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-50);
    letter-spacing: 0.04em;
  }

  .metric__description {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
</style>
```

---

### Task 4: Projects index — full mosaic

**Files:**
- Replace: `src/pages/projects.astro`

- [ ] **Step 1: Read the current file to confirm it's a stub**

```bash
head -5 src/pages/projects.astro
```
Expected: `import Layout from '../layouts/Layout.astro';` and a TODO block.

- [ ] **Step 2: Write the full `src/pages/projects.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import ProjectTile from '../components/ProjectTile.astro';
---

<Layout title="Projects">
  <div class="page-padded projects-page">

    <div class="section-header">
      <span class="section-label">UCLA Rocket Project</span>
      <hr class="section-rule" aria-hidden="true" />
    </div>

    <div class="mosaic mosaic--rocket">
      <div class="t-hub">
        <ProjectTile
          title="UCLA Rocket Project"
          tagline="5 projects · Propulsion · Structures · Data"
          href="/projects/horizontal-propulsion-test-stand"
          featured={true}
        />
      </div>
      <div class="t-hts">
        <ProjectTile
          title="Horizontal Propulsion Test Stand"
          tagline="Isolating 5,635 lbf-s onto linear rails"
          href="/projects/horizontal-propulsion-test-stand"
        />
      </div>
      <div class="t-inj">
        <ProjectTile
          title="Hybrid Injector Orifice Sizing"
          tagline="Two-phase N₂O model, 35% → 10.3% error"
          href="/projects/injector-orifice-sizing"
        />
      </div>
      <div class="t-vstand">
        <ProjectTile
          title="Vertical Test Stand & Tank Mount"
          tagline="Structural validation in Ansys Mechanical"
          href="/projects/vertical-test-stand"
        />
      </div>
      <div class="t-wflows">
        <ProjectTile
          title="Injector Water Flows"
          tagline="Cold-flow characterization before hot fire"
          href="/projects/injector-water-flows"
        />
      </div>
      <div class="t-data">
        <ProjectTile
          title="Propulsion Data Analysis"
          tagline="20+ pages of hydro, cold-flow & static-fire reports"
          href="/projects/propulsion-data-analysis"
        />
      </div>
    </div>

    <div class="section-header">
      <span class="section-label">Standalone</span>
      <hr class="section-rule" aria-hidden="true" />
    </div>

    <div class="mosaic mosaic--standalone">
      <div class="t-sub">
        <ProjectTile
          title="Submersible V3"
          tagline="16-ft neutrally buoyant EVA trainer"
          href="/projects/submersible-v3"
        />
      </div>
      <div class="t-uav">
        <ProjectTile
          title="UAV Gimbal Joint Design"
          tagline="Eliminating 6-DoF singularity in over-actuated UAV"
          href="/projects/uav-gimbal-joint"
        />
      </div>
      <div class="t-obst">
        <ProjectTile
          title="Obstacle Avoidance Embedded System"
          tagline="Ultrasonic sensing, C++, Arduino"
          href="/projects/obstacle-avoidance-robot"
        />
      </div>
      <div class="t-obs">
        <ProjectTile
          title="Friends of Taylor Observatory"
          tagline="Astrometry, photometry, IAU submissions"
          href="/projects/taylor-observatory"
        />
      </div>
    </div>

  </div>
</Layout>

<style>
  .projects-page {
    padding-bottom: 4rem;
  }

  /* ── Section header ── */
  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2.5rem 0 1.25rem;
  }

  .section-header:first-child { margin-top: 0; }

  .section-label {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.10em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .section-rule {
    flex: 1;
    border: none;
    border-top: 1px solid var(--grid-line);
  }

  /* ── Mosaic grid ── */
  .mosaic {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--col-gap);
  }

  /* Rocket cluster spans */
  .t-hub    { grid-column: span 7; min-height: 300px; }
  .t-hts    { grid-column: span 5; min-height: 300px; }
  .t-inj    { grid-column: span 4; min-height: 180px; }
  .t-vstand { grid-column: span 4; min-height: 180px; }
  .t-wflows { grid-column: span 4; min-height: 180px; }
  .t-data   { grid-column: span 12; min-height: 120px; }

  /* Standalone spans */
  .t-sub    { grid-column: span 4; min-height: 220px; }
  .t-uav    { grid-column: span 4; min-height: 220px; }
  .t-obst   { grid-column: span 4; min-height: 220px; }
  .t-obs    { grid-column: span 12; min-height: 120px; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .t-hub, .t-hts   { grid-column: span 6; }
    .t-inj, .t-vstand, .t-wflows { grid-column: span 6; }
    .t-sub, .t-uav, .t-obst      { grid-column: span 6; }
  }

  @media (max-width: 600px) {
    .t-hub, .t-hts,
    .t-inj, .t-vstand, .t-wflows,
    .t-sub, .t-uav, .t-obst { grid-column: span 12; }
  }
</style>
```

- [ ] **Step 3: Build to verify no import errors**

```bash
export PATH="/opt/homebrew/bin:$PATH" && npm run build 2>&1 | tail -6
```
Expected: exits 0, but will 404 on project links until stubs are created in Task 5.

---

### Task 5: Stub pages for all unbuilt project routes

**Files:**
- Create: `src/pages/projects/injector-orifice-sizing.astro`
- Create: `src/pages/projects/vertical-test-stand.astro`
- Create: `src/pages/projects/propulsion-data-analysis.astro`
- Create: `src/pages/projects/injector-water-flows.astro`
- Create: `src/pages/projects/submersible-v3.astro`
- Create: `src/pages/projects/uav-gimbal-joint.astro`
- Create: `src/pages/projects/obstacle-avoidance-robot.astro`
- Create: `src/pages/projects/taylor-observatory.astro`

- [ ] **Step 1: Create `src/pages/projects/injector-orifice-sizing.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="Hybrid Injector Orifice Sizing">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">Hybrid Injector Orifice Sizing</h1>
      <p class="stub-tag">UCLA Rocket Project</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Full detail page: Python/CoolProp two-phase injector model, predicted-vs-actual N₂O mass-flow interactive plot, 69-orifice pattern diagram, 35% → 10.3% error reduction writeup. Lead project for the Rocket cluster.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

- [ ] **Step 2: Create `src/pages/projects/vertical-test-stand.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="Vertical Test Stand & Tank Mount">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">Vertical Test Stand & Tank Mount</h1>
      <p class="stub-tag">UCLA Rocket Project</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Full detail page: tank-mount and vertical stand infrastructure, Ansys Mechanical FEA stress contours, structural safety validation, CAD renders.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

- [ ] **Step 3: Create `src/pages/projects/propulsion-data-analysis.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="Propulsion Data Analysis">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">Propulsion Data Analysis</h1>
      <p class="stub-tag">UCLA Rocket Project</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Full detail page: scattered-reports component (20+ PDF test summaries as overlapping paper cards), key data plots from hydro, cold-flow, and static-fire campaigns, anomaly notes.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

- [ ] **Step 4: Create `src/pages/projects/injector-water-flows.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="Injector Water Flows">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">Injector Water Flows</h1>
      <p class="stub-tag">UCLA Rocket Project</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Full detail page: cold-flow and water-flow characterization of injector before hot fire, flow-rate data, spray imagery, flow-test photos and video.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

- [ ] **Step 5: Create `src/pages/projects/submersible-v3.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="Submersible V3">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">Submersible V3</h1>
      <p class="stub-tag">AdvancingX · Human Spaceflight EVA Training</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Full detail page: 16-ft neutrally buoyant open-frame submersible for civilian astronaut EVA training. SolidWorks model, buoyancy hand-calcs, structural analysis to 35-ft depth, 1/20-scale prototype test footage.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

- [ ] **Step 6: Create `src/pages/projects/uav-gimbal-joint.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="UAV Gimbal Joint Design">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">UAV Gimbal Joint Design</h1>
      <p class="stub-tag">UCLA Mechatronics & Controls Lab · MacLab</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Full detail page: DfAM gimbal joint adding a rotational DoF to the passive-hinge structure of an over-actuated UAV, eliminating a 6-DoF singularity at vertical arm orientations. Singularity-explainer diagram, rotating gimbal GIF.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

- [ ] **Step 7: Create `src/pages/projects/obstacle-avoidance-robot.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="Obstacle Avoidance Embedded System">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">Obstacle Avoidance Embedded System</h1>
      <p class="stub-tag">Embedded Systems · C++ · Arduino</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Full detail page: Arduino car with ultrasonic distance sensor for obstacle detection and avoidance. Build photos, demo video, wiring diagram, annotated code snippet. Demonstrates embedded and electronics range.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

- [ ] **Step 8: Create `src/pages/projects/taylor-observatory.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
---
<Layout title="Friends of Taylor Observatory">
  <div class="page-padded">
    <div class="project-stub-header">
      <a href="/projects" class="back-link">← Projects</a>
      <h1 class="stub-title">Friends of Taylor Observatory</h1>
      <p class="stub-tag">Astrometry · Photometry · IAU Minor Planet Center</p>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 4</span>
      <p>Single-page treatment (not a full deep-dive): astrometric and photometric data submitted to the IAU Minor Planet Center, commissioning a RASA telescope, planetarium and public-astronomy programs. A few photos and a short writeup.</p>
    </div>
  </div>
</Layout>
<style>
  .project-stub-header { margin-bottom: 2rem; }
  .back-link { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.06em; display: block; margin-bottom: 1.25rem; transition: color var(--dur-fast) var(--ease-out); }
  .back-link:hover { color: var(--text-70); }
  .stub-title { font-family: var(--font-display); font-size: var(--text-4xl); font-weight: var(--fw-black); color: var(--text-100); letter-spacing: -0.01em; line-height: var(--leading-tight); text-transform: uppercase; margin-bottom: 0.5rem; }
  .stub-tag { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-35); letter-spacing: 0.08em; text-transform: uppercase; }
</style>
```

---

### Task 6: Horizontal Propulsion Test Stand — detail page

**Files:**
- Create: `src/pages/projects/horizontal-propulsion-test-stand.astro`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p src/pages/projects
```
Expected: no error (may already exist after Task 5).

- [ ] **Step 2: Write `src/pages/projects/horizontal-propulsion-test-stand.astro`**

```astro
---
import Layout from '../../layouts/Layout.astro';
import SpecTable from '../../components/SpecTable.astro';
import MetricCallout from '../../components/MetricCallout.astro';

const specRows = [
  { label: 'Impulse Isolated',  value: '5,635 lbf-s'          },
  { label: 'Factor of Safety',  value: '> 2.0'                 },
  { label: 'Static Fires',      value: '2 (Mojave, CA)'        },
  { label: 'Configuration',     value: 'Cantilever, linear rails' },
  { label: 'Load Method',       value: 'Hand-calc, bolt/bracket' },
  { label: 'Design Tool',       value: 'SolidWorks'            },
];
---

<Layout
  title="Horizontal Propulsion Test Stand"
  description="SolidWorks cantilever test stand isolating 5,635 lbf-s thrust onto linear rails, validated through 2 Mojave static fires."
>

  <!-- ① Hero Band -->
  <section class="proj-hero">
    <div class="proj-hero__bg" aria-hidden="true"></div>
    <div class="proj-hero__ghost" aria-hidden="true">TEST STAND</div>
    <div class="proj-hero__content page-padded">
      <a href="/projects" class="proj-hero__back">← Projects</a>
      <p class="proj-hero__category">UCLA Rocket Project</p>
      <h1 class="proj-hero__title">Horizontal Propulsion<br>Test Stand</h1>
      <p class="proj-hero__tagline">
        Isolating 5,635 lbf-s onto linear rails — 2 Mojave static fires
      </p>
    </div>
  </section>

  <div class="proj-body page-padded">

    <!-- ② Spec Block -->
    <section class="spec-block">
      <div class="spec-block__table">
        <SpecTable rows={specRows} title="Specifications" />
      </div>
      <div class="spec-block__model">
        <div class="todo-block">
          <span class="todo-label">TODO — Rotating model</span>
          <p>
            360° rotating GIF or MP4 of the test stand CAD from SolidWorks.
            Target: 24 fps, ~5 s loop, exported from SolidWorks Visualize or PhotoView 360.
            Place at <code>public/assets/projects/horizontal-propulsion-test-stand/model-rotate.mp4</code>.
          </p>
        </div>
      </div>
    </section>

    <!-- ③ Metric Callouts -->
    <section class="metrics" aria-label="Key metrics">
      <MetricCallout value="5635"  unit="lbf-s" description="Impulse isolated"         />
      <MetricCallout value="2.0"   unit=""       description="Factor of Safety (min)"  prefix=">" />
      <MetricCallout value="2"     unit="fires"  description="Static fires, Mojave CA" />
    </section>

    <!-- ④ The Work -->
    <section class="the-work">

      <div class="work-row">
        <h2 class="work-label">Problem</h2>
        <div class="work-content">
          <p class="work-text">
            A hybrid rocket motor generating over 5,000 lbf-s of total impulse requires a ground
            test structure capable of safely isolating and reacting thrust loads during static-fire
            characterization. Off-the-shelf test stands were cost-prohibitive and over-specified
            for the team's motor size; the team needed a custom structure buildable in-house with
            standard hardware and no specialized tooling.
          </p>
        </div>
      </div>

      <div class="work-row">
        <h2 class="work-label">Approach</h2>
        <div class="work-content">
          <p class="work-text">
            Designed a horizontal cantilever test stand in SolidWorks: the motor attaches to a
            rigid arm that transfers thrust load laterally into a pair of linear rails, which are
            anchored to a welded ground frame. All bolts and structural brackets were hand-calculated
            to a factor of safety greater than 2.0 using AISC methods and published fastener load
            ratings. The linear rail configuration allows axial motor alignment adjustment between
            test campaigns.
          </p>
        </div>
      </div>

      <div class="work-row">
        <h2 class="work-label">Analysis</h2>
        <div class="work-content">
          <div class="todo-block">
            <span class="todo-label">TODO — FEA stress contour</span>
            <p>
              Ansys Mechanical von Mises stress contour at peak thrust load, highlighting critical
              bracket joints. Export as high-res PNG, caption with peak stress value and FoS.
            </p>
          </div>
          <div class="todo-block">
            <span class="todo-label">TODO — Load-path diagram</span>
            <p>
              Annotated diagram tracing the thrust force path: motor mount → cantilever arm →
              linear rail interface → anchor bolts → ground frame. SolidWorks drawing or Illustrator.
            </p>
          </div>
        </div>
      </div>

      <div class="work-row">
        <h2 class="work-label">Result</h2>
        <div class="work-content">
          <p class="work-text">
            The stand successfully completed two full-duration static fires at Mojave Air &amp;
            Space Port with no structural failure or visible permanent deformation. Thrust data
            was captured through both test campaigns, providing the propulsion team with
            motor characterization data for flight performance predictions.
          </p>
          <div class="todo-block">
            <span class="todo-label">TODO — Fire photos &amp; video</span>
            <p>
              Static-fire photos and video clip from Mojave test campaigns.
              H.264 MP4, trimmed to motor burn duration (~10 s).
              Place at <code>public/assets/projects/horizontal-propulsion-test-stand/static-fire.mp4</code>.
            </p>
          </div>
        </div>
      </div>

      <div class="work-row">
        <h2 class="work-label">Reflection</h2>
        <div class="work-content">
          <p class="work-text">
            The cantilever geometry simplified fabrication but created a moment arm that amplified
            bracket loading relative to a symmetric twin-rail mount. A future iteration would shorten
            the moment arm or introduce a secondary rail to distribute load — reducing peak fastener
            stress, improving lateral stiffness, and allowing longer-duration burns without bracket
            fatigue concerns.
          </p>
        </div>
      </div>

    </section>
  </div>

</Layout>

<style>
  /* ── Hero Band ── */
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

  /* ── Body ── */
  .proj-body {
    padding-top: 3rem;
    padding-bottom: 5rem;
  }

  /* ── Spec Block ── */
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

  /* ── Metrics ── */
  .metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2.5rem 0;
    border-top: 1px solid var(--grid-line);
    border-bottom: 1px solid var(--grid-line);
    margin-bottom: 4rem;
  }

  @media (max-width: 600px) {
    .metrics { grid-template-columns: 1fr; }
  }

  /* ── The Work ── */
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
</style>
```

---

### Task 7: Build verification + commit

- [ ] **Step 1: Run full build**

```bash
export PATH="/opt/homebrew/bin:$PATH" && npm run build 2>&1 | tail -10
```
Expected: exits 0, shows 14 pages built (5 original + 9 new project pages).

- [ ] **Step 2: Verify page count**

```bash
find dist -name "index.html" | wc -l
```
Expected: `14`

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectTile.astro src/components/SpecTable.astro src/components/MetricCallout.astro src/pages/projects.astro src/pages/projects/ docs/
git commit -m "feat: Milestone 3 — projects mosaic, test stand detail page, component library

- ProjectTile: Anduril-style mosaic tile with grid bg motif, ↗ hover
- SpecTable: label-left / mono-value-right / hairline dividers (SpaceX pattern)
- MetricCallout: count-up animation via IntersectionObserver
- /projects: full 12-col asymmetric mosaic, Rocket cluster + Standalone sections
- /projects/horizontal-propulsion-test-stand: hero band with ghost title,
  spec block, 3× metric callouts, 5-section the-work (Problem→Reflection)
- 8 stub pages for all other project routes

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
