import ContributionGraph from './ContributionGraph.astro'
import ContributionGraphBlock from './ContributionGraphBlock.astro'
import ContributionGraphCalendar from './ContributionGraphCalendar.astro'
import ContributionGraphFooter from './ContributionGraphFooter.astro'
import ContributionGraphLegend from './ContributionGraphLegend.astro'
import ContributionGraphTotalCount from './ContributionGraphTotalCount.astro'

export {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount
}

export { THEME, buildContributionGraph, formatTotalCount } from './graph'
export type {
  Activity,
  ContributionGraph as ContributionGraphData,
  ContributionGraphOptions,
  Labels,
  MonthLabel,
  Week
} from './graph'

export default {
  Root: ContributionGraph,
  Calendar: ContributionGraphCalendar,
  Block: ContributionGraphBlock,
  Footer: ContributionGraphFooter,
  TotalCount: ContributionGraphTotalCount,
  Legend: ContributionGraphLegend
}
