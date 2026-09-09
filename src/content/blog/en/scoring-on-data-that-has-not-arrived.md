---
title: 'Scoring a fantasy league on data that has not arrived yet'
date: 2026-09-09
excerpt: 'A music fantasy league scores teams on streaming growth pulled from a third-party analytics API. That API is sparse, late and revisable, and almost every backend decision comes from it.'
author: 'Adrian "Nano" Alvarez'
image: '@/assets/blog/nordwood-themes-ubIWo074QlU-unsplash.webp'
imageAlt: 'A desk setup with music streaming analytics on screen'
counterpartId: 'es/puntuar-con-datos-que-no-han-llegado'
---

I worked on a fantasy league where the players are music artists and the points come from streaming growth. You draft ten artists, six start and four sit on the bench, and you go head-to-head against another team over a three-day window.

The scoring input comes from a third-party music-analytics API: daily audience figures per song. Which sounds like the easy part, and is the reason almost every interesting decision in the backend exists.

The vendor's data is **sparse** — days are simply missing. It is **late** — today's numbers show up tomorrow, sometimes the day after. And it is **revisable** — a figure you were given can be replaced by a better one later. Build a scoreboard on top of that naively and you get a leaderboard that changes under people's feet, which in a competitive game is the one thing you cannot ship.

## The score is second-order, which makes it fragile

The chain from raw data to a team's points has five hops. Daily audience value per song, then day-over-day delta, then — and this is the part that matters — the *acceleration* of that delta:

```ts
let growthRate = (currentGrowth / previousGrowth - 1) * 100;
let is_valid = true;

// Cap growth rate at 1000% and set is_valid to false if exceeded
if (growthRate > SCORE_GROWTH_RATE_MAX) {
  growthRate = SCORE_GROWTH_RATE_MAX;
  is_valid = false;
}
```

An artist's daily score is then the mean of that rate across their top ten songs by growth, and a team's daily score is the sum over its active roster.

Scoring on a ratio of two deltas is a deliberate product choice — it rewards artists who are *breaking out*, not artists who are already huge — and it puts a near-zero denominator on the critical path. So there are guards, and they are the interesting kind, because each one bends the maths for a reason:

- No score at all unless the last two days both had positive growth.
- Skip entirely when either growth figure is exactly zero.
- Cap at 1000%, but **keep the value and flag it** `is_valid = false` rather than discarding it. A capped score still scores; it is just marked as not trustworthy for analysis.

There is a consequence in there worth stating out loud, because it took me a while to see it: only days with *positive* growth are stored as growth rows at all. So "the previous day" in that ratio is the previous **positive-growth** day, not necessarily yesterday. A dip doesn't score zero — it's skipped, and the artist is compared against whenever they last went up. That is defensible, and it is also not what anyone would assume from reading the formula.

## Filling gaps, and only upgrading guesses

Missing days break a day-over-day metric completely. Rather than accept the holes, the pipeline detects a discontinuity — calendar span wider than the sample count — and interpolates across it with an Akima spline, clamped at zero, never extrapolating past yesterday, and tagged at write time so the guess is identifiable forever:

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

The tag is what makes the next part possible, and it is my favourite rule in the codebase:

```ts
if (existingMetricInDb.value !== metric.value &&
    existingMetricInDb.tracking_metacode === 'interpolated' &&
    metric.origin !== 'interpolator') {
  metricsToSave.push({ id: existingMetricInDb.id, /* … */ });
}
```

Real data arriving for a day that was interpolated **overwrites** the guess. Real data conflicting with real data is **left alone**. A guess can be promoted to a fact exactly once, and a fact is never demoted.

That single asymmetry is what stops the scoreboard from oscillating. Without it, every vendor revision rewrites history and last week's result is provisional forever. With it, history converges: it can only get more true, and once it's true it's frozen.

## Two sources of truth per day, reconciled

The same problem shows up one level higher. A three-day match has days that are settled, a day that is in progress, and days that haven't started. The original API returned `null` for a match's score until the whole thing was over — technically correct, useless in a product where the entire point is watching a match unfold.

The fix was to stop treating "settled or nothing" as the choice, and give each day its own authority rule:

```ts
function computeDayScore(artists, storedScore, dayDate, today) {
  if (dayDate < today && storedScore != null) {
    return Number(storedScore);
  }
  return artists.reduce((acc, a) => acc + a.score, 0);
}
```

Past days trust the frozen number if it exists. Today and the future are recomputed live from the daily artist scores. Both come back in the same field, and a status enum — `final` / `trending` / `upcoming` — tells the client which kind it got. The client renders one number and never branches on data availability.

One detail in that logic is easy to skip past and shouldn't be: a day is only called `final` when **both** teams have a stored score. One-sided data is a `trending` day, not a settled one. That is a guard against the specific embarrassment of showing someone a final result that later moves because their opponent's numbers hadn't landed yet.

## Rosters that remember what they were

If a past day can be re-read, the lineup for that day has to be re-readable too. Otherwise you swap a bench artist in on Wednesday and last Monday's result silently changes.

So a roster change never mutates a roster. Rows are keyed `(team_id, artist_id, state, date)`, and there is no "current roster" — the current roster is *the rows carrying the latest date not after the day you're asking about*:

```ts
const eligible = rosterEntries.filter((e) => e.team_id === teamId && e.date <= dayDate);
const latestDate = eligible.reduce((max, e) => (e.date > max ? e.date : max), eligible[0].date);
return eligible.filter((e) => e.date === latestDate);
```

A swap copies the previous date's rows forward to the target date and flips two states, both inside one Postgres function so concurrent requests can't interleave — and the target date is always **tomorrow**. You cannot retroactively change a lineup for a day you are already being scored on. The user-facing string says so in as many words: *"Changes will take effect tomorrow."*

Date-versioning a roster is more storage and more query complexity than a mutable one, and it buys exactly one thing: any past day can be recomputed and will produce the same answer it did the first time. Given a vendor that revises data, that isn't a nice-to-have.

## Jobs that ask how far behind they are

The last piece follows from the same premise. A cron job that assumes it ran yesterday is broken the first time it doesn't.

The daily score job doesn't ask what today is. It asks how far behind it is — read the artist's most recent score date, default to five days back if there is none, and if the gap is more than a day, fan out one computation per missing day:

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

With a unique constraint on `(artist_id, date)` and a bulk upsert behind it, a missed day repairs itself on the next run and a double run changes nothing. That idempotence is a pattern throughout — `ON CONFLICT DO NOTHING` on league activation and on the roster forward-copy, upserts keyed on natural keys, existence guards around every scheduled job. The system is designed on the assumption that everything will be re-run, because everything eventually is.

## What I'd flag to anyone building this

Three things, in the order they'd bite.

**The vendor's failures need their own taxonomy.** A non-OK response from the analytics API marks the song as untracked and writes the error into the row. That is right for "this song no longer exists" and badly wrong for a 429 or a transient 5xx, which silently retire a song from the catalogue. Backoff constants exist in the codebase and are unused. Distinguishing *gone* from *unavailable right now* is the highest-value fix available.

**Every date boundary was UTC, implicitly.** `dayjs().format('YYYY-MM-DD')` with no timezone plugin, in a runtime that is UTC, against cron schedules that are UTC. "Today", "tomorrow's roster", the league's start day and the weekly rest day are all UTC days. For a US audience that puts the roster lock somewhere around 8pm Eastern — which may be exactly what you want, but it should be a decision someone made rather than a default nobody noticed.

**Write down which numbers are authoritative, per field, in the schema.** The interpolation tag does this well: a column says where each value came from, and the upgrade rule reads it. The frozen match arrays do it less well, because "is this settled" is inferred from a null check rather than stated. When two systems can produce the same number, the cheapest thing you can do is record which one did.
