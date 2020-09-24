import express from 'express'
import { errorHandler } from './controllers/error-handler'
import { getEvents } from './controllers/events'
import { getMarketsByEvent } from './controllers/markets'
import { getOddsByMarket } from './controllers/odds'

const router = express.Router()

router.get('/events', errorHandler(getEvents))
router.get('/events/:id/markets', errorHandler(getMarketsByEvent))
router.get('/markets/:id/odds', errorHandler(getOddsByMarket))

export default router
