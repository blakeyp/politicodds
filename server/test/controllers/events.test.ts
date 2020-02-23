import eventsController from '../../src/controllers/events'

describe('Events controller', () => {
  describe('GET handler', () => {
    it('should respond with a list of available events', () => {
      const req = { }
      const res = { json: jest.fn() }

      eventsController.get(req, res)

      expect(res.json).toHaveBeenCalledWith([
        { id: '01', name: 'Event 1' },
        { id: '02', name: 'Event 2' },
        { id: '03', name: 'Event 3' }
      ])
    })
  })
})
