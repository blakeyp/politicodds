import config from '../../config'
import { httpClient } from '../http'
import BettingClient from './BettingClient'
import BetfairClient from './BetfairClient'

const betfairClient = new BetfairClient(
  config.betfair.apiUrl,
  config.betfair.appKey,
  config.betfair.sessionToken,
  httpClient
)

export {
  BettingClient,
  betfairClient
}
