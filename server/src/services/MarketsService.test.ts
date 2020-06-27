import MarketsService from './MarketsService'
import { BettingClient } from '../external/betting'

describe('Markets service', () => {
  const mockEventId = 'mockEventId'
  const mockMarkets = [
    { id: '001', name: 'Market 1' },
    { id: '002', name: 'Market 2' },
    { id: '003', name: 'Market 3' }
  ]

  const mockBettingClient: Partial<BettingClient> = {
    getMarketsByEvent: jest.fn(async () => Promise.resolve(mockMarkets))
  }

  const marketsService = new MarketsService(mockBettingClient as any)

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getByMarket', () => {
    test('returns list of markets for the given event id', async () => {
      const result = await marketsService.getByEvent(mockEventId)

      expect(mockBettingClient.getMarketsByEvent).toHaveBeenCalledWith(mockEventId)
      expect(result).toStrictEqual(mockMarkets)
    })
  })
})
