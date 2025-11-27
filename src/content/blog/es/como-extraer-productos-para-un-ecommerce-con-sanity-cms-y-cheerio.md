---
title: 'Cómo Extraer Productos para un E-commerce con Sanity CMS y Cheerio'
date: 2025-03-06
excerpt: 'Descubre cómo extraer productos de un sitio de WordPress hacia Sanity CMS para una tienda en línea, utilizando Cheerio, Heroku CORS Anywhere y cron jobs.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/effect-of-mobile-apps-on-Consumer-and-Retailers--1024x538.webp'
imageAlt: 'El comercio electrónico y la tecnología juntos'
counterpartId: 'en/automate-product-imports-ecommerce-sanity-cheerio'
---

## Introducción

Construir **sitios web de comercio electrónico** siempre ha sido un desafío emocionante para mí, especialmente cuando trabajo en proyectos de alto impacto, como la venta de cosméticos de una marca reconocida. Recientemente, me encomendaron la tarea de crear una tienda en línea para un cliente que era distribuidor oficial de una marca de cosméticos llamada "Loreal" (es una broma 😆). El proyecto parecía sencillo al principio, pero **había un giro inesperado**: necesitaba automatizar el proceso de importación de productos directamente en **Sanity CMS** desde un sitio externo basado en **WordPress**.

Habiendo trabajado en muchos sitios de e-commerce, siempre he abrazado nuevos desafíos, pero este era único. Con un sitio fuente construido en WordPress y una **API pública** disponible, vi una oportunidad para crear un proceso de automatización que ahorraría mucho tiempo y esfuerzo al cliente. En esta publicación, te explicaré cómo abordé esta tarea, las herramientas que utilicé y cómo construí un sistema automatizado de importación de productos eficiente, escalable y de bajo mantenimiento.

## Extrayendo los Datos

Para comenzar, necesitaba recopilar toda la información de los productos desde el sitio fuente. Como estaba basado en WordPress y tenía una API pública expuesta (atención a esto), podía obtener los nombres y enlaces de los productos. A primera vista, parecía una tarea fácil: simplemente podría usar un bucle con parámetros de búsqueda como `per_page` y `page` para paginar a través de todas las listas de productos.

```javascript
const API_URL = 'https://example.com/wp-json/wp/v2/products'

async function fetchAllProductLinks() {
  let allProductDetails = []
  let page = 1
  let products = []

  try {
    do {
      const response = await fetch(`${API_URL}?per_page=20&page=${page}`)
      products = response.data
      allProductDetails = allProductDetails.concat(
        products.map((product) => ({
          link: product.link,
          name: product.name
        }))
      )
      page++
    } while (products.length > 0)

    return allProductDetails
  } catch (error) {
    console.error('Error obteniendo enlaces y nombres de productos:', error)
  }
}
```

Con este código, pude recopilar fácilmente todos los enlaces de productos. Pero el verdadero trabajo comenzó cuando necesite extraer información detallada de cada página de producto individual. Aquí es donde **Cheerio** entró en juego.

Cheerio es una biblioteca rápida y liviana que imita jQuery, lo que la hace perfecta para extraer contenido HTML de una página. La usé para cargar cada página de producto y extraer detalles clave, como el nombre del producto, descripción, imágenes y más.

```javascript
const cheerio = require('cheerio')

async function scrapeProductDetails(url) {
  try {
    const { data } = await fetch(`https://cors-anywhere.herokuapp.com/` + url)
    const $ = cheerio.load(data)

    const productName = $('h1').text()
    const productDescription = $('meta[name="description"]').attr('content')
    const productImage = $('img.product-image').attr('src')

    return { productName, productDescription, productImage }
  } catch (error) {
    console.error('Error extrayendo detalles del producto:', error)
  }
}
```

En este punto, tenía la mayor parte de los detalles de los productos, pero faltaba una pieza crucial de información: **el precio**. Mi cliente me proporcionó un PDF que contenía los precios de distribuidor. Para asegurarme de que los datos fueran precisos, necesitaba cruzar la información de los precios con la del PDF.

Aquí recurrí a **ChatGPT** para ayudarme a extraer los detalles necesarios del PDF. Con un poco de **ingeniería de prompts** (pronto escribiré un artículo sobre esto), pude crear un proceso que extraía automáticamente los nombres de los productos, códigos de referencia y precios del PDF.

## Integración con Sanity CMS

Con los datos validados y enriquecidos, era el momento de cargarlos en **Sanity CMS**. Utilicé el método `.createIfNotExists()` del cliente de Sanity para crear registros de productos sólo si no existían previamente. Esto me ayudó a evitar duplicados y asegurarme de que siempre trabajaba con la información más actualizada.

```javascript
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'your-project-id',
  dataset: 'production',
  token: 'your-token',
  useCdn: true
})

async function createProductInSanity(product) {
  try {
    await client.createIfNotExists({
      name: product.name,
      productDescription: product.description,
      productImage: product.image
    })
  } catch (error) {
    console.error('Error creando producto en Sanity:', error)
  }
}
```

Para evitar sobrecargar el servidor con demasiadas solicitudes, utilicé **p-limit**, una pequeña biblioteca que limita el número de promesas concurrentes, asegurando que no alcanzara los límites de peticiones.

```javascript
const pLimit = require('p-limit')
const limit = pLimit(5)

const productPromises = products.map((product) =>
  limit(() => createProductInSanity(product))
)

await Promise.all(productPromises)
```

## Automatización

Para asegurarme de que el catálogo de productos estuviera siempre actualizado, configuré un **cron job** que se ejecuta diariamente a las 00:01 AM.

```javascript
const cron = require('node-cron')
cron.schedule('0 1 * * *', async () => {
  console.log('Ejecutando proceso de actualización de productos...')
})
```

## Conclusión

Este proyecto demostró cómo la automatización y las integraciones inteligentes pueden mejorar significativamente la gestión de productos en e-commerce. Al combinar Cheerio para el scraping, Sanity CMS para la gestión de contenido y Heroku CORS Anywhere para evitar problemas de CORS, creé un proceso eficiente y automatizado.
