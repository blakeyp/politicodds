import DatabaseLoader from './DatabaseLoader'
import BettingRepository from '../repository/BettingRepository'
import { betfairClient } from '../external/betfair'

const databaseLoader = new DatabaseLoader(betfairClient, new BettingRepository())

;(async () => {
  // await databaseLoader.loadLatestOdds()
  await databaseLoader.loadHartlepoolByElectionOdds()
})().catch(e => {
  console.log(e)
})
