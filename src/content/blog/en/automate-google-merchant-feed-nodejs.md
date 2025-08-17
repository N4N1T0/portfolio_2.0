---
title: 'Automate Your Product Feed in Google Merchant Center with Node.js'
date: 2025-08-17
excerpt: 'Learn how to sync your eCommerce store directly with Google Merchant Center using the Content API—no plugins, fully scalable.'
author: 'Adrian "Nano" Alvarez'
image: 'src/assets/blog/automate-google-merchant-feed-nodejs.png'
imageAlt: 'Illustration of product synchronization in Google Merchant Center'
counterpartId: 'es/automatiza-tu-feed-google-merchant-nodejs'
---

In **eCommerce**, having an updated feed in Google Merchant Center is **not optional**.
It’s crucial for your Shopping campaigns to run smoothly, for your products to be approved quickly, and for your advertising performance to stay consistent.

Many CMSs offer plugins for this task, but they are often:

❌ Limited
❌ Hard to customize
❌ Inefficient for projects with real business needs

As an eCommerce developer, I’ve faced this need many times.
The best solution I found was to go straight to the source: **Google Content API for Shopping**.

In this article, I’ll show you how to **automate your feed with Node.js**, without unnecessary plugins, in a scalable and fully controlled way.

---

## 🧱 Step 1: Authenticate with a Service Account

Google provides an official library to work with its APIs in Node.js: 👉 [`googleapis`](https://www.npmjs.com/package/googleapis)

The client we care about is **`@googleapis/content`**, which connects directly to Merchant Center.

### 🔑 What is a Service Account?

A **service account** is a technical identity within Google Cloud that allows you to access APIs without human intervention. Perfect for automated backend processes.

### ✅ How to create one

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and open your project.
2. Navigate to **"IAM & Admin" → "Service Accounts"**
3. Create a new account and assign the **Editor** role or a custom role with Content API permissions.
4. Download the **.json** credentials file.

### 🔐 Keep it secure

Never upload these credentials to Git!
Use **environment variables**:

```bash
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
GOOGLE_CLIENT_EMAIL=your-account@project.iam.gserviceaccount.com
MERCHANT_CENTER_ACCOUNT_ID=123456789
```

📌 To get your **MERCHANT_CENTER_ACCOUNT_ID**:
Go to Google Merchant Center, and at the top right (next to your profile picture), you’ll see your **Account ID**. That number is your `merchantId`.

### 🔒 Authenticate with GoogleAuth

```ts
import * as content from '@googleapis/content'

const authClient = new content.auth.GoogleAuth({
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  },
  scopes: [
    'https://www.googleapis.com/auth/content', // Full access to the Content API
    'https://www.googleapis.com/auth/cloud-platform' // Recommended by Google
  ]
})

const contentClient = content.content({
  version: 'v2.1',
  auth: authClient
})
```

The **scopes** define permissions:

- `content`: create, update, and delete products.
- `cloud-platform`: interoperability with other Google APIs.

---

## 🧩 Step 2: Insert or Update Products

The API provides two key methods:

- **`products.insert()`** → Create a new product (only once per `offerId`)
- **`products.update()`** → Update an existing product

⚠️ Using `insert` on an existing product will fail. Check if the product exists before calling it.

### 🛠️ Example Function

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
          ? { value: product.salePrice.toFixed(2), currency: 'EUR' }
          : undefined,
        link: `https://yoursite.com/product/${product.slug}`,
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
        canonicalLink: `https://yoursite.com/product/${product.slug}`
      }
    })

    return { success: true, product: updatedProduct }
  } catch (error: any) {
    console.error(`Error processing product ${product.id}:`, error)
    return {
      success: false,
      error: error.message,
      productId: product.id
    }
  }
}
```

📘 Full list of fields in the [official documentation](https://support.google.com/merchants/answer/7052112).

---

## 🔁 Step 3: Run Controlled Synchronization

Updating many products at once can cause **throttling** or network errors.
To prevent this, we use [`p-limit`](https://www.npmjs.com/package/p-limit), which limits concurrent promises.

```bash
npm install p-limit
```

### ⚙️ Example

```ts
import pLimit from 'p-limit'

const limit = pLimit(5)

const updateResults = await Promise.all(
  products.map((product) =>
    limit(() => updateProduct(product, contentClient, product.isNew))
  )
)
```

This ensures only **5 processes run at the same time**.

---

## 🎁 Bonus: Automate with a Daily Cron Job

Schedule syncs using **node-cron** or external services (EasyCron, GitHub Actions).

Example with **node-cron**:

```ts
import cron from 'node-cron'

cron.schedule('0 3 * * *', async () => {
  console.log('⏰ Updating products in Merchant Center...')
  await syncAllProducts()
})
```

This runs daily at **3:00 AM**.

---

## 🚀 Conclusion

By using the **Content API directly from Node.js**, you unlock a first-class integration:

✅ Fully customizable
✅ No limiting plugins
✅ Optimized for scale and performance
✅ Compatible with any CMS or backend
✅ Future-proof for growth

In a world where **automation makes the difference between selling or not**, this integration can be the key to taking your Shopping campaigns to the next level.
