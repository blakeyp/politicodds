export interface Event {
  id: string
  name: string
  country?: string
  numberOfMarkets?: number
}

export interface Market {
  id: string
  name: string
}

interface MarketDetails extends Market {
  foo: string
}

export interface Runner {
  id: number
  name: string
}

export interface Price {
  runnerId: number
  value: number
}

export interface RunnerOdds {
  runnerName: string
  odds: string // Fractional value
  probability: number // Implied prob. (decimal)
}
