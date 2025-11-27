---
title: 'How to Scrap Product for E-commerce with Sanity CMS and Cheerio'
date: 2025-03-06
excerpt: 'Discover how to scrap product from a WordPress site into Sanity CMS for an e-commerce store, using Cheerio, Heroku CORS Anywhere, and cron jobs.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/effect-of-mobile-apps-on-Consumer-and-Retailers--1024x538.webp'
imageAlt: 'Ecommerce and tech coming together'
counterpartId: 'en/how-to-scrap-product-for-ecommerce-with-sanity-cms-and-cheerio'
---

## Introduction

Building **e-commerce websites** has always been an exciting challenge for me, especially when working on high-stakes projects like selling cosmetics from a well-known brand. Recently, I was tasked with building an online store for a client who was an official distributor for a cosmetic brand called "Loreal." (just kidding) The project seemed straightforward at first, but **there was a twist** — I needed to automate the process of importing products directly into the **Sanity CMS** from an external **WordPress-based site**.

Having worked on many e-commerce websites, I’ve always embraced new challenges, but this one was unique. With a source website built in WordPress and a **public API** at hand, I saw an opportunity to create a seamless automation process that could save the client a lot of time and effort. In this post, I’ll walk you through how I approached the task, the tools I used, and how I built an automated product import system that checks all the right boxes: efficient, scalable, and low-maintenance.

## Scraping the Data

To kick things off, I needed to gather all the product information from the source website. Since the website was powered by WordPress, and the public API was exposed (be aware) the products’ names and links. At first glance, it seemed like an easy task: I could use a simple loop with search parameters like `per_page` and `page` to paginate through all the product listings.

```javascript
const API_URL = 'https://example.com/wp-json/wp/v2/products'

async function fetchAllProductLinks() {
  let allProductDetails = []
  let page = 1
  let products = []

  try {
    // Keep fetching as long as there are products in the response
    do {
      const response = await fetch(`${API_URL}?per_page=20&page=${page}`)
      products = response.data
      // Push an object containing both link and name to the result array
      allProductDetails = allProductDetails.concat(
        products.map((product) => ({
          link: product.link,
          name: product.name
        }))
      )
      page++
    } while (products.length > 0) // Stop if no products are returned

    return allProductDetails
  } catch (error) {
    console.error('Error fetching product links and names:', error)
  }
}
```

With this code, I was able to easily collect all the product links. But the real work started when I needed to scrape detailed information from each individual product page. That's where **Cheerio** came in.

Cheerio is a fast and lightweight library that mimics jQuery, making it perfect for scraping HTML content from a page. I used it to load each product page and extract key details, such as the product name, description, images, and more.

```javascript
const cheerio = require('cheerio')

async function scrapeProductDetails(url) {
  try {
    // this is a CORS proxy to bypass the CORS issue
    const { data } = await fetch(`https://cors-anywhere.herokuapp.com/` + url)
    const $ = cheerio.load(data)

    // Heres where you need to use your browser console skills to find the right selectors
    const productName = $('h1').text()
    const productDescription = $('meta[name="description"]').attr('content')
    const productImage = $('img.product-image').attr('src')

    return { productName, productDescription, productImage }
  } catch (error) {
    console.error('Error scraping product details:', error)
  }
}
```

Now that I had a way to scrape product details, I ran into a familiar problem — **CORS errors**. Since I was making requests from my server to an external API, the browser blocked the requests due to cross-origin restrictions. Fortunately, I was able to bypass this using `Heroku CORS Anywhere`, which acted as a proxy to resolve the CORS issue.

## Validating and Enriching the Data

At this point, I had most of the product details I needed, but there was one crucial piece of information still missing — the price. My client provided me with a PDF that contained the distributor’s pricing information. To make sure I had accurate data, I needed to cross-reference the prices with the ones in the PDF.

Here, I turned to **ChatGPT** to help me extract the necessary details from the PDF. With a bit of prompt engineering (an article coming soon), I was able to create a process that automatically extracted the product names, reference codes, and prices from the PDF.

## Integrating with Sanity CMS

With the product data now validated and enriched, it was time to push everything into **Sanity CMS**. I used the Sanity client’s `.createIfNotExists()` method to create product records only if they didn’t already exist. This method helped me avoid creating duplicates and ensured that I was always working with the most up-to-date product information.

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
    // there were a lot more fields but you get idea
    await client.createIfNotExists({
      name: product.name,
      productDescription: product.description,
      productImage: product.image
    })
  } catch (error) {
    console.error('Error creating product in Sanity:', error)
  }
}
```

However, I needed to make sure the Sanity mutations didn’t overload the server with too many requests. To address this, I used **p-limit**, a small library that limits the number of concurrent promises, ensuring I didn’t hit the rate limits.

```javascript
const pLimit = require('p-limit')
const limit = pLimit(5) // Limit to 5 concurrent requests

const productPromises = products.map((product) =>
  limit(() => createProductInSanity(product))
)

await Promise.all(productPromises)
```

## Sanity CMS

To make the process smoother for the client—the final user—I created a couple of Sanity Actions to streamline product management. One of these actions allows for **manual scraping** directly within the product document in Sanity CMS.

```javascript
export function findInfo(context) {
  const client = context.getClient({ apiVersion: '2022-11-29' })

  const asyncFindInfo = (props) => {
    const { published, draft } = props
    // in case the product is not published
    const slug = draft ? draft.slug : published ? published.slug : null

    return {
      label: 'Buscar Información',
      onHandle: async () => {
        try {
          if (!slug) {
            toast.error('Error: you must have a slug') // toast from sooner ❤
            return
          }

          const product = await fetch(
            `https://cors-anywhere.herokuapp.com/https://apple.com/${slug.current}/` // just kidding, ist not apple 🤣
          )

          await createProductInSanity(product)
        } catch (error) {
          toast.error('Error with scraping process')
        }
      }
    }
  }

  return asyncFindInfo
}
```

Integrating with Sanity CMS was simple and straightforward, making it easy to structure and manage the imported product data efficiently. and Voila!

```javascript
const defineConfig = require('sanity').defineConfig
const findInfo = require('./sanity/lib/actions').findInfo

export default defineConfig({
  // ... All the other config
  document: {
    actions: (prev, context) => {
      // if the document is of type product then add the action
      if (context.schemaType === 'product') {
        return [...prev, findInfo(context)]
      }
      return prev
    }
  }
})
```

## Automation

With the product data now successfully imported into Sanity CMS, I turned my attention to automating the entire process. To make sure the product catalog stayed up-to-date, I set up a **cron job** to run daily at 00:01 AM (its a good time to have server idle). This cron job would fetch the latest products from the WordPress API and automatically update the Sanity CMS.

```javascript
const cron = require('node-cron')
const pLimit = require('p-limit')

const limit = pLimit(5) // Adjust the concurrency limit

cron.schedule('0 1 * * *', async () => {
  try {
    const wpProducts = await fetchAllProductLinks() // Fetch WordPress product links
    const sanityProducts = await client.fetch(`*[_type == "product"]{ name }`)

    // Filter out products that are already in Sanity
    const newProducts = wpProducts.filter(
      (product) =>
        !sanityProducts.some(
          (sanityProduct) => sanityProduct.name === product.name
        )
    )

    if (newProducts.length === 0) {
      return
    }

    // Scrape and create products with concurrency control
    await Promise.all(
      newProducts.map((product) =>
        limit(async () => {
          try {
            const details = await scrapeProductDetails(product)
            await createProductInSanity(details)
          } catch (err) {
            console.error(`❌ Error creating product: ${product.name}`, err)
          }
        })
      )
    )
  } catch (err) {
    console.error('❌ Cron job failed:', err)
  }
})
```

I also set up **email notifications** to alert the client whenever new products were added (using Resend). This way, they always knew when the product catalog was updated without having to manually check.

## Conclusion

This project was a great example of how automation and smart integrations can dramatically improve the efficiency of product management for e-commerce websites. By combining Cheerio for scraping, Sanity CMS for content management, and Heroku CORS Anywhere to bypass CORS issues, I was able to create a streamlined process that kept the client’s product catalog up-to-date without requiring constant manual intervention.
