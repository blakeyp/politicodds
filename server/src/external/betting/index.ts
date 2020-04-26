import config from '../../config'
import BetfairClient from './BetfairClient'
import { httpClient } from '../http'

const betfairClient = new BetfairClient(
  config.betfair.apiUrl,
  config.betfair.appKey,
  config.betfair.sessionToken,
  httpClient
)

export {
  betfairClient
}
