---
title: 'Integrating Redsys with Next.js 15 – Part 2'
date: 2025-03-21
excerpt: 'Learn how to handle payment notifications and improve performance when integrating Redsys with Next.js 15.'
author: 'Adrian "Nano" Alvarez'
image: 'src/assets/blog/pagos-redsys.webp'
imageAlt: 'Redsys Logo on a gray background'
counterpartId: 'es/introducion-a-redsys-en-nextjs-15-parte-2'
---

## Handling Payment Notifications Efficiently

### The Challenge: Asynchronous Bank Processes

When integrating Redsys with Next.js, one challenge is handling payment notifications effectively. The bank-to-bank transaction process can take time, and users shouldn’t have to wait indefinitely for confirmation. Payment gateways, including Redsys, handle transactions on the backend, which means your system must be capable of capturing and processing the payment status reliably.

Another common scenario occurs when a user completes the payment on the bank’s website but does not return to your website. In such cases, your system must still be able to finalize the order correctly.

Implementing Redsys Payment Notifications

Redsys provides a built-in notification URL to handle these situations. You can configure this URL in the payment request:

```tsx
const form = createRedirectForm({
  ...merchantInfo,
  // This URL is used by Redsys to send payment notifications to your server
  // It ensures that your backend receives transaction updates, even if the user does not return to your site
  DS_MERCHANT_MERCHANTURL: '/api/redsys/notification'
})
```

### Creating the Notification API

To handle payment notifications, you need an API route that processes Redsys' response.

```tsx
import type { ResponseJSONSuccess } from 'redsys-easy'
import { processRestNotification } from '@/lib/clients/redsys'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Extracts the Redsys notification parameters from request headers
  const notificationParams: ResponseJSONSuccess = {
    Ds_SignatureVersion: req.headers.get('Ds_SignatureVersion') as string,
    Ds_Signature: req.headers.get('Ds_Signature') as string,
    Ds_MerchantParameters: req.headers.get('Ds_MerchantParameters') as string
  }

  // Processes the notification and extracts relevant payment details
  const { Ds_Order: orderId, Ds_Response: responseCode } =
    processRestNotification(notificationParams)

  // Checks if the payment was successful (response code '0000' indicates success)
  if (responseCode === '0000') {
    console.info('Order successfully updated', { orderId, responseCode })
    return NextResponse.json({ success: true, message: 'Payment completed' })
  } else {
    return NextResponse.json({ success: false, message: 'Payment failed' })
  }
}
```

This function verifies the Redsys notification, extracts the order ID and response code, and updates the order status accordingly.

### Improving Performance with URL Parameters

Modern web applications rely heavily on state management, but in cases like Redsys transactions—where users leave the site and return—maintaining state can be difficult. A practical solution is to include key information within the URL.

For example, passing user-related data such as the user ID, address ID, products, and total amount in the redirect URL ensures you have everything needed to complete the order process once the user returns.

### Implementing a Payment Logic Function

Using Next.js server actions, you can define a function that structures the redirect URLs dynamically

```tsx
'use server'

const paymentLogic = async (
  paymentType: FormDataEntryValue | null,
  totalAmount: number,
  userId: string | string[] | undefined,
  products: CartItemType[],
  newAddress: string | string[] | undefined,
  discountCoupon: string
) => {
  // Generates a structured URL containing necessary payment details for redirection
  const templateRedirectUrl = (page: string, gateway: string = 'RedSys') => {
    return `${process.env.NEXT_PUBLIC_URL}/${page}?userId=${userId}&orderId=
    ${orderId}&gateway=${gateway}&newAddress=${newAddress}&discountCoupon=
    ${discountCoupon}&total=${totalAmount}&products=
    ${encodeURIComponent(JSON.stringify(products))}`
  }

  const form = createRedirectForm({
    ...merchantInfo,
    DS_MERCHANT_MERCHANTURL: templateRedirectUrl('api/redsys'),
    DS_MERCHANT_URLOK: templateRedirectUrl('success'), // This URL aims to the success page
    DS_MERCHANT_URLKO: templateRedirectUrl('failure') // This URL aims to the success page
    // All the rest info on the part 1
  })
}
```

## Conclusion

Handling asynchronous payment notifications and maintaining order data when users leave and return to your site are essential for a smooth Redsys integration. By configuring a notification URL and passing key parameters through URLs, you can ensure a reliable and seamless payment process in your Next.js 15 application.

If you haven’t already, check out [Part 1](https://www.adrian-alvarez.dev/en/blog/redsys-implementation-on-nextjs-15) where we cover setting up a Redsys client with all necessary functions!
