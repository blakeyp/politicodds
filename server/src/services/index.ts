import EventsService from './EventsService'
import MarketsService from './MarketsService'
import { betfairClient } from '../external/betting'

const eventsService = new EventsService(betfairClient)
const marketsService = new MarketsService(betfairClient)

export {
  eventsService,
  marketsService
}
