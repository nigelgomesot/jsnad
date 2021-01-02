const http = require('http')
const { fork } = require('child_process')

const server = http.createServer()

server.on('request', (req, res) => {
  if (req.url === '/compute') {
    const forked = fork('example11_child')
    forked.send(null)

    forked.on('message', message => res.end(message))
  } else
    res.end('ok')
})

server.listen(3001)
