import Odds from './Odds'

describe('Odds value object', () => {
  test('can be instantiated with a decimal odds value', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const odds = new Odds(1.5712318)
    }).not.toThrow()
  })

  describe('toFractional', () => {
    describe('converts the odds to fractional format', () => {
      type TestCase = [number, string];
      const testCases: TestCase[] = [
        // input, expected
        [1, '1/100'],
        [2.06, '11/10'],
        [1.8, '4/5'],
        [2.05, 'EVENS'],
        [202, '200/1'],
        [24, '25/1'],
        [1.21, '1/5'],
        [1.14226161, '1/7'],
        [6.7, '11/2'],
        [1.03, '1/33']
      ]

      test.each<TestCase>(testCases)('maps %f to \'%s\'', (input: number, expected: string) => {
        const actual = new Odds(input).toFractional()
        expect(actual).toBe(expected)
      })
    })
  })

  describe('toImpliedProbability', () => {
    describe('converts the odds to an implied probability, rounded to 3dp', () => {
      const testCases = [
        // input, expected
        [1, 1],
        [2.06, 0.485],
        [1.8, 0.556],
        [2, 0.5],
        [202, 0.005],
        [24, 0.042],
        [1.21, 0.826],
        [1.14226161, 0.875],
        [6.7, 0.149],
        [1.03, 0.971]
      ]

      test.each(testCases)('maps %f to \'%f\'', (input: number, expected: number) => {
        const actual = new Odds(input).toImpliedProbability()
        expect(actual).toBe(expected)
      })
    })
  })
})
