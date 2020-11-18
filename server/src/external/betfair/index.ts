import config from '../../config'
import { httpClient } from '../http'
import BetfairClient from './BetfairClient'
import BetfairSession from './BetfairSession'

const betfairSession = new BetfairSession(httpClient)

const betfairClient = new BetfairClient(
  config.betfair.apiUrl,
  config.betfair.appKey,
  betfairSession,
  httpClient
)

export {
  betfairClient
}
