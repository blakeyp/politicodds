import eventsController from '../../src/controllers/events'

describe('Events controller', () => {
  describe('GET handler', () => {
    it('should send a dummy response', () => {
      const req = { }
      const res = { send: jest.fn() }

      eventsController.get(req, res)

      expect(res.send).toHaveBeenCalledWith('Events GET')
    })
  })
})
