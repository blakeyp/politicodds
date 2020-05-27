import math from './math'

describe('Math helper', () => {
  describe('findClosestNumberInArray', () => {
    describe('finds the closest to a given number in an array of numbers', () => {
      const arr = [1.34, 0.5, 1.2, 3.78, 2.44]
      const testCases = [
        // input, expected
        [1.1, 1.2],
        [0, 0.5],
        [1.34, 1.34],
        [700, 3.78],
        [1.9, 2.44]
      ]

      test.each(testCases)('%f closest to %f', (input: number, expected: number) => {
        const actual = math.findClosestNumberInArray(arr, input)
        expect(actual).toBe(expected)
      })
    })
  })

  describe('roundTo3DecimalPlaces', () => {
    describe('rounds decimal input to 3 decimal places', () => {
      const testCases = [
        // input, expected
        [1.189999999, 1.19],
        [2.3456, 2.346],
        [10.0005, 10.001],
        [7.56327819, 7.563],
        [100, 100]
      ]

      test.each(testCases)('%f rounds to %f', (input: number, expected: number) => {
        const actual = math.roundTo3DecimalPoints(input)
        expect(actual).toBe(expected)
      })
    })
  })
})
