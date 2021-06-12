import EventsService from './EventsService'
import MarketsService from './MarketsService'
import OddsService from './OddsService'
import { betfairClient } from '../external/betfair'
import BettingRepository from '../repository/BettingRepository'

const eventsService = new EventsService(betfairClient)
const marketsService = new MarketsService(betfairClient)
const oddsService = new OddsService(betfairClient, new BettingRepository())

export {
  eventsService,
  marketsService,
  oddsService
}
