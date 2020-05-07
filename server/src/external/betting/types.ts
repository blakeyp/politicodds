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

interface Runner {
  id: string
  name: string
}

interface Odds {
  runnerId: string
  price: string
}
