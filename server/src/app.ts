import express from 'express'
import cors from 'cors'
import router from './router'

const app = express()
app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use(cors())
app.use('/api', router)

export default app
