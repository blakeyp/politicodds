import { Request, Response } from 'express'
import { marketsService } from '../services'

export const getMarketsByEvent = async (req: Request, res: Response): Promise<void> => {
  const eventId = req.params.id
  const markets = await marketsService.getByEvent(eventId)
  res.json(markets)
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getMarket = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  res.json({
    id,
    name: 'Market 1'
  })
}
