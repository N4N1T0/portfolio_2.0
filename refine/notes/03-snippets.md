# Wave 0 — View 3: Snippets (list + detail)

Branch: `refine/03-snippets`
Status: audit complete, scope awaiting approval
Date: 2026-10-19

## Baseline (measured)

| Area | Value |
|---|---|
| Detector (snippet files) | 0 warnings in snippets files (26 brand-hex deferred) |
| Contrast | body/muted/code/link/border/focus PASS both themes; dark chip text-on-muted 4.01 (shared-token, Wave 0) |
| Metadata | list pages PASS; detail pages hreflang EN alternate dead-ends to 404 |

## Audit sources

| Audit | Agent | Key output |
|---|---|---|
| Composition | A1 (impeccable) | List partly notebook (ruled bands) but drifts: 3-col boxed card grid (violates Line-Not-Box), body-size pixel subtitle, bg-info dot badge (accent-as-surface). Detail partly notebook but max-w-none breaks 48rem column, h1 text-5xl pixel second display moment, prev/next href to /projects (wrong section), LangSwitcher counterpart broken for snippets. |
| Taste | A2 (design-taste-frontend) | P0: SnippetsCards card painted bg-muted/border/ring + icon plate; Navigation /projects href. P1: min-h-[50dvh] hero slab, text-5xl pixel h1, custom-prose max-w-none breaks column/generic dev-blog code blocks. Dials 5/4/4; partial match. |
| SEO | A3 (seo-page) | P0: hreflang EN alternate 404 on snippet detail (no counterpartId resolution); LangSwitcher blind to snippets. P1: TechArticle lone node w/o @graph (author/publisher dangling), no datePublished/image, publisher typed Person. P2: short title, og:type 'website' on article. |

## Proposed scope (P0 + P1)

### P0 — wayfinding / i18n integrity
1. **Navigation prev/next** (`src/components/snippets/Navigation.astro:51,67`): `/projects${id}` → `/snippets${id}`.
2. **LangSwitcher counterpart for snippets**: add `snippets` branch so detail pages switch ES↔EN to real counterpart slug. Needs counterpart data fix:
   - `src/content/snippets/es/animacion-de-estado-para-inputs.md:8`: `counterpartId` → `en/input-animation-on-state` (currently `es/input-animation-on_state`, wrong locale prefix + typo).
   - EN side `en/input-animation-on-state.md`: counterpart `es/animacion-de-estado-para-inputs` already correct.

### P1 — access / visual / schema
3. **Remove max-w-none** (`src/pages/{es,en}/snippets/[id]/index.astro:56`): align content to 48rem column.
4. **h1 pixel → Geist 18px** (`src/pages/{es,en}/snippets/[id]/index.astro:40`): title token, not text-5xl font-pixel.
5. **Filter comingSoon** in snippets list (`src/components/snippets/index.astro`): match Navigation behavior.
6. **Schema @graph** (`src/components/layout/head/jsonLD.ts generateSnippetJsonLD`): emit `@graph` with website + person + organization nodes; publisher as Organization; add datePublished + image. (Shared infra change, justified by snippet view.)
7. **og:type article** for snippet detail pages.

### P2 — deferred to content wave
- Copy button on code blocks (`[data-rehype-pretty-code-figure]`).
- SEO title length (~32/21 chars → 50-60).
- Add `date` field to snippet MD frontmatter + content.config (currently missing).

## Risks
- Content data edit (1 MD counterpartId) low risk; slug exists in EN.
- Schema change is shared infra (`jsonLD.ts`); affects all snippet details but not other views (home/blog/projects have their own generators).

## Verification plan
`detect --json src` → 0 new warnings in snippet files; contrast green; `check:lint`, `check:types`, `check:format`, `build`; built-HTML check `/es/snippets/animacion-de-estado-para-inputs/` and `/en/snippets/input-animation-on-state/` (canonical, hreflang both resolve, JSON-LD @graph); lang switcher ES↔EN on snippet detail; keyboard walk.

## Open decisions (need your approval before code)

1. **Counterpart content data**: ¿arreglar `counterpartId` en el MD ES ahora (necesario para P0 i18n)? (Recomendado: sí)
2. **Alcance PR**: ¿solo P0+P1 (items 1-7) o incluir P2 (copy button, title length, date field)? (Recomendado: P0+P1 mínimo)
