'use strict'

const net = require('net')

net.createServer(socket => {

  const interval = setInterval(() => {
    socket.write('beat')
  }, 1000)

  socket.on('data', data => {
    socket.write(data.toString().toUpperCase())
  })
}).listen(3001)
