# Wave 0 — View 2: Projects (list + detail)

Branch: `refine/02-projects`
Status: audit complete, scope awaiting approval
Date: 2026-10-19

## Baseline (measured)

| Area | Value |
|---|---|
| Detector (project files) | side-tab at [id]/index.astro:117-118 both locales = blockquote accent border (same as accent-paint issue below); 26 brand-hex deferred |
| Contrast | detail h1 accent #FF5D22 on periwinkle ≈1.7:1 <3:1 (FAIL); dashed --muted divider ≈2.95/2.3 <3:1 (FAIL); focus ring PASS |
| Metadata | self canonical + hreflang es/en/x-default OK; og/twitter absolute OK; robots index/follow OK |

## Audit sources

| Audit | Agent | Key output |
|---|---|---|
| Composition | A1 (impeccable) | List page holds notebook; detail page drifts (accent paint). P1: JSON-LD 'en' hardcode on ES detail; liveLink no rel; accent paint ~1.7:1; Navigation sr-only English; --muted divider contrast; LangSwitcher counterpartId null (works today, slugs match). |
| Taste | A2 (design-taste-frontend) | P0: per-project colors paint h1/h2/rules/testimonial (#FF5D22, #ff28ab, #d2944a, #98AEEB, #ff0000, #EDEDED) — One Ink Rule violation. P1: aspect-square image stretch + hover scale-120; Coming Soon pill over image. P2: tech stack as gradient pills; 40px pixel title; date inline text-xs. |
| SEO | A3 (seo-page) | P0: JSON-LD 'en' hardcode on ES detail; counterpartIds self-referencing (2 of 6 pairs broken). P1: flat CreativeWork missing Person/WebSite nodes. P2: short title (~6 chars); project name difer es/en ("YogIN" vs "Yogi"). |

## Proposed scope (P0 + P1)

### P0 — locale integrity (must fix in this PR)
1. **JSON-LD inLanguage** (`src/pages/es/projects/[id]/index.astro:50`): pass real locale (`getLangFromLocale(Astro.currentLocale)`), not hardcoded `'en'`.
2. **CounterpartIds self-referencing** (content data): `src/content/projects/es/lola-barcelona.json:55` → `"en/lola-barcelona"`; `src/content/projects/en/the-forge.json:51` → `"es/the-forge"`.

### P1 — access / visual
3. **liveLink rel** (detail pages both locales, line ~64): add `rel='noopener noreferrer'`.
4. **Remove accent paint** (detail pages both locales, lines ~58/72/81/86/91/117-118): h1 slate ink, h2 rules `--edge`, testimonial border `--edge`, delete blockquote `borderLeft: 4px solid ${colors}`. No new hues.
5. **Navigation sr-only** (`src/components/projects/Navigation.astro:58,73`): translate via `t()` or locale literals.
6. **ProjectItem divider** (`src/components/projects/ProjectItem.astro:54`): `--muted` → `--edge`/`--border` (UI boundary ≥3:1).
7. **ProjectsLayout images** (`src/layout/ProjectsLayout.astro:26-51`): native aspect + `object-fit:cover`, remove `group-hover:scale-120` opacity swap, guard under `prefers-reduced-motion`.

### P2 — deferred to content wave (recommended)
- Tech stack chips vs gradient buttons (pill abuse)
- Detail title 40px pixel face → 18px Geist (Metadata Is Mono / Monogram Exception)
- SEO title length (~6 chars → 50-60)
- Project name alignment es/en ("YogIN" vs "Yogi")

## Risks
- Content data edits (`counterpartId`) touch 2 JSON files; low risk, both slugs exist in the other locale.
- Accent paint removal changes visual appearance of detail pages; reversible, aligned with DESIGN.md.

## Verification plan
`detect --json src` → 0 new warnings in project files; contrast script green both themes; `check:lint`, `check:types`, `check:format`, `build`; built-HTML check `/es/projects/yogin/` and `/en/projects/yogin/` (canonical, hreflang, JSON-LD lang, no inline accent styles); keyboard walk of detail page; lang switcher ES↔EN on detail pages.

## Open decisions (need your approval before code)

1. **Counterpart content data**: ¿arreglar los 2 `counterpartId` auto-referentes ahora (necesario para P0 i18n)? (Recomendado: sí)
2. **Alcance de esta PR**: ¿solo P0+P1 (items 1-7) o incluir también P2 (chips, título 18px, title length, nombre es/en)? (Recomendado: P0+P1 mínimo; P2 a content wave)
