import BettingClient, { Event } from '../external/betting/BettingClient'

class EventsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getAll (): Promise<Event[]> {
    return this.bettingClient.getPoliticsEvents()
  }
}

export default EventsService
