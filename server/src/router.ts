import express from 'express'
import { getEvents } from './controllers/events'
import { getMarketsByEvent, getMarket } from './controllers/markets'

const router = express.Router()

router.get('/events', getEvents)
router.get('/events/:id/markets', getMarketsByEvent)
// router.get('/markets', getMarkets)
router.get('/markets/:id', getMarket)

export default router
