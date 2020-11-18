import { Event, Market, Runner, Price } from './types'

interface BettingClient {
  getPoliticsEvents: () => Promise<Event[]>
  getMarketsByEvent: (eventId: string) => Promise<Market[]>
  getRunnersByMarket: (marketId: string) => Promise<Runner[]>
  getPricesByMarket: (marketId: string) => Promise<Price[]>
}

export default BettingClient
