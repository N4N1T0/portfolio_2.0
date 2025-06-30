---
title: 'Introducción a la Integración de Redsys con Next.js 15'
date: 2025-02-11
excerpt: 'Aprende cómo integrar Redsys con Next.js 15 para el procesamiento seguro de pagos utilizando Server Actions y el método de formulario de redirección.'
author: 'Adrian "Nano" Alvarez'
image: 'src/assets/blog/pagos-redsys.webp'
imageAlt: 'Logo de Redsys sobre un fondo gris'
counterpartId: 'en/redsys-implementation-on-nextjs-15'
---

Hoy en día, todos intentan ganar dinero en línea, ya sea a través de un SaaS, una tienda en línea u otros tipos de aplicaciones web. Si bien los procesadores de pago globales como Stripe y PayPal son comunes, diferentes países tienen sus propias plataformas de pago preferidas.

En España, prácticamente todas las transacciones bancarias en línea pasan por **Redsys**, una plataforma API basada en SOAP diseñada para facilitar y asegurar los pagos digitales dentro de la red bancaria española. Aunque Redsys es potente, también puede ser complicado de gestionar e implementar debido a sus requisitos de integración únicos.

En este tutorial, utilizaremos **Next.js 15** y **Server Actions** para crear un flujo de pago basado en redirección con Redsys. Al final, tendrás una implementación funcional que permite a los clientes completar pagos a través de Redsys con una configuración mínima.

---

## Configuración de Next.js 15 e Instalación de Redsys-Easy

Para comenzar, necesitamos configurar un nuevo proyecto de Next.js 15 e instalar las dependencias necesarias.

### **1. Inicializar un Proyecto de Next.js 15**

Ejecuta el siguiente comando para crear una nueva aplicación de Next.js 15:

```bash
npx create-next-app@latest mi-proyecto-redsys
cd mi-proyecto-redsys
```

### **2. Instalar Dependencias**

A continuación, instala `redsys-easy` para manejar las solicitudes y respuestas de pago de Redsys:

```bash
npm install redsys-easy
```

Con esta configuración completada, ¡ahora podemos pasar a implementar el flujo de pago!

---

## Configuración de Variables de Entorno

Antes de implementar el flujo de pago, necesitamos almacenar de manera segura nuestras credenciales sensibles proporcionadas por el banco o el cliente. Crea un archivo `.env.local` en la raíz de tu proyecto y agrega las siguientes variables:

```ini
REDSYS_MERCHANT_CODE=
REDSYS_TERMINAL=
REDSYS_SECRET_KEY=
```

Asegúrate de **no** prefijar estas variables con `NEXT_PUBLIC_`, ya que deben permanecer seguras en el lado del servidor.

---

## Creación del Cliente de Redsys

Hay varias formas de interactuar con la API de Redsys, pero por ahora, usaremos el método de **formulario de redirección**. Este enfoque genera un formulario HTML que redirige a los usuarios a una pasarela de pago segura alojada por Redsys, asegurando transacciones seguras.

Crea un nuevo archivo `src/lib/redsys.ts` y agrega lo siguiente

```ts
import { createRedsysAPI, SANDBOX_URLS, PRODUCTION_URLS } from 'redsys-easy'

export const { createRedirectForm, processRestNotification } = createRedsysAPI({
  secretKey: process.env.REDSYS_SECRET_KEY!,
  urls: SANDBOX_URLS
})
```

Aunque actualmente estamos utilizando `SANDBOX_URLS` para desarrollo, el paquete `redsys-easy` también incluye la variable `PRODUCTION_URL`, que se utilizará cuando estemos en producción. Por ahora, nos quedaremos con el entorno de sandbox durante el desarrollo.

- `createRedirectForm`: Genera un formulario que redirige a los usuarios a la pasarela de pago de Redsys.

- `processRestNotification`: Esto se usará más adelante para manejar las notificaciones de pago de Redsys.

---

## Creación de una Server Action para Pagos

Almacenaremos nuestras **Server Actions** dentro de la carpeta `src/actions`. Por ahora, creemos una Server Action simple para preparar la solicitud de pago.

### **1. Crear el Archivo de Server Action**

Dentro de src/actions, crea un nuevo archivo llamado payment.ts y agrega el siguiente código:

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

### **2. Agregar Constantes**

Ahora, definiremos algunas variables y constantes para llenar el formulario de redirección con la información más precisa posible. Aquí, agregamos las variables de entorno necesarias.

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

### **3. Funciones y Variables Auxiliares**

A continuación, necesitamos especificar el monto total como un número decimal para que el servidor de Redsys pueda procesarlo. También necesitamos extraer el código para la moneda "EUR" del objeto `CURRENCIES` utilizado por Redsys.

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

### **4. Crear el Formulario y Retornar**

Ahora, creamos el formulario para usar en el frontend. Las variables `DS_MERCHANT_URL` son muy importantes, ya que determinan a dónde se redirigirá al usuario después del pago, ya sea a una página de éxito (OK) o a una página de error (KO). Redsys agregará un código a la URL, que puedes usar para verificar la solicitud.

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

---

## Ahora en el Frontend

### **1. Obtener el Formulario de Redirección**

Puedes crear un formulario simple adjunto al checkout para activar la server action y obtener el `redirectForm` desde la server action.

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

### **2. La Parte Complicada**

Para la parte divertida, necesitas almacenar los datos devueltos desde la server action en un componente de formulario en blanco. Este formulario debe incluir tres entradas específicas: `Ds_SignatureVersion`, `Ds_MerchantParameters`, y `Ds_Signature`. Estas entradas recibirán valores del objeto `redirectForm.body`. Una vez que el formulario esté completo, se enviará automáticamente y hará una solicitud a la URL proporcionada por el servidor de Redsys, redirigiendo al usuario a la página de la pasarela de pago.

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

## **Conclusión**

En este tutorial, hemos integrado exitosamente **Redsys** con **Next.js 15** para crear un flujo de pago optimizado utilizando el método de **formulario de redirección**. Al aprovechar el poder de **Server Actions**, generamos eficientemente el formulario de pago necesario y redirigimos automáticamente al usuario a la pasarela de pago de Redsys.

Ahora tienes una implementación funcional de una pasarela de pago segura que se puede personalizar aún más con parámetros adicionales como información del comercio, idioma y tipos de transacción. Una vez que el usuario complete el pago, el servidor manejará la respuesta para una transacción exitosa o fallida.

Esta integración permite a las empresas que operan en España implementar fácilmente Redsys como su solución de pago, asegurando transacciones seguras y eficientes.

## **¿Qué Sigue?**

Mantente atento a la próxima actualización, donde compartiré un par de trucos para mejorar este flujo, mejorar el rendimiento y hacer que la integración sea aún más fluida para entornos de producción. ¡Estén atentos a las próximas mejoras!

## **Nota al Pie**

Un agradecimiento especial a [Javier Tury](https://github.com/javiertury) por el paquete **redsys-easy**, que simplifica enormemente la integración de Redsys con aplicaciones Node.js y Next.js.
