# DECISIONS.md

Non-obvious implementation choices. One entry per decision.

---

## Fonts

**Geist / Geist Mono — `@fontsource-variable/geist` + `@fontsource-variable/geist-mono`**
Self-hosted variable fonts via fontsource npm packages; zero CDN request at runtime.
One file covers all weights. Versions: `geist@5.2.9`, `geist-mono@5.2.8`.

**D-DIN — `fonts.cdnfonts.com` (temporary)**
D-DIN (DASdesign, free for commercial use) is not in fontsource. Using a CDN `@import`
in `global.css` as a temporary measure.
TODO before launch: download the `.woff2` files, place in `/public/fonts/d-din/`,
replace the CDN `@import` with `@font-face` declarations. Verify license at:
https://www.dafont.com/d-din.font

## Framework

**Astro 6.4.2, no UI framework in Milestone 1**
Static output (default). No React/Svelte islands yet — islands added in later milestones
for Plotly/Observable Plot charts and the scattered-reports stack component.

## Styling

**Plain CSS custom properties — no Tailwind**
All design tokens in `src/styles/tokens.css`. The brief calls for building the design
system from scratch ("don't start from a template"), which a hand-crafted token layer
serves better than Tailwind's utility approach.

## Deploy

**`withastro/action@v3` + `actions/deploy-pages@v4`**
Astro's official GH Pages action splits into build + deploy jobs. v3 is current as of
Milestone 1. If the workflow fails, check https://github.com/withastro/action for the
latest major version.

**GitHub Pages setup required:** In the repo settings → Pages → Source, select
"GitHub Actions" (not a branch). The workflow will not deploy until this is set.

## Access Gate

**Inline render-blocking `<script is:inline>` in `<head>`** (brief §9.2)
Token `dev9` stored in `localStorage`. Runs before any paint — no flash before redirect.
Isolated to a clearly-marked comment block in `Layout.astro`; remove the block for
public launch.

## Node.js

**Installed via Homebrew (node 26.0.0)** — was not present before Milestone 1.
PATH: `/opt/homebrew/bin`. Add to shell profile: `export PATH="/opt/homebrew/bin:$PATH"`

## Root CNAME

The root-level `CNAME` file (from the original placeholder repo) is superseded by
`public/CNAME`. Astro copies `public/` to `dist/`, so `dist/CNAME` is what
GitHub Pages reads. The root-level file can be removed.
