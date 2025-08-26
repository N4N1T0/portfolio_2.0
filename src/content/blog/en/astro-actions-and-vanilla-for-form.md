---
title: 'Astro Actions and Vanilla JavaScript for Forms'
date: 2025-08-20
excerpt: 'Learn how to build powerful contact forms using Astro Actions API with server-side validation and vanilla JavaScript for smooth user experience.'
author: 'Adrian "Nano" Alvarez'
image: 'src/assets/blog/Forms & Actions.webp'
imageAlt: 'Astro Actions and Forms illustration'
counterpartId: 'en/astro-actions-and-vanilla-for-form'
---

One of the features I've been enjoying in Astro lately is the Actions API. It allows you to handle server logic (like form submissions) without spinning up a full backend or reaching for a heavy framework.

Here's how I used it to build a contact form that:

- Validates input on the server with astro:schema (powered by zod)
- Adds extra client + HTML validation for smoother UX
- Updates the UI with vanilla JavaScript using a Starwind UI Alert component

---

## 🗂️ Frontmatter vs Client-Side Scripts in Astro

The frontmatter (--- ... ---) in an Astro file is always server-side. You can't touch the DOM there. But inside the Astro component, you can add a `<script>` tag, and it works just like a classic browser script — with full DOM access and module imports if needed.

That's the trick: Actions run server-side, but you can wire up responses with client-side scripts.

## Example: Contact Form in Astro

```astro
// frontmatter: server-side only
import { buttonVariants } from '@/components/starwind/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/starwind/alert'

---

<section>
  <!-- Contact Form -->
  <div class="max-w-xl mx-auto p-6 bg-gray-50 rounded-xl shadow">
    <h3 class="mb-4 text-2xl font-bold">Contact Us</h3>

    <Alert id="form-status" class="mb-4 hidden" variant="success">
      <AlertTitle>Status</AlertTitle>
      <AlertDescription>Waiting...</AlertDescription>
    </Alert>

    <form id="contact-form" method="POST" class="space-y-4">
      <input id="name" name="name" type="text" required placeholder="Your name" />
      <input id="email" name="email" type="email" required placeholder="Your email" />
      <textarea id="message" name="message" required placeholder="Your message"></textarea>

      <button type="submit" class={buttonVariants({ size: 'lg' })}>Send</button>
    </form>

  </div>
</section>

<script>
  import { actions } from 'astro:actions'

  const form = document.querySelector('#contact-form')
  const status = document.querySelector('#form-status')

  form?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const { error, data } = await actions.contact(formData)

    if (error) {
      status.classList.remove('hidden')
      status.querySelector('h5').textContent = 'Error'
      status.querySelector('div').textContent = error.message
      return
    }

    if (data) {
      status.classList.remove('hidden')
      status.querySelector('h5').textContent = 'Message sent ✅'
      status.querySelector('div').textContent = 'Thanks! We'll be in touch soon.'
      form.reset()
    }
  })
</script>
```

## 1️⃣ Frontmatter (Server-Side Only)

```astro
import { buttonVariants } from '@/components/starwind/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/starwind/alert'

---
```

This block (`--- ... ---`) runs only on the server in Astro.
You can import components, utilities, or data here — but you can't touch the DOM.

## 2️⃣ The Markup (HTML + Components)

```astro
<section>
  <!-- Contact Form -->
  <div class='max-w-xl mx-auto p-6 bg-gray-50 rounded-xl shadow'>
    <h3 class='mb-4 text-2xl font-bold'>Contact Us</h3>

    <Alert id='form-status' class='mb-4 hidden' variant='success'>
      <AlertTitle>Status</AlertTitle>
      <AlertDescription>Waiting...</AlertDescription>
    </Alert>

    <form id='contact-form' method='POST' class='space-y-4'>
      <input
        id='name'
        name='name'
        type='text'
        required
        placeholder='Your name'
      />
      <input
        id='email'
        name='email'
        type='email'
        required
        placeholder='Your email'
      />
      <textarea id='message' name='message' required placeholder='Your message'
      ></textarea>

      <button type='submit' class={buttonVariants({ size: 'lg' })}>Send</button>
    </form>
  </div>
</section>
```

- Standard form fields: name, email, message.
- Each field uses HTML's built-in validation (`required`, `type="email"`).
- The button is styled with Starwind UI's `buttonVariants`.
- The Alert component is hidden by default (`hidden`).
- Later, when the form is submitted, this gets updated dynamically with success or error messages.

## 3️⃣ Client-Side Script (DOM Manipulation)

```javascript
<script>
  import { actions } from 'astro:actions'

  const form = document.querySelector('#contact-form')
  const status = document.querySelector('#form-status')

  form?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const { error, data } = await actions.contact(formData)

    if (error) {
      status.classList.remove('hidden')
      status.querySelector('h5').textContent = 'Error'
      status.querySelector('div').textContent = error.message
      return
    }

    if (data) {
      status.classList.remove('hidden')
      status.querySelector('h5').textContent = 'Message sent ✅'
      status.querySelector('div').textContent = 'Thanks! We'll be in touch soon.'
      form.reset()
    }
  })
</script>
```

This `<script>` runs in the browser, not on the server.

- Astro treats it like a classic JS script, but you can still import modules (actions).
- Here, we grab references to the form and the hidden status alert.
- Prevents default form submission (page reload).
- Converts the form into FormData.
- Calls the server-side contact action defined in Astro.
- If there's a validation or server error, it shows the Alert with the error message.
- If the action succeeds, the alert is updated with a success message.
- Finally, the form is cleared (`form.reset()`).

## ⚠️ Don't Forget SSR

If you want Actions to run, the page must be server-side rendered (SSR). In Astro, you can disable prerendering like this:

```astro
// at the top of your Astro page export const prerender = false
```

If you're deploying to Vercel, Netlify, or Node, your adapter will handle the rest.

---

## ✅ Why I Like This Approach

- **Lightweight** → Almost zero JS shipped, except a tiny script for DOM updates.
- **Safe** → Strong validation with zod on the server + extra checks in the client.
- **Flexible** → Works with Astro's philosophy but doesn't force a full framework.
- **Modern + Old School** → Server actions + vanilla DOM = best of both worlds.

---

## Conclusion

Astro Actions provide a perfect balance between modern server-side functionality and lightweight client-side interactions. By combining server-side validation with vanilla JavaScript, you can create robust, performant forms without the overhead of heavy frameworks.

This approach is particularly powerful for contact forms, newsletter signups, and other simple interactions where you want the benefits of server-side processing without sacrificing user experience.
