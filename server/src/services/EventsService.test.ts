import EventsService from './EventsService'
import { BettingClient } from '../external/betting'

describe('Events service', () => {
  const mockEvents = [
    { id: '001', name: 'Event 1' },
    { id: '002', name: 'Event 2' },
    { id: '003', name: 'Event 3' }
  ]

  const mockBettingClient: Partial<BettingClient> = {
    getPoliticsEvents: jest.fn(async () => await Promise.resolve(mockEvents))
  }

  const eventsService = new EventsService(mockBettingClient as any)

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    test('returns list of all available politics events', async () => {
      const result = await eventsService.getAll()

      expect(mockBettingClient.getPoliticsEvents).toHaveBeenCalled()
      expect(result).toStrictEqual(mockEvents)
    })
  })
})
