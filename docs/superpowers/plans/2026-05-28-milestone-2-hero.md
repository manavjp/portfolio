# Milestone 2: Hero Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full-viewport hero section for the home page with staggered reveal, engineering-grid background motif, and a CTA to Projects.

**Architecture:** `Hero.astro` is a self-contained component. Layout.astro's `.main-content` padding is removed (set to 0) so the hero can be truly full-bleed; a new `.page-padded` utility class in global.css gives all other stub pages their original padding back.

**Tech Stack:** Astro 6, plain CSS (repeating-linear-gradient grid, @keyframes animations, CSS mask), no new dependencies.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/components/Hero.astro` | Create | Hero section: grid bg, eyebrow/name/tagline/CTA, staggered animations |
| `src/pages/index.astro` | Modify | Replace TODO stub with `<Hero />` |
| `src/layouts/Layout.astro` | Modify | Remove padding from `.main-content` |
| `src/styles/global.css` | Modify | Add `.page-padded` utility class |
| `src/pages/projects.astro` | Modify | Wrap content in `.page-padded` |
| `src/pages/about.astro` | Modify | Wrap content in `.page-padded` |
| `src/pages/skills.astro` | Modify | Wrap content in `.page-padded` |
| `src/pages/contact.astro` | Modify | Wrap content in `.page-padded` |

---

### Task 1: Remove main-content padding + add .page-padded utility

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Remove padding from `.main-content` in Layout.astro**

Find the `<style>` block and replace:
```css
.main-content {
  margin-left: var(--sidebar-w);
  flex: 1;
  min-height: 100vh;
  padding: calc(var(--outer-gutter) * 1.5) var(--outer-gutter);
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding-top: 5rem;
  }
}
```
With:
```css
.main-content {
  margin-left: var(--sidebar-w);
  flex: 1;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
```

- [ ] **Step 2: Add `.page-padded` to `src/styles/global.css`**

Append after the `.todo-block p` rule:
```css
/* ── Standard page padding (all non-hero pages) ── */
.page-padded {
  padding: calc(var(--outer-gutter) * 1.5) var(--outer-gutter);
}

@media (max-width: 768px) {
  .page-padded {
    padding: 5rem var(--outer-gutter) var(--outer-gutter);
  }
}
```

---

### Task 2: Wrap stub pages in .page-padded

**Files:**
- Modify: `src/pages/projects.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/skills.astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Update `src/pages/projects.astro`**

Replace the `<Layout title="Projects">` body with:
```astro
<Layout title="Projects">
  <div class="page-padded">
    <div class="page-header">
      <span class="page-label">// 002</span>
      <h1 class="page-title">Projects</h1>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 3</span>
      <p>
        Projects index: Anduril-style asymmetric mosaic on 12-col grid.
        Full-bleed media tiles, bold name + short tagline bottom-left, ↗ on hover.
        Rocket Project items presented as a cluster (hub tile + sub-cases).
      </p>
    </div>
  </div>
</Layout>
```

- [ ] **Step 2: Update `src/pages/about.astro`**

```astro
<Layout title="About">
  <div class="page-padded">
    <div class="page-header">
      <span class="page-label">// 003</span>
      <h1 class="page-title">About</h1>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 5</span>
      <p>
        Short, technical, about the work and the approach. Not a resume reprint.
        Core: propulsion test, additive/DfAM, CAD (SolidWorks, Creo, NX),
        FEA (Ansys), Python/CoolProp, GD&amp;T.
        B.S. Aerospace Engineering, UCLA (exp. Jun 2028).
      </p>
    </div>
  </div>
</Layout>
```

- [ ] **Step 3: Update `src/pages/skills.astro`**

```astro
<Layout title="Skills">
  <div class="page-padded">
    <div class="page-header">
      <span class="page-label">// 004</span>
      <h1 class="page-title">Skills</h1>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 5</span>
      <p>
        Concise, grouped — Design: SolidWorks, Creo, NX, Ansys FEA, GD&amp;T /
        Software: Python, CoolProp, C++, Arduino, MATLAB /
        Manufacturing: machining, additive/DfAM, composites.
      </p>
    </div>
  </div>
</Layout>
```

- [ ] **Step 4: Update `src/pages/contact.astro`**

```astro
<Layout title="Contact">
  <div class="page-padded">
    <div class="page-header">
      <span class="page-label">// 005</span>
      <h1 class="page-title">Contact</h1>
    </div>
    <div class="todo-block">
      <span class="todo-label">TODO — Milestone 5</span>
      <p>
        Email: manavjpatel@ucla.edu ·
        LinkedIn: linkedin.com/in/manavjp —
        no contact form; links only.
      </p>
    </div>
  </div>
</Layout>
```

---

### Task 3: Create Hero.astro

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
<section class="hero" aria-label="Hero introduction">
  <div class="hero__bg" aria-hidden="true"></div>
  <div class="hero__content">
    <span class="hero__eyebrow">Aerospace Engineering</span>
    <h1 class="hero__name">Manav Patel</h1>
    <p class="hero__tagline">Propulsion&nbsp;&middot; Test &middot;&nbsp;Aerospace</p>
    <a href="/projects" class="hero__cta">
      View Projects <span aria-hidden="true">&rarr;</span>
    </a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    height: 100svh;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  /* Engineering-drawing grid — fades toward center */
  .hero__bg {
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
    mask-image: radial-gradient(
      ellipse 75% 75% at 50% 50%,
      transparent 0%,
      rgba(0, 0, 0, 0.5) 55%,
      black 100%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 75% 75% at 50% 50%,
      transparent 0%,
      rgba(0, 0, 0, 0.5) 55%,
      black 100%
    );
    pointer-events: none;
  }

  .hero__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.875rem;
    padding: 0 var(--outer-gutter);
    width: 100%;
  }

  .hero__eyebrow {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    animation: reveal-up 0.5s var(--ease-out) 0s both;
  }

  .hero__name {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 8vw, 8rem);
    font-weight: var(--fw-black);
    line-height: var(--leading-tight);
    letter-spacing: -0.01em;
    color: var(--text-100);
    text-transform: uppercase;
    margin: 0;
    animation: reveal-up 0.75s var(--ease-out) 0.10s both;
  }

  .hero__tagline {
    font-family: var(--font-label);
    font-size: var(--text-sm);
    color: var(--text-50);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0;
    animation: reveal-up 0.6s var(--ease-out) 0.30s both;
  }

  .hero__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-70);
    letter-spacing: 0.10em;
    text-transform: uppercase;
    padding: 0.6rem 1.25rem;
    border: 1px solid var(--hairline);
    margin-top: 0.25rem;
    transition:
      border-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out);
    animation: reveal-up 0.5s var(--ease-out) 0.60s both;
  }

  .hero__cta:hover {
    border-color: var(--accent);
    color: var(--text-100);
  }

  @keyframes reveal-up {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero__eyebrow,
    .hero__name,
    .hero__tagline,
    .hero__cta {
      animation: none;
      opacity: 1;
    }
  }
</style>
```

---

### Task 4: Update index.astro + build verification

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace index.astro stub with Hero component**

Full file contents:
```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
---

<Layout title="Home">
  <Hero />
</Layout>
```

- [ ] **Step 2: Run build**

```bash
export PATH="/opt/homebrew/bin:$PATH" && npm run build 2>&1 | tail -8
```
Expected: exits 0, 5 pages built.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro src/layouts/Layout.astro src/styles/global.css src/pages/projects.astro src/pages/about.astro src/pages/skills.astro src/pages/contact.astro docs/
git commit -m "feat: Milestone 2 — hero page with staggered reveal and grid motif"
```
