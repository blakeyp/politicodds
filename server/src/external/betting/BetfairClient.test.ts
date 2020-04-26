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

  describe('getPoliticsMarkets', () => {
    test('returns list of available politics markets', async () => {
      const mockMarketsResponse = {
        data: [
          { marketId: '001', marketName: 'Market 1', something: 'else' },
          { marketId: '002', marketName: 'Market 2', something: 'else' },
          { marketId: '003', marketName: 'Market 3', something: 'else' }
        ]
      }
      mockHttpClient.post.mockResolvedValue(mockMarketsResponse as any)

      const result = await betfairClient.getPoliticsMarkets()

      expect(mockHttpClient.post).toHaveBeenCalled()
      expect(result).toStrictEqual([
        { id: '001', name: 'Market 1' },
        { id: '002', name: 'Market 2' },
        { id: '003', name: 'Market 3' }
      ])
    })
  })
})
