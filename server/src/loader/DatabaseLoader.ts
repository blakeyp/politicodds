import BettingClient from '../domain/BettingClient'
import { Market, Runner, Price } from '../domain/types'
import BettingRepository from '../repository/BettingRepository'
import * as repositoryTypes from '../repository/types'

class DatabaseLoader {
  constructor (
    private bettingClient: BettingClient,
    private bettingRepository: BettingRepository
  ) {}

  async loadHartlepoolByElectionOdds (): Promise<void> {
    const hartlepoolByElectionMarketId = '1.180699589'
    const timestamp = new Date().toISOString()

    const runners = await this.bettingClient.getRunnersByMarket(hartlepoolByElectionMarketId)
    const prices = await this.bettingClient.getPricesByMarket(hartlepoolByElectionMarketId)

    const data: repositoryTypes.Price[] = prices.map(p => ({
      runner: runners.find(r => r.id === p.runnerId)!.name,
      price: p.value
    }))

    await this.bettingRepository.insertPrices(hartlepoolByElectionMarketId, timestamp, data)
  }

  async loadLatestOdds (): Promise<void> {
    const timestamp = new Date().toISOString()

    // Get all markets
    const events = await this.bettingClient.getPoliticsEvents()
    const getMarketsPromises = events.map(event => this.bettingClient.getMarketsByEvent(event.id))
    const getMarketsResults = await Promise.allSettled(getMarketsPromises)
    const fulfilledResults: Market[][] = []
    getMarketsResults.forEach(result => {
      if (result.status === 'fulfilled') {
        fulfilledResults.push(result.value)
      } else {
        console.warn('Error retrieving markets for event:', result.reason)
      }
    })
    const markets = fulfilledResults.flat()

    // Get prices for each market
    const bulkPrices: repositoryTypes.BulkPrices[] = []
    for (const market of markets) {
      let runners: Runner[] = []
      let prices: Price[] = []
      try {
        runners = await this.bettingClient.getRunnersByMarket(market.id)
        prices = await this.bettingClient.getPricesByMarket(market.id)
      } catch (e) {
        console.warn(`Error retrieving runners prices for market ${market.id}:`, e)
      }
      if (runners.length > 0 && prices.length > 0) {
        const data: repositoryTypes.Price[] = prices.map(p => ({
          runner: runners.find(r => r.id === p.runnerId)!.name,
          price: p.value
        }))
        bulkPrices.push({
          marketId: market.id,
          data
        })
      }
    }

    // Insert prices
    await this.bettingRepository.bulkInsertPrices(timestamp, bulkPrices)
  }

  async readPrices (marketId: string): Promise<any> {
    await this.bettingRepository.readPrices(marketId, {
      start: '2021-01-01',
      end: '2022-01-01'
    })
  }
}

export default DatabaseLoader
