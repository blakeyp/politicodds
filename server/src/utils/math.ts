const findClosestNumberInArray = (array: number[], target: number): number => {
  return array.reduce((prev: number, curr: number) => {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  })
}

const roundToDecimalPoints = (dps: number): Function => { // Cheeky bit of currying
  return (val: number) => parseFloat(val.toFixed(dps))
}

export default {
  findClosestNumberInArray,
  roundTo3DecimalPoints: roundToDecimalPoints(3)
}
