import { ScheduledEvent, Context } from 'aws-lambda'
import DatabaseLoader from './DatabaseLoader'
import BettingRepository from '../repository/BettingRepository'
import { betfairClient } from '../external/betfair'

const databaseLoader = new DatabaseLoader(betfairClient, new BettingRepository())

export default async (event: ScheduledEvent, context: Context): Promise<void> => {
  const time = new Date()
  console.log(`Fetching odds at ${time.toISOString()}`)
  await databaseLoader.loadHartlepoolByElectionOdds()
  console.log('Finished')
}
