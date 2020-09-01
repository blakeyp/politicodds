import { Request, Response } from 'express'
import { ApplicationError } from './errors'

export const errorHandler = (handler: Function) => async (req: Request, res: Response) => {
  try {
    await handler(req, res)
  } catch (e) {
    console.error(e)
    if (e instanceof ApplicationError) {
      res.status(e.status).json({ message: e.message })
    }
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
