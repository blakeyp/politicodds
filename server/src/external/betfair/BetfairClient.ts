import HttpClient from '../http/HttpClient'
import BettingClient from '../../domain/BettingClient'
import { Event, Market, Runner, Price } from '../../domain/types'
import { EventsResponse, MarketsResponse, OddsResponse, RunnersResponse } from './types'
import { EventType, ApiMethod } from './enums'
import BetfairSession from './BetfairSession'

class BetfairClient implements BettingClient {
  constructor (
    private apiUrl: string,
    private appKey: string,
    private session: BetfairSession,
    private http: HttpClient
  ) {}

  async getPoliticsEvents (): Promise<Event[]> {
    const body = {
      filter: {
        eventTypeIds: [EventType.Politics]
      },
      maxResults: '1000'
    }

    const data: EventsResponse = await this.callApi(ApiMethod.listEvents, body)

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

    const data: MarketsResponse = await this.callApi(ApiMethod.listMarketCatalogue, body)

    const markets: Market[] = data.map(item => ({
      id: item.marketId,
      name: item.marketName
    }))

    return markets
  }

  async getRunnersByMarket (marketId: string): Promise<Runner[]> {
    const body = {
      filter: {
        marketIds: [marketId]
      },
      maxResults: '1',
      marketProjection: ['RUNNER_DESCRIPTION']
    }

    const data: RunnersResponse = await this.callApi(ApiMethod.listMarketCatalogue, body)

    const runners: Runner[] = data[0].runners.map(item => ({
      id: item.selectionId,
      name: item.runnerName
    }))

    return runners
  }

  async getPricesByMarket (marketId: string): Promise<Price[]> {
    const body = {
      marketIds: [marketId],
      priceProjection: {
        priceData: ['EX_BEST_OFFERS'],
        virtualise: true
      },
      orderProjection: 'EXECUTABLE',
      matchProjection: 'ROLLED_UP_BY_AVG_PRICE'
    }

    const data: OddsResponse = await this.callApi(ApiMethod.listMarketBook, body)

    // Map filtering out runners with no/unreliable price data
    const prices: Price[] = data[0].runners
      .flatMap(runner => {
        const backBets = runner.ex.availableToBack // May be empty list!
        // Results with fewer than 3 back prices tend to be unreliable so exclude them
        if (backBets.length < 3) {
          return []
        }
        const price = Math.max(...backBets.map(bet => bet.price))
        return [{
          runnerId: runner.selectionId,
          value: price
        }]
      })

    return prices
  }

  private async callApi (method: ApiMethod, body: object): Promise<any> {
    const url = `${this.apiUrl}/${method}/`
    const sessionToken = await this.session.getToken()
    const headers = {
      'X-Application': this.appKey,
      'X-Authentication': sessionToken.value,
      'Content-Type': 'application/json'
    }
    const response = await this.http.post(url, headers, body)
    return response.data
  }
}

export default BetfairClient
