import { BettingClient } from '../external/betting'
import { Market } from '../external/betting/types'

class MarketsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getByEvent (eventId: string): Promise<Market[]> {
    return this.bettingClient.getMarketsByEvent(eventId)
  }
}

export default MarketsService
