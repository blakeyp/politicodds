import { Request, Response } from 'express'
import { oddsService } from '../services'

export const getOddsByMarket = async (req: Request, res: Response): Promise<void> => {
  const marketId = req.params.id
  const odds = await oddsService.getByMarket(marketId)
  res.json(odds)
}
