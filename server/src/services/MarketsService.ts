import BettingClient, { Market } from '../external/betting/BettingClient'

class MarketsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getByEvent (eventId: string): Promise<Market[]> {
    return this.bettingClient.getMarketsByEvent(eventId)
  }
}

export default MarketsService
