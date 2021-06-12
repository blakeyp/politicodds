import BettingClient from '../domain/BettingClient'
import { RunnerOdds, Runner, Timeframe, OddsTimeseries } from '../domain/types'
import Odds from '../domain/Odds'
import BettingRepository from '../repository/BettingRepository'

class OddsService {
  constructor (
    private bettingClient: BettingClient,
    private bettingRepository: BettingRepository
  ) {}

  async getByMarket (marketId: string, limit?: number): Promise<RunnerOdds[]> {
    const runners = await this.bettingClient.getRunnersByMarket(marketId)
    const prices = await this.bettingClient.getPricesByMarket(marketId)

    // @Todo: encapsulate all logic in a RunnerOdds class incl. sort/slice (?)
    let runnerOdds: RunnerOdds[] = prices.map(price => {
      const runner = runners.find(r => r.id === price.runnerId) as Runner
      const odds = new Odds(price.value)
      return {
        runnerName: runner.name,
        odds: odds.toFractional(),
        probability: odds.toImpliedProbability()
      }
    })

    // Sort by descending probability
    runnerOdds.sort((r1, r2) => (r1.probability < r2.probability) ? 1 : -1)

    if (limit) {
      runnerOdds = runnerOdds.slice(0, limit)
    }

    return runnerOdds
  }

  async getTimeseriesByMarket (marketId: string, limit?: number, timeframe?: Timeframe): Promise<OddsTimeseries[]> {
    const runnerPrices = await this.bettingRepository.readPrices(marketId, {
      start: '2021-03-25',
      end: '2021-05-07'
    })

    return runnerPrices.map((price) => ({
      timestamp: price.timestamp,
      runnerOdds: price.prices.map((p) => ({
        runnerName: p.runner,
        odds: new Odds(p.price).toFractional(),
        probability: new Odds(p.price).toImpliedProbability(),
      }))
    }))
  }
}

export default OddsService
