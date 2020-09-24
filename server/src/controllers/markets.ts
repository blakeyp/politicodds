import { Request, Response } from 'express'
import { marketsService } from '../services'

export const getMarketsByEvent = async (req: Request, res: Response): Promise<void> => {
  const eventId = req.params.id
  const markets = await marketsService.getByEvent(eventId)
  res.json(markets)
}
