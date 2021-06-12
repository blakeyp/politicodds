import express from 'express'
import cors, { CorsOptions } from 'cors'
import config from './config'
import router from './router'

// In prod only allow calls from set domains
let corsOptions: CorsOptions = { origin: '*' }
if (config.env === 'production') {
  const allowedOrigins = [/\.politicodds\.co\.uk$/, /--politicodds\.netlify\.app$/]
  corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
      if (origin && allowedOrigins.some(regex => regex.test(origin))) {
        console.log('CORS origin alllowed:', origin)
        callback(null, true)
      } else {
        console.warn('CORS origin not allowed:', origin)
        callback(new Error('Origin not allowed by CORS'))
      }
    }
  }
}

const app = express()
app.use(cors(corsOptions))
app.use('/api', router)

export default app
