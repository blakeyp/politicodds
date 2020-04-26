import { getAllMarkets, getMarketById } from './markets'
import { marketsService } from '../services'
import MarketsService from '../services/MarketsService'

jest.mock('../services', () => {
  return {
    marketsService: {
      getMarkets: jest.fn()
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

  describe('getAllMarkets handler', () => {
    test('responds with the list of all markets', async () => {
      const mockMarkets = [
        { id: '01', name: 'Market 1' },
        { id: '02', name: 'Market 2' },
        { id: '03', name: 'Market 3' }
      ]
      mockMarketsService.getMarkets.mockResolvedValue(mockMarkets)

      await getAllMarkets(req, res)

      expect(res.json).toHaveBeenCalledWith(mockMarkets)
    })
  })

  describe('getMarketById handler', () => {
    it('responds with the market details for the given id', async () => {
      const mockMarketId = Symbol('mockMarketId')
      req = {
        params: {
          id: mockMarketId
        }
      }

      await getMarketById(req, res)

      expect(res.json).toHaveBeenCalledWith({
        id: mockMarketId,
        name: 'Market 1'
      })
    })
  })
})
