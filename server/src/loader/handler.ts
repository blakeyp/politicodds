import { ScheduledEvent, Context } from 'aws-lambda'

export default async (event: ScheduledEvent, context: Context): Promise<void> => {
  const time = new Date()
  console.log(`My cron function "${context.functionName}" ran at ${time.toISOString()}`)
}
