import BettingClient, { Market } from './BettingClient'
import HttpClient from '../http/HttpClient'

// Betfair listMarketCatalogue response
// @Todo: Move somewhere more sensible
type MarketResponse = Array<{
  marketId: string
  marketName: string
}>

class BetfairClient implements BettingClient {
  constructor (
    private readonly apiUrl: string,
    private readonly appKey: string,
    private readonly sessionToken: string,
    private readonly http: HttpClient
  ) {}

  async getPoliticsMarkets (): Promise<Market[]> {
    const body = {
      filter: {
        eventTypeIds: ['2378961']
      },
      maxResults: '30'
    }

    const data: MarketResponse = await this.callApi('listMarketCatalogue', body)
    const markets = data.map(item => ({
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
