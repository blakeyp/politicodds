import BettingClient from '../BettingClient'
import HttpClient from '../../http/HttpClient'
import { Event, Market, Runner, Price } from '../../../domain/types'
import { EventsResponse, MarketsResponse, OddsResponse, RunnersResponse } from './types'
import { EventType, ApiMethod } from './enums'

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

    const prices: Price[] = data[0].runners.map(runner => {
      const backBets = runner.ex.availableToBack
      const price = Math.max(...backBets.map(bet => bet.price))
      return {
        runnerId: runner.selectionId,
        price
      }
    })

    return prices
  }

  private async callApi (method: ApiMethod, body: object): Promise<any> {
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
