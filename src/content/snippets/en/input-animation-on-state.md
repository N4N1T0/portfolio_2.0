---
title: 'Input state animation'
icon: 'code'
isNew: true
---

Small animations can greatly improve UX when used correctly. One common pattern is the **“shake” animation on invalid inputs**, which gives users a quick visual signal that something went wrong.

In this article we’ll implement a **lightweight, accessible input shake animation** using **Tailwind + `aria-invalid` state**.

The goal:

- Trigger animation **only when the input becomes invalid**
- Keep the implementation **accessible**
- Ensure the animation is **performant**

---

## 1. Creating the Shake Animation

First, define a simple `shake-x` animation.

```css
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

.animate-shake-x {
  animation: shake-x 0.4s ease-in-out;
}

.aria-invalid\:animate-shake-x[aria-invalid='true'] {
  animation: shake-x 0.5s ease-in-out;
}
```

This animation is **very lightweight** because it uses:

- `transform`
- short duration
- no layout-triggering properties

Modern browsers can run `transform` animations on the **GPU**, which keeps them smooth and avoids layout recalculations.

---

## 2. Using `aria-invalid` Instead of Extra State Classes

Instead of adding custom state classes like `error` or `invalid`, we can rely on the **ARIA attribute**:

```html
aria-invalid="true"
```

This attribute is important because:

- it **communicates errors to assistive technologies**
- it allows us to **style based on accessibility state**

Example input component:

```tsx
<input
  type={type}
  data-slot="input"
  className={cn(
    "h-12 w-full rounded-lg border border-opacity-neutral-800-60 bg-opacity-neutral-white-6 px-4 py-3 text-base text-neutrals-white shadow-xs outline-none transition-[color,box-shadow]",
    "focus:border-primary-100",
    "aria-invalid:border-feedback-error-500",
    "aria-invalid:animate-shake-x",
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

- turn the border red
- play the shake animation

No extra state class needed.

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
```

for your custom animation unless you **explicitly define the selector**:

```css
.aria-invalid\:animate-shake-x[aria-invalid='true'] {
  animation: shake-x 0.5s ease-in-out;
}
```

This small workaround lets you keep using the **Tailwind variant syntax** in your components.

---

## 4. Accessibility Benefits

Using `aria-invalid` improves accessibility in several ways.

Screen readers can detect when an input is invalid and announce it to users.

Example:

```html
<input aria-invalid="true" />
```

Assistive technologies understand that the field **contains an error**.

Combined with:

- `aria-describedby`
- inline error messages

you create a **much better experience for keyboard and screen reader users**.

---

## 5. Performance Considerations

Animations should never hurt performance.

This implementation is efficient because:

✔ It uses `transform` instead of `margin` or `left`
✔ The animation runs only **when the invalid state appears**
✔ It lasts **less than half a second**

Avoid animating properties like:

- `width`
- `height`
- `top/left`
- `margin`

These trigger layout recalculations and can cause jank.

`transform` and `opacity` are the safest choices.

---

## 6. Final Result

With this setup:

- your input **shakes when invalid**
- the animation is **GPU-friendly**
- the state is **accessible**
- the API stays **clean and semantic**

All triggered by a single attribute:

```html
aria-invalid="true"
```

---

✅ **Simple rule:**
Use accessibility attributes as **state hooks**, not just for assistive tech.

They improve both **UX and maintainability**.
