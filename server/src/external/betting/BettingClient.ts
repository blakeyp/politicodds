import { Event, Market, Runner, Price } from './../../domain/types'

interface BettingClient {
  getPoliticsEvents (): Promise<Event[]>
  getMarketsByEvent (eventId: string): Promise<Market[]>
  // getMarketDetails (marketId: string): Promise<MarketDetails>
  getRunnersByMarket (marketId: string): Promise<Runner[]>
  getPricesByMarket (marketId: string): Promise<Price[]>
}

export default BettingClient
