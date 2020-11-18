import { getMarketsByEvent } from '../../src/controllers/markets'
import { marketsService } from '../../src/services'
import MarketsService from '../../src/services/MarketsService'

jest.mock('../../src/services', () => {
  return {
    marketsService: {
      getByEvent: jest.fn()
    }
  }
})
const mockMarketsService = marketsService as jest.Mocked<MarketsService>

describe('Markets controller', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = { }
    res = { json: jest.fn() }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getMarketsByEvent handler', () => {
    test('responds with list of markets for the given event id', async () => {
      const mockEventId = Symbol('mockEventId')
      req = {
        params: {
          id: mockEventId
        }
      }
      const mockMarkets = [
        { id: '01', name: 'Market 1' },
        { id: '02', name: 'Market 2' },
        { id: '03', name: 'Market 3' }
      ]
      mockMarketsService.getByEvent.mockResolvedValue(mockMarkets)

      await getMarketsByEvent(req, res)

      expect(res.json).toHaveBeenCalledWith(mockMarkets)
    })
  })
})
