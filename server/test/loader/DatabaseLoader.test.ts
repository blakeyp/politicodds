import MockDate from 'mockdate'
import BettingClient from '../../src/domain/BettingClient'
import { Event, Market, Price, Runner } from '../../src/domain/types'
import DatabaseLoader from '../../src/loader/DatabaseLoader'

describe('Database loader', () => {
  const mockBettingClient: jest.Mocked<BettingClient> = {
    getPoliticsEvents: jest.fn(),
    getMarketsByEvent: jest.fn(),
    getRunnersByMarket: jest.fn(),
    getPricesByMarket: jest.fn()
  }

  const mockBettingRepository: any = {
    insertPrices: jest.fn(),
    bulkInsertPrices: jest.fn()
  }

  const databaseLoader = new DatabaseLoader(
    mockBettingClient,
    mockBettingRepository
  )

  const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

  const mockNow = '2021-02-20T17:06:29.348Z'
  beforeEach(() => {
    MockDate.set(mockNow)
  })

  afterEach(() => {
    MockDate.reset()
    jest.resetAllMocks()
  })

  describe('loadLatestOdds', () => {
    const mockEvents: Event[] = [
      { id: '001', name: 'Event 1' },
      { id: '002', name: 'Event 2' }
    ]
    const mockMarkets: Market[][] = [
      [
        { id: '001', name: 'Market 001' },
        { id: '002', name: 'Market 002' }
      ],
      [
        { id: '003', name: 'Market 003' }
      ]
    ]
    const mockRunners: Runner[][] = [
      [
        { id: 1, name: 'Runner 1' },
        { id: 2, name: 'Runner 2' },
        { id: 3, name: 'Runner 3' }
      ],
      [
        { id: 4, name: 'Runner 4' },
        { id: 5, name: 'Runner 5' }
      ],
      [
        { id: 6, name: 'Runner 6' },
        { id: 7, name: 'Runner 7' }
      ]
    ]
    const mockPrices: Price[][] = [
      [
        { runnerId: 1, value: 1.6 },
        { runnerId: 2, value: 3.2 },
        { runnerId: 3, value: 0.9 }
      ],
      [
        { runnerId: 4, value: 0.7 },
        { runnerId: 5, value: 4.3 }
      ],
      [
        { runnerId: 6, value: 1.2 },
        { runnerId: 7, value: 1.5 }
      ]
    ]

    test('fetches and inserts the latest prices for each available market into the data store', async () => {
      mockBettingClient.getPoliticsEvents.mockResolvedValueOnce(mockEvents)
      mockBettingClient.getMarketsByEvent
        .mockResolvedValueOnce(mockMarkets[0])
        .mockResolvedValueOnce(mockMarkets[1])
      mockBettingClient.getRunnersByMarket
        .mockResolvedValueOnce(mockRunners[0])
        .mockResolvedValueOnce(mockRunners[1])
        .mockResolvedValueOnce(mockRunners[2])
      mockBettingClient.getPricesByMarket
        .mockResolvedValueOnce(mockPrices[0])
        .mockResolvedValueOnce(mockPrices[1])
        .mockResolvedValueOnce(mockPrices[2])

      await databaseLoader.loadLatestOdds()

      expect(mockBettingRepository.bulkInsertPrices).toHaveBeenCalledWith(mockNow,
        [
          {
            marketId: '001',
            data: [
              { runner: 'Runner 1', price: 1.6 },
              { runner: 'Runner 2', price: 3.2 },
              { runner: 'Runner 3', price: 0.9 }
            ]
          },
          {
            marketId: '002',
            data: [
              { runner: 'Runner 4', price: 0.7 },
              { runner: 'Runner 5', price: 4.3 }
            ]
          },
          {
            marketId: '003',
            data: [
              { runner: 'Runner 6', price: 1.2 },
              { runner: 'Runner 7', price: 1.5 }
            ]
          }
        ]
      )
    })

    describe('if the get events call fails', () => {
      test('throws the error to abort processing', async () => {
        const mockError = new Error('getEventsError')
        mockBettingClient.getPoliticsEvents.mockRejectedValueOnce(mockError)

        await expect(databaseLoader.loadLatestOdds()).rejects.toThrow(mockError)
      })
    })

    describe('if one of the get markets calls fails', () => {
      test('logs the error and continues processing, skipping the missing markets', async () => {
        const mockError = new Error('getMarketsError')
        mockBettingClient.getPoliticsEvents.mockResolvedValueOnce(mockEvents)
        mockBettingClient.getMarketsByEvent
          .mockRejectedValueOnce(mockError)
          .mockResolvedValueOnce(mockMarkets[1])
        mockBettingClient.getRunnersByMarket
          .mockResolvedValueOnce(mockRunners[2])
        mockBettingClient.getPricesByMarket
          .mockResolvedValueOnce(mockPrices[2])

        await databaseLoader.loadLatestOdds()

        expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
        expect(mockBettingRepository.bulkInsertPrices).toHaveBeenCalledWith(mockNow,
          [
            {
              marketId: '003',
              data: [
                { runner: 'Runner 6', price: 1.2 },
                { runner: 'Runner 7', price: 1.5 }
              ]
            }
          ]
        )
      })
    })

    describe('if one of the get runners calls fails', () => {
      test('logs the error and continues processing, skipping the market with missing runners', async () => {
        const mockError = new Error('getRunnersError')
        mockBettingClient.getPoliticsEvents.mockResolvedValueOnce(mockEvents)
        mockBettingClient.getMarketsByEvent
          .mockResolvedValueOnce(mockMarkets[0])
          .mockResolvedValueOnce(mockMarkets[1])
        mockBettingClient.getRunnersByMarket
          .mockResolvedValueOnce(mockRunners[0])
          .mockRejectedValueOnce(mockError)
          .mockResolvedValueOnce(mockRunners[2])
        mockBettingClient.getPricesByMarket
          .mockResolvedValueOnce(mockPrices[0])
          .mockResolvedValueOnce(mockPrices[2])

        await databaseLoader.loadLatestOdds()

        expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
        expect(mockBettingRepository.bulkInsertPrices).toHaveBeenCalledWith(mockNow,
          [
            {
              marketId: '001',
              data: [
                { runner: 'Runner 1', price: 1.6 },
                { runner: 'Runner 2', price: 3.2 },
                { runner: 'Runner 3', price: 0.9 }
              ]
            },
            {
              marketId: '003',
              data: [
                { runner: 'Runner 6', price: 1.2 },
                { runner: 'Runner 7', price: 1.5 }
              ]
            }
          ]
        )
      })
    })

    describe('if one of the get prices calls fails', () => {
      test('logs the error and continues processing, skipping the market with missing prices', async () => {
        const mockError = new Error('getPricesError')
        mockBettingClient.getPoliticsEvents.mockResolvedValueOnce(mockEvents)
        mockBettingClient.getMarketsByEvent
          .mockResolvedValueOnce(mockMarkets[0])
          .mockResolvedValueOnce(mockMarkets[1])
        mockBettingClient.getRunnersByMarket
          .mockResolvedValueOnce(mockRunners[0])
          .mockResolvedValueOnce(mockRunners[1])
          .mockResolvedValueOnce(mockRunners[2])
        mockBettingClient.getPricesByMarket
          .mockResolvedValueOnce(mockPrices[0])
          .mockRejectedValueOnce(mockError)
          .mockResolvedValueOnce(mockPrices[2])

        await databaseLoader.loadLatestOdds()

        expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
        expect(mockBettingRepository.bulkInsertPrices).toHaveBeenCalledWith(mockNow,
          [
            {
              marketId: '001',
              data: [
                { runner: 'Runner 1', price: 1.6 },
                { runner: 'Runner 2', price: 3.2 },
                { runner: 'Runner 3', price: 0.9 }
              ]
            },
            {
              marketId: '003',
              data: [
                { runner: 'Runner 6', price: 1.2 },
                { runner: 'Runner 7', price: 1.5 }
              ]
            }
          ]
        )
      })
    })
  })
})
