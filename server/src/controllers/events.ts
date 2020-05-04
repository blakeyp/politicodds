import { Request, Response } from 'express'
import { eventsService } from '../services'

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  const events = await eventsService.getAll()
  res.json(events)
}
