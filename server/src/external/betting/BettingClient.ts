export interface Event {
  id: string
  name: string
  country?: string
  numberOfMarkets?: number
}

export interface Market {
  id: string
  name: string
}

interface MarketDetails extends Market {
  foo: string
}

interface Runner {
  id: string
  name: string
}

interface Odds {
  runnerId: string
  price: string
}

export default interface BettingClient {
  getPoliticsEvents (): Promise<Event[]>
  getMarketsByEvent (eventId: string): Promise<Market[]>
  // getMarketDetails (marketId: string): Promise<MarketDetails>
  // getRunnersForMarket (marketId: string): Promise<Runner[]>
  // getOddsForMarket (marketId: string): Promise<Odds[]>
}
