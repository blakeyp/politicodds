import BettingClient from './BettingClient'
import HttpClient from '../http/HttpClient'
import { Market, Event } from './types'

// Betfair responses
// @Todo: Move somewhere more sensible
type MarketsResponse = Array<{
  marketId: string
  marketName: string
  // ...
}>
type EventsResponse = Array<{
  event: {
    id: string
    name: string
    countryCode: string
    // ...
  }
  marketCount: number
}>

enum EventType {
  Politics = '2378961'
}

class BetfairClient implements BettingClient {
  constructor (
    private readonly apiUrl: string,
    private readonly appKey: string,
    private readonly sessionToken: string,
    private readonly http: HttpClient
  ) {}

  async getPoliticsEvents (): Promise<Event[]> {
    const body = {
      filter: {
        eventTypeIds: [EventType.Politics]
      },
      maxResults: '1000'
    }

    const data: EventsResponse = await this.callApi('listEvents', body)
    const events: Event[] = data.map(item => ({
      id: item.event.id,
      name: item.event.name,
      country: item.event.countryCode,
      numberOfMarkets: item.marketCount
    }))

    return events
  }

  async getMarketsByEvent (eventId: string): Promise<Market[]> {
    const body = {
      filter: {
        eventIds: [eventId]
      },
      maxResults: '1000'
    }

    const data: MarketsResponse = await this.callApi('listMarketCatalogue', body)
    const markets: Market[] = data.map(item => ({
      id: item.marketId,
      name: item.marketName
    }))

    return markets
  }

  private async callApi (method: any, body: object): Promise<any> {
    const url = `${this.apiUrl}/${method}/`
    const headers = {
      'X-Application': this.appKey,
      'X-Authentication': this.sessionToken,
      'Content-Type': 'application/json'
    }
    const response = await this.http.post(url, headers, body)
    return response.data
  }
}

export default BetfairClient
