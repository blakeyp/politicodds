import { Event, Market } from './types'

interface BettingClient {
  getPoliticsEvents (): Promise<Event[]>
  getMarketsByEvent (eventId: string): Promise<Market[]>
  // getMarketDetails (marketId: string): Promise<MarketDetails>
  // getRunnersForMarket (marketId: string): Promise<Runner[]>
  // getOddsForMarket (marketId: string): Promise<Odds[]>
}

export default BettingClient
