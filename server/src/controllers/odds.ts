import { Request, Response } from 'express'
import { oddsService } from '../services'
import { parseLimit } from '../utils/query'

export const getOddsByMarket = async (req: Request, res: Response): Promise<void> => {
  const marketId = req.params.id
  const limit = parseLimit(req.query)

  const odds = await oddsService.getByMarket(marketId, limit)

  res.json(odds)
}
