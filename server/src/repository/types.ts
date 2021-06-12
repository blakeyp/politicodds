export interface Price {
  runner: string
  price: number
}

export interface BulkPrices {
  marketId: string
  data: Price[]
}

export interface Timeframe {
  start: string
  end: string
}
