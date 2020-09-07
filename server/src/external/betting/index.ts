import config from '../../config'
import { httpClient } from '../http'
import BettingClient from './BettingClient'
import BetfairClient from './betfair/BetfairClient'
import BetfairSession from './betfair/BetfairSession'

const betfairSession = new BetfairSession(httpClient)

const betfairClient = new BetfairClient(
  config.betfair.apiUrl,
  config.betfair.appKey,
  betfairSession,
  httpClient
)

export {
  BettingClient,
  betfairClient
}
