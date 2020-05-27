import { BettingClient } from '../external/betting'
import { RunnerOdds } from '../domain/types'
import Odds from '../domain/Odds'

class OddsService {
  constructor (
    private bettingClient: BettingClient
  ) {}

  async getByMarket (marketId: string): Promise<RunnerOdds[]> {
    const runners = await this.bettingClient.getRunnersByMarket(marketId)
    const prices = await this.bettingClient.getPricesByMarket(marketId)

    const runnerOdds: RunnerOdds[] = runners.map(runner => {
      const price = prices.find(r => r.runnerId === runner.id).price
      const odds = new Odds(price)
      return {
        runnerName: runner.name,
        odds: odds.toFractional(),
        probability: odds.toImpliedProbability()
      }
    })

    return runnerOdds
  }
}

export default OddsService
