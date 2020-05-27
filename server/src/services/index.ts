import EventsService from './EventsService'
import MarketsService from './MarketsService'
import OddsService from './OddsService'
import { betfairClient } from '../external/betting'

const eventsService = new EventsService(betfairClient)
const marketsService = new MarketsService(betfairClient)
const oddsService = new OddsService(betfairClient)

export {
  eventsService,
  marketsService,
  oddsService
}
