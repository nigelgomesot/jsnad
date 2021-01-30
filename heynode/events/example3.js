// regsiter event withh callback parameters
const EvenEmitter = require('events')

const myEmitter = new EvenEmitter()

myEmitter.on('status', (code, message) => console.log(`code: ${code}, message: ${message}`))

myEmitter.emit('status', 200, 'ok')
myEmitter.emit('status', 404, 'not found')
