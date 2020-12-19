// REF: https://www.valentinog.com/blog/error/#asynchronous-error-handling-in-nodejs-event-emitters

// Node.js Error handling via eevent emitters

const net = require('net')

const server = net.createServer().listen(80, '127.0.0.1')

server.on('listening', () => {
  console.log('server listening.')
})

server.on('connection', socket => {
  console.log('client connected')
  socket.end('Hello client!')
})

server.on('error', error => {
  console.error('error occurred:', error.message)
})

