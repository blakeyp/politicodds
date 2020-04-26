import BettingClient, { Market } from '../external/betting/BettingClient'

class MarketsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getMarkets (): Promise<Market[]> {
    return this.bettingClient.getPoliticsMarkets()
  }
}

export default MarketsService
