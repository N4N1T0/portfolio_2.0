---
title: 'Input state animation'
excerpt: 'Small animation for input state in relation to invalid and valid values'
preview: 'input-state-animation'
icon: 'code'
isNew: true
comingSoon: false
counterpartId: es/animacion-de-estado-para-inputs
---

Small animations can greatly improve UX when used correctly. One common pattern is the **"shake" animation on invalid inputs** and a **success feedback on valid inputs**, which give users quick visual signals about the field state.

In this article we'll implement **lightweight, accessible input animations** using **Tailwind + `aria-invalid` and `aria-valid` states**.

The goal:

- Trigger animations **only when the input becomes invalid or valid**
- Keep the implementation **accessible**
- Ensure the animations are **performant**

---

## 1. Creating the Animations

Define the animations inside `@layer utilities` so they work with your Tailwind setup.

**Shake (invalid state):**

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

**Success pop (valid state):**

```css
  @keyframes success-pop {
    0% {
      border-color: #d1fae5;
      box-shadow: 0 0 0px transparent;
    }
    50% {
      border-color: #22c55e;
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.5); /* soft green glow */
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

These animations are **lightweight** because they use:

- `transform` and `box-shadow` (GPU-friendly)
- Short durations
- No layout-triggering properties

---

## 2. Using ARIA Attributes Instead of Extra State Classes

Instead of custom state classes like `error` or `invalid`, we rely on **ARIA attributes**:

```html
aria-invalid="true"
aria-valid="true"
```

These attributes are important because:

- they **communicate state to assistive technologies**
- they allow us to **style and animate based on accessibility state**

Example input component:

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

When the input becomes invalid:

```html
<input aria-invalid="true" />
```

It will:

- turn the border red (`border-destructive`)
- play the shake animation

When the input is valid:

```html
<input aria-valid="true" />
```

It will:

- play the success-pop animation (green border and soft glow)

No extra state classes needed.

---

## 3. Why Tailwind Needs Help Here

Tailwind supports many ARIA variants like:

```html
aria-invalid:border-red-500
```

However, **custom utility classes are not automatically recognized inside pseudo selectors**.

That means Tailwind won't generate something like:

```html
aria-invalid:animate-shake-x
aria-valid:animate-border-success
```

for your custom animations unless you **explicitly define the selectors** in your CSS:

```css
.aria-invalid\:animate-shake-x[aria-invalid='true'] {
  @apply border-destructive;
  animation: shake-x 0.5s ease-in-out;
}

.aria-valid\:animate-border-success[aria-valid='true'] {
  animation: success-pop 0.8s ease-out forwards;
}
```

This small workaround lets you keep using the **Tailwind variant syntax** in your components.

---

## 4. Accessibility Benefits

Using `aria-invalid` and `aria-valid` improves accessibility in several ways.

Screen readers can detect when an input is invalid or valid and announce it to users.

Example:

```html
<input aria-invalid="true" />
<input aria-valid="true" />
```

Assistive technologies understand the **field state**.

Combined with:

- `aria-describedby`
- inline error or success messages

you create a **much better experience for keyboard and screen reader users**.

---

## 5. Performance Considerations

Animations should never hurt performance.

This implementation is efficient because:

✔ The shake uses `transform` instead of `margin` or `left`
✔ The success pop uses `border-color` and `box-shadow` (composited)
✔ Animations run only **when the state appears**
✔ They last **less than a second**

Avoid animating properties like:

- `width`
- `height`
- `top/left`
- `margin`

These trigger layout recalculations and can cause jank.

`transform`, `opacity`, and `box-shadow` are safer choices.

---

## 6. Final Result

With this setup:

- your input **shakes when invalid** and shows a **red border**
- your input **pops with a green glow when valid**
- the animations are **GPU-friendly**
- the state is **accessible**
- the API stays **clean and semantic**

All triggered by ARIA attributes:

```html
aria-invalid="true"
aria-valid="true"
```

---

✅ **Simple rule:**
Use accessibility attributes as **state hooks**, not just for assistive tech.

They improve both **UX and maintainability**.
