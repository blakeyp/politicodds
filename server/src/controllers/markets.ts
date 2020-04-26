import { Request, Response } from 'express'
import { marketsService } from '../services'

export const getAllMarkets = async (req: Request, res: Response): Promise<void> => {
  const markets = await marketsService.getMarkets()
  res.json(markets)
}

export const getMarketById = (req: Request, res: Response): void => {
  const id = req.params.id
  res.json({
    id,
    name: 'Market 1'
  })
}
