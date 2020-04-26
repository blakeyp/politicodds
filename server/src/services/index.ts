import MarketsService from './MarketsService'
import { betfairClient } from '../external/betting'

const marketsService = new MarketsService(
  betfairClient
)

export {
  marketsService
}
