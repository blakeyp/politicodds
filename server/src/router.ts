import express from 'express'
import eventsController from './controllers/events'

const router = express.Router()

router.get('/events', eventsController.get)

export default router
