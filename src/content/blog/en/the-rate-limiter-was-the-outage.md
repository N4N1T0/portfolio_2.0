---
title: 'The rate limiter was the outage'
date: 2026-09-09
excerpt: 'A KV-backed rate limiter on Cloudflare Workers wrote one key per request against a free tier of 1,000 writes a day. When the quota ran out, the thing protecting the API took it down.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/the-rate-limiter-was-the-outage.png'
imageAlt: 'Dark title card reading ''The rate limiter was the outage'' beside a draining red meter'
counterpartId: 'es/el-rate-limiter-era-la-caida'
---

An email arrived mid-morning: the account had used 50% of the daily Workers KV free-tier limit. Requests to the KV API would start returning 429s, and operations inside the Worker would fail once the limit was crossed.

The app is a photo-stock marketplace — a Turborepo monorepo with a Next.js storefront, a Next.js admin panel, and a Hono API on Cloudflare Workers over D1. Nothing in it looked like a KV-heavy workload. No caching layer, no session-per-request writes I could name. So where was it going?

## Counting the ops

Workers KV's free tier gives you **100,000 reads a day and 1,000 writes**. Those two numbers are three orders of magnitude apart, and that asymmetry is the whole story. Reads are effectively free; writes are a rounding error away from nothing.

The API had a global rate limiter mounted on every route:

```ts
app.use(
  "*",
  rateLimiter({
    windowMs: 60 * 1000,
    limit: 100,
    store: rateLimitStore,
    keyGenerator: (c) =>
      c.req.header("cf-connecting-ip") ?? c.req.header("x-forwarded-for") ?? "",
  }),
)
```

`rateLimitStore` was a custom `hono-rate-limiter` store backed by KV. Its `increment` read the current counter and wrote it back. One read and **one write on every single request** to `/api/*`.

A thousand writes a day is about a thousand requests. For the entire platform. Two people clicking around the admin panel could exhaust the daily quota of a production API before lunch, which is roughly what happened.

The comment above it explained why it had been built that way, and the reasoning was sound at the time: `hono-rate-limiter`'s default `MemoryStore` uses `setTimeout`, which the Workers global scope forbids, and a per-isolate counter resets constantly so the limit is not really enforced. KV gave a shared counter with native TTL. It solved a real problem. It just picked the one storage primitive whose free quota cannot survive a per-request write.

## The part that was worse than the bill

Here is the write path:

```ts
const write = async (key: string, counter: Counter) => {
  const remaining = Math.max(1, Math.ceil((counter.resetTime - Date.now()) / 1000));
  await kv.put(`${PREFIX}${key}`, JSON.stringify(counter), {
    expirationTtl: Math.max(60, Math.min(remaining, windowSeconds)),
  });
};
```

No try/catch. Nothing above it in the middleware had one either.

So once the daily quota ran out, `kv.put` threw, the middleware threw, Hono turned it into an unhandled exception, and **every request to the API answered 500**. Not the rate-limited ones. All of them. The limiter sat first in the chain, so nothing downstream ever ran.

Which makes the failure mode worth naming precisely: the rate limiter was a denial-of-service vector against the service it existed to protect, and the cost of exercising it was a thousand requests from a single IP. Cheaper than the attack it was defending against.

That is the actual lesson, and it generalises past KV: **a protection that fails closed is an outage with extra steps.** If a component cannot measure traffic, it must not be the component that decides to reject it.

There was a second writer too. better-auth's own rate limiter had been configured with a `customStorage` that also wrote to KV, on every request to `/api/auth/*` — including `get-session`, which both frontends call on every page load. Two limiters, chained, both billing a write to the busiest endpoint in the app.

## Getting the counters out of KV

Cloudflare ships a rate-limiting binding whose counters live in the Workers runtime. No KV, no billable operation, nothing to exhaust:

```toml
[[unsafe.bindings]]
name = "API_RATE_LIMIT"
type = "ratelimit"
namespace_id = "1001"
simple = { limit = 100, period = 60 }
```

The middleware around it is deliberately dull, and fails open on both branches:

```ts
async function isWithinLimit(limiter: RateLimit | undefined, key: string): Promise<boolean> {
  if (!limiter) {
    return true;
  }

  try {
    const { success } = await limiter.limit({ key });
    return success;
  } catch (error) {
    console.warn("[rate-limit] limiter unavailable, letting the request through", {
      error: String(error),
    });
    return true;
  }
}
```

An unbound binding returns `true` so local development keeps working. A throwing limiter returns `true` because the alternative is the bug I had just deleted. The test that matters most in that file is the one asserting a *broken* limiter still lets requests through.

`hono-rate-limiter` came out of `package.json`, and 121 lines of custom KV store went with it.

## What you give up

Two things, and both are real.

**The counters are per data centre, not global.** A caller spread across colos gets the configured limit in each one. That is the trade for not paying per request, and it is still a hard bound on any single source — but it is not the globally consistent counter KV was giving me.

**The binding's period is 10 or 60 seconds.** The old better-auth config had per-endpoint rules: five sign-ups per ten minutes, three password resets per ten minutes. Those windows cannot be expressed. A Cloudflare rate-limiting rule on the zone can express them exactly, and runs before the Worker is even invoked, which is strictly better — it is just dashboard configuration rather than code, so it has to be remembered rather than reviewed.

I split the replacement into two counters instead of one: a global 100-per-minute, and a tighter 10-per-minute on sign-in, sign-up, password recovery and the second factor. Deliberately listed endpoint by endpoint rather than covering all of `/auth/*`, because `get-session` is the busiest call in the app and an office behind one NAT shares a counter — a tight limit across all of `/auth` would lock a whole team out of simply browsing.

## The reads, while I was there

Sessions stay in KV. That is what the free tier's 100,000 reads are for, and better-auth's `secondaryStorage` is read-mostly by design.

But every request was reading it, so `session.cookieCache` now sits in front:

```ts
betterAuth({
  // …
  session: {
    cookieCache: { enabled: true, maxAge: 60 },
  },
});
```

The signed session travels in the cookie for a minute, so the common case answers with no KV read at all and the uncommon one still falls through. The cost is staleness — a ban or a role change takes up to a minute to be seen — which is a trade worth making explicit rather than discovering later.

I also dropped React Query's `retry` from 3 to 1 in both frontends. Three retries turn one failing query into four requests, and retrying a 429 is precisely what a rate limit is asking you not to do.

The note that went into the project's docs is one line: never put a per-request counter in KV, and check anything new that touches KV against the write budget. A platform's pricing model is part of its API surface. I found that out from a billing alert.
