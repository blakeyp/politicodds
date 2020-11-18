import BetfairSession from '../../../src/external/betfair/BetfairSession'

describe('Betfair Session', () => {
  const mockTokenResponse = (tokenValue: string): object => ({
    data: {
      token: tokenValue
    }
  })

  const mockHttpClient: any = {
    post: jest.fn()
  }

  let betfairSession: BetfairSession

  beforeEach(() => {
    jest.useFakeTimers('modern')
    betfairSession = new BetfairSession(mockHttpClient)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getToken', () => {
    describe('if token is not cached', () => {
      test('generates a new token and returns it', async () => {
        mockHttpClient.post.mockResolvedValueOnce(mockTokenResponse('mock-token-1'))

        const token = await betfairSession.getToken()

        expect(token.value).toBe('mock-token-1')
      })
    })

    describe('if token is cached and has not expired', () => {
      test('returns the cached token', async () => {
        mockHttpClient.post.mockResolvedValueOnce(mockTokenResponse('mock-token-2'))
        await betfairSession.getToken() // Get once so token gets cached

        const token = await betfairSession.getToken()

        expect(token.value).toBe('mock-token-2')
      })
    })

    describe('if token is cached but has expired', () => {
      test('generates a new token and returns it', async () => {
        mockHttpClient.post.mockResolvedValueOnce(mockTokenResponse('mock-token-3'))
        await betfairSession.getToken()
        jest.advanceTimersByTime(8 * 60 * 60 * 1000) // Advance clock by 8 hours to force expiry
        mockHttpClient.post.mockResolvedValueOnce(mockTokenResponse('mock-token-4'))

        const token = await betfairSession.getToken()

        expect(token.value).toBe('mock-token-4')
      })
    })
  })
})
