# Milestone 1: Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap an Astro static site with the full CSS design-token system, fixed left-sidebar layout, top-right status pill, render-blocking access gate, and five stub pages — deployable to GitHub Pages at manav-patel.com.

**Architecture:** Plain CSS custom properties (`tokens.css`) define every design value; a single `Layout.astro` wraps all pages with the sidebar, status pill, and access gate; five stub pages consume the layout with visible TODO blocks. No UI framework — Astro components + TypeScript only.

**Tech Stack:** Astro 6.4.2, TypeScript strict, plain CSS, `@fontsource-variable/geist` 5.2.9, `@fontsource-variable/geist-mono` 5.2.8, D-DIN via CDN (temp), `withastro/action@v3` for GH Pages.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Create | Astro + font deps, dev/build/preview scripts |
| `astro.config.mjs` | Create | site URL, static output |
| `tsconfig.json` | Create | strict TS extending astro/tsconfigs/strict |
| `src/env.d.ts` | Create | Astro client types reference |
| `.gitignore` | Update | add node_modules, dist, .astro |
| `DECISIONS.md` | Create | non-obvious implementation choices |
| `.github/workflows/deploy.yml` | Create | withastro/action GH Pages workflow |
| `public/CNAME` | Create | manav-patel.com |
| `public/favicon.svg` | Create | minimal "M" monogram SVG |
| `src/styles/tokens.css` | Create | all CSS custom properties (color, type, layout, motion) |
| `src/styles/global.css` | Create | reset, base styles, .todo-block utility |
| `src/layouts/Layout.astro` | Create | html shell, font imports, access gate, sidebar slot |
| `src/components/Sidebar.astro` | Create | fixed 220px left rail, nav, bottom status |
| `src/components/StatusPill.astro` | Create | fixed top-right OPEN TO OPPORTUNITIES pill |
| `src/pages/index.astro` | Create | Home stub |
| `src/pages/projects.astro` | Create | Projects stub |
| `src/pages/about.astro` | Create | About stub |
| `src/pages/skills.astro` | Create | Skills stub |
| `src/pages/contact.astro` | Create | Contact stub |
| `index.html` | Delete | superseded by Astro pages |

---

### Task 1: Project scaffold files

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Update: `.gitignore`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "manav-patel-portfolio",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^6.4.2",
    "@fontsource-variable/geist": "^5.2.9",
    "@fontsource-variable/geist-mono": "^5.2.8"
  }
}
```

- [ ] **Step 2: Write `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://manav-patel.com',
  output: 'static',
});
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Write `src/env.d.ts`**

```typescript
/// <reference types="astro/client" />
```

- [ ] **Step 5: Update `.gitignore`**

Append to existing (or create):
```
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 6: Remove old placeholder**

```bash
rm index.html
```

---

### Task 2: Install dependencies + verify build

**Files:** (node_modules, package-lock.json generated)

- [ ] **Step 1: Install**

```bash
npm install
```
Expected: resolves ~500 packages, no errors.

- [ ] **Step 2: Create minimal src/pages/index.astro to allow a build test**

```astro
---
---
<html><body><p>stub</p></body></html>
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```
Expected: exits 0, creates `dist/index.html`.

- [ ] **Step 4: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts .gitignore
git commit -m "feat: scaffold Astro 6 project"
```

---

### Task 3: CSS design tokens

**Files:**
- Create: `src/styles/tokens.css`

- [ ] **Step 1: Write `src/styles/tokens.css`**

```css
:root {
  /* ── Base surfaces ── */
  --bg:             #010101;
  --surface:        #0c0d0e;
  --surface-raised: #121414;

  /* ── Text opacity ladder (base: #f1f0ea as RGB) ── */
  --text-rgb:  241, 240, 234;
  --text-100:  rgba(241, 240, 234, 1.00);
  --text-90:   rgba(241, 240, 234, 0.90);
  --text-70:   rgba(241, 240, 234, 0.70);
  --text-50:   rgba(241, 240, 234, 0.50);
  --text-35:   rgba(241, 240, 234, 0.35);
  --text-15:   rgba(241, 240, 234, 0.15);

  /* ── Structural lines ── */
  --grid-line:      rgba(241, 240, 234, 0.06);
  --hairline:       rgba(241, 240, 234, 0.10);

  /* ── Accent ── */
  --accent:         #ff6f61;
  --accent-dim:     rgba(255, 111, 97, 0.15);

  /* ── Status green ── */
  --status-green:   #4ade80;

  /* ── Layout ── */
  --sidebar-w:      220px;
  --outer-gutter:   clamp(1.5rem, 5vw, 4rem);
  --col-gap:        1.5rem;
  --cols:           12;

  /* ── Type scale (rem, root 16px) ── */
  --text-2xs:   0.625rem;    /* 10px */
  --text-xs:    0.6875rem;   /* 11px */
  --text-sm:    0.75rem;     /* 12px */
  --text-base:  0.875rem;    /* 14px */
  --text-md:    1rem;        /* 16px */
  --text-lg:    1.25rem;     /* 20px */
  --text-xl:    1.75rem;     /* 28px */
  --text-2xl:   2.5rem;      /* 40px */
  --text-3xl:   3.5rem;      /* 56px */
  --text-4xl:   5rem;        /* 80px */
  --text-5xl:   7rem;        /* 112px */

  /* ── Line heights ── */
  --leading-tight:  0.95;
  --leading-snug:   1.10;
  --leading-normal: 1.50;
  --leading-loose:  1.70;

  /* ── Font families ── */
  --font-display: 'Geist Variable', 'Hanken Grotesk', system-ui, sans-serif;
  --font-label:   'D-DIN', 'Barlow Condensed', 'IBM Plex Sans Condensed', sans-serif;
  --font-mono:    'Geist Mono Variable', 'Roboto Mono', 'JetBrains Mono', monospace;

  /* ── Font weights ── */
  --fw-regular: 400;
  --fw-medium:  500;
  --fw-semibold: 600;
  --fw-bold:    700;
  --fw-black:   900;

  /* ── Motion ── */
  --dur-fast:   150ms;
  --dur-base:   300ms;
  --dur-slow:   600ms;
  --dur-page:   450ms;
  --ease-out:   cubic-bezier(0.16, 1, 0.30, 1);
  --ease-inout: cubic-bezier(0.45, 0.00, 0.55, 1);

  /* ── Z-index scale ── */
  --z-sidebar:  100;
  --z-pill:     110;
  --z-overlay:  200;
}
```

- [ ] **Step 2: Verify tokens load (will be tested via Layout in Task 5)**

No build step needed; tokens are pure CSS with no syntax to validate here.

---

### Task 4: Global base styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write `src/styles/global.css`**

```css
/* D-DIN — temporary CDN until self-hosted; see DECISIONS.md */
@import url('https://fonts.cdnfonts.com/css/d-din');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  background: var(--bg);
  color: var(--text-100);
  font-family: var(--font-display);
  font-weight: var(--fw-regular);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  overflow-x: hidden;
  line-height: var(--leading-normal);
}

a {
  color: inherit;
  text-decoration: none;
}

img, video {
  display: block;
  max-width: 100%;
}

/* ── 12-column grid utility ── */
.grid-12 {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  gap: var(--col-gap);
}

/* ── Stub TODO block (Milestone N placeholders) ── */
.todo-block {
  border: 1px dashed var(--grid-line);
  padding: 2rem;
  margin: 2rem 0;
  background: var(--surface);
}

.todo-label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.todo-block p {
  font-size: var(--text-base);
  color: var(--text-50);
  line-height: var(--leading-normal);
  font-family: var(--font-mono);
}

/* ── Accessible focus ring ── */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Task 5: Layout.astro

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Write `src/layouts/Layout.astro`**

```astro
---
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '../styles/tokens.css';
import '../styles/global.css';
import Sidebar from '../components/Sidebar.astro';
import StatusPill from '../components/StatusPill.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Aerospace engineering portfolio of Manav Patel — propulsion, test, CAD, FEA.' } = Astro.props;
const currentPath = Astro.url.pathname;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} — Manav Patel</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- ACCESS GATE: render-blocking; remove this block for public launch -->
    <script is:inline>
      const SECRET = "dev9";
      const params = new URLSearchParams(window.location.search);
      if (params.get("token") === SECRET) {
        localStorage.setItem("access", SECRET);
      }
      if (localStorage.getItem("access") !== SECRET) {
        window.location.href = "https://www.linkedin.com/in/manavjp/";
      }
    </script>
    <!-- END ACCESS GATE -->
  </head>
  <body>
    <Sidebar currentPath={currentPath} />
    <StatusPill />
    <main class="main-content">
      <slot />
    </main>
  </body>
</html>

<style>
  body {
    display: flex;
    min-height: 100vh;
  }

  .main-content {
    margin-left: var(--sidebar-w);
    flex: 1;
    min-height: 100vh;
    padding: calc(var(--outer-gutter) * 1.5) var(--outer-gutter);
  }

  @media (max-width: 768px) {
    .main-content {
      margin-left: 0;
      padding-top: 4rem;
    }
  }
</style>
```

- [ ] **Step 2: Run build to verify Layout compiles**

```bash
npm run build 2>&1 | tail -10
```
Expected: exits 0.

---

### Task 6: Sidebar component

**Files:**
- Create: `src/components/Sidebar.astro`

- [ ] **Step 1: Write `src/components/Sidebar.astro`**

```astro
---
interface Props {
  currentPath: string;
}

const { currentPath } = Astro.props;

const navItems = [
  { href: '/',         label: 'Home'     },
  { href: '/projects', label: 'Projects' },
  { href: '/about',    label: 'About'    },
  { href: '/skills',   label: 'Skills'   },
  { href: '/contact',  label: 'Contact'  },
];

function isActive(href: string): boolean {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
}
---

<aside class="sidebar" aria-label="Site navigation">
  <div class="sidebar__top">
    <a href="/" class="sidebar__wordmark" aria-label="Manav Patel — home">
      MANAV PATEL
    </a>

    <nav class="sidebar__nav">
      <ul role="list">
        {navItems.map(item => (
          <li>
            <a
              href={item.href}
              class:list={['nav-item', { 'is-active': isActive(item.href) }]}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>

  <div class="sidebar__bottom">
    <div class="sidebar__status">
      <span class="dot" aria-hidden="true"></span>
      <span class="status-text">Open to opportunities</span>
    </div>
    <a href="mailto:manavjpatel@ucla.edu" class="sidebar__email">
      manavjpatel@ucla.edu
    </a>
  </div>
</aside>

<style>
  .sidebar {
    position: fixed;
    inset-block: 0;
    left: 0;
    width: var(--sidebar-w);
    background: var(--bg);
    border-right: 1px solid var(--grid-line);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem 1.5rem;
    z-index: var(--z-sidebar);
  }

  .sidebar__wordmark {
    display: block;
    font-family: var(--font-label);
    font-size: var(--text-xs);
    font-weight: var(--fw-bold);
    letter-spacing: 0.10em;
    color: var(--text-100);
    margin-bottom: 3rem;
  }

  .sidebar__nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .nav-item {
    display: block;
    font-family: var(--font-display);
    font-size: var(--text-base);
    font-weight: var(--fw-regular);
    color: var(--text-50);
    padding: 0.4rem 0;
    position: relative;
    transition: color var(--dur-fast) var(--ease-out);
  }

  .nav-item:hover {
    color: var(--text-100);
  }

  .nav-item.is-active {
    color: var(--text-100);
    font-weight: var(--fw-medium);
  }

  /* accent left bar on active item */
  .nav-item.is-active::before {
    content: '';
    position: absolute;
    left: -1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 1rem;
    background: var(--accent);
  }

  /* ── Bottom ── */
  .sidebar__bottom {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .sidebar__status {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--status-green);
    flex-shrink: 0;
  }

  .status-text {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .sidebar__email {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    transition: color var(--dur-fast) var(--ease-out);
  }

  .sidebar__email:hover {
    color: var(--text-70);
  }

  /* ── Mobile: hide sidebar, show as top bar ── */
  @media (max-width: 768px) {
    .sidebar {
      inset-block: auto;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 3.5rem;
      flex-direction: row;
      align-items: center;
      padding: 0 1.25rem;
      border-right: none;
      border-bottom: 1px solid var(--grid-line);
    }

    .sidebar__wordmark {
      margin-bottom: 0;
    }

    .sidebar__nav,
    .sidebar__bottom {
      display: none;
    }
  }
</style>
```

---

### Task 7: StatusPill component

**Files:**
- Create: `src/components/StatusPill.astro`

- [ ] **Step 1: Write `src/components/StatusPill.astro`**

```astro
<div class="status-pill" role="status" aria-label="Availability status: open to opportunities">
  <span class="pill-dot" aria-hidden="true"></span>
  <span class="pill-text">OPEN TO OPPORTUNITIES</span>
</div>

<style>
  .status-pill {
    position: fixed;
    top: 1.5rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: var(--z-pill);
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--grid-line);
    background: rgba(12, 13, 14, 0.85);
    backdrop-filter: blur(8px);
  }

  .pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--status-green);
    flex-shrink: 0;
    animation: dot-pulse 2.4s ease-in-out infinite;
  }

  @keyframes dot-pulse {
    0%, 100% { opacity: 1;   transform: scale(1.00); }
    50%       { opacity: 0.5; transform: scale(0.80); }
  }

  .pill-text {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: var(--fw-regular);
    color: var(--text-70);
    letter-spacing: 0.08em;
  }

  @media (max-width: 768px) {
    .status-pill {
      top: 0.85rem;
      right: 1.25rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pill-dot {
      animation: none;
    }
  }
</style>
```

---

### Task 8: Stub pages

**Files:**
- Replace: `src/pages/index.astro`
- Create: `src/pages/projects.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/skills.astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Write `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Home">
  <div class="page-header">
    <span class="page-label">// 001</span>
    <h1 class="page-title">Home</h1>
  </div>
  <div class="todo-block">
    <span class="todo-label">TODO — Milestone 2</span>
    <p>Hero: minimal, type-driven. Name + 3–6 word positioning line ("Propulsion · Test · Aerospace") + CTA → Projects. No photo. Lean on type, negative space, and a subtle engineering-drawing grid motif.</p>
  </div>
</Layout>

<style>
  .page-header { margin-bottom: 2rem; }
  .page-label {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
  }
  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--fw-black);
    color: var(--text-100);
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
    text-transform: uppercase;
  }
</style>
```

- [ ] **Step 2: Write `src/pages/projects.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Projects">
  <div class="page-header">
    <span class="page-label">// 002</span>
    <h1 class="page-title">Projects</h1>
  </div>
  <div class="todo-block">
    <span class="todo-label">TODO — Milestone 3</span>
    <p>Projects index: Anduril-style asymmetric mosaic on 12-col grid. Full-bleed media tiles, bold name + short tagline bottom-left, ↗ on hover. Rocket Project items presented as a cluster (hub tile + sub-cases).</p>
  </div>
</Layout>

<style>
  .page-header { margin-bottom: 2rem; }
  .page-label {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
  }
  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--fw-black);
    color: var(--text-100);
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
    text-transform: uppercase;
  }
</style>
```

- [ ] **Step 3: Write `src/pages/about.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="About">
  <div class="page-header">
    <span class="page-label">// 003</span>
    <h1 class="page-title">About</h1>
  </div>
  <div class="todo-block">
    <span class="todo-label">TODO — Milestone 5</span>
    <p>Short, technical, about the work and the approach. Not a resume reprint, not a personal bio. Core: propulsion test, additive/DfAM, CAD (SolidWorks, Creo, NX), FEA (Ansys), Python/CoolProp, GD&T.</p>
  </div>
</Layout>

<style>
  .page-header { margin-bottom: 2rem; }
  .page-label {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
  }
  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--fw-black);
    color: var(--text-100);
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
    text-transform: uppercase;
  }
</style>
```

- [ ] **Step 4: Write `src/pages/skills.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Skills">
  <div class="page-header">
    <span class="page-label">// 004</span>
    <h1 class="page-title">Skills</h1>
  </div>
  <div class="todo-block">
    <span class="todo-label">TODO — Milestone 5</span>
    <p>Concise, grouped: Design (SolidWorks, Creo, NX, Ansys FEA, GD&T) / Software (Python, CoolProp, C++, Arduino, MATLAB) / Manufacturing (machining, additive/DfAM, composites).</p>
  </div>
</Layout>

<style>
  .page-header { margin-bottom: 2rem; }
  .page-label {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
  }
  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--fw-black);
    color: var(--text-100);
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
    text-transform: uppercase;
  }
</style>
```

- [ ] **Step 5: Write `src/pages/contact.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Contact">
  <div class="page-header">
    <span class="page-label">// 005</span>
    <h1 class="page-title">Contact</h1>
  </div>
  <div class="todo-block">
    <span class="todo-label">TODO — Milestone 5</span>
    <p>Email: manavjpatel@ucla.edu · LinkedIn: linkedin.com/in/manavjp — no contact form; links only.</p>
  </div>
</Layout>

<style>
  .page-header { margin-bottom: 2rem; }
  .page-label {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-35);
    letter-spacing: 0.08em;
    margin-bottom: 0.5rem;
  }
  .page-title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: var(--fw-black);
    color: var(--text-100);
    letter-spacing: -0.01em;
    line-height: var(--leading-tight);
    text-transform: uppercase;
  }
</style>
```

---

### Task 9: Static assets + GH Actions workflow

**Files:**
- Create: `public/CNAME`
- Create: `public/favicon.svg`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write `public/CNAME`**

```
manav-patel.com
```

- [ ] **Step 2: Write `public/favicon.svg`** — minimal "M" monogram

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" fill="#010101"/>
  <text x="16" y="22" font-family="system-ui,sans-serif" font-size="18"
        font-weight="700" fill="#f1f0ea" text-anchor="middle">M</text>
</svg>
```

- [ ] **Step 3: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Install, build, and upload
        uses: withastro/action@v3

  deploy:
    needs: [build]
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### Task 10: DECISIONS.md

**Files:**
- Create: `DECISIONS.md`

- [ ] **Step 1: Write `DECISIONS.md`**

```markdown
# DECISIONS.md

Non-obvious implementation choices. One entry per decision.

---

## Fonts

**Geist / Geist Mono — `@fontsource-variable/geist` + `@fontsource-variable/geist-mono`**
Self-hosted via fontsource; no Google Fonts CDN request at runtime. Variable font
(single file covers all weights). Versions pinned: geist 5.2.9, geist-mono 5.2.8.

**D-DIN — `fonts.cdnfonts.com` (temporary)**
D-DIN (DASdesign, free) is not in fontsource. Using CDN import in global.css as a
temporary measure. TODO before launch: download the .woff2 files, place in
`/public/fonts/d-din/`, and replace the CDN @import with local @font-face declarations.
Source: https://www.dafont.com/d-din.font (free for commercial use — verify license).

## Framework

**Astro 6.4.2, no UI framework**
Static output by default. No React/Svelte islands in Milestone 1. Islands will be
added in later milestones for charts (Plotly/Observable Plot) and the report stack.

## Styling

**Plain CSS custom properties — no Tailwind**
Design system tokens live entirely in `src/styles/tokens.css`. The brief calls for
building the design system from scratch ("don't start from a template"), which is
better served by a hand-crafted token layer than Tailwind's utility approach.

## Deploy

**`withastro/action@v3`**
Astro's official GH Pages action. v3 is the latest as of Milestone 1. If the workflow
fails, check https://github.com/withastro/action for the current major version.

## Access gate

**Inline render-blocking script in `<head>`** (Section 9.2 of brief)
Token `dev9` stored in localStorage. Renders before any page paint — no flash before
redirect. The gate is isolated to a clearly-marked comment block in Layout.astro;
remove the block (not a flag) for public launch.

## Node.js

**Installed via Homebrew (node 26.0.0)** — was not present on the machine before
Milestone 1. Added to PATH via `/opt/homebrew/bin`.
```

---

### Task 11: Full build verification + commit

- [ ] **Step 1: Run production build**

```bash
npm run build 2>&1
```
Expected: exits 0, `dist/` contains `index.html`, `projects/index.html`, `about/index.html`, `skills/index.html`, `contact/index.html`, `CNAME`, `favicon.svg`.

- [ ] **Step 2: Verify CNAME in dist**

```bash
cat dist/CNAME
```
Expected: `manav-patel.com`

- [ ] **Step 3: Spot-check a built page for token class names**

```bash
grep -c 'var(--bg)' dist/index.html || grep 'Geist' dist/_astro/*.css 2>/dev/null | head -2
```
Expected: CSS references Geist font.

- [ ] **Step 4: Commit everything**

```bash
git add -A
git commit -m "feat: Milestone 1 — Astro foundation, design tokens, layout, stub pages"
```
