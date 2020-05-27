import express from 'express'
import { getEvents } from './controllers/events'
import { getMarketsByEvent, getMarket } from './controllers/markets'
import { getOddsByMarket } from './controllers/odds'

const router = express.Router()

router.get('/events', getEvents)
router.get('/events/:id/markets', getMarketsByEvent)
router.get('/markets/:id', getMarket)
router.get('/markets/:id/odds', getOddsByMarket)

export default router
