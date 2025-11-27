---
title: 'Integrando Redsys con Next.js 15 – Parte 2'
date: 2025-03-21
excerpt: 'Aprende a manejar notificaciones de pago y mejorar el rendimiento al integrar Redsys con Next.js 15.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/pagos-redsys.webp'
imageAlt: 'Logotipo de Redsys sobre un fondo gris'
counterpartId: 'en/redsys-implementation-on-nextjs-15-part-2'
---

## Manejo Eficiente de Notificaciones de Pago

### El Desafío: Procesos Bancarios Asíncronos

Al integrar Redsys con Next.js, uno de los desafíos es gestionar correctamente las notificaciones de pago. El proceso de transacción entre bancos puede tardar un tiempo, y los usuarios no deberían esperar indefinidamente para recibir una confirmación. Los proveedores de pago, incluido Redsys, procesan las transacciones en el backend, lo que significa que tu sistema debe ser capaz de capturar y procesar el estado del pago de manera fiable.

Otro escenario común ocurre cuando un usuario completa el pago en el sitio web del banco pero no regresa a tu sitio web. En tales casos, tu sistema aún debe ser capaz de finalizar el pedido correctamente.

### Implementación de Notificaciones de Pago de Redsys

Redsys proporciona una URL de notificación integrada para manejar estas situaciones. Puedes configurar esta URL en la solicitud de pago:

```tsx
const form = createRedirectForm({
  ...merchantInfo,
  // Esta URL es utilizada por Redsys para enviar notificaciones de pago a tu servidor
  // Garantiza que tu backend reciba actualizaciones de la transacción, incluso si el usuario no regresa a tu sitio
  DS_MERCHANT_MERCHANTURL: '/api/redsys/notification'
})
```

### Creando la API de Notificación

Para manejar las notificaciones de pago, necesitas una ruta API que procese la respuesta de Redsys.

```tsx
import type { ResponseJSONSuccess } from 'redsys-easy'
import { processRestNotification } from '@/lib/clients/redsys'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Extrae los parámetros de notificación de Redsys desde los encabezados de la solicitud
  const notificationParams: ResponseJSONSuccess = {
    Ds_SignatureVersion: req.headers.get('Ds_SignatureVersion') as string,
    Ds_Signature: req.headers.get('Ds_Signature') as string,
    Ds_MerchantParameters: req.headers.get('Ds_MerchantParameters') as string
  }

  // Procesa la notificación y extrae los detalles relevantes del pago
  const { Ds_Order: orderId, Ds_Response: responseCode } =
    processRestNotification(notificationParams)

  // Verifica si el pago fue exitoso (el código de respuesta '0000' indica éxito)
  if (responseCode === '0000') {
    console.info('Pedido actualizado con éxito', { orderId, responseCode })
    return NextResponse.json({ success: true, message: 'Pago completado' })
  } else {
    return NextResponse.json({ success: false, message: 'Pago fallido' })
  }
}
```

Esta función verifica la notificación de Redsys, extrae el ID del pedido y el código de respuesta, y actualiza el estado del pedido en consecuencia.

### Mejorando el Rendimiento con Parámetros en la URL

Las aplicaciones web modernas dependen en gran medida de la gestión del estado, pero en casos como las transacciones con Redsys, donde los usuarios salen del sitio y regresan, mantener el estado puede ser complicado. Una solución práctica es incluir información clave dentro de la URL.

Por ejemplo, al pasar datos relacionados con el usuario, como el ID de usuario, ID de dirección, productos y monto total en la URL de redirección, garantizas que tienes todo lo necesario para completar el proceso de pedido una vez que el usuario regrese.

### Implementando una Función de Lógica de Pago

Utilizando acciones del servidor de Next.js, puedes definir una función que estructure dinámicamente las URLs de redirección:

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
  // Genera una URL estructurada que contiene los detalles necesarios del pago para la redirección
  const templateRedirectUrl = (page: string, gateway: string = 'RedSys') => {
    return `${process.env.NEXT_PUBLIC_URL}/${page}?userId=${userId}&orderId=
    ${orderId}&gateway=${gateway}&newAddress=${newAddress}&discountCoupon=
    ${discountCoupon}&total=${totalAmount}&products=
    ${encodeURIComponent(JSON.stringify(products))}`
  }

  const form = createRedirectForm({
    ...merchantInfo,
    DS_MERCHANT_MERCHANTURL: templateRedirectUrl('api/redsys'),
    DS_MERCHANT_URLOK: templateRedirectUrl('success'), // Esta URL apunta a la página de éxito
    DS_MERCHANT_URLKO: templateRedirectUrl('failure') // Esta URL apunta a la página de fallo
    // Toda la información restante en la parte 1
  })
}
```

## Conclusión

Manejar notificaciones de pago asíncronas y mantener los datos del pedido cuando los usuarios salen y regresan a tu sitio es esencial para una integración fluida de Redsys. Al configurar una URL de notificación y pasar parámetros clave a través de las URLs, puedes garantizar un proceso de pago confiable y sin interrupciones en tu aplicación Next.js 15.

Si aún no lo has hecho, revisa [Parte 1](https://www.adrian-alvarez.dev/es/blog/introducion-a-redsys-en-nextjs-15), donde cubrimos la configuración de un cliente Redsys con todas las funciones necesarias.
