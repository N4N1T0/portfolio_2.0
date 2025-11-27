---
title: 'Search and AI: The Dream Team for an eCommerce Revenue Boost'
date: 2025-05-19
excerpt: 'Discover how integrating Orama.search with OpenAI embeddings transformed search UX and conversion for a personalized store'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/orama-search.webp'
imageAlt: 'Orama core logo'
counterpartId: 'es/habilidades-de-busqueda-de-orama-e-ia'
---

## 🧩 The Challenge: UX That Converts for Niche eCommerce

Our client runs a personalized padel t-shirt eCommerce site. They wanted:

- Faster and more relevant product search
- The ability to personalize empty state experiences
- Future integration with an AI chatbot

This wasn’t just about search — it was about **making intelligent UX part of conversion rate optimization (CRO).**

---

## 🚀 The Stack: Orama.search + OpenAI + Sanity

We chose [Orama.search](https://orama.dev) for its:

- Lightweight architecture and speed
- Native support for vector-based search (with OpenAI embeddings)
- Developer-friendly API (can be updated via REST, CLI, SDKs)

It let us go beyond standard search to implement **answer engine logic**, automations, and personalized search outputs — all while staying fully headless.

## 🔄 Dynamic Product Updates (Sanity + Cron + GROQ)

Instead of manually syncing product data to the vector database, we automated it with a cron job and a GROQ query from Sanity CMS:

```ts
// /api/update-orama-db.ts

const manager = new CloudManager({
  api_key: process.env.ORAMA_PRIVATE_API_KEY!
})
const indexManager = manager.index('xxxxxxxxxxxxxxxxx') // Remplace con tu ID de índice

export const GET = async () => {
  try {
    const products = await sanityClientRead.fetch(
      GET_ORAMA_PRODUCTS_FOR_UPDATING // Consulta GROQ de Sanity
    )

    await indexManager.update(products)
    await indexManager.deploy()

    return NextResponse.json('OK', { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred', details: error },
      { status: 500 }
    )
  }
}
```

💡 _Bonus: This system supports updates via CMS actions, CLI tools, or custom scripts._

---

## 🔍 The Search Page: UX Meets Relevance

Here's a snippet of how we used Orama to offer intelligent search with fallbacks:

```ts
const { search } = await searchParams // Next.js 15 searchParams

const oramaResponse = await oramaClient.search({
  term: search as string,
  mode: 'hybrid'
})

if (!oramaResponse) {
  log.error('Products not found', { oramaResponse })
}
```

💡 _Bonus: This same idea is used on the custom 404 page to search for related products_

---

We also leveraged past behavior and wishlist data to:

- Prioritize last-minute-viewed products
- Insert smart call-to-actions inside search result lists
- Suggest relevant bundles for quick checkout boosts

---

## 🎯 CRO Techniques Enabled

By combining AI-powered search with UX intelligence, we implemented:

✅ **Personalized 404/empty search pages**
✅ **Wishlist-based smart carousels**
✅ **Product slug disambiguation (typo handling)**
✅ **Search result re-ranking based on behavioral insights**

> These micro-improvements reduced bounce rate and nudged more sessions into purchase flow.

---

## 🧠 Why Orama Over Meilisearch/Typesense/Algolia?

- Open-source, lightweight and **cost-effective**
- Built-in support for **vector search + OpenAI embeddings**
- Native REST + CLI + SDK support for automation
- Developer-focused design and instant local setup

It gave us **AI-enhanced flexibility without the SaaS pricing headaches.**

---

## 🔮 What’s Next: AI Chatbot Integration

The next phase of this project will bridge Orama with OpenAI to create an in-site product assistant. It will:

- Guide users via chat toward relevant products
- Pull real-time insights from the search index
- Respond to wishlist/product queries

With Orama’s answer engine and embeddings already in place, this will be a smooth evolution.

---

## 💼 Want to Build Something Like This?

I help eCommerce brands implement intelligent UX with modern stacks — from search and chatbots to CRO and headless architectures.

👉 [Let’s Talk](https://www.adrian-alvarez.dev/en/contact) | [See More Projects](https://www.adrian-alvarez.dev/en/projects)
