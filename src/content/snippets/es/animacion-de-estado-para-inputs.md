---
title: 'Animación del input según estado'
excerpt: 'Pequeña animación del input según valor inválido o válido'
preview: 'input-state-animation'
icon: 'code'
isNew: true
comingSoon: false
counterpartId: es/input-animation-on-state
---

Las animaciones pequeñas mejoran mucho la UX cuando se usan bien. Un patrón habitual es la **animación de "shake" en inputs inválidos** y un **feedback de éxito en inputs válidos**, que dan al usuario una señal visual rápida del estado del campo.

En este artículo implementaremos **animaciones ligeras y accesibles** usando **Tailwind y los estados `aria-invalid` y `aria-valid`**.

El objetivo:

- Disparar las animaciones **solo cuando el input pasa a inválido o válido**
- Mantener la implementación **accesible**
- Que las animaciones sean **eficientes**

---

## 1. Crear las animaciones

Define las animaciones dentro de `@layer utilities` para que encajen con tu setup de Tailwind.

**Shake (estado inválido):**

```css
@layer utilities {
  @keyframes shake-x {
    0%,
    100% {
      transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
      transform: translateX(-4px);
    }

    20%,
    40%,
    60%,
    80% {
      transform: translateX(4px);
    }
  }

  .aria-invalid\:animate-shake-x[aria-invalid='true'] {
    @apply border-destructive;
    animation: shake-x 0.5s ease-in-out;
  }
}
```

**Success pop (estado válido):**

```css
  @keyframes success-pop {
    0% {
      border-color: #d1fae5;
      box-shadow: 0 0 0px transparent;
    }
    50% {
      border-color: #22c55e;
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.5); /* resplandor verde suave */
    }
    100% {
      border-color: #22c55e;
      box-shadow: 0 0 0px transparent;
    }
  }

  .aria-valid\:animate-border-success[aria-valid='true'] {
    animation: success-pop 0.8s ease-out forwards;
  }
```

Estas animaciones son **ligeras** porque usan:

- `transform` y `box-shadow` (aptos para GPU)
- Duraciones cortas
- Ninguna propiedad que dispare layout

---

## 2. Usar atributos ARIA en lugar de clases de estado

En vez de clases propias como `error` o `invalid`, usamos **atributos ARIA**:

```html
aria-invalid="true"
aria-valid="true"
```

Estos atributos importan porque:

- **informan del estado a las tecnologías de asistencia**
- permiten **estilizar y animar según el estado de accesibilidad**

Ejemplo de componente input:

```tsx
<input
  type={type}
  data-slot="input"
  className={cn(
    "h-12 w-full rounded-lg border border-opacity-neutral-800-60 bg-opacity-neutral-white-6 px-4 py-3 text-base text-neutrals-white shadow-xs outline-none transition-[color,box-shadow]",
    "focus:border-primary-100",
    "aria-invalid:animate-shake-x",
    "aria-valid:animate-border-success",
    className
  )}
  {...props}
/>
```

Cuando el input es inválido:

```html
<input aria-invalid="true" />
```

Ocurrirá:

- borde rojo (`border-destructive`)
- animación de shake

Cuando el input es válido:

```html
<input aria-valid="true" />
```

Ocurrirá:

- animación success-pop (borde verde y resplandor suave)

Sin necesidad de clases de estado extra.

---

## 3. Por qué Tailwind necesita un empujón aquí

Tailwind soporta muchos variantes ARIA como:

```html
aria-invalid:border-red-500
```

Pero **las utilidades personalizadas no se reconocen automáticamente dentro de pseudo-selectores**.

Es decir, Tailwind no generará algo como:

```html
aria-invalid:animate-shake-x
aria-valid:animate-border-success
```

para tus animaciones a menos que **definas los selectores explícitamente** en tu CSS:

```css
.aria-invalid\:animate-shake-x[aria-invalid='true'] {
  @apply border-destructive;
  animation: shake-x 0.5s ease-in-out;
}

.aria-valid\:animate-border-success[aria-valid='true'] {
  animation: success-pop 0.8s ease-out forwards;
}
```

Con este pequeño trabajo extra sigues usando la **sintaxis de variantes de Tailwind** en tus componentes.

---

## 4. Beneficios de accesibilidad

Usar `aria-invalid` y `aria-valid` mejora la accesibilidad en varios aspectos.

Los lectores de pantalla pueden detectar si un input es inválido o válido y anunciarlo.

Ejemplo:

```html
<input aria-invalid="true" />
<input aria-valid="true" />
```

Las tecnologías de asistencia entienden el **estado del campo**.

Combinado con:

- `aria-describedby`
- mensajes de error o éxito inline

ofreces una **mejor experiencia a usuarios de teclado y lectores de pantalla**.

---

## 5. Rendimiento

Las animaciones no deberían penalizar el rendimiento.

Esta implementación es eficiente porque:

✔ El shake usa `transform` en lugar de `margin` o `left`
✔ El success pop usa `border-color` y `box-shadow` (composited)
✔ Las animaciones se ejecutan **solo cuando aparece el estado**
✔ Duran **menos de un segundo**

Evita animar propiedades como:

- `width`
- `height`
- `top/left`
- `margin`

Provocan recálculos de layout y pueden dar tirones.

`transform`, `opacity` y `box-shadow` son opciones más seguras.

---

## 6. Resultado final

Con esta configuración:

- el input **hace shake cuando es inválido** y muestra **borde rojo**
- el input **hace pop con resplandor verde cuando es válido**
- las animaciones son **aptas para GPU**
- el estado es **accesible**
- la API sigue **limpia y semántica**

Todo disparado por atributos ARIA:

```html
aria-invalid="true"
aria-valid="true"
```

---

✅ **Regla simple:**
Usa los atributos de accesibilidad como **ganchos de estado**, no solo para tecnología de asistencia.

Mejoran **UX y mantenibilidad**.
