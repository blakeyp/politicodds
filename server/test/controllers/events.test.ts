import { getEvents } from '../../src/controllers/events'
import { eventsService } from '../../src/services'
import EventsService from '../../src/services/EventsService'

jest.mock('../../src/services', () => {
  return {
    eventsService: {
      getAll: jest.fn()
    }
  }
})
const mockEventsService = eventsService as jest.Mocked<EventsService>

describe('Events controller', () => {
  let req: any
  let res: any

  beforeEach(() => {
    req = { }
    res = { json: jest.fn() }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getEvents handler', () => {
    test('responds with list of all available politics events', async () => {
      const mockEvents = [
        { id: '01', name: 'Event 1' },
        { id: '02', name: 'Event 2' },
        { id: '03', name: 'Event 3' }
      ]
      mockEventsService.getAll.mockResolvedValue(mockEvents)

      await getEvents(req, res)

      expect(res.json).toHaveBeenCalledWith(mockEvents)
    })
  })
})
