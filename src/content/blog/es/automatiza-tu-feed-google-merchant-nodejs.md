---
title: 'Automatiza tu Feed de Productos en Google Merchant Center con Node.js'
date: 2025-08-17
excerpt: 'Aprende a sincronizar tu eCommerce directamente con Google Merchant Center usando la Content API, sin plugins y de manera escalable.'
author: 'Adrian "Nano" Alvarez'
image: 'src/assets/blog/automate-google-merchant-feed-nodejs.png'
imageAlt: 'Ilustración de sincronización de productos en Google Merchant Center'
counterpartId: 'en/automate-google-merchant-feed-nodejs'
---

En **eCommerce**, tener un feed actualizado en Google Merchant Center **no es opcional**.  
Es crucial para que tus campañas de Shopping funcionen, tus productos se aprueben rápidamente y tu rendimiento publicitario sea consistente.

Muchos CMS ofrecen plugins para esta tarea, pero suelen ser:

❌ Limitados  
❌ Difíciles de personalizar  
❌ Poco eficientes para proyectos con necesidades reales de negocio

Como desarrollador especializado en eCommerce, me he enfrentado muchas veces a esta necesidad.  
Y la mejor solución que encontré fue ir directo a la fuente: **Google Content API for Shopping**.

En este artículo te explico cómo **automatizar tu feed con Node.js**, sin plugins innecesarios, de forma escalable y totalmente controlada.

---

## 🧱 Paso 1: Autenticación con una cuenta de servicio

Google ofrece una librería oficial para trabajar con sus APIs desde Node.js: 👉 [`googleapis`](https://www.npmjs.com/package/googleapis)

Dentro de ella, el cliente que nos interesa es **`@googleapis/content`**, que conecta directamente con el Merchant Center.

### 🔑 ¿Qué es una cuenta de servicio?

Una **cuenta de servicio** es una identidad técnica dentro de Google Cloud que te permite acceder a sus APIs sin necesidad de intervención humana. Ideal para procesos automáticos y backend.

### ✅ Cómo crearla

1. Ve a [console.cloud.google.com](https://console.cloud.google.com) y entra en tu proyecto.
2. Dirígete a **"IAM y administración" → "Cuentas de servicio"**
3. Crea una nueva cuenta y asigna el rol **Editor** o uno personalizado con permisos de Content API.
4. Descarga el archivo **.json** con tus credenciales.

### 🔐 Guárdalo de forma segura

¡Nunca subas estas credenciales a Git!  
Usa **variables de entorno**:

```bash
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
GOOGLE_CLIENT_EMAIL=nombre-cuenta@proyecto.iam.gserviceaccount.com
MERCHANT_CENTER_ACCOUNT_ID=123456789
```

📌 Para obtener el **MERCHANT_CENTER_ACCOUNT_ID**:
Entra en Google Merchant Center y, en la parte superior derecha (junto a tu foto de perfil), verás tu **ID de cuenta**. Ese número es tu `merchantId`.

### 🔒 Autenticación con GoogleAuth

```ts
import * as content from '@googleapis/content'

const authClient = new content.auth.GoogleAuth({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  },
  scopes: [
    'https://www.googleapis.com/auth/content', // Acceso completo a la Content API
    'https://www.googleapis.com/auth/cloud-platform' // Recomendado por Google
  ]
})

const contentClient = content.content({
  version: 'v2.1',
  auth: authClient
})
```

Los **scopes** definen los permisos:

- `content`: crear, actualizar y eliminar productos.
- `cloud-platform`: interoperabilidad con otras APIs.

---

## 🧩 Paso 2: Insertar o actualizar productos

La API ofrece dos métodos clave:

- **`products.insert()`** → Crear un producto nuevo (solo 1 vez por `offerId`)
- **`products.update()`** → Actualizar un producto existente

⚠️ Usar `insert` sobre un producto ya existente dará error. Maneja esta lógica consultando si el producto ya existe antes de llamarlo.

### 🛠️ Función de ejemplo

```ts
import { content_v2_1 } from '@googleapis/content'

const updateProduct = async (
  product: any,
  contentClient: content_v2_1.Content,
  isNewProduct: boolean
) => {
  try {
    const method = isNewProduct ? 'insert' : 'update'

    const updatedProduct = await contentClient.products[method]({
      merchantId: process.env.MERCHANT_CENTER_ACCOUNT_ID,
      requestBody: {
        offerId: product.id,
        title: product.title,
        description: product.description,
        price: {
          value: product.price.toFixed(2),
          currency: 'EUR'
        },
        salePrice: product.salePrice
          ? {
              value: product.salePrice.toFixed(2),
              currency: 'EUR'
            }
          : undefined,
        link: `https://tusitio.com/producto/${product.slug}`,
        imageLink: product.imageUrl,
        additionalImageLinks: product.additionalImages || [],
        availability: product.stock > 0 ? 'in stock' : 'out of stock',
        condition: 'new',
        brand: product.brand,
        contentLanguage: 'es',
        targetCountry: 'ES',
        channel: 'online',
        gtin: product.gtin || null,
        mpn: product.mpn || null,
        identifierExists: !!product.gtin,
        googleProductCategory: product.googleCategory || null,
        productTypes: product.categories || [],
        salePriceEffectiveDate: product.salePrice
          ? '2025-03-01T23:00:00Z/2025-06-15T22:00:00Z'
          : null,
        pickupMethod: 'buy',
        canonicalLink: `https://tusitio.com/producto/${product.slug}`
      }
    })

    return { success: true, product: updatedProduct }
  } catch (error: any) {
    console.error(`Error al procesar producto ${product.id}:`, error)
    return {
      success: false,
      error: error.message,
      productId: product.id
    }
  }
}
```

📘 Lista completa de campos disponibles en la [documentación oficial](https://support.google.com/merchants/answer/7052112).

---

## 🔁 Paso 3: Ejecutar la sincronización controlada

Actualizar muchos productos de golpe puede causar **throttling** o errores de red.
Para evitarlo, usamos [`p-limit`](https://www.npmjs.com/package/p-limit), que limita el número de promesas concurrentes.

```bash
npm install p-limit
```

### ⚙️ Ejemplo

```ts
import pLimit from 'p-limit'

const limit = pLimit(5)

const updateResults = await Promise.all(
  products.map((product) =>
    limit(() => updateProduct(product, contentClient, product.isNew))
  )
)
```

Esto asegura que solo se ejecuten **5 procesos a la vez**.

---

## 🎁 Bonus: Automatiza con un cron job diario

Puedes programar la sincronización con **node-cron** o un servicio externo (EasyCron, GitHub Actions).

Ejemplo con **node-cron**:

```ts
import cron from 'node-cron'

cron.schedule('0 3 * * *', async () => {
  console.log('⏰ Actualizando productos en Merchant Center...')
  await syncAllProducts()
})
```

Esto correrá todos los días a las **3:00 AM**.

---

## 🚀 Conclusión

Al usar la **Content API directamente desde Node.js**, desbloqueas una integración de primer nivel:

✅ 100% personalizable
✅ Sin plugins limitantes
✅ Optimizado para escala y rendimiento
✅ Compatible con cualquier CMS o backend
✅ A prueba de crecimiento futuro

En un entorno donde la **automatización marca la diferencia entre vender o no**, este tipo de integración puede ser la clave que eleve tus campañas de Shopping a otro nivel.`
