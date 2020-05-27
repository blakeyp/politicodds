import BetfairClient from './BetfairClient'
import HttpClient from '../../http/HttpClient'

describe('Betfair API client', () => {
  const mockHttpClient: jest.Mocked<HttpClient> = {
    get: jest.fn(),
    post: jest.fn()
  }

  const betfairClient = new BetfairClient(
    'apiUrl',
    'appKey',
    'sessionToken',
    mockHttpClient
  )

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getPoliticsEvents', () => {
    test('returns list of politics events', async () => {
      const mockEventsResponse = {
        data: [
          {
            event: { id: '001', name: 'Event 1', countryCode: 'GB' },
            marketCount: 4
          },
          {
            event: { id: '002', name: 'Event 2', countryCode: 'FR' },
            marketCount: 10
          }
        ]
      }
      mockHttpClient.post.mockResolvedValue(mockEventsResponse as any)

      const result = await betfairClient.getPoliticsEvents()

      expect(mockHttpClient.post).toHaveBeenCalled()
      expect(result).toStrictEqual([
        { id: '001', name: 'Event 1', country: 'GB', numberOfMarkets: 4 },
        { id: '002', name: 'Event 2', country: 'FR', numberOfMarkets: 10 }
      ])
    })
  })

  describe('getMarketsByEvent', () => {
    test('returns list of markets for the given event id', async () => {
      const mockEventId = '009'
      const mockMarketsResponse = {
        data: [
          { marketId: '001', marketName: 'Market 1', something: 'else' },
          { marketId: '002', marketName: 'Market 2', something: 'else' },
          { marketId: '003', marketName: 'Market 3', something: 'else' }
        ]
      }
      mockHttpClient.post.mockResolvedValue(mockMarketsResponse as any)

      const result = await betfairClient.getMarketsByEvent(mockEventId)

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({
          filter: {
            eventIds: [mockEventId]
          }
        })
      )
      expect(result).toStrictEqual([
        { id: '001', name: 'Market 1' },
        { id: '002', name: 'Market 2' },
        { id: '003', name: 'Market 3' }
      ])
    })
  })

  describe('getRunnersByMarket', () => {
    test('returns list of runners for the given market id', async () => {
      const mockMarketId = '191919'
      const mockRunnersResponse = {
        data: [
          {
            marketId: '191918',
            runners: [
              { selectionId: '001', runnerName: 'Runner 1' },
              { selectionId: '002', runnerName: 'Runner 2' },
              { selectionId: '003', runnerName: 'Runner 3' }
            ]
          }
        ]
      }
      mockHttpClient.post.mockResolvedValue(mockRunnersResponse as any)

      const result = await betfairClient.getRunnersByMarket(mockMarketId)

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({
          filter: {
            marketIds: [mockMarketId]
          }
        })
      )
      expect(result).toStrictEqual([
        { id: '001', name: 'Runner 1' },
        { id: '002', name: 'Runner 2' },
        { id: '003', name: 'Runner 3' }
      ])
    })
  })

  describe('getPricesByMarket', () => {
    test('returns list of best prices for each runner for the given market id', async () => {
      const mockMarketId = '191919'
      const mockPricesResponse = {
        data: [
          {
            marketId: '191918',
            runners: [
              { selectionId: '001', ex: { availableToBack: [{ price: 1.23 }, { price: 1.25 }, { price: 1.19 }] } },
              { selectionId: '002', ex: { availableToBack: [{ price: 3.3 }, { price: 3.26363 }, { price: 2.9999 }] } },
              { selectionId: '003', ex: { availableToBack: [{ price: 22 }, { price: 25 }, { price: 26 }] } }
            ]
          }
        ]
      }
      mockHttpClient.post.mockResolvedValue(mockPricesResponse as any)

      const result = await betfairClient.getPricesByMarket(mockMarketId)

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({
          marketIds: [mockMarketId]
        })
      )
      expect(result).toStrictEqual([
        { runnerId: '001', price: 1.25 },
        { runnerId: '002', price: 3.3 },
        { runnerId: '003', price: 26 }
      ])
    })
  })
})
