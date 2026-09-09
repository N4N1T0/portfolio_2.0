---
title: 'Escribir cada componente dos veces para que el preview no mienta'
date: 2026-09-09
excerpt: 'Un panel de preview redimensionable hace que los breakpoints de viewport mientan. La solución fue escribir cada componente dos veces, uno para el viewport y otro para el contenedor.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/writing-every-component-twice.png'
imageAlt: 'Portada oscura con el texto ''Writing every component twice'' sobre una retícula técnica'
counterpartId: 'en/writing-every-component-twice'
---

Mantengo un registry de componentes de storefront para ecommerce — heroes, product cards, carritos, bloques de checkout — distribuidos a la manera de shadcn: ejecutas un comando de CLI y el código fuente aterriza en tu proyecto como código tuyo, no como dependencia. Ochenta componentes, dieciséis categorías, y una decisión de diseño que condicionó todo lo demás.

El sitio que los muestra renderiza cada componente dentro de un panel que puedes arrastrar para redimensionar. Ese único detalle es la razón de que cada componente del repo exista dos veces.

## El panel que rompió el responsive

Este es el contenedor del preview, casi literal:

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

Dos paneles, el segundo con ancho cero. Ese truco merece robarse: un `ResizablePanelGroup` necesita dos hijos para darte un divisor arrastrable, así que un hermano de ancho cero convierte el grupo en un único borde derecho arrastrable sobre el primer panel.

Ahora arrastra ese borde hacia dentro. El componente se estrecha. Pero `sm:`, `md:` y `lg:` en Tailwind son media queries de viewport, y el viewport no ha cambiado — has redimensionado un `div`. Así que un componente escrito con `lg:grid-cols-3` sigue renderizando tres columnas a 320 píxeles de ancho, desbordando y recortándose, mientras el preview afirma alegremente que eso es lo que el componente hace en una pantalla pequeña.

El preview miente. Y un registry cuyos previews mienten es peor que no tener registry, porque la mentira es justo lo que la gente está evaluando antes de instalar.

Las container queries lo arreglan: `@container` en el wrapper y variantes `@sm:` / `@4xl:` dentro, y ya los breakpoints responden al panel en vez de a la ventana. Salvo que el componente que te envío a tu proyecto no está dentro de mi panel redimensionable. Está dentro de tu página, donde el viewport **sí** es lo correcto que medir.

Dos respuestas correctas distintas para el mismo componente.

## Escribirlo todo dos veces

La salida fue dejar de pretender que un archivo podía servir a ambos:

- `src/registry/components/<categoría>/<nombre>.tsx` — la copia que instalas. Breakpoints de viewport. Es lo que sirve la CLI y lo que renderiza a pantalla completa la ruta `/preview/[slug]`.
- `src/registry/example/<categoría>/<nombre>.tsx` — la demo embebida. Container queries, porque se renderiza dentro de ese panel `@container`.

Un barrel por categoría mapea un id del catálogo a cada uno:

```ts
export const heroComponentRegistry = {
  'hero-luxury': HeroDarkLuxury,
  'hero-bento': HeroBento,
  // …
}
```

y un objeto raíz junta los dieciséis barrels con spread, con el registry espejo al lado. Las búsquedas van por id de tipo string con un cast, así que una entrada de catálogo sin clave correspondiente falla en runtime y no en compilación — los dos sitios que la llaman manejan el `undefined`, pero ahí el sistema de tipos no está ayudando, y lo sé.

La disciplina se sostuvo mejor de lo que esperaba. Los ochenta archivos de example usan variantes de container query. Sólo dos archivos de componente las usan, y son deliberados. La regla cuajó.

La fuga fue en el otro sentido: treinta y uno de los ochenta archivos de example siguen llevando breakpoints de viewport **junto a** sus container queries. Inocuo dentro del panel — una media query que nunca hace match simplemente no hace nada — pero significa que un tercio de los espejos se convirtieron añadiendo variantes en vez de reemplazándolas, y la intención ahora es ambigua para quien los lea después.

## La parte que de verdad dolió

Los breakpoints nunca fueron el coste real. La deriva sí.

Dos archivos con el mismo nombre, sin fuente de verdad compartida, y nada que verifique que coinciden. `hero-luxury` es el ejemplo canónico. La copia instalable tiene una llamada a la acción secundaria que es un botón circular de icono:

```tsx
<Button size="lg" variant="outline" className="h-12 w-12 rounded-full p-0">
  <Play className="h-5 w-5" aria-hidden="true" />
  <span className="sr-only">{MOCK_DATA.secondaryCta.playSrOnly}</span>
</Button>
```

La copia de la demo no importa `Play` en absoluto. Su CTA secundaria es un botón outline con etiqueta que dice "Get More Info".

Así que lo que previsualizas no es lo que instalas. No es una diferencia de breakpoint — es un componente distinto llevando el mismo nombre. Y en este repo no hay suite de tests que lo detecte: ni runner, ni archivos de test, nada. Los raíles son `eslint --fix` y `tsc --noEmit` en un hook de pre-commit, que dejarán encantados que dos archivos divergan en contenido para siempre, porque los dos compilan.

Si volviera a empezar no escribiría dos archivos. Escribiría uno, aceptaría `breakpoint: 'viewport' | 'container'` como prop o como token de prefijo de clase, y generaría el segundo. La duplicación sólo es tolerable mientras es mecánica, y dejó de ser mecánica la primera vez que alguien mejoró un gemelo y no el otro.

## Una segunda lección, más barata de contar

Los componentes no tienen dependencias, a propósito. Revisé cada import de los ochenta: fuera de las primitivas locales de UI, `lucide-react`, `next/image`, `next/link`, `react` y un helper `cn`, hay exactamente **un** import externo en todo el conjunto — `embla-carousel-autoplay`. Instalar un componente no añade ninguna librería de runtime a tu proyecto. Esa restricción merecía imponerse y costó casi nada mantener.

Setenta y dos de ochenta también llevan sus propios datos mock como constante al principio del archivo en vez de aceptar props. Un archivo de reglas más antiguo del repo prohíbe exactamente eso. Ganó el código, y ganó por una buena razón: un componente de copiar y pegar tiene que renderizar en el momento en que aterriza en tu proyecto, antes de que hayas conectado nada. A veces la regla está equivocada y la deriva es el código diciéndotelo.

Y el aguijón final: el manifest de shadcn que hace instalables los componentes — `registry.json` — se mantiene a mano, separado del catálogo de ochenta entradas que alimenta el sitio. Nada genera uno a partir del otro. Ahora mismo declara **un** item. Todos los comandos de instalación que renderiza la UI, para los otros setenta y nueve componentes, apuntan a un JSON que no existe. CI ejecuta el build del registry en cada PR y pasa, porque construir un manifest de un solo item funciona.

Que es la lección de verdad, y no tiene nada que ver con container queries: todas las comprobaciones que **tenía** pasaban. Los tipos compilaban, el lint estaba limpio, el build funcionaba. Ninguna verificaba lo único que el producto existe para hacer.
