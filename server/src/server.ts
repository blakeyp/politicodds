import app from './app'

const port = 4000

app.listen(port, (err) => {
  if (err as boolean) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
