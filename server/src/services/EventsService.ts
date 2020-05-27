import { BettingClient } from '../external/betting'
import { Event } from '../domain/types'

class EventsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getAll (): Promise<Event[]> {
    return this.bettingClient.getPoliticsEvents()
  }
}

export default EventsService
