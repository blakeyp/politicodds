import { parseLimit } from '../../src/utils/query'

describe('Query helper', () => {
  describe('parseLimit', () => {
    describe('parses invalid limit query param to undefined', () => {
      const testCases = ['', '0', '-12', 'foo']
      test.each(testCases)('\'%s\'', (queryLimit) => {
        const query = { limit: queryLimit }

        const actual = parseLimit(query)

        expect(actual).toBe(undefined)
      })
    })

    describe('parses valid limit query param to a number', () => {
      const testCases = [
        ['1', 1],
        ['10', 10],
        ['100', 100]
      ]
      test.each(testCases)('\'%s\'', (queryLimit, expected) => {
        const query = { limit: queryLimit }

        const actual = parseLimit(query as any)

        expect(actual).toBe(expected)
      })
    })
  })
})
