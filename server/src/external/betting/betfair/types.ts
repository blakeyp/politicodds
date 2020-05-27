export type EventsResponse = Array<{
  event: {
    id: string
    name: string
    countryCode: string
  }
  marketCount: number
}>

export type MarketCatalogueResponse = Array<{
  marketId: string
  marketName: string
  runners?: Array<{
    selectionId: number
    runnerName: string
  }>
}>

export type MarketBookResponse = Array<{
  marketId: string
  runners: Array<{
    selectionId: number
    ex: { availableToBack: Array<{ price: number }> }
  }>
}>
