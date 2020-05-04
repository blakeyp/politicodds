import BetfairClient from './BetfairClient'
import HttpClient from '../http/HttpClient'

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
            event: {
              id: '001',
              name: 'Event 1',
              countryCode: 'GB'
            },
            marketCount: 4
          },
          {
            event: {
              id: '002',
              name: 'Event 2',
              countryCode: 'FR'
            },
            marketCount: 10
          }
        ]
      }
      mockHttpClient.post.mockResolvedValue(mockEventsResponse as any)

      const result = await betfairClient.getPoliticsEvents()

      expect(mockHttpClient.post).toHaveBeenCalled()
      expect(result).toStrictEqual([
        {
          id: '001',
          name: 'Event 1',
          country: 'GB',
          numberOfMarkets: 4
        },
        {
          id: '002',
          name: 'Event 2',
          country: 'FR',
          numberOfMarkets: 10
        }
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
})
