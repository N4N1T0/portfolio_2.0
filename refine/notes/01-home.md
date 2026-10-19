# Wave 0 — View 1: Home composition

Branch: `refine/01-home`
Status: audit complete, scope awaiting approval
Date: 2026-10-19

## Baseline (measured)

| Area | Value |
|---|---|
| Detector (home files) | 0 new warnings (26 brand-hex, 2 side-tab, 1 overused-font — all deferred) |
| Contrast home | All pairs PASS after Wave 0 (ring 3.46/5.98, link 4.53/5.28, edge 3.04/3.37) |
| Metadata /es/ & /en/ | 13/13 PASS (title, desc, canonical, og:*, twitter, robots, lang, hreflang) |
| Schema home | WebSite + Person graph, stable @id, real sameAs — PASS |

## Audit sources

| Audit | Agent | Key output |
|---|---|---|
| Composition | A1 (impeccable) | Home reads as generic portfolio landing page, not Notebook; 10 sections identical weight; hero buries name/role; 9 identical separators; About wall of text; Blog+Projects compete; EN-only floating note |
| Taste | A2 (design-taste-frontend) | Dials 5/5/4; drift via painted gradient island (techstack), em-dash in date ranges, icon plates + TODO code block in hero footer, LocalTime strip, identical section rhythm (5 sections) |
| SEO | A3 (seo-page) | No P0; P1 copy "Backend Focus" contradicts position; P2 llms.txt 19 vs 18 articles; x-default redundant but valid; LangSwitcher counterpart null-safe on home |

## Proposed scope (composition only — no shared-token changes; Wave 0 tokens already fixed)

### P0 — anti-referencia / pintura
1. **Techstack gradient island** (`src/components/home/techstack/index.astro:14`): remove `bg-[radial-gradient(...)]` fill; sheet background only, separated by `--edge` hairline. No new hues/widths.
2. **Em-dash in date ranges** (`src/components/home/experiences/ExperiencePositionItem.astro:64`): replace `—` with `-` (DESIGN zero-em-dash rule; page `<title>` es/en index:21-22 also use em-dash — check).

### P1 — expresión / jerarquía
3. **Hero footer strip** (`HeroFooter.astro`): delete avatar `rounded-full` plate and `// TODO: Something cool in here ;)` code block; keep name + one-sentence role only. Monogram flip stays the sole expression moment.
4. **Hero name/role visibility**: add visible name + positioning sentence under the monogram in the hero band (currently name only in footer below the flip — PRODUCT first-viewport rule).
5. **LocalTime strip** (`overview/LocalTime.astro` + `overview/index.astro:29-33`): remove Madrid clock + offset (locale/time strip banned unless place-focused brief); keep address/phone/email static mono rows.
6. **Separators**: reduce from 9 identical `Separator`s; vary visual weight by section priority (primary sections keep hairline, secondary get lighter/none).

### P2 — ritmo / paridad
7. **Section rhythm**: differentiate innards of the 5 repeated sections (about, certifications, experiences, projects, blog-list) — different layout families while keeping ruled column. (Sized decision below.)
8. **EN-only floating note** (`en/index.astro:41-48`): add ES counterpart or remove.
9. **Heading consistency**: `sr-only` vs visible `h2` mixed across sections — align.

### Deferred (explicit)
| Item | Deferred to | Reason |
|---|---|---|
| Experience titles "Backend Focus / Backend Architecture" contradict position | Content wave | Content data, not composition; flagged only |
| llms.txt 19 vs 18 articles count | Content wave | Data hygiene |
| Shared-token fixes (muted on muted, ring margin, prose-a link color, 0.01ms kill) | Wave 0 | Already fixed; not in scope of this PR |

## Risks
- None structural: all changes are per-view composition, no tokens, no shell, no SEO infra.
- Separator reduction changes visual rhythm of home — reversible.

## Verification plan
`detect --json src` → 0 new home warnings; contrast script green both themes; `check:lint`, `check:types`, `check:format`, `build`; built-HTML check `/es/` and `/en/`; keyboard walk of home; bilingual parity ES↔EN.

## Open decisions (need your approval before code)

1. **LocalTime**: quitar el reloj de Madrid del overview? (Recomendado: sí)
2. **Hero**: ¿agregar nombre + oración de posición visible bajo el monograma? (Recomendado: sí)
3. **Separators**: ¿reducir de 9 y diferenciar peso por prioridad de sección? (Recomendado: sí)
4. **Experiencias "Backend Focus"**: ¿refactorizar títulos ahora o deferir a content wave? (Recomendado: deferir, solo flag)
5. **Scope de esta PR**: ¿solo composición mínima (1-4 arriba) o también diferenciación de secciones (7)? (Recomendado: mínima, deja 7 para vista 2 o content wave)
