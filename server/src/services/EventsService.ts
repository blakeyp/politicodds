import BettingClient from '../domain/BettingClient'
import { Event } from '../domain/types'

class EventsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getAll (): Promise<Event[]> {
    return await this.bettingClient.getPoliticsEvents()
  }
}

export default EventsService
