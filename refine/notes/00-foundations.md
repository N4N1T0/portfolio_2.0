# Wave 0 — Foundations

Branch: `refine/00-foundations`
Status: audit complete, scope awaiting approval
Date: 2026-10-19

## Baseline (measured)

| Metric | Value |
|---|---|
| Detector | 37 findings — 5 warnings, 32 advisory |
| Detector warnings | 2× `side-tab` (project detail), 2× `overused-font`, 1× `design-system-font` (global.css) |
| Detector advisories | 30× undocumented color, 1× font-size, 1× radius |
| Contrast ink/paper | 7.73 (PASS) |
| Contrast muted-fg/paper | 4.85 / 4.90 dark (PASS, tight) |
| Contrast link/paper | 3.59 / 3.90 (FAIL 4.5) |
| Contrast ring/paper | 1.56 / 4.96 (FAIL 3.0 light) |
| Contrast ring/50/paper | 1.29 / 2.26 (FAIL) |
| Contrast border/paper (dark) | 2.27 (FAIL 3.0 for UI boundary) |
| Contrast edge/paper | 2.12 / 1.66 (FAIL) |
| Contrast muted-fg on muted | 3.12 / 2.55 (FAIL 4.5) |
| Nav `foreground/50` | 2.53 (FAIL 4.5) |
| Canonical `/es/` | points to `/en/` (FAIL) |
| hreflang `/es/` | `es-es` → `/en/`, `en-es` → `https://site/https://site/en/` (FAIL) |
| JSON-LD on home | none emitted; default `ld` value emits invalid JSON elsewhere (FAIL) |
| JSON-LD host | `adrian-alvarez.dev` everywhere, DNS NXDOMAIN (FAIL) |
| Home title | identical in both locales; description 268/245 chars (FAIL) |
| `/` | 404 in dev; deployed duplicate of `/es/` (FAIL) |

Commands: `impeccable detect --json src`, `Invoke-WebRequest http://localhost:4322/{es,en}/`, contrast script from `REFINE.md` §7.

## Audit sources

| Audit | Agent | Key output |
|---|---|---|
| Design review | A1 (impeccable) | Specificity real; 18/32 heuristics; focus/link/muted/dark-edge contrast failures; no skip link; fake footer telemetry; 3 conflicting positioning statements |
| Taste | A2 (design-taste-frontend) | Dials 5/4/6; fixed gradient+blur band violates anti-reference; mobile nav leaves the sheet; footer plate reads as 10 boxes; watermark flashes on whole-footer hover |
| SEO | A3 (seo-page) | Canonical/hreflang inverted site-wide; JSON-LD host wrong and partly invalid; OG images relative/double-slash; 404 indexable; sitemap missing alternates; llms.txt stale and wrong host |

## Proposed scope (P0 + top P1)

### 1. Tokens and focus (shared)
- `--ring` retuned to ≥3:1 on paper, muted and card, both themes; remove `/50` ring usage; add `--outline` token so `outline-outline` stops resolving to the ring.
- `--link` fixed to ≥4.5:1 (or removed: currently zero consumers) and `custom-prose` links stop forcing foreground.
- Dark theme: raise `--border`, recompute `--edge` mix, fix `--input`.
- `--success` / `--destructive` retuned for text use; fills unchanged.
- `color-scheme` set per theme; `:focus-visible` base with 2-tone ring + offset.
- Reduced-motion base guard for `shake-x`, `success-pop`, `animate-pulse`.

### 2. SEO foundation (shared)
- `SITE_URL` single source from `Astro.site`; no hardcoded host in `jsonLD.ts`.
- Canonical from `new URL(pathname, Astro.site)` with no mutation of `Astro.url`.
- hreflang: `es`, `en`, `x-default`, absolute, correct slugs.
- `ld` optional (`undefined` default), render only when present; valid JSON-LD `@graph` with `#website`, `#person`, `#organization`; flatten `sameAs`/`target`; real `Person.jobTitle` + `worksFor`.
- OG/Twitter images absolute; fix double slash; per-route `og:type`.
- Unique localized titles and descriptions ≤158 chars, based on one positioning sentence.
- `trailingSlash: 'always'`; `/` → `/es/` relative redirect; 404 `noindex, follow` + localized title/description.
- `llms.txt`: correct host, corrected positioning, complete project/post list (or generate at build if cheap).
- Sitemap: exclude `/`, link `sitemap-index.xml`.

### 3. Shell truthfulness (shared)
- Delete the gradient+blur band in `MainLayout.astro`; replace with a hard `bg-background` band or `screen-line-before`.
- Header: remove `pt-2` so the 48px bar is the first rule; align `main mt-12` and `scroll-mt`.
- Footer: dynamic year; real commit SHA when available (`VERCEL_GIT_COMMIT_SHA`, else `local`); stack from `package.json`; remove pulsing dot; watermark hover scoped to itself.
- Footer metadata plate: one continuous `bg-edge` gutter instead of 10 bordered boxes.
- Unify section gutters (overview `px-1` → system value).
- `DesktopNav`: `foreground/50` → `muted-foreground`, `aria-current`, 4px underline offset.
- Add a skip link (WCAG 2.4.1).
- Accordion content: `inert`/`hidden` when closed (removes invisible tab stops).
- Unify LinkedIn URL (`site-data.ts` vs footer).
- Footer greens → tokens; `success-pop` colors → tokens; `FooterField` `0.625rem` → documented step; radius outlier fixed.

### 4. Copy (product truth)
- One positioning sentence per language, used in hero sentences, about, meta description, JSON-LD and `llms.txt`.
- Remove the "backend systems that scale" CTA and the strategic-mindset paragraph that contradict the confirmed fullstack-no-focus position.
- Replace the four em-dashes in `site-data.ts` with plain punctuation (DESIGN voice).

## Explicitly deferred (with reason)

| Item | Deferred to | Reason |
|---|---|---|
| Mobile nav redesign (in-sheet panel, no backdrop/shadow) | View 8 | Composition change, needs its own PR |
| 404 page composition | View 8 | Route-specific |
| Overlay shadow unification (`shadow-sm/md/lg`) | View 8 | Component design, not a token fix |
| Counterpart IDs wrong in 5 content files + `getProjectById` bug | Views 3 and 5 | Content data + detail templates; avoid touching content in a foundations PR |
| Hero composition / home section hierarchy | View 1 | Per-view |
| Type scale intermediate step | View 1 or 5 | Needs a documented ramp decision |
| Tech-brand hexes as data (`site-data.ts:127-289`) | — | Legitimate data colors; document as an exception, do not tokenize |

## Risks

- Canonical/hreflang changes affect every page. Mitigation: verify built HTML for 6 representative routes before the PR.
- Copy edits are visible product changes; they follow `PRODUCT.md` but need the user's sign-off on the exact sentences.
- Footer build metadata depends on Vercel env vars locally; fallback must read honestly (`local`), never fake a hash.

## Verification plan

`detect --json <changed>` → 0 warnings; contrast script green on both themes; `pnpm check:lint`, `check:types`, `check:format`, `build`; built-HTML diff for `/es/`, `/en/`, `/es/projects/`, `/en/blog/`, detail pages; keyboard walk (skip link, TOC, header); SEO re-run on both locales.

## Open decisions

1. Positioning sentence: approve proposed ES/EN copy (see PR) or write your own.
2. Footer build field: real SHA + date, or remove the field entirely.
3. Shell scope: minimal now (as scoped) vs include the mobile-nav redesign in this PR.
