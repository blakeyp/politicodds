import { errorHandler } from './error-handler'
import { ApplicationError } from './errors'

describe('Error handler', () => {
  const restoredConsoleError = console.error
  const mockHandler = jest.fn()
  let req: any
  let res: any

  beforeEach(() => {
    console.error = jest.fn()
    req = { }
    res = { status: jest.fn(), json: jest.fn() }
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
  })

  afterEach(() => {
    console.error = restoredConsoleError
    jest.resetAllMocks()
  })

  describe('given no errors', () => {
    test('calls the handler successfully', async () => {
      try {
        await errorHandler(mockHandler)(req, res)
      } catch (e) {
        fail(e)
      }
    })
  })

  describe('given an application specific error', () => {
    test('returns the relevant error response', async () => {
      const mockErrorMessage = 'Bad Request!'
      const mockStatus = 400
      mockHandler.mockRejectedValue(new ApplicationError(mockErrorMessage, mockStatus))

      await errorHandler(mockHandler)(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({
        message: mockErrorMessage
      })
    })
  })

  describe('given a generic error', () => {
    test('returns the generic error response', async () => {
      mockHandler.mockRejectedValue(new Error('Oops!'))

      await errorHandler(mockHandler)(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal Server Error'
      })
    })
  })
})
