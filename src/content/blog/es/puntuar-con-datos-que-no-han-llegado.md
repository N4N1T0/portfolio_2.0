---
title: 'Puntuar una liga fantasy con datos que aún no han llegado'
date: 2026-09-09
excerpt: 'Una liga fantasy de música puntúa según el crecimiento en streaming de una API externa. Esa API es escasa, llega tarde y se corrige, y casi cada decisión del backend sale de ahí.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/scoring-on-data-that-has-not-arrived.png'
imageAlt: 'Portada oscura con el texto ''Scoring on data that has not arrived yet'' sobre una retícula técnica'
counterpartId: 'en/scoring-on-data-that-has-not-arrived'
---

Trabajé en una liga fantasy donde los jugadores son artistas musicales y los puntos vienen del crecimiento en streaming. Fichas diez artistas, seis titulares y cuatro en el banquillo, y te enfrentas a otro equipo en una ventana de tres días.

El dato de entrada viene de una API externa de analítica musical: cifras diarias de audiencia por canción. Que suena como la parte fácil, y es la razón de que exista casi toda decisión interesante del backend.

El dato del proveedor es **escaso** — faltan días, sin más. Llega **tarde** — los números de hoy aparecen mañana, a veces pasado. Y es **revisable** — una cifra que te dieron puede ser reemplazada por otra mejor después. Construye un marcador encima de eso de forma ingenua y tendrás una clasificación que cambia bajo los pies de la gente, que en un juego competitivo es lo único que no puedes lanzar.

## La puntuación es de segundo orden, y eso la hace frágil

La cadena del dato crudo a los puntos de un equipo tiene cinco saltos. Valor diario de audiencia por canción, luego el delta día a día, y luego — esta es la parte que importa — la *aceleración* de ese delta:

```ts
let growthRate = (currentGrowth / previousGrowth - 1) * 100;
let is_valid = true;

// Cap growth rate at 1000% and set is_valid to false if exceeded
if (growthRate > SCORE_GROWTH_RATE_MAX) {
  growthRate = SCORE_GROWTH_RATE_MAX;
  is_valid = false;
}
```

La puntuación diaria de un artista es la media de esa tasa entre sus diez canciones con más crecimiento, y la de un equipo es la suma sobre su alineación titular.

Puntuar sobre un cociente de dos deltas es una decisión de producto deliberada — premia a los artistas que **están despegando**, no a los que ya son enormes — y pone un denominador cercano a cero en el camino crítico. Así que hay guardas, y son del tipo interesante, porque cada una dobla las matemáticas por un motivo:

- No hay puntuación si los dos últimos días no tuvieron crecimiento positivo.
- Se salta entero cuando cualquiera de las dos cifras de crecimiento es exactamente cero.
- Se recorta al 1000%, pero **se conserva el valor y se marca** `is_valid = false` en vez de descartarlo. Una puntuación recortada sigue puntuando; sólo queda señalada como no fiable para análisis.

Ahí dentro hay una consecuencia que merece decirse en voz alta, porque tardé en verla: sólo los días con crecimiento **positivo** se almacenan como filas de crecimiento. Así que "el día anterior" de ese cociente es el anterior día **con crecimiento positivo**, no necesariamente ayer. Una caída no puntúa cero — se salta, y el artista se compara contra la última vez que subió. Es defendible, y tampoco es lo que nadie asumiría leyendo la fórmula.

## Rellenar huecos, y ascender sólo las conjeturas

Los días que faltan rompen del todo una métrica día a día. En vez de aceptar los huecos, el pipeline detecta la discontinuidad — el rango de calendario es más ancho que el número de muestras — e interpola con un spline de Akima, con suelo en cero, sin extrapolar más allá de ayer, y etiquetando la escritura para que la conjetura sea identificable para siempre:

```ts
const interpolator = createInterpolatorWithFallback('akima', xValues, yValues);
// …
const value = Math.max(interpolator(i), 0);
newMetrics.push({
  date: dateString,
  value: Math.round(value),
  origin: 'interpolator',
  tracking_metacode: 'interpolated',
  platform: metrics[0].platform,
});
```

La etiqueta es lo que hace posible lo siguiente, y es mi regla favorita del código:

```ts
if (existingMetricInDb.value !== metric.value &&
    existingMetricInDb.tracking_metacode === 'interpolated' &&
    metric.origin !== 'interpolator') {
  metricsToSave.push({ id: existingMetricInDb.id, /* … */ });
}
```

Un dato real que llega para un día interpolado **sobrescribe** la conjetura. Un dato real que contradice a otro dato real **se deja en paz**. Una conjetura puede ascender a hecho exactamente una vez, y un hecho nunca se degrada.

Esa única asimetría es lo que impide que el marcador oscile. Sin ella, cada revisión del proveedor reescribe la historia y el resultado de la semana pasada es provisional para siempre. Con ella, la historia converge: sólo puede volverse más cierta, y una vez cierta queda congelada.

## Dos fuentes de verdad por día, reconciliadas

El mismo problema aparece un nivel más arriba. Un enfrentamiento de tres días tiene días cerrados, un día en curso y días que no han empezado. La API original devolvía `null` como puntuación del enfrentamiento hasta que terminaba entero — técnicamente correcto, inútil en un producto cuya gracia es ver el partido desarrollarse.

La solución fue dejar de tratar "cerrado o nada" como la disyuntiva, y dar a cada día su propia regla de autoridad:

```ts
function computeDayScore(artists, storedScore, dayDate, today) {
  if (dayDate < today && storedScore != null) {
    return Number(storedScore);
  }
  return artists.reduce((acc, a) => acc + a.score, 0);
}
```

Los días pasados confían en el número congelado si existe. Hoy y el futuro se recalculan en vivo desde las puntuaciones diarias de artista. Los dos vuelven en el mismo campo, y un enum de estado — `final` / `trending` / `upcoming` — le dice al cliente cuál le tocó. El cliente pinta un número y nunca ramifica según la disponibilidad del dato.

Un detalle de esa lógica es fácil de pasar por alto y no debería: un día sólo se declara `final` cuando **ambos** equipos tienen puntuación almacenada. Un dato de un solo lado es un día `trending`, no uno cerrado. Es una guarda contra la vergüenza concreta de enseñarle a alguien un resultado final que luego se mueve porque los números de su rival aún no habían llegado.

## Alineaciones que recuerdan lo que fueron

Si un día pasado se puede releer, la alineación de ese día tiene que ser releíble también. Si no, metes un suplente el miércoles y el resultado del lunes pasado cambia en silencio.

Así que un cambio de alineación nunca muta una alineación. Las filas se identifican por `(team_id, artist_id, state, date)`, y no existe "la alineación actual" — la alineación actual son *las filas con la fecha más reciente no posterior al día por el que preguntas*:

```ts
const eligible = rosterEntries.filter((e) => e.team_id === teamId && e.date <= dayDate);
const latestDate = eligible.reduce((max, e) => (e.date > max ? e.date : max), eligible[0].date);
return eligible.filter((e) => e.date === latestDate);
```

Un cambio copia las filas de la fecha anterior hacia la fecha destino y voltea dos estados, todo dentro de una función de Postgres para que peticiones concurrentes no se entrelacen — y la fecha destino es siempre **mañana**. No puedes cambiar retroactivamente la alineación de un día por el que ya te están puntuando. El texto que ve el usuario lo dice con todas las letras: *"Los cambios se aplicarán mañana."*

Versionar una alineación por fecha cuesta más almacenamiento y más complejidad de consulta que una mutable, y compra exactamente una cosa: cualquier día pasado se puede recalcular y dará la misma respuesta que la primera vez. Con un proveedor que revisa datos, eso no es un lujo.

## Trabajos que preguntan cuánto llevan de retraso

La última pieza sale de la misma premisa. Un cron que asume que se ejecutó ayer está roto la primera vez que no lo hace.

El trabajo diario de puntuación no pregunta qué día es hoy. Pregunta cuánto lleva de retraso — lee la fecha de la última puntuación del artista, por defecto cinco días atrás si no hay ninguna, y si el hueco es de más de un día, abanica un cálculo por cada día que falta:

```ts
const lastScoreDate = lastScore ? dayjs(lastScore.date) : today.subtract(5, 'days');
if (today.diff(lastScoreDate, 'day') > 1) {
  let dateToProcess = lastScoreDate.add(1, 'day');
  while (dateToProcess.isBefore(today)) {
    scoresToInsertPromises.push(getArtistDailyScore(artist, dateToProcess));
    dateToProcess = dateToProcess.add(1, 'day');
  }
}
```

Con una restricción única sobre `(artist_id, date)` y un upsert masivo detrás, un día perdido se repara solo en la siguiente ejecución y una ejecución doble no cambia nada. Esa idempotencia es un patrón en todo el sistema — `ON CONFLICT DO NOTHING` al activar una liga y al copiar la alineación hacia delante, upserts sobre claves naturales, guardas de existencia alrededor de cada trabajo programado. El sistema está diseñado asumiendo que todo se va a reejecutar, porque todo acaba reejecutándose.

## Lo que le avisaría a quien construya esto

Tres cosas, en el orden en que muerden.

**Los fallos del proveedor necesitan su propia taxonomía.** Una respuesta no-OK de la API de analítica marca la canción como no rastreada y escribe el error en la fila. Eso está bien para "esta canción ya no existe" y muy mal para un 429 o un 5xx transitorio, que retiran una canción del catálogo en silencio. Hay constantes de backoff en el código y no se usan. Distinguir *desaparecido* de *no disponible ahora mismo* es el arreglo de mayor valor disponible.

**Todos los límites de fecha eran UTC, implícitamente.** `dayjs().format('YYYY-MM-DD')` sin plugin de zona horaria, en un runtime que es UTC, contra crons que son UTC. "Hoy", "la alineación de mañana", el día de arranque de la liga y el día de descanso semanal son todos días UTC. Para una audiencia estadounidense eso pone el cierre de alineaciones alrededor de las 8 de la tarde en la costa este — que puede ser exactamente lo que quieres, pero debería ser una decisión que alguien tomó y no un valor por defecto que nadie miró.

**Deja escrito qué números mandan, campo a campo, en el esquema.** La etiqueta de interpolación lo hace bien: una columna dice de dónde vino cada valor, y la regla de ascenso la lee. Los arrays congelados del enfrentamiento lo hacen peor, porque "esto está cerrado" se infiere de un chequeo de null en vez de declararse. Cuando dos sistemas pueden producir el mismo número, lo más barato que puedes hacer es registrar cuál lo produjo.
