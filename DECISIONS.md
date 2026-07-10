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

## Next Project button (liquid-glass-js)

**Vendored locally at `public/vendor/liquid-glass/`** (container.js, button.js,
glass.css from the attached `liquid-glass-js-main/`, plus html2canvas 1.4.1) —
the previous CDN load (`cdn.jsdelivr.net/gh/...`) tracks the repo's default
branch, so the look could drift; local files pin it and remove a third-party
runtime dependency. `glass.css` rules are also inlined in
`ProjectPageLayout.astro`'s `is:global` style so text centering never races an
async stylesheet.

**Button creation waits 1350ms after `astro:page-load`** — the TransitionOverlay
covers the viewport for ~820ms (380ms hold + 440ms wipe); html2canvas snapshots
taken earlier would bake the overlay into the glass background. 1350ms (owner's
pick) leaves ~530ms of margin over the overlay's exit.

**WebGL context released on page change** — the library never stops its render
loop or frees contexts; without `WEBGL_lose_context` cleanup, cycling projects
via the button would exhaust the browser's ~16-context limit and the glass
would stop rendering.

**Render check on every page load** — verifies DOM presence, glass pixels
actually drawn (readPixels alpha), text centered within 2px, and link target;
logs `[next-project] render check passed/FAILED` to the console and applies a
CSS `backdrop-filter` fallback if WebGL/snapshot fails.

## Navigation QoL (prefetch, keyboard, back-to-top)

**`prefetch: true` in astro.config.mjs** — required to import `astro:prefetch`
(ClientRouter alone does not enable it in Astro 6). Only links carrying
`data-astro-prefetch` (sidebar, project tiles, back-link) prefetch on hover;
nothing site-wide.

**Next page prefetches once per project page** — earliest of: cursor within
150px of the pill, or pill revealed at 25% scroll (covers touch). Uses
`<link rel="prefetch">` via `astro:prefetch`.

**`PROJECT_ORDER` array in ProjectPageLayout is the canonical project order** —
drives the ← key (previous, wraps) and the hover destination caption; the
render check validates each page's `nextHref` prop against it, so a page
falling out of sync logs a console warning.

**←/→ keyboard nav registers before the glass init** — works immediately on
page load and keeps working even if WebGL/snapshot fails. Guards: skips
inputs/contenteditable, modifier keys, and latches after first navigation.

**Lenis instance exposed as `window.__lenis`** (Layout.astro) — the back-to-top
circle uses it for smooth scroll; falls back to native smooth scrolling, and
both paths honor `prefers-reduced-motion` with an instant jump.

## Glass snapshot capture moved out of the library

The "transparency not working after Next-Project navigation" bug had nothing to
do with navigation: liquid-glass renders by refracting an html2canvas snapshot
of `<body>`, and two site-wide facts made snapshots mostly empty — (1) the page
background lives on `<html>`, which an html2canvas capture of `<body>` never
paints, and (2) scroll-reveal sections (`.will-reveal`) sit at `opacity: 0`
until scrolled into view, so everything below the fold captured invisible.
Whether a button looked right depended on what happened to be revealed where it
sampled. ProjectPageLayout now captures the snapshot itself before constructing
the buttons: it toggles `html.glass-capturing` (CSS forces `.will-reveal`
visible — offscreen only, no flash), passes the computed `<html>` background as
the capture base, excludes the transition overlay and the controls, and
pre-seeds `Container.pageSnapshot` so the library never races a stale capture.
The render check now also asserts the snapshot is non-transparent and matches
the page height.

## Projects: Rocket-hub "reveal clickable tiles" interaction

The "UCLA Rocket Project" hub tile is a static `<div>` (no `href`). It's made
keyboard/click-activatable in JS (`role=button`, `tabindex=0`) — clicking briefly
flashes an accent inset ring on each *clickable* sibling in the same `.mosaic`
(`a.tile`), then clears it on `animationend`. Not a toggle, never highlights
itself. The ring is an `::after` `box-shadow: inset` (the tile has
`overflow:hidden`, so an outer ring/outline would be clipped). 90 ms stagger.

## Contact: email row copies instead of mailto

The email "link" is now a `<button>` that copies `manavjpatel@g.ucla.edu` to the
clipboard while displaying `manavjpatel@ucla.edu`. The `↗` arrow is swapped for a
copy-glyph SVG that, on success, briefly swaps to a check (`.is-copied`, 1.4 s).
"Same size-change animation as the arrows" was read as: hover scales the icon
(`scale(1.18)`) + accent color, reusing the arrows' `--dur-fast`/`--ease-out`
tokens (the arrows translate; a scale reads better for a copy action). Clipboard
uses async `writeText` with an execCommand textarea fallback on rejection.

## Analytics: umami accuracy pass

Custom events use a site-owned `data-track-event` / `data-track-event-*`
convention (delegated listener in `Layout.astro`), NOT umami's native
`data-umami-event`: umami's click auto-track `preventDefault()`s same-tab links
and re-navigates with `location.href` after its fetch, which makes the
ClientRouter skip the link — every tracked internal link degraded to a full page
reload with no view transition. Our listener calls `umami.track()` and never
touches navigation.

Auto pageviews stay on (umami hooks `pushState`), but back/forward traversals are
performed by the ClientRouter *without* `pushState`, so after a `popstate`-driven
navigation completes (`astro:page-load`) we re-announce the URL via a same-URL
`history.replaceState` — umami's hook picks it up and ignores calls whose URL
hasn't changed, so it can't double count. Astro's own scroll-save `replaceState`
calls pass no URL and are ignored by umami.

Pollution guards: the script renders in production builds only
(`import.meta.env.PROD`), `data-domains="manav-patel.com,www.manav-patel.com"`
blocks previews/forks/`astro preview`, and the owner-only `?preview=1` toggle
also sets `localStorage["umami.disabled"]` (`?preview=0` clears it) so the
owner's own visits are excluded. `data-exclude-hash` keeps URL stats from
fragmenting; search params stay recorded so UTM/ref campaign links keep working.

`src/pages/404.astro` exists partly for analytics: GitHub Pages serves it at the
requested URL, so umami records exactly which broken links visitors hit.
