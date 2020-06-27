export type EventsResponse = Array<{
  event: {
    id: string
    name: string
    countryCode: string
  }
  marketCount: number
}>

export type MarketsResponse = Array<{
  marketId: string
  marketName: string
}>

export type RunnersResponse = Array<{
  marketId: string
  marketName: string
  runners: Array<{
    selectionId: number
    runnerName: string
  }>
}>

export type OddsResponse = Array<{
  marketId: string
  runners: Array<{
    selectionId: number
    ex: { availableToBack: Array<{ price: number }> }
  }>
}>
