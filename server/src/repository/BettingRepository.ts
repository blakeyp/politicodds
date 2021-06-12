import AWS from 'aws-sdk'
import { Price, BulkPrices, Timeframe } from './types'
AWS.config.update({ region: 'eu-west-2' })

interface Item {
  marketId: string
  timestamp: string
  data: Price[]
}

class BettingRepository {
  constructor (
    private docClient = new AWS.DynamoDB.DocumentClient(),
    private tableName = 'politicodds'
  ) {}

  async insertPrices (marketId: string, timestamp: string, data: Price[]): Promise<void> {
    const writeParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: {
        marketId,
        timestamp,
        data
      }
    }
    await this.docClient.put(writeParams).promise()
  }

  async bulkInsertPrices (timestamp: string, bulkPrices: BulkPrices[]): Promise<void> {
    // Sequential inserts to mitigate sudden load on write capacity
    for (const prices of bulkPrices) {
      await this.insertPrices(prices.marketId, timestamp, prices.data)
    }
  }

  async readPrices (marketId: string, timeframe: Timeframe): Promise<Array<{ timestamp: string, prices: Price[] }>> {
    const queryParams: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: 'politicodds',
      KeyConditionExpression: 'marketId = :marketId and #timestamp between :time_start and :time_end',
      ExpressionAttributeNames: {
        '#timestamp': 'timestamp'
      },
      ExpressionAttributeValues: {
        ':marketId': marketId,
        ':time_start': timeframe.start,
        ':time_end': timeframe.end
      }
    }
    const results = await this.docClient.query(queryParams).promise()
    if (!results.Items) {
      throw new Error('empty results!')
    }
    const items = results.Items as Item[]
    return items.map((item) => ({
      timestamp: item.timestamp,
      prices: item.data
    }))
  }
}

export default BettingRepository
