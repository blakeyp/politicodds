import OddsService from '../../src/services/OddsService'
import BettingClient from '../../src/domain/BettingClient'

describe('Odds service', () => {
  const mockMarketId = 'mockMarketId'
  const mockBettingClient: Partial<BettingClient> = {
    getRunnersByMarket: jest.fn(async () => await Promise.resolve([
      { id: 1, name: 'Runner 1' },
      { id: 2, name: 'Runner 2' },
      { id: 3, name: 'Runner 3' },
      { id: 4, name: 'Runner with no price data' }
    ])),
    getPricesByMarket: jest.fn(async () => await Promise.resolve([
      { runnerId: 2, value: 1.25 },
      { runnerId: 1, value: 2 },
      { runnerId: 3, value: 100 }
    ]))
  }

  const oddsService = new OddsService(mockBettingClient as any)

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getByMarket', () => {
    test('returns ordered list of runner odds for the given market id, sorted by probability', async () => {
      const result = await oddsService.getByMarket(mockMarketId)

      expect(mockBettingClient.getRunnersByMarket).toHaveBeenCalledWith(mockMarketId)
      expect(mockBettingClient.getPricesByMarket).toHaveBeenCalledWith(mockMarketId)
      expect(result).toStrictEqual([
        {
          runnerName: 'Runner 2',
          odds: '1/4',
          probability: 0.8
        },
        {
          runnerName: 'Runner 1',
          odds: 'EVENS',
          probability: 0.5
        },
        {
          runnerName: 'Runner 3',
          odds: '100/1',
          probability: 0.01
        }
      ])
    })

    test('returns only top X results when limit param is provided', async () => {
      const mockLimit = 2

      const result = await oddsService.getByMarket('mockMarketId', mockLimit)

      expect(result).toHaveLength(mockLimit)
    })
  })
})
