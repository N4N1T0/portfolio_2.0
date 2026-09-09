---
title: 'Writing every component twice to stop a preview from lying'
date: 2026-09-09
excerpt: 'A resizable preview panel makes viewport breakpoints lie. The fix was to author each component twice, once for the viewport and once for the container. What that bought, and what it cost.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/writing-every-component-twice.png'
imageAlt: 'Dark title card reading ''Writing every component twice'' over a technical grid'
counterpartId: 'es/escribir-cada-componente-dos-veces'
---

I build a registry of ecommerce storefront components — heroes, product cards, carts, checkout blocks — distributed the shadcn way: you run a CLI command and the source lands in your project as your code, not as a dependency. Eighty components, sixteen categories, and one design decision that shaped everything else.

The site that browses them shows each component inside a panel you can drag to resize. That single affordance is why every component in the repo exists twice.

## The panel that broke responsive design

Here is the preview shell, near enough verbatim:

```tsx
<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize={100}>
    <ScrollArea className="@container group size-full">
      <Component />
    </ScrollArea>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={0} />
</ResizablePanelGroup>
```

Two panels, the second with zero width. That is a small trick worth stealing: a `ResizablePanelGroup` needs two children to give you a draggable divider, so a zero-width sibling turns the group into a single draggable right edge on the first panel.

Now drag that edge inward. The component gets narrower. But `sm:`, `md:` and `lg:` in Tailwind are viewport media queries, and the viewport did not change — you resized a `div`. So a component authored with `lg:grid-cols-3` keeps rendering three columns at 320 pixels wide, overflowing and clipping, while the preview cheerfully claims this is what the component does on a small screen.

The preview lies. And a component registry whose previews lie is worse than no registry, because the lie is exactly the thing people are evaluating before they install.

Container queries fix it: `@container` on the wrapper, and `@sm:` / `@4xl:` variants inside, and now the breakpoints respond to the panel instead of the window. Except the component I ship to your project is not inside my resizable panel. It is inside your page, where the viewport *is* the right thing to measure.

Two different correct answers for the same component.

## Authoring everything twice

The resolution was to stop pretending one file could serve both:

- `src/registry/components/<category>/<name>.tsx` — the copy you install. Viewport breakpoints. This is what the CLI serves and what the standalone `/preview/[slug]` route renders full-bleed.
- `src/registry/example/<category>/<name>.tsx` — the in-page demo. Container queries, because it renders inside that `@container` panel.

A category barrel maps a catalogue id to each:

```ts
export const heroComponentRegistry = {
  'hero-luxury': HeroDarkLuxury,
  'hero-bento': HeroBento,
  // …
}
```

and one root object spreads all sixteen barrels together, with the mirror registry alongside it. Lookups go through a string id with a cast, so a catalogue entry with no matching key fails at runtime rather than at compile time — both call sites handle the `undefined`, but the type system is not helping there and I know it.

The discipline held better than I expected. All eighty example files use container-query variants. Only two component files do, and those are deliberate. The rule stuck.

The leakage went the other way: thirty-one of the eighty example files still carry viewport breakpoints *alongside* their container queries. Harmless in the panel — a media query that never matches simply does nothing — but it means a third of the mirrors were converted by adding variants rather than by replacing them, and the intent is now ambiguous to the next person reading them.

## The part that actually hurt

Breakpoints were never the real cost. Drift was.

Two files with the same name, no shared source of truth, and nothing checking that they agree. `hero-luxury` is the canonical example. The installable copy has a secondary call-to-action that is a circular icon button:

```tsx
<Button size="lg" variant="outline" className="h-12 w-12 rounded-full p-0">
  <Play className="h-5 w-5" aria-hidden="true" />
  <span className="sr-only">{MOCK_DATA.secondaryCta.playSrOnly}</span>
</Button>
```

The demo copy has no `Play` import at all. Its secondary CTA is a labelled outline button reading "Get More Info".

So the thing you preview is not the thing you install. Not a breakpoint difference — a different component wearing the same name. And there is no test suite in this repo to catch it: no runner, no test files, nothing. The guard rails are `eslint --fix` and `tsc --noEmit` on a pre-commit hook, which will happily let two files diverge in content forever, because both of them compile.

If I were starting again I would not write two files. I would write one, take `breakpoint: 'viewport' | 'container'` as a prop or a class-prefix token, and generate the second. The duplication is only tolerable while it is mechanical, and it stopped being mechanical the first time someone improved one twin and not the other.

## A second lesson, cheaper to state

The components are deliberately dependency-free. I grepped every import across all eighty: outside the local UI primitives, `lucide-react`, `next/image`, `next/link`, `react` and a `cn` helper, there is exactly **one** foreign import in the entire set — `embla-carousel-autoplay`. Installing a component adds no runtime library to your project. That constraint was worth enforcing and cost almost nothing to hold.

Seventy-two of eighty also inline their own mock data as a top-of-file constant rather than taking props. An older rules file in the repo forbids exactly that. The code won, and it won for a good reason: a copy-paste component has to render the moment it lands in your project, before you have wired anything up. Sometimes the rule is wrong and the drift is the codebase telling you so.

And the sting in the tail: the shadcn manifest that makes components installable — `registry.json` — is maintained by hand, separately from the eighty-entry catalogue that drives the site. Nothing generates one from the other. It currently declares **one** item. Every install command the UI renders, for the other seventy-nine components, points at a JSON file that does not exist. CI runs the registry build on every PR and passes, because building a one-item manifest succeeds.

Which is the real lesson, and it is not about container queries at all: the checks I *had* all passed. Types compiled, lint was clean, the build succeeded. Nothing verified the thing the product exists to do.
