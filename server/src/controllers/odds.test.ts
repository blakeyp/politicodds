import { getOddsByMarket } from './odds'
import { oddsService } from '../services'
import OddsService from '../services/OddsService'

jest.mock('../services', () => {
  return {
    oddsService: {
      getByMarket: jest.fn()
    }
  }
})
const mockOddsService = oddsService as jest.Mocked<OddsService>

describe('Odds controller', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = { }
    res = { json: jest.fn() }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getOddsByMarket handler', () => {
    test('responds with list of runner odds for the given market id', async () => {
      const mockEventId = Symbol('mockEventId')
      req = {
        params: {
          id: mockEventId
        }
      }
      const mockOdds = [
        { runnerName: 'Runner 1', odds: '13/8', probability: 0.6 },
        { runnerName: 'Runner 2', odds: '5/4', probability: 0.2 },
        { runnerName: 'Runner 3', odds: '100/1', probability: 0.01 }
      ]
      mockOddsService.getByMarket.mockResolvedValue(mockOdds)

      await getOddsByMarket(req, res)

      expect(res.json).toHaveBeenCalledWith(mockOdds)
    })
  })
})
