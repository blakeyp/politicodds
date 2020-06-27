import { BettingClient } from '../external/betting'
import { RunnerOdds } from '../domain/types'
import Odds from '../domain/Odds'

class OddsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getByMarket (marketId: string, limit?: number): Promise<RunnerOdds[]> {
    const runners = await this.bettingClient.getRunnersByMarket(marketId)
    const prices = await this.bettingClient.getPricesByMarket(marketId)

    // @Todo: encapsulate all logic in a RunnerOdds class incl. sort/slice (?)
    let runnerOdds: RunnerOdds[] = runners.map(runner => {
      const price = prices.find(r => r.runnerId === runner.id)?.price
      const odds = new Odds(price as number)
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
}

export default OddsService
