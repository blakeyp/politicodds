import express from 'express'
import * as marketsController from './controllers/markets'

const router = express.Router()

router.get('/markets', marketsController.getAllMarkets)
router.get('/markets/:id', marketsController.getMarketById)

export default router
