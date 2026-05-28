# Milestone 2: Hero Page Design

**Goal:** A full-viewport hero section — the first thing a token-bearing visitor sees. Type-driven, no photography, minimal content, one CTA to Projects.

**Approved by user 2026-05-28.**

---

## Layout

- `100svh` hero section, `position: relative`, `overflow: hidden`
- Content column vertically centered (flexbox column, `justify-content: center`)
- Left-aligned text within the main content area (right of 220px sidebar)
- No below-fold content in Milestone 2

## Content (top → bottom)

| Element | Copy | Token |
|---------|------|-------|
| Eyebrow | `AEROSPACE ENGINEERING` | `--font-label`, `--text-xs`, `--text-35`, `letter-spacing: 0.12em` |
| Name (h1) | `MANAV PATEL` | `--font-display`, `--fw-black`, `clamp(3.5rem, 8vw, 8rem)`, `--text-100`, `letter-spacing: -0.01em`, `text-transform: uppercase` |
| Tagline | `PROPULSION · TEST · AEROSPACE` | `--font-label`, `--text-sm`, `--text-50`, `letter-spacing: 0.08em`, `text-transform: uppercase` |
| CTA | `VIEW PROJECTS →` | `--font-mono`, `--text-xs`, `--text-70`, `letter-spacing: 0.10em`, `text-transform: uppercase`, `1px solid var(--hairline)` border, accent border + `--text-100` on hover |

## Background Motif

CSS `repeating-linear-gradient` grid (no image file):
- Vertical + horizontal lines, 1px, `var(--grid-line)`, spaced 40px
- Applied to a `::before` pseudo-element covering the full hero
- Masked with `radial-gradient` so grid is atmospheric at the periphery and fades toward center

## Animation

CSS `@keyframes reveal-up`: `opacity 0→1` + `translateY(12px→0)`.

| Element | Duration | Delay |
|---------|----------|-------|
| Eyebrow | 0.5s | 0s |
| Name | 0.75s | 0.10s |
| Tagline | 0.6s | 0.30s |
| CTA | 0.5s | 0.60s |

All use `--ease-out`. `prefers-reduced-motion`: skip transform, instant opacity.

## Files

- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro` — replace TODO stub with `<Hero />`
