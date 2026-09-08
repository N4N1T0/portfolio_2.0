import type { Day as WeekDay } from 'date-fns'
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  formatISO,
  getDay,
  getMonth,
  getYear,
  nextDay,
  parseISO,
  subWeeks
} from 'date-fns'

export type Activity = {
  date: string
  count: number
  level: number
}

export type Week = Array<Activity | undefined>

export type Labels = {
  months?: string[]
  weekdays?: string[]
  totalCount?: string
  legend?: {
    less?: string
    more?: string
  }
}

export type MonthLabel = {
  weekIndex: number
  label: string
}

const DEFAULT_MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const DEFAULT_LABELS: Labels = {
  months: DEFAULT_MONTH_LABELS,
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  totalCount: '{{count}} activities in {{year}}',
  legend: {
    less: 'Less',
    more: 'More'
  }
}

/** Margin between the month labels and the first row of blocks. */
const LABEL_MARGIN = 8

/**
 * Level-to-fill mapping, applied through `data-level` so the blocks stay plain
 * markup and the theme lives entirely in classes.
 */
export const THEME = [
  'data-[level="0"]:fill-muted-foreground/5',
  'data-[level="1"]:fill-muted-foreground/20',
  'data-[level="2"]:fill-muted-foreground/40',
  'data-[level="3"]:fill-muted-foreground/60',
  'data-[level="4"]:fill-muted-foreground/80'
].join(' ')

const fillHoles = (activities: Activity[]): Activity[] => {
  if (activities.length === 0) {
    return []
  }

  // Sort activities by date to ensure correct date range
  const sortedActivities = [...activities].sort((a, b) =>
    a.date.localeCompare(b.date)
  )

  const calendar = new Map<string, Activity>(activities.map((a) => [a.date, a]))

  const firstActivity = sortedActivities[0] as Activity
  const lastActivity = sortedActivities.at(-1)

  if (!lastActivity) {
    return []
  }

  return eachDayOfInterval({
    start: parseISO(firstActivity.date),
    end: parseISO(lastActivity.date)
  }).map((day) => {
    const date = formatISO(day, { representation: 'date' })

    if (calendar.has(date)) {
      return calendar.get(date) as Activity
    }

    return {
      date,
      count: 0,
      level: 0
    }
  })
}

const groupByWeeks = (
  activities: Activity[],
  weekStart: WeekDay = 0
): Week[] => {
  if (activities.length === 0) {
    return []
  }

  const normalizedActivities = fillHoles(activities)
  const firstActivity = normalizedActivities[0] as Activity
  const firstDate = parseISO(firstActivity.date)
  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? firstDate
      : subWeeks(nextDay(firstDate, weekStart), 1)

  const paddedActivities = [
    ...(new Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
      undefined
    ) as Activity[]),
    ...normalizedActivities
  ]

  const numberOfWeeks = Math.ceil(paddedActivities.length / 7)

  return new Array(numberOfWeeks)
    .fill(undefined)
    .map((_, weekIndex) =>
      paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7)
    )
}

const getMonthLabels = (
  weeks: Week[],
  monthNames: string[] = DEFAULT_MONTH_LABELS
): MonthLabel[] => {
  return weeks
    .reduce<MonthLabel[]>((labels, week, weekIndex) => {
      const firstActivity = week.find((activity) => activity !== undefined)

      if (!firstActivity) {
        throw new Error(
          `Unexpected error: Week ${weekIndex + 1} is empty: [${week}].`
        )
      }

      const month = monthNames[getMonth(parseISO(firstActivity.date))]

      if (!month) {
        const monthName = new Date(firstActivity.date).toLocaleString('en-US', {
          month: 'short'
        })
        throw new Error(
          `Unexpected error: undefined month label for ${monthName}.`
        )
      }

      const prevLabel = labels.at(-1)

      if (weekIndex === 0 || !prevLabel || prevLabel.label !== month) {
        return labels.concat({ weekIndex, label: month })
      }

      return labels
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      const minWeeks = 3

      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks
      }

      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks
      }

      return true
    })
}

export type ContributionGraphOptions = {
  data: Activity[]
  blockMargin?: number
  blockRadius?: number
  blockSize?: number
  fontSize?: number
  labels?: Labels
  maxLevel?: number
  totalCount?: number
  weekStart?: WeekDay
}

/**
 * Everything the graph's parts need, computed once.
 *
 * The Preact version shared this through a React context; Astro components
 * render independently and have no context, so the caller builds this object
 * once and passes it to each part as a single `graph` prop.
 */
export type ContributionGraph = {
  data: Activity[]
  weeks: Week[]
  monthLabels: MonthLabel[]
  blockMargin: number
  blockRadius: number
  blockSize: number
  fontSize: number
  labels: Labels
  labelHeight: number
  maxLevel: number
  totalCount: number
  weekStart: WeekDay
  year: number
  width: number
  height: number
  isEmpty: boolean
}

export const buildContributionGraph = ({
  data,
  blockMargin = 4,
  blockRadius = 2,
  blockSize = 12,
  fontSize = 14,
  labels: labelsProp,
  maxLevel: maxLevelProp = 4,
  totalCount: totalCountProp,
  weekStart = 0
}: ContributionGraphOptions): ContributionGraph => {
  const maxLevel = Math.max(1, maxLevelProp)
  const weeks = groupByWeeks(data, weekStart)
  const labels = { ...DEFAULT_LABELS, ...labelsProp }
  const labelHeight = fontSize + LABEL_MARGIN

  const year =
    data.length > 0
      ? getYear(parseISO((data[0] as Activity).date))
      : new Date().getFullYear()

  const totalCount =
    typeof totalCountProp === 'number'
      ? totalCountProp
      : data.reduce((sum, activity) => sum + activity.count, 0)

  return {
    data,
    weeks,
    monthLabels: getMonthLabels(weeks, labels.months),
    blockMargin,
    blockRadius,
    blockSize,
    fontSize,
    labels,
    labelHeight,
    maxLevel,
    totalCount,
    weekStart,
    year,
    width: weeks.length * (blockSize + blockMargin) - blockMargin,
    height: labelHeight + (blockSize + blockMargin) * 7 - blockMargin,
    isEmpty: data.length === 0
  }
}

/** Renders the `{{count}}` / `{{year}}` template the labels carry. */
export const formatTotalCount = ({
  labels,
  totalCount,
  year
}: ContributionGraph) =>
  labels.totalCount
    ? labels.totalCount
        .replace('{{count}}', String(totalCount))
        .replace('{{year}}', String(year))
    : `${totalCount} activities in ${year}`
