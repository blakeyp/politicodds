import { getMarket, getMarketsByEvent } from './markets'
import { marketsService } from '../services'
import MarketsService from '../services/MarketsService'

jest.mock('../services', () => {
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

  describe('getMarket handler', () => {
    it('responds with market details for the given id', async () => {
      const mockMarketId = Symbol('mockMarketId')
      req = {
        params: {
          id: mockMarketId
        }
      }

      await getMarket(req, res)

      expect(res.json).toHaveBeenCalledWith({
        id: mockMarketId,
        name: 'Market 1'
      })
    })
  })
})
