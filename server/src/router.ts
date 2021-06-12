// Linter is expecting void return on Promise<void> handlers
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { errorHandler } from './controllers/error/error-handler'
import { getEvents } from './controllers/events'
import { getMarketsByEvent } from './controllers/markets'
import { getOddsByMarket, getOddsTimeseriesByMarket } from './controllers/odds'

const router = express.Router()

router.get('/', (req, res) => res.send('Hello world! This API is running nicely!'))

router.get('/events', errorHandler(getEvents))
router.get('/events/:id/markets', errorHandler(getMarketsByEvent))
router.get('/markets/:id/odds', errorHandler(getOddsByMarket))

router.get('/markets/:id/odds/timeseries', errorHandler(getOddsTimeseriesByMarket))

export default router
