import dotenv from 'dotenv'
dotenv.config()

const config = {
  betfair: {
    apiUrl: process.env.BETFAIR_API_URL,
    username: process.env.BETFAIR_USERNAME,
    password: process.env.BETFAIR_PASSWORD,
    appKey: process.env.BETFAIR_APP_KEY,
    sessionToken: process.env.BETFAIR_SESSION_TOKEN
  }
}

export default config
