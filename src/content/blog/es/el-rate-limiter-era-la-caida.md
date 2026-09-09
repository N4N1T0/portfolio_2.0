---
title: 'El rate limiter era la caída'
date: 2026-09-09
excerpt: 'Un rate limiter sobre KV en Cloudflare Workers escribía una clave por petición contra un free tier de 1.000 escrituras diarias. Al agotarse la cuota, lo que protegía la API la tumbaba.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/the-rate-limiter-was-the-outage.png'
imageAlt: 'Portada oscura con el texto ''The rate limiter was the outage'' junto a un medidor rojo agotándose'
counterpartId: 'en/the-rate-limiter-was-the-outage'
---

Llegó un correo a media mañana: la cuenta había consumido el 50% del límite diario del free tier de Workers KV. Las peticiones a la API de KV empezarían a devolver 429, y las operaciones dentro del Worker fallarían al cruzar el límite.

La aplicación es un marketplace de fotografía de stock — un monorepo de Turborepo con un storefront en Next.js, un panel de administración en Next.js y una API en Hono sobre Cloudflare Workers y D1. Nada en ella parecía una carga intensiva de KV. Ni capa de caché, ni escrituras de sesión por petición que pudiera nombrar. ¿Entonces por dónde se iba?

## Contar las operaciones

El free tier de Workers KV te da **100.000 lecturas al día y 1.000 escrituras**. Esos dos números están separados por tres órdenes de magnitud, y esa asimetría es toda la historia. Las lecturas son prácticamente gratis; las escrituras están a un redondeo de no existir.

La API tenía un rate limiter global montado sobre todas las rutas:

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

`rateLimitStore` era un store propio de `hono-rate-limiter` respaldado por KV. Su `increment` leía el contador actual y lo volvía a escribir. Una lectura y **una escritura en cada petición** a `/api/*`.

Mil escrituras al día son unas mil peticiones. Para toda la plataforma. Dos personas trasteando el panel de administración podían agotar la cuota diaria de una API en producción antes de comer, que es más o menos lo que pasó.

El comentario que había encima explicaba por qué se construyó así, y el razonamiento era bueno en su momento: el `MemoryStore` por defecto de `hono-rate-limiter` usa `setTimeout`, que el ámbito global de Workers prohíbe, y un contador por isolate se reinicia constantemente, así que el límite no se aplica de verdad. KV daba un contador compartido con TTL nativo. Resolvía un problema real. Sólo que eligió la única primitiva de almacenamiento cuya cuota gratuita no sobrevive a una escritura por petición.

## Lo que era peor que la factura

Este es el camino de escritura:

```ts
const write = async (key: string, counter: Counter) => {
  const remaining = Math.max(1, Math.ceil((counter.resetTime - Date.now()) / 1000));
  await kv.put(`${PREFIX}${key}`, JSON.stringify(counter), {
    expirationTtl: Math.max(60, Math.min(remaining, windowSeconds)),
  });
};
```

Sin try/catch. Nada por encima en el middleware lo tenía tampoco.

Así que al agotarse la cuota diaria, `kv.put` lanzaba, el middleware lanzaba, Hono lo convertía en excepción no capturada y **toda petición a la API respondía 500**. No las limitadas. Todas. El limiter iba primero en la cadena, así que nada aguas abajo llegaba a ejecutarse.

Lo que hace que valga la pena nombrar el modo de fallo con precisión: el rate limiter era un vector de denegación de servicio contra el servicio que existía para proteger, y ejercitarlo costaba mil peticiones desde una sola IP. Más barato que el ataque del que defendía.

Esa es la lección de verdad, y va más allá de KV: **una protección que falla cerrada es una caída con pasos extra.** Si un componente no puede medir el tráfico, no puede ser el componente que decide rechazarlo.

Había un segundo escritor. El propio rate limiter de better-auth estaba configurado con un `customStorage` que también escribía en KV, en cada petición a `/api/auth/*` — incluido `get-session`, que ambos frontends llaman en cada carga de página. Dos limiters encadenados, los dos facturando una escritura al endpoint más transitado de la aplicación.

## Sacar los contadores de KV

Cloudflare ofrece un binding de rate limiting cuyos contadores viven en el runtime de Workers. Sin KV, sin operación facturable, sin nada que agotar:

```toml
[[unsafe.bindings]]
name = "API_RATE_LIMIT"
type = "ratelimit"
namespace_id = "1001"
simple = { limit = 100, period = 60 }
```

El middleware que lo envuelve es deliberadamente aburrido, y falla abierto en las dos ramas:

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

Un binding sin enlazar devuelve `true` para que el desarrollo local siga funcionando. Un limiter que lanza devuelve `true` porque la alternativa es el bug que acababa de borrar. El test que más importa en ese archivo es el que afirma que un limiter **roto** deja pasar las peticiones.

`hono-rate-limiter` salió del `package.json`, y con él 121 líneas de store de KV.

## Lo que se pierde

Dos cosas, y las dos son reales.

**Los contadores son por centro de datos, no globales.** Quien reparta tráfico entre colos obtiene el límite configurado en cada uno. Es el precio de no pagar por petición, y sigue siendo una cota dura sobre cualquier origen individual — pero no es el contador globalmente consistente que daba KV.

**El periodo del binding es de 10 o 60 segundos.** La configuración anterior de better-auth tenía reglas por endpoint: cinco registros por diez minutos, tres recuperaciones de contraseña por diez minutos. Esas ventanas no se pueden expresar. Una regla de rate limiting de Cloudflare sobre la zona sí las expresa exactas, y corre antes incluso de invocar el Worker, lo cual es estrictamente mejor — sólo que es configuración de panel y no código, así que hay que recordarla en vez de revisarla.

Dividí el reemplazo en dos contadores en vez de uno: uno global de 100 por minuto, y otro más estrecho de 10 por minuto sobre sign-in, sign-up, recuperación de contraseña y segundo factor. Listado endpoint por endpoint a propósito en vez de cubrir todo `/auth/*`, porque `get-session` es la llamada más frecuente de la aplicación y una oficina detrás de un NAT comparte contador — un límite estrecho sobre todo `/auth` dejaría a un equipo entero sin poder ni navegar.

## Las lecturas, ya que estaba

Las sesiones se quedan en KV. Para eso están las 100.000 lecturas del free tier, y el `secondaryStorage` de better-auth es de lectura mayoritaria por diseño.

Pero cada petición lo leía, así que ahora `session.cookieCache` va delante:

```ts
betterAuth({
  // …
  session: {
    cookieCache: { enabled: true, maxAge: 60 },
  },
});
```

La sesión firmada viaja en la cookie durante un minuto, así que el caso común responde sin ninguna lectura de KV y el poco común sigue cayendo. El coste es obsolescencia — un baneo o un cambio de rol tarda hasta un minuto en verse — un intercambio que conviene hacer explícito en vez de descubrirlo después.

También bajé el `retry` de React Query de 3 a 1 en los dos frontends. Tres reintentos convierten una query fallida en cuatro peticiones, y reintentar un 429 es justo lo contrario de lo que pide un rate limit.

La nota que acabó en la documentación del proyecto es una línea: nunca metas un contador por petición en KV, y contrasta contra el presupuesto de escrituras cualquier cosa nueva que toque KV. El modelo de precios de una plataforma es parte de su superficie de API. Me enteré por una alerta de facturación.
