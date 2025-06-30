---
title: 'Introduction to Redsys Integration with Next.js 15'
date: 2025-02-11
excerpt: 'Learn how to integrate Redsys with Next.js 15 for secure payment processing using Server Actions and the redirect form method.'
author: 'Adrian "Nano" Alvarez'
image: 'src/assets/blog/pagos-redsys.webp'
imageAlt: 'Redsys Logo on a gray background'
counterpartId: 'es/introducion-a-redsys-en-nextjs-15'
---

Nowadays, everyone is trying to make money online—whether through a SaaS, an eCommerce store, or other types of web applications. While global payment processors like Stripe and PayPal are common, different countries have their own preferred payment platforms.

In Spain, practically all online banking transactions go through **Redsys**, a SOAP-based API platform designed to make digital payments within the Spanish banking network easier and more secure. While Redsys is powerful, it can also be challenging to manage and deploy due to its unique integration requirements.

In this tutorial, we will use **Next.js 15** and **Server Actions** to create a fast and efficient **redirect-based payment flow** with Redsys. By the end, you’ll have a functional implementation that allows customers to complete payments through Redsys with minimal setup.

---

## Setting Up Next.js 15 and Installing Redsys-Easy

To get started, we need to set up a new Next.js 15 project and install the necessary dependencies.

### **1. Initialize a Next.js 15 Project**

Run the following command to create a new Next.js 15 application:

```bash
npx create-next-app@latest my-redsys-project
cd my-redsys-project
```

### **2. Install Dependencies**

Next, install `redsys-easy` to handle Redsys payment requests and responses:

```bash
npm install redsys-easy
```

With this setup complete, we can now move on to implementing the payment flow!

---

## Configuring Environment Variables

Before implementing the payment flow, we need to securely store our sensitive credentials provided by the bank or client. Create a `.env.local` file in the root of your project and add the following variables:

```ini
REDSYS_MERCHANT_CODE=
REDSYS_TERMINAL=
REDSYS_SECRET_KEY=
```

Make sure **not** to prefix these variables with `NEXT_PUBLIC_` as they must remain secure on the server side.

---

## Creating the Redsys Client

There are multiple ways to interact with the Redsys API, but for now, we will use the **redirect form** method. This approach generates an HTML form that redirects users to a secure payment gateway hosted by Redsys, ensuring safe transactions.

Create a new file `src/lib/redsys.ts` and add the following:

```ts
import { createRedsysAPI, SANDBOX_URLS, PRODUCTION_URLS } from 'redsys-easy'

export const { createRedirectForm, processRestNotification } = createRedsysAPI({
  secretKey: process.env.REDSYS_SECRET_KEY!,
  urls: SANDBOX_URLS
})
```

Although we are currently using the `SANDBOX_URLS` for development, the `redsys-easy` package also includes the `PRODUCTION_URL` variable, which will be used when we go live. For now, we'll stick with the sandbox environment during development.

- `createRedirectForm`: Generates a form that redirects users to the Redsys payment gateway.
- `processRestNotification`: This will be used later to handle payment notifications from Redsys.

---

## Creating a Server Action for Payments

We will store our **Server Actions** inside the `src/actions` folder. For now, let's create a simple Server Action to prepare the payment request.

### **1. Create the Server Action File**

Inside `src/actions`, create a new file called `payment.ts` and add the following code:

```ts
'use server'

import {
  CURRENCIES,
  TRANSACTION_TYPES,
  randomTransactionId,
  LANGUAGES
} from 'redsys-easy'
import { createRedirectForm } from '@/lib/clients'

export async function initiatePayment(orderId: string, amount: number) {}
```

### **2. Add Constants**

Now, we'll define some variables and constants to populate the redirect form with the most accurate information possible. Here, we add the necessary environment variables.

```ts
'use server'

import { CURRENCIES, TRANSACTION_TYPES, randomTransactionId } from 'redsys-easy'
import { createRedirectForm } from '@/lib/clients'

const merchantInfo = {
  DS_MERCHANT_MERCHANTCODE: process.env.REDSYS_MERCHANT_CODE!, // Merchant code
  DS_MERCHANT_TERMINAL: process.env.REDSYS_TERMINAL!, // Terminal number
  DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION // '0' = Authorization
}
```

### **3. Helper Functions and Variables**

Next, we need to specify the total amount as a decimal number so that the Redsys server can process it. We also need to extract the code for the "EUR" currency from the `CURRENCIES` object used by Redsys.

```ts
'use server'
// ... other imports

import Decimal from 'decimal.js'

export async function initiatePayment(orderId: string, amount: number) {
  const currencyInfo = CURRENCIES['EUR']
  const redsysAmount = new Decimal(amount)
    .mul(10 ** currencyInfo.decimals)
    .toFixed(0)
  const redsysCurrency = currencyInfo.num
}
```

### **4. Create the Form and Return**

Now, we create the form to use on the frontend. The `DS_MERCHANT_URL` variables are very important as they determine where the user will be redirected after the payment—either to a success page (OK) or an error page (KO). Redsys will append a code to the URL, which you can use to verify the request.

```ts
export async function initiatePayment(orderId: string, amount: number) {
  const currencyInfo = CURRENCIES['EUR']
  const redsysAmount = new Decimal(amount)
    .mul(10 ** currencyInfo.decimals)
    .toFixed(0)
  const redsysCurrency = currencyInfo.num

  const form = createRedirectForm({
    ...merchantInfo,
    DS_MERCHANT_ORDER: orderId,
    DS_MERCHANT_AMOUNT: redsysAmount,
    DS_MERCHANT_CURRENCY: redsysCurrency,
    DS_MERCHANT_URLOK: `${process.env.NEXT_PUBLIC_URL}/exito`,
    DS_MERCHANT_URLKO: `${process.env.NEXT_PUBLIC_URL}/fallo`,
    DS_MERCHANT_TRANSACTIONDATE: new Date().toISOString()
  })

  return form
}
```

## Now on the Frontend

### **1. Obtain the Redirect Form**

You can create a simple form attached to the checkout to trigger the server action and obtain the `redirectForm` from the server action.

```tsx
import { initiatePayment } from '@/actions'

const CheckoutForm = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const orderId = formData.get('orderId') as string
    const amount = Number(formData.get('amount')) as number

    const redirectForm = await initiatePayment(orderId, amount)
    console.log(redirectForm)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Order ID' required />
      <input type='number' placeholder='Amount' required />
      <button type='submit'>Proceed to Payment</button>
    </form>
  )
}
```

### **2. The Tricky Part**

For the fun part, you need to store the data returned from the server action in a blank form component. This form must include three specific inputs: `Ds_SignatureVersion`, `Ds_MerchantParameters`, and `Ds_Signature`. These inputs will receive values from the `redirectForm.body` object. Once the form is completed, it will automatically submit and make a request to the URL provided by the Redsys server, redirecting the user to the payment gateway page.

```tsx
const CheckoutForm = () => {
  const [paymentForm, setPaymentForm] = React.useState<RedirectForm | null>(
    null
  )

  // Handle form logic and update paymentForm state here (not shown for brevity)

  return (
    <>
      {/* Initial form here */}
      <PaymentForm form={paymentForm} />
    </>
  )
}

const PaymentForm = ({ form }: { form: RedirectForm | null }) => {
  const formRef = React.useRef<HTMLFormElement | null>(null)

  React.useEffect(() => {
    // Automatically submit the form when the component mounts
    if (formRef.current && form) {
      formRef.current.submit()
    }
  }, [form])

  if (!form) {
    return null
  }

  return (
    <form id='paymentForm' ref={formRef} action={form?.url} method='POST'>
      <input
        type='hidden'
        name='Ds_SignatureVersion'
        value={form?.body.Ds_SignatureVersion}
      />
      <input
        type='hidden'
        name='Ds_MerchantParameters'
        value={form?.body.Ds_MerchantParameters}
      />
      <input
        type='hidden'
        name='Ds_Signature'
        value={form?.body.Ds_Signature}
      />
    </form>
  )
}
```

## **Conclusion**

In this tutorial, we've successfully integrated **Redsys** with **Next.js 15** to create a streamlined payment flow using the **redirect form** method. By leveraging the power of **Server Actions**, we efficiently generate the necessary payment form and automatically redirect the user to the Redsys payment gateway.

You now have a functional implementation of a secure payment gateway that can be customized further with additional parameters like merchant information, language, and transaction types. Once the user completes the payment, the server will handle the response for either a successful or failed transaction.

This integration allows businesses operating in Spain to easily implement Redsys as their payment solution, ensuring secure and efficient transactions.

## **What's Next?**

Stay tuned for the next update, where I'll share a couple of tricks to improve this flow, enhance performance, and make the integration even smoother for production environments. Keep an eye out for the upcoming enhancements!

### **Footnote**

A special thanks to [Javier Tury](https://github.com/javiertury) for the **redsys-easy** package, which greatly simplifies the integration of Redsys with Node.js and Next.js applications.
