import BettingClient from '../domain/BettingClient'
import { Market } from '../domain/types'

class MarketsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getByEvent (eventId: string): Promise<Market[]> {
    return await this.bettingClient.getMarketsByEvent(eventId)
  }
}

export default MarketsService
