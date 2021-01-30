const http = require('http')

const longComputation =  () => {
  const startDate = Date.now()
  let endDate

  do {
    endDate = Date.now()
  } while (endDate - startDate < 5000)

  const message = 'longComputation done.'
  console.log(message)

  return message
}

const server  = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const computeResponse = longComputation()

    res.end(computeResponse)
  } else
    res.end('ok')
})

server.listen(3001)
