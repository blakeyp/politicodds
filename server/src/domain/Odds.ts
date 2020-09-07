import math from '../utils/math'
import decimalToFractionalMap from './odds-map'

class Odds {
  constructor (
    private decimalValue: number
  ) {}

  toFractional (): string {
    const keys = [...decimalToFractionalMap.keys()]
    const closestKey = math.findClosestNumberInArray(keys, this.decimalValue)
    return decimalToFractionalMap.get(closestKey) as string
  }

  toImpliedProbability (): number {
    const impliedProbability = 1 / this.decimalValue
    return math.roundTo3DecimalPoints(impliedProbability)
  }
}

export default Odds
