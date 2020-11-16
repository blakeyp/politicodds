import dotenv from 'dotenv'
dotenv.config()

const config = {
  env: process.env.NODE_ENV ?? '',
  betfair: {
    apiUrl: process.env.BETFAIR_API_URL ?? '',
    sessionUrl: process.env.BETFAIR_SESSION_URL ?? '',
    appKey: process.env.BETFAIR_APP_KEY ?? '',
    username: process.env.BETFAIR_USERNAME ?? '',
    password: process.env.BETFAIR_PASSWORD ?? ''
  }
}

export default config
