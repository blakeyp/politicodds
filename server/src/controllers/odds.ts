import { Request, Response } from 'express'
import { oddsService } from '../services'
import { parseLimit } from '../utils/query'

export const getOddsByMarket = async (req: Request, res: Response): Promise<void> => {
  const marketId = req.params.id
  const limit = parseLimit(req.query)

  const odds = await oddsService.getByMarket(marketId, limit)

  res.json(odds)
}

export const getOddsTimeseriesByMarket = async (req: Request, res: Response): Promise<void> => {
  const marketId = req.params.id
  // const limit = parseLimit(req.query)
  // let timeframe
  // if (req.query.timeStart && req.query.timeEnd) {
  //   timeframe = {
  //     start: req.query.timeStart as string,
  //     end: req.query.timeEnd as string
  //   }
  // }

  const odds = await oddsService.getTimeseriesByMarket(marketId)

  const mapped = odds.map(record => {
    const { runnerOdds } = record
    const odds: Record<string, number> = {}
    runnerOdds.forEach(runner => {
      odds[runner.runnerName] = runner.probability * 100
    })
    return {
      name: record.timestamp,
      ...odds
    }
  })
  console.log(mapped)

  res.json(mapped)
}
